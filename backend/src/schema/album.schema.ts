import { TypeOf, object, string } from "zod";

export const createAlbumSchema = object({
  body: object({
    name: string({ required_error: "Name is required" }),
    releasedDate: string({ required_error: "Date is required" }).datetime(),
    artist: string({ required_error: "Artist is required" }),
  }),
});

export const addSongToAlbumSchema = object({
  body: object({
    songs: string({ required_error: "Songs is required" }).array(),
  }),
  params: object({
    albumId: string({ required_error: "AlbumId is required" }),
  }),
});

export type CreateAlbumInput = TypeOf<typeof createAlbumSchema>["body"];
export type AddSongToAlbumInput = TypeOf<typeof addSongToAlbumSchema>;
