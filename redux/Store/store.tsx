import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../Reducers/rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../Sagas";
import AsyncStorage from "@react-native-async-storage/async-storage";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth', 'products'],
  };
const persistedReducer = persistReducer(persistConfig,rootReducer)

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(sagaMiddleware),
  });
  

sagaMiddleware.run(rootSaga);

export default store;