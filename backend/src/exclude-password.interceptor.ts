import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RemovePasswordInterceptor implements NestInterceptor {
 intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
   return next.handle().pipe(
     map(data => this.deepClean(data))
   );
 }

 private deepClean(data: any): any {
   if (!data || typeof data !== 'object') return data;

   if (Array.isArray(data)) {
     return data.map(item => this.deepClean(item));
   }

   const cleanedData = { ...data };

   if (cleanedData.organizer && cleanedData.organizer.password !== undefined) {
     const { password, ...organizerWithoutPassword } = cleanedData.organizer;
     cleanedData.organizer = organizerWithoutPassword;
   }

   for (const key in cleanedData) {
     if (cleanedData[key] && typeof cleanedData[key] === 'object') {
       if (cleanedData[key] instanceof Date || 
           (cleanedData[key].constructor && 
            cleanedData[key].constructor.name === 'Date')) {
         continue;
       }
       cleanedData[key] = this.deepClean(cleanedData[key]);
     }
   }

   return cleanedData;
 }
}