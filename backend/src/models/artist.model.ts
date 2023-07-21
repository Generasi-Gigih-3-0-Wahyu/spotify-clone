import { Ref, Severity, prop } from "@typegoose/typegoose";
import { Album } from "./album.model";
import { Song } from "./song.model";

export class Artist {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  dob: string;

  @prop({ default: [], allowMixed: Severity.ALLOW })
  genres: string[];

  @prop({ ref: () => Song, default: [] })
  songs: Ref<Song>[];

  @prop({ ref: () => Album, default: [] })
  albums: Ref<Album>[];
}
