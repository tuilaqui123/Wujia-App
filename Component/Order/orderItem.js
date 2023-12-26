import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Image, TouchableOpacity } from "react-native";
import AdjustButton from "../Button/adjustButton";
import InfoOrder from "./infoOrder";
import ConfirmNoti from "../Button/confirmNoti";

const OrderItems = ({ item, id, Delete }) => {
    const [Amount, setAmount] = useState(item.ItemAmount)

    const [popup, setPopup] = useState(false)

    function openNoti() {
        setPopup(true)
    }

    function closePopup() {
        setPopup(false)
    }

    function Confirm() {
        setPopup(false)
        handleDelete()
    }

    function AdjustAmount(amount) {
        setAmount(amount)
        if (amount > item.ItemAmount) {
            item.ItemAmount = amount
        }
        else {
            item.ItemAmount = amount
        }
    }

    function handleDelete() {
        Delete(id)
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.Touch}>
                <View style={styles.TitleContainer}>
                    <Text style={styles.Title}>{item.ItemName}</Text>
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
            </TouchableOpacity>
            <View style={styles.quantity}>
                <TouchableOpacity
                    onPress={openNoti}
                    style={{ width: '30%', justifyContent: 'center', alignItems: 'center' }}

                >
                    <Text style={styles.deleteText}>XOÁ</Text>
                </TouchableOpacity>
                <View style={{ width: '40%' }}>
                    <AdjustButton AdjustAmount={AdjustAmount} baseAmount={item.ItemAmount} />
                </View>

            </View>
            <ConfirmNoti
                title={'Bạn muốn xoá sản phẩm?'}
                popup={popup}
                closePopup={closePopup}
                Confirm={Confirm}
            />
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
    Touch: {
        width: '100%',
        flexDirection: 'colum',
        justifyContent: 'center',
        alignItems: 'center',
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
    Note: {
        width: '90%',
        marginBottom: 10,
    },
    itemNote: {
        width: '100%',
        height: 100,
        borderRadius: 10,
        textAlignVertical: 'top',
        padding: 15,
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
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
export default OrderItems;