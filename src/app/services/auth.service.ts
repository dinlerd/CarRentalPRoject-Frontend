import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ItemResponseModel } from '../models/itemResponseModel';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { TokenModel } from '../models/tokenModel';
import { UserPasswordChangeModel } from '../models/userPasswordChangeModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient,private localStorage:LocalStorageService) { }

  register(registerModel:RegisterModel) {
    return this.httpClient.post<ItemResponseModel<TokenModel>>(environment.apiUrl + "auth/register", registerModel)
  }

  login(loginModel:LoginModel){
   return this.httpClient.post<ItemResponseModel<TokenModel>>(environment.apiUrl+"auth/login",loginModel)
  }

  logout() {
    // this.localStorage.remove("token")
    // this.localStorage.remove("email")
    // this.localStorage.remove("customerId")
    this.localStorage.clear();
    return true;
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }

   updateUserPassword(userPasswordChangingModel:UserPasswordChangeModel) {
   return this.httpClient.post<ResponseModel>(environment.apiUrl + "auth/changepassword", userPasswordChangingModel)
   }
}
