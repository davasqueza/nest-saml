import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Strategy, Profile } from '@node-saml/passport-saml';
import { User } from '../model/user';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SamlStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      issuer: configService.get('SAML_ISSUER'),
      callbackUrl: configService.get('SAML_CALLBACK_URL'),
      cert: configService.get('SAML_IDP_SIGNING_CERTIFICATE'),
      entryPoint: configService.get('SAML_ENTRYPOINT_URL'),
      wantAssertionsSigned: !!configService.get('SAML_WANT_ASSERTIONS_SIGNED'),
    });
  }

  async validate(profile: Profile) {
    try {
      const user: User = {
        username: profile['urn:oid:0.9.2342.19200300.100.1.1'] as string,
        email: profile.mail,
        issuer: profile.issuer,
      };
      return user;
    } catch (e) {
      throw new ForbiddenException('invalid user attributes');
    }
  }
}
