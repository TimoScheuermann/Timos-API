import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsroomController } from './newsroom.controller';
import { NewsroomService } from './newsroom.service';
import { News, NewsSchema } from './schemas/News.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }]),
  ],
  controllers: [NewsroomController],
  providers: [NewsroomService],
})
export class NewsroomModule {}
