import { INewsLink } from './INewsLink';

export interface INews {
  readonly _id?: string;
  readonly title: string;
  readonly description: string;
  readonly thumbnail: string;
  readonly type: string;
  readonly project: string;
  readonly hasBackground: boolean;
  readonly date: number;
  readonly links: INewsLink[];
}
