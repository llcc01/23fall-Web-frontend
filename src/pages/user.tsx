import { Button, Form } from "@douyinfe/semi-ui";

export const UserInfoPage = () => {
  return (
    <div style={{maxWidth: 200, margin: "0 auto"}}>
      <Form>
        <Form.Input field="id" label="ID" disabled/>
        <Form.Input field="username" label="用户名" />
        <Form.Input field="password" label="密码" />
        <Form.Input field="email" label="邮箱" />

        <Button htmlType="submit" type="primary">保存</Button>
      </Form>
    </div>
  );
};
