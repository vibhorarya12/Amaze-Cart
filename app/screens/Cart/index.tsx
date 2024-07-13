import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, Dimensions, FlatList, Image, Alert } from "react-native";
import { Sample_Products_Data } from "../../../assets/SampleData/Products";
import { IconButton } from "react-native-paper";
import { useState } from "react";

const { width, height } = Dimensions.get('window');

const color = ["#090979", "#433eb6", "#433eb6"];

const Cart = () => {
    return (
        <View style={styles.container}>
            <LinearGradient
                style={styles.headerContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={color}
            >
                <Text style={styles.headerText}>Cart</Text>
            </LinearGradient>
            <FlatList
                style={styles.flatList}
                data={Sample_Products_Data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <CartItems item={item} />}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            />
            <View style={styles.checkoutInfoContainer}>
                <View style={{ borderColor:'black', width:width*0.45, justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:width*0.042, fontWeight:'600',}}>{'Sub total (3 items)'}</Text>
                <IconButton
                        icon="arrow-right"
                        iconColor={'#433eb6'}
                        size={height*0.05}
                        style={{ alignSelf:'flex-start' }}
                        onPress={()=>console.log('hello')}                        
                    />
                    
                </View>
                <View style={styles.totalPriceContainer}>
                    <Text style={{fontSize:width*0.05, fontWeight:'600'}}>
                    {"₹1400"}
                    </Text>
                    <Text style={{ fontSize: width * 0.035, opacity: 0.5 }}>{"(excluding shipping charges)"}</Text>
                </View>
            </View>
        </View>
    );
}

const CartItems = ({ item }) => {
    const [capacity, setCapacity] = useState(1);
    const handleAdd =()=> setCapacity(capacity+1);
    const handleReduce = () => {
        if (capacity === 1) {
            Alert.alert(
                'Warning',
                'This will remove the item from the cart',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    },
                    {
                        text: 'OK',
                        onPress: () => setCapacity(0) // or any action to remove the item
                    }
                ]
            );
        } else {
            setCapacity(capacity - 1);
        }
    }
    
    return (
        <View style={styles.cartItemContainer}>
            <Image style={styles.img} resizeMode={"cover"} source={{ uri: item.images[0] }} />
            <View style={styles.productInfoConatiner}>
                <Text style={styles.productTitle}>{item.title.length > 28 ? item.title.substring(0, 25) + "..." : item.title}</Text>
                <View style={styles.quantityButton}>
                    <IconButton
                        icon="minus"
                        iconColor={'#090979'}
                        size={height*0.025}
                        style={{ backgroundColor: '#E7E5DF' }}
                        onPress={handleReduce}

                    />
                    <Text>{capacity}</Text>
                    <IconButton
                        icon="plus"
                        iconColor={'#090979'}
                        size={height*0.025}
                        style={{ backgroundColor: '#E7E5DF' }}
                        onPress={handleAdd}

                    />
                </View>
                <Text style={styles.priceText}>{"₹ " + item.price + "99"}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    contentContainer: {
        paddingBottom: height * 0.02,
        alignItems: 'center',
        gap: width * 0.03,
    },
    flatList: {
        flex: 1,
        width: '100%',
        marginTop: 10
    },
    headerContainer: {
        width: width,
        height: height * 0.13,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: 'flex-start',
        zIndex: 2
    },
    headerText: {
        left: width * 0.07,
        fontSize: width * 0.07,
        marginBottom: 10,
        color: 'white',
        fontWeight: '500'
    },
    cartItemContainer: {
        width: width * 0.9,
        // elevation: 2,
        borderWidth:0.2,
        borderColor: 'black',
        height: height * 0.2,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 20,
        flexDirection: 'row',
        gap: width * 0.04
    },
    img: {
        width: width * 0.35, height: height * 0.17, borderRadius: 20, left: width * 0.02

    },
    productInfoConatiner: {
        width: width * 0.45,
        // borderWidth: 1,
        borderColor: 'black',
        height: height * 0.17,
        gap: 2




    },
    productTitle: {
        fontSize: width * 0.04,
        fontWeight: '500',

    },

    quantityButton: {

    //    borderWidth:1,
        borderColor: 'black',
        width: width * 0.45,
        height: height * 0.06,
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center'
    },

    checkout: {
        width: width,
       elevation:2,
        borderColor: 'black',
        height: height * 0.17,
        borderRadius:20,
       justifyContent:'center',
       alignItems:'center',
        bottom: 5

    },
    priceText: {
        fontSize: width * 0.04,
        alignSelf: 'flex-start',
        fontWeight: '500',
        padding:2,
        
        backgroundColor: '#433eb6',
        paddingHorizontal: width * 0.04,
        color: 'white',
        borderRadius: 5,
        elevation: 3

    },
    checkoutInfoContainer: {
        width: width * 0.92,
        height: height * 0.14,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: 'black',
        backgroundColor: '#E7E5DF',
       marginBottom:5,
        borderRadius: 10,
        elevation: 1,
        gap: width * 0.05
      },
      totalPriceContainer:{
        width: width * 0.42, height: height * 0.09,
        // borderWidth:1,
        borderColor:'black',
        alignItems:'center'
        
      }

});

export default Cart;
