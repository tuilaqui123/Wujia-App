import React, { useState, useEffect, useContext } from "react";
import { FlatGrid } from 'react-native-super-grid';
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { database } from '../../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import Item from "../Item/Item";
import { AppContext } from "../../context/AppContext";

const HomeSection = ({ Link, Title }) => {

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

    const [ItemList, setItemList] = useState([])

    useEffect(() => {
        const itemRef = ref(database, Link);

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

    return (
        <View style={styles.container}>
            <Text style={styles.Tilte}>{Title}</Text>
            <FlatGrid
                data={ItemList}
                style={styles.itemDisplay}
                spacing={15}
                renderItem={({ item }) => (
                    <Item
                        Name={item.name}
                        ImageLink={"NEW/" + item.name + ".png"}
                        Price={item.price}
                    />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    itemDisplay: {
        flex: 1,
    },
    Tilte: {
        fontSize: 18,
        fontWeight: 700,
        alignSelf: 'center'
    },
    item: {
        marginRight: 5,
    }
});

export default HomeSection;