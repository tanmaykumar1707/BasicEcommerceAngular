import { Products_Model } from 'src/app/models/product-model';

export class cartItem_Model{
        // product?:Products_Model;
        // quantity?:number;

        constructor(public product:Products_Model,
                        public  quantity:number){

        }

        get totalPrice(){
                return this.product.price * this.quantity ;
        }
}