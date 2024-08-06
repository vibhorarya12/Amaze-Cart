import { View , Text , TouchableOpacity, Image , StyleSheet , Dimensions} from "react-native"
import { error_img } from "../../assets/Images";

const { width, height } = Dimensions.get('window');

const ErrorView = ({handleClick}) =>{


     return(
        <View style={styles.errorImageContainer}>
      <Image resizeMode={'contain'}  source={error_img} style={{ width: width * 0.3, height: height * 0.15 }} />
      <Text style={{ fontSize: width * 0.046, fontFamily: 'RobotoSlab_regular', color: "#433eb6",}}>Something went wrong</Text>
      <TouchableOpacity onPress={()=> handleClick()} style={styles.retryButton}>
      <Text style={{ fontSize: width * 0.04, fontFamily: 'RobotoSlab_regular', color: "#433eb6"}}>
         Retry
      </Text>
      </TouchableOpacity>
      </View>
     )
}
const styles = StyleSheet.create({
    errorImageContainer: {
        width: width*0.8,
        height: height * 0.35,
      
        borderColor:'black',
        // borderWidth:1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    retryButton:{
      borderColor:'#433eb6',
      borderWidth:1,
      width :  width*0.35,
      height: height*0.045,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:20
      
    }
})

export default ErrorView;