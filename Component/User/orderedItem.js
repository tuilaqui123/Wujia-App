import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ScrollView } from "react-native";
import ButtonX from "../../Component/Button/buttonX";
import { database } from "../../firebaseConfig";
import { ref, onValue, set } from 'firebase/database';
import { AppContext } from "../../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
import OrderDetail from "./orderDetail";

const OrderedItem = ({ item, id, DeleteOrder }) => {

    const [controlDetail, setCtrlDetail] = useState(false)

    function openDetail() {
        setCtrlDetail(true)
    }

    function CloseDetail() {
        setCtrlDetail(false)
    }

    return (
        <>
            <TouchableOpacity style={styles.orderContainer} onPress={openDetail}>
                <View style={styles.statusContainer}>
                    <Text style={styles.btnText}>ID: {id}</Text>
                    <Text style={styles.btnText}>Trạng thái:
                        <Text style={{ color: 'green' }}> {item.status}</Text>
                    </Text>
                </View>

                <View style={styles.addressInfo}>
                    <Text style={styles.title}>Thông tin giao hàng</Text>
                    <Text style={styles.addtext}>Tên người đặt: {item.OrderAddress.orderName} </Text>
                    <Text style={styles.addtext}>Số điện thoại: {item.OrderAddress.orderPhone} </Text>
                    <Text style={styles.addtext}>Địa chỉ giao hàng: {item.OrderAddress.orderAddress} </Text>
                </View>

                {item.OrderItem.map((value, OrderIndex) =>
                    <View style={styles.order} key={OrderIndex}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                style={styles.itemImg}
                                source={require("../../assets/images/ITEM/" + value.ItemImageLink)}
                            />
                            <View style={styles.orderInfo}>
                                <Text style={styles.orderTitle}>
                                    {OrderIndex + 1}. {value.ItemName}   x{value.ItemAmount}
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
                                            <Text>+{topping.price}đ</Text>
                                        </View>
                                    )}
                                </View>
                                <View style={styles.Section}>
                                    <Text>Lượng đường:</Text>
                                    <View style={styles.sectionItem}>
                                        <Text>{value.ItemSg.name}</Text>
                                        <Text>+0đ</Text>
                                    </View>
                                </View>
                                <View style={styles.Section}>
                                    <Text>Lượng đá:</Text>
                                    <View style={styles.sectionItem}>
                                        <Text>{value.ItemIce.name}</Text>
                                        <Text>+0đ</Text>
                                    </View>
                                </View>
                                <Text style={styles.orderNote}>Ghi chú: {value.ItemNote}</Text>
                            </View>
                        </View>
                        <Text style={styles.Total}>{value.ItemTotal},000đ</Text>
                    </View>
                )}
            </TouchableOpacity>
            <OrderDetail
                controlDetail={controlDetail}
                CloseDetail={CloseDetail}
                id={id}
                item={item}
                DeleteOrder={DeleteOrder}
            />
        </>
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
        borderRadius: 10,
        marginBottom: 15,
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
export default OrderedItem;