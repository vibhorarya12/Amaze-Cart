import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ToastAndroid,
} from "react-native";
import OTPTextView from "react-native-otp-textinput";
import auth from "@react-native-firebase/auth";
import Spinner from "react-native-loading-spinner-overlay";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../../redux/Actions/authActions";
import { CommonActions, useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const GRADIENT_COLORS = ["#090979", "#433eb6", "#433eb6"];

const OTP = ({ route }) => {
  const { token, guestLogin } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [otp, setOtp] = useState("");
  const [confirm, setConfirm] = useState(null);

  const { phoneNo: phoneNumber, otpFor, userInfo } = route.params;

  const showToast = (msg) => ToastAndroid.show(msg, ToastAndroid.LONG);

  const handleOtpFor = async () => {
    const action = otpFor === "login" ? login({ phone: phoneNumber }) : register(userInfo);
    setLoadingText(otpFor === "login" ? "Logging in..." : "Registering...");
    await  dispatch(action);
    showToast(`${otpFor === "login" ? "Logged in" : "Registered"} successfully!`);
  };

  const signInWithPhoneNumber = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(`+91${phoneNumber}`);
      setConfirm(confirmation);
    } catch (error) {
      console.error("Error signing in with phone number:", error);
      Alert.alert("Error", "Failed to send OTP. Please try again.");
    }
  };

  const confirmCode = async () => {
    setLoadingText("Verifying OTP...");
    setLoading(true);
    try {
      await confirm.confirm(otp);
      handleOtpFor();
    } catch (error) {
      console.error("Invalid code:", error);
      Alert.alert("Error", "Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    signInWithPhoneNumber();
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      
      if (guestLogin) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Home" }],
          })
        );
      }
    }
  }, [token]);

  return (
    <View style={styles.container}>
      <Text style={styles.otpText}>Enter 6-digit OTP sent to {phoneNumber}</Text>
      <OTPTextView
        handleTextChange={setOtp}
        tintColor="#433eb6"
        textInputStyle={styles.roundedTextInput}
        containerStyle={styles.otpContainer}
        inputCount={6}
      />
      <TouchableOpacity style={styles.verifyButtonContainer} onPress={confirmCode}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={GRADIENT_COLORS}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Verify</Text>
        </LinearGradient>
      </TouchableOpacity>
      <Spinner
        visible={loading}
        color="#090979"
        size={50}
        textContent={loadingText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  otpContainer: {
    position: "absolute",
    top: height * 0.3,
  },
  roundedTextInput: {
    height: width * 0.13,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#f5f7f2",
  },
  otpText: {
    position: "absolute",
    top: height * 0.2,
    fontSize: width * 0.045,
    color: "#433eb6",
    fontFamily: "RobotoSlab_semiBold",
  },
  verifyButtonContainer: {
    position: "absolute",
    top: height * 0.45,
    elevation: 5,
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
    fontFamily: "RobotoSlab_regular",
  },
});

export default OTP;