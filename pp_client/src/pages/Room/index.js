import React, { useEffect, useState, useMemo } from 'react';
import socketIO from 'socket.io-client';
import QRCode from 'qrcode.react';

import api from '../../services/api';

import './styles.css';

function Room(props) {
    const { id } = props.match.params;

    const [room, setRoom] = useState({});
    const [stories, setStories] = useState([]);
    const [cards, setCards] = useState([]);
    const [storyStarted, setStoryStarted] = useState({});
    const [nameStory, setNameStory] = useState("");
    const [revealedCard, setRevealedCard] = useState(false);
    
    const user_id = ''; 

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useMemo(() => { 
        const socket = socketIO('http://localhost:3333', {
            query: { user_id }
        });

        socket.on('new-answer', async data => {
            console.log('Items', Object.entries(storyStarted).length);
            if (Object.entries(storyStarted).length > 0) {
                const answers = await api.get(`/stories/${storyStarted._id}/storyanswers`);

                setCards(answers.data);
            }
        });
    }, [storyStarted]);

    useEffect(() => {
        async function load() {
            const response = await api.get(`/rooms/${id}`);
            setRoom(response.data);
        }
        load();
    } , [id]);

    useEffect(() => {
        async function loadStories() {
            const response = await api.get(`/rooms/${id}/stories`);
            setStories(response.data);
        }

        loadStories();
    } , [id]);

    async function addStory(e) {
        e.preventDefault();
        const story = await api.post(`/rooms/${id}/stories`, { name: nameStory });
        
        stories.push(story.data);
        setStories(stories);
        setNameStory('');
    }

    async function startStory(_story) {
        const story = await api.put(`/stories/${_story}/start`);
        setStoryStarted(story.data);
    }

    function handlerReveal() {
        setRevealedCard(true);
    }

    function handlerHide() {
        setRevealedCard(false);
    }

    return (
        <div className="containerRoom">
            <aside className="left">
                <div className="header">
                    <h1>{room.name}</h1>
                    <p>{room.description}</p>
                </div>

                <div className="players">
                </div>

                { Object.keys(room).length !== 0 && (
                    <QRCode value={room._id} size={200} />
                )}
            </aside>

            <div className="room">
                {Object.entries(storyStarted).length !== 0 && (
                    <>
                        <div>
                            <h1>{storyStarted.name}</h1>
                            <div className="actions">
                                <button onClick={handlerReveal}>Revelar</button>
                                <button onClick={handlerHide}>Ocultar</button>
                            </div>
                        </div>
                        <ul className={['cards-list', revealedCard ? 'revealed' : '']}>
                            { cards.map(card => (
                                <li className="card"><strong>{card.answer}</strong><span>{card.player.name}</span></li>
                            )) }
                        </ul>
                    </>
                )}
                {Object.entries(storyStarted).length === 0 && (
                    <div className="not-start">Nenhuma História Iniciada</div>
                )}
            </div>

            <aside className="right">
                <h1>Stories</h1>
                <form className="addStory" onSubmit={addStory}>
                    <input id="nameStory"
                        placeholder="Nome da Story"
                        value={nameStory}
                        onChange={event => setNameStory(event.target.value)} />
                    <button>Adicionar</button>
                </form>
                <ul>
                    {stories.map(story => (
                        <li key={story._id} className={story.active ? 'active' : ''}>
                            <span className="story-title">{story.name}</span>
                            <button onClick={event => startStory(story._id)}>start</button>
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    );
}

export default Room;