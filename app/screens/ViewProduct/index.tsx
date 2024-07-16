import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import * as Animatable from 'react-native-animatable';
import { StatusBar } from 'expo-status-bar';
import { Icon, IconButton } from 'react-native-paper';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { LinearGradient } from 'expo-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import { addToCart } from '../../../redux/Actions/productActions';
import { useDispatch, useSelector } from 'react-redux';


const color = ["#090979", "#433eb6", "#433eb6"];
const { width, height } = Dimensions.get('window');

const ViewProduct = (props) => {
  const dispatch = useDispatch();
  const cartData = useSelector((state:any)=> state.products.cartItems)

  const { productInfo } = props.route.params;
  const isFocused = useIsFocused();


  const handleCart = (item)=>{
       dispatch(addToCart(item));
  }

  const getFutureDate = (daysAhead) => {
    const today = new Date();
    today.setDate(today.getDate() + daysAhead);
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('en-US', options);
  };
  // Force re-render when screen is focused
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (isFocused) {
      setKey(prevKey => prevKey + 1);
    }
  }, [isFocused]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar backgroundColor='transparent' style={'auto'} />
      <ProductImageSwiper key={key} item={productInfo.images} />
      <Text style={styles.titleText}>{productInfo.title.split(' ').slice(0, 3).join(' ')}</Text>
      <View style={styles.ratingContainer}>
        <StarRatingDisplay
          rating={3.5}

          starSize={width * 0.055}
          starStyle={{ width: width * 0.03 }}
          color="#FFA400"

        />
        <Text style={{ fontSize: width * 0.04, fontWeight: '600',fontFamily:'RobotoSlab_semiBold' }}>3.5</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={{ fontSize: width * 0.05, fontWeight: '500' ,fontFamily:'RobotoSlab_semiBold'}} >{"₹" + productInfo.price + "99"}</Text>
        <Text style={{ fontSize: width * 0.035, opacity: 0.5 , fontFamily:'RobotoSlab_regular' }}>exclucing delivery charges</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text textBreakStrategy={'simple'} style={styles.descriptionText}>{productInfo.description}</Text>
      </View>
      <View style={styles.deliveryTextContainer}>
        <Icon
          source="truck-fast-outline"
          color={'#433eb6'}
          size={width * 0.08}
        />
        <Text style={{ fontSize: width * 0.037, fontWeight: '500',fontFamily:'RobotoSlab_regular' }}>Delivery by {getFutureDate(5)}</Text>
      </View>
  {cartData.includes(productInfo)? <View style={styles.priceContainer}>
      <Icon
          source="sticker-check-outline"
          color={'#433eb6'}
          size={width * 0.08}
        />
        <Text style={{ fontSize: width * 0.04, opacity: 0.7 }}>item added to cart</Text>
      </View> : <TouchableOpacity onPress={()=>handleCart(productInfo)} style={{ elevation: 5, left: width * 0.06, }}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={color} style={styles.btn}>
          <Icon
            source="cart-outline"
            color={'#F7F1F1'}
            size={width * 0.06}
          />
          <Text style={{
            fontSize: width * 0.04,
            color: 'white',
            fontFamily:'RobotoSlab_regular'
          }} >Add to cart</Text>
        </LinearGradient>
      </TouchableOpacity>}
       
      {/* <Spinner
        visible={true}
        color="#090979"
        size={50}
      /> */}

    </ScrollView>
  );
}

const ProductImageSwiper = ({ item }) => {
  const navigation = useNavigation();
  return (
    <Animatable.View animation={'fadeInDown'} duration={1000} style={styles.pageContainer}>
      <View style={styles.iconContainer}>
        <IconButton
          icon="keyboard-backspace"
          iconColor='#433eb6'
          size={30}
          style={{ backgroundColor: '#E7E5DF' }}
          onPress={() => navigation.goBack()}
        />
        <IconButton
          icon="heart"
          iconColor='#433eb6'
          size={30}
          style={{ backgroundColor: '#E7E5DF' }}
          onPress={() => console.log('Pressed')}
        />
      </View>
      <SwiperFlatList
        index={0}
        showPagination
        data={item}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image
              style={styles.image}
              source={{ uri: item }}
              resizeMode={'cover'}
            />
          </View>
        )}
        paginationStyleItem={styles.paginationDot}
      />
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  contentContainer: {

    paddingBottom: height * 0.03,
    justifyContent: 'center',

  },
  pageContainer: {
    width: width,
    height: height * 0.6,
    alignSelf: 'center',
    borderColor: 'red',


  },
  slide: {
    width: width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  image: {
    width: '100%',
    height: '100%',
    borderWidth: 0.1,
    borderColor: 'grey',

  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },

  iconContainer: {
    width: width,
    height: height * 0.06,

    borderColor: 'black',
    position: 'absolute',
    top: height * 0.06,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleText: {
    fontSize: width * 0.06,
    fontWeight: '600',
    left: width * 0.06,
    marginTop: height * 0.01,
    fontFamily:'RobotoSlab_semiBold'
  },
  ratingContainer: {
    width: width * 0.45,
    flexDirection: 'row',
    height: 35,
    gap: 10,
    left: width * 0.06,
    marginTop: height * 0.01,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.3,
    borderColor: 'black',
    borderRadius: 10
  },
  priceContainer: {
    marginTop: height * 0.02,
    width: width * 0.8,
    height: height * 0.065,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: 'black',
    backgroundColor: '#E7E5DF',
    left: width * 0.06,
    borderRadius: 10,
    elevation: 1,
    gap: width * 0.05
  },
  descriptionContainer: {
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',

    borderColor: 'black',

    marginTop: height * 0.02,
    left: width * 0.06
  },
  descriptionText: {
    fontSize: width * 0.037,
    fontFamily:'RobotoSlab_regular'
  },
  deliveryTextContainer: {
    flexDirection: 'row',

    borderColor: 'black',
    width: width * 0.6,
    left: width * 0.06,
    marginTop: height * 0.016,
    height: height * 0.065,
    gap: 5,
    alignItems: 'center'

  },
  btn: {
    width: width * 0.53,
    height: width * 0.13,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 7
  }

});

export default ViewProduct;
