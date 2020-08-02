import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-steam';
import { AuthService, Provider } from 'src/auth/auth.service';
import { getEnv } from 'src/config';
import { IUser } from 'src/user/interfaces/IUser';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy, 'steam') {
  constructor(private readonly authService: AuthService) {
    super({
      apiKey: getEnv('STEAM_API_KEY'),
      realm: getEnv('REDIRECT'),
      returnURL: `${getEnv('CALLBACK')}steam/callback`,
      passReqToCallback: true,
      scope: ['user:name'],
    });
  }

  async validate(
    _request: any,
    _identifer: any,
    profile: any,
    done: Function,
  ): Promise<any> {
    try {
      const { displayName, _json, id } = profile;
      const user: IUser = {
        avatar: _json.avatarfull,
        email: '',
        familyName: '',
        givenName: displayName,
        thirdPartyId: id,
        provider: Provider.STEAM,
      };

      const jwt = await this.authService.validateOAuthLogin(user);
      done(null, { jwt });
    } catch (error) {
      done(error, false);
    }
  }
}
