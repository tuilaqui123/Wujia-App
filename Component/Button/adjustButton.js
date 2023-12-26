import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

const AdjustButton = ({ AdjustAmount, baseAmount }) => {
    const [amount, setAmount] = useState(baseAmount)

    function Dec() {
        if (amount > 1) {
            var temp = amount - 1;
            setAmount(temp)
            AdjustAmount(temp)
        }
    }
    function Inc() {
        if (amount < 99) {
            var temp = amount + 1;
            setAmount(temp)
            AdjustAmount(temp)
        }
    }

    return (
        <View style={styles.orderAdjustAmount}>
            <View style={styles.Adjust}>
                <TouchableOpacity style={styles.AdjustButton} onPress={Dec}>
                    <FontAwesomeIcon icon={faMinus} size={13} color="white" />
                </TouchableOpacity>
                <Text style={{ fontSize: 17, fontWeight: 600 }}>{amount}</Text>
                <TouchableOpacity style={styles.AdjustButton} onPress={Inc}>
                    <FontAwesomeIcon icon={faPlus} size={13} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    orderAdjustAmount: {
        height: '100%',
        width: '100%',
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Adjust: {
        height: 'auto',
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    AdjustButton: {
        height: 25,
        width: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B2BEB5',
        borderRadius: 5,
    }

});
export default AdjustButton;