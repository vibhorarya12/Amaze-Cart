import axios from "axios";
import { URL } from "../../app/constants";



export const addTowishlist = async ({token, productId})=>{

    try {
        const response = await axios.post(`${URL}/products/addToWhishlist`, { token , productId });
        return response.data;
      } catch (error:any) {
        // console.log( 'api resonse<<<<<<<' ,error.response.data);
        return { error: true, message: error.message };
      }

}
export const removeFromWishlist = async ({token, productId})=>{

    try {
        const response = await axios.post(`${URL}/products/removeFromWishlist`, { token , productId });
         console.log( 'api resonse<<<<<<<' ,response.data);
        return response.data;
      } catch (error:any) {
        // console.log( 'api resonse<<<<<<<' ,error.response.data);
        return { error: true, message: error.message };
      }

}



