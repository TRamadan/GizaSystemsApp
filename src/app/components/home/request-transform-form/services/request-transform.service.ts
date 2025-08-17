import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class RequestTransformService {
  configUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  createRequest(url: string, body: any) {
    return this.http.post(this.configUrl + url, body);
  }
}
