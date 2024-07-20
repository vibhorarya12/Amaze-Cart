import { View ,Text, Button} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/ProductItem";
import { removeFromWishList } from "../../../redux/Actions/productActions";


const Wishlist = ({navigation})=>{
    const wishListItems = useSelector(state=> state.products.wishList);
    const dispatch = useDispatch();
    const token = useSelector(state=>state.auth.token);

    return(<View style={{justifyContent:'center', flex:1, alignItems:'center'}}>
       
         {wishListItems.map((item,index)=>{
            return (<View key={index} style={{width:300, height:150, borderColor:'black', borderWidth:1, paddingBottom:5}}> 
                    <Text>{item.title}</Text>
                    <Button title="remove" onPress={()=>dispatch(removeFromWishList(item._id,token))} />
                 </View>)
         })}
    </View>)
}
export default Wishlist;