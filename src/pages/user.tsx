import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Form,
  Toast,
  Typography,
  Upload,
} from "@douyinfe/semi-ui";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "../../types";
import { getUserInfo } from "../utils/userInfo";
import { Data } from "@douyinfe/semi-ui/lib/es/descriptions";
import { Auth } from "../utils/auth";

export const MyInfoPage = (props: {auth: Auth}) => {
  const { user, update, logout } = props.auth;
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    setAvatar(user?.avatarPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const handleSubmit = (values: User) => {
    update({ ...values, avatarPath: avatar }).then(() => {
      Toast.success("修改成功");
      navigate("/");
    });
  };
  return (
    <Card style={{ maxWidth: 300, margin: "0 auto" }}>
      {user && (
        <Form onSubmit={handleSubmit} initValues={user}>
          <Upload
            action="/api/posts/uploadImage"
            showUploadList={false}
            name="files"
            onSuccess={(res) => {
              Toast.success("上传成功");
              console.log(res);
              setAvatar("/api/posts/images/" + res[0]);
            }}
            onError={() => {
              Toast.error("上传失败");
            }}
          >
            <Avatar size="large" src={avatar} />
          </Upload>
          <Form.Input
            field="userID"
            label="ID"
            disabled
            inputStyle={{
              cursor: "text",
            }}
          />
          <Form.Input field="username" label="用户名" />
          <Form.Input field="password" label="密码" mode="password" />
          <Form.Input field="email" label="邮箱" />

          <Button htmlType="submit" type="primary">
            保存
          </Button>

          <Button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            style={{ marginLeft: 10 }}
            type="danger"
          >
            退出登录
          </Button>
        </Form>
      )}
    </Card>
  );
};

export const UserInfoPage = () => {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState<Data[]>([]);
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(userId);
    if (!userId) {
      return;
    }
    getUserInfo(userId).then((res) => {
      console.log(res);
      setUserInfo([
        {
          key: "用户名",
          value: res?.username,
        },
        {
          key: "用户ID",
          value: res?.userID,
        },
        {
          key: "邮箱",
          value: res?.email,
        },
      ]);
      setAvatar(res?.avatarPath);
    });
  }, [userId]);
  return (
    <Card
      style={{
        maxWidth: 400,
        margin: "0 auto",
      }}
      header="用户信息"
    >
      <Avatar size="large" src={avatar} />
      <Descriptions data={userInfo} align="left" />
      <Typography.Text
        link
        onClick={() => {
          navigate(`/users/${userId}/posts`);
        }}
      >
        Ta 的帖子
      </Typography.Text>
    </Card>
  );
};
