import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, Dimensions, FlatList, Image, Alert, Button } from "react-native";
import { IconButton } from "react-native-paper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart } from "../../../redux/Actions/productActions";

const { width, height } = Dimensions.get('window');

const color = ["#090979", "#433eb6", "#433eb6"];

const Cart = ({ navigation }) => {
    const dispatch = useDispatch();
    const cartData = useSelector((state:any) => state.products.cartItems);
    const [checkoutData, setCheckoutData] = useState([]);
    

    useEffect(() => {
        // setCheckoutData(cartData.map((item:any) => ({ productId: item._id, price: item.price, quantity: 1 })));
        setCheckoutData(cartData.map((item:any) => ({...item, quantity:1 })));
    }, [cartData]);

    const handleQuantity = (productId:string, quantity:number) => {
        setCheckoutData(prevData => 
            prevData.map(item => 
                productId === item._id ? { ...item, quantity: quantity } : item
            )
        );
    };

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
                data={checkoutData}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <CartItems handleQuantity={handleQuantity} item={item} />}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            />
           {cartData.length===0?null:<View style={styles.checkoutInfoContainer}>
                <View style={{ borderColor:'black', width: width * 0.45, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{ fontSize: width * 0.042, fontWeight: '600', fontFamily: 'RobotoSlab_semiBold' }}>{`Sub total (${checkoutData.reduce((sum, item)=> sum + item.quantity,0)} items)`}</Text>
                    <IconButton
                        icon="arrow-right"
                        iconColor={'#433eb6'}
                        size={height * 0.05}
                        style={{ alignSelf:'flex-start' }}
                        onPress={() => navigation.navigate('Checkout',{checkoutData})}                        
                    />
                </View>
                <View style={styles.totalPriceContainer}>
                    <Text style={{ fontSize: width * 0.05, fontWeight: '600', fontFamily: 'RobotoSlab_semiBold' }}>
                      {"₹" + checkoutData.reduce((sum, item) => sum + item.price * item.quantity, 0)}
                    </Text>
                    <Text style={{ fontSize: width * 0.035, opacity: 0.5 ,fontFamily: 'RobotoSlab_regular' }}>{"(excluding shipping charges)"}</Text>
                </View>
            </View>}
        </View>
    );
};

const CartItems = ({ item, handleQuantity }) => {
    const [capacity, setCapacity] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
       console.log('updated....');
    }, [item]);

    const handleAdd = () => {
        
        handleQuantity(item._id, item.quantity+1);
    };

    const handleReduce = () => {
        if (item.quantity === 1) {
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
                        onPress: () => {
                            dispatch(removeFromCart(item));
                            handleQuantity(item._id, 0); // Remove the item from checkoutData
                        }
                    }
                ]
            );
        } else {
            // const newCapacity = capacity - 1;
            // setCapacity(newCapacity);
            handleQuantity(item._id, item.quantity - 1);
        }
    };

    return (
        <View style={styles.cartItemContainer}>
            <Image style={styles.img} resizeMode={"cover"} source={{ uri: item.images[0] }} />
            <View style={styles.productInfoConatiner}>
                <Text style={styles.productTitle}>{item.title.length > 28 ? item.title.substring(0, 25) + "..." : item.title}</Text>
                <View style={styles.quantityButton}>
                    <IconButton
                        icon={capacity === 1 ? "delete-outline" : "minus"}
                        iconColor={'#090979'}
                        size={height * 0.025}
                        style={{ backgroundColor: '#E7E5DF' }}
                        onPress={handleReduce}
                    />
                    <Text>{item.quantity}</Text>
                    <IconButton
                        icon="plus"
                        iconColor={'#090979'}
                        size={height * 0.025}
                        style={{ backgroundColor: '#E7E5DF' }}
                        onPress={handleAdd}
                    />
                </View>
                <Text style={styles.priceText}>{"₹ " + item.price}</Text>
                {/* <Text style={styles.priceText}>{"quantity : " + item.quantity}</Text> */}

            </View>
        </View>
    );
};

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
        fontFamily:'RobotoSlab_semiBold'
    },
    cartItemContainer: {
        width: width * 0.9,
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
        borderColor: 'black',
        height: height * 0.17,
        gap: 2
    },
    productTitle: {
        fontSize: width * 0.04,
        fontFamily:'RobotoSlab_semiBold'
    },
    quantityButton: {
        borderColor: 'black',
        width: width * 0.45,
        height: height * 0.06,
        flexDirection: 'row',
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
        elevation: 3,
        fontFamily:'RobotoSlab_regular'
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
    totalPriceContainer: {
        width: width * 0.42, height: height * 0.09,
        borderColor:'black',
        alignItems:'center'
    }
});

export default Cart;
