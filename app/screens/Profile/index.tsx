import { ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity, Alert } from "react-native";
import { View, Text } from "react-native-animatable"
import { removeItem } from "../../Utils/utils";
import { LinearGradient } from "expo-linear-gradient";
import { Avatar, Icon, IconButton } from "react-native-paper";
import { Avatar_Img, Login_img } from "../../../assets/Images";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/Actions/authActions";
import { useEffect } from "react";
import { clearWishList } from "../../../redux/Actions/productActions";

const { width, height } = Dimensions.get('window');
const color = ['#E7E5DF', '#E7E5DF'];

const Profile = ({ navigation }) => {
    const dispatch = useDispatch();

    const { token, loading, guestLogin, name } = useSelector((state) => state.auth);
    const userInfo = useSelector((state) => state.auth);

    useEffect(() => {
        if (token.length === 0) {
            alert('please login first');
        }


    }, [token])

    const handleLogout = () => {
        Alert.alert(
            "", 
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Logout cancelled"),
                    style: "cancel", 
                },
                {
                    text: "OK",
                    onPress: () => {
                        dispatch(clearWishList());
                        dispatch(logout());
                    },
                },
            ],
            { cancelable: false } 
        );
    };
    return (<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>


        {token.length === 0 ? <View style={[styles.profileContainer, { backgroundColor: '#F4F4F4',  justifyContent: 'center', gap: height * 0.03 }]}>
            {/* <Button onPressIn={()=>dispatch(logout())}>reset</Button> */}
            <Image style={{ height: height * 0.35, width: width * 0.55 }} source={Login_img} />
            <Text style={{
                fontSize: width * 0.06,
                fontFamily: 'RobotoSlab_semiBold', color: '#433eb6'
            }}>
                Your are not logged in !!
            </Text>

            <Button onPress={() => navigation.navigate('AuthNav')} style={[styles.Btn, { top: 0 }]} icon="logout" mode="contained" >
                Login now
            </Button>


        </View> : <View style={styles.profileContainer}>
            <Avatar.Image style={styles.avatar} size={width * 0.3} source={Avatar_Img} />
            <Text style={styles.nameText}>{userInfo.name}</Text>
            <View style={styles.infoItems}>
                <View style={{ left: width * 0.04 }}>
                    <Icon source={'account'} size={width * 0.07} color="#433eb6" />
                </View>
                <Text style={styles.infoText}>{userInfo.name}</Text>
            </View>
            <View style={styles.infoItems}>
                <View style={{ left: width * 0.04 }}>
                    <Icon source={'email'} size={width * 0.07} color="#433eb6" />
                </View>
                <Text style={styles.infoText}>{userInfo.email}</Text>
            </View>
            <View style={styles.infoItems}>
                <View style={{ left: width * 0.04 }}>
                    <Icon source={'phone'} size={width * 0.07} color="#433eb6" />
                </View>
                <Text style={styles.infoText}>{'+91 ' + userInfo.phone}</Text>
            </View>
            <View style={styles.infoItems}>
                <View style={{ left: width * 0.04 }}>
                    <Icon source={'google-maps'} size={width * 0.07} color="#433eb6" />
                </View>
                <Text style={styles.infoText}>{'123 Maple StreetSpring'}</Text>
                <IconButton
                    icon="square-edit-outline"
                    iconColor='#433eb6'
                    size={width * 0.07}
                    onPress={()=>console.log(userInfo)}
                    style={{right:width*0.01}}
                />

            </View>
            <TouchableOpacity onPress={()=> navigation.navigate('MyOrders')} activeOpacity={0.6} style={styles.infoItems}>
                <View style={{ left: width * 0.04 }}>
                    <Icon source={'truck-fast-outline'} size={width * 0.07} color="#433eb6" />
                </View>
                <Text style={styles.infoText}>{'My orders'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} activeOpacity={0.6} style={styles.infoItems}>
                <View style={{ left: width * 0.04 }}>
                    <Icon source={'logout'} size={width * 0.07} color="#433eb6" />
                </View>
                <Text style={styles.infoText}>{'Logout'}</Text>
            </TouchableOpacity>


        </View>}

    </ScrollView>)
}


const styles = StyleSheet.create({
    container: {
        flex: 1

    },
    contentContainer: {
        paddingTop: height * 0.1,
        // justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10

    },
    profileContainer: {
        width: width * 0.95,
        height: 'auto',
        // borderWidth:1,
        // borderColor:'#433eb6',
        // borderRadius: 1,
        gap: height * 0.025,
        alignItems: 'center'

    },
    avatar: {
        // position: 'absolute',
        // top: -height * 0.05,
        // zIndex: 2,
        // alignSelf: 'center',
       elevation:5

    },
    nameText: {

        fontSize: width * 0.05,
        fontFamily: 'RobotoSlab_semiBold',
        color: 'black'
    },
    Btn: {
        backgroundColor: '#433eb6',
        top: height * 0.12,
        width: width * 0.5,
        height: height * 0.06,
        elevation: 5
    },
    infoItems: {
        width: width * 0.88,
        height: height * 0.068,
        elevation: 4,
        borderColor: 'black',
        borderRadius: 10,
        backgroundColor: '#F4F4F4',
        flexDirection: 'row',
        alignItems: 'center',
        gap: width * 0.1
    },
    infoText: {
        fontSize: width * 0.04,
        fontFamily: 'RobotoSlab_regular',
        color: 'black'
    }
})

export default Profile;
