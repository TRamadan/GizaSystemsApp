import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-delivery-today',
  templateUrl: './delivery-today.component.html',
  styleUrls: ['./delivery-today.component.css'],
})
export class DeliveryTodayComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  goToRequestTransformForm() {
    localStorage.setItem('isRequestTransformForm', 'whatWeDeliverToday');
    document.getElementById('request-transform-form')?.scrollIntoView({ behavior: 'smooth' });
  }
}
