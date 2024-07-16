import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { authReducer } from "./authreducer";

 const  rootReducer = combineReducers({
  products : productReducer,
  auth : authReducer,
})

export default rootReducer;