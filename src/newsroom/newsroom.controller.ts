import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles, RolesGuard } from 'src/auth/roles.guard';
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

  @Roles(['admin'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('/post')
  async post(@Body() postNewsDto: PostNewsDto): Promise<News> {
    return this.newsService.post(postNewsDto);
  }

  @Roles(['admin'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('/update')
  async update(@Body() updateNewsDto: UpdateNewsDto): Promise<any> {
    return this.newsService.update(updateNewsDto);
  }

  @Roles(['admin'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('/delete')
  async delete(@Body() _id: string): Promise<any> {
    return this.newsService.delete(_id);
  }
}
