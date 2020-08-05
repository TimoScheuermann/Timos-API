import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostNewsDto } from './dto/post-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './schemas/News.schema';

@Injectable()
export class NewsroomService {
  constructor(@InjectModel(News.name) private newsModel: Model<News>) {}

  async post(postNewsDto: PostNewsDto): Promise<News> {
    const createdNews = new this.newsModel(postNewsDto);
    return createdNews.save();
  }

  async delete(id: string): Promise<any> {
    return this.newsModel.remove({ _id: id }).exec();
  }

  async update(updateNewsDto: UpdateNewsDto): Promise<any> {
    const updatedNews = new this.newsModel(updateNewsDto.update).toObject();
    delete updatedNews._id;

    return this.newsModel.update({ _id: updateNewsDto.id }, updatedNews, {
      upsert: true,
    });
  }

  async getAll(): Promise<News[]> {
    return this.newsModel.find().sort({ date: -1 });
  }

  async getLatest(): Promise<News[]> {
    return this.newsModel
      .find()
      .sort({ date: -1 })
      .limit(5);
  }
}
