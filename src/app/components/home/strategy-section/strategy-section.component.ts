import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-strategy-section',
  standalone: true,
  imports: [NgClass,NgFor],
  templateUrl: './strategy-section.component.html',
  styleUrls: ['./strategy-section.component.css'],
})
export class StrategySectionComponent implements OnInit {
  constructor() {}
  allStrategies: any = [
    {
      img: '../../../../assets/image-strategy1.png',
      title: 'Application Development & Management',
      description:
        'Full-stack, APIs, mobile, microservices, low-code platforms',
    },
    {
      img: '../../../../assets/image-strategy2.png',
      title: 'DevOps & Cloud',
      description:
        'DevSecOps, SRE, release engineering, containerized apps, cloud-native operations',
    },
    {
      img: '../../../../assets/image-strategy3.png',
      title: 'Data & Analytics',
      description: 'Data engineering, BI, big data platforms, data governance',
    },
    {
      img: '../../../../assets/image-strategy4.png',
      title: 'AI & Advanced Insights',
      description:
        'AI/ML platforms (Alteryx, Watson, SAS), predictive analytics',
    },
    {
      img: '../../../../assets/image-strategy5.png',
      title: 'Testing & QA',
      description:
        'Functional, automation, mobile, API, performance & security testing',
    },
    {
      img: '../../../../assets/image-strategy6.png',
      title: 'Strategy as a Service',
      description:
        'Vision-to-execution strategic support, M&A, transformation, sustainability',
    },
    {
      img: '../../../../assets/image-strategy7.png',
      title: 'Business Continuity',
      description:
        'Cybersecurity, infrastructure, databases, networks, virtualization',
    },
    {
      img: '../../../../assets/image-strategy8.png',
      title: 'Project & Program Management',
      description:
        'Certified PMPs, SAFe coaches, agile delivery, Power BI & Jira reporting',
    },
  ];

  ngOnInit() {}
}
