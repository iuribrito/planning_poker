import React, { useEffect, useState } from 'react';
import { View, Text, AsyncStorage, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import api from '../services/api';

export default function Profile( { navigation } ) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        async function load() {
            user = await api.post('/profile', {
                uid: Constants.installationId
            });

            setName(user.data.name);
            setEmail(user.data.email);

            await AsyncStorage.setItem('user', user.data._id);
        };

        load();
    }, []);

    async function handlerUpdate() {
        let user = await AsyncStorage.getItem('user');
        if (user) {
            user = await api.put(`/profile/${user}`, {
                uid: Constants.installationId,
                name,
                email
            });

            await AsyncStorage.setItem('user', user.data._id);

            Alert.alert('Atualizado!')
        }
    }

    async function handlerGoToHall() {
        navigation.navigate('Hall');
    }

    return (
        <View>
            <Text 
                style={{color: '#fff', textAlign: 'center', lineHeight: 52, fontSize: 20, height: 52, backgroundColor: '#7159C1'}}>Perfil</Text>
                <View
                style={{paddingHorizontal: 20, paddingVertical: 10}}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        value={name}
                    />

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                    />

                    <TouchableOpacity onPress={handlerUpdate} style={styles.buttonUpdate}>
                        <Text style={styles.textUpdate}>Atualizar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handlerGoToHall}  style={styles.buttonNext}>
                        <Text style={styles.textNext}>Continuar</Text>
                    </TouchableOpacity>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 4,
        paddingHorizontal: 10,
        borderColor: '#E3DFFC',
        borderWidth: 1,
        height: 40,
        fontSize: 16,
    },
    label: {
        color: '#999',
        marginBottom: 5,
        marginTop: 10,
    },
    buttonUpdate: {
        backgroundColor: '#7159C1',
        paddingVertical: 15,
        alignSelf: 'stretch',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    textUpdate: {
        fontSize: 16,
        color: '#fff',
    },
    buttonNext: {
        borderColor: '#7159C1',
        borderWidth: 1,
        paddingVertical: 15,
        alignSelf: 'stretch',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    textNext: {
        fontSize: 16,
        color: '#7159C1',
    }
})