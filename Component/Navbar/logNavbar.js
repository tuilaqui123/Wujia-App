import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function LogNavBar({ GoTo }) {
    function handleLogin() {
        GoTo('Login')
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
            <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.text}>Đăng nhập</Text>
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
        borderBottomWidth: 1,
        borderColor: '#9e9ea0'
    },
    logoTitle: {
        marginLeft: 10,
        fontWeight: 700,
    },
    text: {
        fontSize: 18,
        paddingRight: 10,
    }
});
