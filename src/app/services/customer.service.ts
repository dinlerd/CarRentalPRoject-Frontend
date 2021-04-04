import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';
import { CustomerUser } from '../models/customerUser';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  
  apiUrl = 'https://localhost:44316/api/customers/getall';

  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<ListResponseModel<Customer>> {
    return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl);
  }

  getCustomersByEmail(email:string):Observable<ItemResponseModel<CustomerUser>> {
    return this.httpClient.get<ItemResponseModel<CustomerUser>>(environment.apiUrl + "customers/getbyemail?email=" + email);
  }
}
