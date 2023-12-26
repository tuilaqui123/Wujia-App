import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import CheckBoxInput from "./checkbox";

const Section = ({ title, data, tempArr, setTempArr, UpdateSectionPrice }) => {
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.Title}>{title}</Text>
                <View style={styles.checkbox}>
                    {data.map((value, index) =>
                        <CheckBoxInput
                            key={index}
                            Name={value.name}
                            Price={value.price}
                            tempArr={tempArr}
                            setTempArr={setTempArr}
                            UpdateSectionPrice={UpdateSectionPrice}
                        />
                    )}
                </View>
            </View>
        </View>
    );
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
    }
});

export default Section;