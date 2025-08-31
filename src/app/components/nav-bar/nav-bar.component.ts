import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { gsap } from 'gsap';
import { ContactFormComponent } from '../ContactForm/ContactForm.component';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgbDatepickerModule,ContactFormComponent],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnInit {
  @ViewChild('sidebar', { static: false }) sidebar!: ElementRef;
  @ViewChild('overlay', { static: false }) overlay!: ElementRef;
  model: NgbModal = inject(NgbModal);
  isSidebarOpen = false;
  ngOnInit(): void {}

  ngAfterViewInit() {
    // Initially hide the sidebar off-screen
    // gsap.set(this.sidebar.nativeElement, { x: '100%' });
    // gsap.set(this.overlay.nativeElement, { opacity: 0, display: 'none' });
  }
  openModal(template: TemplateRef<any>) {
    this.model.open(template ,{
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      
    })
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;

    if (this.isSidebarOpen) {
      this.openSidebar();
    } else {
      this.closeSidebar();
    }
  }
  goToContactForm(contactModalTemplate: TemplateRef<any>): void {
    localStorage.setItem('contactForm', 'Schedule Meeting');
    document.getElementById('contactForm')?.scrollIntoView({ behavior: 'smooth' });
    // this.openModal(contactModalTemplate);
  }

  openSidebar() {
    const tl = gsap.timeline();

    tl.set(this.overlay.nativeElement, { display: 'block' })
      .to(this.overlay.nativeElement, {
        opacity: 0.5,
        duration: 0.4,
        ease: 'power2.inOut',
      })
      .to(
        this.sidebar.nativeElement,
        {
          x: '0%',
          duration: 0.4,
          ease: 'power3.inOut',
        },
        '-=0.2'
      );
  }

  closeSidebar() {
    const tl = gsap.timeline();

    tl.to(this.sidebar.nativeElement, {
      x: '100%',
      duration: 0.4,
      ease: 'power3.inOut',
    })
      .to(
        this.overlay.nativeElement,
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut',
        },
        '-=0.2'
      )
      .set(this.overlay.nativeElement, { display: 'none' });
  }

  onOverlayClick() {
    if (this.isSidebarOpen) {
      this.toggleSidebar();
    }
  }
}
