import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-clinets-testimonial',
  templateUrl: './clinets-testimonial.component.html',
  styleUrls: ['./clinets-testimonial.component.css'],
})
export class ClinetsTestimonialComponent implements OnInit {
  testimonials: any[] = [
    {
      rating: 5,
      feedback:
        'You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change and click save.',
      name: 'Darika Samak',
      company: 'From Company',
    },
    {
      rating: 4,
      feedback:
        'Simply the best. Better than all the rest. I’d recommend this product to beginners and advanced users.',
      name: 'Paromita Haque',
      company: 'From Company',
    },
    {
      rating: 5,
      feedback:
        'Must have book for students, who want to be Product Designer, UX Designer, or Interaction Designer.',
      name: 'Trashaee Hubbard',
      company: 'From Company',
    },
  ];

  currentSlide = 0;
  isHovered = false;
  private intervalId?: number;
  itemsPerSlide = 3;
  constructor() {}

  ngOnInit() {}
}
