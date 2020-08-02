import { Module } from '@nestjs/common';
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
  imports: [UserModule],
})
export class AuthModule {}
