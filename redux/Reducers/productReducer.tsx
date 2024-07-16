import { ADD_TO_CART , REMOVE_FROM_CART} from "../ActionTypes/productTypes";

const intialState : any = {
  cartItems : []

}
export const productReducer = (state = intialState, action : any)=>{
        switch (action.type){
            case ADD_TO_CART:
                return {
                    ...state,
                    cartItems : [...state.cartItems,action.data ]
                };
                case REMOVE_FROM_CART:
                    return {
                      ...state,
                      cartItems: state.cartItems.filter(item => item._id !== action.data._id)
                    };
            default : 
                return state
           
        }
}