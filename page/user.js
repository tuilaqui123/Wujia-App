import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ScrollView } from "react-native";
import ButtonX from "../Component/Button/buttonX";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faRightFromBracket, faClockRotateLeft, faTruck, faTags, faCircleInfo, faMedal } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../context/AppContext";
import OrderModal from "../Component/User/orderModal";
import HistoryModal from "../Component/User/historyModal";
import ConfirmNoti from "../Component/Button/confirmNoti";
import RankNoti from "../Component/User/rankInfo";
import { database } from "../firebaseConfig";
import { ref, onValue, set } from 'firebase/database';

const User = ({ navigation }) => {

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
        OrderList
    } = useContext(AppContext)

    const [controlOrder, setCtrlOrder] = useState(false)
    const [controlHistory, setCtrlHistory] = useState(false)

    const [userNoti, setUserNoti] = useState('')


    console.log(OrderList)

    useEffect(() => {
        var data = userRanks.total
        if (data <= 300) {
            var temp = 300 - data
            setUserNoti('Cần ' + temp + ' điểm để lên hạng')
        }
        if (data >= 300 && data <= 600) {
            var temp = 600 - data
            setUserNoti('Cần ' + temp + ' điểm để lên hạng')
        }
        if (data >= 600 && data <= 900) {
            var temp = 900 - data
            setUserNoti('Cần ' + temp + ' điểm để lên hạng')
        }
        if (data > 900) setUserNoti('')
    }, [])

    function OpenOrder() {
        setCtrlOrder(true)
    }

    function OpenHistory() {
        setCtrlHistory(true)
    }

    function Close(close) {
        if (close) {
            setCtrlOrder(false)
            setCtrlHistory(false)
        }
    }

    function LogOut() {
        set(ref(database, 'ACCOUNT/' + email + '/OrderList'), {
            List: OrderList
        })
        setEmail('')
        setIsLog(false)

        navigation.navigate('MainHome')
    }

    function GoBack(go) {
        navigation.navigate(location)
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
        LogOut()
    }

    const [popupNoti, setPopupNoti] = useState(false)

    function openPopupNoti() {
        setPopupNoti(true)
    }

    function closePopupNoti() {
        setPopupNoti(false)
    }

    return (
        <>
            {isLog ? (
                <View style={styles.container} >
                    <ButtonX Go={GoBack} ButtonName={'TÀI KHOẢN'} />
                    <ScrollView
                        style={{ width: '95%', paddingBottom: 100 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.userContent}>
                            <Image
                                style={styles.imgAvt}
                                source={require('../assets/images/user.jpg')}
                            />
                            <View style={styles.userDetail} >
                                <Text style={styles.userName}>{userInfo.ten} {userInfo.ho} </Text>
                                <Text style={styles.userRank}>Thành viên: {userRanks.ranks} </Text>
                                <Text style={styles.btnText}>Bạn đang có: {userRanks.total} điểm</Text>
                                <Text style={[styles.btnText, { fontWeight: 700, color: 'red', marginTop: 10 }]}>{userNoti}</Text>

                            </View>
                        </View>
                        <View style={styles.btnContainer}>

                            <TouchableOpacity
                                style={styles.btn}
                                onPress={OpenOrder}
                            >
                                <FontAwesomeIcon icon={faTruck} size={50} />
                                <Text style={styles.btnText}>Đơn hàng</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.btn}
                                onPress={OpenHistory}
                            >
                                <FontAwesomeIcon icon={faClockRotateLeft} size={50} />
                                <Text style={styles.btnText}>Lịch sử đặt hàng</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btn} onPress={openPopupNoti}>
                                <FontAwesomeIcon icon={faMedal} size={50} />
                                <Text style={styles.btnText}>Thành viên</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btn} onPress={openNoti}>
                                <FontAwesomeIcon icon={faRightFromBracket} size={50} color="red" />
                                <Text style={[styles.btnText, { color: 'red' }]}>Đăng xuất</Text>
                            </TouchableOpacity>

                        </View>

                    </ScrollView>

                    <ConfirmNoti
                        title={'Bạn muốn đăng xuất?'}
                        popup={popup}
                        closePopup={closePopup}
                        Confirm={Confirm}
                    />

                    <RankNoti
                        popup={popupNoti}
                        closePopup={closePopupNoti}
                    />

                    <OrderModal
                        controlOrder={controlOrder}
                        Close={Close}
                    />

                    <HistoryModal
                        controlHistory={controlHistory}
                        Close={Close}
                    />
                </View>
            ) : (
                <View style={styles.container}>
                    <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontStyle: 600 }}>Hãy đăng nhập để đặt hàng!</Text>
                        <TouchableOpacity
                            style={styles.btnL}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.btnLText}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
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
    btnL: {
        height: 50,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'red',
        borderRadius: 10,
        marginTop: 15,
    },
    btnLText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 17,
        fontWeight: 700,
        marginRight: 10,
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
        bottom: 70,
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
export default User;