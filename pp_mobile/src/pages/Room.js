import React, { useEffect, useState } from 'react';
import { View, Text, AsyncStorage, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import socketIO from 'socket.io-client';
import api from '../services/api';

export default function Table({ navigation }) {
    const room = navigation.getParam('room');

    const cardsJSON = [
        {
            _id: '1',
            symbol: '1',
            value: 1,
        },
        {
            _id: 'meio',
            symbol: '1/2',
            value: 0.5,
        },
        {
            _id: '2',
            symbol: '2',
            value: 2,
        },
        {
            _id: '3',
            symbol: '3',
            value: 3,
        },
        {
            _id: '5',
            symbol: '5',
            value: 5,
        },
        {
            _id: '8',
            symbol: '8',
            value: 8,
        },
        {
            _id: '13',
            symbol: '13',
            value: 13,
        },
        {
            _id: '20',
            symbol: '20',
            value: 20,
        },
        {
            _id: '40',
            symbol: '40',
            value: 40,
        },
        {
            _id: '100',
            symbol: '100',
            value: 100,
        },
        {
            _id: '?',
            symbol: '?',
            value: '?',
        },
        {
            _id: 'C',
            symbol: 'C',
            value: 'C',
        },
    ];

    const [gameStarted, setGameStarted] = useState(false);
    const [cards, setCards] = useState([]);
    const [storyStarted, setStoryStarted] = useState('');

    useEffect(() => {
        async function load() {
            const user_id = await AsyncStorage.getItem('user');
            const socket = socketIO('http://192.168.1.104:3333', {
                query: { user_id },
            });

            socket.on('start', data => {
                setStoryStarted(data._id);
                setGameStarted(true);
            });
        };

        setCards(cardsJSON);
        load();
    }, []);

    async function selectCard(symbol) {
        const player_id = await AsyncStorage.getItem('user');
        await api.post(`/stories/${storyStarted}/storyanswers`, {
            player_id,
            answer: symbol,
            name: "nome de q?",
        });
    }

    return (
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Game</Text>
            </View>

            <View style={styles.content}>
                { !gameStarted && (
                <View style={styles.notStarted}>
                    <Text style={styles.textNotStarted}>Nenhum Jogo Ativo</Text>
                </View>) 
                }

                { gameStarted && (
                <View style={styles.started}>
                    <FlatList
                        style={styles.list} 
                        data={cards}
                        keyExtractor={card => card._id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                style={styles.cardItem}
                                onPress={() => selectCard(item.symbol)}
                            >
                                <Text style={styles.textCardItem}>{item.symbol}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>) 
                }
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        color: '#fff', 
        textAlign: 'center', 
        lineHeight: 52, 
        fontSize: 20, 
        height: 52, 
        backgroundColor: '#7159C1'
    },
    textHeader: {
        color: '#fff', 
        textAlign: 'center', 
        lineHeight: 52, 
        fontSize: 20, 
        height: 52, 
        backgroundColor: '#7159C1'
    },
    content: {
        flex: 1,
    },
    notStarted: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    started: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textNotStarted: {
        fontSize: 24,
        color: '#999',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ddd',
        borderStyle: 'dashed',
        padding: 20,
    },
    list: {
        paddingTop: 20,
    },
    cardItem: {
        width: 150,
        height: 280,
        borderWidth: 1,
        borderColor: '#7159C1',
        borderRadius: 8,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textCardItem: {
        fontSize: 30,
        color: '#999',
    }
})