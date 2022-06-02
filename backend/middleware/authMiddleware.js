import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;

export default (req, res, next) => {
  let token = req.header("x-auth-token");

  const authToken = req.header("authorization");
  console.log(req.headers);

  // const api_key = req.header("api-key");

  // if (!(api_key === "secret")) {
  //   return res.status(401).json({
  //     message: "Unauthorized",
  //   });
  // }

  if (authToken) {
    token = authToken.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      message: "No token, authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Token is not valid",
    });
  }
};
