import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ScrollView } from "react-native";
import ButtonX from "../../Component/Button/buttonX";
import { database } from "../../firebaseConfig";
import { ref, onValue, set } from 'firebase/database';
import { AppContext } from "../../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
import OrderedItem from "./orderedItem";

const OrderModal = ({ controlOrder, Close }) => {

    const { OrderItem, setOrderItem,
        subAmount, setSubAmount,
        subTotal, setSubTotal,
        isOrder, setIsOrder,
        OrderAddress, setOrderAddress,
        email, setEmail,
        userInfo, setUserInfo,
        isLog, setIsLog,
        location, setLocation,
        userRanks, setUserRanks,
        userHistory, setUserHistory,
        OrderList, setOrderList
    } = useContext(AppContext)

    function UpdateUserData() {
        var temp = parseInt(userRanks.total) + subTotal
        var tempRank = "Đồng"
        if (temp >= 300 && temp <= 600) tempRank = 'Bạc'
        if (temp >= 600 && temp <= 900) tempRank = 'Vàng'
        if (temp > 900) tempRank = 'Bạch kim'

        set(ref(database, 'ACCOUNT/' + email + '/UserRanks'), {
            total: (parseInt(userRanks.total) + subTotal),
            ranks: tempRank,
            amount: (parseInt(userRanks.amount) + 1)
        })

        set(ref(database, 'ACCOUNT/' + email + '/UserHistory/ORDER_' + (parseInt(userRanks.amount) + 1)), {
            Items: OrderItem,
            Address: OrderAddress,
            OrderID: (parseInt(userRanks.amount) + 1),
            OrderTotal: subTotal
        })

    }

    function DeleteOrder(id) {
        var deleteIndex = id - parseInt(userRanks.amount) - 1
        setOrderList(prevSetTemp => prevSetTemp.filter((_, index) => index !== deleteIndex));
    }


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={controlOrder}
        >
            {OrderList.length != 0 ? (
                <View style={styles.ModalContainer}>
                    <ButtonX Go={Close} ButtonName={'ĐƠN HÀNG'} />
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ width: '95%', paddingBottom: 20 }}
                    >
                        {OrderList.map((item, index) =>
                            <OrderedItem
                                key={index}
                                item={item}
                                id={(parseInt(userRanks.amount) + index) + 1}
                                DeleteOrder={DeleteOrder}
                            />
                        )}
                    </ScrollView>
                </View>
            ) : (
                <View style={styles.ModalContainer}>
                    <ButtonX Go={Close} ButtonName={'ĐƠN HÀNG ĐANG GIAO'} />
                    <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Không có đơn hàng nào</Text>
                    </View>
                </View>
            )}
        </Modal>

    );
}

const styles = StyleSheet.create({
    ModalContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: '#EBF0F4',
        position: 'relative',
        alignItems: 'center',
        flex: 1
    },
    orderContainer: {
        width: '100%',
        flexDirection: 'column',
        marginBottom: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#9e9ea0',
        alignItems: 'center',
        padding: 5,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.5,
        elevation: 3,
    },
    statusContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    btnText: {
        fontSize: 16,
        fontWeight: 600,
    },
    addressInfo: {
        width: '100%',
        padding: 10,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: 'grey'
    },
    title: {
        textAlign: 'center',
        width: '100%',
        fontSize: 18,
        fontWeight: 600,
        marginBottom: 5
    },
    addtext: {
        width: '100%',
        fontSize: 16,
    },
    itemImg: {
        width: '40%',
        height: 200,
        borderRadius: 10,
    },
    order: {
        width: '100%',
        padding: 10,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: 'grey'
    },
    orderInfo: {
        width: '60%',
        flexDirection: 'column',
        paddingLeft: 10
    },
    orderTitle: {
        fontSize: 17,
        fontWeight: 600,
    },
    orderNote: {
        fontStyle: 'italic'
    },
    Section: {
        paddingLeft: 10,
        flexDirection: 'column',
    },
    sectionItem: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
    },
    sectionPrice: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    Total: {
        fontSize: 20,
        fontWeight: 700,
        color: 'red',
        alignSelf: 'flex-end'
    },
    historyContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: 'grey',
    },
    ID: {
        fontSize: 18,
        fontWeight: 700,
    },
    IDcontainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    IDtotal: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 700,
        color: 'red',
    },
    logoutButton: {
        height: 50,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'red',
        borderRadius: 10,
        position: 'fixed',
        bottom: 10,
    },
    logoutButtonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 17,
        fontWeight: 700,
        marginRight: 10,
    },

});
export default OrderModal;