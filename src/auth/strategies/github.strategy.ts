import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';
import { AuthService, Provider } from 'src/auth/auth.service';
import { getEnv } from 'src/config';
import { IUser } from 'src/user/interfaces/IUser';

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: getEnv('GITHUB_CLIENT_ID'),
      clientSecret: getEnv('GITHUB_SECRET'),
      callbackURL: `${getEnv('REDIRECT')}auth/github/callback`,
      passReqToCallback: true,
      scope: ['user:name'],
    });
  }

  async validate(
    _request: any,
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: Function,
  ): Promise<any> {
    try {
      const { username, photos, id } = profile;
      const user: IUser = {
        avatar: photos[0].value,
        email: '',
        familyName: '',
        givenName: username,
        thirdPartyId: id,
        provider: Provider.GITHUB,
      };

      const jwt = await this.authService.validateOAuthLogin(user);
      done(null, { jwt });
    } catch (error) {
      done(error, false);
    }
  }
}