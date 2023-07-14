import express from "express";
import validateResource from "../middleware/validateResource";
import { createSessionSchema } from "../schema/auth.schema";
import { createSessionController, refreshAccessTokenController } from "../controllers/auth.controller";

const router = express.Router();
const baseURL = "/api/v1";

router.post(
  `${baseURL}/session`,
  validateResource(createSessionSchema),
  createSessionController
);
router.post(`${baseURL}/session/refresh`, refreshAccessTokenController);

export default router;
