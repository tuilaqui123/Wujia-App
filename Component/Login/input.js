import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StyleSheet, View, TextInput } from 'react-native';
//21520419 - Phạm Ngọc Qúi
const Input = ({ placeholderText, iconName, GetEmail, GetPassword, GetConfirmPassword, GetHo, GetTen, isSecure }) => {
    const [text, setText] = useState('');
    function Update(newText) {
        setText(newText)
        if (`${placeholderText}` == 'Email') GetEmail(newText)
        if (`${placeholderText}` == 'Mật khẩu') GetPassword(newText)
        if (`${placeholderText}` == 'Xác nhận lại mật khẩu') GetConfirmPassword(newText)
        if (`${placeholderText}` == 'Họ') GetHo(newText)
        if (`${placeholderText}` == 'Tên') GetTen(newText)
    }
    return (
        <View style={styles.container}>
            <FontAwesomeIcon icon={iconName} style={styles.Icon} size={25} />
            <TextInput
                style={styles.inputBox}
                placeholder={placeholderText}
                onChangeText={newText => { Update(newText) }}
                value={text}
                secureTextEntry={isSecure}
            />
        </View>
    );
}
//21520419 - Phạm Ngọc Qúi
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        position: 'relative',
    },
    Icon: {
        position: 'absolute',
        left: 60,
    },
    inputBox: {
        borderWidth: 1,
        height: 50,
        width: '80%',
        textAlignVertical: 'center',
        padding: 10,
        paddingLeft: 50,
        borderRadius: 10,
    }
});

export default Input;