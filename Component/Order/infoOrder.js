import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
const InfoOrder = ({ name, content }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.Title}>{name}</Text>
            <View style={styles.infoContainer}>
                {content.map((value, index) =>
                    <View style={styles.info} key={index}>
                        <Text>- {value.name}</Text>
                        <Text>+{value.price}đ</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    infoContainer: {
        padding: 10,
        paddingTop: 5,
        paddingRight: 0,
        flexDirection: 'column',
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2
    }
});
export default InfoOrder;