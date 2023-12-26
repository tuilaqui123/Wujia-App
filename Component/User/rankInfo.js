import React from "react";
import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
//21520419 - Phạm Ngọc Qúi
const RankNoti = ({ popup, closePopup }) => {
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
                    <View>
                        <Text style={styles.notiTitle}>THÔNG TIN VỀ THÀNH VIÊN</Text>
                        <Text style={styles.notiText}>Dựa theo tổng tiền đã mua:</Text>
                        <Text style={[styles.notiText, { marginBottom: 10 }]}>Quy đổi 1000đ = 1 điểm</Text>
                        <Text style={styles.notiText}>Dưới 300 điểm: Đồng</Text>
                        <Text style={styles.notiText}>Trên 300 điểm và dưới 600 điểm: Bạc</Text>
                        <Text style={styles.notiText}>Trên 600 điểm và dưới 900 điểm: Vàng</Text>
                        <Text style={styles.notiText}>Trên 900 điểm: Bạch Kim</Text>
                    </View>
                    <TouchableOpacity style={styles.notiButton} onPress={handlePopup}>
                        <Text style={styles.notiButtonText}>OK</Text>
                    </TouchableOpacity>
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
        width: '90%',
        height: 'auto',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderRadius: 5,
    },
    notiTitle: {
        fontSize: 18,
        fontWeight: 700,
        textAlign: 'center',
        marginBottom: 10,
    },
    notiText: {
        fontSize: 16,
        fontWeight: 600,
    },
    notiButton: {
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingRight: 15,
        marginTop: 10
    },
    notiButtonText: {
        fontSize: 16,
        color: '#02afd6',
        fontWeight: 600,
    }
});
//21520419 - Phạm Ngọc Qúi
export default RankNoti;