import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, QueryList, ViewChildren, type OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-smart-city-benefits',
  standalone: true,
  imports: [NgFor],
  templateUrl: './SmartCityBenefits.component.html',
  styleUrl: './SmartCityBenefits.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartCityBenefitsComponent implements OnInit {

  @ViewChildren('benefitCard') benefitCards!: QueryList<ElementRef>;

  benefits = [
    {
      title: 'Single Source of Truth',
      description: 'Eliminate data silos. All critical urban information is unified across one comprehensive platform, fostering collaborative decision-making and enhancing inter-departmental synergy.',
      expandedDescription: 'Transform your city operations with unified data management. Break down departmental barriers and create seamless collaboration across all city services.',
      icon: 'fas fa-database',
      img:"assets/images/singleSource.svg",
      delay: '0'
    },
    {
      title: 'Timely Responses',
      description: 'Drastically reduce response times for all incidents, from traffic accidents to infrastructure failures, minimizing disruptions and ensuring public well-being and security.',
      expandedDescription: 'Achieve lightning-fast emergency response times through intelligent automation and real-time monitoring systems that protect your citizens.',
      icon: 'fas fa-clock',
      img:"assets/images/timely.svg",
      delay: '100'
    },
    {
      title: 'Operational Efficiency',
      description: 'Streamline workflows, reduce manual effort, and optimize resource allocation across all municipal departments, leading to significant cost savings and improved service delivery.',
      expandedDescription: 'Maximize your city\'s potential with AI-driven optimization that reduces costs while dramatically improving service quality for residents.',
      icon: 'fas fa-cogs',
      img:"assets/images/operational.svg",
      delay: '200'
    },
    {
      title: 'Root Cause Analysis',
      description: 'Go beyond symptoms. Gain deep insights and analytics that address the fundamental causes of recurring problems, enabling long-term, sustainable solutions for urban challenges.',
      expandedDescription: 'Solve problems at their source with advanced analytics that identify patterns and prevent issues before they impact your community.',
      icon: 'fas fa-search-plus',
      img:"assets/images/rootCause.svg",
      delay: '300'
    },
    {
      title: 'Enhanced Citizen Experience',
      description: 'Enhance citizen trust through improved service delivery, transparency, accessible information, and responsive government systems.',
      expandedDescription: 'Build stronger community relationships through transparent, responsive governance that puts citizen needs first and delivers measurable results.',
      icon: 'fas fa-hands-helping',
      img:"assets/images/enhanced.svg",
      delay: '400'
    },
    {
      title: 'Sustainability Enablement',
      description: 'Drive critical eco-friendly initiatives and resource conservation. Our solutions directly contribute to achieving key UN SDGs 3, 6, 9, 11, 13, aligning with national environmental visions for the region.',
      expandedDescription: 'Lead the green transformation with sustainable technologies that protect the environment while building a resilient, future-ready smart city.',
      icon: 'fas fa-leaf',
      img:"assets/images/sustational.svg",
      delay: '500'
    }
  ];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeAnimations();
  }

  private initializeAnimations(): void {
    // Timeline for initial load
    const tl = gsap.timeline();
    // Animate header

    tl.to('.main-title', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.inOut"
    })
    .to('.subtitle', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.inOut"
    }, "-=0.5");

    // Animate benefit cards with stagger
    tl.to('.benefit-card', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.15
    }, "-=0.3");

    // Animate background circles
    gsap.to('.bg-circle', {
      rotation: 360,
      duration: 60,
      ease: "none",
      repeat: -1
    });

    // Animate pattern dots
    gsap.to('.pattern-dot', {
      scale: 1.2,
      opacity: 0.6,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.3
    });
  }

  onCardHover(event: Event, isEntering: boolean): void {
    const card = event.currentTarget as HTMLElement;
    const icon = card.querySelector('.benefit-icon') as HTMLElement;
    const overlay = card.querySelector('.hover-overlay') as HTMLElement;
    const bgPattern = card.querySelector('.bg-pattern') as HTMLElement;

    if (isEntering) {
      // Hover in animations
      gsap.to(card, {
        y: -12,
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out"
      });

      gsap.to(overlay, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)"
      });

      gsap.to(icon, {
        scale: 1.15,
        rotation: 5,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(bgPattern, {
        opacity: 0.3,
        duration: 0.3
      });

      // Animate pattern dots
      const dots = card.querySelectorAll('.pattern-dot');
      gsap.to(dots, {
        scale: 1.5,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.1
      });

    } else {
      // Hover out animations
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(overlay, {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in"
      });

      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(bgPattern, {
        opacity: 0.1,
        duration: 0.3
      });

      // Reset pattern dots
      const dots = card.querySelectorAll('.pattern-dot');
      gsap.to(dots, {
        scale: 1,
        opacity: 0.3,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }

}
