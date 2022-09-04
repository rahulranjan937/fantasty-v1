export const components = {
  schemas: {
    Blog: {
      type: "object",
      properties: {
        id: {
          type: "string",
          format: "uuid",
        },
        title: {
          type: "string",
        },
        content: {
          type: "string",
        },
        createdAt: {
          type: "string",
          format: "date-time",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
        },
      },
    },
    Users: {
      type: "object",
      properties: {
        id: {
          type: "string",
          format: "uuid",
        },
        name: {
          type: "string",
        },
        email: {
          type: "string",
        },
        password: {
          type: "string",
        },
        resgisteredDate: {
          type: "string",
          format: "date-time",
        },
        token: {
          type: "string",
        },
      },
    },
  },
};
