import { DocumentType, Ref } from "@typegoose/typegoose";
import { SongModel } from "../models";
import { Album } from "../models/album.model";
import { Song } from "../models/song.model";

export function createSong(input: Partial<Song>) {
  return SongModel.create({
    ...input,
    artists: input.artists?.map((artist) => artist._id),
  });
}

export function findSongByTitleAndArtist(title: string, artists: string[]) {
  console.log(title);
  return SongModel.findOne({ title: title }).exec();
}

export function findSongById(id: string) {
  return SongModel.findById(id);
}

export function findSongsByIds(ids: string[]) {
  return SongModel.find({ _id: { $in: ids } });
}

export function getSongs() {
  return SongModel.find()
    .populate({
      path: "artists",
      model: "Artist",
      select: { _id: 1, name: 1 },
    })
    .populate({ path: "album", model: "Album", select: { _id: 1, name: 1 } })
    .select({ __v: 0 });
}

export function addAlbumToSong(album: Ref<Album>, song: DocumentType<Song>) {
  song.album = album._id;
  return song.save();
}

export function playSong(song: DocumentType<Song>) {
  song.playCount = song.playCount + 1;
  return song.save();
}

export function getSongsMostPlayed() {
  return SongModel.find()
    .populate({
      path: "artists",
      model: "Artist",
      select: { _id: 1, name: 1 },
    })
    .populate({ path: "album", model: "Album", select: { _id: 1, name: 1 } })
    .select({ __v: 0 })
    .sort({ playCount: -1 });
}
