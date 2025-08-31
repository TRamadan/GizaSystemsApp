import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, ViewChild, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import gsap from 'gsap';
import { ApiService } from '../serice/api.service';
import { SharedPointService } from '../../shared/service/SharedPoint.service';
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { filter } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule,NgSelectModule],
  templateUrl: './ContactForm.component.html',
  styleUrl: './ContactForm.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent implements OnInit, AfterViewInit {
  @ViewChild('contactContainer', { static: false }) contactContainer!: ElementRef;
  @ViewChild('leftPanel', { static: false }) leftPanel!: ElementRef;
  @ViewChild('rightPanel', { static: false }) rightPanel!: ElementRef;
  @ViewChild('titleText', { static: false }) titleText!: ElementRef;
  @ViewChild('subtitleText', { static: false }) subtitleText!: ElementRef;
  @ViewChild('formElement', { static: false }) formElement!: ElementRef;
  @ViewChild('nameField', { static: false }) nameField!: ElementRef;
  @ViewChild('emailField', { static: false }) emailField!: ElementRef;
  @ViewChild('phoneField', { static: false }) phoneField!: ElementRef;
  @ViewChild('companyField', { static: false }) companyField!: ElementRef;
  @ViewChild('solutionsField', { static: false }) solutionsField!: ElementRef;
  @ViewChild('messageField', { static: false }) messageField!: ElementRef;
  @ViewChild('submitButton', { static: false }) submitButton!: ElementRef;

  contactForm: FormGroup;
  isSubmitting = false;
  solutions = [
    { value: 'smart-traffic', label: 'Smart Traffic Management' },
    { value: 'waste-management', label: 'Waste Management Solutions' },
    { value: 'energy-optimization', label: 'Energy Optimization' },
    { value: 'public-safety', label: 'Public Safety Systems' },
    { value: 'citizen-engagement', label: 'Citizen Engagement Platform' },
    { value: 'data-analytics', label: 'Data Analytics & Insights' },
    { value: 'other', label: 'Other' }
  ];

  constructor(private fb: FormBuilder,private apiService: ApiService,
    private msalBroadcastService: MsalBroadcastService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      company: ['', [Validators.required]],
      solution: [''],
      message: [''],
      "requestFromLandingPage": ["land 01"]

    });
  }

  ngOnInit(): void {
    // Component initialization
    this.apiService.getAllItems().subscribe((res)=>{
      console.log(res)
    },error=>{
      console.log("first",error)
    })
    
 
 
  }
  


  ngAfterViewInit(): void {
    this.initAnimations();
  }

  initAnimations(): void {
    // Set initial states
    gsap.set([this.titleText.nativeElement, this.subtitleText.nativeElement], {
      opacity: 0,
      y: 50
    });

    gsap.set([
      this.nameField.nativeElement,
      this.emailField.nativeElement,
      this.phoneField.nativeElement,
      this.companyField.nativeElement,
      this.solutionsField.nativeElement,
      this.messageField.nativeElement,
      this.submitButton.nativeElement
    ], {
      opacity: 0,
      x: 30
    });

    gsap.set(this.leftPanel.nativeElement, {
      x: -100,
      opacity: 0
    });

    gsap.set(this.rightPanel.nativeElement, {
      x: 100,
      opacity: 0
    });

    // Create timeline
    const tl = gsap.timeline();

    // Animate panels
    tl.to([this.leftPanel.nativeElement, this.rightPanel.nativeElement], {
      duration: 0.8,
      x: 0,
      opacity: 1,
      ease: "power2.out",
      stagger: 0.2
    })
    .to([this.titleText.nativeElement, this.subtitleText.nativeElement], {
      duration: 0.6,
      opacity: 1,
      y: 0,
      ease: "power2.out",
      stagger: 0.15
    }, "-=0.4")
    .to([
      this.nameField.nativeElement,
      this.emailField.nativeElement,
      this.phoneField.nativeElement,
      this.companyField.nativeElement,
      this.solutionsField.nativeElement,
      this.messageField.nativeElement,
      this.submitButton.nativeElement
    ], {
      duration: 0.5,
      opacity: 1,
      x: 0,
      ease: "power2.out",
      stagger: 0.1
    }, "-=0.3");

    // Add hover animations for form fields
    const formFields = [
      this.nameField.nativeElement,
      this.emailField.nativeElement,
      this.phoneField.nativeElement,
      this.companyField.nativeElement,
      this.solutionsField.nativeElement,
      this.messageField.nativeElement
    ];

    formFields.forEach(field => {
      const input = field.querySelector('.form-control, .form-select');
      if (input) {
        input.addEventListener('focus', () => {
          gsap.to(field, {
            duration: 0.3,
            scale: 1.02,
            ease: "power2.out",
            zIndex:1
          });
        });

        input.addEventListener('blur', () => {
          gsap.to(field, {
            duration: 0.3,
            scale: 1,
            ease: "power2.out",
            zIndex:1
          });
        });
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.valid) {
      const btntype = localStorage.getItem('contactForm');
      this.isSubmitting = true;
      this.apiService.createRequest("values/addLandingPageEnquiry",{...this.contactForm.getRawValue(),solution:this.contactForm.get('solution')?.value.join(',')}).subscribe((res)=>{
        console.log(res)
        this.isSubmitting = false;
        this.downloadFiles();
        gsap.to(this.submitButton.nativeElement.querySelector('button'), {
          duration: 0.2,
          scale: 0.95,
          ease: "power2.out",
          yoyo: true,
          repeat: 1
        });

  
        // Simulate API call
        setTimeout(() => {
          console.log('Form submitted:', this.contactForm.value);
  
          // Show success animation
          gsap.to(this.formElement.nativeElement, {
            duration: 0.5,
            scale: 1.05,
            ease: "power2.out",
            yoyo: true,
            repeat: 1
          });
  
          // Reset form after success animation
          setTimeout(() => {
            this.isSubmitting = false;
            this.contactForm.reset();
            this.contactForm.get('requestFromLandingPage')?.setValue('land 01');
          }, 1000);
  
        }, 2000);
      })
      
     

      // Animate button on submit
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });

      // Shake animation for invalid form
      gsap.to(this.formElement.nativeElement, {
        duration: 0.1,
        x: -10,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 5
      });
    }
  }

  downloadFiles(){
    const a = document.createElement('a');
    a.href = 'https://picsum.photos/id/1/900/500';
    a.download = 'image.jpg';
    a.target = '_blank';
    a.click();
  }

 
}
