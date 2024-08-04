import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { IconButton } from "react-native-paper";
const { width, height } = Dimensions.get('window');
const color = ["#090979", "#433eb6", "#433eb6"];
import StepIndicator from 'react-native-step-indicator';
const ViewOrder = ({ navigation, route }) => {
    const { orderDetails } = route.params;
    // console.log("<<<<", orderDetails);

    const labels = ["Cart","Delivery Address","Order Summary","Payment Method","Track"];
    const customStyles = {
        stepIndicatorSize: width*0.1,
        currentStepIndicatorSize: width*0.2,
        separatorStrokeWidth: width*0.01,
        currentStepStrokeWidth: width*0.01,
        stepStrokeCurrentColor: '#fe7013',
        separatorFinishedColor: '#fe7013',
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: '#fe7013',
        stepIndicatorUnFinishedColor: '#aaaaaa',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: width*0.03,
        currentStepIndicatorLabelFontSize: width*0.04,
        stepIndicatorLabelCurrentColor: '#000000',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
        labelColor: '#666666',
        labelSize: 15,
        currentStepLabelColor: '#fe7013',
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
         currentPosition={1}
         labels={labels}
         direction={'vertical'}
         
         
    />
        </View>
    </ScrollView>)
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
    stepIndicatorContainer:{
        height:height*0.5,
        justifyContent:'center',
        alignItems:'center'

    }
})

export default ViewOrder;


