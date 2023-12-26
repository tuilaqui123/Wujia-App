import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, Image } from 'react-native';
import { AppContext } from '../../context/AppContext';

export default function NavBar({ GoTo }) {

    const {
        userInfo
    } = useContext(AppContext)

    function handleUser() {
        GoTo('User')
    }
    function handleMainHome() {
        GoTo('MainHome')
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleMainHome}>
                <Image
                    source={require('../../assets/icon.png')}
                    style={{ height: 40, width: 70, marginLeft: 15 }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.userContainer}
                onPress={handleUser}
            >
                <View style={styles.userInfo}>
                    <Text style={styles.user}>{userInfo.ten} {userInfo.ho}</Text>
                </View>
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
        height: 60,
        backgroundColor: 'white',
        marginBottom: 5,
        borderBottomWidth: 1,
        borderColor: '#9e9ea0'
    },
    logoTitle: {
        marginLeft: 10,
        fontWeight: 700,
    },
    userImg: {
        width: 40,
        height: 40,
        borderRadius: '50%',
        marginRight: 10,
    },
    userContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userInfo: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    user: {
        fontSize: 20,
        fontWeight: 700,
        paddingRight: 15,
    },
});
