import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { playerRegister } from '../../redux/actions/auth.actions';
import { useNavigate } from 'react-router-dom';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import './PlayerRegister.scss';

const INITIAL_VALUE = {
    name: '',
    email: '',
    password: ''
};

const PlayerRegister = ({ dispatch, player, error }) => {
    const [playerData, setPlayerData] = useState(INITIAL_VALUE)
    const navigate = useNavigate();

    useEffect(() => {
        if (player) {
            navigate('/home')
        }
    }, [player])

    const submitForm = ev => {
        ev.preventDefault();
        dispatch(playerRegister(playerData));
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
                    <div className="playerregister__form-input">
                        <span className="p-input-icon-right p-input-icon-right">
                            <i className="pi pi-user" />
                            <InputText
                                name="name"
                                type="text"
                                placeholder="Nombre de entrenador *"
                                value={playerData.name}
                                onChange={handleInputValue}
                            ></InputText>
                        </span>
                    </div>
                    <div className="playerregister__form-input">
                        <span className="p-input-icon-right p-input-icon-right">
                            <i className="pi pi-envelope" />
                            <InputText
                                name="email"
                                type="email"
                                placeholder="Correo electrónico *"
                                value={playerData.email}
                                onChange={handleInputValue}
                            ></InputText>
                        </span>
                    </div>
                    <div className="playerregister__form-input">
                        <span className="p-input-icon-right p-input-icon-right">
                            <i className="pi pi-lock" />
                            <InputText
                                name="password"
                                type="password"
                                placeholder="Contraseña *"
                                value={playerData.password}
                                onChange={handleInputValue}
                            ></InputText>
                        </span>
                    </div>
                    <p className='playerregister__form-errors'>{error}</p>
                    <div className="playerregister__form-btn">
                        <Button>Registrarme</Button>
                    </div>
                </form>
            </div>
        </div>
    )
};

const mapStateProps = (state) => ({
    player: state.auth.player,
    error: state.auth.error
});

export default connect(mapStateProps)(PlayerRegister);