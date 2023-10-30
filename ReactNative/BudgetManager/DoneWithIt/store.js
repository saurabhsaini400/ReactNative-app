import { createStore } from "redux";
import { budgetReducer } from "./reducers";
// test
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

//test

const persistedReducer = persistReducer(persistConfig, budgetReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

// export default store;
