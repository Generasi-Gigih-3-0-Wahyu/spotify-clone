import { TypeOf, object, string } from "zod";

export const createSongSchema = object({
  body: object({
    title: string({ required_error: "Title is required" }),
    url: string({ required_error: "Url is required" }),
    imageUrl: string({ required_error: "Image URL is required" }),
    artists: string().array(),
    album: string().optional(),
  }),
});

export const playSongSchema = object({
  params: object({
    songId: string({ required_error: "Song ID is required" }),
  }),
});

export type CreateSongInput = TypeOf<typeof createSongSchema>["body"];
export type PlaySongInput = TypeOf<typeof playSongSchema>["params"];
