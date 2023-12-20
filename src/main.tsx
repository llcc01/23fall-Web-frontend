import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { PostDetail, PostList } from "./pages/post.tsx";
import { MessagePage } from "./pages/message.tsx";

const router = createHashRouter([
  {
    path: "/post/:id",
    element: (
      <App mode="detail">
        <PostDetail />
      </App>
    ),
  },
  {
    path: "/",
    element: (
      <App mode="list">
        <PostList />
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
