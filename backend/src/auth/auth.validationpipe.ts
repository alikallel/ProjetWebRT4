import { Injectable, BadRequestException, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthValidationPipe implements PipeTransform {
    async transform(value: any, { metatype }: any) {
        const object = plainToClass(metatype, value);
        const errors = await validate(object);

        if (errors.length > 0) {
            // Get the first error message
            const firstError = errors[0];
            const message = Object.values(firstError.constraints)[0];
            throw new BadRequestException(message); // Send only the first error message
        }

        return value;
    }
}
