import { View, Text, Dimensions, StyleSheet, ScrollView, StatusBar, Button, Image } from "react-native"

import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import Banner from "../../components/Banner";

const { width, height } = Dimensions.get('window');


const Home = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <Header />
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Banner/>
                
            </ScrollView></View>)
}


const styles = StyleSheet.create({
    container: {
        
        borderColor: 'red',
    },
    contentContainer: {

        borderColor: 'red',
        height: height,
       
        width: width,
        alignItems:'center',
        


    }
})


export default Home;