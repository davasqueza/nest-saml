import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Response,
} from '@nestjs/common';
import { SamlStrategy } from './saml.strategy';
import { SamlAuthGuard } from './saml-auth.guard';
import express from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly samlStrategy: SamlStrategy) {}

  @Get('login')
  @UseGuards(SamlAuthGuard)
  async samlLogin() {
    //this route is handled by passport-saml
    return;
  }

  @Post('callback')
  @UseGuards(SamlAuthGuard)
  async samlAssertionConsumer(
    @Request() req: express.Request,
    @Response() res: express.Response,
  ) {
    //this routes gets executed on successful assertion from IdP
    if (req.user) {
      res.send(req.user);
    }
  }

  @Get('metadata')
  async getSpMetadata(@Response() res: express.Response) {
    const ret = this.samlStrategy.generateServiceProviderMetadata(null, null);
    res.type('application/xml');
    res.send(ret);
  }
}
