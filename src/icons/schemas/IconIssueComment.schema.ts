import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum IconIssueCommentState {
  VISIBLE = 'VISIBLE',
  DELETED = 'DELETED',
}

@Schema()
export class IconIssueComment extends Document {
  @Prop()
  author: string;

  @Prop()
  content: string;

  @Prop({ required: false, default: IconIssueCommentState.VISIBLE })
  state?: IconIssueCommentState;

  @Prop({
    required: false,
    default: () => {
      return new Date().getTime();
    },
  })
  date?: number;

  @Prop({ required: false, default: [] })
  comments?: string[];
}

export const IconIssueCommentSchema = SchemaFactory.createForClass(
  IconIssueComment,
);
