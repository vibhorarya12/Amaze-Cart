import { ScrollView, StyleSheet, Dimensions } from "react-native";
import { View, Text } from "react-native-animatable"
import { removeItem } from "../../Utils/utils";
import { LinearGradient } from "expo-linear-gradient";
import { Avatar } from "react-native-paper";
import { Avatar_Img } from "../../../assets/Images";
import { Button } from "react-native-paper";

const { width, height } = Dimensions.get('window');
const color = ["#C8C9BE", "#C3C1BB"];

const Profile = () => {
    
    return (<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={color} style={styles.profileContainer}>
            <Avatar.Image style={styles.avatar} size={width * 0.27} source={Avatar_Img} />
            <Text style={styles.nameText}>Hey Vibhor !</Text>
            <Button  style={styles.Btn} icon="truck-fast-outline" mode="contained" onPress={() => console.log('Pressed')}>
                My orders
            </Button>
            <Button  style={[styles.Btn,{top: height * 0.13 }]} icon="logout" mode="contained" onPress={() => removeItem("onboarded")}>
               Log out
            </Button>
        </LinearGradient>




    </ScrollView>)
}


const styles = StyleSheet.create({
    container: {
        flex: 1

    },
    contentContainer: {
        paddingTop: height * 0.2,
        justifyContent: 'center',
        alignItems: 'center',

    },
    profileContainer: {
        width: width * 0.89,
        height: height * 0.6,
        // borderWidth:2,
        // borderColor:'#433eb6',
        borderRadius: 25,

        alignItems: 'center'

    },
    avatar: {
        position: 'absolute',
        top: -height * 0.05,
        zIndex: 2,
        alignSelf: 'center',

    },
    nameText: {
        top: height * 0.1,
        fontSize: width * 0.05,
        fontFamily: 'RobotoSlab_semiBold'
    },
    Btn:{
        backgroundColor:'#433eb6',
        top: height * 0.12 ,
        width:width*0.5,
        height:height*0.06,
         elevation:5
    }
})

export default Profile;
