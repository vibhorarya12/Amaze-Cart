import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, Button, Image } from "react-native";
import { useSelector } from "react-redux";
import { URL } from "../../constants";
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');
const color = ["#090979", "#433eb6", "#433eb6"];

const MyOrders = () => {
  const { token } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(false);
  const [order, setOrders] = useState([]);


  const fetchOrders = useCallback(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.post(`${URL}/order/getOrdersByUser`, { token });
        console.log(res.data.message);
        setOrders(res.data.orders);
      } catch (error) {
        console.log(error);
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
      <Text style={styles.headerText}>Orders</Text>
    </LinearGradient>
    {/* <Button  title="show" onPress={()=>console.log(order)}/> */}
    <FlatList
      style={styles.flatList}
      data={order}
      keyExtractor={(item: string) => item._id}
      renderItem={({ item }) => <OrderItems item={item} key={item._id} />}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    />
  </View>)
}



const OrderItems = ({ item }) => {

  const image_url = item.products[0].productId.images[0];
  const quantity  =  item.products.reduce((sum, item)=> sum + item.quantity,0)
  console.log(quantity);

  return (<View style={styles.orderItemContainer}>
    <Image resizeMode={'cover'} style={styles.orderImage} source={{ uri: image_url }} />
    <View style={styles.infoContainer}>
      <Text style={{ fontSize: width * 0.037, fontFamily: 'RobotoSlab_semiBold', marginTop:5 }}>{'OrderID\n' + item._id}</Text>
     
      <Text style={{ fontSize: width * 0.035, fontFamily: 'RobotoSlab_semiBold' }}>
      {new Date(item.createdAt).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })}
      </Text>
      
      <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold' }}>
        {'item(s): ' + quantity}
      </Text>
      <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_semiBold'  }}>
        {'₹ ' + item.amount}
      </Text>
    </View>
  </View>)
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  headerText: {
    left: width * 0.07,
    fontSize: width * 0.06,
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
   marginLeft:5,
    borderColor: 'black',
    gap: 5


  }
})

export default MyOrders;