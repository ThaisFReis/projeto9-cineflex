import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Movies from './Movies/Movies'
import Session from './Session/Session';


export default function App() {


    const [movieDetails, setMovieDetails] = useState({});

    function updateDetails(currentDetails, sessionId, details) {
        setMovieDetails(details = { ...currentDetails, sessionId: sessionId });
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Movies />}></Route>
                <Route path="/sessions/:idMovie" element={<Session />}></Route>

            </Routes>
        </BrowserRouter>
    )
}
