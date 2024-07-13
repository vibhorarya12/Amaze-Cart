import React from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { Category_four, Category_one, Category_three, Category_two } from "../../assets/Images";
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const colors = ["#090979", "#433eb6"];
const Items = [
    { img: Category_one, text: 'Clothes' },
    { img: Category_two, text: 'Shoes' },
    { img: Category_three, text: 'Electronics' },
    { img: Category_four, text: 'Furniture' },

];



const CategoryItem = ({ img, text , navigation}) => {
    // const navigation = useNavigation();
   
   return(<TouchableOpacity onPress={() => navigation.navigate('Category', { category: text })}  activeOpacity={0.95} style={{ marginTop: height * 0.02 }}>
        <LinearGradient colors={colors} style={styles.itemContainer}>
            <Image source={img} style={styles.image} resizeMode={"contain"} />
            <Text style={styles.itemText}>{text}</Text>
        </LinearGradient>
    </TouchableOpacity>)
};

const CategoryItems = ({navigation}) => {
    return (
        <View>
            <Text style={styles.textStyle}>Shop by category</Text>
            <View style={styles.container}>
                {Items.map((item, index) => (
                    <CategoryItem key={index} img={item.img} text={item.text} navigation={navigation} />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: width * 0.025,
        flexWrap: 'wrap',
        marginTop: height * 0.01,
    },
    itemContainer: {
        width: width * 0.45,
        height: height * 0.2,
        borderRadius: 10,
        elevation: 10,
    },
    image: {
        width: '100%',
        height: height * 0.23,
        zIndex: 1,
        bottom: 0,
        position: 'absolute',
        right: 0,

    },
    itemText: {
        position: 'absolute',
        fontSize: width * 0.05,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        zIndex: 2,
        bottom: 0,
        alignSelf: 'center',
        fontWeight: '400',
        fontStyle: 'italic'
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
});

export default CategoryItems;
