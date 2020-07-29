import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

config();

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.MONGO_DB}.x5ybt.mongodb.net/${process.env.MONGO_TABLE}?retryWrites=true&w=majority`,
    ),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
