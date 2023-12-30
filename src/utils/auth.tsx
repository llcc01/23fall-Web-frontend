import axios from "axios";
import { useState } from "react";
import { User } from "../../types";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const login = async (values: { username: string; password: string }) => {
    const res = await axios.post("/api/users/login", values);
    localStorage.setItem("user", JSON.stringify(res.data));
    setUser(res.data);
  };
  const logout = async () => {
    // await axios.post("/api/users/logout");
    localStorage.removeItem("user");
    setUser(null);
  };
  const register = async (values: User) => {
    const res = await axios.post("/api/users/register", values);
    localStorage.setItem("user", JSON.stringify(res.data));
    setUser(res.data);
  };
  const update = async (values: User) => {
    const res = await axios.put(`/api/users/${values.userID}`, values);
    localStorage.setItem("user", JSON.stringify(res.data));
    setUser(res.data);
  };
  return { user, login, logout, register, update };
};
