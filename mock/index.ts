import type { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";

const Random = Mock.Random;

Random.extend({
  chat(userId1: string, userId2: string) {
    const randomBoolean = Random.boolean();
    return {
      type: "text",
      messageID: Random.id(),
      senderID: randomBoolean ? userId1 : userId2,
      recipientID: randomBoolean ? userId2 : userId1,
      content: Random.cparagraph(),
    };
  },
});

const mock: Array<MockMethod> = [
  {
    url: "/api/posts",
    method: "get",
    response: () => {
      return Mock.mock({
        "list|10": [
          {
            postID: "@id",
            title: "@ctitle",
            dateTime: "@datetime",
          },
        ],
      }).list;
    },
  },
  {
    url: "/api/posts/:id",
    method: "get",
    response: (opt: { query: { id: string } }) => {
      return Mock.mock({
        postID: opt.query.id,
        title: "@ctitle",
        dateTime: "@datetime",
        content: "@cparagraph",
      });
    },
  },
  {
    url: "/api/posts/user/:userid",
    method: "get",
    response: () => {
      return Mock.mock({
        "list|10": [
          {
            postID: "@id",
            title: "@ctitle",
            dateTime: "@datetime",
          },
        ],
      }).list;
    },
  },
  {
    url: "/api/messages",
    method: "get",
    response: (opt: { headers: { testid: string } }) => {
      return Mock.mock({
        "list|10": ["@chat(" + opt.headers.testid + ", @id)"],
      }).list;
    },
  },
  {
    url: "/api/users/login",
    method: "post",
    response: (opt: { body: { username: string; password: string } }) => {
      return Mock.mock({
        userID: "@id",
        username: opt.body.username,
        email: "@email",
      });
    },
  },
  {
    url: "/api/users/:id",
    method: "get",
    response: (opt: { query: { id: string } }) => {
      return Mock.mock({
        userID: opt.query.id,
        username: "@cname",
        email: "@email",
      });
    },
  },
];

export default mock;
