import { ProductTypes } from "../ActionTypes";



const intialState: any = {
  cartItems: []

}
export const productReducer = (state = intialState, action: any) => {
  switch (action.type) {
    case ProductTypes.ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.data]
      };
    case ProductTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item._id !== action.data._id)
      };
    default:
      return state

  }
}