import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TextInput, FlatList } from "react-native"
import { IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import { URL } from "../../constants";
import ProductItem from "../../components/ProductItem";
const { width, height } = Dimensions.get('window');


const SearchResults = ({ navigation, route }) => {

    // console.log(route);
    const {query} = route.params;
    const [searchQuery , setSearchQuery] = useState<String>('');
    const [loading , setLoading] = useState<Boolean>(false);
    const [results, setResults] = useState([]);

    const  getresults = async() =>{
        setLoading(true);
        if(searchQuery.length===0){
            return;
        }
        try {
            const res = await axios.post(`${URL}/products/getSuggestions`, {query:searchQuery});
            // console.log("results are <<<<<<", res.data.suggestions);
            setResults(res.data.suggestions);
            console.log("length", res.data.suggestions.length);

        } catch (error) {
            console.log("Error: ", error);
            if (error.response) {
                console.log("Response error: ", error.response.data.message);
            } else {
                console.log("Error message: ", error.message);
            }
        }
        finally{
            setLoading(false);
        }

    }
    useEffect(()=>{
        setSearchQuery(query);
       getresults();


    }, [searchQuery ,query])
    return (<SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
        <IconButton
            icon="keyboard-backspace"
            iconColor='#433eb6'
            size={width * 0.047}
            style={{ backgroundColor: '#E7E5DF' }}
            onPress={() => navigation.goBack()}
        />
         
        <TextInput value= {searchQuery} onChangeText={(e)=> setSearchQuery(e)} returnKeyType={"search"} placeholder="search AmazeCart" style={styles.textInput} />
        <Icon name="search1" size={width * 0.05} color={"#433eb6"} />
     
       
        </View>
        <FlatList style={{ marginTop: 5 }} data={results} keyExtractor={(item) => item._id}
      renderItem={({ item }) => <ProductItem item={item} navigation={navigation} />}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      columnWrapperStyle={{ gap: width * 0.04 }}
    />
    </SafeAreaView>)

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F4F4F4',

    },
    headerContainer: {
        width: width * 0.95,
        height: height * 0.06,
        marginBottom: height * 0.065,
       
        top: height * 0.06,
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        // zIndex: 1,
        backgroundColor: '#F4F4F4',
        borderRadius: 10,
        elevation: 5,
        gap:5

    },
    textInput: {
        width: width * 0.7,
        height: width * 0.11,
        borderColor: "black",
        // borderWidth:1,

       
      },
      contentContainer: {

        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: width * 0.04,
        
    
      },
})

export default SearchResults;