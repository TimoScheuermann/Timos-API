import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class ContactService {
  private bot = new TelegramBot(process.env.TG_BOT_CONTACT, { polling: true });

  public async sendMessage(message: string): Promise<boolean> {
    try {
      await this.bot.sendMessage(661168783, message);
      return true;
    } catch (error) {
      return false;
    }
  }
}
