import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ScrollView, ImageBackground } from "react-native";
import Menu from "../Component/MainHome/menu.js";
import HomeSection from "../Component/MainHome/homeSection";
import Banner from "../Component/MainHome/banner";
import NavBar from "../Component/Navbar/menuNavbar.js";
import LogNavBar from "../Component/Navbar/logNavbar.js";
import PayTab from "../Component/Pay/Paytab.js";
import Noti from "../Component/Login/notification.js";
import { database } from '../firebaseConfig.js';
import { ref, onValue } from 'firebase/database';
import { AppContext } from '../context/AppContext.js';


const MainHome = ({ navigation, route }) => {

    const { OrderItem, setOrderItem,
        subAmount, setSubAmount,
        subTotal, setSubTotal,
        isOrder, setIsOrder,
        OrderAddress, setOrderAddress,
        email, setEmail,
        userInfo, setUserInfo,
        isLog, setIsLog,
        location, setLocation,
        itemList, GetOrderItem
    } = useContext(AppContext)

    const [popup, setPopup] = useState(false)

    useEffect(() => {

        if (route.params && route.params.email) {
            if (route.params.email == 'Logout') setEmail('')
            const Acccount = ref(database, 'ACCOUNT/' + route.params.email + '/UserInfo')
            onValue(Acccount, (snapshot) => {
                const data = snapshot.val();
                setUserInfo(data)
            });
            setIsLog(true)
        }

    }, [route.params]);

    function GoTo(link) {
        if (link == 'Home') setLocation('Home')
        navigation.navigate(link)
    }

    function closePopup(close) {
        if (close) setPopup(false);
    }

    function GetMenuKey(name, id) {
        navigation.navigate('Home', { name, id })
    }

    return (
        <View style={styles.container}>
            {isLog ? (
                <NavBar
                    GoTo={GoTo}
                />
            ) : (
                <LogNavBar
                    GoTo={GoTo}
                />
            )}
            {/* <ImageBackground
                style={styles.bgImg}
                resizeMode="cover"
                source={require('../assets/images/bg.jpg')}
            > */}
            <ScrollView
                style={styles.main}
                showsVerticalScrollIndicator={false}
            >
                <Banner />
                <Menu
                    GoTo={GoTo}
                    GetMenuKey={GetMenuKey}
                />
                <HomeSection
                    Link={'NEW'}
                    Title={'SẢN PHẨM MỚI'}
                />
            </ScrollView>

            {/* </ImageBackground> */}
            {/* {!isOrder ? (
                (subAmount !== 0) ? (
                    <PayTab
                        GoTo={GoTo}
                        Amount={subAmount}
                        Total={subTotal}
                    />
                ) : (
                    <View></View>
                )
            ) : (
                <View></View>
            )} */}

            <Noti
                popup={popup}
                closePopup={closePopup}
                title={'Mời bạn đăng nhập để thanh toán'}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    main: {
        padding: 10,
        paddingTop: 10,
    },
    bgImg: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default MainHome;