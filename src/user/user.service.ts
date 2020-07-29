import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Provider } from 'src/auth/auth.service';
import { IUser } from './interfaces/User.model';
import { User } from './schemas/User.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async userExists(provider: Provider, thirdPartyId: number): Promise<boolean> {
    const users = await this.userModel
      .find({
        provider: provider,
        thirdPartyId: thirdPartyId,
      })
      .exec();
    return users.length > 0;
  }

  async signIn(iuser: IUser): Promise<User> {
    const user: User = await this.getUserByOAuth(
      iuser.provider,
      iuser.thirdPartyId,
    );

    if (user) {
      this.updateUser(user);
      return user;
    } else {
      return await new this.userModel({
        ...iuser,
        date: new Date().getTime(),
        group: 'User',
      }).save();
    }
  }

  async updateUser(u: IUser) {
    const user = new this.userModel(u).toObject();
    delete user._id;
    this.userModel.updateOne({ _id: u._id }, user, { upsert: true }).exec();
  }

  async getUserByID(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async getUserByOAuth(
    provider: Provider,
    thirdPartyId: number,
  ): Promise<User> {
    return this.userModel
      .findOne({ provider: provider, thirdPartyId: thirdPartyId })
      .exec();
  }
}
