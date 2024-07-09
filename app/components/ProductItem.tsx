import { Dimensions, StyleSheet, View, Image, Text } from "react-native";
import { StarRatingDisplay } from 'react-native-star-rating-widget';

const { width, height } = Dimensions.get('window');

const ProductItem = ({ item }) => {
    return (<View style={styles.constainer}>
        <Image resizeMode={"cover"} source={{ uri: item.images[0] }} style={styles.img} />

        <Text style={styles.title}>{item.title + "\n" + "₹" + item.price + "99"}</Text>

        <StarRatingDisplay
            rating={3.5}
            style={{alignSelf:'flex-start', paddingLeft:5}}
            starSize={width * 0.055}
            starStyle={{ width: width * 0.03, paddingBottom: 10 }}
            color="#FFA400"

        />

    </View>)
}



const styles = StyleSheet.create({
    constainer: {

        borderColor: 'grey',
        width: width * 0.45,
        // height:width*0.75,
        borderRadius: 10,
        borderWidth: 0.3,

        alignItems: 'center'

    },
    img: {
        width: '100%',
        height: width * 0.5,
        borderRadius: 10,

    },

    title: {
        fontSize: width * 0.035,
        alignSelf: 'flex-start',
        fontWeight: '500',
        marginLeft: width * 0.03,
        marginBottom: 10,
        paddingHorizontal: width * 0.04
        // padding:width*0.04
    },
    priceText: {


    }

})
export default ProductItem;
