import React, { useState, useEffect, createContext } from "react";
import { database } from '../firebaseConfig';
import { ref, set, onValue } from 'firebase/database';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {

    const [OrderList, setOrderList] = useState([])
    const [OrderItem, setOrderItem] = useState([])
    const [subAmount, setSubAmount] = useState(0)
    const [subTotal, setSubTotal] = useState(0)
    const [isOrder, setIsOrder] = useState(false)
    const [OrderAddress, setOrderAddress] = useState([])
    const [email, setEmail] = useState('')
    const [isLog, setIsLog] = useState(false)
    const [location, setLocation] = useState('MainHome')
    const [userInfo, setUserInfo] = useState([])
    const [userRanks, setUserRanks] = useState([])
    const [userHistory, setUserHistory] = useState([])
    const [itemList, setItemList] = useState([])

    useEffect(() => {
        const itemRef = ref(database, 'MENU');

        const unsubscribe = onValue(itemRef, (snapshot) => {
            const itemData = snapshot.val();
            if (itemData) {
                const itemsArray = Object.values(itemData);
                setItemList(itemsArray);
            } else {
                setItemList([]);
            }
        });
        return () => {
            unsubscribe();
        };

    }, []);

    function GetOrderItem(link, name, size, sectionPrice, topping, ice, sg, note, amount, total) {
        const temp = {
            ItemImageLink: link,
            ItemName: name,
            ItemSize: size,
            ItemSection: sectionPrice,
            ItemTopping: topping,
            ItemIce: ice,
            ItemSg: sg,
            ItemNote: note,
            ItemAmount: amount,
            ItemTotal: total,
        }
        setOrderItem([...OrderItem, temp])
        var tempAmount = subAmount + amount
        var tempTotal = subTotal + total
        setSubAmount(tempAmount)
        setSubTotal(tempTotal)
    }

    useEffect(() => {

        if (!isLog) {
            setUserInfo([])
            setUserRanks([])
            setUserHistory([])
        }
        else {

            const Info = ref(database, 'ACCOUNT/' + email + '/UserInfo');
            onValue(Info, (snapshot) => {
                const userData = snapshot.val();
                setUserInfo(userData);
            });

            const Ranks = ref(database, 'ACCOUNT/' + email + '/UserRanks')
            onValue(Ranks, (snapshot) => {
                const data = snapshot.val();
                setUserRanks(data)

            });

            const itemRef = ref(database, 'ACCOUNT/' + email + '/UserHistory');

            const unsubscribe = onValue(itemRef, (snapshot) => {
                const itemData = snapshot.val();
                if (itemData) {
                    const itemsArray = Object.values(itemData);
                    setUserHistory(itemsArray);
                } else {
                    setUserHistory([]);
                }
            });

            return () => {
                unsubscribe();
            };
        }

    }, [isLog])

    return <AppContext.Provider
        value={{
            OrderItem, setOrderItem,
            subAmount, setSubAmount,
            subTotal, setSubTotal,
            isOrder, setIsOrder,
            OrderAddress, setOrderAddress,
            email, setEmail,
            userInfo, setUserInfo,
            isLog, setIsLog,
            location, setLocation,
            userRanks, setUserRanks,
            userHistory, setUserHistory,
            itemList, GetOrderItem,
            OrderList, setOrderList,
        }}
    >
        {children}
    </AppContext.Provider>
}