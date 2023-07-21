import {
  Ref,
  prop,
} from "@typegoose/typegoose";
import { Artist } from "./artist.model";
import { Album } from "./album.model";

export class Song {
  @prop({ required: true })
  title: string;

  @prop({ required: true })
  url: string;

  @prop({ required: true })
  imageUrl: string;

  @prop({ ref: () => Artist, default: [] })
  artists: Ref<Artist>[];

  @prop({ ref: () => Album, required: false })
  album?: Ref<Album>;

  @prop({ default: 0 })
  playCount: number;
}
