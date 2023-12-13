import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SamlStrategy } from './saml.strategy';
import { SamlAuthGuard } from './saml-auth.guard';
import { AuthController } from './auth.controller';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [SamlStrategy, SamlAuthGuard],
  exports: [SamlAuthGuard],
})
export class AuthModule {}
