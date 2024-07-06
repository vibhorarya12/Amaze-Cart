import { View, Text, Dimensions, StyleSheet, ScrollView , StatusBar} from "react-native"
import CustomTab from "../../components/CustomTab";

const { width, height } = Dimensions.get('window');
const sh = StatusBar.currentHeight;
const Home = () => {

    return (<><ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text>
            This is Home
        </Text>

        
    </ScrollView><CustomTab/></>)
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