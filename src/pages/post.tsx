import { useNavigate, useParams } from "react-router-dom";
import type { Post, User } from "../../types";
import { useEffect, useState } from "react";
import axios from "axios";
import { PostList } from "../components/post_list";
import type { Auth } from "../utils/auth";
import {
  Avatar,
  Button,
  Card,
  Carousel,
  Descriptions,
  Form,
  Input,
  Toast,
  Typography,
  Upload,
} from "@douyinfe/semi-ui";
import { IconPlus } from "@douyinfe/semi-icons";
import { FileItem } from "@douyinfe/semi-ui/lib/es/upload";
import { getUserInfo } from "../utils/userInfo";
import { Data } from "@douyinfe/semi-ui/lib/es/descriptions";

export const PostListPage = () => {
  const [data, setData] = useState<Post[]>([]);
  useEffect(() => {
    axios.get("/api/posts").then((res) => {
      console.log(res.data);
      const promises = res.data.map(async (item: Post) => {
        const res = await getUserInfo(item.userID ?? "");
        item.username = res?.username;
        return item;
      });
      Promise.all(promises).then((res) => {
        setData(res);
      });
    });
    return () => {
      setData([]);
    };
  }, []);
  return (
    <div>
      <PostList data={data} showUser />
    </div>
  );
};

export const UserPostListPage = () => {
  const { userId } = useParams();
  const [data, setData] = useState<Post[]>([]);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (!userId) {
      return;
    }
    axios.get(`/api/posts/user/${userId}`).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
    getUserInfo(userId).then((res) => {
      setUser(res);
    });
    return () => {
      setData([]);
    };
  }, [userId]);
  return (
    <>
      <h1>{user?.username}的帖子</h1>
      <PostList data={data} />
    </>
  );
};

export const SearchPostListPage = () => {
  const [data, setData] = useState<Post[]>([]);
  const { keyword } = useParams();
  const [v, setV] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!keyword) {
      return;
    }
    axios.get(`/api/posts/search/${keyword}`).then((res) => {
      console.log(res.data);
      const promises = res.data.map(async (item: Post) => {
        const res = await getUserInfo(item.userID ?? "");
        item.username = res?.username;
        return item;
      });
      Promise.all(promises).then((res) => {
        setData(res);
      });
    });
    return () => {
      setData([]);
    };
  }, [keyword]);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Input
          defaultValue={keyword}
          placeholder="搜索"
          onChange={(v: string) => {
            setV(v);
          }}
          onEnterPress={() => {
            navigate(`/posts/search/${v}`);
          }}
          style={{
            width: 200,
            marginRight: 10,
          }}
        ></Input>

        <Button onClick={() => navigate(`/posts/search/${v}`)}>搜索</Button>
      </div>
      <PostList data={data} showUser />
    </div>
  );
};

export const MyPostListPage = (props: { auth: Auth }) => {
  const [data, setData] = useState<Post[]>([]);
  const navigate = useNavigate();
  const { user } = props.auth;
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
  const [post, setData] = useState<Post | null>(null);
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [desData, setDesData] = useState<Data[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/posts/${id}`).then((res) => {
      console.log(res.data);
      setData(res.data);
      getUserInfo(res.data.userID).then((user) => {
        setDesData([
          {
            key: "作者",
            value: (
              <Typography.Text
                link
                onClick={() => {
                  if (user) {
                    navigate(`/users/${user.userID}/info`);
                  }
                }}
              >
                {user?.username}
              </Typography.Text>
            ),
          },
          {
            key: "发布时间",
            value: new Date(res.data.dateTime).toLocaleString(),
          },
        ]);
        setAvatar(user?.avatarPath);
      });
    });
    return () => {
      setData(null);
    };
  }, [id]);
  return (
    <Card>
      <div
        style={{
          // margin: "0 auto",
          marginLeft: 30,
          width: "fit-content",
        }}
      >
        <h1>{post?.title}</h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            src={avatar}
            size="default"
            style={{
              margin: 10,
            }}
            alt="头像"
            onClick={() => {
              navigate("/users/my/info");
            }}
          />
          <Descriptions data={desData} align="left" />
        </div>
      </div>
      <Card
        style={{
          marginBottom: 10,
        }}
      >
        {post?.content}
      </Card>
      {
        <Carousel style={{ width: "100%", height: 400, maxHeight: "80vh" }}>
          {post?.imagePathArray?.map((item) => (
            <img
              src={item}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
              key={item}
            />
          ))}
        </Carousel>
      }
    </Card>
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
        res.data.imagePathArray?.map((item) => {
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
    values.imagePathArray = fileList.map((item) => item.url ?? "");
    if (id === "new") {
      axios.post("/api/posts", values).then((res) => {
        console.log(res.data);
        Toast.success("保存成功");
        // navigate(`/posts/${res.data.postID}/edit`);
        navigate("/");
      });
      return;
    }

    axios.put(`/api/posts/${id}`, values).then((res) => {
      console.log(res.data);
      Toast.success("保存成功");
      navigate("/");
    });
  };

  return (
    data && (
      <>
        <Form onSubmit={handleSubmit} initValues={data}>
          <Form.Input field="title" label="标题" />
          <Form.TextArea field="content" label="内容" autosize />

          <Upload
            action="/api/posts/uploadImage"
            onChange={(e: {
              fileList: Array<FileItem>;
              currentFile?: FileItem;
            }) => {
              console.log(e);
              setFileList(
                e.fileList.map((item) => {
                  return {
                    uid: item.uid,
                    name: item.name,
                    status: item.status,
                    size: item.size,
                    url: item.response?.[0]
                      ? "/api/posts/images/" + item.response?.[0]
                      : item.url,
                  };
                })
              );
            }}
            name="files"
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
              marginBottom: 10,
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
