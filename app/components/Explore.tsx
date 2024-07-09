import { StyleSheet, View, Dimensions ,Text } from "react-native"
import { Sample_Products_Data } from "../../assets/SampleData/Products";
import ProductItem from "./ProductItem";

const { width, height } = Dimensions.get('window');

const Explore = ()=>{
    return(<View style={styles.container}>
        <Text style={styles.textStyle}>Explore more products</Text>
        <View style={styles.ProductsContainer}>
            {Sample_Products_Data.map((item)=>{ return(<ProductItem  key={item.id} item= {item} />)})}
        </View>

    </View>)
}


const styles = StyleSheet.create({
     container:{
        width:width,
        // borderWidth:1, 
        borderColor:'red',
        alignItems:'center'
        
        

     },
     textStyle:{
        fontSize:width*0.055,
        fontWeight:'600',
        color:"#433eb6",
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: -1, height: -1 },
        textShadowRadius: 0.6,
        left:width*0.05,
        alignSelf:'flex-start'
        
      
       
     },
     ProductsContainer:{
        width:width*0.95,
       marginTop:5,
        // borderWidth:1, 
        borderColor:'black',
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        
        gap:width*0.04
     }
})


export default Explore;