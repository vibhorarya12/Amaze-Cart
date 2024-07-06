import { Dimensions, StyleSheet, View ,Text} from "react-native"

const { width, height } = Dimensions.get('window');
const CustomTab = () => {

    return (<View style={styles.container}>
     <Text>
        Thi is Custom Tab
     </Text>
    </View>)
}

const styles = StyleSheet.create({
  container:{
     width:width,
     height:height*0.08,
     borderWidth:2,
     borderColor:'black',
     position:'absolute',
     bottom:0,
     justifyContent:'center',
     alignItems:'center'
  }

})
export default CustomTab;