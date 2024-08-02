import React from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import LottieView from "lottie-react-native";
const { width, height } = Dimensions.get('window');

const ConfirmOrder = () => {
    
    return (
        <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingTop: height * 0.15 }}>
            <View style={styles.summaryConatiner}>
              <LottieView   source={require("../../../assets/Animations/success.json")}
                  
                  loop = {false}
                  autoPlay = {true}
                  style={{ width: width*0.6, height:height*0.3}}/>
                  <Text  style={styles.headerText}>Order Confirmed</Text>
            </View>


        </ScrollView>
    );
}

const styles = StyleSheet.create({
    summaryConatiner: {
        width: width * 0.9,
        height: height*0.7,
        borderColor: 'black',
       
        backgroundColor: '#E7E5DF',
        borderRadius:20,
        alignItems:'center'
    },
    headerText:{
        fontSize:width*0.065,
        fontFamily: 'RobotoSlab_regular'
    }

})


export default ConfirmOrder;
