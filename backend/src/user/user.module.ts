import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';  // Si tu as créé le contrôleur
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], 
  providers: [UserService],
  controllers: [UserController],  
  exports: [UserService],  
})
export class UserModule {}
