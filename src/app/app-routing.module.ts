import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandOperationsComponent } from './components/brand-operations/brand-operations.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarOperationsComponent } from './components/car-operations/car-operations.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { CarImageAddComponent } from './components/car/car-image-add/car-image-add.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorOperationsComponent } from './components/color-operations/color-operations.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { LoginComponent } from './components/login/login.component';
import { NewPaymentComponent } from './components/new-payment/new-payment.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserPassUpdateComponent } from './components/user-pass-update/user-pass-update.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:carBrandId", component:CarComponent},
  {path:"cars/color/:carColorId", component:CarComponent},
  {path: "car/details/:carId", component: CarDetailComponent },
  {path:"cars/filter/:carBrandId/:carColorId",component:CarComponent},
  {path: "car/rentals/:carId", component: RentalComponent },
  {path: "car/operations", component: CarOperationsComponent },
  {path: "car/add", component: CarAddComponent, canActivate:[LoginGuard] },
  {path: "car/update/:carId", component: CarUpdateComponent },
  {path: "brand/update/:carBrandId", component: BrandUpdateComponent },
  {path: "brand/operations", component: BrandOperationsComponent },
  {path: "brand/add", component: BrandAddComponent },
  {path: "color/operations", component: ColorOperationsComponent },
  {path: "color/add", component: ColorAddComponent },
  {path: "color/update/:carColorId", component: ColorUpdateComponent },
  {path: "car/addCarImage", component: CarImageAddComponent },
  {path: "rental/payment/:carId", component: PaymentComponent },
  {path: "rental/newPayment/:carId/:rentPrice", component: NewPaymentComponent, canActivate: [LoginGuard]},
  {path: "newpayment/:rentalId/:rentPrice/:customerId", component: NewPaymentComponent, canActivate: [LoginGuard]},
  {path: "login", component: LoginComponent },
  {path: "register", component:RegisterComponent},
  {path: "updateuser", component:UserUpdateComponent, canActivate: [LoginGuard]},
  {path: "updatepassword", component:UserPassUpdateComponent, canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
