import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../Utils/Header"
import Load from "../../assets/img/load.gif"


export default function Movies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
        promise.then(response => {
            setMovies(response.data);
        });
    }, [])


    /*Loading Page*/
    if (movies.length === 0) {
        return (
            <div className="loading">
                <img src={Load} alt="loading..."/>
            </div>
        );
    }


    return (
        <>
            <Header />
            <div className="title">Selecione o filme</div>
            <div className="movies">
                {movies.map(movie => (
                    <Link to={`/sessions/${movie.id}`}>
                        <div className="movie-card">
                            <img src={movie.posterURL} alt={movie.title} />
                        </div>     
                    </Link>
                ))}
            </div>
        </>
    )
}