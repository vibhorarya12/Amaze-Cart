import { View, Dimensions, StyleSheet, ScrollView , Image} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import CategoryItems from "../../components/Categoryitems";
import Explore from "../../components/Explore";
import { Sale_img } from "../../../assets/Images";

const { width, height } = Dimensions.get('window');

const Home = ({navigation}) => {
    // const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <Header navigation= {navigation} />
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
              
                <Banner />
                <CategoryItems navigation = {navigation} />
                <Explore navigation={navigation}/>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        // paddingTop:height * 0.12,
        paddingBottom: height * 0.1,
        justifyContent:'center'
    },
   
});

export default Home;
