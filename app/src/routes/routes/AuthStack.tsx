import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import RecoveryView from "../../views/recovery/RecoveryView";

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Recovery"
            screenOptions={{
                headerShown: false,
                animationEnabled: false
            }}
        >
            <Stack.Screen name="Recovery" component={RecoveryView} />
        </Stack.Navigator>
    );
};

export default AuthStack;
