import { UnauthorizedException } from '@nestjs/common';
import { User, UserRole } from 'src/auth/user.entity';

export function validateUserRole(user: any, requiredR: string) {
  let requiredRole: UserRole;

  if (requiredR === 'EVENTMASTER') {
    requiredRole = UserRole.EVENTMASTER;
  } else {
    requiredRole = UserRole.USER;
  }

  if (user.role !== requiredRole) {
    throw new UnauthorizedException('You cant acess this endpoint');
  }
}

