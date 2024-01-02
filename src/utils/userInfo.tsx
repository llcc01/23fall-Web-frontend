import axios from "axios";
import { User } from "../../types";

export const getUserInfo = async (userId: string) => {
  if (!userId) {
    return null;
  }
  const userInfoList = JSON.parse(sessionStorage.getItem("userInfoList") || "{}");
  let userInfo: User = userInfoList[userId];
  if (!userInfo) {
    await axios.get(`/api/users/${userId}`).then((res) => {
      userInfo = res.data;
      userInfo.userID = String(userInfo.userID);
      userInfoList[userId] = userInfo;
      sessionStorage.setItem("userInfoList", JSON.stringify(userInfoList));
    });
  }
  return userInfo;
};
