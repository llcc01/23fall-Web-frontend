export type Post = {
  id: string;
  title: string;
  postTime: string;
  userId?: string;
  userName?: string;
  content?: string;
};

export type User = {
  id: string;
  name: string;
};
