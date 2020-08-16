import { IconIssueCommentState } from '../schemas/IconIssueComment.schema';

export interface IIconIssueComment {
  readonly _id?: string;
  readonly author: string;
  readonly content: string;
  readonly state?: IconIssueCommentState;
  readonly date?: number;
  readonly comments?: string[];
}
