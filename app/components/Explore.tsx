import { StyleSheet, View, Dimensions, Text } from "react-native"
import { Sample_Products_Data } from "../../assets/SampleData/Products";
import ProductItem, { ProductSkeleton, SkeletonList } from "./ProductItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../constants";

const { width, height } = Dimensions.get('window');

const Explore = ({navigation}) => {
   const [items, setItems] = useState([]);
   const [loading, setLoading] = useState(false);
   const handleRequest = async () => {
      setLoading(true);
      try {
         const response = await axios.get(`${URL}/products/category/Miscellaneous`);
         // console.log(response.data);
         setItems(response.data);

      }
      catch (err) {
         console.log(err);
      }
      finally {
         setLoading(false);
      }

   }

   useEffect(() => {
      handleRequest();

   }, [])



   return (<View style={styles.container}>
      <Text style={styles.textStyle}>Explore more products</Text>
      <View style={styles.ProductsContainer}>
         {loading ? <Loader /> : items.map((item) => { return (<ProductItem key={item._id} item={item} navigation={navigation} />) })}

      </View>

   </View>)
}


const Loader = () => {
   const skeletonArray = Array(4).fill(0);

   return (
      <>
         {skeletonArray.map((item, index) => (
            <ProductSkeleton key={index} />
         ))}
      </>

   );
};


const styles = StyleSheet.create({
   container: {
      width: width,
      // borderWidth:1, 
      borderColor: 'red',
      alignItems: 'center'



   },
   textStyle: {
      fontSize: width * 0.055,
      fontWeight: '600',
      color: "#433eb6",
      textShadowColor: 'rgba(0, 0, 0, 0.4)',
      textShadowOffset: { width: -1, height: -1 },
      textShadowRadius: 0.6,
      left: width * 0.05,
      alignSelf: 'flex-start'



   },
   ProductsContainer: {
      width: width * 0.95,
      marginTop: 5,
      // borderWidth:1, 
      borderColor: 'black',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',

      gap: width * 0.04
   }
})


export default Explore;