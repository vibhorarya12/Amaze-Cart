import { View, Dimensions, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import CategoryItems from "../../components/Categoryitems";
import Explore from "../../components/Explore";

const { width, height } = Dimensions.get('window');

const Home = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <Header />
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Banner />
                <CategoryItems />
                <Explore/>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingTop:height * 0.12,
        paddingBottom: height * 0.1,
        justifyContent:'center'
    },
});

export default Home;
