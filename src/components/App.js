import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Movies from './Movies/Movies'
import Session from './Session/Session';
import Seats from './Seats/Seats';
import PurchaseReceipt from './PurchaseReceipt/PurchaseReceipt'


export default function App() {

    const [movieDetails, setMovieDetails] = useState({});

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Movies />}></Route>
                <Route path="/sessions/:idMovie" element={<Session />}></Route>
                <Route path="/seats/:idSession" element={<Seats />}></Route>
                <Route path='./PurchaseReceipt' element={<PurchaseReceipt confirm={movieDetails}/>}></Route>

            </Routes>
        </BrowserRouter>
    )
}