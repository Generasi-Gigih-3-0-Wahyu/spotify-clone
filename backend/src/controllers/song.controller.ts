import { Request, Response } from "express";
import { CreateSongInput } from "../schema/song.schema";
import {
  createSong,
  findSongByTitleAndArtist,
  getSongs,
} from "../services/song.service";
import { error, success } from "../utils/baseResponse";

export async function createSongController(
  req: Request<unknown, unknown, CreateSongInput>,
  res: Response
) {
  const body = req.body;

  const existSong = await findSongByTitleAndArtist(body.title, body.artists);
  if (existSong) {
    return res.status(409).json(error("Song Already Exist", res.statusCode));
  }

  try {
    const song = await createSong(body);
    return res
      .status(201)
      .json(success("Successfully Created Song", song, res.statusCode));
  } catch (err: any) {
    return res.status(500).json(error("Internal Server Error", res.statusCode));
  }
}

export async function getSongListController(_req: Request, res: Response) {
  try {
    const songs = await getSongs();
    return res
      .status(200)
      .json(success("Successfully get all songs", songs, res.statusCode));
  } catch (err: any) {
    return res.status(500).json(error("Internal Server Error", res.statusCode));
  }
}
