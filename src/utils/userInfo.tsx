import axios from "axios";
import { User } from "../../types";

export const getUserInfo = async (userId: string) => {
  const userInfoList = JSON.parse(localStorage.getItem("userInfoList") || "[]");
  let userInfo: User = userInfoList.find((item: User) => item.userID === userId);
  if (!userInfo) {
    await axios.get(`/api/users/${userId}`).then((res) => {
      userInfo = res.data;
      userInfoList.push(userInfo);
      localStorage.setItem("userInfoList", JSON.stringify(userInfoList));
    });
  }
  return userInfo;
};
