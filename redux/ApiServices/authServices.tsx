import axios from "axios";
import { URL } from "../../app/constants";


export const handleLogin = async ({ phone }) => {
    try {
      const response = await axios.post(`${URL}/user/loginUser`, { phone });
      return response.data;
    } catch (error) {
      return { error: true, message: error.message };
    }
  };

 export const handleRegister = async (userInfo) => {

  try {
    const response = await axios.post(`${URL}/user/registerUser`,userInfo );
    return response.data;
  } catch (error) {
    return { error: true, message: error.message };
  }

 }
 