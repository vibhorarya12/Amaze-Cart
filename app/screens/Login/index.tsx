import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from "react-native"
import { theme_color, theme_primary } from "../../constants";
import { Logo_img } from "../../../assets/Images";
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('screen');


const color = ["#433eb6","#090979"];
const Login = () => {



    return (<SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
        <LinearGradient colors={color} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Animatable.Image animation='zoomIn'  duration={1500} tintColor={'white'} source={Logo_img} style={styles.logo} />
            <View style={styles.loginContainer}>

            </View>

        </LinearGradient>
    </SafeAreaView>)
}

const styles = StyleSheet.create({
    logo: {
        width: width * 0.5,
        height: width * 0.5,
    

    },

    loginContainer: {
        width: width * 0.9,
        height: width,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 20,
       
        
        
    }
})


export default Login;
