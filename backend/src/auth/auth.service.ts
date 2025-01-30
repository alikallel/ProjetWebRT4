import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import {LoginDto} from "./dto/login.dto";

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
      return decoded;
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async register(registerDto: RegisterDto) {
    const { email, username, password, role, gender, birthdate } = registerDto;
  
    // Check if email already exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new UnauthorizedException('Email already registered');
    }
  
    const existingUsername = await this.userRepository.findOne({ where: { username } });
    if (existingUsername) {
      throw new UnauthorizedException('Username already exists');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newUser = this.userRepository.create({
      email,
      username,
      role: role as UserRole,
      password: hashedPassword,
      gender,
      birthdate, 
    });
  
    await this.userRepository.save(newUser);
  
    return { message: 'User registered successfully' };
  }
  

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { id: user.id, role: user.role, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      accessToken,
      role: user.role,
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
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
