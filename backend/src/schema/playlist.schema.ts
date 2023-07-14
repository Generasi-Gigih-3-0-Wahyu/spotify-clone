import { TypeOf, object, string } from "zod";

export const createPlaylistSchema = object({
  body: object({
    name: string({ required_error: "Name is required" }),
  }),
});

export const addSongToPlaylistSchema = object({
  body: object({
    songId: string({ required_error: "Song Id is required" }),
  }),
  params: object({
    playlistId: string({ required_error: "Playlist Id is required" }),
  }),
});

export const playSongSchema = object({
  params: object({
    playlistId: string(),
    songId: string(),
  }),
});

export type CreatePlaylistInput = TypeOf<typeof createPlaylistSchema>["body"];
export type AddSongToPlaylistInput = TypeOf<typeof addSongToPlaylistSchema>;
export type playSongInput = TypeOf<typeof playSongSchema>["params"];
