import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { FlatGrid } from 'react-native-super-grid';
import { database } from '../../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import Item from "./Item";
import { AppContext } from "../../context/AppContext";

const ItemDisplay = ({ ListName, numID }) => {
    const [ItemList, setItemList] = useState([])

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

    useEffect(() => {
        const itemRef = ref(database, 'MENU/menu_' + numID);

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
        <View>
            <Text style={styles.listname}>{ListName}</Text>
            <FlatGrid
                data={ItemList.slice(0, -1)}
                style={styles.itemDisplay}
                spacing={15}
                renderItem={({ item }) => (
                    <Item
                        Name={item.name}
                        ImageLink={ListName + "/" + item.name + ".png"}
                        Price={item.price}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    itemDisplay: {
        flex: 1,
    },
    listname: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 700,
    }
});

export default ItemDisplay;