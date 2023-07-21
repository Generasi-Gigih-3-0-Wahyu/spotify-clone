import express from "express";
import {
  createSongController,
  getSongsController,
  getSongsMostPlayedController,
  playSongController,
} from "../controllers/song.controller";
import validateResource from "../middleware/validateResource";
import { createSongSchema, playSongSchema } from "../schema/song.schema";

const router = express.Router();
const baseURL = "/api/v1";

router.post(
  `${baseURL}/song`,
  validateResource(createSongSchema),
  createSongController
);
router.get(`${baseURL}/song`, getSongsController);
router.get(`${baseURL}/song/mostplayed`, getSongsMostPlayedController);
router.get(
  `${baseURL}/song/play/:songId`,
  validateResource(playSongSchema),
  playSongController
);

export default router;
