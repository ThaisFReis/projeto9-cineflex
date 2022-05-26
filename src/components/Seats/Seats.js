import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components"; 

import Header from "../Utils/Header"
import Footer from "../Utils/Footer";
import Load from "../../assets/img/load.gif"

function Seat({ classSeat, name, id, hold }) {
    const [isSelected, setSelected] = useState(classSeat);

    function choosenSeat(selectedSeat, idSelectedSeat) {

        if (selectedSeat === 'seat available') {
            
            if (idSelectedSeat === 'seat selected') {
                hold(id, false);
                setSelected('seat available');
            } 
            
            else {
                hold(id, true);
                setSelected('seat selected');
            }
        } 
        
        else {
            alert('Não está disponível!')
        }
    }

    return (
        <div className={isSelected} onClick={() => choosenSeat(classSeat, isSelected)}>
            {name}
        </div>
    )
}

export default function SeatSelection({ confirm }) {

    const {idSession} = useParams();
    const [sessionDetails, setSessionDetails] = useState();
    const [reserve, setReserveSeats] = useState({ids: []});
    const [fullName, setFullName] = useState("");
    const [identificationDocument, setIdentificationDocument] = useState("");

    /*API*/
    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSession}/seats`);

        promise.then(response => {
            setSessionDetails(response.data);
        })
    }, [idSession]);


    /*Loading Page*/
    if (sessionDetails === undefined) {
        return (
            <div className="loading">
                <img src={Load} alt="loading..." />
            </div>
        );
    }
    const { movie, day, name } = sessionDetails;


    function holdSeat(idSeat, addArray) {
        if (addArray) {
            setReserveSeats({ ids: [...reserve.ids, idSeat] });
        } 
        
        else {
            setReserveSeats({
                ids: reserve.ids.filter((idSeatCurrent) => {
                    return idSeatCurrent !== idSeat;
                })
            })
        }
    }

    function holdFullName(i) {
        setFullName(i.target.value);

        setReserveSeats({
            ...reserve,
            "name": i.target.value
        })
    }

    function holdIdentificationDocument(i) {
        setIdentificationDocument(i.target.value);

        setReserveSeats({
            ...reserve,
            "identificationDocument": i.target.value
        })
    }

    function Error() {
        if (reserve.ids.length === 0) {
            alert("Selecione um assento!")
        } 
        else if (fullName.length === 0) {
            alert("Digite o seu nome completo!")
        } 
        else if (identificationDocument.length !== 11) {
            alert("Digite um CPF válido!")
        }
    }

    const correct = reserve.ids.length !== 0 && fullName.length !== 0 && !(identificationDocument.length !== 11);

    function confirmation() {
        confirm(reserve, idSession, '')
        axios.post(`https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many`, reserve);
    }

   

    return (
        <>
            <Header />
            <div className="container-seat">

                <div className="seats">
                    <h2>Selecione o(s) assento(s)</h2>
                    <div className="seats-to-choose">
                        {sessionDetails.seats.map(seat => (
                            (seat.isAvailable === true
                                ? <Seat classSeat="seat available" name={seat.name} id={seat.id} hold={holdSeat} />
                                : <Seat classSeat="seat unavailable" name={seat.name} />
                            )
                        ))}
                        
                    </div>

                    <div className="subtitle">
                            <div className="selected">
                                <div className="seat selected"></div>
                                <p>Selecionado</p>
                            </div>

                            <div className="available">
                                <div className="seat available"></div>
                                <p>Disponível</p>
                            </div>
                            <div className="unavailable">
                                <div className="seat unavailable"></div>
                                <p>Indisponível</p>
                            </div>

                        </div>

                </div>

                <div className="username-information">
                    <div className="username">
                        <div className="name">
                            Digite seu nome completo:
                        </div>
                        <input type="text" className="input-name" placeholder='Nome completo' onChange={holdFullName} value={fullName} />
                    </div>
                    <div className="info-identificationDocument">
                        <div className="identificationDocument">
                            Digite seu CPF:
                        </div>
                        <input type="text" className="input-identificationDocument" placeholder='CPF' onChange={holdIdentificationDocument} value={identificationDocument} />
                    </div>

                    {correct === true
                    ? <Link to="/PurchaseReceipt">
                        <Button correct={correct} onClick={() => confirmation()}>
                            Reservar assento(s)
                        </Button>
                    </Link>
                    : <Link to="">
                        <Button onClick={() => Error()}>
                            Reservar assento(s)
                        </Button>
                    </Link>
                }
                </div>
            </div>

            <Footer
                    src={movie.posterURL}
                    title={movie.title}
                    weekday={day.weekday}
                    time={name}
                />
        </>
    );
}

const Button = styled.button`
    background-color: gold;
    width: 250px;
    height: 60px;
    margin: 50px auto;

    font-size: 20px;
    text-aling: center;
    color: rgb(49, 49, 49);
    border-radius: 20px;
    border: none;
    cursor: pointer;

    /*Criar animação*/

    opacity: ${({ correct }) => correct ? '1' : '0.3'};
    color: ${({ correct }) => correct ? 'white' : 'rgb(49, 49, 49)'};
`