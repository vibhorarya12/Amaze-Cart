import { LinearGradient } from "expo-linear-gradient"
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity, ToastAndroid, BackHandler } from "react-native"
import { Button, IconButton, RadioButton, TextInput } from "react-native-paper";
import { Cod, Debit, Upi } from "../../../assets/Images"; import { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
const { width, height } = Dimensions.get('window');
const color = ["#090979", "#433eb6", "#433eb6"];


const Checkout = ({ navigation, route }) => {
    
    const scrollViewRef = useRef(null);
    const paymentMode = [{ title: 'Cash on delivery', img: Cod },
    { title: 'UPI', img: Upi },
    { title: 'Debit/Credit', img: Debit }]
    const [selectedPay, setSelectedPay] = useState('');
    const checkoutData = route.params.checkoutData;
    const subTotal = checkoutData.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const [orderData, setOrderData] = useState({
        name: '',
        phone: '',
        address: '',
        paymentMode: '',
        amount: subTotal + 99,
        products: checkoutData.map((item) => ({
            productId: item._id,
            price: item.price,
            quantity: item.quantity
        }))
    });

    const [error, setError] = useState({ nameError: false, phoneError: false, addressError: false });
    const snapPoints = ['65%'];
    const bottomSheetRef = useRef<BottomSheet>(null);
    const renderBackDrop = useCallback((props: any) => <BottomSheetBackdrop  appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, [])

   
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      
        return () => backHandler.remove();
      }, []);

      const handleBackPress = () => {
        if (bottomSheetRef.current?.index !== -1) {
            bottomSheetRef.current?.close();
            return true;
        }
       
        return false;
    };


    // handle input feilds validations //
    const handleValidation = () => {
       
        setError({
            nameError: false,
            phoneError: false,
            addressError: false
        });

        const phonePattern = /^[0-9]{10}$/;

        if (orderData.name.length === 0) {
            setError((prev) => ({ ...prev, nameError: true }))
            //scroll to input feild on error //
            scrollViewRef.current.scrollTo({ x: 0, y: height * 0.02, animated: true })
            ToastAndroid.show('name feild cannot be left blank', ToastAndroid.LONG);
            return false;

        }

        if (!phonePattern.test(orderData.phone)) {
            setError((prev) => ({ ...prev, phoneError: true }))
            scrollViewRef.current.scrollTo({ x: 0, y: height * 0.02, animated: true })
            ToastAndroid.show('please enter valid phone number', ToastAndroid.LONG);
            return false;

        }

        if (orderData.address.length === 0) {
            setError((prev) => ({ ...prev, addressError: true }))
            scrollViewRef.current.scrollTo({ x: 0, y: height * 0.01, animated: true })
            ToastAndroid.show('address feild cannot be left blank', ToastAndroid.LONG);
            return false;
        }
        if (orderData.paymentMode.length === 0) {
            ToastAndroid.show('please select a payment mode', ToastAndroid.LONG);
            return false;
        }
        bottomSheetRef.current?.snapToIndex(0);
        return;

    }
  

  

    return (<ScrollView ref={scrollViewRef} style={styles.container} contentContainerStyle={styles.contentConatiner}>
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
        <Text style={{ alignSelf: 'flex-start', left: width * 0.09, fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >Full name *</Text>
        <TextInput
            mode={"outlined"}
            error={error.nameError}
            style={styles.textInput}
            outlineColor="#433eb6"
            activeOutlineColor="#433eb6"
            outlineStyle={{ borderWidth: 2, borderRadius: 10 }}
            value={orderData.name}
            onChangeText={(e) => setOrderData((prev) => ({ ...prev, name: e }))}


        />
        <Text style={{ alignSelf: 'flex-start', left: width * 0.09, fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >Phone number *</Text>
        <TextInput
            keyboardType={"numeric"}
            mode={"outlined"}
            error={error.phoneError}
            style={styles.textInput}
            outlineColor="#433eb6"
            activeOutlineColor="#433eb6"
            outlineStyle={{ borderWidth: 2, borderRadius: 10 }}
            left={<TextInput.Affix text="+91" />}
            onChangeText={(e) => setOrderData((prev) => ({ ...prev, phone: e }))}

        />
        <Text style={{ alignSelf: 'flex-start', left: width * 0.09, fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >Shipping address*</Text>

        <TextInput
            multiline={true}
            mode={"outlined"}
            error={error.addressError}
            style={styles.textInputArea}
            outlineColor="#433eb6"
            activeOutlineColor="#433eb6"
            outlineStyle={{ borderWidth: 2, borderRadius: 10 }}
            onChangeText={(e) => setOrderData((prev) => ({ ...prev, address: e }))}

        />
        <Text style={{ alignSelf: 'flex-start', left: width * 0.09, fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >Payment mode</Text>
        {paymentMode.map((item, index) => {
            return (<View key={index} style={styles.paymentItem}>
                <Image style={styles.img} resizeMode={"contain"} source={item.img} />
                <Text style={{ fontSize: width * 0.04, fontWeight: '500', fontFamily: 'RobotoSlab_semiBold' }}>{item.title}</Text>
                <View style={{ marginRight: 5 }}>
                    <RadioButton
                        value={item.title}
                        color="#433eb6"
                        status={orderData.paymentMode === item.title ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setOrderData((prevData) => ({
                                ...prevData,
                                paymentMode: item.title
                            }));
                        }}
                    />
                </View>

            </View>)
        })}
       

        {/* checkout button */}
        <TouchableOpacity onPress={() => handleValidation()}>
            <LinearGradient style={styles.checkoutBtn}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={color}>
                <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold', color: 'white' }} >{"Checkout"}</Text>
            </LinearGradient>
        </TouchableOpacity>



        {/*  bottom sheet container */}
        <BottomSheet   backgroundStyle={{backgroundColor:'#f2f3f2'}}  backdropComponent={renderBackDrop} style={{ justifyContent: 'center', alignItems: 'center',gap:10,  }} ref={bottomSheetRef} index={-1} snapPoints={snapPoints} enablePanDownToClose={true}>
           
             {/* checkout details container */}
            <BottomSheetView style={styles.subTotal}>
                 {/* name details */}
                <BottomSheetView style={{ width: width * 0.8, height: height * 0.06, borderColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >Name</Text>
                    <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_regular' }} > {orderData.name}</Text>

                </BottomSheetView>
                  
                  {/* phone details */}
                <BottomSheetView style={{ width: width * 0.8, height: height * 0.06, borderColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >Phone</Text>
                    <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_regular' }} >{"+91" + orderData.phone}</Text>
                </BottomSheetView>
                {/* Shipping details */}
                <BottomSheetView style={{ width: width * 0.8, borderColor: 'black',  alignItems: 'flex-start',  }}>
                    <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >Shipping Address</Text>
                    <Text style={{ fontSize: width * 0.037, fontFamily: 'RobotoSlab_regular', textAlign: 'justify', }} >{orderData.address}</Text>
                </BottomSheetView>
                {/* payment mode details */}
                <BottomSheetView style={{ width: width * 0.8, height: height * 0.06, borderColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >Payment mode : </Text>
                    <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_regular' }} >{orderData.paymentMode}</Text>
                </BottomSheetView>

                <BottomSheetView style={{ width: width * 0.8, height: height * 0.06, borderColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >{`Sub total (${checkoutData.reduce((sum, item) => sum + item.quantity, 0)} items)`}</Text>
                    <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} > {"₹" + subTotal}</Text>

                </BottomSheetView>
                <BottomSheetView style={{ width: width * 0.8, height: height * 0.06, borderColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >{"delivery charge"}</Text>
                    <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >{"₹ " + "99"}</Text>
                </BottomSheetView>
                <BottomSheetView style={styles.divider}>
                    {/*  divider      */}
                </BottomSheetView>
                <BottomSheetView style={{ width: width * 0.8, height: height * 0.07, borderColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: width * 0.05, fontFamily: 'RobotoSlab_semiBold' }} >{"Total"}</Text>
                    <Text style={{ fontSize: width * 0.05, fontFamily: 'RobotoSlab_semiBold' }} >{"₹ " + (subTotal + 99)}</Text>
                </BottomSheetView>
                <TouchableOpacity >
            <LinearGradient style={styles.bottomSheetBtn}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={color}>
                <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold', color: 'white' }} >{orderData.paymentMode==='Cash on delivery'?'Place Order':'Razorpay Checkout'}</Text>
            </LinearGradient>
        </TouchableOpacity>
                
            </BottomSheetView>
        </BottomSheet>
    </ScrollView>)


}

 const ProductItem = ()=> (<View style={styles.productItem}>
    <Text>item</Text>
 </View>)


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
        fontFamily: 'RobotoSlab_semiBold'

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
        
        borderRadius: 20,
        marginBottom: 20,
        // justifyContent:'center',
        alignItems: 'center',
        alignSelf:'center',
        marginTop:height*0.015,
       



    },
    divider: {
        height: 2.5,
        width: width * 0.84,
        backgroundColor: '#433eb6',
        opacity: 0.6

    },
    checkoutBtn: {
        width: width * 0.6,
        height: width * 0.14,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },

    productItem:{
        width:width*0.45,
        height:height*0.2,
        borderColor:'black',
        borderWidth:1
    },

  bottomSheetBtn:{
    width: width * 0.7,
    height: width * 0.14,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:height*0.03,
    marginTop:height*0.012,
    

  }
   

})


export default Checkout;