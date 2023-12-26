import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

const TotalInfo = ({ Amount, Total, ranks }) => {

    const [discount, setDiscount] = useState(0)

    // switch (ranks) {
    //     case "Bạc":
    //         setDiscount(5)
    //         break;
    //     case "Vàng":
    //         setDiscount(10)
    //         break;
    //     case "Bạch kim":
    //         setDiscount(15)
    //         break;
    //     default:
    //         setDiscount(0)
    //         break;
    // }

    return (
        <View style={styles.container}>
            <View style={styles.line}>
                <Text style={styles.lineText}>Tạm tính ({Amount} món)</Text>
                <Text style={styles.linePrice}>{Total},000đ</Text>
            </View>

            <View style={styles.lineTotal}>
                <Text style={styles.lineTextTotal}>Tổng đơn:</Text>
                <Text style={styles.linePriceTotal}>{Total},000đ</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        backgroundColor: 'white',
        width: '90%',
        padding: 20,
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.35,
        shadowRadius: 2.5,
        elevation: 3,
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    lineText: {
        fontSize: 16,
        fontWeight: 600,
    },
    linePrice: {
        fontSize: 16,
    },
    lineTotal: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lineTextTotal: {
        fontSize: 18,
        fontWeight: 600,
    },
    linePriceTotal: {
        fontSize: 20,
        fontWeight: 700,
        color: 'red',
    },
});

export default TotalInfo;