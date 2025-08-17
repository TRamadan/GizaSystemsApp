import { Component, OnInit } from '@angular/core';
import { RequestTransformService } from './services/request-transform.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'app-request-transform-form',
  templateUrl: './request-transform-form.component.html',
  styleUrls: ['./request-transform-form.component.css'],
})
export class RequestTransformFormComponent implements OnInit {
  constructor(
    private tosterService: ToastrService,
    private _requestService: RequestTransformService
  ) {}

  ngOnInit() {}

  createFormRequest(): void {
    const body = {
      name: 'Abwhab',
      email: '3bawahab01@gmail.com',
      phone: '01016151464',
      message: 'Hello World',
      solution: 'ERB AND CRM',
      requestFromLandingPage: 'land 01',
    };
    this._requestService
      .createRequest('values/addLandingPageEnquiry', body)
      .subscribe({
        next: () => {
          this.tosterService.success(
            'Done sending your inquery',
            'Successfull operation'
          );
        },
        error: () => {
          this.tosterService.error(
            'There is an error occured, please try again',
            'Wrong operation'
          );
        },
      });
  }
}
