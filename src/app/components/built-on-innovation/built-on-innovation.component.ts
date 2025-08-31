import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, type OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-built-on-innovation',
  standalone: true,
  imports: [NgFor],
  templateUrl: './built-on-innovation.component.html',
  styleUrl: './built-on-innovation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuiltOnInnovationComponent implements OnInit {

  @ViewChild('mainTitle') mainTitle!: ElementRef;
  @ViewChild('subtitle') subtitle!: ElementRef;
  @ViewChild('description') description!: ElementRef;
  @ViewChild('features') featuresEl!: ElementRef;
  @ViewChild('commandCenter') commandCenter!: ElementRef;
  @ViewChild('mainScreen') mainScreen!: ElementRef;
  @ViewChild('leftScreen') leftScreen!: ElementRef;
  @ViewChild('rightScreen') rightScreen!: ElementRef;
  @ViewChild('controlDesk') controlDesk!: ElementRef;
  @ViewChild('chair') chair!: ElementRef;
  @ViewChild('data1') data1!: ElementRef;
  @ViewChild('data2') data2!: ElementRef;
  @ViewChild('data3') data3!: ElementRef;
  @ViewChild('data4') data4!: ElementRef;
  @ViewChild('techPattern') techPattern!: ElementRef;

  featuresList = [
    {
      title: 'IoT Platform',
      description: 'Connects thousands of sensors citywide, offering real-time data about traffic flow.',
      icon: 'fas fa-network-wired'
    },
    {
      title: 'Digital Twin',
      description: 'Virtual replica of your city, enabling scenario simulations and predictive insights.',
      icon: 'fas fa-cube'
    },
    {
      title: 'Big Data & Advanced Analytics (AI/ML)',
      description: 'Turn vast data into decisions with real-time analytics and automated intelligence.',
      icon: 'fas fa-chart-line'
    },
    {
      title: 'GIS Mapping',
      description: 'Comprehensive location-based insights to inform planning, service delivery, and resource allocation.',
      icon: 'fas fa-map-marked-alt'
    },
    {
      title: 'Workforce Management',
      description: 'Tracks dispatches and optimizes workforce efforts from a single dashboard.',
      icon: 'fas fa-users-cog'
    }
  ];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeAnimations();
  }

  private initializeAnimations(): void {
    // Timeline for initial load
    const tl = gsap.timeline();

    // Animate text content
    tl.to(this.mainTitle.nativeElement, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    })
    .to(this.subtitle.nativeElement, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")
    .to(this.description.nativeElement, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4");

    // Animate feature items
    const featureItems = this.featuresEl.nativeElement.querySelectorAll('.feature-item');
    featureItems.forEach((item: HTMLElement, index: number) => {
      tl.to(item, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out"
      }, `-=${0.8 - index * 0.1}`);
    });

    // Animate command center elements
    tl.to(this.commandCenter?.nativeElement, {
      opacity: 1,
      duration: 0.5
    }, "-=1")
    .from([this.mainScreen?.nativeElement, this.leftScreen?.nativeElement, this.rightScreen?.nativeElement], {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: 0.2
    }, "-=0.5")
    .from([this.controlDesk.nativeElement, this.chair.nativeElement], {
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1
    }, "-=0.3");

    // Animate data points
    const dataPoints = [this.data1, this.data2, this.data3, this.data4];
    dataPoints.forEach((dataPoint, index) => {
      tl.to(dataPoint.nativeElement, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, `-=${0.8 - index * 0.1}`);
    });

    // Continuous animations
    this.setupContinuousAnimations();
  }

  private setupContinuousAnimations(): void {
    // Floating animation for data points
    const dataPoints = [this.data1, this.data2, this.data3, this.data4];
    dataPoints.forEach((dataPoint, index) => {
      gsap.to(dataPoint.nativeElement, {
        y: "+=10",
        duration: 2 + index * 0.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });
    });

    // Screen glow animation
    const screens = [this.mainScreen, this.leftScreen, this.rightScreen];
    screens.forEach((screen, index) => {
      gsap.to(screen.nativeElement, {
        boxShadow: "0 0 30px rgba(79, 172, 254, 0.8)",
        duration: 3 + index * 0.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });
    });

    // Tech pattern rotation
    gsap.to(this.techPattern.nativeElement, {
      rotation: 360,
      duration: 60,
      ease: "none",
      repeat: -1
    });

    // Hover effects for feature items
    const featureItems = this.featuresEl.nativeElement.querySelectorAll('.feature-item');
    featureItems.forEach((item: HTMLElement) => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          scale: 1.02,
          y: -5,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }

}
