import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-empowering-smarter-cities',
  standalone: true,
  imports: [NgFor],
  templateUrl: './EmpoweringSmarterCities.component.html',
  styleUrl: './EmpoweringSmarterCities.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmpoweringSmarterCitiesComponent implements OnInit {

  features = [
    {
      icon: 'fas fa-crosshairs',
      img:"assets/images/act.svg",
      title: 'Act Proactively',
      description: 'Anticipate challenges and deter issues before they escalate, from traffic congestion to public safety concerns.',
      delay: '0'
    },
    {
      icon: 'fas fa-tachometer-alt',
      title: 'Respond Rapidly',
      img:"assets/images/respond.svg",
      description: 'Coordinate emergency services and incident management with unmatched speed and precision timing.',
      delay: '100'
    },
    {
      icon: 'fas fa-leaf',
      img:"assets/images/max.svg",
      title: 'Maximize Resources Efficiently',
      description: 'Ensure every resource, from energy and water to public services and personnel, serves your city optimally and cost-effectively.',
      delay: '200'
    }
  ];
  ngOnInit(): void { }

}
