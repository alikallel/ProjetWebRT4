import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import {LocalStrategy} from "./strategies/local.strategy";

@Module({
  imports: [TypeOrmModule.forFeature([User])
  ,JwtModule.register({
      secret: 'JWTSECRETFzg4ezr68g4e6z84rgr6g84erge846vsdsae!!!',
      signOptions: { expiresIn: '1h' },
    })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
