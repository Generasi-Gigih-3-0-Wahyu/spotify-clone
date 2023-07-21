import { TypeOf, object, string } from "zod";

export const createArtistSchema = object({
  body: object({
    name: string({ required_error: "Name is required" }),
    dob: string({ required_error: "Date is required" }).datetime(),
    genres: string().array(),
  }),
});

export type CreateArtistInput = TypeOf<typeof createArtistSchema>["body"];
