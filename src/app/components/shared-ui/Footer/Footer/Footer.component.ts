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
  styleUrl: './Footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  newsletterSection!: ElementRef;

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

  isNewsletterEmailInvalid(): boolean {
    const email = this.newsletterForm.get('email');
    return !!(email && email.invalid && (email.dirty || email.touched));
  }
}
