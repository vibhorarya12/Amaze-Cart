
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native"
import { theme_color, theme_primary } from "../../constants";
import { Logo_img } from "../../../assets/Images";
import * as Animatable from 'react-native-animatable';
import { TextInput } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";



const { width, height } = Dimensions.get('window');


const color = ["#090979", "#433eb6", "#433eb6"];



const Register = () => {

    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [nameError, setnameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);



    const showToast = (msg: string) => {
        ToastAndroid.show(msg, ToastAndroid.LONG);

    }


    const handleRegister = () => {
        let valid = true;

        // Reset error states
        setnameError(false);
        setEmailError(false);
        setPhoneError(false);

        // Validate name
        if (name.length === 0) {
            setnameError(true);
            showToast('Name cannot be left blank');
            valid = false;
            return;
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setEmailError(true);
            showToast('Please enter a valid email');
            valid = false;
            return;
        }

        // Validate phone
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(phone)) {
            setPhoneError(true);
            showToast('Please enter a valid phone number');
            valid = false;
            return;
        }

        if (valid) {
            navigation.navigate('OTP');
        }
    }



    return (<SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={color} style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
            <Animatable.Image animation='zoomIn' duration={1500} tintColor={'white'} source={Logo_img} style={styles.logo} />
            <View style={styles.loginContainer}>
                <Text style={styles.headerText}>Create an account</Text>
                <Text style={styles.headerTextTwo}>Please enter your details</Text>
                <TextInput
                    mode={"outlined"}
                    label="Full name"
                    style={[styles.textInput, { top: height * 0.14 }]}
                    outlineColor="#433eb6"
                    activeOutlineColor="#433eb6"
                    outlineStyle={{ borderWidth: 2, borderRadius: 10 }}
                    right={<TextInput.Icon icon="account" color={'#433eb6'} />}
                    onChangeText={(e) => setName(e)}
                    error={nameError}

                />
                <TextInput
                    mode={"outlined"}
                    label="email"
                    style={[styles.textInput, { top: height * 0.24 }]}
                    outlineColor="#433eb6"
                    activeOutlineColor="#433eb6"
                    outlineStyle={{ borderWidth: 2, borderRadius: 10 }}
                    right={<TextInput.Icon icon="email" color={'#433eb6'} />}
                    onChangeText={(e) => setEmail(e)}
                    error={emailError}
                    keyboardType={"email-address"}

                />
                <TextInput
                    mode={"outlined"}
                    label="Phone number"
                    style={[styles.textInput, { top: height * 0.34 }]}
                    outlineColor="#433eb6"
                    activeOutlineColor="#433eb6"
                    outlineStyle={{ borderWidth: 2, borderRadius: 10 }}
                    right={<TextInput.Icon icon="phone" color={'#433eb6'} />}
                    left={<TextInput.Affix text="+91" />}
                    onChangeText={(e) => setPhone(e)}
                    error={phoneError}
                    keyboardType={"numeric"}
                />
                <Text style={[styles.registerText, { position: 'absolute', top: height * 0.45, left: width * 0.12, right: width * 0.12 }]}>A 6-digit OTP will be sent to your phone number for verification</Text>
                <TouchableOpacity onPress={() => handleRegister()} style={{ position: 'absolute', top: height * 0.52, elevation: 5 }}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={color} style={styles.loginbtn}>
                        <Text style={styles.btnText}>Register</Text>
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

        backgroundColor: 'transparent'

    },

    headerText: {
        position: 'absolute',
        fontSize: width * 0.055,
        top: height * 0.05,
        left: width * 0.12,
       fontFamily:'RobotoSlab_semiBold',
        color: '#433eb6'
    },
    headerTextTwo: {
        position: 'absolute',
        fontSize: width * 0.04,
        top: height * 0.09,
        left: width * 0.12,
        fontFamily:'RobotoSlab_semiBold',
        color: '#433eb6'

    },
    loginbtn: {
        width: width * 0.53,
        height: width * 0.13,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'

    },
    btnText: {
        fontSize: width * 0.045,
        color: 'white',
        fontFamily:'RobotoSlab_regular',
    },
    registerText: {
        fontSize: width * 0.04,
        fontFamily:'RobotoSlab_semiBold',
        color: '#433eb6'

    },
    divider: {
        height: 2.5,
        width: width * 0.35,
        backgroundColor: '#433eb6',
        opacity: 0.8

    },
    dividercontainer: {

        width: width * 0.8,
        height: width * 0.15,
        position: 'absolute',
        top: height * 0.5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5

    },

})
export default Register;