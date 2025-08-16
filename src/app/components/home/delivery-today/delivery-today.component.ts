import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
@Component({
  standalone: true,
  selector: 'app-delivery-today',
  templateUrl: './delivery-today.component.html',
  styleUrls: ['./delivery-today.component.css'],
})
export class DeliveryTodayComponent implements OnInit ,AfterViewInit {
  @ViewChild('bannerContainer', { static: false }) bannerContainer!: ElementRef;
  @ViewChild('globeSection', { static: false }) globeSection!: ElementRef;
  @ViewChild('globeContainer', { static: false }) globeContainer!: ElementRef;
  @ViewChild('globeImage', { static: false }) globeImage!: ElementRef;
  @ViewChild('globeGlow', { static: false }) globeGlow!: ElementRef;
  @ViewChild('orbit1', { static: false }) orbit1!: ElementRef;
  @ViewChild('orbit2', { static: false }) orbit2!: ElementRef;
  @ViewChild('orbit3', { static: false }) orbit3!: ElementRef;
  @ViewChild('dataPoint1', { static: false }) dataPoint1!: ElementRef;
  @ViewChild('dataPoint2', { static: false }) dataPoint2!: ElementRef;
  @ViewChild('dataPoint3', { static: false }) dataPoint3!: ElementRef;
  @ViewChild('dataPoint4', { static: false }) dataPoint4!: ElementRef;
  @ViewChild('contentSection', { static: false }) contentSection!: ElementRef;
  @ViewChild('mainTitle', { static: false }) mainTitle!: ElementRef;
  @ViewChild('description', { static: false }) description!: ElementRef;
  @ViewChild('ctaSection', { static: false }) ctaSection!: ElementRef;
  @ViewChild('downloadBtn', { static: false }) downloadBtn!: ElementRef;
  @ViewChild('bgParticles', { static: false }) bgParticles!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    this.initAnimations();
  }

  initAnimations(): void {
    // Set initial states
    gsap.set([
      this.globeContainer.nativeElement,
      this.mainTitle.nativeElement,
      this.description.nativeElement,
      this.ctaSection.nativeElement
    ], {
      opacity: 0,
      y: 50
    });

    gsap.set([this.orbit1.nativeElement, this.orbit2.nativeElement, this.orbit3.nativeElement], {
      scale: 0,
      opacity: 0
    });

    gsap.set([
      this.dataPoint1.nativeElement,
      this.dataPoint2.nativeElement,
      this.dataPoint3.nativeElement,
      this.dataPoint4.nativeElement
    ], {
      scale: 0,
      opacity: 0
    });

    // Create intersection observer for scroll-triggered animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateBanner();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(this.bannerContainer.nativeElement);

    // Start continuous animations
    this.startContinuousAnimations();
  }

  animateBanner(): void {
    const tl = gsap.timeline();

    // Animate globe container
    tl.to(this.globeContainer.nativeElement, {
      duration: 1,
      opacity: 1,
      y: 0,
      ease: "power2.out"
    })
    // Animate orbit rings
    .to([this.orbit1.nativeElement, this.orbit2.nativeElement, this.orbit3.nativeElement], {
      duration: 0.8,
      scale: 1,
      opacity: 1,
      ease: "back.out(1.2)",
      stagger: 0.1
    }, "-=0.5")
    // Animate data points
    .to([
      this.dataPoint1.nativeElement,
      this.dataPoint2.nativeElement,
      this.dataPoint3.nativeElement,
      this.dataPoint4.nativeElement
    ], {
      duration: 0.6,
      scale: 1,
      opacity: 1,
      ease: "back.out(1.5)",
      stagger: 0.1
    }, "-=0.3")
    // Animate content
    .to(this.mainTitle.nativeElement, {
      duration: 0.8,
      opacity: 1,
      y: 0,
      ease: "power2.out"
    }, "-=0.6")
    .to(this.description.nativeElement, {
      duration: 0.7,
      opacity: 1,
      y: 0,
      ease: "power2.out"
    }, "-=0.4")
    .to(this.ctaSection.nativeElement, {
      duration: 0.6,
      opacity: 1,
      y: 0,
      ease: "power2.out"
    }, "-=0.3");
  }

  startContinuousAnimations(): void {
    // Globe rotation
    gsap.to(this.globeImage.nativeElement, {
      duration: 20,
      rotation: 360,
      ease: "none",
      repeat: -1
    });

    // Orbit rings rotation
    gsap.to(this.orbit1.nativeElement, {
      duration: 15,
      rotation: 360,
      ease: "none",
      repeat: -1
    });

    gsap.to(this.orbit2.nativeElement, {
      duration: 25,
      rotation: -360,
      ease: "none",
      repeat: -1
    });

    gsap.to(this.orbit3.nativeElement, {
      duration: 35,
      rotation: 360,
      ease: "none",
      repeat: -1
    });

    // Globe glow pulsing
    gsap.to(this.globeGlow.nativeElement, {
      duration: 3,
      scale: 1.1,
      opacity: 0.8,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    // Floating data points
    gsap.to(this.dataPoint1.nativeElement, {
      duration: 4,
      y: -10,
      x: 5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    gsap.to(this.dataPoint2.nativeElement, {
      duration: 3.5,
      y: 8,
      x: -3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: 0.5
    });

    gsap.to(this.dataPoint3.nativeElement, {
      duration: 4.5,
      y: -6,
      x: 4,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1
    });

    gsap.to(this.dataPoint4.nativeElement, {
      duration: 3.8,
      y: 12,
      x: -6,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1.5
    });
  }

  onDownload(): void {
    // Animate button click
    gsap.to(this.downloadBtn.nativeElement, {
      duration: 0.1,
      scale: 0.95,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        // Add download logic here
        console.log('Download initiated');

        // You can add actual download functionality here
        // For example:
        // const link = document.createElement('a');
        // link.href = 'path/to/your/capabilities-profile.pdf';
        // link.download = 'capabilities-profile.pdf';
        // link.click();

        // Show success feedback
        this.showDownloadFeedback();
      }
    });
  }

  private showDownloadFeedback(): void {
    const originalText = this.downloadBtn.nativeElement.innerHTML;
    this.downloadBtn.nativeElement.innerHTML = '<i class="fas fa-check me-2"></i>Downloaded!';

    gsap.to(this.downloadBtn.nativeElement, {
      duration: 0.3,
      backgroundColor: '#27ae60',
      ease: "power2.out",
      onComplete: () => {
        setTimeout(() => {
          this.downloadBtn.nativeElement.innerHTML = originalText;
          gsap.to(this.downloadBtn.nativeElement, {
            duration: 0.3,
            backgroundColor: '#3498db',
            ease: "power2.out"
          });
        }, 2000);
      }
    });
  }
}
