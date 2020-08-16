import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum IconIssueState {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  WIP = 'WIP',
}

export enum IconIsuseType {
  PROBLEM = 'PROBLEM',
  REQUEST = 'REQUEST',
}

@Schema()
export class IconIssue extends Document {
  @Prop()
  author: string;

  @Prop({
    required: false,
    default: () => {
      return new Date().getTime();
    },
  })
  date?: number;

  @Prop()
  type: IconIsuseType;

  @Prop({ required: false, default: IconIssueState.OPEN })
  state?: IconIssueState;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ required: false, default: [] })
  comments?: string[];

  @Prop({ required: false, default: undefined })
  resolvedIn?: string;
}

export const IconIssueSchema = SchemaFactory.createForClass(IconIssue);
