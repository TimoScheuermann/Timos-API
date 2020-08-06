import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { IUser } from 'src/user/interfaces/IUser';
import { UserService } from 'src/user/user.service';

export enum Provider {
  GOOGLE = 'google',
  GITHUB = 'github',
  STEAM = 'steam',
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public redirect(jwt: any, res: Response): void {
    res.cookie('timos-designs-auth', jwt, {
      //expires: new Date(new Date().getTime() * 1000 + 3600),
      // domain: '.timos.design',
    });

    res.redirect(this.configService.get('REDIRECT') + (jwt ? '' : 'error'));
  }

  async validateOAuthLogin(u: IUser): Promise<string> {
    try {
      const user = await (await this.userService.signIn(u)).toObject();
      return this.jwtService.sign(user);
    } catch (error) {
      throw new InternalServerErrorException(
        'validateOAuthLogin',
        error.message,
      );
    }
  }
}
