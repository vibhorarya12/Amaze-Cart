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


const addToWishlist = (productId: string, token: string) => {
    // console.log('tokenn from here is <<<<<', token)
   return{ 
    type: ProductTypes.ADD_TO_WISHLIST_REQUEST,
    payload: { productId, token },
   }
};


const removeFromWishList = (productId: string, token: string) =>{
    return {
        type : ProductTypes.REMOVE_FROM_WISHLIST_REQUEST,
        payload: { productId, token }
    }
}


const getWishListProducts = (token : string) =>{

    return{
        type :ProductTypes.GET_WISHLIST_PRODUCTS_REQUEST,
        payload : {token}
    }
}


const clearWishList = ()=>{

     return {
        type : ProductTypes.CLEAR_WISHLIST,
     }
}

export {addToCart , removeFromCart , addToWishlist , removeFromWishList , clearWishList , getWishListProducts} ;