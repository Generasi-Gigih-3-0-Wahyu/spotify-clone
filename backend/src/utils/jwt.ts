import jwt from "jsonwebtoken";
import env from "./validateEnv";

export function signJwt(
  object: object,
  keyName: "ACCESS_TOKEN_PRIVATE_KEY" | "REFRESH_PRIVATE_KEY",
  options?: jwt.SignOptions | undefined
) {
  const signingKey = Buffer.from(env[keyName], "base64").toString("ascii");

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt<T>(
  token: string,
  keyName: "ACCESS_TOKEN_PUBLIC_KEY" | "REFRESH_PUBLIC_KEY"
): T | null {
  const publicKey = Buffer.from(env[keyName], "base64").toString("ascii");

  try {
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (e) {
    console.log(e);
    
    return null;
  }
}
