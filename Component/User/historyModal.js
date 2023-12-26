import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ScrollView } from "react-native";
import ButtonX from "../Button/buttonX";
import InfoOrder from "../Order/infoOrder"
import { AppContext } from "../../context/AppContext";
import HistoryDetail from "./historyDetail";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { database } from '../../firebaseConfig';
import { ref, set, onValue } from 'firebase/database';
import HistoryItem from "./historyItem";
import RankNoti from "./rankInfo";


const HistoryModal = ({ controlHistory, Close }) => {

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

    const [popupNoti, setPopupNoti] = useState(false)

    function openPopupNoti() {
        setPopupNoti(true)
    }

    function closePopupNoti() {
        setPopupNoti(false)
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={controlHistory}
        >
            <View style={styles.ModalContainer}>
                <ButtonX Go={Close} ButtonName={'LỊCH SỬ ĐẶT HÀNG'} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ width: '100%' }}
                >
                    <View style={styles.mainContainer}>
                        <View style={styles.headContainer}>
                            <Text style={{ fontSize: 17, fontWeight: 500 }}>Bạn đang có {userRanks.total} điểm</Text>
                            <TouchableOpacity onPress={openPopupNoti}>
                                <FontAwesomeIcon icon={faCircleInfo} size={20} color="gray" />
                            </TouchableOpacity>
                        </View>
                        {userHistory.map((value, index) =>
                            <HistoryItem
                                key={index}
                                id={index + 1}
                            />
                        )}
                    </View>
                </ScrollView>
                <RankNoti
                    popup={popupNoti}
                    closePopup={closePopupNoti}
                />
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
    headContainer: {
        width: '95%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 700,
    },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 'auto',
        marginTop: 10,
    },
    orderImg: {
        width: '30%',
        height: '100%',
        borderRadius: 10,
    },
    orderDetail: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: 10,
        width: '70%'
    },
    detailContent: {
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

});
export default HistoryModal;