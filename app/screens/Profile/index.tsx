import { ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity, Alert, Linking } from "react-native";
import { View, Text } from "react-native-animatable"
import { Avatar, Icon, IconButton } from "react-native-paper";
import { Avatar_Img, Login_img } from "../../../assets/Images";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/Actions/authActions";
import { useCallback, useEffect, useRef } from "react";
import { clearWishList } from "../../../redux/Actions/productActions";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
interface CustomBottomSheetProps {
    bottomSheetModalRef: React.RefObject<BottomSheetModal>;
    snapPoints: string[];
    children: React.ReactNode;
    enablePanDownToClose:boolean
  }
const { width, height } = Dimensions.get('window');
const color = ['#E7E5DF', '#E7E5DF'];
const Profile = ({ navigation }) => {
    const dispatch = useDispatch();
    const snapPoints = ['90%'];
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    // for address update
    const bottomSheetRefEdit = useRef<BottomSheetModal>(null);
    const renderBackDrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, [])
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
        <View style={styles.headerContainer}>
            <IconButton
                icon="keyboard-backspace"
                iconColor='#433eb6'
                size={width * 0.05}
                style={{ backgroundColor: '#E7E5DF' }}
                onPress={() => navigation.goBack()}
            />
            <Text style={{
                fontSize: width * 0.05,
                fontFamily: 'RobotoSlab_semiBold', color: '#433eb6'
            }}>
                Profile
            </Text>
            <IconButton
                icon="information-variant"
                iconColor='#433eb6'
                size={width * 0.05}
                style={{ backgroundColor: '#E7E5DF' }}
                onPress={() => bottomSheetRef.current?.present()
                }
            />

        </View>

        {token.length === 0
            ? <View style={[styles.profileContainer, { backgroundColor: '#F4F4F4', justifyContent: 'center', gap: height * 0.03 }]}>
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
                        onPress={() => bottomSheetRefEdit.current?.present()}
                        style={{ right: width * 0.01 }}
                    />

                </View>
                <TouchableOpacity onPress={() => navigation.navigate('MyOrders')} activeOpacity={0.6} style={styles.infoItems}>
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
        {/* bottomsheetModal for about section */}
        <CustomBottomSheet
                bottomSheetModalRef={bottomSheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
            >
                <BottomSheetView style={styles.aboutContainer}>
                    <Avatar.Image style={styles.avatar} size={width * 0.4} source={{ uri: 'https://avatars.githubusercontent.com/u/135149764?v=4' }} />
                    <Text style={{
                        fontSize: width * 0.06,
                        fontFamily: 'RobotoSlab_semiBold', color: '#433eb6'
                    }}>
                        About
                    </Text>
                    <Text style={[styles.infoText, {textAlign:'justify'}]}>
                        Amazecart was developed by Vibhor Arya, a skilled React Native developer with expertise in full-stack development. With a strong background in building comprehensive applications, Vibhor leveraged his proficiency in React Native, Node.js, and MongoDB to create a robust eCommerce platform. His commitment to delivering high-quality user experiences is reflected in the integration of state management with Redux, secure payment processing via Razorpay, and OTP authentication through Firebase, all while maintaining a polished interface using React Native Paper
                    </Text>
                    <BottomSheetView style={styles.iconContainer}>
                        <IconButton
                            icon="github"
                            iconColor='#433eb6'
                            size={width * 0.08}
                            style={{ backgroundColor: '#E7E5DF' }}
                            onPress={() => Linking.openURL('https://github.com/vibhorarya12')
                                .catch((err) => console.error('Failed to open URL:', err))}
                        />
                        <Text style={{
                            fontSize: width * 0.045,
                            fontFamily: 'RobotoSlab_semiBold', color: '#433eb6'
                        }}>
                            Follow
                        </Text>
                    </BottomSheetView>
                </BottomSheetView>
            </CustomBottomSheet>
            {/* custom modal for updating address */}
            <CustomBottomSheet
                bottomSheetModalRef={bottomSheetRefEdit}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
            >
                    <Text>Update address</Text>

                </CustomBottomSheet>


    </ScrollView>)
}



const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({
    bottomSheetModalRef,
    snapPoints,
    children,
    enablePanDownToClose
  }) => {
    const renderBackdrop = useCallback(
      (props: any) => <BottomSheetBackdrop  pressBehavior={'none'} appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
      []
    );
  
    return (
      <BottomSheetModal
        backdropComponent={renderBackdrop}
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        enablePanDownToClose={enablePanDownToClose}
        backgroundStyle={{backgroundColor:'#f2f3f2'}}
        
      >
        
        <BottomSheetView style={styles.contentContainer}>
        {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  };




const styles = StyleSheet.create({
    container: {
        flex: 1

    },
    contentContainer: {
        paddingTop: height * 0.05,
        // justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        gap: 10

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
        elevation: 5

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
    },
    headerContainer: {
        width: width,
        height: height * 0.06,
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        // borderWidth:1,
        borderColor: 'black'
    },
    aboutContainer: {
        // borderWidth: 1,
        borderColor: 'black',
        width: width * 0.9,
        height: height * 0.7,
        alignItems: 'center',
        gap: 10,
       


    },
    iconContainer:{
        width: width * 0.9,
        height:height*0.08,
        // borderWidth:1,
        borderColor:'black',
        flexDirection:'row',
        alignItems:'center',
        borderRadius:20,
        justifyContent:'center',
        gap:5
    }
})

export default Profile;
