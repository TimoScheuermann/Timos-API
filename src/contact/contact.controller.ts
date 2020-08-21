import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async sendContactForm(
    @Body() contactForm: Record<string, unknown>,
  ): Promise<boolean> {
    const keys: string[] = Object.keys(contactForm);
    const message = keys.map(x => `${x}: ${contactForm[x]}`).join('\n');
    return this.contactService.sendMessage(message);
  }
}
