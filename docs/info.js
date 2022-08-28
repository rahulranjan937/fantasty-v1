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
    url: "http://localhost:3000/api/v1/",
    description: "Local server",
  },
  {
    url: "https://fanstasy-v.azurewebsites.net/api/v1/",
    description: "Production server",
  },
];
