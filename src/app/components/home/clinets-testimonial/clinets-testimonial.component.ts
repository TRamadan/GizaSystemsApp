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

  superStars: any[] = [
    {
      id: 1,
      key: 'messi',
      image: '../../../../assets/slider-image.png',
    },
    {
      id: 2,
      key: 'serena',
      image: '../../../../assets/slider-image.png',
    },
    {
      id: 3,
      key: 'lebron',
      image: '../../../../assets/slider-image.png',
    },
    {
      id: 4,
      key: 'usain',
      image: '../../../../assets/slider-image.png',
    },
    {
      id: 5,
      key: 'simone',
      image: '../../../../assets/slider-image.png',
    },
  ];

  currentSlide = 0;
  isHovered = false;
  private intervalId?: number;
  itemsPerSlide = 3;
  constructor() {}

  ngOnInit() {
    this.updateItemsPerSlide();
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updateItemsPerSlide();
  }

  private updateItemsPerSlide(): void {
    const width = window.innerWidth;
    if (width < 768) {
      this.itemsPerSlide = 1;
    } else if (width < 992) {
      this.itemsPerSlide = 2;
    } else {
      this.itemsPerSlide = 3;
    }
  }

  private startAutoSlide(): void {
    if (!this.isHovered) {
      this.intervalId = window.setInterval(() => {
        this.nextSlide();
      }, 3000);
    }
  }

  private stopAutoSlide(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  onMouseEnter(): void {
    this.isHovered = true;
    this.stopAutoSlide();
  }

  onMouseLeave(): void {
    this.isHovered = false;
    this.startAutoSlide();
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.superStars.length;
  }

  prevSlide(): void {
    this.currentSlide =
      (this.currentSlide - 1 + this.superStars.length) % this.superStars.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  getVisibleSlides(): any[] {
    const slides: any[] = [];
    for (let i = 0; i < this.itemsPerSlide; i++) {
      const index = (this.currentSlide + i) % this.superStars.length;
      slides.push(this.superStars[index]);
    }
    return slides;
  }

  getSlideIndex(slide: any, position: number): number {
    return (this.currentSlide + position) % this.superStars.length;
  }
}
