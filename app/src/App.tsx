import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { registerRootComponent } from "expo"
import { Provider } from "react-redux"
import { persistor, store } from "./store"
import { PersistGate } from "redux-persist/integration/react"
import RootStack from "./routes/RootStack"

import {
    useFonts,
    Lato_100Thin,
    Lato_100Thin_Italic,
    Lato_300Light,
    Lato_300Light_Italic,
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
    Lato_900Black_Italic,
} from "@expo-google-fonts/lato"
import { Text } from "react-native"

const App = () => {
    const [fontsLoaded] = useFonts({
        Lato_100Thin,
        Lato_100Thin_Italic,
        Lato_300Light,
        Lato_300Light_Italic,
        Lato_400Regular,
        Lato_400Regular_Italic,
        Lato_700Bold,
        Lato_700Bold_Italic,
        Lato_900Black,
        Lato_900Black_Italic,
    })

    if (!fontsLoaded) {
        return <Text>Loading...</Text>
    }

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <RootStack />
                    </NavigationContainer>
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
    )
}

registerRootComponent(App)
