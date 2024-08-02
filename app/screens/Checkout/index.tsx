import { LinearGradient } from "expo-linear-gradient"
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity, ToastAndroid, BackHandler } from "react-native";
import RazorpayCheckout from 'react-native-razorpay';
import { Button, IconButton, RadioButton, TextInput } from "react-native-paper";
import { Cod, Debit, Upi } from "../../../assets/Images"; import { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { Razorpay_Key, URL } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import { clearCart } from "../../../redux/Actions/productActions";
const { width, height } = Dimensions.get('window');
const color = ["#090979", "#433eb6", "#433eb6"];

const Checkout = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const scrollViewRef = useRef(null);
    const authData = useSelector(state => state.auth);
    const paymentMode = [{ title: 'Cash on delivery', img: Cod },
    { title: 'UPI', img: Upi },
    { title: 'Debit/Credit', img: Debit }]
    const [selectedPay, setSelectedPay] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');
    const checkoutData = route.params.checkoutData;
    const subTotal = checkoutData.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const [orderData, setOrderData] = useState({
        token: authData.token,
        name: '',
        phone: '',
        email: '',
        address: '',
        paymentMode: '',
        amount: subTotal + 99,
        products: checkoutData.map((item) => ({
            productId: item._id,
            price: item.price,
            quantity: item.quantity
        }))
    });

    //  response data after successfull creation of order
    const [resData, setResData] = useState(null);
    const [error, setError] = useState({ nameError: false, phoneError: false, addressError: false, emailError: false });

    // bottomSheet Config
    const snapPoints = ['70%'];
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const renderBackDrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, [])
    const handleOpenModal = () => bottomSheetRef.current?.present()

    useEffect(() => {
        // handle back button action //
        console.log("new items on cart");
        setResData(null);

        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => backHandler.remove();

    }, [checkoutData]);

    useEffect(() => {
        if (resData && ['UPI', 'Debit/Credit'].includes(resData.paymentMode)) {
            // Your code here
            var options = {
                description: `Payment for OrderID  ${resData._id}`,
                image: 'https://www.ecommerce-nation.com/wp-content/uploads/2019/02/razorpay.webp',
                currency: 'INR',
                key: Razorpay_Key,
                amount: (subTotal + 99) * 100,
                name: 'AmazeCart',
                order_id: resData.paymentData.paymentId,
                prefill: {
                    email: orderData.email,
                    contact: orderData.phone,
                    name: orderData.name
                },
                theme: { color: '#433eb6' }
            }

            RazorpayCheckout.open(options).then(async (data) => {
                // handle success
                // alert(`Success: ${data.razorpay_payment_id}`);
                setLoadingText('Confirming order ...');
                setLoading(true);
                try {
                    const res = await axios.post(`${URL}/order/confirmPayment`, { token: orderData.token, orderId: resData._id, paymentStatus: 'Completed' });
                    console.log('confimation done <<<',res.data);
                    alert('Payment Confirmed');
                    bottomSheetRef.current?.close();
                    dispatch(clearCart());
                    navigation.navigate('Home');
                } catch (error) {
                    console.log(error);
                    alert('failed');
                }
                finally {
                    setLoading(false);
                }
                // console.log("razor data is <<<<", data);
            }).catch((error) => {
                // handle failure
                alert(`Error: ${error.code} | ${error.description}`);
                console.log("razor error  is <<<<", error);
            });


        }
        if (resData && resData.paymentMode === 'Cash on delivery') {
            bottomSheetRef.current?.close();
            dispatch(clearCart());
            navigation.navigate('Home');
        }

    }, [resData])

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
            addressError: false,
            emailError: false
        });

        const phonePattern = /^[0-9]{10}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


        if (orderData.name.length === 0) {
            setError((prev) => ({ ...prev, nameError: true }))
            //scroll to input feild on error //
            scrollViewRef.current.scrollTo({ x: 0, y: height * 0.02, animated: true })
            ToastAndroid.show('name feild cannot be left blank', ToastAndroid.LONG);
            return;

        }

        if (!phonePattern.test(orderData.phone)) {
            setError((prev) => ({ ...prev, phoneError: true }))
            scrollViewRef.current.scrollTo({ x: 0, y: height * 0.02, animated: true })
            ToastAndroid.show('please enter valid phone number', ToastAndroid.LONG);
            return;

        }

        if (!emailRegex.test(orderData.email)) {
            setError((prev) => ({ ...prev, emailError: true }))
            scrollViewRef.current.scrollTo({ x: 0, y: height * 0.02, animated: true })
            ToastAndroid.show('please enter valid email', ToastAndroid.LONG);
            return;
        }
        if (orderData.address.length === 0) {
            setError((prev) => ({ ...prev, addressError: true }))
            scrollViewRef.current.scrollTo({ x: 0, y: height * 0.01, animated: true })
            ToastAndroid.show('address feild cannot be left blank', ToastAndroid.LONG);
            return;
        }
        if (orderData.paymentMode.length === 0) {
            ToastAndroid.show('please select a payment mode', ToastAndroid.LONG);
            return;
        }
        bottomSheetRef.current?.present();
        return;

    }


    // handle create order
    const createOrder = async () => {
        setLoadingText('creating order !!!');
        setLoading(true)
        try {

            const res = await axios.post(`${URL}/order/createOrder`, orderData);
            console.log(res.data);
            setResData(res.data.order);
            alert(res.data.message);
            console.log('resdata is <<<<<<<<<<', resData);
        } catch (error) {
            console.log(error);
            alert('failed to create order !!!');
        }
        finally {
            setLoadingText('');
            setLoading(false);

        }
    }

    //   handle razorpay Checkout

    

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
        <Text style={{ alignSelf: 'flex-start', left: width * 0.09, fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >Email *</Text>
        <TextInput
            keyboardType={'email-address'}
            mode={"outlined"}
            error={error.emailError}
            style={styles.textInput}
            outlineColor="#433eb6"
            activeOutlineColor="#433eb6"
            outlineStyle={{ borderWidth: 2, borderRadius: 10 }}

            onChangeText={(e) => setOrderData((prev) => ({ ...prev, email: e }))}

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
        <TouchableOpacity style={{ marginBottom: height * 0.035 }} onPress={() => handleValidation()}>
            <LinearGradient style={styles.checkoutBtn}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={color}>
                <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold', color: 'white' }} >{"Checkout"}</Text>
            </LinearGradient>
        </TouchableOpacity>



        {/*  bottom sheet modal container */}
        <BottomSheetModal backgroundStyle={{ backgroundColor: '#f2f3f2' }} backdropComponent={renderBackDrop} style={{ justifyContent: 'center', alignItems: 'center', gap: 10, }} ref={bottomSheetRef} snapPoints={snapPoints} enablePanDownToClose={true}>

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
                {/* email details  */}
                <BottomSheetView style={{ width: width * 0.8, height: height * 0.06, borderColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >Email</Text>
                    <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_regular' }} >{orderData.email}</Text>
                </BottomSheetView>

                {/* Shipping details */}
                <BottomSheetView style={{ width: width * 0.8, borderColor: 'black', alignItems: 'flex-start', }}>
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
                <TouchableOpacity disabled={loading} onPress={() => createOrder()}>
                    <LinearGradient style={styles.bottomSheetBtn}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={color}>
                        <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold', color: 'white' }} >{orderData.paymentMode === 'Cash on delivery' ? 'Place Order' : 'Razorpay Checkout'}</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <Spinner
                    visible={loading}
                    color="#090979"
                    size={50}
                    textContent={loadingText}
                />
            </BottomSheetView>
        </BottomSheetModal>
    </ScrollView>)


}

const ProductItem = () => (<View style={styles.productItem}>
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
        alignSelf: 'center',
        marginTop: height * 0.015,




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

    productItem: {
        width: width * 0.45,
        height: height * 0.2,
        borderColor: 'black',
        borderWidth: 1
    },

    bottomSheetBtn: {
        width: width * 0.7,
        height: width * 0.14,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: height * 0.03,
        marginTop: height * 0.012,


    }


})


export default Checkout;