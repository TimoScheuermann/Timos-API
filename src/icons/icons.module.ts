import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IconsController } from './icons.controller';
import { IconsService } from './icons.service';
import { IconIssue, IconIssueSchema } from './schemas/IconIssue.schema';
import {
  IconIssueComment,
  IconIssueCommentSchema,
} from './schemas/IconIssueComment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: IconIssue.name, schema: IconIssueSchema },
      { name: IconIssueComment.name, schema: IconIssueCommentSchema },
    ]),
  ],
  controllers: [IconsController],
  providers: [IconsService],
})
export class IconsModule {}
