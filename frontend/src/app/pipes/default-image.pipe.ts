import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultImage'
})
export class DefaultImagePipe implements PipeTransform {
  private readonly backendUrl = 'http://localhost:3000'; 

  transform(imagePath: string | null  | undefined): string {
    const defaultImage = 'assets/defaultevent.jpg';

    
    if (!imagePath) {
      return defaultImage;
    }
    
    return `${this.backendUrl}/${imagePath}`;
  }
}