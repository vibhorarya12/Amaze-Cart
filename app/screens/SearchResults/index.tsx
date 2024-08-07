import React, { useState, useCallback, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TextInput, FlatList } from "react-native";
import { IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { URL } from "../../constants";
import ProductItem, { SkeletonList } from "../../components/ProductItem";

const { width, height } = Dimensions.get('window');

const DEBOUNCE_DELAY = 1000; 

const SearchResults = ({ navigation, route }) => {
    const { query } = route.params;
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [results, setResults] = useState([]);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const getResults = useCallback(async (searchTerm: string) => {
        if (searchTerm.length === 0) {
            setResults([]);
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post(`${URL}/products/getSuggestions`, { query: searchTerm });
            setResults(res.data.suggestions);
            console.log("length", res.data.suggestions.length);
        } catch (error) {
            console.log("Error: ", error);
            if (error.response) {
                console.log("Response error: ", error.response.data.message);
            } else {
                console.log("Error message: ", error.message);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const debouncedSearch = useCallback((searchTerm: string) => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(() => {
            getResults(searchTerm);
        }, DEBOUNCE_DELAY);
    }, [getResults]);

    useFocusEffect(
        useCallback(() => {
            setSearchQuery(query);
            getResults(query); // Immediate search for initial query
            return () => {
                if (debounceTimeout.current) {
                    clearTimeout(debounceTimeout.current);
                }
            };
        }, [query, getResults])
    );

    const handleSearchChange = useCallback((text: string) => {
        setSearchQuery(text);
        debouncedSearch(text);
    }, [debouncedSearch]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <IconButton
                    icon="keyboard-backspace"
                    iconColor='#433eb6'
                    size={width * 0.047}
                    style={{ backgroundColor: '#E7E5DF' }}
                    onPress={() => navigation.goBack()}
                />
                <TextInput
                    value={searchQuery}
                    onChangeText={handleSearchChange}
                    returnKeyType="search"
                    placeholder="search AmazeCart"
                    style={styles.textInput}
                />
                <Icon name="search1" size={width * 0.05} color="#433eb6" />
            </View>
            
            {loading ? (
               <SkeletonList />
            ) : (
                <FlatList
                    style={{ marginTop: 5 }}
                    data={results}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <ProductItem item={item} navigation={navigation} />}
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    columnWrapperStyle={{ gap: width * 0.04 }}
                />
            )}
        </SafeAreaView>
    );
};


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