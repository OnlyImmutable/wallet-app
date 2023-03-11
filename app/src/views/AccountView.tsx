import React from "react";

import { StyleSheet, SafeAreaView, ScrollView } from "react-native";

import { StatusBar } from "expo-status-bar";
import Header from "../components/Header";
import { useAppSelector } from "../hooks/useAppDispatch";
import TokenBars from "../components/TokenBars";

const AccountView = () => {
    const wallets = useAppSelector((state) => state.auth.wallets);

    return (
        <>
            <Header title="My wallet" description="All your available wallets & tokens all in one place" />
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.walletListContainer}>
                    {wallets.map((wallet) => (
                        <TokenBars key={wallet.address} wallet={wallet} />
                    ))}
                </ScrollView>
            </SafeAreaView>
            <StatusBar style="auto" />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    walletListContainer: {
        flex: 1,
        padding: 20,
        top: -50
    }
});

export default AccountView;
