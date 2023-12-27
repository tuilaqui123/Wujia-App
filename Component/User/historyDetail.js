import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ScrollView } from "react-native";
import ButtonX from "../Button/buttonX";
import InfoOrder from "../Order/infoOrder"
import { AppContext } from "../../context/AppContext";


const HistoryDetail = ({ controlDetail, CloseDetail, item }) => {

    console.log(item)

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={controlDetail}
        >
            <View style={styles.ModalContainer}>
                <ButtonX Go={CloseDetail} ButtonName={'ID: 1'} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ width: '100%', paddingBottom: 50, marginTop: 10, }}
                >
                    <View style={styles.mainContainer} >
                        {item.map((value, index) =>
                            <View style={styles.Touch} key={index}>
                                <View style={styles.TitleContainer}>
                                    <Text style={styles.Title}>{value.ItemName} x{value.ItemAmount}</Text>
                                    <View style={styles.Title2Container}>
                                        <Text style={styles.Title2}>{value.ItemSize.name}</Text>
                                        <Text style={styles.Title2}>+{value.ItemSize.price},000đ</Text>
                                    </View>
                                </View>
                                <View style={styles.orderInfo}>
                                    <Image
                                        style={styles.infoImg}
                                        source={require("../../assets/images/ITEM/" + value.ItemImageLink)}
                                    />
                                    <View style={styles.infoContent}>
                                        <View>
                                            {value.ItemTopping ? (
                                                <InfoOrder
                                                    name={"Topping thêm"}
                                                    content={value.ItemTopping}
                                                />
                                            ) : (
                                                <View></View>
                                            )}

                                            <View style={styles.icontainer}>
                                                <Text>Lượng đường</Text>
                                                <View style={styles.infoContainer}>
                                                    <View style={styles.iinfo}>
                                                        <Text>- {value.ItemSg.name}</Text>
                                                        <Text>+0đ</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.icontainer}>
                                                <Text>Lượng đá</Text>
                                                <View style={styles.infoContainer}>
                                                    <View style={styles.iinfo}>
                                                        <Text>- {value.ItemIce.name}</Text>
                                                        <Text>+0đ</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <Text style={styles.infoNote}>Ghi chú: {value.ItemNote}</Text>
                                    </View>
                                </View>
                                <View style={styles.Total} >
                                    <Text style={styles.TotalText}>
                                        Tổng cộng: {(value.ItemSize.price + value.ItemSection) * value.ItemAmount},000đ
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    ModalContainer: {
        height: '100%',
        backgroundColor: '#EBF0F4',
        position: 'relative',
        alignItems: 'center',
        flex: 1
    },
    mainContainer: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    container: {
        width: '95%',
        height: 'auto',
        flexDirection: 'column',
        padding: 10,
        marginTop: 5,
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
        width: '95%',
        flexDirection: 'colum',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 5,
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
export default HistoryDetail;