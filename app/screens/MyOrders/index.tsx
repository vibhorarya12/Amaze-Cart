import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useState } from "react";
import { View , Text, StyleSheet , Dimensions, FlatList, Button} from "react-native";
import { useSelector } from "react-redux";
import { URL } from "../../constants";
import { useFocusEffect } from "@react-navigation/native";

const {width , height} = Dimensions.get('window');
const color = ["#090979", "#433eb6", "#433eb6"];

const MyOrders =()=>{
    const {token} = useSelector(state=>state.auth);
    const [loading , setLoading] = useState(false);
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

    return(<View style={styles.container}>
        <LinearGradient
                style={styles.headerContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={color}
            >
                <Text style={styles.headerText}>Orders</Text>
            </LinearGradient>
            <Button  title="show" onPress={()=>console.log(order)}/>
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
        fontFamily:'RobotoSlab_semiBold'
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
        marginTop: 10
    },
})

export default MyOrders;

