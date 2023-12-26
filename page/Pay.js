import React, { useState, useEffect, useContext } from "react";
import { ScrollView, TouchableOpacity, View, Text, StyleSheet, TextInput } from "react-native";
import PayItem from "../Component/Pay/payItem";
import ButtonX from "../Component/Button/buttonX";
import TotalInfo from "../Component/Pay/total";
import Noti from "../Component/Login/notification";
import { database } from "../firebaseConfig";
import { ref, onValue, set } from 'firebase/database';
import { AppContext } from "../context/AppContext";


const Pay = ({ navigation, route }) => {

    const { OrderItem, setOrderItem,
        subAmount, setSubAmount,
        subTotal, setSubTotal,
        isOrder, setIsOrder,
        OrderAddress, setOrderAddress,
        email, setEmail,
        userInfo, setUserInfo,
        isLog, setIsLog,
        location,
        OrderList, setOrderList
    } = useContext(AppContext)

    const [popup, setPopup] = useState(false)

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const [notiContent, setNotiContent] = useState('')

    const [userRanks, setUserRanks] = useState([])

    useEffect(() => {
        const Ranks = ref(database, 'ACCOUNT/' + email + '/UserRanks')
        onValue(Ranks, (snapshot) => {
            const data = snapshot.val();
            setUserRanks(data)
        });
    }, []);

    function GoBack(go) {
        navigation.navigate(location)
    }

    function handleOrder() {
        const reg = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if (reg.test(phone) == false) {
            setNotiContent('Số điện thoại không đúng!!')
            setPopup(true)
        }
        if (name == '' || phone == '' || address == '') {
            setNotiContent('Mời bạn nhập thông tin đặt hàng!!')
            setPopup(true)
        }
        else {
            setNotiContent('Đặt hàng thành công')

            setOrderList([...OrderList, {
                OrderAddress: {
                    orderName: name,
                    orderPhone: phone,
                    orderAddress: address
                }
                , OrderItem, subTotal, subAmount, status: 'Đang xử lí'
            }])
            setIsOrder(true)
            setPopup(true)

            setSubAmount(0)
            setSubTotal(0)
            setOrderItem([])

        }
    }

    function closePopup(close) {
        if (close) {
            if (name == '' || phone == '' || address == '') {
                setPopup(false)
            }
            else {
                setPopup(false);
                GoBack(true)
            }

        }
    }

    function GoToOrder() {
        navigation.navigate('Order', { location: 'Pay' })
    }

    return (
        <View style={styles.container} >
            <ButtonX Go={GoBack} ButtonName={'THANH TOÁN'} />
            <ScrollView>
                <View style={styles.orderedMain}>
                    <View style={styles.addressContainer} >
                        <Text style={styles.Title}>THÔNG TIN ĐẶT HÀNG</Text>
                        <View style={styles.Note}>
                            <TextInput
                                style={styles.itemNote}
                                placeholder="Tên người đặt hàng"
                                onChangeText={newText => { setName(newText) }}
                                value={name}
                            />
                            <TextInput
                                style={styles.itemNote}
                                placeholder="Số điện thoại đặt hàng"
                                onChangeText={newText => { setPhone(newText) }}
                                value={phone}
                            />
                            <TextInput
                                style={styles.itemNote}
                                placeholder="Địa chỉ giao hàng"
                                onChangeText={newText => { setAddress(newText) }}
                                value={address}
                            />
                        </View>
                    </View>
                    <View style={styles.Main}>
                        <View style={styles.mainHeader}>
                            <Text style={styles.mainTitle}>ĐƠN HÀNG CỦA BẠN</Text>
                            <TouchableOpacity onPress={GoToOrder}>
                                <Text style={styles.updateText}>Sửa</Text>
                            </TouchableOpacity>
                        </View>
                        {OrderItem.map((item, index) =>
                            <PayItem
                                key={index}
                                item={item}
                            />
                        )}
                    </View>
                    <TotalInfo
                        Amount={subAmount}
                        Total={subTotal}
                        ranks={userRanks}
                    />
                </View>
            </ScrollView>
            <View style={styles.ordered}>
                <TouchableOpacity
                    style={styles.orderedButton}
                    onPress={handleOrder}
                >
                    <Text style={styles.orderedText}>ĐẶT HÀNG - {subTotal},000đ</Text>
                </TouchableOpacity>
            </View>

            <Noti
                popup={popup}
                closePopup={closePopup}
                title={notiContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        position: 'relative',
        height: '100%',
        paddingBottom: 90,
    },
    orderedMain: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    Main: {
        backgroundColor: 'white',
        width: '90%',
        padding: 20,
        marginTop: 10,
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.35,
        shadowRadius: 2.5,
        elevation: 3,
    },
    mainHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    mainTitle: {
        fontSize: 18,
        fontWeight: 700,
    },
    updateText: {
        fontSize: 16,
        fontStyle: 600,
        color: 'red',
    },
    ordered: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        bottom: 0,
        backgroundColor: 'white',
    },
    orderedButton: {
        height: 50,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3AC5C8',
        borderRadius: 10,
    },
    orderedText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 700,
    },
    addressContainer: {
        backgroundColor: 'white',
        width: '90%',
        padding: 20,
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.35,
        shadowRadius: 2.5,
        elevation: 3,
    },
    Title: {
        fontSize: 18,
        fontWeight: 700,
    },
    Note: {
        width: '100%',
    },
    itemNote: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        marginTop: 15,
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: 'grey',
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
});
export default Pay;