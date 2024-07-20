import { ProductTypes } from "../ActionTypes";

const initialState = {
  wishList: [],
  cartItems: [],
  responseMsg: '',
  loading: false,

};

export const productReducer = (state = initialState, action: any) => {
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

    case ProductTypes.ADD_TO_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ProductTypes.ADD_TO_WISHLIST_SUCCESS:
      console.log('wishlist items are <<<<<', state.wishList);
      return {
        ...state,
        loading: false,
        wishList: [...state.wishList, action.data.product],
        responseMsg: action.data.message,
      };
    case ProductTypes.ADD_TO_WISHLIST_ERROR:
      console.log('error <<<<<', state.responseMsg);
      return {
        ...state,
        loading: false,
        responseMsg: action.error,
      };

    case ProductTypes.REMOVE_FROM_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ProductTypes.REMOVE_FROM_WISHLIST_SUCCESS:
      console.log('<<productID is  <<', action.data.productId);
      return {
        ...state,
        loading: false,
        wishList: state.wishList.filter(item => item._id !== action.data.productId),
        responseMsg: action.data.message,

      };

    case ProductTypes.REMOVE_FROM_WISHLIST_ERROR:
      console.log('error<<');
      return {
        ...state,
        loading: false,
        responseMsg: action.error,
      };

    default:
      return state;
  }
};