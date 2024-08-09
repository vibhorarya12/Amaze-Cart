import Onboarding from 'react-native-onboarding-swiper';
import { Intro_img_one, Intro_img_three, Intro_img_two } from '../../../assets/Images';
import { Dimensions, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';


const { width, height } = Dimensions.get('window');

const color = ["#433eb6", "#090979"];



const Intro = () => {

  const navigation = useNavigation();



  const boardingItems = [{
    img: Intro_img_two,
    text: "Elevate your wardrobe with trendy clothing"

  },
  {
    img: Intro_img_one,
    text: "Step up with stylish footwear"

  },
  {
    img: Intro_img_three,
    text: "Upgrade your tech with top electronics",
    

  },

  ]



  return (<SafeAreaView style={styles.container}>
    <StatusBar translucent={true} backgroundColor={'transparent'} />
    <View style={styles.imageContainer}>



      <SwiperFlatList

        // autoplay
        // autoplayDelay={3}
        // autoplayLoop={true}
        paginationStyle={{ bottom: height * 0.04, opacity: 0.7, position: 'absolute' }}
        
        index={0}
        showPagination
        data={boardingItems}
        renderItem={({ item }) => (
          <View style={[styles.imageContainer, {backgroundColor:'black'}]}>
          <Image style={styles.imageStyle} resizeMode={'cover'} source={item.img} />
          <Text style={styles.text}>
            {item.text}
          </Text>
          </View>
        )}
      />

    </View>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')} >
      <LinearGradient
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        colors={color}
        style={styles.gradientBtn}
      >

        <Text style={styles.buttonText}>Shop now</Text>
      </LinearGradient></TouchableOpacity>
  </SafeAreaView>)


}


const styles = StyleSheet.create({
  container: { flex: 1, 
    backgroundColor: '#E8E2E2'  , gap:height*0.06},

  imageContainer: {
    width: width,
    height: height * 0.89,
    justifyContent: 'center',
    backgroundColor: '#E8E2E2',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    // elevation: 2
  },
  text: {
    position: 'absolute',
    top: height * 0.08,
    fontSize: width * 0.07,

    color: '#F4F4F4',
    elevation: 5,
  
    left: width * 0.08,
    right: width * 0.08,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontFamily: 'RobotoSlab_regular'
  },
  button: {
    

    //  backgroundColor : '#E6AE08',
    justifyContent: 'center',

    alignSelf: 'center',
   
    borderRadius: 20,
    elevation: 5,
    // borderWidth: 0.6,
    

  },

  gradientBtn: {
    width: width * 0.9,
    height: width * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,


  },

  buttonText: {
    fontSize: width * 0.046,
    color: 'white',
   
    fontFamily: 'RobotoSlab_semiBold'

  },
  imageStyle: {
    width: width,
    height: height * 0.89,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    opacity:0.8
    
  }
});

export default Intro;