import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '../../models/event.model'; 
declare var bootstrap: any;
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  @Input() event: any;
  @Output() register = new EventEmitter<any>(); // Émet un événement vers le parent

  onRegisterClick() {
    this.register.emit(this.event); // Émet l'événement en passant les données de l'événement
  }
   // Cette méthode s'occupe d'ouvrir le modal Bootstrap
  /*openRegisterModal() {
    const modalElement = document.getElementById('registerModal'); // Sélectionnez l'élément modal par son ID
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show(); // Ouvrir le modal Bootstrap
    }
  }*/
}
