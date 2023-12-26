import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Image } from "react-native";
import { database } from "../../firebaseConfig";
import { ref, onValue, set } from 'firebase/database';

const Menu = ({ GoTo, GetMenuKey }) => {

    const [ItemList, setItemList] = useState([])

    useEffect(() => {
        const itemRef = ref(database, 'MENU');

        const unsubscribe = onValue(itemRef, (snapshot) => {
            const itemData = snapshot.val();
            if (itemData) {
                const itemsArray = Object.values(itemData);
                setItemList(itemsArray);
            } else {
                setItemList([]);
            }
        });

        return () => {
            unsubscribe();
        };

    }, []);

    function handleHome() {
        GoTo('Home')
    }

    const btnColor = [
        { backgroundColor: '#4FBEBF' },
        { backgroundColor: '#C83A39' },
        { backgroundColor: '#258E92' },
        { backgroundColor: '#4CC83A' },
        { backgroundColor: '#C89A3A' },
    ];

    return (
        <View style={{ width: '100%' }}>
            <View style={styles.titleContainer}>
                <Text style={styles.Title}>Loại đồ uống</Text>
                <TouchableOpacity
                    onPress={handleHome}
                >
                    <Text style={styles.Title}>Xem tất cả</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                style={styles.container}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {ItemList.map((value, index) =>
                    <TouchableOpacity
                        style={styles.btnContainer}
                        key={index}
                        onPress={() => { GetMenuKey(value.name, index) }}
                    >
                        <View style={[styles.btn, btnColor[index]]}>
                            <Image
                                style={styles.btnImg}
                                source={require("../../assets/images/Menu Button/" + value.name + ".png")}
                            />
                            <Text style={styles.btnText}>{value.name}</Text>

                        </View>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 10,

    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    Title: {
        fontSize: 18,
        fontWeight: 700,
    },
    btnContainer: {
        height: 150,
        justifyContent: 'flex-end',
    },
    btn: {
        height: 100,
        width: 150,
        paddingBottom: 5,
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'relative',
        borderRadius: 10,
        margin: 5,
    },
    btnImg: {
        width: 100,
        height: 100,
        position: 'absolute',
        top: -40,
    },
    btnText: {
        fontSize: 16,
        fontWeight: 600,
        color: 'white',
    },
});

export default Menu;