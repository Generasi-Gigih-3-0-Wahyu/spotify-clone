import express from "express";
import "dotenv/config";
import env from "./utils/validateEnv";
import morgan from "morgan";
import cors from "cors";
import router from "./routes";
import connectDb from "./utils/connectDb";
import deserializeUser from "./middleware/deserializeUser";

const app = express();
const port = env.PORT;

app.use(
  cors({
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(deserializeUser);
app.use(router);

app.listen(port, () => {
  connectDb();
});

export default app;
