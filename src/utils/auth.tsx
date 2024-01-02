import axios from "axios";
import { useState } from "react";
import { User } from "../../types";

export const defaultAvatar =
  "https://gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg";

export type Auth = {
  user?: User | null;
  login: (values: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  register: (values: User) => Promise<void>;
  update: (values: User) => Promise<void>;
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(sessionStorage.getItem("user") || "null")
  );
  const login = async (values: { username: string; password: string }) => {
    const res = await axios.post("/api/users/login", values);
    sessionStorage.setItem("user", JSON.stringify(res.data));
    setUser(res.data);
  };
  const logout = async () => {
    // await axios.post("/api/users/logout");
    sessionStorage.removeItem("user");
    setUser(null);
  };
  const register = async (values: User) => {
    await axios.post("/api/users/register", values);
  };
  const update = async (values: User) => {
    const res = await axios.put(`/api/users/${values.userID}`, values);
    sessionStorage.setItem("user", JSON.stringify(res.data));
    setUser(res.data);
  };
  return { user, login, logout, register, update };
};
