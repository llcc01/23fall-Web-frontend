import {
  Button,
  Descriptions,
  Form,
  Toast,
  Typography,
} from "@douyinfe/semi-ui";
import { useAuth } from "../utils/auth";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "../../types";
import { getUserInfo } from "../utils/userInfo";
import { Data } from "@douyinfe/semi-ui/lib/es/descriptions";

export const MyInfoPage = () => {
  const { user, logout, update } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const handleSubmit = (values: User) => {
    update(values).then(() => {
      Toast.success("修改成功");
    });
  };
  return (
    <div style={{ maxWidth: 200, margin: "0 auto" }}>
      <Form onSubmit={handleSubmit} initValues={user}>
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
    </div>
  );
};

export const UserInfoPage = () => {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState<Data[]>([]);
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
          value: res.username,
        },
        {
          key: "用户ID",
          value: res.userID,
        },
        {
          key: "邮箱",
          value: res.email,
        },
      ]);
    });
  }, [userId]);
  return (
    <div
      style={{
        maxWidth: 200,
        margin: "0 auto",
      }}
    >
      <p>用户信息</p>
      <Descriptions data={userInfo} />
      <Typography.Text
        link
        onClick={() => {
          navigate(`/users/${userId}/posts`);
        }}
      >
        Ta 的帖子
      </Typography.Text>
    </div>
  );
};
