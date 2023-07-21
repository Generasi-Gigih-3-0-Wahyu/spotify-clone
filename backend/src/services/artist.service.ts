import { DocumentType, Ref } from "@typegoose/typegoose";
import { Artist } from "../models/artist.model";
import { Song } from "../models/song.model";
import { ArtistModel } from "../models";

export function createArtist(input: Partial<Artist>) {
  return ArtistModel.create(input);
}

export function findArtists() {
  return ArtistModel.find()
    .populate({ path: "songs", model: "Song", select: { __v: 0 } })
    .select({ __v: 0 });
}

export function findArtistById(id: string) {
  return ArtistModel.findById(id);
}

export async function findArtistsByIds(ids: string[]) {
  return ArtistModel.find({ _id: { $in: ids } });
}

export function addSongToArtist(song: Ref<Song>, artist: DocumentType<Artist>) {
  artist.songs.push(song._id);
  return artist.save();
}
