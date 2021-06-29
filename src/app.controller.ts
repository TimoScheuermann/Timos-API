import { Controller, HttpService } from '@nestjs/common';

@Controller()
export class ContactController {
  constructor(private httpService: HttpService) {}

  //   @Get("go/*")
  //   async getGo(@Res() response: Response, @Req() request: Request) {
  //       return this.httpService.get(request)
  //   }
}
