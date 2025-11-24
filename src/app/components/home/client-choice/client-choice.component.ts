import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-client-choice',
  imports: [NgClass],
  templateUrl: './client-choice.component.html',
  styleUrls: ['./client-choice.component.css'],
})
export class ClientChoiceComponent implements OnInit {
  constructor() { }

  zoomLevel = 100;
  currentZoom = 100;
  private zoomInterval: any;

  ngOnInit(): void {
    this.startZoomWatcher();
  }

  ngOnDestroy(): void {
    clearInterval(this.zoomInterval);
  }

  startZoomWatcher() {
    this.zoomInterval = setInterval(() => {
      const currentZoom = Math.round(window.devicePixelRatio * 100);
      if (currentZoom >= 250) {
        this.currentZoom = currentZoom;
      } else {
        this.currentZoom = 100;
      }
    }, 200); // checks 5 times per second (lightweight)
  }
}
