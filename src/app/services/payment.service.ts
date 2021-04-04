import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { newPayment } from '../models/newPayment';
import { Payment } from '../models/payment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient:HttpClient) { }

  addPayment(payment:Payment):Observable<ResponseModel>{
    let newPath = environment.apiUrl+"payments/add";
    return this.httpClient.post<ResponseModel>(newPath,payment);
  }

  addNewPayment(payment:newPayment):Observable<newPayment> {
    return this.httpClient.post<newPayment>(environment.apiUrl + "newpayments/add", payment)
  }
}
