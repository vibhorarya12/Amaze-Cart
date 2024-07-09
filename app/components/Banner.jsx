import { Dimensions, Image, StyleSheet, View } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import {
  Ban_img,
  Ban_img_1,
  Ban_img_2,
  Ban_img_3,
  Ban_img_4,
} from "../../assets/Images";

const { width, height } = Dimensions.get("window");

const items = [Ban_img_1, Ban_img, Ban_img_3, Ban_img_4];

const Banner = () => {
  return (
    <View style={styles.container}>
      <SwiperFlatList
        index={0}
        showPagination
        data={items}
        autoplay
        autoplayDelay={3}
        autoplayLoop={true}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image
              style={styles.image}
              source={item}
              resizeMode={"contain"}
            />
          </View>
        )}
        paginationStyleItem={styles.paginationDot}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height * 0.25, 
    elevation: 5,
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
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
});

export default Banner;
