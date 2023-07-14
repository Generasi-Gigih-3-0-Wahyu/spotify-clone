import express from "express";
import {
  createSongController,
  getSongListController,
} from "../controllers/song.controller";
import validateResource from "../middleware/validateResource";
import { createSongSchema } from "../schema/song.schema";

const router = express.Router();
const baseURL = "/api/v1";

router.post(
  `${baseURL}/song`,
  validateResource(createSongSchema),
  createSongController
);
router.get(`${baseURL}/song`, getSongListController);

export default router;
