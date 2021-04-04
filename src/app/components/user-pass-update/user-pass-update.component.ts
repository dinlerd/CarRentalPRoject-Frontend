import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserInfos } from 'src/app/models/user-infos';
import { UserPasswordChangeModel } from 'src/app/models/userPasswordChangeModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-pass-update',
  templateUrl: './user-pass-update.component.html',
  styleUrls: ['./user-pass-update.component.css']
})
export class UserPassUpdateComponent implements OnInit {

  user:UserInfos;
  userPasswordChangingModel:UserPasswordChangeModel;
  userPasswordUpdateForm:FormGroup;

  constructor(private authService:AuthService,
              private userService:UserService,
              private toastrService:ToastrService,
              private localStorage:LocalStorageService,
              private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    let email = this.localStorage.get("email");
    this.getUserByEmail(email == undefined ? email = "" : email.toString());
    this.createUserPasswordUpdateForm();
  }

  getUserByEmail(email:string) {
    this.userService.getUserByEmail(email).subscribe(response => {
      this.user = response.data;
    })
  }

  createUserPasswordUpdateForm(){
    this.userPasswordUpdateForm=this.formBuilder.group({
      id:["",Validators.required],
      currentPassword:["",Validators.required],
      newPassword:["",Validators.required],
    })
  }

  updateUserPassword(){
    this.userPasswordUpdateForm.patchValue({ id: this.user.id })
    if(this.userPasswordUpdateForm.valid){
      let userPasswordModel = Object.assign({},this.userPasswordUpdateForm.value);
      this.authService.updateUserPassword(userPasswordModel).subscribe(
        response => {
        this.toastrService.success(response.message,"Successful")
        setTimeout(() => { window.location.reload(); }, 1000);
        },
        responseError => {
          this.toastrService.error(responseError.error.message,"Validation Error")
      })
    }
    else {
      this.toastrService.error("The form is missing.","Attention!")
    }
  }

}
