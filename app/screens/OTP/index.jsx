import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import OTPTextView from "react-native-otp-textinput";
const color = ["#090979", "#433eb6", "#433eb6"];
const { width, height } = Dimensions.get("window");
const OTP = () => {
  const [otp, setOtp] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.OtpText}> Enter 6-digit OTP sent to 9675444410 </Text>
      <OTPTextView
        handleTextChange={(e) => setOtp(e)}
        tintColor={"#433eb6"}
        textInputStyle={styles.roundedTextInput}
        containerStyle={styles.OtpContainer}
        inputCount={6}
      />
      <TouchableOpacity
        style={{ position: "absolute", top: height * 0.45, elevation: 5 }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={color}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Verify</Text>
        </LinearGradient>
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
