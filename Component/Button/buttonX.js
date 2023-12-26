import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const ButtonX = ({ Go, ButtonName }) => {
    function handleModal() {
        Go(true)
    }
    return (
        <View style={styles.Header}>
            <View style={styles.CloseButton} >
                <TouchableOpacity
                    onPress={handleModal}
                >
                    <FontAwesomeIcon icon={faXmark} size={30} />
                </TouchableOpacity>
            </View>
            <Text style={styles.Title}>{ButtonName}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Header: {
        height: 50,
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        position: 'relative',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    Title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 700,
    },
    CloseButton: {
        position: 'absolute',
        right: 10,
    },
});
export default ButtonX;