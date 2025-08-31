import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { loginRequest } from '../../shared/service/auth-config';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  configUrl = environment.apiConfig2;
  private siteUrl = 'https://gizasystems.sharepoint.com/sites/GizaSystems_Company';
  private listTitle = 'COC_Landing_Page';
  private token:any =''
  constructor(private http: HttpClient,private msalService: MsalService) {
    this.getAccessToken()
  }


  private async getAccessToken(): Promise<string> {
    try {
      const tokenResponse = await this.msalService.acquireTokenSilent(loginRequest).toPromise();
      if (!tokenResponse) {
        throw new Error('Token response is null or undefined');
      }
      this.token = tokenResponse.accessToken;
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

  private  getHeaders(): HttpHeaders {
    // For SharePoint Online, you'll need to handle authentication
    // This example assumes you're using SharePoint authentication
    return new HttpHeaders({
      'Accept': 'application/json;odata=verbose',
      'Content-Type': 'application/json;odata=verbose',
      'Authorization': `Bearer ${this.token}`,

    });
  }

  // Get all items from the list
  getAllItems(): Observable<any[]> {
    const url = `${this.siteUrl}/_api/web/lists/getbytitle('${this.listTitle}')/items`;
    
    return this.http.get<any>(url, { headers: this.getHeaders() }).pipe(
      map(response => response.d.results)
    );
  }

  // Get specific item by ID
  getItemById(id: number): Observable<any> {
    const url = `${this.siteUrl}/_api/web/lists/getbytitle('${this.listTitle}')/items(${id})`;
    
    return this.http.get<any>(url, { headers: this.getHeaders() }).pipe(
      map(response => response.d)
    );
  }

  // Create new item
  createItem(item: any): Observable<any> {
    const url = `${this.siteUrl}/_api/web/lists/getbytitle('${this.listTitle}')/items`;
    
    return this.http.post(url, item, { headers: this.getHeaders() });
  }

  // Update item
  updateItem(id: number, item: any): Observable<any> {
    const url = `${this.siteUrl}/_api/web/lists/getbytitle('${this.listTitle}')/items(${id})`;
    
    return this.http.post(url, item, { 
      headers: this.getHeaders().set('X-HTTP-Method', 'MERGE') 
    });
  }

  // Delete item
  deleteItem(id: number): Observable<any> {
    const url = `${this.siteUrl}/_api/web/lists/getbytitle('${this.listTitle}')/items(${id})`;
    
    return this.http.post(url, null, { 
      headers: this.getHeaders().set('X-HTTP-Method', 'DELETE') 
    });
  }
  createRequest(url: string, body: any) {
    return this.http.post(this.configUrl + url, body);
  }

}
