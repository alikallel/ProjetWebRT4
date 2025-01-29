import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { RequestWithUser } from './interfaces/request.interface';
import { User } from './user.entity';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private authService: AuthService) {}

    async use(req: RequestWithUser, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await this.authService.verifyToken(token);
        req.user = user as User;
        next();
    }
}
