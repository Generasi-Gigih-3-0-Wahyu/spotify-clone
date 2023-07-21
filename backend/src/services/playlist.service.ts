import { DocumentType, Ref } from "@typegoose/typegoose";
import { Playlist } from "../models/playlist.model";
import { Song } from "../models/song.model";
import { PlaylistModel } from "../models";

export function createPlaylist(input: Partial<Playlist>) {
  return PlaylistModel.create(input);
}

export function findPlaylistByUserId(userId: string) {
  return PlaylistModel.find({ owner: userId })
    .populate({
      path: "songs._song",
      model: "Song",
      select: { __v: 0, createdAt: 0, updatedAt: 0 },
      populate: {
        path: "artists",
        model: "Artist",
        select: { __id: 1, name: 1 },
      },
    })
    .select({ __v: 0 });
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

export async function playPlaylistSong(
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
