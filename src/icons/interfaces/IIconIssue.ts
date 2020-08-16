import { IconIssueState, IconIsuseType } from '../schemas/IconIssue.schema';

export interface IIconIssue {
  readonly _id?: string;
  readonly author: string;
  readonly date?: number;
  readonly type: IconIsuseType;
  readonly state?: IconIssueState;
  readonly title: string;
  readonly content: string;
  readonly comments?: string[];
  readonly resolvedIn?: string;
}
