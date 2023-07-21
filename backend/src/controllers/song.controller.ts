import { Request, Response } from "express";
import { CreateSongInput, PlaySongInput } from "../schema/song.schema";
import {
  createSong,
  findSongById,
  findSongByTitleAndArtist,
  getSongs,
  getSongsMostPlayed,
  playSong,
} from "../services/song.service";
import { error, success } from "../utils/baseResponse";
import { addSongToArtist, findArtistsByIds } from "../services/artist.service";

export async function createSongController(
  req: Request<unknown, unknown, CreateSongInput>,
  res: Response
) {
  const body = req.body;

  const existSong = await findSongByTitleAndArtist(body.title, body.artists);
  if (existSong) {
    return res.status(409).json(error("Song Already Exist", res.statusCode));
  }

  const artists = await findArtistsByIds(body.artists);
  if (artists.length === 0) {
    return res.status(404).json(error("Artists Not Found", res.statusCode));
  }

  try {
    const song = await createSong({
      title: body.title,
      url: body.url,
      imageUrl: body.imageUrl,
      artists,
    });

    for (const artist of artists) {
      await addSongToArtist(song, artist);
    }

    return res
      .status(201)
      .json(success("Successfully Created Song", song, res.statusCode));
  } catch (err: any) {
    console.log(err);
    return res.status(500).json(error("Internal Server Error", res.statusCode));
  }
}

export async function getSongsController(_req: Request, res: Response) {
  try {
    const songs = await getSongs();
    return res
      .status(200)
      .json(success("Successfully get all songs", songs, res.statusCode));
  } catch (err: any) {
    return res.status(500).json(error("Internal Server Error", res.statusCode));
  }
}

export async function playSongController(req: Request<PlaySongInput>, res: Response) {
  const params = req.params;

  const song = await findSongById(params.songId);
  if (!song) {
    return res.status(404).json(error("Song not found", res.statusCode));
  }

  const played = await playSong(song);
  return res.status(200).json(success("Successfully played song", played, res.statusCode));
}

export async function getSongsMostPlayedController(_req: Request, res: Response) {
  try {
    const songs = await getSongsMostPlayed()
    return res
      .status(200)
      .json(success("Successfully get all songs", songs, res.statusCode));
  } catch (err: any) {
    return res.status(500).json(error("Internal Server Error", res.statusCode));
  }
}