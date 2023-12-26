import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { faEnvelope, faFile } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import Input from '../Component/Login/input';
import Noti from '../Component/Login/notification';
import ButtonX from '../Component/Button/buttonX';
import { database } from '../firebaseConfig';
import { ref, set, onValue } from 'firebase/database';
import { AppContext } from "../context/AppContext";



const Register = ({ navigation, route }) => {

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
    const [confirmPassword, setConfirmPassword] = useState('')
    const [Ho, setHo] = useState('')
    const [Ten, setTen] = useState('')
    const [popup, setPopup] = useState(false)
    const [notiContext, setNotiContext] = useState('Đăng kí thành công!!!')

    function GetEmail(Email) {
        setemail(Email)
    }
    function GetPassword(Password) {
        setPassword(Password)
    }
    function GetConfirmPassword(Password) {
        setConfirmPassword(Password)
    }
    function GetHo(ho) {
        setHo(ho)
    }
    function GetTen(ten) {
        setTen(ten)
    }

    function GoToLogin(go) {
        navigation.navigate('Login')
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
        const Acccount = ref(database, 'ACCOUNT/' + Email + '/UserInfo')
        onValue(Acccount, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setNotiContext('Email đã tồn tại!!')
                setPopup(true)
            } else {
                if (password == confirmPassword) {
                    set(ref(database, 'ACCOUNT/' + email), {
                        UserInfo: {
                            username: Email,
                            password: password,
                            ten: Ten,
                            ho: Ho
                        },
                        UserRanks: {
                            total: 0,
                            ranks: "Đồng",
                            amount: 0
                        }
                    })
                    setNotiContext('Đăng kí thành công!!')
                    setPopup(true)
                    GoToLogin(true)
                }
                else {
                    setNotiContext('Xác nhận mật khẩu không đúng!!')
                    setPopup(true)
                }

            }
        });
    }

    function closePopup(close) {
        if (close) setPopup(false);
    }

    return (
        <View style={styles.container}>
            <ButtonX Go={GoToLogin} ButtonName={'ĐĂNG KÝ'} />
            <View style={styles.main}>
                <Image
                    style={{ width: 100, height: 100 }}
                    source={require('../assets/icon.png')}
                />
                <Input placeholderText={"Email"} iconName={faEnvelope} GetEmail={GetEmail} />
                <Input placeholderText={"Mật khẩu"} iconName={faLock} GetPassword={GetPassword} isSecure={true} />
                <Input placeholderText={"Xác nhận lại mật khẩu"} iconName={faLock} GetConfirmPassword={GetConfirmPassword} isSecure={true} />
                <Input placeholderText={"Họ"} iconName={faFile} GetHo={GetHo} />
                <Input placeholderText={"Tên"} iconName={faFile} GetTen={GetTen} />
                <TouchableOpacity style={styles.forgotTouch}>
                    <Text style={styles.forgotPass} onPress={() => { GoToLogin(true) }}>Đã có tài khoản? Đăng nhập ngay</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={Check}
                >
                    <Text style={styles.loginButtonText}>ĐĂNG KÝ</Text>
                </TouchableOpacity>
            </View>
            <Noti
                popup={popup}
                closePopup={closePopup}
                title={notiContext}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: '100%',
        alignItems: 'center',
    },
    main: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 40,

    },
    header: {
        fontSize: 25,
        fontStyle: 900,
        marginBottom: 30,
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

export default Register;