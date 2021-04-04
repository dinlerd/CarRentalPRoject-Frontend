import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/credit-card';
import { newPayment } from 'src/app/models/newPayment';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-credit-card-list',
  templateUrl: './credit-card-list.component.html',
  styleUrls: ['./credit-card-list.component.css']
})
export class CreditCardListComponent implements OnInit {

  creditCards:CreditCard[] = [];
  rentalId:number;
  dateNow:Date;

  constructor(private creditCardService:CreditCardService,
              private paymentService:PaymentService,
              private activatedRoute:ActivatedRoute,
              private toastrService:ToastrService,
              private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["customerId"]){
        this.getCreditCardsByCustomerId(params["customerId"]);
        console.log("getCreditCard: " + this.creditCards[0]);
      }
      if(params["rentalId"]){
        this.rentalId = params["rentalId"];
        console.log("rentalId: " + this.rentalId)
      }
    });
  }

  getCreditCardsByCustomerId(customerId:number) {
    this.creditCardService.getCreditCardsByCustomerId(customerId).subscribe((response) => {
      this.creditCards = response.data;
    })
  }

  deleteCreditCard(creditCard:CreditCard) {
    this.creditCardService.deleteCreditCard(creditCard).subscribe((response) => {
      this.toastrService.error("The credit card is deleted.");
      setTimeout(() => { window.location.reload(); }, 1500);
    })
  }

  paymentWithThisCreditCard(creditCard:CreditCard) {
    let payment:newPayment = new newPayment();
    payment.rentalId = Number(this.rentalId);
    payment.cardNo = creditCard.cardNo;
    payment.nameSurname = creditCard.nameSurname;
    payment.expirationDate = creditCard.expirationDate;
    payment.cvc = creditCard.cvc;
    this.dateNow = new Date();
    payment.paymentDate = this.datePipe.transform(this.dateNow, 'dd-MM-yyyy');
    this.paymentService.addNewPayment(payment).subscribe(
      res => { this.toastrService.success("Payment is successful."); },
      err => { console.log(err.error); this.toastrService.error(err.error); }
    )
  }
}
