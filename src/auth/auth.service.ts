import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import { sign } from 'jsonwebtoken';
import { IUser } from 'src/user/interfaces/User.model';
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
    });

    const domain = process.env.IS_LOCAL
      ? 'http://localhost:8080/'
      : 'https://accounts.timos.design/';

    res.redirect(domain + jwt ? '' : 'error');
  }

  async validateOAuthLogin(u: IUser): Promise<string> {
    try {
      const user = await (await this.userService.signIn(u)).toObject();
      const jwt: string = sign(user, process.env.JWT_SECRET, {
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
