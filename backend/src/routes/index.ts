import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import { error } from "../utils/baseResponse";
import user from "./user.route";
import auth from "./auth.route";
import song from "./song.route";
import playlist from "./playlist.route";
import album from "./album.route";
import artist from "./artist.route";

const router = express.Router();
const baseURL = "/api/v1";

/**
 * *API endpoint for HealthCheck
 */
router.get(baseURL, (_req: Request, res: Response) => {
  res.send("This server is running!");
});

router.use(user);
router.use(auth);
router.use(song);
router.use(playlist);
router.use(album);
router.use(artist);

/**
 * *Callback for 404 error handling
 */
router.use((_req: Request, _res: Response, next: NextFunction) => {
  next(createHttpError(404, "Endpoint not found"));
});

/**
 * *Callback for error handling
 */
router.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(err)) {
      statusCode = err.status;
      errorMessage = err.message;
    }
    res.status(statusCode).json(error(errorMessage, statusCode));
  }
);

export default router;
