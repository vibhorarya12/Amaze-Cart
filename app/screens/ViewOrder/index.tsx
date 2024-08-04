import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, Dimensions, ScrollView, Button, Image } from "react-native";
import { IconButton } from "react-native-paper";
const { width, height } = Dimensions.get('window');
const color = ["#090979", "#433eb6", "#433eb6"];
import StepIndicator from 'react-native-step-indicator';
const ViewOrder = ({ navigation, route }) => {
    const { orderDetails } = route.params;
    // console.log("<<<<", orderDetails);
    const checkConfirm: boolean = orderDetails.paymentData.paymentId != '' && orderDetails.paymentData.paymentStatus === 'Pending';


    const labels = [checkConfirm ? 'not confirmed ❌' : 'Confirmed', 'Processing', 'Shipped', 'On the way', 'Delivered'];
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
        <View style={styles.productsContainer}>
            <ScrollView showsHorizontalScrollIndicator ={false} horizontal={true}>
                {orderDetails.products.map((item, index) => <Products item={item} key={index} />)}

            </ScrollView>
        </View>
    </ScrollView>)
}


const Products = ({ item }) => {

    return (<View style={styles.products}>

        <Image resizeMode={'cover'} style={{ width: width * 0.2, height: width * 0.25 , marginLeft:5, borderRadius:10}} source={{ uri: item.productId.images[0] }} />
        <View style={styles.productInfoContainer}>
            <Text style={{fontSize:width*0.04, fontFamily: 'RobotoSlab_regular'}}>
                {item.productId.description.length > 30
                    ? item.productId.description.substring(0, 30) + '...'
                    : item.productId.description}
            </Text>
            <Text style={{fontSize:width*0.04, fontFamily: 'RobotoSlab_semiBold'}}>
            Quantity {item.quantity}
            </Text>
            <Text style={{fontSize:width*0.04, fontFamily: 'RobotoSlab_semiBold'}}>
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
       
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
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

    }
})

export default ViewOrder;


