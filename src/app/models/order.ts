import { CartModel } from './Cart_Model';

export class Order{
    datePlaced:number;
    items:any[];
    constructor(
        public userId:String, 
        public shipping: any, 
        shoppingCart:CartModel

    ){
        this.datePlaced = new Date().getTime();
       this.items= shoppingCart.it.map(i=>{
            return {  product:{
                    title:i.product.title,
                    imageUrl:i.product.imageUrl,
                    price:i.product.price
            }, 
            quanity: i.quantity,
            totalPrice: i.totalPrice
          
          }
        })
    }

}