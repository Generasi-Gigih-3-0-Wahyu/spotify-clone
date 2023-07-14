import { DocumentType, Ref } from "@typegoose/typegoose";
import PlaylistModel, { Playlist } from "../models/playlist.model";
import { Song } from "../models/song.model";

export function createPlaylist(input: Partial<Playlist>) {
  return PlaylistModel.create(input);
}

export function findPlaylistByUserId(userId: string) {
  return PlaylistModel.find({ owner: userId }).populate({
    path: "songs",
    populate: {
      path: "_song",
      model: "Song",
    },
  });
}

export function findPlaylistById(id: string) {
  return PlaylistModel.findById(id).exec();
}

export async function addSongToPlaylist(
  playlist: DocumentType<Playlist>,
  song: Ref<Song>
) {
  playlist.songs.push({ _song: song._id, playCount: 0 });
  return playlist.save();
}

export async function playSong(
  playlist: DocumentType<Playlist>,
  song: Ref<Song>
) {
  const newPlaylist = playlist.songs.map((s) => {
    if (s._song._id.equals(song._id)) {
      return { ...s, playCount: s.playCount + 1 };
    }
    return s;
  });
  playlist.songs = newPlaylist;
  return playlist.save();
}
