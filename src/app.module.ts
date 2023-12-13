import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HelloModule } from './hello/hello.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    HelloModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
