import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ScrollView } from "react-native";
import ButtonX from "../../Component/Button/buttonX";
import { database } from "../../firebaseConfig";
import { ref, onValue, set } from 'firebase/database';
import { AppContext } from "../../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDotCircle, faHouse, faMotorcycle, faShop } from "@fortawesome/free-solid-svg-icons";
import ConfirmNoti from '../Button/confirmNoti'

const OrderDetail = ({ controlDetail, CloseDetail, id, item, DeleteOrder }) => {

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
        var temp = parseInt(userRanks.total) + item.subTotal
        var tempRank = "Đồng"
        if (temp >= 300 && temp <= 600) tempRank = 'Bạc'
        if (temp >= 600 && temp <= 900) tempRank = 'Vàng'
        if (temp > 900) tempRank = 'Bạch kim'

        set(ref(database, 'ACCOUNT/' + email + '/UserRanks'), {
            total: (parseInt(userRanks.total) + item.subTotal),
            ranks: tempRank,
            amount: (parseInt(userRanks.amount) + 1)
        })

        set(ref(database, 'ACCOUNT/' + email + '/UserHistory/ORDER_' + (parseInt(userRanks.amount) + 1)), {
            Items: item.OrderItem,
            Address: item.OrderAddress,
            OrderID: (parseInt(userRanks.amount) + 1),
            OrderTotal: item.subTotal
        })
    }

    function FinishOrder() {
        UpdateUserData()
        DeleteOrder(id)
        CloseDetail(true)
    }

    const [popup, setPopup] = useState(false)

    function openNoti() {
        setPopup(true)
    }

    function closePopup() {
        setPopup(false)
    }

    function Confirm() {
        setPopup(false)
        DeleteOrder(id)
        CloseDetail(true)
    }

    // xoa don hang

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={controlDetail}
        >
            <View style={styles.ModalContainer}>
                <ButtonX Go={CloseDetail} ButtonName={'ID: ' + id} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ width: '95%', paddingBottom: 100 }}
                >
                    <View style={styles.deliveryContainer}>
                        <FontAwesomeIcon icon={faShop} size={22} color="#3AC5C8" />
                        <View style={styles.status1}></View>
                        <FontAwesomeIcon icon={faMotorcycle} size={22} color="#3AC5C8" />
                        <View style={styles.status2}></View>
                        <FontAwesomeIcon icon={faHouse} size={22} />
                    </View>

                    <ConfirmNoti
                        title={'Bạn muốn xoá đơn hàng?'}
                        popup={popup}
                        closePopup={closePopup}
                        Confirm={Confirm}
                    />

                    <View style={styles.orderContainer}>
                        <View style={styles.statusContainer}>
                            <TouchableOpacity style={styles.btnCancel} onPress={openNoti}>
                                <Text style={[styles.btnText, { color: 'red' }]}>Huỷ đơn hàng</Text>
                            </TouchableOpacity>
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
                    </View>
                </ScrollView>

                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={FinishOrder}
                >
                    <Text style={styles.logoutButtonText}>
                        ĐÃ NHẬN HÀNG
                    </Text>
                </TouchableOpacity>
            </View>
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
    deliveryContainer: {
        height: 40,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingHorizontal: 10,
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
    status1: {
        width: '35%',
        height: 10,
        borderWidth: 1,
        borderColor: '#9e9ea0',
        backgroundColor: '#3AC5C8',
        borderRadius: 20,
    },
    status2: {
        width: '35%',
        height: 10,
        borderWidth: 1,
        borderColor: '#9e9ea0',
        borderRadius: 20,
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
        color: '#fff',
        fontSize: 17,
        fontWeight: 700,
        marginRight: 10,
    },

});
export default OrderDetail;