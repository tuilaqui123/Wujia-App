import React from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";

const ConfirmNoti = ({ popup, closePopup, title, Confirm }) => {
    function handlePopup() {
        closePopup()
    }

    function handleConfirm() {
        closePopup()
        Confirm()
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
                    <View style={styles.noti}>
                        <TouchableOpacity style={styles.notiButton} onPress={handleConfirm}>
                            <Text style={[styles.notiButtonText, { color: 'black' }]}>Xác nhận</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.notiButton} onPress={handlePopup}>
                            <Text style={[styles.notiButtonText, { color: 'red' }]}>Huỷ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(110, 110, 110, 0.7)',
    },
    container: {
        width: '70%',
        height: 120,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderRadius: 5,
    },
    noti: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    notiText: {
        fontSize: 16,
        fontWeight: 600,
    },
    notiButton: {
        width: '30%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    notiButtonText: {
        fontSize: 16,
        fontWeight: 600,
    }
});
export default ConfirmNoti;