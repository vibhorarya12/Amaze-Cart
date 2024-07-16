import { ADD_TO_CART , REMOVE_FROM_CART} from "../ActionTypes/productTypes";




function addToCart (item : any) {
    console.log("item added ");
    return {
        type :ADD_TO_CART,
        data : item,
    }
}

function removeFromCart (item : any){
    console.log("item removed ");
     return {
        type :REMOVE_FROM_CART,
        data :item
     }
}


export {addToCart , removeFromCart} ;