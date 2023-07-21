import { Request, Response } from "express";
import { CreateArtistInput } from "../schema/artist.schema";
import { createArtist, findArtists } from "../services/artist.service";
import { error, success } from "../utils/baseResponse";

export async function createArtistController(
  req: Request<unknown, unknown, CreateArtistInput>,
  res: Response
) {
  const body = req.body;

  try {
    const artist = await createArtist(body);
    return res
      .status(201)
      .json(success("Successfully Created Artist", artist, res.statusCode));
  } catch (err: any) {
    return res.status(500).json(error("Internal Server Error", res.statusCode));
  }
}

export async function getArtistsController(_req: Request, res: Response) {
  try {
    const artists = await findArtists();
    return res
      .status(200)
      .json(success("Successfully get all Artists", artists, res.statusCode));
  } catch (err: any) {
    return res.status(500).json(error("Internal Server Error", res.statusCode));
  }
}
