import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";

const Paytab = ({ GoTo, Amount, Total }) => {
    function handleorderModal() {
        GoTo('Order')
    }
    function handlepayModal() {
        GoTo('Pay')

    }

    return (
        // <View>
        //     {Amount !== 0 ? (
        <View style={styles.container}>
            <TouchableOpacity style={styles.itemAmount} onPress={handleorderModal}>
                <FontAwesomeIcon icon={faBasketShopping} size='25' color="#3AC5C8" />
                <Text style={styles.AmountText}>{Amount}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Total} onPress={handlepayModal}>
                <Text style={styles.TotalText}>Thanh toán - {Total},000đ </Text>
            </TouchableOpacity>
        </View>
        //     ) : (
        //         <View></View>
        //     )}
        // </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'fixed',
        bottom: 0,
    },
    itemAmount: {
        borderWidth: 1,
        borderColor: '#3AC5C8',
        borderRadius: 10,
        height: 50,
        width: '22%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    AmountText: {
        fontSize: 20,
        fontWeight: 600,
        color: '#3AC5C8',
    },
    Total: {
        borderRadius: 10,
        height: 50,
        width: '68%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3AC5C8',
    },
    TotalText: {
        fontSize: 17,
        fontWeight: 600,
        color: 'white'
    }
});
export default Paytab;