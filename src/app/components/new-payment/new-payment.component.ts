import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/credit-card';
import { newPayment } from 'src/app/models/newPayment';
import { Rental } from 'src/app/models/rental';
import { RentalToAdd } from 'src/app/models/rentalToAdd';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements OnInit {


  title = "Payment Screen"
  rental:Rental;
  paymentModel:newPayment = new newPayment();
  totalPrice:any;
  rentalToAdded:RentalToAdd;
  dateNow:Date;

  constructor(private paymentService:PaymentService,
              private creditCardService:CreditCardService,
              private rentalService:RentalService,
              private localStorage:LocalStorageService,
              private toastrService:ToastrService,
              private activatedRoute:ActivatedRoute,    
              private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["rentalId"] && params["rentPrice"]){ 
        this.totalPrice = params["rentPrice"];
        console.log("Total Price: " + this.totalPrice)
        this.getRentalDetails(params["rentalId"]);
      }
    });
  }

  getRentalDetails(rentalId:Number) {
    this.rentalService.getRental(rentalId).subscribe(response => {
      this.rentalToAdded = response.data;
    })
  }

  addPayment(form:NgForm) {
    this.paymentModel.rentalId = this.rentalToAdded.id;
    this.dateNow = new Date();
    this.paymentModel.paymentDate = this.datePipe.transform(this.dateNow, 'dd-MM-yyyy');

    if(this.paymentModel.saveCard == true) {

      let creditCard:CreditCard = new CreditCard();
      creditCard.customerId = this.localStorage.get("customerId") == null ? 0 : Number(this.localStorage.get("customerId"));
      creditCard.nameSurname = this.paymentModel.nameSurname;
      creditCard.cardNo = this.paymentModel.cardNo;
      creditCard.expirationDate = this.paymentModel.expirationDate;
      creditCard.cvc = this.paymentModel.cvc;
      this.creditCardService.addCreditCard(creditCard).subscribe(
        res => { this.toastrService.success("Credit card is saved."); },
        err => { this.toastrService.info("Credit card already exists"); }
      )

    }

    this.paymentService.addNewPayment(this.paymentModel).subscribe(
      res => { 
        console.log("paymentDate: " + this.paymentModel.paymentDate)
        this.toastrService.success("Payment is successful."); 
      },
      err => { this.toastrService.error("Payment error."); }
    )
  }

}
