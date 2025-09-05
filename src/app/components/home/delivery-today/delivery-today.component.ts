import { Component, inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestTransformFormComponent } from '../request-transform-form/request-transform-form.component';

@Component({
  standalone: true,
  selector: 'app-delivery-today',

  imports: [RequestTransformFormComponent],
  templateUrl: './delivery-today.component.html',
  styleUrls: ['./delivery-today.component.css'],
})
export class DeliveryTodayComponent implements OnInit {
  private modalService = inject(NgbModal);

  constructor() {}

  ngOnInit() {}
  goToRequestTransformForm(modalContent: any) {
    localStorage.setItem('contactForm', 'whatWeDeliverToday');
    this.modalService.open(modalContent, {
      size: 'lg',
    });
    // localStorage.setItem('isRequestTransformForm', 'whatWeDeliverToday');
    // document.getElementById('request-transform-form')?.scrollIntoView({ behavior: 'smooth' });
  }
}
