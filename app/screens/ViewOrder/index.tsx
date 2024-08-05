import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, Dimensions, ScrollView, Button, Image } from "react-native";
import { IconButton } from "react-native-paper";
import StepIndicator from 'react-native-step-indicator';
import Icon from 'react-native-vector-icons/MaterialIcons';
const { width, height } = Dimensions.get('window');
const color = ["#090979", "#433eb6", "#433eb6"];

const ViewOrder = ({ navigation, route }) => {
    const { orderDetails } = route.params;
    // console.log("<<<<", orderDetails);
    const checkConfirm: boolean = orderDetails.paymentData.paymentId != '' && orderDetails.paymentData.paymentStatus === 'Pending';
    const subTotal = orderDetails.products.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const labels = [checkConfirm ? 'not confirmed ❌' : 'Confirmed', 'Processing', 'Shipped', 'In Transit', 'Delivered'];
    const customStyles = {
        stepIndicatorSize: width * 0.06,
        currentStepIndicatorSize: width * 0.07,
        separatorStrokeWidth: width * 0.01,
        currentStepStrokeWidth: width * 0.01,
        stepStrokeCurrentColor: checkConfirm ? 'red' : '#fe7013',
        separatorFinishedColor: '#fe7013',
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: '#fe7013',
        stepIndicatorUnFinishedColor: '#aaaaaa',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 0,
        currentStepIndicatorLabelFontSize: 0,
        stepIndicatorLabelCurrentColor: '#000000',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
        labelColor: '#666666',
        labelSize: width * 0.04,
        currentStepLabelColor: 'red',
        labelFontFamily: 'RobotoSlab_regular'
    }


    return (<ScrollView><LinearGradient
        style={styles.headerContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={color}
    >
        <IconButton
            icon="keyboard-backspace"
            iconColor='#433eb6'
            size={width * 0.04}
            style={{ backgroundColor: '#E7E5DF' }}
            onPress={() => navigation.goBack()}
        />
    </LinearGradient>
        <View style={styles.orderHeader}>
            <Text style={{ fontSize: width * 0.037, fontFamily: 'RobotoSlab_semiBold', color: '#090979' }}>Order ID : {orderDetails._id} </Text>
            <Text style={{ fontSize: width * 0.037, fontFamily: 'RobotoSlab_semiBold', color: '#090979', alignSelf: 'flex-start', left: width * 0.12 }}>
                {(() => {
                    const itemDate = new Date(orderDetails.createdAt);
                    const currentDate = new Date();

                    if (itemDate.toDateString() === currentDate.toDateString()) {
                        return 'Today';
                    } else {
                        return itemDate.toLocaleDateString('en-GB', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        });
                    }
                })()} </Text>
        </View>
        <View style={styles.stepIndicatorContainer}>
            <StepIndicator
                customStyles={customStyles}
                currentPosition={checkConfirm ? 0 : 1}
                labels={labels}
                direction={'vertical'}
            />
        </View>
        <Text style={{ fontSize: width * 0.042, fontFamily: 'RobotoSlab_semiBold', color: '#090979', alignSelf: 'flex-start', marginBottom: 5, marginLeft: width * 0.1 }}>{'all item(s)'}</Text>
        <View style={styles.productsContainer}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                {orderDetails.products.map((item, index) => <Products item={item} key={index} />)}

            </ScrollView>
        </View>
        <Text style={{ fontSize: width * 0.042, fontFamily: 'RobotoSlab_semiBold', color: '#090979', alignSelf: 'flex-start', marginBottom: 5, marginLeft: width * 0.1 }}>{'billing details'}</Text>

        {/* billing details conatiner */}
        <View style={styles.billingContainer}>
           {orderDetails.paymentMode != 'Cash on delivery'?
            <View style={[styles.paymentStatus, {backgroundColor: checkConfirm?'#E9374F':'#2FBF71'}]} >
            
            <Text style={{ fontSize: width * 0.048, fontFamily: 'RobotoSlab_semiBold', color:'#E7E5DF' }} >{checkConfirm?'Payment failed':'Paid'}</Text>
            <Icon name= {checkConfirm?'error-outline':'done'}  size={width*0.07} color={"#E7E5DF"} />
            </View>:null }
            {/* name details */}
            <View style={{ width: width * 0.8, height: height * 0.06, borderColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >Name</Text>
                <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_regular' }} > {orderDetails.name}</Text>

            </View>

            {/* phone details */}

            <View style={{ width: width * 0.8, height: height * 0.06, borderColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >Phone</Text>
                <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_regular' }} >{"+91" + orderDetails.phone}</Text>
            </View>
            {/* email details  */}
            <View style={{ width: width * 0.8, height: height * 0.06, borderColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >Email</Text>
                <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_regular' }} >{orderDetails.email}</Text>
            </View>

            {/* Shipping details */}
            <View style={{ width: width * 0.8, borderColor: 'black', alignItems: 'flex-start', }}>
                <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >Shipping Address</Text>
                <Text style={{ fontSize: width * 0.037, fontFamily: 'RobotoSlab_regular', textAlign: 'justify', }} >{orderDetails.address}</Text>
            </View>
            {/* payment mode details */}
            <View style={{ width: width * 0.8, height: height * 0.06, borderColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >Payment mode : </Text>
                <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_regular' }} >{orderDetails.paymentMode}</Text>
            </View>
            {orderDetails.paymentMode != 'Cash on delivery' ?
                <View style={{ width: width * 0.8, height: height * 0.06, borderColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >Payment ID : </Text>
                    <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_regular' }} >{orderDetails.paymentData.paymentId}</Text>
                </View> : null

            }
            <View style={{ width: width * 0.8, height: height * 0.06, borderColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >{`Sub total (${orderDetails.products.reduce((sum, item) => sum + item.quantity, 0)} items)`}</Text>
                <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} > {"₹" + subTotal}</Text>

            </View>
            <View style={{ width: width * 0.8, height: height * 0.06, borderColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >{"delivery charge"}</Text>
                <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }} >{"₹ " + "99"}</Text>
            </View>
            <View style={styles.divider}>
                {/*  divider      */}
            </View>
            <View style={{ width: width * 0.8, height: height * 0.07, borderColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: width * 0.05, fontFamily: 'RobotoSlab_semiBold' }} >{"Total"}</Text>
                <Text style={{ fontSize: width * 0.05, fontFamily: 'RobotoSlab_semiBold' }} >{"₹ " + (subTotal + 99)}</Text>
            </View>


        </View>
    </ScrollView>)
}


const Products = ({ item }) => {

    return (<View style={styles.products}>

        <Image resizeMode={'cover'} style={{ width: width * 0.2, height: width * 0.25, marginLeft: 5, borderRadius: 10 }} source={{ uri: item.productId.images[0] }} />
        <View style={styles.productInfoContainer}>
            <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_regular' }}>
                {item.productId.title.length > 30
                    ? item.productId.title.substring(0, 30) + '...'
                    : item.productId.title}
            </Text>
            <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }}>
                Quantity {item.quantity}
            </Text>
            <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }}>
                {'₹ ' + item.productId.price}
            </Text>

        </View>
    </View>)

}


const styles = StyleSheet.create({
    headerText: {
        left: width * 0.07,
        fontSize: width * 0.054,
        marginBottom: 10,
        color: 'white',
        fontFamily: 'RobotoSlab_semiBold'
    },
    headerContainer: {
        width: width,
        height: height * 0.13,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: 'flex-start',

    },
    orderHeader: {
        width: width * 0.9,
        height: height * 0.075,
        borderWidth: 0.6,
        borderColor: 'grey',

        marginTop: height * 0.015,
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    stepIndicatorContainer: {
        height: height * 0.5,
        justifyContent: 'center',
        alignItems: 'center'

    },
    productsContainer: {
        width: width * 0.9,
        height: height * 0.17,
        // borderWidth:1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignSelf: "center"
    },
    products: {
        borderWidth: 0.8,
        borderColor: '#CDCDCD',
        width: width * 0.7,
        height: height * 0.15,

        // backgroundColor:'red',
        marginRight: 5,
        borderRadius: 15,
        flexDirection: 'row',
        // justifyContent:'center',
        alignItems: 'center',
        gap: 5,



    },
    productInfoContainer: {

        borderColor: 'grey',
        width: width * 0.4,
        height: height * 0.14,
        justifyContent: 'center'

    },
    billingContainer: {
        width: width * 0.91,
        backgroundColor: '#E7E5DF',
        // height:height*0.5,
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
    paymentStatus: {
        width: width * 0.8,
        height: height * 0.07,
    //    backgroundColor:'#2FBF71',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:height*0.02,
        gap:width*0.03,
        elevation:5
    }
})

export default ViewOrder;


