import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, input, ViewChild, type OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import gsap from 'gsap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { RequestTransformService } from './services/request-transform.service';
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgSelectModule,NgIf],
  selector: 'app-request-transform-form',
  templateUrl: './request-transform-form.component.html',
  styleUrls: ['./request-transform-form.component.scss'],
})
export class RequestTransformFormComponent implements OnInit {
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
  isDefault = input<boolean>(true)
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
  
  constructor(private fb: FormBuilder,
    private apiService: RequestTransformService,
    private tosterService: ToastrService,
    private modalService: NgbModal
   
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      company: ['', [Validators.required]],
      solution: [''],
      message: [''],
      "requestFromLandingPage": ["COC"]

    });
  }

  form!: FormGroup;

  ngOnInit() {
  }
  initalForm(): void {
 
  }


  ngAfterViewInit(): void {
      this.initAnimations();
  }

  initAnimations(): void {
    // Set initial states
    gsap.set([this.titleText.nativeElement, this.subtitleText.nativeElement], {
      opacity: 1,
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
      opacity: 1,
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
    // const formFields = [
    //   this.nameField.nativeElement,
    //   this.emailField.nativeElement,
    //   this.phoneField.nativeElement,
    //   this.companyField.nativeElement,
    //   this.solutionsField.nativeElement,
    //   this.messageField.nativeElement
    // ];

    // formFields.forEach(field => {
    //   const input = field.querySelector('.form-control, .form-select');
    //   if (input) {
    //     input.addEventListener('focus', () => {
    //       gsap.to(field, {
    //         duration: 0.3,
    //         scale: 1.02,
    //         ease: "power2.out",
    //         zIndex:1000,
    //         opacity:1,
    //       });
    //     });

    //     input.addEventListener('blur', () => {
    //       gsap.to(field, {
    //         duration: 0.3,
    //         scale: 1,
    //         ease: "power2.out",
    //         zIndex:1
    //       });
    //     });
    //   }
    // });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
  createFormRequest(): void {
    this.apiService
      .createRequest('values/addLandingPageEnquiry', {
        ...this.form.getRawValue(),
        solution: this.form.get('solution')?.value.join(','),
      })
      .subscribe({
        next: () => {
          this.tosterService.success(
            'Done sending your inquery',
            'Successfull operation'
          );
          const type = localStorage.getItem('contactForm')??'';
          this.downloadFile(type);
          localStorage.removeItem('contactForm');
          this.form.reset();
          this.form.get('requestFromLandingPage')?.setValue('land 02');
        },
        error: () => {
          this.tosterService.error(
            'There is an error occured, please try again',
            'Wrong operation'
          );
        },
      });
  }

  downloadFile(type: string) {
    let url = '';
    if(type === 'strategySection') {
      url = 'assets/pdfs/strategySection.pdf';
    }
    if(type === 'whatWeDeliverToday') {
      url = 'assets/pdfs/whatWeDeliverToday.pdf';
    }
    if(type === '') {
      url=''
    }
    if(url !== '') {
      
      
      const a = document.createElement('a');
      a.href = url;
      a.download = type;
      // a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      this.modalService.dismissAll();
    }
  }
}
