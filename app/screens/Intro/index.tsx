import Onboarding from 'react-native-onboarding-swiper';
import { Intro_img_one, Intro_img_three, Intro_img_two } from '../../../assets/Images';
import { Button, Dimensions, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('screen');

const color = ["#433eb6","#090979"];



const Intro = () => {

  const navigation = useNavigation();
 
  const boardingItems = [  {
     img: Intro_img_two,
     text: "Elevate your wardrobe with trendy clothing"

  } ,
     {img: Intro_img_one,
     text: "Step up with stylish footwear"

  } ,
     {img:Intro_img_three,
     text: "Upgrade your tech with top electronics",
     btn : <TouchableOpacity  style={styles.button}  onPress={()=>navigation.navigate('Login')} > 
     <LinearGradient 
     start={{x: 0, y: 0}} end={{x: 1, y: 0}}
     colors={color}
     style={styles.gradientBtn}
     >

      <Text style={styles.buttonText}>Shop Now</Text>
     </LinearGradient></TouchableOpacity>
    
  } ,

]

  return (<SafeAreaView style={styles.container}>
     <StatusBar translucent={true} backgroundColor={'transparent'} />
    <SwiperFlatList

      // autoplay
      // autoplayDelay={2}
      // autoplayLoop={true}
      paginationStyle={{ bottom:height*0.04,  opacity: 0.7 , position:'absolute'}}
       
      index={0}
      showPagination
      data={boardingItems}
      renderItem={({ item }) => (
        <ImageBackground  imageStyle={{opacity:0.7, resizeMode:'cover'}} style={styles.child} source={item.img} >
         <Animatable.Text  animation={'fadeInDown'} iterationCount={1} duration={2000} style={styles.text}>{item.text} </Animatable.Text>
         {item.btn?item.btn:null}
        </ImageBackground>
      )}
    />
  </SafeAreaView>)


}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  child: {
    width: width, 
    height: height,
    justifyContent: 'center',
  },
  text: {
    position: 'absolute', 
    top: height * 0.08, 
    fontSize: width * 0.07, 
  
    color: '#F4F4F4', 
    elevation: 5, 
    opacity: 0.9, 
    left: width * 0.08,
    right:width * 0.08,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontFamily:'RobotoSlab_regular'
  },
  button:{
     position:'absolute',
    
    //  backgroundColor : '#E6AE08',
     justifyContent:'center',
     
     alignSelf:'center',
     top:height*0.25,
     borderRadius:17,
     elevation:5,
     borderWidth:0.6,
     borderColor:'white'
     
  },

   gradientBtn:{
    width : width*0.5,
     height : width*0.12,
     justifyContent:'center',
     alignItems:'center',
     borderRadius:17,
    

   },

  buttonText:{
    fontSize : width*0.043,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontFamily:'RobotoSlab_regular'

  }
});

export default Intro;