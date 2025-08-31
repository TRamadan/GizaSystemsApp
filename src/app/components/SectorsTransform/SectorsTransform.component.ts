import { NgFor } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, QueryList, ViewChildren, type OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-sectors-transform',
  standalone: true,
  imports: [NgFor],
  templateUrl: './SectorsTransform.component.html',
  styleUrl: './SectorsTransform.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectorsTransformComponent implements OnInit, AfterViewInit {
  @ViewChildren('sectorCard') sectorCards!: QueryList<ElementRef>;

  sectors = [
    { title: 'Metropolitan', icon: 'fas fa-city' },
    { title: 'Heritage Cities', icon: 'fas fa-landmark' },
    { title: 'Industrial Cities', icon: 'fas fa-industry' },
    { title: 'Sports Cities and Stadiums', icon: 'fas fa-running' },
    { title: 'Mixed Communities', icon: 'fas fa-home' },
    { title: 'Luxury Resorts', icon: 'fas fa-spa' }
  ];

  ngOnInit() {
    // Initialize GSAP animations
    gsap.set('.main-title', { opacity: 0, y: 50 });
    gsap.set('.subtitle', { opacity: 0, y: 30 });
    gsap.set('.description', { opacity: 0, y: 20 });
  }



  ngAfterViewInit() {
    // Entrance animations
    const tl = gsap.timeline();

    tl.to('.main-title', { duration: 1.2, opacity: 1, y: 0, ease: 'power3.out' })
      .to('.subtitle', { duration: 1, opacity: 1, y: 0, ease: 'power3.out' }, '-=0.6')
      .to('.description', { duration: 1, opacity: 1, y: 0, ease: 'power3.out' }, '-=0.4');

    // Set initial state for sector cards
    gsap.set('.sector-card', { opacity: 0, scale: 0.8, y: 50 });

    // Animate sector cards in
    gsap.to('.sector-card', {
      duration: 0.8,
      opacity: 1,
      scale: 1,
      y: 0,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 1.5
    });
  }

  onHover(event: MouseEvent, isHover: boolean) {
    const card = event.currentTarget as HTMLElement;
    const icon = card.querySelector('.sector-icon') as HTMLElement;
    const title = card.querySelector('.sector-title') as HTMLElement;

    if (isHover) {
      gsap.to(card, { duration: 0.3, scale: 1.05, ease: 'power2.out' });
      gsap.to(icon, { duration: 0.3, scale: 1.2, rotation: 5, ease: 'power2.out' });
      gsap.to(title, { duration: 0.3, y: -5, ease: 'power2.out' });
    } else {
      gsap.to(card, { duration: 0.3, scale: 1, ease: 'power2.out' });
      gsap.to(icon, { duration: 0.3, scale: 1, rotation: 0, ease: 'power2.out' });
      gsap.to(title, { duration: 0.3, y: 0, ease: 'power2.out' });
    }
  }
}
