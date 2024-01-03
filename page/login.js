import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock, faPhone } from '@fortawesome/free-solid-svg-icons';
import Input from '../Component/Login/input';
import Noti from '../Component/Login/notification';
import ButtonX from '../Component/Button/buttonX';
import { database } from '../firebaseConfig';
import { ref, set, onValue } from 'firebase/database';
import { AppContext } from "../context/AppContext";


const Login = ({ navigation, route }) => {

    const { OrderItem, setOrderItem,
        subAmount, setSubAmount,
        subTotal, setSubTotal,
        isOrder, setIsOrder,
        OrderAddress, setOrderAddress,
        email, setEmail,
        userInfo, setUserInfo,
        isLog, setIsLog,
        location, setLocation
    } = useContext(AppContext)

    const [Email, setemail] = useState('')
    const [password, setPassword] = useState('')
    const [popup, setPopup] = useState(false)

    function GetEmail(Email) {
        setemail(Email)
    }
    function GetPassword(Password) {
        setPassword(Password)
    }

    function GotoRegister() {
        navigation.navigate('Register')
    }

    function GoBack(go) {
        navigation.navigate(location)
    }

    function LogIn() {
        navigation.navigate(location)
    }

    // Write data into database
    // set(ref(database, 'ACCOUNT/' + email), {
    //     username: email,
    //     password: password,
    // }).then(() => {
    //     console.log('ok');
    // }).catch((error) => {
    //     console.log(error)
    // });

    function Check() {
        const Account = ref(database, 'ACCOUNT/' + Email + '/UserInfo');

        onValue(Account, (snapshot) => {
            const data = snapshot.val();

            if (password === data.password) {
                setEmail(Email);

                const Info = ref(database, 'ACCOUNT/' + Email + '/UserInfo');
                onValue(Info, (snapshot) => {
                    const userData = snapshot.val();
                    setUserInfo(userData);
                });
                setIsLog(true)
                LogIn();
            } else {
                setPopup(true);
            }
        });
    }

    function closePopup(close) {
        if (close) setPopup(false);
    }

    return (
        <View style={styles.container}>
            <ButtonX Go={GoBack} ButtonName={'ĐĂNG NHẬP'} />
            <View style={styles.main}>
                <Image
                    style={{ width: 100, height: 100 }}
                    source={require('../assets/icon.png')}
                />
                <Input placeholderText={"Số điện thoại"} iconName={faPhone} GetEmail={GetEmail} />
                <Input placeholderText={"Mật khẩu"} iconName={faLock} GetPassword={GetPassword} isSecure={true} />
                <TouchableOpacity style={styles.forgotTouch}>
                    <Text style={styles.forgotPass} onPress={GotoRegister}>Chưa có tài khoản? Đăng kí ngay</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={Check}
                >
                    <Text style={styles.loginButtonText}>ĐĂNG NHẬP</Text>
                </TouchableOpacity>
            </View>
            <Noti
                popup={popup}
                closePopup={closePopup}
                title={'Mật khẩu hoặc tài khoản không đúng!'}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    main: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 70,

    },
    header: {
        fontSize: 25,
        fontStyle: 900,
        marginBottom: 50,
    },
    forgotTouch: {
        width: '90%',
        alignItems: 'flex-end',
    },
    forgotPass: {
        fontSize: 16,
        fontWeight: 600,
        color: 'red',
    },
    loginButton: {
        width: '80%',
        backgroundColor: '#3AC5C8',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 30,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 700,
    },
    Or: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    orTitle: {
        fontSize: 18,
        fontWeight: 700,
    },
    logoContainer: {
        width: '40%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        margin: 20,
    },
    logo: {
        width: 50,
        height: 50,
    },
    signUp: {
        fontSize: 16,
    },
    signUpLink: {
        color: 'blue',
        fontWeight: 700,
    }
});

export default Login;