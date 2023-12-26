import React, { useState } from "react";
import { View, StyleSheet, Text, CheckBox } from "react-native";

const CheckBoxInput = ({ Name, Price, tempArr, setTempArr, UpdateSectionPrice }) => {
    //const isSelected = tempArr && tempArr.some(item => item.name === Name);
    const [isSelected, setIsSelected] = useState(false)

    function Selected() {
        if (isSelected) {
            // If the checkbox is checked, remove the item from tempArr
            setTempArr(tempArr.filter(item => item.name !== Name));
            UpdateSectionPrice((parseInt(Price) * -1))
            setIsSelected(false)
        } else {
            // If the checkbox is unchecked, add the item to tempArr
            setTempArr([...tempArr, { name: Name, price: Price }]);
            UpdateSectionPrice((parseInt(Price)))
            setIsSelected(true)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={isSelected}
                    onValueChange={Selected}
                    style={styles.checkbox}
                />
                <Text style={styles.checkText}>{Name}</Text>
            </View>
            <Text style={styles.checkText}>+{Price}đ</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10
    },
    Title: {
        fontSize: 16,
        fontWeight: 700,
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkbox: {
        marginRight: 5,
    },
    checkText: {
        fontSize: 16,
    }
});

export default CheckBoxInput;