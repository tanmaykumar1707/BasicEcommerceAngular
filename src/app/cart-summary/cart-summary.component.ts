import { CartModel } from './../models/Cart_Model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  @Input('cart') cart:CartModel;
  constructor() { }
 
  ngOnInit(): void {
  }

}
