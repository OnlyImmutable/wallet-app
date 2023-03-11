import React from "react";

import { View, StyleSheet, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const LogoImage = require("./../../assets/images/logo.png");

interface Props {
    title: string;
    description?: string;
    warning?: string;
}

const Header = ({ title, description, warning }: Props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.row}>
                <Image source={LogoImage} style={styles.logo} />
                <Text style={styles.header}>{title}</Text>
            </View>

            {description && <Text style={styles.description}>{description}</Text>}
            {warning && <Text style={styles.warning}>{warning}</Text>}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        backgroundColor: "#8350FF",
        padding: 20,
        paddingTop: 20,
        borderRadiusBottomLeft: 5,
        borderRadiusBottomRight: 5
    },
    header: {
        fontFamily: "Lato_700Bold",
        color: "#FFFFFF",
        fontSize: 18,
        marginLeft: 10
    },
    description: {
        fontFamily: "Lato_400Regular",
        color: "#FFFFFF",
        marginTop: 10,
        maxWidth: 300
    },
    warning: {
        fontFamily: "Lato_400Regular",
        color: "red",
        marginTop: 10,
        maxWidth: 300
    },
    logo: {
        maxWidth: 35,
        maxHeight: 35,
        resizeMode: "contain"
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center"
    }
});

export default Header;
