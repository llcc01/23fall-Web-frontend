import { Table, Typography } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";
import type { Post } from "../../types";
import { useMemo } from "react";
import { useWindowSize } from "react-use";

export const PostList = (props: {
  data: Post[];
  showUser?: boolean;
  options?: { title: string; onClick: (postID: string) => void }[];
}) => {
  const navigate = useNavigate();
  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      render: (_: string, record: Post) => (
        <Typography.Text
          link
          onClick={() => {
            if (record) {
              navigate(`/posts/${record.postID}/view`);
            }
          }}
        >
          {record.title}
        </Typography.Text>
      ),
    },
    ...(props.showUser
      ? [
          {
            title: "作者",
            dataIndex: "userID",
            render: (_: string, record: Post) => (
              <Typography.Text
                link
                onClick={() => {
                  if (record) {
                    navigate(`/users/${record.userID}/info`);
                  }
                }}
              >
                {record.username}
              </Typography.Text>
            ),
          },
        ]
      : []),
    {
      title: "发布时间",
      dataIndex: "dateTime",
      render: (text: string) => {
        return new Date(text).toLocaleString();
      },
    },
    ...(props.options
      ? [
          {
            title: "操作",
            dataIndex: "postID",
            render: (text: string) => {
              return (
                <>
                  {props.options?.map((item) => (
                    <Typography.Text
                      link
                      onClick={() => {
                        item.onClick(text);
                      }}
                      style={{ marginRight: 10 }}
                      key={item.title}
                    >
                      {item.title}
                    </Typography.Text>
                  ))}
                </>
              );
            },
          },
        ]
      : []),
  ];
  const { height } = useWindowSize();
  const scroll = useMemo(() => ({ y: height - 200 }), [height]);
  return <Table columns={columns} dataSource={props.data} scroll={scroll} />;
};
