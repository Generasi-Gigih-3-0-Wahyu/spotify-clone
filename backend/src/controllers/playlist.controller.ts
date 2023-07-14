import { Request, Response } from "express";
import {
  CreatePlaylistInput,
  AddSongToPlaylistInput,
  playSongInput,
} from "../schema/playlist.schema";
import {
  addSongToPlaylist,
  createPlaylist,
  findPlaylistById,
  findPlaylistByUserId,
  playSong,
} from "../services/playlist.service";
import { error, success } from "../utils/baseResponse";
import { findSongById } from "../services/song.service";

export async function createPlaylistController(
  req: Request<unknown, unknown, CreatePlaylistInput>,
  res: Response
) {
  const body = req.body;

  try {
    const playlist = await createPlaylist({
      owner: res.locals.user._id,
      ...body,
    });
    return res
      .status(201)
      .json(success("Successfully Created Playlist", playlist, res.statusCode));
  } catch (err: any) {
    return res.status(500).json(error("Internal Server Error", res.statusCode));
  }
}

export async function addSongToPlaylistController(
  req: Request<
    AddSongToPlaylistInput["params"],
    unknown,
    AddSongToPlaylistInput["body"]
  >,
  res: Response
) {
  const body = req.body;
  const params = req.params;

  const playlist = await findPlaylistById(params.playlistId);
  if (!playlist) {
    return res.status(404).json(error("Playlist Not Found", res.statusCode));
  }

  const isAuthorized = playlist.owner.equals(res.locals.user._id);
  if (!isAuthorized) {
    return res.status(401).json(error("Invalid credentials", res.statusCode));
  }

  const song = await findSongById(body.songId);
  if (!song) {
    return res.status(404).json(error("Song Not Found", res.statusCode));
  }

  const existSong = playlist.songs.find(
    (s) => s._song._id.toString() === body.songId
  );
  if (existSong) {
    return res.status(409).json(error("Song Already Exist", res.statusCode));
  }

  try {
    const addedSong = await addSongToPlaylist(playlist, song);
    return res
      .status(201)
      .json(
        success(
          "Successfully Added Song to Playlist",
          addedSong,
          res.statusCode
        )
      );
  } catch (err: any) {
    console.log(err);
    return res.status(500).json(error("Internal Server Error", res.statusCode));
  }
}

export async function getPlaylistUserController(_req: Request, res: Response) {
  const user = res.locals.user;

  try {
    const playlists = await findPlaylistByUserId(user._id);
    return res
      .status(200)
      .json(success("Successfully Get Playlists", playlists, res.statusCode));
  } catch (err: any) {
    console.log(err);
    return res.status(500).json(error("Internal Server Error", res.statusCode));
  }
}

export async function playSongController(
  req: Request<playSongInput>,
  res: Response
) {
  const params = req.params;

  const playlist = await findPlaylistById(params.playlistId);
  if (!playlist) {
    return res.status(404).json(error("Playlist Not Found", res.statusCode));
  }

  const isAuthorized = playlist.owner.equals(res.locals.user._id);
  if (!isAuthorized) {
    return res.status(401).json(error("Invalid credentials", res.statusCode));
  }

  const song = await findSongById(params.songId);
  if (!song) {
    return res.status(404).json(error("Song Not Found", res.statusCode));
  }

  const existed = playlist.songs.find(
    (s) => s._song._id.toString() === params.songId
  );
  if (!existed) {
    return res
      .status(404)
      .json(error("Song Not Found in Playlist", res.statusCode));
  }

  const playingSong = await playSong(playlist, song);
  return res
    .status(200)
    .json(success("Successfully Play Song", playingSong, res.statusCode));
}
