import { useNavigate, useParams } from "react-router-dom";
import type { Post } from "../../types";
import { useEffect, useState } from "react";
import axios from "axios";
import { PostList } from "../components/post_list";
import { useAuth } from "../utils/auth";
import { Button, Form, Toast, Upload } from "@douyinfe/semi-ui";
import { IconPlus } from "@douyinfe/semi-icons";
import { FileItem } from "@douyinfe/semi-ui/lib/es/upload";

export const PostListPage = () => {
  const [data, setData] = useState<Post[]>([]);
  useEffect(() => {
    axios.get("/api/posts").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
    return () => {
      setData([]);
    };
  }, []);
  return <PostList data={data} />;
};

export const MyPostListPage = () => {
  const [data, setData] = useState<Post[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    axios.get(`/api/posts/user/${user.userID}`).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, [user]);

  const deletePost = (postId: string) => {
    axios.delete("/api/posts/" + postId).then((res) => {
      console.log(res.data);
      setData(data.filter((item) => item.postID !== postId));
    });
  };

  const editPost = (postId: string) => {
    navigate(`/posts/${postId}/edit`);
  };

  return (
    <>
      <Button
        onClick={() => navigate("/posts/new/edit")}
        style={{
          margin: 10,
        }}
      >
        新建
      </Button>
      <PostList
        data={data}
        options={[
          {
            title: "编辑",
            onClick: editPost,
          },
          {
            title: "删除",
            onClick: deletePost,
          },
        ]}
      />
    </>
  );
};

export const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Post | null>(null);
  useEffect(() => {
    axios.get(`/api/posts/${id}`).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
    return () => {
      setData(null);
    };
  }, [id]);
  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.content}</p>
    </div>
  );
};

export const PostEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<Post | null>(null);
  const [fileList, setFileList] = useState<FileItem[]>([]);
  useEffect(() => {
    if (id === "new") {
      setData({
        title: "",
        content: "",
        postID: "",
        dateTime: "",
      });
      return;
    }
    axios.get(`/api/posts/${id}`).then((res: { data: Post }) => {
      console.log(res.data);
      setData(res.data);
      setFileList(
        res.data.images?.map((item) => {
          {
            return {
              uid: item,
              name: item,
              status: "success",
              size: "",
              url: item,
            };
          }
        }) ?? []
      );
    });
  }, [id]);
  const handleSubmit = (values: Post) => {
    values.images = fileList.map((item) => item.url ?? "");
    if (id === "new") {
      axios.post("/api/posts", values).then((res) => {
        console.log(res.data);
        Toast.success("保存成功");
        navigate(`/posts/${res.data.postID}/edit`);
      });
      return;
    }

    axios.put(`/api/posts/${id}`, values).then((res) => {
      console.log(res.data);
      Toast.success("保存成功");
    });
  };

  return (
    data && (
      <>
        <Form onSubmit={handleSubmit} initValues={data}>
          <Form.Input field="title" label="标题" />
          <Form.TextArea field="content" label="内容" autosize />

          <Upload
            action="/api/images"
            prompt={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "grey",
                  height: "100%",
                  marginLeft: 10,
                }}
              >
                上传图片
              </div>
            }
            listType="picture"
            defaultFileList={fileList}
            style={{
              margin: 10,
            }}
          >
            <IconPlus size="extra-large" />
          </Upload>

          <Button htmlType="submit" type="primary">
            保存
          </Button>
        </Form>
      </>
    )
  );
};
