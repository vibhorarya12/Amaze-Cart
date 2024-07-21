import { View ,Text, Button, StyleSheet, Dimensions, FlatList} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/ProductItem";
import { clearWishList, getWishListProducts, removeFromWishList } from "../../../redux/Actions/productActions";
import { LinearGradient } from "expo-linear-gradient";
import { ProductServices } from "../../../redux/ApiServices";
const { width, height } = Dimensions.get('window');

const color = ["#090979", "#433eb6", "#433eb6"];

const Wishlist = ({navigation})=>{
    const wishListItems = useSelector(state=> state.products.wishList);
    const {token} = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    
    return (<View style={styles.Conatiner}>
        <LinearGradient
            style={styles.headerContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={color}
        ><Text style={{color:'white'}}>Wishlist</Text></LinearGradient>
            <Button title="remove all" onPress={()=>dispatch(getWishListProducts(token)) }/>
       {<FlatList style={{marginTop:5}} data={wishListItems} keyExtractor={(item) => item._id}
            renderItem={({ item }) => <ProductItem item={item} navigation = {navigation} />}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={{ gap: width * 0.04 }}
        />}

        
    </View>)
}


const styles = StyleSheet.create({
    Conatiner: {
        flex: 1,

        alignItems: 'center'
    },
    contentContainer: {

        justifyContent: 'center',
       alignItems:'flex-start',
        gap: width * 0.04

    },
    headerContainer: {
        width: width,
        height: height * 0.08,
      
      
        display: "flex",
        flexDirection: "row",

        alignItems: "flex-end",
        zIndex:2
    }
})
export default Wishlist;