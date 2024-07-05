import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { theme_color, theme_primary } from "../../constants";
import { Logo_img } from "../../../assets/Images";
import * as Animatable from 'react-native-animatable';
import {  TextInput } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";



const { width, height } = Dimensions.get('window');


const color = [ "#090979", "#433eb6",  "#433eb6"];
const Login = () => {
  const navigation = useNavigation();
 


    return (<SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={color} style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
            <Animatable.Image animation='zoomIn' duration={1500} tintColor={'white'} source={Logo_img} style={styles.logo} />
            <View style={styles.loginContainer}>
               <Text style={styles.loginText}>Login for best experience</Text>
               <Text style={styles.loginTextTwo}>Enter your phone number to continue</Text>

                <TextInput
                    mode={"outlined"}
                    label="Phone number"
                    style={styles.textInput}
                    outlineColor="#433eb6"
                    activeOutlineColor="#433eb6"
                    outlineStyle={{ borderWidth: 2 , borderRadius:10}}
                    value={"+91"}
                    
                />
                <TouchableOpacity onPress={()=>navigation.navigate('Register')}  style={{position:'absolute', top: height * 0.45,left:width*0.12}}><Text style={styles.registerText}>Don't have an account yet?  Register Now</Text></TouchableOpacity>
                
                <TouchableOpacity onPress={()=>navigation.navigate('OTP')}  style={{position:'absolute', top: height * 0.35, elevation:5}}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={color} style={styles.loginbtn}>
                        <Text style={styles.btnText}>Login</Text>
                    </LinearGradient>
                </TouchableOpacity>
                
                <View style={styles.dividercontainer}>
                <View style={styles.divider}></View>
                <Text style={{color:'#433eb6', fontSize:width*0.05,fontWeight:'450'}}>OR</Text>
                <View style={styles.divider}></View>
                
                </View>
                <TouchableOpacity style={{position:'absolute', top: height * 0.6, elevation:5}}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={color} style={styles.loginbtn}>
                        <Text style={styles.btnText}>Continue as Guest</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

        </LinearGradient>
    </SafeAreaView>)
}

const styles = StyleSheet.create({
    logo: {
        width: width * 0.3,
        height: width * 0.3,
        position: 'absolute',
        top: height * 0.065,

    },

    loginContainer: {
        width: width * 0.98,
        height: height * 0.9,
        borderWidth: 2,
        borderColor: '#EFE9E7',
        borderTopLeftRadius: width * 0.25,
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'absolute',
        top: height * 0.2,
        backgroundColor: 'white',
        borderTopRightRadius: 10


    },

    textInput: {

        width: width * 0.85,
        height: width * 0.12,
        position: 'absolute',
        top: height * 0.2,
        backgroundColor:'transparent'

    },

    loginText:{
        position:'absolute',
        fontSize:width*0.045,
        top:height*0.08,
        left:width*0.12,
        fontWeight:'700',
        color:'#433eb6'
    },
    loginTextTwo:{
        position:'absolute',
        fontSize:width*0.04,
        top:height*0.12,
        left:width*0.12,
        fontWeight:'500',
        color:'#433eb6'

    },
    loginbtn:{
        width: width * 0.53,
        height: width * 0.13,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center'
       
    },
    btnText:{
        fontSize:width*0.045,
        color:'white'
    },
    registerText:{
        fontSize:width*0.04,
        fontWeight:'500',
         color:'#433eb6'
       
    },
    divider:{
            height:2.5,
            width:width*0.35,
             backgroundColor:'#433eb6',
             opacity:0.8
            
    },
    dividercontainer:{
        
        width:width*0.8,
        height:width*0.15,
        position:'absolute',
        top: height * 0.5,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:5

    },
    
})


export default Login;
