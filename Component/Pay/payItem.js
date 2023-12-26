import React, { useState } from "react";
import { View, Image } from "react-native";
import { Text, StyleSheet } from "react-native";
import InfoOrder from "../Order/infoOrder";

const PayItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <View style={styles.TitleContainer}>
                <View style={styles.Title2Container}>
                    <Text style={styles.Title}>{item.ItemName}</Text>
                    <Text style={styles.Title2}>x{item.ItemAmount}</Text>
                </View>

                <View style={styles.Title2Container}>
                    <Text style={styles.Title2}>{item.ItemSize.name}</Text>
                    <Text style={styles.Title2}>+{item.ItemSize.price},000đ</Text>
                </View>
            </View>
            <View style={styles.orderInfo}>
                <Image
                    style={styles.infoImg}
                    source={require("../../assets/images/ITEM/" + item.ItemImageLink)}
                />
                <View style={styles.infoContent}>
                    <View>
                        <InfoOrder
                            name={'Topping thêm'}
                            content={item.ItemTopping}
                        />
                        <View style={styles.icontainer}>
                            <Text>Lượng đường</Text>
                            <View style={styles.infoContainer}>
                                <View style={styles.iinfo}>
                                    <Text>- {item.ItemSg.name}</Text>
                                    <Text>+0đ</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.icontainer}>
                            <Text>Lượng đá</Text>
                            <View style={styles.infoContainer}>
                                <View style={styles.iinfo}>
                                    <Text>- {item.ItemIce.name}</Text>
                                    <Text>+0đ</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.infoNote}>Ghi chú: {item.ItemNote}</Text>
                </View>
            </View>
            <View style={styles.Total} >
                <Text style={styles.TotalText}>
                    Tổng cộng: {(item.ItemSize.price + item.ItemSection) * item.ItemAmount},000đ
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'colum',
        width: '100%',
        paddingTop: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        paddingBottom: 20,
    },
    icontainer: {
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    infoContainer: {
        padding: 10,
        paddingTop: 5,
        paddingRight: 0,
        flexDirection: 'column',
    },
    iinfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2
    },
    Total: {
        width: '90%',
        alignItems: 'flex-end',
        flexDirection: 'column'
    },
    TotalText: {
        fontSize: 18,
        fontWeight: 700,
        color: 'red',
        paddingTop: 15
    },
    quantity: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingBottom: 20,
    },
    deleteText: {
        fontSize: 17,
        fontWeight: 600,
        color: 'red',
    },
    TitleContainer: {
        width: '90%',
    },
    Title: {
        fontSize: 20,
        fontWeight: 700,
    },
    Title2Container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    Title2: {
        fontSize: 17,
        fontWeight: 600
    },
    orderInfo: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    infoImg: {
        width: '45%',
        height: 200,
        borderRadius: 10,
    },
    infoContent: {
        width: '50%',
        height: 'auto',
        minHeight: 200,
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
});
export default PayItem;