import { Button, Form, Layout, List, Modal, Popover } from "@douyinfe/semi-ui";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Message, User } from "../../types";
import Chat, { Bubble, useMessages } from "@chatui/core";

import "@chatui/core/es/styles/index.less";
import type { MessageProps } from "@chatui/core";
import "@chatui/core/dist/index.css";
import "../chatui-theme.css";
import { getUserInfo } from "../utils/userInfo";
import { useNavigate } from "react-router-dom";
import { useEffectOnce } from "react-use";
import { Auth } from "../utils/auth";

const UserList = (props: {
  userIds: string[];
  onUserClick: (id: string, name: string, avatar: string) => void;
}) => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    console.log(props.userIds);
    const newUsers: User[] = [];
    const promises = props.userIds.map(async (id) => {
      const res = await getUserInfo(id);
      if (!res) {
        return;
      }
      newUsers.push(res);
    });
    Promise.all(promises).then(() => {
      setUsers(newUsers);
    });
  }, [props.userIds]);
  return (
    <div style={{ height: "calc(100% - 100)", width: 100 }}>
      <List
        dataSource={users}
        renderItem={(item: User) => (
          <List.Item
            onClick={() => {
              props.onUserClick(
                item.userID,
                item.username,
                item.avatarPath ?? ""
              );
            }}
            style={{ cursor: "pointer" }}
          >
            {item.username}
          </List.Item>
        )}
      />
    </div>
  );
};

const ChatView = (props: {
  messages: MessageProps[];
  userId: string;
  peerUserId: string;
  peerUserName: string;
  onSend?: (type: string, content: string) => void;
}) => {
  const onSend = (type: string, content: string) => {
    console.log(type, content);
    axios
      .post("/api/messages", {
        senderID: props.userId,
        recipientID: props.peerUserId,
        content: content,
      })
      .then(() => {
        props.onSend?.(type, content);
      });
  };
  const onDelete = (messageId: string) => {
    console.log(messageId);
    axios.delete(`/api/messages/${messageId}`).then(() => {
      props.onSend?.("text", "");
    });
  };

  const renderMessageContent = (message: MessageProps) => {
    const { type, content } = message;
    switch (type) {
      case "text":
        return (
          <Bubble>
            <Popover
              content={
                <Button
                  onClick={() => {
                    onDelete(String(message._id));
                  }}
                >
                  删除
                </Button>
              }
            >
              {content.text}
            </Popover>
          </Bubble>
        );
      case "image":
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
    }
  };

  return (
    <>
      <Chat
        navbar={{ title: props.peerUserName }}
        messages={props.messages}
        renderMessageContent={renderMessageContent}
        onSend={onSend}
      />
    </>
  );
};

export const MessagePage = (props: { auth: Auth }) => {
  const navigate = useNavigate();

  const [peerUserId, setPeerUserId] = useState<string>("");
  const newPeerUserId = useRef<string>("");
  const [peerUsername, setPeerUsername] = useState<string>("");
  const [peerUserAvatar, setPeerUserAvatar] = useState<string>("");
  const onUserClick = (id: string, name: string, avatar: string) => {
    console.log(id, name);
    setPeerUserId(id);
    setPeerUsername(name);
    setPeerUserAvatar(avatar);
    newPeerUserId.current = id;
  };

  const { user } = props.auth;
  const { messages, resetList } = useMessages();
  const [userIds, setUserIds] = useState<string[]>([]);
  const [messageList, setMessageList] = useState<Message[]>([]);

  const updateMessage = () => {
    if (!user) {
      return;
    }
    axios
      .get("/api/messages", {
        headers: {
          testid: user?.userID || "",
        },
      })
      .then((res) => {
        setMessageList(res.data);
        setUserIds(
          Array.from(
            new Set([
              ...(newPeerUserId.current != "" ? [newPeerUserId.current] : []),
              ...res.data
                .filter((item: Message) => {
                  return (
                    item.senderID == user.userID ||
                    item.recipientID == user.userID
                  );
                })
                .map((item: Message) => {
                  return String(item.senderID == user.userID
                    ? item.recipientID
                    : item.senderID);
                }),
            ])
          )
        );
      });
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    updateMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (!peerUserId || !user) {
      return;
    }
    resetList(
      messageList
        .filter(
          (item) =>
            (item.senderID == user.userID &&
              item.recipientID == peerUserId) ||
            (item.senderID == peerUserId && item.recipientID == user.userID)
        )
        .map((item) => {
          return {
            _id: item.messageID,
            type: "text",
            content: {
              text: item.content,
            },
            position: item.senderID == user.userID ? "right" : "left",
            user: {
              avatar:
                item.senderID == user.userID
                  ? user.avatarPath
                  : peerUserAvatar,
            },
          };
        })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peerUserId, user, messageList]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const newMessage = (values: { peerUserId: string }) => {
    console.log(values);
    newPeerUserId.current = values.peerUserId;
    updateMessage();
    setModalVisible(false);
  };

  const onSend = () => {
    updateMessage();
  };

  useEffectOnce(() => {
    const timer = setInterval(() => {
      updateMessage();
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <Layout style={{ height: "100%" }}>
      <Layout.Sider>
        <Button
          onClick={() => {
            setModalVisible(true);
          }}
        >
          新建会话
        </Button>
        <Modal
          visible={modalVisible}
          onCancel={() => {
            setModalVisible(false);
          }}
          footer={null}
        >
          <Form onSubmit={newMessage}>
            <Form.Input field="peerUserId" label="对方ID" />
            <Button htmlType="submit">新建</Button>
          </Form>
        </Modal>
        <UserList onUserClick={onUserClick} userIds={userIds} />
      </Layout.Sider>
      <Layout.Content>
        {peerUserId && (
          <ChatView
            messages={messages}
            userId={user?.userID ?? ""}
            peerUserId={peerUserId}
            peerUserName={peerUsername}
            onSend={onSend}
          />
        )}
      </Layout.Content>
    </Layout>
  );
};
