import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import ButtonX from "../Component/Button/buttonX";
import OrderItems from "../Component/Order/orderItem";
import { AppContext } from "../context/AppContext";
import ConfirmNoti from "../Component/Button/confirmNoti";
import Noti from '../Component/Login/notification'

const Order = ({ navigation, route }) => {

    const { OrderItem, setOrderItem,
        subAmount, setSubAmount,
        subTotal, setSubTotal,
        location, isLog
    } = useContext(AppContext)

    const [popup, setPopup] = useState(false)

    function openNoti() {
        setPopup(true)
    }

    function closePopup() {
        setPopup(false)
    }

    const [popupNoti, setPopupNoti] = useState(false)

    function closePopupNoti() {
        setPopupNoti(false)
    }

    function Confirm() {
        setPopup(false)
        setOrderItem([])
        setSubAmount(0)
        setSubTotal(0)
    }

    function GoToPay() {
        if (isLog) navigation.navigate('Pay')
        else setPopupNoti(true)
    }

    function GoBack(go) {
        navigation.navigate(location)
    }

    function UpdatePaytab(amount, total) {
        var tempTotal = subTotal + total
        var tempAmount = subAmount + amount
        setSubTotal(tempTotal)
        setSubAmount(tempAmount)
    }


    function Delete(deleteIndex) {
        var tempTotal = subTotal - OrderItem[deleteIndex].ItemTotal
        var tempAmount = subAmount - OrderItem[deleteIndex].ItemAmount
        setSubTotal(tempTotal)
        setSubAmount(tempAmount)
        setOrderItem(prevSetTemp => prevSetTemp.filter((_, index) => index !== deleteIndex));
    }

    return (
        <>
            {subTotal !== 0 ? (
                <View style={styles.container}>
                    <View style={styles.orderHeader}>
                        <ButtonX Go={GoBack} ButtonName={'ĐƠN HÀNG'} />
                    </View>
                    <TouchableOpacity style={styles.Delete} onPress={openNoti}>
                        <Text style={styles.DeleteText}>Xoá đơn hàng</Text>
                    </TouchableOpacity>
                    <ScrollView style={styles.orderMain}>
                        {OrderItem.map((item, index) =>
                            <OrderItems
                                key={index}
                                item={item}
                                Delete={Delete}
                                id={index}
                            />
                        )}
                    </ScrollView>
                    <View style={styles.orderTotal}>
                        <TouchableOpacity style={styles.Total}>
                            <Text style={styles.TotalText} onPress={GoToPay}>Thanh toán - {subTotal},000đ</Text>
                        </TouchableOpacity>
                    </View>
                    <ConfirmNoti
                        title={'Bạn muốn xoá đơn hàng'}
                        popup={popup}
                        closePopup={closePopup}
                        Confirm={Confirm}
                    />
                    <Noti
                        popup={popupNoti}
                        closePopup={closePopupNoti}
                        title={'Hãy đăng nhập để thanh toán!!'}
                    />
                </View>
            ) : (
                <View style={[styles.container, { paddingBottom: 0 }]}>
                    <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontStyle: 600 }}>Không có sản phẩm nào!</Text>
                    </View>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        //height: 'auto',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        position: 'relative',
        paddingBottom: 70,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        marginBottom: 2,
    },
    orderTitle: {
        width: '40%',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 600,
    },
    CloseButton: {
        width: '20%',
        paddingLeft: 10,
    },
    Delete: {
        width: '50%',
        padding: 5,
        paddingLeft: 10
    },
    DeleteText: {
        textAlign: 'left',
        fontSize: 18,
        fontWeight: 600,
        color: 'red',
    },
    orderMain: {
        height: 'auto',
        flexDirection: 'column',
        padding: 10,
        paddingTop: 0,
    },
    orderTotal: {
        height: 70,
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'fixed',
        bottom: 0,
    },
    Total: {
        borderRadius: 10,
        height: 50,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3AC5C8',
    },
    TotalText: {
        fontSize: 17,
        fontWeight: 600,
        color: 'white',
    }
});
export default Order;