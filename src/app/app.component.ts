import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { DriveContentComponent } from './components/DriveContent/DriveContent.component';
import { EmpoweringSmarterCitiesComponent } from './components/EmpoweringSmarterCities/EmpoweringSmarterCities.component';
import { BuiltOnInnovationComponent } from './components/built-on-innovation/built-on-innovation.component';
import { SmartCityBenefitsComponent } from './components/SmartCityBenefits/SmartCityBenefits.component';
import { SmartCitySolutionsComponent } from './components/SmartCitySolutions/SmartCitySolutions.component';
import { SectorsTransformComponent } from './components/SectorsTransform/SectorsTransform.component';
import { SuccessStoriesComponent } from './components/SuccessStories/SuccessStories.component';
import { ContactFormComponent } from './components/ContactForm/ContactForm.component';
import { FooterComponent } from './components/Footer/Footer.component';
import { FooterNewComponent } from './components/FooterNew/FooterNew.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MainComponent,
    DriveContentComponent,
    EmpoweringSmarterCitiesComponent,
    BuiltOnInnovationComponent,
    SmartCityBenefitsComponent,
    SmartCitySolutionsComponent,
    SectorsTransformComponent,
    SuccessStoriesComponent,
    ContactFormComponent,
    FooterComponent,
    FooterNewComponent,
    NavBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'coc';
}
