import { Component, OnInit } from '@angular/core';
import { GlobalDeliveryComponent } from './global-delivery/global-delivery.component';
import { CompetitiveAdvantageComponent } from './competitive-advantage/competitive-advantage.component';
import { DataHighlightsComponent } from './data-highlights/data-highlights.component';
import { DeliveryTodayComponent } from './delivery-today/delivery-today.component';
import { StrategySectionComponent } from './strategy-section/strategy-section.component';
import { ClientChoiceComponent } from './client-choice/client-choice.component';
import { ClinetsTestimonialComponent } from './clinets-testimonial/clinets-testimonial.component';
import { TalentSnapShotComponent } from './talent-snap-shot/talent-snap-shot.component';
import { RequestTransformFormComponent } from './request-transform-form/request-transform-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    GlobalDeliveryComponent,
    CompetitiveAdvantageComponent,
    DataHighlightsComponent,
    DeliveryTodayComponent,
    StrategySectionComponent,
    ClientChoiceComponent,
    ClinetsTestimonialComponent,
    TalentSnapShotComponent,
    RequestTransformFormComponent,
  ],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
