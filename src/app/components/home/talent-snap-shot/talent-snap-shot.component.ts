import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-talent-snap-shot',
  standalone: true,
  templateUrl: './talent-snap-shot.component.html',
  styleUrls: ['./talent-snap-shot.component.css'],
})
export class TalentSnapShotComponent implements OnInit {
  constructor() {}

  talentSnapShotData: any = [
    {
      number: 249,
      text: 'Software Development',
      icon: '../../../../assets/talent-icon.png',
    },

    {
      number: 90,
      text: 'Testing',
      icon: '../../../../assets/talent-icon.png',
    },

    {
      number: 53,
      text: 'Data Management',
      icon: '../../../../assets/talent-icon.png',
    },

    {
      number: 43,
      text: 'Project Management & Agile',

      icon: '../../../../assets/talent-icon.png',
    },

    {
      number: 44,
      text: 'IT Management',
      icon: '../../../../assets/talent-icon.png',
    },

    {
      number: 15,
      text: 'ERP',
      icon: '../../../../assets/talent-icon.png',
    },

    {
      number: 5,
      text: 'Cybersecurity & GRC',
      icon: '../../../../assets/talent-icon.png',
    },

    {
      number: '65+',
      text: 'Strategy, WFM, Environmental, Support',
      icon: '../../../../assets/talent-icon.png',
    },
  ];

  ngOnInit() {}
}
