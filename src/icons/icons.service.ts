import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IIconIssue } from './interfaces/IIconIssue';
import { IIconIssueComment } from './interfaces/IIconIssueComment';
import { IconIssue } from './schemas/IconIssue.schema';
import { IconIssueComment } from './schemas/IconIssueComment.schema';

@Injectable()
export class IconsService {
  constructor(
    @InjectModel(IconIssue.name) private iconIssueModel: Model<IconIssue>,
    @InjectModel(IconIssueComment.name)
    private iconIssueCommentModel: Model<IconIssueComment>,
  ) {}

  public async getAllIssues(): Promise<IconIssue[]> {
    return this.iconIssueModel.find().sort({ date: -1 });
  }

  public async getIssue(id: string): Promise<IconIssue | undefined> {
    return this.iconIssueModel.findOne({ _id: id }).catch(() => {
      return undefined;
    });
  }

  public async getComment(id: string): Promise<IconIssueComment | undefined> {
    return this.iconIssueCommentModel.findOne({ _id: id }).catch(() => {
      return undefined;
    });
  }

  public async postIssue(issue: IIconIssue): Promise<IconIssue> {
    return this.iconIssueModel.create(issue);
  }

  public async postComment(
    iid: string | undefined,
    cid: string | undefined,
    iComment: IIconIssueComment,
  ): Promise<IconIssueComment | undefined> {
    if (!iid && !cid) return undefined;

    if (iid) {
      const issue = await this.iconIssueModel.findById(iid);
      if (issue) {
        const newComment = await this.iconIssueCommentModel.create(iComment);

        issue.comments.push(newComment._id);
        issue.save();
        return newComment;
      }
    }
    if (cid) {
      const comment = await this.iconIssueCommentModel.findById(cid);
      if (comment) {
        const newComment = await this.iconIssueCommentModel.create(iComment);

        comment.comments.push(newComment._id);
        comment.save();
        return newComment;
      }
    }

    return undefined;
  }
}
