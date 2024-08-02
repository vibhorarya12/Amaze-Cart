import React, { useCallback, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity, BackHandler } from 'react-native';
import LottieView from "lottie-react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
const color = ["#090979", "#433eb6", "#433eb6"];


const ConfirmOrder = ({ navigation, route }) => {

    const { orderData } = route.params;
    console.log(' <<<', orderData.paymentData);
    // prevent screen from going back to previous screen
    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {

                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );
    return (
        <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingTop: height * 0.15 }}>
            <View style={styles.summaryConatiner}>
                <LottieView source={require("../../../assets/Animations/success.json")}

                    loop={false}
                    autoPlay={true}
                    style={{ width: width * 0.6, height: height * 0.3 }} />
                <Text style={styles.headerText}>Order Confirmed</Text>
                <View style={{ gap: height * 0.01, marginTop: height * 0.02 }}>
                    <View style={{ width: width * 0.8, borderColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >OrderId</Text>
                        <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_regular' }} >{orderData._id}</Text>

                    </View>
                    <View style={{ width: width * 0.8, borderColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >Name</Text>
                        <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_regular' }} >{orderData.name}</Text>
                    </View>
                    <View style={{ width: width * 0.8, borderColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >email</Text>
                        <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_regular' }} >{orderData.email}</Text>
                    </View>
                    <View style={{ width: width * 0.8, borderColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >Phone</Text>
                        <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_regular' }} >{orderData.phone}</Text>
                    </View>
                    <View style={{ width: width * 0.8, borderColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >Payment mode</Text>
                        <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_regular' }} >{orderData.paymentMode}</Text>
                    </View>
                    {orderData.paymentData.paymentId != '' ? <View style={{ width: width * 0.8, borderColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >Payment ID</Text>
                        <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_regular' }} >{orderData.paymentData.paymentId}</Text>
                    </View> : null}

                    <View style={{ width: width * 0.8, borderColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: width * 0.045, fontFamily: 'RobotoSlab_semiBold' }} >Amount</Text>
                        <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_regular' }} >{"₹ " + orderData.amount}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: "Home" }],
                    })
                )} >
                    <LinearGradient style={styles.Btn}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={color}>
                        <Text style={{ fontSize: width * 0.045, fontFamily: 'RobotoSlab_semiBold', color: 'white' }} >Home</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>



        </ScrollView>
    );
}

const styles = StyleSheet.create({
    summaryConatiner: {
        width: width * 0.9,

        borderColor: 'black',

        backgroundColor: '#E7E5DF',
        borderRadius: 20,
        alignItems: 'center'
    },
    headerText: {
        fontSize: width * 0.068,
        fontFamily: 'RobotoSlab_regular'
    },
    Btn: {
        width: width * 0.7,
        height: width * 0.14,
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: height * 0.03,
        marginTop: height * 0.018,


    }

})


export default ConfirmOrder;
