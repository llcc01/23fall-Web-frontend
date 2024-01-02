import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createHashRouter } from "react-router-dom";

const router = createHashRouter([
  {
    path: "/posts/:id/view",
    element: (
      <App mode="detail"/>
    ),
  },
  {
    path: "/posts/:id/edit",
    element: (
      <App mode="edit"/>
    ),
  },
  {
    path: "/posts/search/",
    element: (
      <App mode="search"/>
    ),
  },
  {
    path: "/posts/search/:keyword",
    element: (
      <App mode="search"/>
    ),
  },
  {
    path: "/",
    element: (
      <App mode="list"/>
    ),
  },
  {
    path: "/message",
    element: (
      <App mode="message"/>
    ),
  },
  {
    path: "/users/:userId/posts",
    element: (
      <App mode="userPost"/>
    ),
  },
  {
    path: "/users/my/posts",
    element: (
      <App mode="myPost"/>
    ),
  },
  {
    path: "/users/:userId/info",
    element: (
      <App mode="userInfo"/>
    ),
  },
  {
    path: "/users/my/info",
    element: (
      <App mode="myInfo"/>
    ),
  },
  {
    path: "/login",
    element: (
      <App mode="login"/>
    ),
  },
  {
    path: "/register",
    element: (
      <App mode="register"/>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
