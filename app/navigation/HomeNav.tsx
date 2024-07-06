
import { Home } from "../screens";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


const Homenav = ()=>{

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
        </Stack.Navigator>
        
    )
}

export default Homenav;