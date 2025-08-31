import { NgFor } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, QueryList, TemplateRef, ViewChild, ViewChildren, type OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { ContactFormComponent } from '../ContactForm/ContactForm.component';
import { NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface Solution {
  title: string;
  image: string;
  features: string[];
  gradient: string;
  category: 'safety' | 'transport' | 'water' | 'energy' | 'environment' | 'infrastructure' | 'citizen';
}
@Component({
  selector: 'app-smart-city-solutions',
  standalone: true,
  imports: [NgFor,NgbDatepickerModule,ContactFormComponent],
  templateUrl: './SmartCitySolutions.component.html',
  styleUrl: './SmartCitySolutions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartCitySolutionsComponent implements OnInit, AfterViewInit {
  @ViewChildren('solutionCard') solutionCards!: QueryList<ElementRef>;
  @ViewChild('downloadSection') downloadSection!: ElementRef;
  model: NgbModal = inject(NgbModal);
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeAnimations();
  }

  downloadCaseStudies(contactModalTemplate: TemplateRef<any>): void {
   localStorage.setItem('contactForm', 'Download Case Studies');
   this.openModal(contactModalTemplate);
  //  document.getElementById('contactForm')?.scrollIntoView({ behavior: 'smooth' });
  }
  private initializeAnimations(): void {
    // Timeline for initial load
    const tl = gsap.timeline();

    // Animate header
    tl.to('.main-title', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    })
    .to('.subtitle', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")
    .to('.description', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4");

    // Animate solution cards with stagger
    tl.to('.solution-card', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.1
    }, "-=0.3");

    // Animate download section
    tl.to(this.downloadSection.nativeElement, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.2");
  }

  onCardHover(event: Event, isEntering: boolean): void {
    const card = event.currentTarget as HTMLElement;
    const imageOverlay = card.querySelector('.image-overlay') as HTMLElement;
    const hoverEffect = card.querySelector('.hover-effect') as HTMLElement;
    const imageBg = card.querySelector('.image-bg') as HTMLElement;
    const title = card.querySelector('.solution-title') as HTMLElement;

    if (isEntering) {
      // Hover in animations
      gsap.to(card, {
        y: -12,
        duration: 0.4,
        ease: "power2.out"
      });

      gsap.to(imageOverlay, {
        background: "rgba(0, 168, 230, 0.15)",
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(hoverEffect, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(imageBg, {
        scale: 1.08,
        duration: 0.4,
        ease: "power2.out"
      });

      gsap.to(title, {
        color: "#0077be",
        duration: 0.3,
        ease: "power2.out"
      });

      // Animate feature list items
      const featureItems = card.querySelectorAll('.feature-list li');
      gsap.to(featureItems, {
        x: 5,
        duration: 0.3,
        ease: "power2.out",
        stagger: 0.05
      });

    } else {
      // Hover out animations
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(imageOverlay, {
        background: "rgba(0, 168, 230, 0)",
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(hoverEffect, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(imageBg, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });

      gsap.to(title, {
        color: "#00a8e6",
        duration: 0.3,
        ease: "power2.out"
      });

      // Reset feature list items
      const featureItems = card.querySelectorAll('.feature-list li');
      gsap.to(featureItems, {
        x: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }
  openModal(contactModalTemplate: TemplateRef<any>): void {
    this.model.open(contactModalTemplate,{
      size: 'lg',
      
      keyboard: false,
      centered: true,
    });
  }
}
