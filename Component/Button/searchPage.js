import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { FlatGrid } from 'react-native-super-grid';
import { database } from '../../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import Item from "../Item/Item";
import { AppContext } from "../../context/AppContext";

const SearchPage = ({ ListName, value }) => {

    const [SearchItem, setSearchItem] = useState([])

    useEffect(() => {
        // Create a temporary array to accumulate matching items
        const tempArray = [];

        for (let i = 0; i < ListName.length; i++) {
            var index = i + 1;
            onValue(ref(database, 'MENU/menu_' + index), (snapshot) => {
                const itemData = snapshot.val();
                if (itemData) {
                    const item = Object.values(itemData);

                    for (let i = 0; i < item.length; i++) {
                        if (item[i] && item[i].name) {
                            const ItemName = item[i].name.toUpperCase();
                            const isFound = ItemName.includes(value.toUpperCase());
                            if (isFound) {
                                var temp = {
                                    tag: itemData.name,
                                    name: item[i].name,
                                    price: item[i].price
                                };
                                // Push the matching item into the temporary array
                                tempArray.push(temp);
                            }
                        }
                    }
                }
            });
        }

        // Update the state after the loop
        setSearchItem((prevSearchItem) => [...prevSearchItem, ...tempArray]);
    }, [value]);

    function GetItem(tag, item) {
        for (let i = 0; i < item.length; i++) {
            if (item[i] && item[i].name) {
                const ItemName = item[i].name.toUpperCase();
                const isFound = ItemName.includes(value.toUpperCase());
                if (isFound) {
                    var temp = {
                        tag: tag.name,
                        name: item[i].name,
                        price: item[i].price
                    }
                    console.log(temp)
                }
            }
        }
    }


    return (
        <View>
            <Text style={styles.listname}>Tìm kiếm của "{value}"</Text>
            <FlatGrid
                data={SearchItem}
                style={styles.itemDisplay}
                spacing={15}
                renderItem={({ item }) => (
                    <Item
                        Name={item.name}
                        ImageLink={item.tag + "/" + item.name + ".png"}
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

export default SearchPage;