import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { IconsService } from './icons.service';
import { IIconIssue } from './interfaces/IIconIssue';
import { IIconIssueComment } from './interfaces/IIconIssueComment';
import { IconIssue } from './schemas/IconIssue.schema';
import { IconIssueComment } from './schemas/IconIssueComment.schema';

@Controller('icons')
export class IconsController {
  constructor(public readonly iconsService: IconsService) {}

  @Get('issues')
  public async getIssues(): Promise<IconIssue[]> {
    return this.iconsService.getAllIssues();
  }

  @Get('issues/:id')
  public async getIssueById(
    @Param('id') id: string,
  ): Promise<IconIssue | undefined> {
    return this.iconsService.getIssue(id);
  }

  @Get('comment/:id')
  public async getCommentById(
    @Param('id') id: string,
  ): Promise<IconIssueComment | undefined> {
    return this.iconsService.getComment(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('issue')
  public async postIssue(@Body() issue: IIconIssue): Promise<IconIssue> {
    return this.iconsService.postIssue(issue);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('comment')
  public async postComment(
    @Query('iid') iid: string,
    @Query('cid') cid: string,
    @Body() comment: IIconIssueComment,
  ) {
    this.iconsService.postComment(iid, cid, comment);
  }
}
