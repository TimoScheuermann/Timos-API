import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { getEnv } from './config';
import { UserModule } from './user/user.module';

// config();

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${getEnv('MONGO_USER')}:${getEnv('MONGO_PW')}@${getEnv(
        'MONGO_DB',
      )}/${getEnv('MONGO_TABLE')}?retryWrites=true&w=majority`,
    ),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
