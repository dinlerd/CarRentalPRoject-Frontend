import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private customerService:CustomerService,
    private userService:UserService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
    console.log(this.loginForm.value);
    let loginModel = Object.assign({}, this.loginForm.value);

    this.authService.login(loginModel).subscribe((response) => {
      this.toastrService.info(response.message)
      this.toastrService.success("Login successful")
      console.log("Login Response: " +response.data);
      localStorage.setItem("token",response.data.token)

      // this.userService.getUserByEmail(loginModel.email).subscribe(userResponse=>{
      //   this.localStorageService.sendObjectToLocalStroge("user",userResponse.data)
      //   console.log("Object at Local storage: " +userResponse.data.firstName);
      // },responseError=>{
      //   console.log(responseError)
      //   this.toastrService.error(responseError.error)
      // })

      this.localStorageService.set("email", this.loginForm.get("email")?.value);

          // setTimeout(() => { this.router.navigate(['/cars']) }, 1000);
          timer(3000).subscribe(p=>{
            window.location.href='';
          });
          //window.location.reload();
    },responseError=>{
      console.log(responseError)
      this.toastrService.error(responseError.error)
    });
  }else{
    this.toastrService.error("Form is missing","Attention")
  }
  }
}
