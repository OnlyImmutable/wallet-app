import React from "react";

import { User, Settings } from "react-native-feather";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountView from "../../views/AccountView";
import SettingsView from "../../views/SettingsView";

const Tab = createBottomTabNavigator();

const AppStack = () => {
    return (
        <Tab.Navigator
            initialRouteName="Account"
            screenOptions={{
                headerShown: false,
                tabBarLabel: "",
                tabBarActiveTintColor: "#FFFFFF",
                tabBarInactiveTintColor: "#27272C",
                tabBarIconStyle: {
                    top: 10
                },
                tabBarStyle: {
                    backgroundColor: "#8350FF",
                    borderTopColor: "transparent",
                    height: 100
                }
            }}
        >
            <Tab.Screen
                name="Account"
                options={{
                    tabBarIcon: ({ color }) => <User color={color} width={28} height={40} />
                }}
                component={AccountView}
            />
            <Tab.Screen
                name="Settings"
                options={{
                    tabBarIcon: ({ color }) => <Settings color={color} width={28} height={40} />
                }}
                component={SettingsView}
            />
        </Tab.Navigator>
    );
};

export default AppStack;
