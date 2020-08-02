import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService, Provider } from 'src/auth/auth.service';
import { getEnv } from 'src/config';
import { IUser } from 'src/user/interfaces/IUser';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: getEnv('GOOGLE_CLIENT_ID'),
      clientSecret: getEnv('GOOGLE_SECRET'),
      callbackURL: `${getEnv('REDIRECT')}auth/google/callback`,
      passReqToCallback: true,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _request: any,
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const { name, emails, photos } = profile;
      const user: IUser = {
        avatar: photos[0].value,
        email: emails[0].value,
        familyName: name.familyName,
        givenName: name.givenName,
        thirdPartyId: profile.id,
        provider: Provider.GOOGLE,
      };

      const jwt = await this.authService.validateOAuthLogin(user);
      done(null, { jwt });
    } catch (error) {
      done(error, false);
    }
  }
}