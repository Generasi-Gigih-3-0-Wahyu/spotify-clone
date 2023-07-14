import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
  MONGO_CONNECTION_STRING: str(),
  PORT: port(),
  SESSION_SECRET: str(),
  ACCESS_TOKEN_PUBLIC_KEY: str(),
  ACCESS_TOKEN_PRIVATE_KEY: str(),
  REFRESH_PRIVATE_KEY: str(),
  REFRESH_PUBLIC_KEY: str(),
});
