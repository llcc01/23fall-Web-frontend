import { Avatar, Tabs } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useMedia } from "react-use";
import { useAuth } from "./utils/auth";
import { MyPostListPage, PostDetailPage, PostEditPage, PostListPage, SearchPostListPage, UserPostListPage } from "./pages/post";
import { MessagePage } from "./pages/message";
import { MyInfoPage, UserInfoPage } from "./pages/user";
import { LoginPage, RegisterPage } from "./pages/login";

const App = (props: { mode: string; children?: JSX.Element }) => {
  const navigate = useNavigate();
  const isDarkMode = useMedia("(prefers-color-scheme: dark)");
  const auth = useAuth();
  const onTabClick = (key: string) => {
    console.log(key);
    switch (key) {
      case "list":
        navigate("/");
        break;
      case "message":
        navigate("/message");
        break;
      case "myPost":
        navigate("/users/my/posts");
        break;
      case "myInfo":
        navigate("/users/my/info");
        break;
      case "search":
        navigate("/posts/search/");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.setAttribute("theme-mode", "dark");
    } else {
      body.removeAttribute("theme-mode");
    }
  }, [isDarkMode]);

  useEffect(() => {}, []);

  const routerMap: Record<string, JSX.Element> = {
    detail: <PostDetailPage />,
    edit: <PostEditPage />,
    search: <SearchPostListPage />,
    list: <PostListPage />,
    message: <MessagePage auth={auth}/>,
    myPost: <MyPostListPage auth={auth}/>,
    userPost: <UserPostListPage />,
    myInfo: <MyInfoPage auth={auth}/>,
    userInfo: <UserInfoPage/>,
    login: <LoginPage auth={auth}/>,
    register: <RegisterPage auth={auth}/>,
  }

  return (
    <div style={{ padding: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
          backgroundColor: "var( --semi-color-bg-0)",
        }}
      >
        <Tabs
          activeKey={props.mode ?? "list"}
          onTabClick={onTabClick}
          type="button"
          style={{
            marginTop: 10,
          }}
        >
          <Tabs.TabPane tab="帖子" itemKey="list" />
          <Tabs.TabPane tab="搜索" itemKey="search" />
          <Tabs.TabPane tab="站内信" itemKey="message" />
          <Tabs.TabPane tab="我的帖子" itemKey="myPost" />
          <Tabs.TabPane tab="我的信息" itemKey="myInfo" />
        </Tabs>
        <Avatar
          size="default"
          style={{
            marginLeft: 10,
          }}
          alt="头像"
          onClick={() => {
            navigate("/users/my/info");
          }}
          src={auth.user?.avatarPath}
        />
      </div>
      <div
        style={{
          height: "calc(100vh - 140px)",
          maxWidth: 800,
          margin: "0 auto",
          backgroundColor: "var( --semi-color-bg-0)",
          padding: 20,
        }}
      >
        {routerMap[props.mode] ?? props.children}
      </div>
    </div>
  );
};

export default App;
