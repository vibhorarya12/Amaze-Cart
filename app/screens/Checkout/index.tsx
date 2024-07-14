import { LinearGradient } from "expo-linear-gradient"
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity } from "react-native"
import { Checkbox, IconButton, TextInput } from "react-native-paper";
import { Cod, Debit, Upi } from "../../../assets/Images"; import { useState } from "react";

const { width, height } = Dimensions.get('window');
const color = ["#090979", "#433eb6", "#433eb6"];

const Checkout = ({ navigation }) => {
    const paymentMode = [{ title: 'Cash on delivery', img: Cod },
    { title: 'UPI', img: Upi },
    { title: 'Debit/Credit', img: Debit }]
    const [selectedPay, setSelectedPay] = useState('');

    return (<ScrollView style={styles.container} contentContainerStyle={styles.contentConatiner}>
        <LinearGradient
            style={styles.headerContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={color}
        >
            <IconButton
                icon="keyboard-backspace"
                iconColor='#433eb6'
                size={width * 0.05}
                style={{ backgroundColor: '#E7E5DF', position: 'absolute', left: width * 0.03, bottom: 1 }}
                onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerText}>Place order</Text>
        </LinearGradient>
        <Text style={{ alignSelf: 'flex-start', left: width * 0.09, fontSize: width * 0.04 ,fontFamily:'RobotoSlab_semiBold'}} >Full name *</Text>
        <TextInput
            mode={"outlined"}
           
            style={styles.textInput}
            outlineColor="#433eb6"
            activeOutlineColor="#433eb6"
            outlineStyle={{ borderWidth: 2, borderRadius: 10 }}


        />
    <Text style={{ alignSelf: 'flex-start', left: width * 0.09, fontSize: width * 0.04 ,fontFamily:'RobotoSlab_semiBold'}} >Phone number *</Text>
        <TextInput
            keyboardType={"numeric"}
            mode={"outlined"}
            
            style={styles.textInput}
            outlineColor="#433eb6"
            activeOutlineColor="#433eb6"
            outlineStyle={{ borderWidth: 2, borderRadius: 10 }}
            left={<TextInput.Affix text="+91" />}

        />
        <Text style={{ alignSelf: 'flex-start', left: width * 0.09, fontSize: width * 0.04 ,fontFamily:'RobotoSlab_semiBold'}} >Shipping address*</Text>

        <TextInput
            multiline={true}
            mode={"outlined"}
            
            style={styles.textInputArea}
            outlineColor="#433eb6"
            activeOutlineColor="#433eb6"
            outlineStyle={{ borderWidth: 2, borderRadius: 10 }}

        />
        <Text style={{ alignSelf: 'flex-start', left: width * 0.09, fontSize: width * 0.04, fontFamily:'RobotoSlab_semiBold' }} >Payment mode</Text>
        {paymentMode.map((item, index) => {
            return (<View key={index} style={styles.paymentItem}>
                <Image style={styles.img} resizeMode={"contain"} source={item.img} />
                <Text style={{ fontSize: width * 0.04, fontWeight: '500' ,fontFamily:'RobotoSlab_semiBold'}}>{item.title}</Text>
                <View style={{ marginRight: 5 }}>
                    <Checkbox

                        color="#433eb6"
                        status={selectedPay === item.title ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setSelectedPay(item.title)
                        }}
                    />
                </View>

            </View>)
        })}
        <View style={styles.subTotal}>
            <View style={{ width: width * 0.8, height: height * 0.07, borderColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: width * 0.04,fontFamily:'RobotoSlab_semiBold' }} >{"Subtotal (3 items)"}</Text>
                <Text style={{ fontSize: width * 0.04, fontFamily:'RobotoSlab_semiBold' }} >{"₹ " + "1499"}</Text>
            </View>
            <View style={{ width: width * 0.8, height: height * 0.07, borderColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: width * 0.04, fontFamily:'RobotoSlab_semiBold'}} >{"delivery charge"}</Text>
                <Text style={{ fontSize: width * 0.04, fontFamily:'RobotoSlab_semiBold' }} >{"₹ " + "99"}</Text>
            </View>
            <View style={styles.divider}>
                {/*  divider      */}
            </View>
            <View style={{ width: width * 0.8, height: height * 0.07, borderColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: width * 0.05, fontFamily:'RobotoSlab_semiBold'}} >{"Total"}</Text>
                <Text style={{ fontSize: width * 0.05, fontFamily:'RobotoSlab_semiBold' }} >{"₹ " + "1598"}</Text>
            </View>
         <TouchableOpacity >
            <LinearGradient style={styles.checkoutBtn}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={color}>
                <Text style={{ fontSize: width * 0.04, fontFamily:'RobotoSlab_semiBold', color:'white' }} >{"Checkout"}</Text>
            </LinearGradient>
         </TouchableOpacity>
        </View>
    </ScrollView>)

}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        width: width,
        height: height * 0.13,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: 'center',
        zIndex: 2,

    },
    contentConatiner: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 7

    },
    headerText: {

        fontSize: width * 0.06,
        marginBottom: 10,
        color: 'white',
        fontWeight: '500',
        fontFamily:'RobotoSlab_semiBold'

    },
    textInput: {

        width: width * 0.85,
        height: width * 0.12,
       

        backgroundColor: 'transparent'

    },
    textInputArea: {

        width: width * 0.85,
        height: height * 0.2,


        backgroundColor: 'transparent'

    },
    paymentItem: {
        width: width * 0.85,
        height: width * 0.18,
        borderRadius: 15,
        borderColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#E7E5DF',

    },
    img: {
        width: width * 0.2,
        height: width * 0.15
    },
    subTotal: {
        width: width * 0.91,
        backgroundColor: '#E7E5DF',
        height: height * 0.32,
        borderRadius: 15,
        marginBottom: 20,
        // justifyContent:'center',
        alignItems: 'center',



    },
    divider: {
        height: 2.5,
        width: width * 0.84,
        backgroundColor: '#433eb6',
        opacity: 0.6

    },
    checkoutBtn:{
        width: width * 0.6,
        height: width * 0.14,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center'
    }

})


export default Checkout;