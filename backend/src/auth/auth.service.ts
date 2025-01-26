import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
      private jwtService: JwtService,
  ) {}

  async verifyToken(token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return decoded;  // You can return specific user data here if needed
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
  async register(email: string, username: string, password: string) {
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new UnauthorizedException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      username,
      password: hashedPassword,
    });
    await this.userRepository.save(user);
    return { message: 'User registered successfully' };
  }

  async login(user: any) {
    const payload = { id: user.id, role: user.role, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    return {
      message: 'Login successful',
      accessToken,
    };
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


  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;  // Exclude password from returned user data
      return result;
    }
    return null;
  }
}
