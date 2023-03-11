import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { WalletReducer } from "./reducers/WalletReducer";
import { persistReducer, persistStore } from "redux-persist";
import * as Keychain from "react-native-keychain";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

// Configure encryption
// const getSecretKey = async (): Promise<string | undefined> => {
//     try {
//         const data = await Keychain.getGenericPassword();
//         if (!data) return undefined;
//
//         if (!data.password) {
//             const secret = (Math.random() + 1).toString(36).substring(7);
//             await Keychain.setGenericPassword("ImmutableWallet", secret);
//             return secret;
//         }
//
//         return data.password;
//     } catch (error) {
//         console.log(error);
//     }
//
//     return undefined;
// };

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    transforms: [
        // TODO switch this over to async to allow for dynamic secret key generation using device specific Keychain
        encryptTransform({
            secretKey: "my-super-secret-key"
        })
    ]
};

const reducers = combineReducers({
    auth: WalletReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export const persistor = persistStore(store);

// persistor.purge().then((x) => console.log("PRUEGD"));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
