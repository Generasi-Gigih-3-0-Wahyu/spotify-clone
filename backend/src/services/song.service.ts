import SongModel, { Song } from "../models/song.model";

export function createSong(input: Partial<Song>) {
  return SongModel.create(input);
}

export function findSongByTitleAndArtist(title: string, artists: string[]) {
  return SongModel.findOne({ title: title, artists: artists }).exec();
}

export function findSongById(id: string) {
  return SongModel.findById(id);
}

export function getSongs() {
  return SongModel.find();
}
