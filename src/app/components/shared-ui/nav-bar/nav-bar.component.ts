import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnInit {
  @ViewChild('sidebar', { static: false }) sidebar!: ElementRef;
  @ViewChild('overlay', { static: false }) overlay!: ElementRef;

  isSidebarOpen = false;
  ngOnInit(): void {}

  ngAfterViewInit() {
    // Initially hide the sidebar off-screen
    // gsap.set(this.sidebar.nativeElement, { x: '100%' });
    // gsap.set(this.overlay.nativeElement, { opacity: 0, display: 'none' });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;

    if (this.isSidebarOpen) {
      this.openSidebar();
    } else {
      this.closeSidebar();
    }
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
