
import { NavigationContainer } from "@react-navigation/native";
import Onboardnav from "./OnboardNav";
import { getItem } from "../Utils/utils";
import Homenav from "./HomeNav";
import { useEffect, useState } from "react";


const Navigation = () => {

    const [showOnboarding, setShowOnboarding] = useState(null);
    useEffect(() => {

        AlreadyBoarded();
    }, [])

    const AlreadyBoarded = async () => {
        let onBoarded = await getItem("onboarded");

        if (onBoarded == 1) {
            setShowOnboarding(false);
        }
        else {
            setShowOnboarding(true);
        }
    }


    return (<NavigationContainer>
        {showOnboarding ? <Onboardnav /> : <Homenav />}
    </NavigationContainer>)
}

export default Navigation;