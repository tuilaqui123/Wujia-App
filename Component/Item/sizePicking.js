import React, { useState } from "react";
import { View, StyleSheet, Text, CheckBox } from "react-native";


const SizePicker = ({ setSize, UpdateSizeTotal, basePrice }) => {
    const [isSelected1, setIsSelected1] = useState(true);
    const [isSelected2, setIsSelected2] = useState(false);
    const [isSelected3, setIsSelected3] = useState(false);


    return (
        <View style={styles.container}>
            <Text style={styles.Title}>THỂ TÍCH LY</Text>
            <View style={styles.checkbox}>
                <View style={styles.Item}>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={isSelected1}
                            onValueChange={() => {
                                setIsSelected1(true)
                                setIsSelected2(false)
                                setIsSelected3(false)
                                setSize({ name: "Nhỏ 500cc", price: parseInt(basePrice) })
                                UpdateSizeTotal(parseInt(basePrice))
                            }}
                            style={styles.checkbox}
                        />
                        <Text style={styles.checkText}>Nhỏ 500cc</Text>
                    </View>
                    <Text style={styles.checkText}>+{basePrice}đ</Text>
                </View>
                <View style={styles.Item}>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={isSelected2}
                            onValueChange={() => {
                                setIsSelected2(true)
                                setIsSelected1(false)
                                setIsSelected3(false)
                                setSize({ name: "Vừa 700cc", price: parseInt(basePrice) + 5 })
                                UpdateSizeTotal(parseInt(basePrice) + 5)

                            }}
                            style={styles.checkbox}
                        />
                        <Text style={styles.checkText}>Vừa 700cc</Text>
                    </View>
                    <Text style={styles.checkText}>+{parseInt(basePrice) + 5},000đ</Text>
                </View>
                <View style={styles.Item}>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={isSelected3}
                            onValueChange={() => {
                                setIsSelected3(true)
                                setIsSelected1(false)
                                setIsSelected2(false)
                                setSize({ name: "Lớn 1000cc", price: parseInt(basePrice) + 8 })
                                UpdateSizeTotal(parseInt(basePrice) + 8)

                            }}
                            style={styles.checkbox}
                        />
                        <Text style={styles.checkText}>Lớn 1000cc</Text>
                    </View>
                    <Text style={styles.checkText}>+{parseInt(basePrice) + 8},000đ</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        padding: 10,
        paddingBottom: 0,
        marginBottom: 10,
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
    Title: {
        fontSize: 16,
        fontWeight: 700,
    },
    checkbox: {
        padding: 10
    },
    Item: {
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
        padding: 10
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

export default SizePicker;
