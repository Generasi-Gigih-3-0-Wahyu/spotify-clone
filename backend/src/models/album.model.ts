import { Ref, prop } from "@typegoose/typegoose";
import { Song } from "./song.model";
import { Artist } from "./artist.model";

export class Album {
  @prop({ type: String, required: true })
  name: string;

  @prop({ ref: () => Song, default: [] })
  songs: Ref<Song>[];

  @prop({ ref: () => Artist })
  artist: Ref<Artist>;

  @prop({ required: true })
  releasedDate: string;
}
