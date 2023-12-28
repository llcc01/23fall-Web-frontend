import { Table, Typography } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";
import type { Post } from "../../types";
import { useMemo } from "react";
import { useWindowSize } from "react-use";

export const PostList = (props: {
  data: Post[];
  options?: { title: string; onClick: (postId: string) => void }[];
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
              navigate(`/posts/${record.id}/view`);
            }
          }}
        >
          {record.title}
        </Typography.Text>
      ),
    },
    {
      title: "发布时间",
      dataIndex: "postTime",
    },
    ...(props.options
      ? [
          {
            title: "操作",
            dataIndex: "id",
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
