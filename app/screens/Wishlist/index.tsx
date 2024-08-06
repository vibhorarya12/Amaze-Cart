import React, { useCallback, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductItem, { SkeletonList } from "../../components/ProductItem";
import { getWishListProducts } from "../../../redux/Actions/productActions";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";
import { IconButton } from "react-native-paper";

const { width, height } = Dimensions.get('window');
const color = ["#090979", "#433eb6", "#433eb6"];


const Wishlist = ({ navigation }) => {
    const { wishList, loading } = useSelector(state => state.products);
    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            console.log('is focused !!!')
            dispatch(getWishListProducts(token));
        }
    }, [isFocused, dispatch, token]);

    const renderItem = useCallback(({ item }) => (
        <ProductItem item={item} navigation={navigation} />
    ), [navigation]);

    const keyExtractor = useCallback((item) => item._id, []);

    const memoizedWishList = useMemo(() => wishList, [wishList]);


    return (
        <View style={styles.Container}>
            <LinearGradient
                style={styles.headerContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={color}
            >
                <IconButton
                    icon="keyboard-backspace"
                    iconColor='#433eb6'
                    size={width * 0.042}
                    style={{ backgroundColor: '#E7E5DF' }}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.headerText}>Wishlist</Text>
            </LinearGradient>

            {loading ? <SkeletonList /> : <FlatList
                style={{ marginTop: 5 }}
                data={memoizedWishList}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                columnWrapperStyle={{ gap: width * 0.04 }}
            />}
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center'
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: width * 0.04
    },
    headerText: {
        left: width * 0.3,
        fontSize: width * 0.054,
        marginBottom: 10,
        color: 'white',
        fontFamily: 'RobotoSlab_regular',
    },
    headerContainer: {
        width: width,
        height: height * 0.13,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: 'flex-start',
        zIndex: 2
    },
});

export default React.memo(Wishlist);