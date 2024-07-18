import { ScrollView, StyleSheet, Dimensions , Image} from "react-native";
import { View, Text } from "react-native-animatable"
import { removeItem } from "../../Utils/utils";
import { LinearGradient } from "expo-linear-gradient";
import { Avatar } from "react-native-paper";
import { Avatar_Img, Login_img } from "../../../assets/Images";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/Actions/authActions";
import { useEffect } from "react";

const { width, height } = Dimensions.get('window');
const color = ["#C8C9BE", "#C3C1BB"];

const Profile = ({ navigation }) => {
    const dispatch = useDispatch();
  
    const {token , loading , guestLogin , name}  = useSelector((state) => state.auth);

    useEffect(()=>{
        if(token.length===0){
            alert('please login first');
         }


    },[token])
     

    return (<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

 
        {token.length===0?<View style={[styles.profileContainer, { borderWidth: 0.4, borderColor: 'black', justifyContent: 'center' , gap:height*0.03}]}>
            <Image style={{height:height*0.35, width:width*0.55}}  source ={Login_img} />
            <Text style={{
                fontSize: width * 0.06,
                fontFamily: 'RobotoSlab_semiBold', color: '#433eb6'
            }}>
                Your are not logged in !!
            </Text>
            <Button onPress={() => navigation.navigate('AuthNav')} style={[styles.Btn,{top: 0 }]} icon="logout" mode="contained" >
              Login now
            </Button>

        </View>: <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={color} style={styles.profileContainer}>
            <Avatar.Image style={styles.avatar} size={width * 0.27} source={Avatar_Img} />
            <Text style={styles.nameText}>{`Hey ${name} !`}</Text>
            <Button  style={styles.Btn} icon="truck-fast-outline" mode="contained" onPress={() => console.log("")}>
                My orders
            </Button>
            <Button onPressIn={()=>dispatch(logout())} style={[styles.Btn,{top: height * 0.13 }]} icon="logout" mode="contained" onPress={() => removeItem("onboarded")}>
               Log out
            </Button>


        </LinearGradient> }
        

        




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
    Btn: {
        backgroundColor: '#433eb6',
        top: height * 0.12,
        width: width * 0.5,
        height: height * 0.06,
        elevation: 5
    }
})

export default Profile;
