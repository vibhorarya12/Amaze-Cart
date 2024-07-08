import { LinearGradient } from "expo-linear-gradient";

import {
  Dimensions,
  StyleSheet,
  StatusBar,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { Logo_img } from "../../assets/Images";

import Icon from "react-native-vector-icons/AntDesign";
import { Badge } from "react-native-paper";
import * as Animatable from 'react-native-animatable';
const { width, height } = Dimensions.get("window");
const statusBarheight = StatusBar.currentHeight;

const color = ["#090979", "#433eb6", "#433eb6"];
const Header = () => {
  return (
    <LinearGradient
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={color}
    >
      <Animatable.View  animation={'slideInLeft'} View style={styles.inputContainer}>
        <Icon name="search1" size={width * 0.05} color={"#433eb6"} />
        <TextInput placeholder="search AmazeCart" style={styles.textInput} />
      </Animatable.View>

      <TouchableOpacity
        style={{ position: "absolute", left: width * 0.85, bottom:height*0.02 }}
      >
        <Icon name="shoppingcart" size={width * 0.08} color={"white"} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height*0.14,
    position: "absolute",
    top: 0,
    zIndex: 1000,
    display: "flex",
    flexDirection: "row",
   
    alignItems: "flex-end",
    
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.75,
    height: width * 0.12,
    position: "absolute",
    bottom:height*0.01,
    borderRadius: 10,
    backgroundColor: "white",
    paddingHorizontal: 10,
    gap: 5,
    left: width * 0.07,
    
  },
  textInput: {
    width: width * 0.64,
    height: width * 0.11,
    borderColor: "black",
   
  },
});
export default Header;