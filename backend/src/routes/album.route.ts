import express from "express";
import validateResource from "../middleware/validateResource";
import {
  addSongToAlbumSchema,
  createAlbumSchema,
} from "../schema/album.schema";
import {
  addSongToAlbumController,
  createAlbumController,
  getAlbumsController,
} from "../controllers/album.controller";

const router = express.Router();
const baseURL = "/api/v1";

router.post(
  `${baseURL}/albums`,
  validateResource(createAlbumSchema),
  createAlbumController
);
router.get(`${baseURL}/albums`, getAlbumsController);
router.post(
  `${baseURL}/albums/:albumId`,
  validateResource(addSongToAlbumSchema),
  addSongToAlbumController
);

export default router;
