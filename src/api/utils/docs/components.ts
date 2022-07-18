const components = {
  schemas: {
    Image: {
      type: "object",
      properties: {
        file: {
          type: "file",
        },
        tag: {
          type: "string",
        },
      },
    },
  },
};

export default components;
