import { Component, OnInit } from '@angular/core';
import { RequestTransformService } from './services/request-transform.service';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgSelectModule],
  selector: 'app-request-transform-form',
  templateUrl: './request-transform-form.component.html',
  styleUrls: ['./request-transform-form.component.css'],
})
export class RequestTransformFormComponent implements OnInit {
  constructor(
    private tosterService: ToastrService,
    private _requestService: RequestTransformService,
    private formBuilder: FormBuilder
  ) {}
  form!: FormGroup;

  solutions = [
    { value: 'Solution 1', label: 'Solution 1' },
    { value: 'Solution 2', label: 'Solution 2' },
    { value: 'Solution 3', label: 'Solution 3' },
  ];
  ngOnInit() {
    this.initalForm();
  }
  initalForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      message: ['', [Validators.required]],
      company: ['', [Validators.required]],
      solution: ['', [Validators.required]],
      requestFromLandingPage: ['land 02', [Validators.required]],
    });
  }

  createFormRequest(): void {
    debugger;
    this._requestService
      .createRequest('values/addLandingPageEnquiry', {
        ...this.form.getRawValue(),
        solution: this.form.get('solution')?.value.join(','),
      })
      .subscribe({
        next: () => {
          debugger;
          this.tosterService.success(
            'Done sending your inquery',
            'Successfull operation'
          );
          const type = localStorage.getItem('contactForm')??'';
          this.downloadFile(type);
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
    
    const a = document.createElement('a');
    a.href = url;
    a.download = type;
    // a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
