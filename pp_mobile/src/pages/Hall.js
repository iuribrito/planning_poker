import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';

import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

import qrcode from '../assets/qrcode.png';

export default function Lounge({ navigation }) {
    const [scanner, setScanner] = useState(false);

    useEffect(() => {
        init();
    }, []);

    async function init() {
        await Permissions.askAsync(Permissions.CAMERA);
    }

    function activeScanner() {
        setScanner(true);
    }

    function disableScanner() {
        setScanner(false);
    }

    function handlerScanned({type, data}) {
        console.log(type);
        navigation.navigate('Room', { room: data });
    }

    return (
        <View style={styles.container}>
            {!scanner && (
                <TouchableOpacity onPress={activeScanner}>
                    <Image source={qrcode} onPress={activeScanner} />
                </TouchableOpacity>
            )}
            {scanner && (
                <View style={styles.containerScanner}>
                    <BarCodeScanner
                        onBarCodeScanned={handlerScanned}
                        style={styles.areaScanner}
                    />
                    <TouchableOpacity style={styles.buttonCancel} onPress={disableScanner}>
                        <Text>Cancelar</Text>
                    </TouchableOpacity>                        
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerScanner: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
    },
    areaScanner: {
        alignSelf: 'stretch',
        height: 380,
        borderRadius: 10,
    },
    buttonCancel: {
        fontSize: 24,
        backgroundColor: '#aaa',
        paddingVertical: 8,
        alignSelf: 'stretch',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
    }
})