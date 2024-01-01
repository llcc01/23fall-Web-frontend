import { Tabs } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useMedia } from "react-use";

const App = (props: { mode?: string; children?: JSX.Element }) => {
  const navigate = useNavigate();
  const isDarkMode = useMedia("(prefers-color-scheme: dark)");
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

  useEffect(() => {
    sessionStorage.removeItem("userInfoList");
    console.log("remove userInfoList");
  }, []);

  return (
    <div style={{ padding: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Tabs
          activeKey={props.mode ?? "list"}
          onTabClick={onTabClick}
          type="button"
        >
          <Tabs.TabPane tab="帖子" itemKey="list" />
          <Tabs.TabPane tab="搜索" itemKey="search" />
          <Tabs.TabPane tab="站内信" itemKey="message" />
          <Tabs.TabPane tab="我的帖子" itemKey="myPost" />
          <Tabs.TabPane tab="我的信息" itemKey="myInfo" />
        </Tabs>
      </div>
      <div
        style={{
          height: "calc(100vh - 100px)",
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default App;
