import mongoose from "mongoose";
import "dotenv/config";
import env from "./validateEnv";
import log from "./logger";

async function connectDb() {
  const port = env.PORT;
  try {
    await mongoose.connect(env.MONGO_CONNECTION_STRING);
    log.info("Connected to MongoDB");
    log.info(`App started at http://localhost:${port}/api/v1/`);
  } catch (err: any) {
    log.error(err);
    process.exit(1);
  }
}

export default connectDb;
