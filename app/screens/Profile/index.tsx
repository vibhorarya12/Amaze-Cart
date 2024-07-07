import { Button } from "react-native";
import { View, Text } from "react-native-animatable"
import { removeItem } from "../../Utils/utils";


const Profile = ()=>{
    return(<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>
            This is profile
        </Text>
        <Button title="logout" onPress={()=>removeItem("onboarded")} />
    </View>)
}

export default Profile;