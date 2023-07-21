import express from "express";
import validateResource from "../middleware/validateResource";
import { createArtistSchema } from "../schema/artist.schema";
import {
  createArtistController,
  getArtistsController,
} from "../controllers/artist.controller";

const router = express.Router();
const baseURL = "/api/v1";

router.post(
  `${baseURL}/artists`,
  validateResource(createArtistSchema),
  createArtistController
);
router.get(`${baseURL}/artists`, getArtistsController);

export default router;
