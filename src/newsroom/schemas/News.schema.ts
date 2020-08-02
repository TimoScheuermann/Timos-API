import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { INewsLink } from '../interfaces/INewsLink';

@Schema()
export class News extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  project: string;

  @Prop({ required: true })
  date: number;

  @Prop({ required: true })
  links: INewsLink[];
}

export const NewsSchema = SchemaFactory.createForClass(News);
