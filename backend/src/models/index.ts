import { getModelForClass } from "@typegoose/typegoose";
import { Song } from "./song.model";
import { Artist } from "./artist.model";
import { Album } from "./album.model";
import { Playlist } from "./playlist.model";

export const SongModel = getModelForClass(Song, {
  schemaOptions: {
    timestamps: true,
  },
});

export const ArtistModel = getModelForClass(Artist, {
  schemaOptions: {
    timestamps: true,
  },
});

export const AlbumModel = getModelForClass(Album, {
  schemaOptions: {
    timestamps: true,
  },
});

export const PlaylistModel = getModelForClass(Playlist, {
  schemaOptions: {
    timestamps: true,
  },
});