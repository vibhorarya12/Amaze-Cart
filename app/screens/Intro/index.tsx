import Onboarding from 'react-native-onboarding-swiper';
import { Intro_img_one, Intro_img_three, Intro_img_two } from '../../../assets/Images';
import { Button, Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const { width, height } = Dimensions.get('screen');


const Intro = () => {
 
  const boardingItems = [  {
     img: Intro_img_two,
     text: "Elevate your wardrobe with trendy clothing"

  } ,
     {img: Intro_img_one,
     text: "Step up with stylish footwear"

  } ,
     {img:Intro_img_three,
     text: "Upgrade your tech with top electronics",
     btn : <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>  {"Shop now"} </Text></TouchableOpacity>

  } ,

]

  return (<View style={styles.container}>
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
         <Text style={styles.text}>{item.text} </Text>
         {item.btn?item.btn:null}
        </ImageBackground>
      )}
    />
  </View>)


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
    fontWeight: '600', 
    color: 'white', 
    elevation: 5, 
    opacity: 0.9, 
    left: width * 0.08,
    right:width * 0.08,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    
  },
  button:{
     position:'absolute',
     width : width*0.5,
     height : width*0.12,
     backgroundColor : '#E6AE08',
     justifyContent:'center',
     alignItems:'center',
     alignSelf:'center',
     top:height*0.25,
     borderRadius:17,
     elevation:5
  },
  buttonText:{
    fontSize : width*0.043,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1

  }
});

export default Intro;