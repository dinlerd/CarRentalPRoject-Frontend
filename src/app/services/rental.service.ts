import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';
import { environment } from 'src/environments/environment';
import { RentalToAdd } from '../models/rentalToAdd';
import { ItemResponseModel } from '../models/itemResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  //apiUrl="https://localhost:44316/api/rentals/getrentaldetails";
  
  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath = environment.apiUrl + "rentals/getrentaldetails"
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  addRental(rental:RentalToAdd):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "rentals/add"
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }

  getRentalsByCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath = environment.apiUrl + "rentals/getallbycarid?carid=" + carId
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalDetailsByCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath = environment.apiUrl + "rentals/getrentaldetailsbycarid?carid=" + carId
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRental(rentalId:Number):Observable<ItemResponseModel<RentalToAdd>> {
    return this.httpClient.get<ItemResponseModel<RentalToAdd>>(environment.apiUrl + "rentals/getbyid?rentalId=" + rentalId);
  }

  getIdByRentalInfos(carId:number, customerId:number, rentDate:Date, returnDate:Date):Observable<ItemResponseModel<RentalToAdd>> {
    return this.httpClient.get<ItemResponseModel<RentalToAdd>>(environment.apiUrl + "rentals/getidbyrentalinfos?carId=" + carId
                                                                                         + "&customerId=" + customerId
                                                                                         + "&rentDate=" + rentDate
                                                                                         + "&returnDate=" + returnDate);
  }

}
