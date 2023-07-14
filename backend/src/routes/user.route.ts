import express from "express";
import validateResource from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";
import {
  createUserController,
  getCurrentUserController,
} from "../controllers/user.controller";
import requireUser from "../middleware/requireUser";

const router = express.Router();
const baseURL = "/api/v1";

router.post(
  `${baseURL}/users`,
  validateResource(createUserSchema),
  createUserController
);
router.get(`${baseURL}/users/me`, requireUser, getCurrentUserController);

export default router;
