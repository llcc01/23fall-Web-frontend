export type Post = {
  postID: string;
  title: string;
  dateTime: string;
  userID?: string;
  username?: string;
  content?: string;
  images?: string[];
};

export type User = {
  userID: string;
  username: string;
  password?: string;
  email?: string;
};

export type Message = {
  id: string;
  senderID: string;
  recipientID: string;
  content: string;
  dateTime: string;
};
