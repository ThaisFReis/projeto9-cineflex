import axios from "axios";
import { useEffect, useState } from "react";

import Header from "../Utils/Header";
import Load from "../../assets/img/load.gif"

export default function PurchaseReceipt({confirm}){

    const [movieSession, setMovieSession] = useState();
        useEffect(() => {
            const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${confirm.sessionId}/seats`);
    
            promise.then(response => {
                setMovieSession(response.data);
            });
        }, [confirm.sessionId]);

        if (movieSession === undefined) {
            return (
                <div className="loading">
                    <img src={Load} alt="loading..." />
                </div>
            );
        }

    return (
        <>
        <Header />
        <div className="ticketPage">
            <div className="sucessMessage">
                <h1>Pedido feito com sucesso!</h1>
            </div>

            <div className="ticketInfo">
                <div className="ticketContainer">
                    <div className="movieName">
                        <h2>Filme:</h2>
                        <p>{movieSession.movie.title}</p>
                    </div>

                    <div className="sessionInfo">
                        <h2>Sessão:</h2>
                        <p>{movieSession.day.date} - {movieSession.name}</p>
                    </div>

                    <div className="ticket">
                        <h2>Ingressos:</h2>
                        <p>Assento: 13</p>
                    </div>

                    <div className="buyer">
                        <h2>Comprador:</h2>
                        <div className="buyerContanier">
                            <div className="buyerName">
                                <p>Nome: {confirm.name}</p>
                            </div>
                            <div className="buyerIdentification">
                                <p>CPF: {confirm.identificationDocument}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}