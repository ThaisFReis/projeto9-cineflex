import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Header from "../Utils/Header"
import Load from "../../assets/img/load.gif"

export default function Session() {

    const [movie, setMovie] = useState([]);
    const { idMovie } = useParams();
    let { days } = movie;

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idMovie}/showtimes`);

        promise.then(response => {
            setMovie(response.data);
        });
    }, [idMovie]);


    /*Loading Page*/
    if (movie.length === 0) {
        return (
            <div className="loading">
                <img src={Load} alt="loading..."/>
            </div>
        );
    }

    
    return (
        <>
            <Header />
            <div className="container-session">
                <div>
                    <img src={movie.posterURL} alt={movie.title} title={movie.title} />
                </div>

                <div className="content">
                    <div className="title-session">Selecione o horário</div>
                    {days.map(session => (
                        <div className="date-card">
                            <div className="date">
                                <h1>{session.weekday}-{session.date}</h1>
                            </div>

                            <div className="hours">
                                {session.showtimes.map(session =>
                                    <Link to={`/seats/${session.id}`}>
                                        <p>{session.name}</p>
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}