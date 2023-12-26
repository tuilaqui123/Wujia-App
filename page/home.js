import React, { useState, useEffect, useRef, useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import NavBar from '../Component/Navbar/menuNavbar.js';
import PayTab from '../Component/Pay/Paytab.js';
import ItemDisplay from '../Component/Item/itemDisplay.js';
import Search from '../Component/Button/search.js';
import { database } from '../firebaseConfig.js';
import { ref, onValue } from 'firebase/database';
import LogNavBar from '../Component/Navbar/logNavbar.js';
import Noti from '../Component/Login/notification.js';
import { AppContext } from '../context/AppContext.js';
import SearchPage from '../Component/Button/searchPage.js';

const Home = ({ navigation, route }) => {

    const { OrderItem, setOrderItem,
        subAmount, setSubAmount,
        subTotal, setSubTotal,
        isOrder, setIsOrder,
        OrderAddress, setOrderAddress,
        email, setEmail,
        userInfo, setUserInfo,
        isLog, setIsLog,
        location, setLocation,
        itemList
    } = useContext(AppContext)

    const [popup, setPopup] = useState(false)

    const [dataSourceCords, setDataSourceCords] = useState([]);

    const [CateText, setCateText] = useState('TẤT CẢ');

    const [isSearch, setIsSearch] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const scrollRef = useRef();

    function UpdateDisplay(name, key) {
        CheckSearch('')
        if (key !== -1) {
            setCateText(name)
            scrollRef.current?.scrollTo({
                y: dataSourceCords[key],
                animated: true,
            });
        }
    }

    function GoTo(link) {
        if (link == 'MainHome') setLocation('MainHome')
        navigation.navigate(link)
    }

    function closePopup(close) {
        if (close) setPopup(false);
    }

    function CheckSearch(value) {
        if (value == '') {
            setIsSearch(false)
            setSearchValue('')
        }
        else {
            setIsSearch(true)
            setSearchValue(value)
        }
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

            <Search
                UpdateDisplay={UpdateDisplay}
                ButtonTitle={CateText}
                CheckSearch={CheckSearch}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                ref={scrollRef}
            >
                {isSearch ? (
                    <SearchPage
                        ListName={itemList}
                        value={searchValue}
                    />
                ) : (
                    <>
                        {itemList.map((value2, index2) =>
                            <View
                                key={index2}
                                onLayout={(event) => {
                                    const layout = event.nativeEvent.layout;
                                    dataSourceCords[index2] = layout.y;
                                    setDataSourceCords(dataSourceCords);
                                    if (route.params && route.params.name) UpdateDisplay(route.params.name, route.params.id)

                                }}
                            >
                                <ItemDisplay
                                    numID={index2 + 1}
                                    ListName={value2.name}
                                />
                            </View>
                        )}
                    </>
                )}
            </ScrollView>

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
        backgroundColor: 'white',
        //backgroundColor: 'red',
    },
    displayView: {
        paddingBottom: 60,
    }
});

export default Home;