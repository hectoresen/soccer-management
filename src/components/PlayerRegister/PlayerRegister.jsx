import React from 'react';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import './PlayerRegister.scss';
import { useState } from 'react';

const INITIAL_VALUE = {
    name: '',
    email: '',
    password: ''
};

const PlayerRegister = () => {
    const [playerData, setPlayerData] = useState(INITIAL_VALUE)

    const submitForm = ev => {
        ev.preventDefault();
        console.log("Total del formulario", playerData);
    };

    const handleInputValue = ev => {
        const { name, value } = ev.target;
        setPlayerData({ ...playerData, [name]: value })
    };


    return (
        <div className='playerregister'>
            <h3>Registro de Jugadores</h3>
            <div className="playerregister__form">
                <form onSubmit={submitForm}>
                    <div className="teamregister__form-input">
                        <span className="p-input-icon-right p-input-icon-right">
                            <i className="pi pi-user" />
                            <InputText
                                name="name"
                                type="text"
                                placeholder="Nombre de entrenador"
                                value={playerData.name}
                                onChange={handleInputValue}
                            ></InputText>
                        </span>
                    </div>
                    <div className="teamregister__form-input">
                        <span className="p-input-icon-right p-input-icon-right">
                            <i className="pi pi-envelope" />
                            <InputText
                                name="email"
                                type="email"
                                placeholder="Correo electrónico"
                                value={playerData.email}
                                onChange={handleInputValue}
                            ></InputText>
                        </span>
                    </div>
                    <div className="teamregister__form-input">
                        <span className="p-input-icon-right p-input-icon-right">
                            <i className="pi pi-lock" />
                            <InputText
                                name="password"
                                type="password"
                                placeholder="Contraseña"
                                value={playerData.password}
                                onChange={handleInputValue}
                            ></InputText>
                        </span>
                    </div>
                    <div className="teamregister__form-btn">
                        <Button>Registrarme</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PlayerRegister