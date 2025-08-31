import { NgFor } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild, type OnInit } from '@angular/core';
import { NgbCarousel, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SuccessStory {
  id: number;
  title: string;
  description: string;
  image: string;
}
// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-success-stories',
  standalone: true,
  imports: [NgFor,NgbCarouselModule],
  templateUrl: './SuccessStories.component.html',
  styleUrl: './SuccessStories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessStoriesComponent implements OnInit , AfterViewInit {
  @ViewChild('carousel') carousel!: NgbCarousel;
  @ViewChild('sectionTitle') sectionTitle!: ElementRef;
  @ViewChild('downloadSection') downloadSection!: ElementRef;
  @ViewChild('prevBtn') prevBtn!: ElementRef;
  @ViewChild('nextBtn') nextBtn!: ElementRef;

  activeSlideIndex = 0;

  stories: SuccessStory[] = [
    {
      id: 1,
      title: 'Title Here',
      description: 'Body Text here Body Text here Body Text here Body Text here Body Text here Body Text here',
      image: 'https://picsum.photos/id/1/900/500'
    },
    {
      id: 2,
      title: 'Title Here',
      description: 'Body Text here Body Text here Body Text here Body Text here Body Text here Body Text here',
      image: 'https://picsum.photos/id/2/900/500'
    },
    {
      id: 3,
      title: 'Title Here',
      description: 'Body Text here Body Text here Body Text here Body Text here Body Text here Body Text here',
      image: 'https://picsum.photos/id/3/900/500'
    },
    {
      id: 4,
      title: 'Title Here',
      description: 'Body Text here Body Text here Body Text here Body Text here Body Text here Body Text here',
      image: 'https://picsum.photos/id/4/900/500'
    },
    {
      id: 5,
      title: 'Title Here',
      description: 'Body Text here Body Text here Body Text here Body Text here Body Text here Body Text here',
      image: 'https://picsum.photos/id/5/900/500'
    },
    {
      id: 6,
      title: 'Title Here',
      description: 'Body Text here Body Text here Body Text here Body Text here Body Text here Body Text here',
      image: 'https://picsum.photos/id/6/900/500'
    },
    {
      id: 7,
      title: 'Title Here',
      description: 'Body Text here Body Text here Body Text here Body Text here Body Text here Body Text here',
      image: 'https://picsum.photos/id/1/900/500'
    },
    {
      id: 8,
      title: 'Title Here',
      description: 'Body Text here Body Text here Body Text here Body Text here Body Text here Body Text here',
      image: 'https://picsum.photos/id/2/900/500'
    },
    {
      id: 9,
      title: 'Title Here',
      description: 'Body Text here Body Text here Body Text here Body Text here Body Text here Body Text here',
      image: 'https://picsum.photos/id/3/900/500'
    },
    {
      id: 10,
      title: 'Title Here',
      description: 'Body Text here Body Text here Body Text here Body Text here Body Text here Body Text here',
      image: 'https://picsum.photos/id/4/900/500'
    },
    {
      id: 11,
      title: 'Title Here',
      description: 'Body Text here Body Text here Body Text here Body Text here Body Text here Body Text here',
      image: 'https://picsum.photos/id/5/900/500'
    },
    {
      id: 12,
      title: 'Title Here',
      description: 'Body Text here Body Text here Body Text here Body Text here Body Text here Body Text here',
      image: 'https://picsum.photos/id/6/900/500'
    }
  ];

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    this.initializeAnimations();
  }

  goToContactForm(){
    localStorage.setItem('contactForm', 'Smart City Command');
    document.getElementById('contactForm')?.scrollIntoView({ behavior: 'smooth' });
  }
  private initializeAnimations() {
    // Animate section title
    gsap.to(this.sectionTitle.nativeElement, {
      duration: 1.2,
      opacity: 1,
      y: 0,
      ease: 'power3.out',
      delay: 0.3
    });

    // Animate navigation buttons
    gsap.fromTo([this.prevBtn.nativeElement, this.nextBtn.nativeElement],
      { scale: 0, opacity: 0 },
      {
        duration: 0.8,
        scale: 1,
        opacity: 1,
        ease: 'back.out(1.7)',
        delay: 0.8,
        stagger: 0.1
      }
    );

    // Animate download section
    gsap.to(this.downloadSection.nativeElement, {
      duration: 1,
      opacity: 1,
      y: 0,
      ease: 'power3.out',
      delay: 1.2
    });

    // Animate initial cards
    setTimeout(() => {
      this.animateCards();
    }, 100);
  }

  private animateCards() {
    const cards = document.querySelectorAll('.story-card');

    gsap.fromTo(cards,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        duration: 0.8,
        opacity: 1,
        y: 0,
        scale: 1,
        ease: 'power3.out',
        stagger: 0.2,
        delay: 0.5
      }
    );
  }

  getSlideStories(slideIndex: number): SuccessStory[] {
    const startIndex = slideIndex * 3;
    return this.stories.slice(startIndex, startIndex + 3);
  }

  getTotalSlides(): number {
    return Math.ceil(this.stories.length / 3);
  }

  onSlideChange(event: any) {
    this.activeSlideIndex = event.current;

    // Animate cards on slide change
    setTimeout(() => {
      const newCards = document.querySelectorAll('.story-card');
      gsap.fromTo(newCards,
        { opacity: 0, y: 20, scale: 0.95 },
        {
          duration: 0.6,
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'power2.out',
          stagger: 0.1
        }
      );
    }, 100);
  }

  previousSlide() {

    if (this.activeSlideIndex > 0) {
      this.carousel.prev();
      this.animateNavButton(this.prevBtn.nativeElement);
    }
  }

  nextSlide() {

    if (this.activeSlideIndex < this.getTotalSlides() - 1) {
      this.carousel.next();
      this.animateNavButton(this.nextBtn.nativeElement);
    }
  }

  private animateNavButton(button: HTMLElement) {
    gsap.to(button, {
      duration: 0.2,
      scale: 0.9,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(button, {
          duration: 0.3,
          scale: 1,
          ease: 'back.out(1.7)'
        });
      }
    });
  }

  downloadCaseStudies() {
    // Animate download button
    gsap.to(this.downloadSection.nativeElement.querySelector('.download-btn'), {
      duration: 0.2,
      scale: 0.95,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(this.downloadSection.nativeElement.querySelector('.download-btn'), {
          duration: 0.3,
          scale: 1,
          ease: 'back.out(1.7)'
        });
      }
    });

    // Simulate download
    console.log('Downloading case studies...');
    alert('Case studies download started!');
  }
}
