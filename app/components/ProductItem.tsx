import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, View, Image, Text, TouchableOpacity, FlatList } from "react-native";


import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { StarRatingDisplay } from 'react-native-star-rating-widget';

const { width, height } = Dimensions.get('window');
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const ProductItem = ({ item , navigation }) => {
    // const navigation = useNavigation();
    const truncatedTitle = item.title.length > 28 ? item.title.substring(0, 25) + "..." : item.title;
    return (<TouchableOpacity onPress={()=>navigation.navigate('ViewProduct', {productInfo:item})} activeOpacity={0.8} style={styles.constainer}>
        <Image resizeMode={"cover"} source={{ uri: item.images[0] }} style={styles.img} />
        <Text style={styles.title}>{truncatedTitle}</Text>
        <Text style={styles.priceText}>{"₹ " + item.price}</Text>
       <View style={{flexDirection:'row', gap:5,  borderColor
        :'black', alignSelf:'flex-start', justifyContent
        :'center',
       }}>
        
        <StarRatingDisplay
            rating={item.rating}
            style={{ alignSelf: 'flex-start', paddingLeft: 5 }}
            starSize={width * 0.055}
            starStyle={{ width: width * 0.03, paddingBottom: 10 }}
            color="#FFA400"

        />
        <Text style={{ fontSize: width * 0.04,  fontFamily: 'RobotoSlab_regular' }}>{Number(item.rating).toFixed(1)}
        </Text>
        </View> 

    </TouchableOpacity >)
}



export const ProductSkeleton = () => {
    return (<View style={styles.skltonContainer}>
        <ShimmerPlaceholder isReversed={true} style={styles.img} />
        <ShimmerPlaceholder isReversed={true} style={styles.skltnContent} />
    </View>)
}

export const SkeletonList = () => {
    const skeletonArray = Array(6).fill(0);

    return (
        <FlatList
            style={{ marginTop: 5 }}
            data={skeletonArray}
            keyExtractor={(item, index) => index.toString()}
            renderItem={() => <ProductSkeleton />}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={{ gap: width * 0.04 }}
        />
    );
};



const styles = StyleSheet.create({
    constainer: {

        borderColor: 'grey',
        width: width * 0.45,
        height: width * 0.8,
        borderRadius: 10,
        borderWidth: 0.3,
        display: 'flex',
        alignItems: 'center',
        gap: width * 0.01

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
        fontFamily:'RobotoSlab_semiBold',
        paddingHorizontal: width * 0.04,
        
        // padding:width*0.04
    },
    priceText: {
        fontSize: width * 0.035,
        alignSelf: 'flex-start',
       fontFamily:'RobotoSlab_semiBold',
        marginLeft: width * 0.03,
        backgroundColor: '#433eb6',
        paddingHorizontal: width * 0.04,
        color: 'white',
        borderRadius: 5,
        elevation: 3

    },
    skltonContainer: {

        width: width * 0.45,
        height: width * 0.8,
        borderRadius: 10,
        opacity: 0.8,
        display: 'flex',
        alignItems: 'center',
        gap: width * 0.04
    },
    skltnContent: {
        width: width * 0.37,
        height: height * 0.053,
        borderRadius: 7,
        alignSelf: 'flex-start',
        opacity: 0.6,


    },
    contentContainer: {

        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: width * 0.04

    },

})
export default ProductItem;
