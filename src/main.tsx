import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { MyPostListPage, PostDetailPage , PostListPage } from "./pages/post.tsx";
import { UserInfoPage } from "./pages/user.tsx";
import { MessagePage } from "./pages/message.tsx";

const router = createHashRouter([
  {
    path: "/posts/:id/view",
    element: (
      <App mode="detail">
        <PostDetailPage />
      </App>
    ),
  },
  {
    path: "/posts/:id/edit",
    element: (
      <App mode="edit">
        <PostDetailPage />
      </App>
    ),
  },
  {
    path: "/",
    element: (
      <App mode="list">
        <PostListPage />
      </App>
    ),
  },
  {
    path: "/message",
    element: (
      <App mode="message">
        <MessagePage />
      </App>
    ),
  },
  {
    path: "/myPost",
    element: (
      <App mode="myPost">
        <MyPostListPage />
      </App>
    ),
  },
  {
    path: "/myInfo",
    element: (
      <App mode="myInfo">
        <UserInfoPage />
      </App>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
