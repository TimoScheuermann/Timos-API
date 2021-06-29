import { ProxyModule } from '@finastra/nestjs-proxy';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';
import { IconsModule } from './icons/icons.module';
import { NewsroomModule } from './newsroom/newsroom.module';
import { UserModule } from './user/user.module';

// config();

@Module({
  imports: [
    ProxyModule.forRoot({
      services: [
        {
          id: 'gofeed',
          url: 'http://api.timos.design:5001',
        },
      ],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          uri: `mongodb+srv://${configService.get(
            'MONGO_USER',
          )}:${configService.get('MONGO_PW')}@${configService.get(
            'MONGO_DB',
          )}/${configService.get('MONGO_TABLE')}?retryWrites=true&w=majority`,
        };
      },
    }),
    UserModule,
    AuthModule,
    NewsroomModule,
    IconsModule,
    ContactModule,
  ],
  controllers: [],
})
export class AppModule {}
