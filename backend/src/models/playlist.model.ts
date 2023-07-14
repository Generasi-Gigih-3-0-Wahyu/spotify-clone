import {
  Ref,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
import { User } from "./user.model";
import { Song } from "./song.model";

@modelOptions({ schemaOptions: { _id: false } })
class PlaylistSong {
  @prop({ ref: () => Song })
  _song: Ref<Song>;

  @prop({ default: 0 })
  playCount: number;
}

export class Playlist {
  @prop({ ref: () => User })
  owner: Ref<User>;

  @prop({ required: true })
  name: string;

  @prop({ default: [] })
  songs: PlaylistSong[];
}

const PlaylistModel = getModelForClass(Playlist, {
  schemaOptions: {
    timestamps: true,
  },
});

export default PlaylistModel;
