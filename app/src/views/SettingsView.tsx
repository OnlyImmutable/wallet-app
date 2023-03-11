import React from "react";

import { StyleSheet, Text, SafeAreaView, TouchableOpacity, FlatList } from "react-native";

import { StatusBar } from "expo-status-bar";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { logout } from "../store/actions/WalletAction";
import Header from "../components/Header";

const SettingsView = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const options = [
        {
            title: "Recover account",
            action: () => {
                navigation.navigate("Sub", {
                    screen: "Recovery",
                    params: {
                        phraseCount: 12,
                        additionalRecovery: true
                    }
                });
            }
        },
        {
            title: "Logout",
            action: () => {
                dispatch(logout());
            }
        }
    ];

    return (
        <>
            <Header title="My settings" description="All your available settings in one place, here you can recover new wallets and logout completely" />
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={options}
                    style={styles.container}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity key={index.toString()} style={styles.item} onPress={item.action}>
                            <Text>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                    numColumns={1}
                    key={""}
                />
            </SafeAreaView>
            <StatusBar style="auto" />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 20
    },
    item: {
        padding: 10,
        fontSize: 18,
        borderBottomColor: "#8350FF",
        borderBottomWidth: 1
    }
});

export default SettingsView;
