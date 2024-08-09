
import { NavigationContainer } from "@react-navigation/native";
import Onboardnav from "./OnboardNav";
import { getItem } from "../Utils/utils";
import Homenav from "./HomeNav";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const Navigation = () => {
    const token : string = useSelector((state:any)=> state.auth.token);
    const guestLogin : boolean = useSelector((state:any)=> state.auth.guestLogin);
   
    useEffect(() => {

    //    console.log('token from navigation check <<<<')
    }, [guestLogin, token])

    

    return (
        //     <NavigationContainer>
        // {token.length === 0 ?<Onboardnav />:<Homenav /> }
        // </NavigationContainer>
         
            <NavigationContainer>
                <BottomSheetModalProvider>
         {guestLogin === true || token.length > 1 ? <Homenav /> : <Onboardnav />}
         </BottomSheetModalProvider>
        </NavigationContainer>
    
    
    )
}

export default Navigation;