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


const HistoryItem = ({ id }) => {

    const {
        email
    } = useContext(AppContext)

    const [historyItem, setHistoryItem] = useState([])
    const [total, setTotal] = useState({})

    useEffect(() => {
        const itemRef = ref(database, 'ACCOUNT/' + email + '/UserHistory/ORDER_' + id + '/Items');
        const totalRef = ref(database, 'ACCOUNT/' + email + '/UserHistory/ORDER_' + id);


        const ITEM = onValue(itemRef, (snapshot) => {
            const itemData = snapshot.val();
            if (itemData) {
                const itemsArray = Object.values(itemData);
                setHistoryItem(itemsArray);
            } else {
                setHistoryItem([]);
            }
        });

        const TOTAL = onValue(totalRef, (snapshot) => {
            const itemData = snapshot.val();
            if (itemData) {
                const itemsArray = Object.values(itemData);
                setTotal(itemsArray);
            } else {
                setTotal([]);
            }
        });

        return () => {
            ITEM();
            TOTAL();
        };

    }, []);

    const [controlDetail, setCtrlDetail] = useState(false)

    function OpenDetail() {
        setCtrlDetail(true)
    }

    function CloseDetail(close) {
        if (close) {
            setCtrlDetail(false)
        }
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={OpenDetail}
        >
            <View style={styles.header}>
                <Text style={styles.headerText}>ID: {id}</Text>
                <Text style={styles.headerText}>Tổng cộng: {total[3]},000đ</Text>
            </View>
            {historyItem.map((value, index) =>
                <View
                    key={index}
                    style={styles.orderItem}
                >
                    <Image
                        style={styles.orderImg}
                        source={require('../../assets/images/ITEM/' + value.ItemImageLink)}
                    />
                    <View style={styles.orderDetail}>
                        <Text style={styles.text}>{value.ItemName}</Text>
                        <View style={styles.detailContent}>
                            <Text style={styles.text}>x{value.ItemAmount}</Text>
                            <Text style={styles.text}>{value.ItemTotal},000đ</Text>
                        </View>
                    </View>
                </View>
            )}
            <HistoryDetail
                controlDetail={controlDetail}
                CloseDetail={CloseDetail}
                item={historyItem}
            />

        </TouchableOpacity>
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
    },
    text: {
        fontSize: 16,
    }

});

export default HistoryItem;