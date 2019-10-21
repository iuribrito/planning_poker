import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Room from './pages/Room';
import RoomList from './pages/RoomList';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={RoomList} />
                <Route path="/rooms/:id" component={Room} />
            </Switch>
        </BrowserRouter>
    )
}