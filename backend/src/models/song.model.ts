import { getModelForClass, prop } from "@typegoose/typegoose";

export class Song {
  @prop({ required: true })
  title: string;

  @prop({ required: true })
  url: string;

  @prop({ required: true })
  imageUrl: string;

  @prop({ type: () => [String], default: [] })
  artists: string[];
}

const SongModel = getModelForClass(Song, {
  schemaOptions: {
    timestamps: true,
  },
});

export default SongModel;
