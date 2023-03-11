import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { useAppSelector } from "../hooks/useAppDispatch";

import AuthStack from "./routes/AuthStack";
import AppStack from "./routes/AppStack";
import SubStack from "./routes/SubStack";

const Stack = createStackNavigator();

const RootStack = () => {
    // We check that there is more than 1 as we only show initial recovery when no wallets exist or when manually shown
    const hasWallets = useAppSelector((state) => state && state.auth && state.auth.wallets && state.auth.wallets.length > 0);

    return (
        <Stack.Navigator
            initialRouteName={hasWallets ? "App" : "Auth"}
            screenOptions={{
                headerShown: false
            }}
        >
            {hasWallets ? (
                <>
                    <Stack.Screen name="App" component={AppStack} />
                    <Stack.Screen name="Sub" component={SubStack} />
                </>
            ) : (
                <Stack.Screen name="Auth" component={AuthStack} />
            )}
        </Stack.Navigator>
    );
};

export default RootStack;
