import React, { useState, useEffect } from "react";
import { faXmark, faMagnifyingGlass, faFilter, faSortDown, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Modal, Pressable } from "react-native";
import { database } from "../../firebaseConfig";
import { ref, onValue, set } from 'firebase/database';

const Search = ({ UpdateDisplay, ButtonTitle, CheckSearch }) => {
    const [Input, setInput] = useState('')
    const [isSearch, setIsSearch] = useState(false)
    const [isSelect, setIsSelect] = useState(false)
    const [searchContainerStyle, setSearchContainerStyle] = useState({ width: '15%' });
    const [cateBtnStyle, setCateBtnStyle] = useState({ width: '80%' });
    const [closeButtonStyle, setCloseButtonStyle] = useState({ display: 'none' });
    const [Placeholder, setPlaceholder] = useState('')
    const [CateText, setCateText] = useState(ButtonTitle);

    const [ItemList, setItemList] = useState([])

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


    function openSelect() {
        setIsSelect(true)
    }

    function closeSelect(listname, id) {
        setIsSelect(false)
        UpdateDisplay(listname, id)
    }

    function handleInputFocus() {
        setSearchContainerStyle({ width: '78%' });
        setCateBtnStyle({ width: '20%' });
        setCloseButtonStyle({ display: 'flex' });
        setPlaceholder('Tìm kiếm')
        setCateText('Loại')
    }

    function handleInputBlur() {
        setSearchContainerStyle({ width: '15%' });
        setCateBtnStyle({ width: '80%' });
        setCloseButtonStyle({ display: 'none' });
        setInput('')
        setPlaceholder('')
    }

    function handleSearch() {
        setIsSearch(true)
        CheckSearch(Input)
    }

    function handleClose() {
        setIsSearch(false)
        CheckSearch('')
        handleInputBlur()
    }

    var btnShow

    if (Input == '') btnShow = { paddingLeft: 40 }
    else btnShow = { paddingLeft: 10 }

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <TouchableOpacity style={{ ...styles.cateBtn, ...cateBtnStyle }} onPress={openSelect}>
                    {Placeholder == '' ? (
                        <>
                            <Text style={styles.cateText}>{ButtonTitle}</Text>
                            <FontAwesomeIcon icon={faSortDown} size={25} style={{ position: 'absolute', right: 10, top: 0 }} />
                        </>
                    ) : (
                        <FontAwesomeIcon icon={faFilter} />
                    )}
                </TouchableOpacity>
                <View style={{ ...styles.searchContainer, ...searchContainerStyle }}>
                    <View style={{ position: 'relative', height: '100%', width: '78%' }}>
                        {Input == '' ? (
                            <FontAwesomeIcon icon={faMagnifyingGlass} size={20} style={styles.searchIcon} />
                        ) : (
                            <TouchableOpacity onPress={handleClose} style={styles.closeIcon} >
                                <FontAwesomeIcon icon={faCircleXmark} size={16} color="#9e9ea0" />
                            </TouchableOpacity>
                        )}
                        <TextInput
                            style={[styles.search, btnShow]}
                            onChangeText={newText => setInput(newText)}
                            placeholder={Placeholder}
                            value={Input}
                            onFocus={handleInputFocus}
                        />
                    </View>
                    {Input == '' ? (
                        <TouchableOpacity style={{ ...styles.closeBtn, ...closeButtonStyle }} onPress={handleClose}>
                            <FontAwesomeIcon icon={faXmark} size={25} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={{ ...styles.closeBtn, ...closeButtonStyle }} onPress={handleSearch}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} size={25} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isSelect}
            >
                <Pressable style={styles.selectContainer} onPress={() => { closeSelect('NONE', -1) }}>
                    <View style={styles.select}>
                        <Text style={styles.selectTitle}>LOẠI ĐỒ UỐNG</Text>

                        <TouchableOpacity
                            style={styles.selectBtn}
                            onPress={() => { closeSelect('TẤT CẢ', 0) }}
                        >
                            <Text style={styles.selectText}>TẤT CẢ</Text>
                        </TouchableOpacity>
                        {ItemList.map((value, index) =>
                            <TouchableOpacity
                                key={index}
                                style={styles.selectBtn}
                                onPress={() => { closeSelect(value.name, index) }}
                            >
                                <Text style={styles.selectText}>{value.name}</Text>
                            </TouchableOpacity>
                        )}

                    </View>
                </Pressable>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',

    },
    container: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        height: '100%',
    },
    cateBtn: {
        position: 'relative',
        height: '100%',
        borderWidth: 1,
        borderColor: 'lightgrey',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    cateText: {
        fontSize: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: '100%',
    },
    search: {
        position: 'relative',
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    searchIcon: {
        position: 'absolute',
        transform: 'translateY(-50%)',
        top: '50%',
        left: 10,
    },
    closeIcon: {
        position: 'absolute',
        transform: 'translateY(-50%)',
        top: '50%',
        right: 10,
        zIndex: 4,
    },
    closeBtn: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        width: '20%',
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    selectContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(219,219,219,0.4)',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    select: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        width: '100%',
    },
    selectTitle: {
        fontSize: 22,
        fontWeight: 900,
        padding: 10,
    },
    selectBtn: {
        height: 50,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginBottom: 10,
        borderColor: 'lightgrey',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.5,
        elevation: 3,
    },
    selectText: {
        fontSize: 18,
        fontWeight: 700,
    }
});

export default Search;

