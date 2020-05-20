import { Products_Model } from 'src/app/models/product-model';
import { cartItem_Model } from './cartItem-Model';

export class CartModel{

    dateCreated?:string;

    it:cartItem_Model[]=[]; // containing only id of product with product
    // constructor(public items:cartItem_Model[]){

    // }

    constructor(public items:{[productId:string]:cartItem_Model }){
            for(let prod in items ){
                let ite = items[prod];
                this.it.push(new cartItem_Model(ite.product,ite.quantity));
            }
    }

    getQuantity(product:Products_Model){
        if(!this.items) return 0;
            let item = this.items[product.key];
        return item ? item.quantity:0;
      }


    get productIDs(){
        return Object.keys(this.items);
    }
    get totalItemsCount(){
        if(!this.items) return 0;
        let cartItemNumber=0;
        for(let productId in this.items)
        cartItemNumber+=this.items[productId].quantity;
        return cartItemNumber;
    } 

    get totalAmount(){
        let amount=0;
        for(let productId in this.it)
        amount+=this.it[productId].totalPrice;
        return amount;
    }

}