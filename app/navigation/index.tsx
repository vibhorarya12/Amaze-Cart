
import { NavigationContainer } from "@react-navigation/native";
import Onboardnav from "./OnboardNav";
import { getItem } from "../Utils/utils";
import Homenav from "./HomeNav";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const Navigation = () => {
    const token : string = useSelector((state:any)=> state.auth.token);
   
    useEffect(() => {

       console.log('token is <<<<', token)
    }, [token])

    

    return (
            <NavigationContainer>
        {token.length === 0 ?<Onboardnav />:<Homenav /> }
        </NavigationContainer>
    
    
    )
}

export default Navigation;