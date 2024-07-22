import { View, Text, StyleSheet, FlatList, Dimensions , Image} from "react-native"
import { Sample_Products_Data } from "../../../assets/SampleData/Products";
import ProductItem, { SkeletonList } from "../../components/ProductItem";
import Header from "../../components/Header";
import { LinearGradient } from "expo-linear-gradient";
import { useState , useEffect} from "react";
import { URL } from "../../constants";
import axios from "axios";
import { IconButton } from "react-native-paper";
import { Sale_img } from "../../../assets/Images";
const { width, height } = Dimensions.get('window');
const color = ["#090979", "#433eb6", "#433eb6"];

const Category = (props) => {
 
    const { category } = props.route.params;
    const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleRequest = async()=>{
     setLoading(true);
     try{
            const response = await axios.get(`${URL}/products/category/${category}`);
           
            setItems(response.data);

     }
     catch(err){
        console.log(err);
     }
     finally{
        setLoading(false);
     }

  }

  useEffect(()=>{
       handleRequest();

  },[category])
  

    return (<View style={styles.Conatiner}>
        {/* <LinearGradient
            style={styles.headerContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={color}
        ><Text style={{color:'white'}}>{category}</Text></LinearGradient> */}

        <View style={styles.headerContainer}>
        <IconButton
          icon="keyboard-backspace"
          iconColor='#433eb6'
          size={height*0.025}
          style={{ backgroundColor: '#E7E5DF' }}
          onPress={() => props.navigation.goBack()}
        />
       <Image resizeMode={"contain"} source={Sale_img} style={styles.salesImage} />
        <IconButton
          icon="filter"
          iconColor='#433eb6'
          size={height*0.025}
          style={{ backgroundColor: '#E7E5DF' }}
          onPress={() => console.log('')}
        />
        </View>
        
        
       {loading?<SkeletonList/>:<FlatList style={{marginTop:5}} data={items} keyExtractor={(item) => item._id}
            renderItem={({ item }) => <ProductItem item={item} navigation = {props.navigation} />}
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
        width: width*0.95,
        height: height * 0.06,
        marginBottom:height*0.065,

      justifyContent:'space-between',
        top:height*0.06,
        display: "flex",
        flexDirection: "row",
       alignItems:'center',
        
        zIndex:2,
        backgroundColor:'transparent',
        borderRadius:15,
        borderWidth:0.2,
       
    },
    salesImage:{
      width:width*0.4,
      height:height*0.05,
      
  }
  
})
export default Category;