import { Tabs } from "@douyinfe/semi-ui";
import "./App.css";
import { useNavigate } from "react-router-dom";

const App = (props: { mode?: string; children?: JSX.Element }) => {
  const navigate = useNavigate();
  const onTabClick = (key: string) => {
    console.log(key);
    switch (key) {
      case "list":
        navigate("/");
        break;
      case "message":
        navigate("/message");
        break;
      default:
        break;
    }
  };
  return (
    <div style={{ height: "100vh", margin: "0px 10px" }}>
      <Tabs activeKey={props.mode ?? "list"} onTabClick={onTabClick}>
        <Tabs.TabPane tab="帖子" itemKey="list" />
        <Tabs.TabPane tab="站内信" itemKey="message" />
      </Tabs>

      <div style={{ height: "calc(100% - 100px)" }}>{props.children}</div>
    </div>
  );
};

export default App;
