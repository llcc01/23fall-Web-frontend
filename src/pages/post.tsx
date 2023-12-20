import { Table } from "@douyinfe/semi-ui";
import { useNavigate, useParams } from "react-router-dom";
import type { Post } from "../../types";
import { useEffect, useState } from "react";
import axios from "axios";

export const PostList = () => {
  const [data, setData] = useState<Post[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/api/post").then((res) => {
      console.log(res.data);
      setData(res.data.list);
    });
    return () => {
      setData([]);
    };
  }, []);
  const columns = [
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "发布时间",
      dataIndex: "postTime",
    },
  ];
  const onRow = (record?: Post) => {
    return {
      onClick: () => {
        console.log(record);
        if (record) {
          navigate(`/post/${record.id}`);
        }
      },
    };
  };
  return <Table columns={columns} dataSource={data} onRow={onRow} />;
};

export const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Post | null>(null);
  useEffect(() => {
    axios.get(`/api/post/${id}`).then((res) => {
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
