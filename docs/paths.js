export const paths = {
  "/blogs/all": {
    get: {
      tags: ["blogs"],
      summary: "Get all blogs",
      description: "Get all blogs",
      operationId: "getAllblogs",
      produces: ["application/x-www-form-urlencoded"],
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
  },
  "/blogs": {
    post: {
      tags: ["blogs"],
      summary: "Create a blog",
      description: "Create a blog",
      operationId: "createblog",
      produces: ["application/x-www-form-urlencoded"],
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
      produces: ["application/x-www-form-urlencoded"],
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
    "blog/": {
      get: {
        tags: ["blogs"],
        summary: "Get all blogs by Logged in user",
        description: "Get all blogs by Logged in user",
        operationId: "getBlogsByUser",
        produces: ["application/x-www-form-urlencoded"],
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
    },
    put: {
      tags: ["blogs"],
      summary: "Update a blog",
      description: "Update a blog",
      operationId: "updateblog",
      produces: ["application/x-www-form-urlencoded"],
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
      produces: ["application/x-www-form-urlencoded"],
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
  "/users/{id}": {
    get: {
      tags: ["users"],
      summary: "Get a user by id",
      description: "Get a user by id",
      operationId: "getuserById",
      produces: ["application/x-www-form-urlencoded"],
      parameters: [
        {
          in: "path",
          name: "id",
          description: "ID of user to return",
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
            $ref: "#/components/schemas/user",
          },
        },
        404: {
          description: "user not found",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
  },
  "/users": {
    post: {
      tags: ["users"],
      summary: "Create a new user",
      description: "Create a new user",
      operationId: "createuser",
      produces: ["application/x-www-form-urlencoded"],
      parameters: [
        {
          in: "body",
          name: "body",
          description: "user object that needs to be added to the store",
          required: true,
          schema: {
            $ref: "#/components/schemas/user",
          },
        },
      ],
      responses: {
        201: {
          description: "user created",
          schema: {
            $ref: "#/components/schemas/user",
          },
        },
        400: {
          description: "Invalid user object",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
  },
  "/users/login": {
    post: {
      tags: ["users"],
      summary: "Login a user",
      description: "Login a user",
      operationId: "loginuser",
      produces: ["application/x-www-form-urlencoded"],
      parameters: [
        {
          in: "body",
          name: "body",
          description: "user object that needs to be added to the store",
          required: true,
          schema: {
            $ref: "#/components/schemas/user",
          },
        },
      ],
      responses: {
        200: {
          description: "user logged in",
          schema: {
            $ref: "#/components/schemas/user",
          },
        },
        400: {
          description: "Invalid user object",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
  },
  "/users/register": {
    post: {
      tags: ["users"],
      summary: "Register a user",
      description: "Register a user",
      operationId: "registeruser",
      produces: ["application/x-www-form-urlencoded"],
      parameters: [
        {
          in: "body",
          name: "body",
          description: "user object that needs to be added to the store",
          required: true,
          schema: {
            $ref: "#/components/schemas/user",
          },
        },
      ],
      responses: {
        201: {
          description: "user registered",
          schema: {
            $ref: "#/components/schemas/user",
          },
        },
        400: {
          description: "Invalid user object",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
  },
  "/users/forgotpassword": {
    post: {
      tags: ["users"],
      summary: "Forgot password",
      description: "Forgot password",
      operationId: "forgotpassword",
      produces: ["application/x-www-form-urlencoded"],
      parameters: [
        {
          in: "body",
          name: "body",
          description: "user object that needs to be added to the store",
          required: true,
          produces: ["application/x-www-form-urlencoded"],
        },
      ],
      responses: {
        200: {
          description: "user logged in",
        },
        400: {
          description: "Invalid user object",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
  },
  "/users/resetpassword": {
    post: {
      tags: ["users"],
      summary: "Reset password",
      description: "Reset password",
      operationId: "resetpassword",
      produces: ["application/x-www-form-urlencoded"],
      parameters: [
        {
          in: "body",
          name: "body",
          description: "user object that needs to be added to the store",
          required: true,
          schema: {
            $ref: "#/components/schemas/user",
          },
        },
      ],
      responses: {
        200: {
          description: "user logged in",
          schema: {
            $ref: "#/components/schemas/user",
          },
        },
        400: {
          description: "Invalid user object",
        },
        500: {
          description: "Internal server error",
        },
      },
    },
  },
};
