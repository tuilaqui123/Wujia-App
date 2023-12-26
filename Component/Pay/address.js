import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";


const Address = () => {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    return (
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
    );
}

const styles = StyleSheet.create({
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
export default Address;