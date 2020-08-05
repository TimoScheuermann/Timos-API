import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { GitHubStrategy } from 'src/auth/strategies/github.strategy';
import { GoogleStrategy } from 'src/auth/strategies/google.strategy';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { SteamStrategy } from 'src/auth/strategies/steam.strategy';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    GoogleStrategy,
    GitHubStrategy,
    SteamStrategy,
  ],
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configServive: ConfigService) => {
        return {
          secret: configServive.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '1h',
          },
        };
      },
    }),
  ],
})
export class AuthModule {}
