import { Table } from "@douyinfe/semi-ui"
import { useParams } from "react-router-dom";
import type { Post } from "../../types";
import { useEffect, useState } from "react";
import axios from "axios";

const PostList = () => {
    const [data, setData] = useState<Post[]>([]);
    useEffect(() => {
        axios.get("/api/post").then((res) => {
            console.log(res.data);
            setData(res.data.list);
        })
        return () => {
            setData([]);
        }
    }, []);
    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
        },
        {
            title: '发布时间',
            dataIndex: 'postTime',
        },
    ];
    return (
        <Table columns={columns} dataSource={data} />
    )
}

const PostDetail = (props: { id: string; }) => {
    const { id } = props;
    const [data, setData] = useState<Post | null>(null);
    useEffect(() => {
        axios.get(`/api/post/${id}`).then((res) => {
            console.log(res.data);
            setData(res.data);
        })
        return () => {
            setData(null);
        }
    }, [id]);
    return (
        <div>
            <h1>{data?.title}</h1>
            <p>{data?.content}</p>
        </div>
    )
}

export const PostPage = () => {
    const urlParams = useParams<{ id: string }>();

    return (
        <div>
            {urlParams.id ? <PostDetail id={urlParams.id} /> :
                <PostList />}
        </div>
    )
}
