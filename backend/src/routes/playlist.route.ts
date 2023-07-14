import express from "express";
import requireUser from "../middleware/requireUser";
import {
  addSongToPlaylistController,
  createPlaylistController,
  getPlaylistUserController,
  playSongController,
} from "../controllers/playlist.controller";
import validateResource from "../middleware/validateResource";
import {
  addSongToPlaylistSchema,
  createPlaylistSchema,
} from "../schema/playlist.schema";

const router = express.Router();
const baseURL = "/api/v1";

router.post(
  `${baseURL}/playlist`,
  [validateResource(createPlaylistSchema), requireUser],
  createPlaylistController
);
router.post(
  `${baseURL}/playlist/:playlistId`,
  [validateResource(addSongToPlaylistSchema), requireUser],
  addSongToPlaylistController
);
router.get(`${baseURL}/playlist`, requireUser, getPlaylistUserController);
router.get(
  `${baseURL}/playlist/:playlistId/:songId`,
  requireUser,
  playSongController
);

export default router;
