import { DocumentType, Ref } from "@typegoose/typegoose";
import { Album } from "../models/album.model";
import { Song } from "../models/song.model";
import { AlbumModel } from "../models";

export function createAlbum(input: Partial<Album>) {
  return AlbumModel.create(input);
}

export function findAlbums() {
  return AlbumModel.find()
    .populate({
      path: "artist",
      model: "Artist",
      select: { _id: 1, name: 1 },
    })
    .populate({ path: "songs", model: "Song", select: { _id: 1, title: 1 } })
    .select({ __v: 0 });
}

export function findAlbumById(id: string) {
  return AlbumModel.findById(id);
}

export function addSongToAlbum(album: DocumentType<Album>, songs: Ref<Song>[]) {
  for (const song of songs) {
    album.songs.push(song._id);
  }
  // album.songs = songs;
  return album.save();
}
