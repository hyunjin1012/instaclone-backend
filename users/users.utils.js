import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const loggedInUser = await client.user.findFirst({ where: { id } });
    if (loggedInUser) {
      return loggedInUser;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const protectedResolver =
  (ourResolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      if (info.operation.operation === "query") {
        return null;
      } else {
        return {
          ok: false,
          error: "Please log in first.",
        };
      }
    }
    return ourResolver(root, args, context, info);
  };
