import React, { useEffect, useMemo, useState } from "react";

import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { recover } from "../../store/actions/WalletAction";
import Header from "../../components/Header";

const RecoveryView = ({ route, navigation }) => {
    const dispatch = useAppDispatch();
    const wallets = useAppSelector((state) => state.auth.wallets);

    const params = route.params;
    const phraseCount = params && params.phraseCount ? params.phraseCount : 12;
    const additionalRecovery = !!(params && params.additionalRecovery);

    const [phrases, setPhrases] = useState<string[]>([]);
    const phrase = useMemo(() => phrases.join(" "), [phrases]);

    const [error, setError] = useState<string | undefined>();

    useEffect(() => {
        // If already populated we don't want to repopulate them.
        if (phrases && phrase.length > 0) return;

        const prePopulated = [];
        for (let i = 1; i <= phraseCount; i++) {
            prePopulated.push("");
        }
        setPhrases(prePopulated);
    }, []);

    const handle = () => {
        const count = phrases.filter((x) => x.length > 0).length;
        if (count < phrases.length) {
            setError(`You have not entered enough phrases! You require ${phrases.length} to recover your account`);
            return;
        }

        // liberty dose bless lock snow crunch truck toy panda bread robot raw
        dispatch(recover(phrase));

        if (additionalRecovery) {
            navigation.navigate("App", {
                screen: "Account"
            });
        }
    };

    return (
        <>
            <Header
                title="Recovery"
                description={`Enter your ${phraseCount} word recovery phase to access your wallet address and all tokens with it. `}
                warning={wallets.length > 0 && additionalRecovery && "You already have a wallet loaded, recovering a new wallet will override your previous one.."}
            />
            <SafeAreaView style={styles.container}>
                <View style={styles.inputContainer}>
                    {phrases.map((value, index) => {
                        return (
                            <View key={index} style={styles.item}>
                                <Text>{index + 1} - </Text>
                                <TextInput
                                    style={styles.input}
                                    defaultValue={value.toLowerCase()}
                                    autoCapitalize="none"
                                    onChangeText={(text) => {
                                        phrases[index] = text.toLowerCase();
                                        setPhrases(phrases);
                                    }}
                                />
                            </View>
                        );
                    })}
                </View>
                {error && <Text style={styles.error}>{error}</Text>}
                <TouchableOpacity style={styles.btn} onPress={handle}>
                    <Text style={styles.btnText}>Recover</Text>
                </TouchableOpacity>
            </SafeAreaView>
            <StatusBar style="light" />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        padding: 20
    },
    inputContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        padding: 20
    },
    item: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        width: "50%",
        paddingBottom: 5,
        marginBottom: 10,
        borderBottomColor: "#8350FF",
        borderBottomWidth: 1
    },
    input: {
        width: "80%"
    },
    btn: {
        backgroundColor: "#8350FF",
        marginLeft: 20,
        marginRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5
    },
    btnText: {
        color: "#FFFFFF",
        fontFamily: "Lato_700Bold",
        textAlign: "center"
    },
    error: {
        color: "red",
        padding: 20,
        paddingTop: 0
    }
});

export default RecoveryView;
