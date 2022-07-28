import React from 'react';
import { useState } from 'react';
import { CoachRegister, LoginForm, PlayerRegister, TeamRegister } from '../../components';
import './Access.scss';

const Access = () => {
    const [typeOfRegister, setTypeOfRegister] = useState('');
    const [needToLogin, setNeedToLogin] = useState(false);
    const [typeToLogin, setTypeToLogin] = useState('');

    return (
        <div className='access'>
            <div className='access__form'>
                {!needToLogin &&
                                <div className='access__form__select'>
                                <div className='access__form__select-item'
                                    onClick={() =>{
                                        setTypeOfRegister('player')
                                        setNeedToLogin(false)
                                    }}>
                                    Darme de alta como jugador
                                </div>
                                <div className='access__form__select-item'
                                    onClick={() =>{
                                        setTypeOfRegister('coach')
                                        setNeedToLogin(false)
                                    }}>
                                    Darme de alta como entrenador
                                </div>
                                <div className='access__form__select-item'
                                    onClick={() =>{
                                        setTypeOfRegister('team')
                                        setNeedToLogin(false)
                                        }}>
                                    Darme de alta como club
                                </div>
                            </div>
                }

                {typeOfRegister === 'player' && <PlayerRegister />}
                {typeOfRegister === 'coach' && <CoachRegister />}
                {typeOfRegister === 'team' && <TeamRegister />}
                <div className='access__form__login'>
                    {!needToLogin &&
                        <div className='access__form__login-select'
                            onClick={() =>{
                                setNeedToLogin(true)
                                setTypeOfRegister('')
                            }}>
                            Ya estoy registrado
                        </div>
                    }
                    {needToLogin &&
                        <div className='access__form__login__panel'>
                            <div className='access__form__login__panel-items'>
                                <div className='access__form__login__panel-items-item'
                                    onClick={() =>{
                                        setTypeToLogin('team')
                                    }}>
                                    Iniciar sesión como club
                                </div>
                                <div className='access__form__login__panel-items-item'
                                    onClick={() =>{
                                        setTypeToLogin('coach')
                                    }}>
                                    Iniciar sesión como entrenador
                                </div>
                                <div className='access__form__login__panel-items-item'
                                    onClick={() =>{
                                        setTypeToLogin('player')
                                    }}>
                                    Iniciar sesión como jugador
                                </div>
                            </div>
                            <div className='access__form__login__panel-back'>
                                <div className='access__form__login__panel-back-item'
                                    onClick={() =>{
                                        setNeedToLogin(false)
                                    }}>
                                    Volver a registro
                                </div>
                            </div>
                            <div className='access__form__login__panel-content'>
                                {typeToLogin === 'team' && <LoginForm loginType='team' />}
                                {typeToLogin === 'coach' && <LoginForm loginType='coach' />}
                                {typeToLogin === 'player' && <LoginForm loginType='player' />}

                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Access;