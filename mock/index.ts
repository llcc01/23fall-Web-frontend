import type { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";
const mock: Array<MockMethod> = [
  {
    url: "/api/post",
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
    url: "/api/post/:id",
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
];

export default mock;
