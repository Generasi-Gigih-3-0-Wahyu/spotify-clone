import { Request, Response } from "express";
import { AddSongToAlbumInput, CreateAlbumInput } from "../schema/album.schema";
import { error, success } from "../utils/baseResponse";
import {
  addSongToAlbum,
  createAlbum,
  findAlbumById,
  findAlbums,
} from "../services/album.service";
import { findArtistById } from "../services/artist.service";
import { addAlbumToSong, findSongsByIds } from "../services/song.service";

export async function createAlbumController(
  req: Request<unknown, unknown, CreateAlbumInput>,
  res: Response
) {
  const body = req.body;

  try {
    const artist = await findArtistById(body.artist);

    if (!artist) {
      return res.status(404).json(error("Artist not found", res.statusCode));
    }

    const album = await createAlbum({
      name: body.name,
      releasedDate: body.releasedDate,
      artist: artist,
    });

    return res
      .status(201)
      .json(success("Successfully created album", album, res.statusCode));
  } catch (err: any) {
    console.log(err);
    return res.status(500).json(error("Internal Server Error", res.statusCode));
  }
}

export async function getAlbumsController(_req: Request, res: Response) {
  try {
    const albums = await findAlbums();
    return res
      .status(200)
      .json(success("Successfully get all Albums", albums, res.statusCode));
  } catch (err: any) {
    return res.status(500).json(error("Internal Server Error", res.statusCode));
  }
}

export async function addSongToAlbumController(
  req: Request<
    AddSongToAlbumInput["params"],
    unknown,
    AddSongToAlbumInput["body"]
  >,
  res: Response
) {
  const body = req.body;
  const params = req.params;

  const album = await findAlbumById(params.albumId);
  if (!album) {
    return res.status(404).json(error("Album not found", res.statusCode));
  }

  const songs = await findSongsByIds(body.songs);
  if (!songs) {
    return res.status(404).json(error("Songs not found", res.statusCode));
  }

  try {
    const updatedAlbum = await addSongToAlbum(album, songs);
    if (updatedAlbum) {
      for (const song of songs) {
        await addAlbumToSong(album, song);
      }
    }
    return res
      .status(201)
      .json(
        success(
          "Successfully added songs to album",
          updatedAlbum,
          res.statusCode
        )
      );
  } catch (err: any) {
    return res.status(500).json(error("Internal Server Error", res.statusCode));
  }
}
