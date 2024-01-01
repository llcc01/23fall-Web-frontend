import { Button, Form, Toast } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth";
import { User } from "../../types";

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (values: { username: string; password: string }) => {
    login(values).then(() => {
      navigate("/");
    });
  };

  return (
    <div style={{ maxWidth: 200, margin: "0 auto" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Input field="username" label="用户名" />
        <Form.Input field="password" label="密码" mode="password" />
        <Button htmlType="submit">登录</Button>
        <Button
          onClick={() => navigate("/register")}
          style={{ marginLeft: 10 }}
        >
          前往注册
        </Button>
      </Form>
    </div>
  );
};

export const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (values: User) => {
    register(values).then(() => {
      Toast.success("注册成功");
      navigate("/login");
    });
  };

  return (
    <div style={{ maxWidth: 200, margin: "0 auto" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Input field="username" label="用户名" />
        <Form.Input field="password" label="密码" mode="password" />
        <Form.Input field="email" label="邮箱" />
        <Button htmlType="submit">注册</Button>
      </Form>
    </div>
  );
};
