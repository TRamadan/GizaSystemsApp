import { NgFor, NgIf } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  type OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import gsap from 'gsap';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './Footer.component.html',
  styleUrl: './Footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit, AfterViewInit {
  @ViewChild('footerContainer', { static: false }) footerContainer!: ElementRef;
  @ViewChild('headerTitle', { static: false }) headerTitle!: ElementRef;
  @ViewChild('socialLinks', { static: false }) socialLinks!: ElementRef;
  @ViewChild('contactSection', { static: false }) contactSection!: ElementRef;
  @ViewChild('linksSection', { static: false }) linksSection!: ElementRef;
  @ViewChild('newsletterSection', { static: false })
  newsletterSection!: ElementRef;
  @ViewChild('copyright', { static: false }) copyright!: ElementRef;

  newsletterForm: FormGroup;
  isSubscribing = false;

  constructor(private fb: FormBuilder) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    this.initAnimations();
  }

  initAnimations(): void {
    // Set initial states
    gsap.set(
      [
        this.headerTitle.nativeElement,
        this.socialLinks.nativeElement,
        this.contactSection.nativeElement,
        this.linksSection.nativeElement,
        this.newsletterSection.nativeElement,
        this.copyright.nativeElement,
      ],
      {
        opacity: 0,
        y: 30,
      }
    );

    // Create observer for scroll-triggered animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateFooter();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(this.footerContainer.nativeElement);

    // Add hover animations for interactive elements
    this.addHoverAnimations();
  }

  animateFooter(): void {
    const tl = gsap.timeline();

    tl.to(this.headerTitle.nativeElement, {
      duration: 0.8,
      opacity: 1,
      y: 0,
      ease: 'power2.out',
    })
      .to(
        this.socialLinks.nativeElement,
        {
          duration: 0.6,
          opacity: 1,
          y: 0,
          ease: 'power2.out',
        },
        '-=0.4'
      )
      .to(
        [
          this.contactSection.nativeElement,
          this.linksSection.nativeElement,
          this.newsletterSection.nativeElement,
        ],
        {
          duration: 0.7,
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          stagger: 0.15,
        },
        '-=0.3'
      )
      .to(
        this.copyright.nativeElement,
        {
          duration: 0.5,
          opacity: 1,
          y: 0,
          ease: 'power2.out',
        },
        '-=0.2'
      );
  }

  addHoverAnimations(): void {
    // Social icons hover animation
    const socialIcons =
      this.footerContainer.nativeElement.querySelectorAll('.social-icon');
    socialIcons.forEach((icon: HTMLElement) => {
      icon.addEventListener('mouseenter', () => {
        gsap.to(icon, {
          duration: 0.3,
          scale: 1.1,
          rotate: 5,
          ease: 'power2.out',
        });
      });

      icon.addEventListener('mouseleave', () => {
        gsap.to(icon, {
          duration: 0.3,
          scale: 1,
          rotate: 0,
          ease: 'power2.out',
        });
      });
    });

    // Footer links hover animation
    const footerLinks =
      this.footerContainer.nativeElement.querySelectorAll('.footer-links a');
    footerLinks.forEach((link: HTMLElement) => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          duration: 0.2,
          x: 5,
          ease: 'power2.out',
        });
      });

      link.addEventListener('mouseleave', () => {
        gsap.to(link, {
          duration: 0.2,
          x: 0,
          ease: 'power2.out',
        });
      });
    });

    // Subsidiary logos hover animation
    const subsidiaryItems =
      this.footerContainer.nativeElement.querySelectorAll('.subsidiary-item');
    subsidiaryItems.forEach((item: HTMLElement) => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          duration: 0.3,
          scale: 1.05,
          ease: 'power2.out',
        });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          duration: 0.3,
          scale: 1,
          ease: 'power2.out',
        });
      });
    });
  }

  isNewsletterEmailInvalid(): boolean {
    const email = this.newsletterForm.get('email');
    return !!(email && email.invalid && (email.dirty || email.touched));
  }

  onSubscribe(): void {
    if (this.newsletterForm.valid) {
      this.isSubscribing = true;

      // Simulate API call
      setTimeout(() => {
        console.log('Newsletter subscription:', this.newsletterForm.value);
        this.isSubscribing = false;

        // Success animation
        const button =
          this.footerContainer.nativeElement.querySelector('.newsletter-btn');
        gsap.to(button, {
          duration: 0.2,
          scale: 1.1,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
        });

        // Reset form
        this.newsletterForm.reset();
      }, 2000);
    } else {
      // Mark email as touched to show validation error
      this.newsletterForm.get('email')?.markAsTouched();

      // Shake animation for invalid form
      const inputGroup =
        this.footerContainer.nativeElement.querySelector('.input-group');
      gsap.to(inputGroup, {
        duration: 0.1,
        x: -5,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: 3,
      });
    }
  }
}
