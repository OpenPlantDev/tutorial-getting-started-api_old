import {ApiError} from "../api/ApiError";
import jwt from "jsonwebtoken";

export interface IAuthPayload {
  sub: string;
}

function isAuthPayload(obj: any): obj is IAuthPayload {
  const payload = obj as IAuthPayload;

  return (payload && (payload.sub !== undefined));
}

const getSecret = (): string => {
  return process.env.SECRET || "defaultPrivateKey";
};

const validateCredentials = (userName: string, password: string): boolean | ApiError => {
  if (!userName.toLowerCase().endsWith("@bentley.com")) {
    return new ApiError(401, "Invalid User Name");
  }
  if (password !== "123") {
    return new ApiError(401, "Incorrect password");
  }
  return true;
};

export const createToken = (userName: string, password: string): string | ApiError => {
  const result = validateCredentials(userName, password);
  if (result instanceof ApiError) {
    return result;
  }
  return jwt.sign({sub: userName}, getSecret(), {issuer: "bentley", expiresIn: "1d"});
};

export const validateToken = (authHeader: string): boolean | ApiError => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new ApiError(401, "Invalid token");
  }
  const token = authHeader.substring(7);
  // console.log(`token:${token}`);
  try {
    const options: jwt.VerifyOptions = {ignoreExpiration: false, issuer: "bentley"};
    const payload = jwt.verify(token, getSecret(), options);
    if (!payload || !isAuthPayload(payload)) {
      return new ApiError(401, "Invalid token");
    }

    console.log(`userName: ${payload.sub}`);
    return true;
  } catch (err) {
    return new ApiError(401, err.message);
  }
};
