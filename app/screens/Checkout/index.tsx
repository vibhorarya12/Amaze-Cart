import { LinearGradient } from "expo-linear-gradient"
import { View, Text, StyleSheet, ScrollView, Dimensions, Image } from "react-native"
import { Checkbox, IconButton, TextInput } from "react-native-paper";
import { Cod, Debit, Upi } from "../../../assets/Images"; import { useState } from "react";
Checkbox
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
        <TextInput
            mode={"outlined"}
            label="Full name *"
            style={styles.textInput}
            outlineColor="#433eb6"
            activeOutlineColor="#433eb6"
            outlineStyle={{ borderWidth: 2, borderRadius: 10 }}


        />

        <TextInput
            keyboardType={"numeric"}
            mode={"outlined"}
            label="Phone number *"
            style={styles.textInput}
            outlineColor="#433eb6"
            activeOutlineColor="#433eb6"
            outlineStyle={{ borderWidth: 2, borderRadius: 10 }}
            left={<TextInput.Affix text="+91" />}

        />
        <Text style={{ alignSelf: 'flex-start', left: width * 0.09, fontSize: width * 0.04, fontWeight: '500' }} >Shipping Address*</Text>

        <TextInput
            multiline={true}
            mode={"outlined"}
            label="address *"
            style={styles.textInputArea}
            outlineColor="#433eb6"
            activeOutlineColor="#433eb6"
            outlineStyle={{ borderWidth: 2, borderRadius: 10 }}



        />
        <Text style={{ alignSelf: 'flex-start', left: width * 0.09, fontSize: width * 0.04, fontWeight: '500' }} >Payment mode</Text>
        {paymentMode.map((item, index) => {
            return (<View key={index} style={styles.paymentItem}>
                <Image style={styles.img} resizeMode={"contain"} source={item.img} />
                <Text style={{fontSize: width * 0.04, fontWeight: '500'}}>{item.title}</Text>
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

    },
    textInput: {

        width: width * 0.85,
        height: width * 0.12,
        // position: 'absolute',

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
    }
})


export default Checkout;