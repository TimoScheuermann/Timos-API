import { PostNewsDto } from './post-news.dto';

export class UpdateNewsDto {
  readonly id: string;
  readonly update: PostNewsDto;
}
