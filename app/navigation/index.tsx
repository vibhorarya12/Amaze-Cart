
import { NavigationContainer } from "@react-navigation/native";
import Onboardnav from "./OnboardNav";
import { getItem } from "../Utils/utils";
import Homenav from "./HomeNav";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const Navigation = () => {
    const token : string = useSelector((state:any)=> state.auth.token);
    const guestLogin : boolean = useSelector((state:any)=> state.auth.guestLogin);
   
    useEffect(() => {

       console.log('token from navigation check <<<<', token)
    }, [guestLogin, token])

    

    return (
        //     <NavigationContainer>
        // {token.length === 0 ?<Onboardnav />:<Homenav /> }
        // </NavigationContainer>
         
            <NavigationContainer>
         {guestLogin === true || token.length > 1 ? <Homenav /> : <Onboardnav />}
        </NavigationContainer>
    
    
    )
}

export default Navigation;