import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { AppContext } from '../../context/AppContext.js';


export default function MainNavBar({ GoTo }) {

    const {
        userInfo, isLog,
    } = useContext(AppContext)

    function handleUser() {
        GoTo('User')
    }


    return (
        <View style={styles.container}>

            <TouchableOpacity >
                <Image
                    source={require('../../assets/icon.png')}
                    style={{ height: 40, width: 70, marginLeft: 15 }}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleUser}>
                <Image
                    style={styles.userImg}
                    source={require('../../assets/images/user.jpg')}
                />
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderColor: '#9e9ea0'
    },
    logoTitle: {
        fontSize: 22,
        fontWeight: 700,
        paddingLeft: 15,
    },
    userRank: {
        padding: 5,
        fontSize: 18,
        fontWeight: 700,
        paddingLeft: 20,
        color: 'green',

    },
    userImg: {
        width: 50,
        height: 50,
        borderRadius: '50%',
        marginRight: 10,
    }
});
