import { Button, Card, Form, Toast } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";
import { User } from "../../types";
import { Auth } from "../utils/auth";

export const LoginPage = (props: { auth: Auth }) => {
  const { login } = props.auth;
  const navigate = useNavigate();
  const handleSubmit = (values: { username: string; password: string }) => {
    login(values)
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        Toast.error(e.response.data);
      });
  };

  return (
    <Card style={{ maxWidth: 300, margin: "0 auto" }}>
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
    </Card>
  );
};

export const RegisterPage = (props: { auth: Auth }) => {
  const { register } = props.auth;
  const navigate = useNavigate();
  const handleSubmit = (values: User) => {
    register(values)
      .then(() => {
        Toast.success("注册成功");
        navigate("/login");
      })
      .catch((e) => {
        Toast.error(e.response.data);
      });
  };

  return (
    <Card style={{ maxWidth: 300, margin: "0 auto" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Input field="username" label="用户名" />
        <Form.Input field="password" label="密码" mode="password" />
        <Form.Input field="email" label="邮箱" />
        <Button htmlType="submit">注册</Button>
      </Form>
    </Card>
  );
};
