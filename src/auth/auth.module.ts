import { Module } from '@nestjs/common';
import { GitHubStrategy } from 'src/strategies/github.strategy';
import { GoogleStrategy } from 'src/strategies/google.strategy';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { SteamStrategy } from 'src/strategies/steam.strategy';
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
