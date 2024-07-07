import { View, Text, Dimensions, StyleSheet, ScrollView , StatusBar, Button} from "react-native"
import CustomTab from "../../components/CustomTab";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');
const sh = StatusBar.currentHeight;

const Home = () => {
    const navigation = useNavigation();

    return (<><ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text>
            This is Home
        </Text>
           
        
    </ScrollView></>)
}


const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: 'red',
    },
    contentContainer: {
        borderWidth: 2,
        borderColor: 'red',
        height: height,
        position:'absolute',
        width:width,
        

    }
})


export default Home;