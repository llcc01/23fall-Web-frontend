import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import {
  MyPostListPage,
  PostDetailPage,
  PostEditPage,
  PostListPage,
  UserPostListPage,
} from "./pages/post.tsx";
import { MyInfoPage, UserInfoPage } from "./pages/user.tsx";
import { MessagePage } from "./pages/message.tsx";
import { LoginPage, RegisterPage } from "./pages/login.tsx";

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
        <PostEditPage />
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
    path: "/users/:userId/posts",
    element: (
      <App mode="userInfo">
        <UserPostListPage />
      </App>
    ),
  },
  {
    path: "/users/my/posts",
    element: (
      <App mode="myPost">
        <MyPostListPage />
      </App>
    ),
  },
  {
    path: "/users/:userId/info",
    element: (
      <App mode="userInfo">
        <UserInfoPage />
      </App>
    ),
  },
  {
    path: "/users/my/info",
    element: (
      <App mode="myInfo">
        <MyInfoPage />
      </App>
    ),
  },
  {
    path: "/login",
    element: (
      <App mode="login">
        <LoginPage />
      </App>
    ),
  },
  {
    path: "/register",
    element: (
      <App mode="register">
        <RegisterPage />
      </App>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
