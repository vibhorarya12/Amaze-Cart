import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { Login , Register ,OTP} from '../screens';

const Stack = createStackNavigator();
const AuthNav = () => {

    return (
        
            <Stack.Navigator initialRouteName='Login' >
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="OTP" component={OTP} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            </Stack.Navigator>
      
    )


}

export default AuthNav;