import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import ItemPopup from "../../page/itemPopup";
import { AppContext } from "../../context/AppContext";

const Item = ({ Name, Price, ImageLink }) => {
    const [popup, setPopup] = useState(false)

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

    function handleModal() {
        setPopup(true)
    }

    function closePopup(close) {
        if (close) setPopup(false)
    }

    return (
        <View>
            <TouchableOpacity
                style={styles.container}
                onPress={handleModal}
            >
                <View style={styles.containerImage}>
                    <Image
                        style={styles.Img}
                        source={require("../../assets/images/ITEM/" + ImageLink)}
                    //source={require("../../assets/images/ITEM/")}
                    />
                </View>
                <View style={styles.contextImage}>
                    <Text style={styles.contextTextName} numberOfLines={1}>{Name.toUpperCase()}</Text>
                    <Text style={styles.contextTextPrice}>{Price}đ</Text>
                </View>
            </TouchableOpacity>
            <ItemPopup
                popup={popup}
                closePopup={closePopup}
                Name={Name}
                ImageLink={ImageLink}
                Price={Price}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 230,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
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
    containerImage: {
        width: '100%',
        height: '75%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Img: {
        width: '90%',
        height: '90%',
        borderRadius: 10,
        //borderWidth: 1,
    },
    contextImage: {
        width: '100%',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    contextTextName: {
        fontSize: 16,
        fontWeight: 600,
    },
    contextTextPrice: {
        fontSize: 17,
        fontWeight: 600,
    }
});

export default Item;