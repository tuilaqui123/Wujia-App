import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Modal, TextInput, ScrollView } from "react-native";
import { database } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import ButtonX from "../Component/Button/buttonX";
import AdjustButton from "../Component/Button/adjustButton";
import Section from "../Component/Item/section";
import SizePicker from "../Component/Item/sizePicking";
import Noti from "../Component/Login/notification";
import { AppContext } from "../context/AppContext";
import IS from "../Component/Item/IS";

const ItemPopup = ({ popup, closePopup, Name, Price, ImageLink }) => {

    const { OrderItem, setOrderItem,
        subAmount, setSubAmount,
        subTotal, setSubTotal,
        isOrder, setIsOrder,
        OrderAddress, setOrderAddress,
        email, setEmail,
        userInfo, setUserInfo,
        isLog, setIsLog,
        location, setLocation,
        itemList, GetOrderItem
    } = useContext(AppContext)

    const [Amount, setAmount] = useState(1)
    const [size, setSize] = useState({ name: "Nhỏ 500cc", price: parseInt(Price) });
    const [ice, setIce] = useState({ name: "100% đá", price: parseInt(0) });
    const [sg, setSg] = useState({ name: "100% đường", price: parseInt(0) });
    const [Total, setTotal] = useState(0)
    const [Note, setNote] = useState('')
    const [sizeTotal, setSizeTotal] = useState(parseInt(size.price))

    const [sectionTopping, setSectionTopping] = useState([])

    const [sectionToppingInfo, setSectionToppingInfo] = useState([])

    useEffect(() => {
        const toppingRef = ref(database, 'SECTION/TOPPING/');

        const TOPPING = onValue(toppingRef, (snapshot) => {
            const itemData = snapshot.val();
            if (itemData) {
                const itemsArray = Object.values(itemData);
                setSectionTopping(itemsArray);
            } else {
                setSectionTopping([]);
            }
        });

        return () => {
            TOPPING();
        };

    }, []);

    function UpdateSizeTotal(temp) {
        setSizeTotal(temp)
    }

    function AdjustAmount(amount) {
        setAmount(amount)
    }

    function UpdateSectionPrice(temp) {
        var sectionTemp = parseInt(Total) + parseInt(temp)
        setTotal(sectionTemp)
    }


    function handleItemInfo() {
        GetOrderItem(
            ImageLink,
            Name,
            size,
            parseInt(Total),
            sectionToppingInfo,
            ice,
            sg,
            Note,
            Amount,
            (parseInt(sizeTotal) + parseInt(Total)) * Amount
        )
        setAmount(1)
        setTotal(0)
        setNote('')
        setSize({ name: "Nhỏ 500cc", price: parseInt(Price) })
        setIce({ name: "100% đá", price: parseInt(0) })
        setSg({ name: "100% đường", price: parseInt(0) })
        closePopup(true)
    }

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={popup}
        >

            <View style={styles.container}>
                <ButtonX Go={closePopup} ButtonName={'THÔNG TIN SẢN PHẨM'} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.popupMain}>
                        <View style={styles.Title}>
                            <Image
                                style={styles.itemImage}
                                source={require("../assets/images/ITEM/" + ImageLink)}
                            />
                            <Text style={styles.itemTilte}>{Name.toUpperCase()}</Text>
                            <View style={styles.sizeView}>
                                <Text style={styles.itemText}>{size.name}</Text>
                                <Text style={styles.itemTilte}>{size.price},000đ</Text>
                            </View>
                        </View>
                        <View style={styles.Section} >
                            <SizePicker
                                setSize={setSize}
                                UpdateSizeTotal={UpdateSizeTotal}
                                basePrice={Price}
                            />
                            <Section
                                title={'TOPPING THÊM'}
                                data={sectionTopping}
                                tempArr={sectionToppingInfo}
                                setTempArr={setSectionToppingInfo}
                                UpdateSectionPrice={UpdateSectionPrice}
                            />
                            <IS
                                title={'LƯỢNG ĐƯỜNG'}
                                cate={'đường'}
                                setValue={setSg}

                            />
                            <IS
                                title={'LƯỢNG ĐÁ'}
                                cate={'đá'}
                                setValue={setIce}

                            />
                        </View>
                        <View style={styles.Note}>
                            <TextInput
                                style={styles.itemNote}
                                placeholder="Thêm lời nhắn..."
                                multiline={true}
                                onChangeText={newText => { setNote(newText) }}
                                value={Note}
                            />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.quantity}>
                    <View style={{ width: '40%' }}>
                        <AdjustButton AdjustAmount={AdjustAmount} baseAmount={Amount} />
                    </View>
                    <TouchableOpacity style={styles.Total} onPress={handleItemInfo}>
                        <Text style={styles.TotalText}>Thêm - {(parseInt(sizeTotal) + parseInt(Total)) * Amount},000đ</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Modal>

    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        flex: 1,
        backgroundColor: 'white',
    },
    popupMain: {
        height: 'auto',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 80,
    },
    Title: {
        flexDirection: 'column',
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingLeft: '10',
        paddingRight: '10',
        marginBottom: 15,
    },
    Section: {
        width: '90%',
    },
    itemTilte: {
        fontSize: 22,
        fontWeight: 700,
        paddingTop: 5,
    },
    itemText: {
        fontSize: 16,
        fontWeight: 600,
    },
    itemImage: {
        height: 170,
        width: '100%',
        borderRadius: 10,
    },
    Note: {
        width: '90%',
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
    sizeView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    quantity: {
        height: 70,
        width: '100%',
        backgroundColor: 'white',
        zIndex: 2,
        position: 'absolute',
        borderEndEndRadius: 15,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    Total: {
        borderRadius: 10,
        height: 50,
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3AC5C8',
    },
    TotalText: {
        fontSize: 17,
        fontWeight: 600,
        color: 'white'
    }


});

export default ItemPopup;