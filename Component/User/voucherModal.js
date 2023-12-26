import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ScrollView } from "react-native";
import ButtonX from "../../Component/Button/buttonX";
import { database } from "../../firebaseConfig";
import { ref, onValue, set } from 'firebase/database';
import { AppContext } from "../../context/AppContext";

const VoucherModal = ({ controlOrder, Close }) => {

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
        userHistory, setUserHistory
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
            OrderTotal: Total
        })

    }

    function FinishOrder() {
        setIsOrder(false)

        setSubAmount(0)
        setSubTotal(0)
        setOrderItem([])

        UpdateUserData()

        Close(true)
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={controlOrder}
        >
            {isOrder ? (
                <View style={styles.ModalContainer}>
                    <ButtonX Go={Close} ButtonName={'ĐƠN HÀNG ĐANG GIAO'} />
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ width: '100%', paddingBottom: 100 }}
                    >
                        {OrderItem.map((value, index) =>
                            <View style={styles.order} key={index}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        style={styles.itemImg}
                                        source={require("../../assets/images/ITEM/" + value.ItemImageLink)}
                                    />
                                    <View style={styles.orderInfo}>
                                        <Text style={styles.orderTitle}>
                                            {index + 1}. {value.ItemName} x{value.ItemAmount}
                                        </Text>
                                        <View style={styles.sectionPrice}>
                                            <Text>{value.ItemSize.name}</Text>
                                            <Text>{value.ItemSize.price},000đ</Text>
                                        </View>
                                        <View style={styles.Section}>
                                            <Text>Topping thêm:</Text>
                                            {value.ItemTopping.map((topping, index) =>

                                                <View style={styles.sectionItem} key={index}>
                                                    <Text>{topping.name}</Text>
                                                    <Text>+{topping.price},000đ</Text>
                                                </View>
                                            )}
                                        </View>
                                        <View style={styles.Section}>
                                            <Text>Lượng đường và đá:</Text>
                                            {value.ItemIS.map((IS, index) =>

                                                <View style={styles.sectionItem} key={index}>
                                                    <Text>{IS.name}</Text>
                                                    <Text>+0đ</Text>
                                                </View>
                                            )}
                                        </View>
                                        <Text style={styles.orderNote}>Ghi chú: {value.ItemNote}</Text>
                                    </View>
                                </View>
                                <Text style={styles.Total}>{value.ItemTotal},000đ</Text>
                            </View>
                        )}
                    </ScrollView>

                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={FinishOrder}
                    >
                        <Text style={styles.logoutButtonText}>
                            HOÀN THÀNH ĐƠN HÀNG
                        </Text>
                    </TouchableOpacity>
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
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: '#EBF0F4',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userContent: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.5,
        elevation: 3,
    },
    imgAvt: {
        width: 100,
        height: 100,
    },
    userDetail: {
        height: '100%',
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: 'flex-start',
        paddingLeft: 10,
    },
    Free: {
        height: '40%',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    FreeContainer: {
        width: '100%',
        height: 15,
        borderRadius: 30,
        borderWidth: 1,
        marginTop: 10,
    },
    FreeCount: {
        height: '100%',
        backgroundColor: 'red',
        width: '50%',
        borderRadius: 30,
    },
    userName: {
        fontSize: 20,
        fontWeight: 700,
    },
    userRank: {
        fontSize: 16,
        fontWeight: 700,
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
    orderbtn: {
        width: '100%',
        padding: 10,
        marginTop: 5,
        backgroundColor: 'white',
    },
    orderTitlebtn: {
        fontSize: 20,
        fontWeight: 700,
        alignSelf: 'center',
        marginBottom: 10
    },
    ItemInfo: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    ItemText: {
        fontSize: 16,
    },
    Total: {
        fontSize: 18,
        fontWeight: 700,
        color: 'red',
        alignSelf: 'flex-end'
    },
    btnContainer: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
    },
    btn: {
        marginBottom: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '45%',
        height: 130,
        padding: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.5,
        elevation: 3,
    },
    btnText: {
        fontSize: 17,
    },
    ModalContainer: {
        height: '100%',
        backgroundColor: '#EBF0F4',
        position: 'relative',
        alignItems: 'center',
        flex: 1
    },
    logoutButton: {
        height: 50,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#3AC5C8',
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
        borderBottomWidth: 1,
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
        paddingLeft: 20,
        flexDirection: 'column',
    },
    sectionItem: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 30,
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
    }

});
export default VoucherModal;