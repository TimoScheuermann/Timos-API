import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { INews } from './interfaces/INews';
import { News } from './schemas/News.schema';

@Injectable()
export class NewsroomService {
  constructor(@InjectModel(News.name) private newsModel: Model<News>) {}

  async post(news: INews): Promise<News> {
    return this.newsModel.create(news);
  }

  async delete(id: string): Promise<any> {
    return this.newsModel.findByIdAndDelete(id);
  }

  async update(inews: INews): Promise<News> {
    const news = new this.newsModel(inews).toObject();
    delete news._id;
    return this.newsModel.findByIdAndUpdate(inews._id, news);
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
