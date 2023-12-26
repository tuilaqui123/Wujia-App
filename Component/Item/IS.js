import React, { useState } from "react";
import { View, StyleSheet, Text, CheckBox } from "react-native";


const IS = ({ title, setValue, cate }) => {
    const [isSelected1, setIsSelected1] = useState(false);
    const [isSelected2, setIsSelected2] = useState(false);
    const [isSelected3, setIsSelected3] = useState(false);
    const [isSelected4, setIsSelected4] = useState(false);
    const [isSelected5, setIsSelected5] = useState(true);


    return (
        <View style={styles.container}>
            <Text style={styles.Title}>{title}</Text>
            <View style={styles.checkbox}>

                <View style={styles.Item}>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={isSelected1}
                            onValueChange={() => {
                                setIsSelected1(true)
                                setIsSelected2(false)
                                setIsSelected3(false)
                                setIsSelected4(false)
                                setIsSelected5(false)
                                setValue({ name: "0% " + cate, price: parseInt(0) })
                            }}
                            style={styles.checkbox}
                        />
                        <Text style={styles.checkText}>0% {cate}</Text>
                    </View>
                    <Text style={styles.checkText}>+ 0đ</Text>
                </View>

                <View style={styles.Item}>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={isSelected2}
                            onValueChange={() => {
                                setIsSelected1(false)
                                setIsSelected2(true)
                                setIsSelected3(false)
                                setIsSelected4(false)
                                setIsSelected5(false)
                                setValue({ name: "30% " + cate, price: parseInt(0) })
                            }}
                            style={styles.checkbox}
                        />
                        <Text style={styles.checkText}>30% {cate}</Text>
                    </View>
                    <Text style={styles.checkText}>+ 0đ</Text>
                </View>

                <View style={styles.Item}>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={isSelected3}
                            onValueChange={() => {
                                setIsSelected1(false)
                                setIsSelected2(false)
                                setIsSelected3(true)
                                setIsSelected4(false)
                                setIsSelected5(false)
                                setValue({ name: "50% " + cate, price: parseInt(0) })
                            }}
                            style={styles.checkbox}
                        />
                        <Text style={styles.checkText}>50% {cate}</Text>
                    </View>
                    <Text style={styles.checkText}>+ 0đ</Text>
                </View>

                <View style={styles.Item}>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={isSelected4}
                            onValueChange={() => {
                                setIsSelected1(false)
                                setIsSelected2(false)
                                setIsSelected3(false)
                                setIsSelected4(true)
                                setIsSelected5(false)
                                setValue({ name: "70% " + cate, price: parseInt(0) })
                            }}
                            style={styles.checkbox}
                        />
                        <Text style={styles.checkText}>70% {cate}</Text>
                    </View>
                    <Text style={styles.checkText}>+ 0đ</Text>
                </View>

                <View style={styles.Item}>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={isSelected5}
                            onValueChange={() => {
                                setIsSelected1(false)
                                setIsSelected2(false)
                                setIsSelected3(false)
                                setIsSelected4(false)
                                setIsSelected5(true)
                                setValue({ name: "100% " + cate, price: parseInt(0) })
                            }}
                            style={styles.checkbox}
                        />
                        <Text style={styles.checkText}>100% {cate}</Text>
                    </View>
                    <Text style={styles.checkText}>+ 0đ</Text>
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
        padding: 10,
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

export default IS;
