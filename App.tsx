import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Intro } from './app/screens';
import 'react-native-gesture-handler';
import Navigation from './app/navigation';
import { useFonts } from 'expo-font';
import Spinner from 'react-native-loading-spinner-overlay';
import useLoadFonts from './assets/Fonts';
import { Provider } from 'react-redux';
import store from './redux/Store/store';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
const persister = persistStore(store);
export default function App() {
    const loaded = useLoadFonts();
    // font loads first before rendering main component //
    if(!loaded){
      return(
        <Spinner
        visible={true}
        color="#090979"
        size={50}
      /> 
      )
      
    }
  return (
    <Provider store={store}>
      <PersistGate persistor = {persister} >
      <Navigation/>
      </PersistGate>
    </Provider>
    
  );
}


