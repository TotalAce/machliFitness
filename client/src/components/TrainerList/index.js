import React from 'react';
import './style.css'

function TrainerList(props) {
    return (
        <div id="trainer-list" className="list-group" {...props}>

            {props.array.map((trainer, index) => {
                return (
                    <a href={`/trainerProfile/${trainer.UserId}`} className="list-group-item list-group-item-action" key={index} traineruserid={trainer.UserId}>
                        <div className="col-12">
                            <img src="https://via.placeholder.com/150?text=Trainer Img" alt="Trainer Img" />
                            <h1>{trainer.firstName} {trainer.lastName}</h1>
                            <h3>{trainer.credentials}</h3>
                            <p>{trainer.about}</p>
                        </div>
                    </a>
                )
            })
            }
        </div>
    )
}

function ClientList(props) {
    return (
        <div id="trainer-list" className="list-group" {...props}>

            {props.array.map((client, index) => {
                return (
                    <a href={`/clientProfile/${client.UserId}`} className="list-group-item list-group-item-action" key={index} clientuserid={client.UserId}>
                        <div className="col-12">
                            <img src="https://via.placeholder.com/150?text=Client Img" alt="client Img" />
                            <h1>{client.firstName} {client.lastName}</h1>
                        </div>
                    </a>
                )
            })
            }
        </div>
    )
}

export { TrainerList, ClientList };