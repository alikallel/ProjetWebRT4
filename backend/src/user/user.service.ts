import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findOneById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async getUserById(userId: number): Promise<User> {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    }
  
    async updateUser(userId: number, updateData: Partial<User>): Promise<User> {
      await this.userRepository.update(userId, updateData);
      return this.getUserById(userId);
    }
    async uploadProfileImage(userId: number, file: Express.Multer.File): Promise<User> {
      const uploadPath = 'uploads/profile-pictures';
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      const filePath = `${uploadPath}/${userId}-${file.originalname}`;
      fs.writeFileSync(filePath, file.buffer);
      const imageUrl = `/uploads/profile-pictures/${userId}-${file.originalname}`;
  
      await this.userRepository.update(userId, { photo: imageUrl });
      return this.getUserById(userId);
    }
  
}
