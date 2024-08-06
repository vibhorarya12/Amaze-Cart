import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, Button, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { URL } from "../../constants";
import { useFocusEffect } from "@react-navigation/native";
import { Icon, IconButton } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay";
import ErrorView from "../../components/ErrorView";

const { width, height } = Dimensions.get('window');
const color = ["#090979", "#433eb6", "#433eb6"];

const MyOrders = ({ navigation }) => {
  const { token } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(false);
  const [order, setOrders] = useState([]);
  const [error, setError] = useState(false);

  const fetchOrders = useCallback(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await axios.post(`${URL}/order/getOrdersByUser`, { token });
        // console.log(res.data.message);
        setOrders(res.data.orders);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);



  useFocusEffect(fetchOrders);

  return (<View style={styles.container}>
    <LinearGradient
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
      <Text style={styles.headerText}>Orders</Text>
    </LinearGradient>
    {/* <Button  title="show" onPress={()=>console.log(order)}/> */}
    <Spinner textContent="" visible={loading} color={color[0]} />
    {error && order.length ===0 ?<ErrorView handleClick={fetchOrders} />:<FlatList
      style={styles.flatList}
      data={order}
      keyExtractor={(item: string) => item._id}
      renderItem={({ item }) => <OrderItems item={item} key={item._id} navigation={navigation} />}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    /> }

  {order.length ===0 && !error && !loading ?<View style={styles.emptyContainer}>
      <Icon
        source="database-alert"
        color={color[0]}
        size={width * 0.3}
      />
      <Text style={{
        fontSize: width * 0.056, color: color[0],
        fontFamily: 'RobotoSlab_regular'
      }}>No orders yet</Text>
    </View> : null}

  </View>)
}



const OrderItems = ({ item, navigation }) => {

  const image_url = item.products[0].productId.images[0];
  const quantity = item.products.reduce((sum, item) => sum + item.quantity, 0)
  // console.log(quantity);

  return (<TouchableOpacity onPress={() => navigation.navigate('ViewOrder', { orderDetails: item })
  } activeOpacity={0.8} style={styles.orderItemContainer}>
    <Image resizeMode={'cover'} style={styles.orderImage} source={{ uri: image_url }} />
    <View style={styles.infoContainer}>
      <Text style={{ fontSize: width * 0.037, fontFamily: 'RobotoSlab_semiBold', marginTop: 5 }}>{'OrderID\n' + item._id}</Text>
      {item.paymentData.paymentId !== '' && (item.paymentData.paymentStatus === 'Pending' || item.paymentData.paymentStatus === 'Failed') ? <Text style={{ fontSize: width * 0.038, color: '#FA4B4B', fontFamily: 'RobotoSlab_semiBold' }}>
        Payment failed
      </Text> : <Text style={{ fontSize: width * 0.038, color: 'green', fontFamily: 'RobotoSlab_semiBold' }}>
        Processed
      </Text>}


      <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }}>
        {'item(s): ' + quantity}
      </Text>
      <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }}>
        {'₹ ' + item.amount}
      </Text>
    </View>

  </TouchableOpacity>)
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  headerText: {
    left: width * 0.3,
    fontSize: width * 0.054,
    marginBottom: 10,
    color: 'white',
    fontFamily: 'RobotoSlab_regular',
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
  contentContainer: {
    paddingBottom: height * 0.02,
    alignItems: 'center',
    gap: width * 0.03,

  },
  flatList: {
    flex: 1,
    width: '100%',
    marginTop: 10,

  },
  orderItemContainer: {
    width: width * 0.97,
    height: height * 0.2,
    borderWidth: 0.6,
    borderColor: 'grey',
    flexDirection: 'row',
    borderRadius: 18,
    alignItems: 'center',



  },
  orderImage: {
    width: width * 0.35, height: height * 0.18,
    borderRadius: 10,
    marginLeft: width * 0.03,

  },
  infoContainer: {
    width: width * 0.55,
    height: height * 0.18,
    marginLeft: 5,
    borderColor: 'black',
    gap: 5


  },
  emptyContainer: {
    width: width * 0.8,
    height: height * 0.3,
    borderColor: 'black',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default MyOrders;