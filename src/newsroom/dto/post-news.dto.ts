import { INewsLink } from '../interfaces/INewsLink';

export class PostNewsDto {
  title: string;
  description: string;
  thumbnail: string;
  type: string;
  project: string;
  date: number;
  links: INewsLink[];
}
