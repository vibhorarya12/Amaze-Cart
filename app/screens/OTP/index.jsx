import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import OTPTextView from "react-native-otp-textinput";
import auth from '@react-native-firebase/auth';
import Spinner from "react-native-loading-spinner-overlay";

const color = ["#090979", "#433eb6", "#433eb6"];
const { width, height } = Dimensions.get("window");

const OTP = (props) => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] =useState('');
  const [otp, setOtp] = useState("");
  const [confirm, setConfirm] = useState(null);
  const phoneNumber = props.route.params.phoneNo; 
   const otpFor = props.route.params.otpFor;
  // Replace with the actual phone number
  
  // useEffect(() => {
  //   // Handle the onAuthStateChanged
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);
  
  const onAuthStateChanged = (user) => {
    if (user) {
      Alert.alert("Success", "You have successfully logged in!");
      // Navigate to another screen or hide the OTP component
    }
  };

  const signInWithPhoneNumber = async (phoneNumber) => {
    try {
      const confirmation = await auth().signInWithPhoneNumber('+91' + phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.log("Error signing in with phone number:", error);
      Alert.alert("Error", "Failed to send OTP. Please try again.");
    }
  };

  const confirmCode = async () => {
    setLoadingText('verifying OTP ');
    setLoading(true);
    try {
      await confirm.confirm(otp);
      alert('success otp')
    } catch (error) {
      console.log("Invalid code:", error);
      Alert.alert("Error", "Invalid code. Please try again.");
    }
    finally{
      setLoading(false);
    }
  };

  // Trigger the phone number sign in when component mounts
  useEffect(() => {
    // signInWithPhoneNumber(phoneNumber);
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.OtpText}> Enter 6-digit OTP sent to {phoneNumber} </Text>
      <OTPTextView
        handleTextChange={(e) => setOtp(e)}
        tintColor={"#433eb6"}
        textInputStyle={styles.roundedTextInput}
        containerStyle={styles.OtpContainer}
        inputCount={6}
      />
      <TouchableOpacity
        style={{ position: "absolute", top: height * 0.45, elevation: 5 }}
        // onPress={confirmCode}
        onPress={()=>console.log(otpFor)}
       
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={color}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Verify</Text>
        </LinearGradient>
        <Spinner
        visible={loading}
        color="#090979"
        size={50}
        textContent={loadingText}
      /> 
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
  },
  OtpContainer: { position: "absolute", top: height * 0.3 },
  roundedTextInput: {
    height: width * 0.13,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#f5f7f2",
  },
  OtpText: {
    position: "absolute",
    top: height * 0.2,
    fontSize: width * 0.045,
   
    color: "#433eb6",
    fontFamily: 'RobotoSlab_semiBold'
  },
  btn: {
    width: width * 0.53,
    height: width * 0.13,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: width * 0.045,
    color: "white",
    fontFamily: 'RobotoSlab_regular'
  },
});
export default OTP;
