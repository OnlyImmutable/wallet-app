import React from "react";

import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import { Wallet } from "../types";
import useBalanceByTokensHook from "../hooks/useBalanceByTokensHook";

interface StyleProps {
    textColor: string;
    backgroundColor: string;
}

interface Props {
    wallet: Wallet;
}

const TokenBars = ({ wallet }: Props) => {
    const { loading, tokens } = useBalanceByTokensHook(wallet.address);

    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <>
            {tokens.map((token) => {
                const textColor = tokens[0] === token ? "#8350FF" : "#FFFFFF";
                const backgroundColor = tokens[0] === token ? "#FFFFFF" : "#8350FF";
                return (
                    <View
                        key={token.symbol}
                        style={[
                            styles.container,
                            {
                                backgroundColor: backgroundColor
                            }
                        ]}
                    >
                        <View style={[styles.item, styles.itemLeft]}>
                            <Text
                                style={[
                                    styles.text,
                                    {
                                        color: textColor
                                    }
                                ]}
                            >
                                {token.name} ({token.address})
                            </Text>
                        </View>

                        <View style={[styles.item, styles.itemRight]}>
                            <Text
                                style={[
                                    styles.text,
                                    {
                                        color: textColor
                                    }
                                ]}
                            >
                                {token.balance / 10 ** token.decimals} {token.symbol}
                            </Text>
                        </View>
                    </View>
                );
            })}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        borderRadius: 5,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3
    },
    item: {
        width: "50%"
    },
    itemLeft: {},
    itemRight: {
        alignItems: "flex-end"
    },
    text: {
        color: "#FFFFFF",
        fontFamily: "Lato_700Bold",
        fontWeight: "bold"
    }
});

export default TokenBars;
