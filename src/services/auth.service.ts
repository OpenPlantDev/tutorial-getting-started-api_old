import {ApiError} from "../api/ApiError";
import jwt from "jsonwebtoken";

export interface IAuthPayload {
  email: string;
}

function isAuthPayload(obj: any): obj is IAuthPayload {
  const payload = obj as IAuthPayload;

  return (payload && (payload.email !== undefined));
}

export const createToken = (email: string): string | ApiError => {
  if (email.toLowerCase().endsWith("bentley.com")) {
    const token = jwt.sign({email}, "privatekey", {issuer: "bentley", expiresIn: 120});
    return token;
  } else {
    return new ApiError(401, "Invalid token request");
  }

};

export const validateToken = (authHeader: string): boolean | ApiError => {

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new ApiError(401, "Invalid token");
      }
      const token = authHeader.substring(7);
      console.log(`token:${token}`);
      try {
        const options: jwt.VerifyOptions = {ignoreExpiration: false, issuer: "bentley"};
        const payload = jwt.verify(token, "privatekey", options);
        if (!payload || !isAuthPayload(payload)) {
          return new ApiError(401, "Invalid token");
        }

        console.log(`userName: ${payload.email}`);
        return true;
      } catch (err) {
        return new ApiError(401, err.message);
      }
    };
