import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import { Secret, sign } from 'jsonwebtoken';
import { getEnv } from 'src/config';
import { IUser } from 'src/user/interfaces/IUser';
import { UserService } from 'src/user/user.service';

export enum Provider {
  GOOGLE = 'google',
  GITHUB = 'github',
  STEAM = 'steam',
}

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public redirect(jwt: any, res: Response): void {
    res.cookie('timos-designs-auth', jwt, {
      expires: new Date(new Date().getTime() + 3600),
      domain: '.timos.design',
    });

    res.redirect(getEnv('REDIRECT') + (jwt ? '' : 'error'));
  }

  async validateOAuthLogin(u: IUser): Promise<string> {
    try {
      const user = await (await this.userService.signIn(u)).toObject();
      const jwt: string = sign(user, getEnv('JWT_SECRET') as Secret, {
        expiresIn: 3600,
      });
      return jwt;
    } catch (error) {
      throw new InternalServerErrorException(
        'validateOAuthLogin',
        error.message,
      );
    }
  }
}
