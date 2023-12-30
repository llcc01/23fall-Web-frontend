import { Button, Form, Toast } from "@douyinfe/semi-ui";
import { useAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { User } from "../../types";

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
        <Form.Input field="password" label="密码" />
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
