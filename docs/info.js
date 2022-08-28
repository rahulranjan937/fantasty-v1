export const openapi = "3.0.1";
export const info = {
  version: "1.0.0",
  title: "Blog Post API",
  description: " API for creating, updating, and deleting blog posts",
  contact: {
    name: "Rahul Ranjan",
    email: "admin@gmail.com",
    url: "http://localhost:3000/api-docs/",
  },
};

export const servers = [
  {
    url: "http://localhost:3000/api/",
    description: "Local server",
  },
];

export const paths = {
  "/blogs": {
    get: {
      tags: ["blogs"],
      summary: "Get all blogs",
      description: "Get all blogs",
      operationId: "getAllblogs",
      produces: ["application/json"],
      responses: {
        200: {
          description: "Successful operation",
          schema: {
            type: "array",
            items: {
              $ref: "#/components/schemas/blog",
            },
          },
        },
        500: {
          description: "Internal server error",
        },
      },
    },
    post: {
      tags: ["blogs"],
      summary: "Create a blog",
      description: "Create a blog",
      operationId: "createblog",
      produces: ["application/json"],
      parameters: [
        {
          in: "body",
          name: "body",
          description: "blog object that needs to be added to the store",
          required: true,
          schema: {
            $ref: "#/components/schemas/blog",
          },
        },
      ],
      responses: {
        201: {
          description: "blog created",
          schema: {
            $ref: "#/components/schemas/blog",
          },
        },
        400: {
          description: "Invalid blog object",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
  },
  "/blogs/{id}": {
    get: {
      tags: ["blogs"],
      summary: "Get a blog by id",
      description: "Get a blog by id",
      operationId: "getblogById",
      produces: ["application/json"],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "ID of blog to return",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Successful operation",
          schema: {
            $ref: "#/components/schemas/blog",
          },
        },
        404: {
          description: "blog not found",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
    put: {
      tags: ["blogs"],
      summary: "Update a blog",
      description: "Update a blog",
      operationId: "updateblog",
      produces: ["application/json"],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "ID of blog to update",
          required: true,
          schema: {
            type: "string",
          },
        },
        {
          in: "body",
          name: "body",
          description: "blog object that needs to be updated",
          required: true,
          schema: {
            $ref: "#/components/schemas/blog",
          },
        },
      ],
      responses: {
        200: {
          description: "Successful operation",
          schema: {
            $ref: "#/components/schemas/blog",
          },
        },
        400: {
          description: "Invalid blog object",
        },
        404: {
          description: "blog not found",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
    delete: {
      tags: ["blogs"],
      summary: "Delete a blog",
      description: "Delete a blog",
      operationId: "deleteblog",
      produces: ["application/json"],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "ID of blog to delete",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Successful operation",
        },
        404: {
          description: "blog not found",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
  },
};

export const components = {
  schemas: {
    Post: {
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
  },
};

export const tags = [
  {
    name: "blogs",
    description: "Everything about blogs",
  },
];

export const security = [
  {
    bearerAuth: [],
  },
];
