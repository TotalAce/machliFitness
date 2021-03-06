import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom"
import { TrainerNavBar } from "../../components/Navbar"
import { ClientList } from "../../components/TrainerList"
import axios from 'axios'

function Trainer() {
    const { id, isLoggedIn, isTrainer } = JSON.parse(localStorage.getItem("user")) || ""

    const [pageLoad, setPageLoad] = useState(false)
    const [clientList, setClientList] = useState({})

    useEffect(() => {
        axios.get("api/trainer/clients/" + id)
            .then(res => {
                // console.log(res.data[0].Clients);
                setClientList(res.data[0].Clients)
                setPageLoad(true)
            })
            .catch(err => console.log(err));
    }, [id])

    // console.log(clientList);
    return (
        <>
            {(isLoggedIn === false || !isLoggedIn ?
                <Redirect to="/login" /> :
                (isTrainer === false ? <Redirect to="/unauthorized" /> :

                    <div>

                        <TrainerNavBar />
                        <div className="container">
                            <br/>
                        <h1>List of Clients</h1>
                            <br/>

                        {(pageLoad ?
                            <ClientList
                                array={clientList}
                            />
                            : null)}
                        </div>
                    </div>
                )
            )}
        </>
    )
}


export default Trainer;
