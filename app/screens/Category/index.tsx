import { View, Text, StyleSheet, FlatList, Dimensions, Image, BackHandler} from "react-native"
import { Sample_Products_Data } from "../../../assets/SampleData/Products";
import ProductItem, { SkeletonList } from "../../components/ProductItem";
import Header from "../../components/Header";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { URL } from "../../constants";
import axios from "axios";
import { Button, Checkbox, IconButton, RadioButton } from "react-native-paper";
import { Sale_img } from "../../../assets/Images";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView ,BottomSheetModal } from '@gorhom/bottom-sheet';
const { width, height } = Dimensions.get('window');
const color = ["#090979", "#433eb6", "#433eb6"];


const Category = (props) => {

  const { category } = props.route.params;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const snapPoints = ['35%'];
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handleOpen = () => bottomSheetRef.current?.present();
  const handleClose = () => bottomSheetRef.current?.close();
  const [type, setType] = useState('price');
  const [from , setFrom] = useState('');

  const renderBackDrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, [])
  const handleRequest = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${URL}/products/category/${category}`);

      setItems(response.data);

    }
    catch (err) {
      console.log(err);
    }
    finally {
      setLoading(false);
    }

  }

  const handleSort = () => {
    setItems(prevItems => {
      const sortedItems = [...prevItems].sort((a, b) => {
        if (from === 'lowToHigh') {
          return a.price - b.price;
        } else if (from === 'highToLow') {
          return b.price - a.price;
        } else {
          return 0; 
        }
      });
      return sortedItems;
    });
    handleClose();
  };

  

  useEffect(() => {
    setFrom('');
    setType('price');
    handleRequest();
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      
    return () => backHandler.remove();

  }, [category])

  const handleBackPress = () => {
    if (bottomSheetRef.current?.index !== -1) {
        bottomSheetRef.current?.close();
        return true;
    }
   return false;
    
};
  return (<View style={styles.Conatiner}>


    <View style={styles.headerContainer}>
      <IconButton
        icon="keyboard-backspace"
        iconColor='#433eb6'
        size={height * 0.025}
        style={{ backgroundColor: '#E7E5DF' }}
        onPress={() => props.navigation.goBack()}
      />
      <Image resizeMode={"contain"} source={Sale_img} style={styles.salesImage} />
      <IconButton
       icon={ from !=''?"filter-check":'filter'}
        iconColor='#433eb6'
        size={height * 0.025}
        style={{ backgroundColor: '#E7E5DF' }}
        onPress={() => handleOpen()}
      />
    </View>


    {loading ? <SkeletonList /> : <FlatList style={{ marginTop: 5 }} data={items} keyExtractor={(item) => item._id}
      renderItem={({ item }) => <ProductItem item={item} navigation={props.navigation} />}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      columnWrapperStyle={{ gap: width * 0.04 }}
    />}

    <BottomSheetModal style={{ gap: 10 }} backdropComponent={renderBackDrop} ref={bottomSheetRef}  snapPoints={snapPoints} enablePanDownToClose={true} >
      <BottomSheetView style={{ borderColor: 'black' }}>
        <Text style={styles.btmSheetHeader}>Sort By</Text>
      </BottomSheetView>
      <BottomSheetView style={styles.btmSheetCheckBoxContainer}>
        <RadioButton
          value="price"
          color="#433eb6"
          status={ type==='price'?'checked':'unchecked'}
          onPress={()=>setType('price')}

        />
        <Text style={styles.radioBtnText}>Price</Text>
        <RadioButton
          value="ratings"
          color="#433eb6"
          status={ type==='ratings'?'checked':'unchecked'}
          onPress={()=>setType('ratings')}


        />
        <Text style={styles.radioBtnText}>Ratings</Text>


      </BottomSheetView>

      <BottomSheetView style={styles.sortContainer}>
        <Text style={[styles.radioBtnText, { marginLeft: 5 }]}>Low to High</Text>
        <RadioButton
          value="lowToHigh"
          color="#433eb6"
          status={ from==='lowToHigh'?'checked':'unchecked'}
          onPress={()=>setFrom('lowToHigh')}


        />
      </BottomSheetView>
      <BottomSheetView style={styles.sortContainer}>
        <Text style={[styles.radioBtnText, { marginLeft: 5 }]}>High To Low</Text>
        <RadioButton
          value="HighToLow"
          color="#433eb6"
          status={ from==='highToLow'?'checked':'unchecked'}
          onPress={()=>setFrom('highToLow')}

        />
      </BottomSheetView>
      {/* <Button title="click"  onPress={()=>handleSort()}/> */}
   {from !=''?<Button   onPress={()=>handleSort()} mode={'contained-tonal'} style={{backgroundColor:'#433eb6' , width:width*0.36, marginLeft:4, marginTop:3}} textColor="white">
        apply
      </Button>:null }
      
    </BottomSheetModal>

  </View>)
}


const styles = StyleSheet.create({
  Conatiner: {
    flex: 1,

    alignItems: 'center'
  },
  contentContainer: {

    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: width * 0.04

  },
  headerContainer: {
    width: width * 0.95,
    height: height * 0.06,
    marginBottom: height * 0.065,

    justifyContent: 'space-between',
    top: height * 0.06,
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',

    zIndex: 2,
    backgroundColor: 'transparent',
    borderRadius: 15,
    borderWidth: 0.2,

  },
  salesImage: {
    width: width * 0.4,
    height: height * 0.05,

  },
  btmSheetCheckBoxContainer: {
    borderColor: 'black',
    gap: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center'
  },
  radioBtnText: {
    fontSize: width * 0.043,
    fontFamily: 'RobotoSlab_regular',
  },
  sortContainer: {


    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  btmSheetHeader: {
    fontSize: width * 0.054,
    fontFamily: 'RobotoSlab_semiBold',
    paddingLeft: 10,
    paddingBottom:5
    

  }

})
export default Category;