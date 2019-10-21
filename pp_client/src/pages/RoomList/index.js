import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';
import logo from '../../assets/logo.png';

function RoomList() {
    const [rooms, setRooms] = useState([]);
    const [name, setName] = useState('');
    useEffect(() => {
        loadRooms();
    }, []);

    async function handlerSubmit(event) {
        event.preventDefault();

        const room = await api.post('/rooms', {
            name
        });

        rooms.push(room.data);
        setRooms(rooms);
        setName('');
    }

    async function loadRooms() {
        const response = await api.get('/rooms');
        setRooms(response.data);
    }

    return (
        <div className="container">
            <img src={logo} className="logo" alt="Planning Poker" />
            <div className="contentList">
                <h1>Salas</h1>
                <ul className="room-list">
                    {rooms.map(room => (
                        <li key={room._id}>
                            <strong>{room.name}</strong>
                            <p>{room.description}</p>
                            <Link to={`/rooms/${room._id}`}>
                                Entrar
                            </Link>
                        </li>
                    ))}
                </ul>

                <form id="formAddRoom" className="hide" onSubmit={handlerSubmit}>
                    <label htmlFor="nameRoom">Nome da Sala</label>
                    <input
                        id="nameRoom"
                        placeholder="Nome da Sala"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />

                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default RoomList;