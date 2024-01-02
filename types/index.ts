export type Post = {
  postID: string;
  title: string;
  dateTime: string;
  userID?: string;
  username?: string;
  content?: string;
  imagePathArray?: string[];
};

export type User = {
  userID: string;
  username: string;
  password?: string;
  email?: string;
  avatarPath?: string;
};

export type Message = {
  messageID: string;
  senderID: string;
  recipientID: string;
  content: string;
  dateTime: string;
};
