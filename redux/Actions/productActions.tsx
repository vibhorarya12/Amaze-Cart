import { ProductTypes } from "../ActionTypes";






function addToCart (item : any) {
    console.log("item added ");
    return {
        type :ProductTypes.ADD_TO_CART,
        data : item,
    }
}

function removeFromCart (item : any){
    console.log("item removed ");
     return {
        type : ProductTypes.REMOVE_FROM_CART,
        data :item
     }
}


export {addToCart , removeFromCart} ;