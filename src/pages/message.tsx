import { Layout, List } from "@douyinfe/semi-ui";
import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../../types";
import Chat, { Bubble, useMessages } from "@chatui/core";

import "@chatui/core/es/styles/index.less";
import type { MessageProps } from "@chatui/core";
import "@chatui/core/dist/index.css";
import "../chatui-theme.css"

const UserList = (props: {
  onUserClick: (id: string, name: string) => void;
}) => {
  const [data, setData] = useState<User[]>([]);
  useEffect(() => {
    axios.get("/api/message/users").then((res) => {
      console.log(res.data);
      setData(res.data.list);
    });
    return () => {
      setData([]);
    };
  }, []);
  return (
    <List
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          onClick={() => {
            props.onUserClick(item.id, item.name);
          }}
          style={{ cursor: "pointer" }}
        >
          {item.name}
        </List.Item>
      )}
    />
  );
};

const ChatView = (props: { userId: string; userName: string }) => {
  const { messages, resetList } = useMessages();

  useEffect(() => {
    axios.get("/api/message/" + props.userId).then((res) => {
      console.log(res.data);
      resetList(
        res.data.list.map(
          (item: {
            id: string;
            type: string;
            content: string;
            userIdFrom: string;
            userIdTo: string;
          }) => {
            return {
              _id: item.id,
              type: item.type,
              content: item.content,
              position: item.userIdFrom === props.userId ? "left" : "right",
            };
          }
        )
      );
    });
    return () => {
      resetList([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userId]);

  const onSend = (type: string, content: string) => {
    console.log(type, content);
  };

  const renderMessageContent = (message: MessageProps) => {
    const { type, content } = message;
    switch (type) {
      case "text":
        return <Bubble content={content.text} />;
      case "image":
        return (
          <Bubble type="image">
            {" "}
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
    }
  };

  return (
    <>
      <Chat
        navbar={{ title: props.userName }}
        messages={messages}
        renderMessageContent={renderMessageContent}
        onSend={onSend}
      />
    </>
  );
};

export const MessagePage = () => {
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const onUserClick = (id: string, name: string) => {
    console.log(id, name);
    setUserId(id);
    setUserName(name);
  };

  return (
    <Layout style={{ height: "100%" }}>
      <Layout.Sider>
        <UserList onUserClick={onUserClick} />
      </Layout.Sider>
      <Layout.Content>
        {userId && <ChatView userId={userId} userName={userName} />}
      </Layout.Content>
    </Layout>
  );
};
