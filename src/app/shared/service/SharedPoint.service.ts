import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { loginRequest } from './auth-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedPointService {

  private siteUrl = 'https://gizasystems.sharepoint.com/sites/GizaSystems_Company';
  private listName = 'COC_Landing_Page';
  private apiUrl = `${this.siteUrl}/_api/web/lists/getbytitle('${this.listName}')/items`;

  constructor(private http: HttpClient, private msalService: MsalService) { }

  async login(): Promise<void> {
    try {
      const result = await this.msalService.loginPopup(loginRequest).toPromise();
      console.log('Login successful:', result);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  private async getAccessToken(): Promise<string> {
    try {
      const tokenResponse = await this.msalService.acquireTokenSilent(loginRequest).toPromise();
      if (!tokenResponse) {
        throw new Error('Token response is null or undefined');
      }
      return tokenResponse.accessToken;
    } catch (error) {
      console.error('Silent token acquisition failed:', error);
      try {
        const tokenResponse = await this.msalService.acquireTokenPopup(loginRequest).toPromise();
        if (!tokenResponse) {
          throw new Error('Popup token response is null or undefined');
        }
        return tokenResponse.accessToken;
      } catch (popupError) {
        console.error('Popup token acquisition failed:', popupError);
        throw popupError;
      }
    }
  }

  getListItems(): any {
    const token = this.getAccessToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json;odata=verbose',
      'Content-Type': 'application/json;odata=verbose'
    });
    return this.http.get(this.apiUrl, { headers });
  }

   createListItem(item: any): Observable<any> {
    // const token = await this.getAccessToken();
    const headers = new HttpHeaders({
      // 'Authorization': `Bearer ${token}`,
      'Accept': 'application/json;odata=verbose',
      'Content-Type': 'application/json;odata=verbose',
    });
    debugger
    return this.http.post(this.apiUrl, item, { headers });
  }


  private async getRequestDigest(): Promise<string> {
    const token = await this.getAccessToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json;odata=verbose'
    });
    
    const digestUrl = `${this.siteUrl}/_api/contextinfo`;
    const response = await this.http.post(digestUrl, {}, { headers }).toPromise() as any;
    return response.d.GetContextWebInformation.FormDigestValue;
  }

  apiNewPost(item:any){

    return this.http.post("https://gizasystems.sharepoint.com/sites/GizaSystems_Company/_api/web/GetList(@a1)/AddValidateUpdateItemUsingPath()?@a1='/sites/GizaSystems_Company/Lists/COC_Landing_Page'",item,)
  }
}