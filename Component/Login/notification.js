import React from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
//21520419 - Phạm Ngọc Qúi
const Noti = ({ popup, closePopup, title }) => {
    function handlePopup() {
        closePopup(true)
    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={popup}
        >
            <View style={styles.centeredView}>
                <View style={styles.container}>
                    <Text style={styles.notiText}>{title}</Text>
                    <TouchableOpacity style={styles.notiButton} onPress={handlePopup}>
                        <Text style={styles.notiButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
//21520419 - Phạm Ngọc Qúi
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(110, 110, 110, 0.7)',
    },
    container: {
        width: '85%',
        height: 120,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderRadius: 5,
    },
    notiText: {
        fontSize: 16,
        fontWeight: 600,
    },
    notiButton: {
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    notiButtonText: {
        fontSize: 16,
        color: '#02afd6',
        fontWeight: 600,
    }
});
//21520419 - Phạm Ngọc Qúi
export default Noti;