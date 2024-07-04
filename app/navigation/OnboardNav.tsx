import { createStackNavigator } from '@react-navigation/stack';
import { Intro, Login } from '../screens';
const Stack = createStackNavigator();

const Onboardnav = ()=>{
  return(
    <Stack.Navigator>
        <Stack.Screen  name="Intro" component={Intro}  options={{headerShown:false}}/>
        <Stack.Screen  name="Login" component={Login} options={{headerShown:false}}/>
    </Stack.Navigator>)
}

export default Onboardnav;