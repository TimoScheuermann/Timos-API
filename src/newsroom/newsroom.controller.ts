import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles, RolesGuard } from 'src/auth/roles.guard';
import { INews } from './interfaces/INews';
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
  async post(@Body() news: INews): Promise<News> {
    return this.newsService.post(news);
  }

  @Roles(['admin'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('/update')
  async update(@Body() news: INews): Promise<News> {
    return this.newsService.update(news);
  }

  @Roles(['admin'])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('/delete')
  async delete(@Body() news: INews): Promise<any> {
    return this.newsService.delete(news._id);
  }
}
