import type { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";

const Random = Mock.Random;

Random.extend({
  chat(userId1: string, userId2: string) {
    const randomBoolean = Random.boolean();
    return {
      type: "text",
      id: Random.id(),
      userIdFrom: randomBoolean ? userId1 : userId2,
      userIdTo: randomBoolean ? userId2 : userId1,
      content: { text: Random.cparagraph() },
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
            id: "@id",
            title: "@ctitle",
            postTime: "@datetime",
          },
        ],
      });
    },
  },
  {
    url: "/api/posts/:id",
    method: "get",
    response: (opt: { query: { id: string } }) => {
      return Mock.mock({
        id: opt.query.id,
        title: "@ctitle",
        postTime: "@datetime",
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
            id: "@id",
            title: "@ctitle",
            postTime: "@datetime",
          },
        ],
      });
    },
  },
  {
    url: "/api/message/users",
    method: "get",
    response: () => {
      return Mock.mock({
        "list|10": [
          {
            id: "@id",
            name: "@cname",
          },
        ],
      });
    },
  },
  {
    url: "/api/message/:id",
    method: "get",
    response: (opt: { query: { id: string } }) => {
      return Mock.mock({
        "list|10": ["@chat(" + opt.query.id + ", @id)"],
      });
    },
  },
];

export default mock;
