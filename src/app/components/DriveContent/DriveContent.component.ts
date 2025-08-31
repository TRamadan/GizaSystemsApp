import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild, type OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-drive-content',
  standalone: true,
  imports: [],
  templateUrl: './DriveContent.component.html',
  styleUrl: './DriveContent.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriveContentComponent implements OnInit,AfterViewInit {

  @ViewChild('sectionRef', { static: true }) sectionRef!: ElementRef;
  @ViewChild('contentRef', { static: true }) contentRef!: ElementRef;
  @ViewChild('titleRef', { static: true }) titleRef!: ElementRef;
  @ViewChild('subtitleRef', { static: true }) subtitleRef!: ElementRef;

  private scrollTriggerInstance: ScrollTrigger | null = null;
  ngOnInit(): void { }
  ngAfterViewInit(): void {
    this.initScrollAnimation();
  }
  ngOnDestroy(): void {
    // Clean up ScrollTrigger instance
    if (this.scrollTriggerInstance) {
      this.scrollTriggerInstance.kill();
    }
  }

  private initScrollAnimation(): void {
    // Set initial state
    this.resetElements();

    // Create ScrollTrigger
    this.scrollTriggerInstance = ScrollTrigger.create({
      trigger: this.sectionRef.nativeElement,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => this.fadeIn(),
      onEnterBack: () => this.fadeIn(),
      onLeave: () => this.resetElements(),
      onLeaveBack: () => this.resetElements()
    });
  }

  private fadeIn(): void {
    const tl = gsap.timeline();

    tl.fromTo(this.contentRef.nativeElement, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    })
    .fromTo(this.titleRef.nativeElement, {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.6')
    .fromTo(this.subtitleRef.nativeElement, {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.4');
  }

  private resetElements(): void {
    gsap?.set([this.contentRef?.nativeElement, this.titleRef?.nativeElement, this.subtitleRef?.nativeElement], {
      opacity: 0,
      y: 50
    });
  }

}
