import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomerUser } from 'src/app/models/customerUser';
import { UserInfos } from 'src/app/models/user-infos';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  userDetails:UserInfos = new UserInfos();
  customerUser:CustomerUser = new CustomerUser();
  dataLoaded:Boolean = false;

  constructor(private authService:AuthService,
              private userService:UserService,
              private customerService:CustomerService,
              private localStorage:LocalStorageService,
              private toastrService:ToastrService) { }

  ngOnInit(): void {
    let email = this.localStorage.get("email");
    console.log("email: " + email)
    if(this.isLoggedIn()){
      console.log(email)
      this.getUser(email == null ? email = "a" : email.toString());
      this.getCustomerId(email == null ? email = "a" : email.toString());
    }
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout()
    window.location.reload();
  }

  getUser(email:string) {
    this.userService.getUserByEmail(email).subscribe(response => {
      this.userDetails = response.data;
      this.dataLoaded = true;
    },responseError => {
      console.log(responseError)
      this.toastrService.error(responseError.error)
    })
  }

  getCustomerId(email:string){
      console.log("getCustomerId email: " + email)
      this.customerService.getCustomersByEmail(email == null ? email="a" : email).subscribe(
        response => {
          console.log("getCustomerId customerUser: " + response.data.customerId)
          console.log("getCustomerId companyName: " + response.data.companyName)
          this.customerUser = response.data;
          this.localStorage.set("customerId", this.customerUser.customerId)
        },
        responseError => { 
          console.log("You are not customer yet.") 
          console.log(responseError)
          this.toastrService.error(responseError.error)
        }
      )
  }

}
