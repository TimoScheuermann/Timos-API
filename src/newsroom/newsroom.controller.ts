import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostNewsDto } from './dto/post-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsroomService } from './newsroom.service';
import { News } from './schemas/News.schema';

@Controller('newsroom')
export class NewsroomController {
  constructor(private readonly newsService: NewsroomService) {}

  @Get()
  async getAll(): Promise<News[]> {
    return this.newsService.getAll();
  }

  @Get('/latest')
  async getLatest(): Promise<News[]> {
    return this.newsService.getLatest();
  }

  @Post('/post')
  async post(@Body() postNewsDto: PostNewsDto): Promise<News> {
    return this.newsService.post(postNewsDto);
  }

  @Post('/update')
  async update(@Body() updateNewsDto: UpdateNewsDto): Promise<any> {
    return this.newsService.update(updateNewsDto);
  }

  @Post('/delete')
  async delete(@Body() _id: string): Promise<any> {
    return this.newsService.delete(_id);
  }
}
