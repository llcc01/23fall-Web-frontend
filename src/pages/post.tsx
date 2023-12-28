import { useNavigate, useParams } from "react-router-dom";
import type { Post } from "../../types";
import { useEffect, useState } from "react";
import axios from "axios";
import { PostList } from "../components/post_list";

export const PostListPage = () => {
  const [data, setData] = useState<Post[]>([]);
  useEffect(() => {
    axios.get("/api/posts").then((res) => {
      console.log(res.data);
      setData(res.data.list);
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
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios.get(`/api/posts/user/${userId}`).then((res) => {
      console.log(res.data);
      setData(res.data.list);
    });
    return () => {
      setData([]);
    };
  }, []);

  const deletePost = (postId: string) => {
    axios.delete("/api/posts/" + postId).then((res) => {
      console.log(res.data);
      setData(data.filter((item) => item.id !== postId));
    });
  };

  const editPost = (postId: string) => {
    navigate(`/posts/${postId}/edit`);
  };

  return (
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