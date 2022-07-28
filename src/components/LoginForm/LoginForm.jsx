import React from 'react';
import { useState } from 'react';
import {connect} from 'react-redux';
import { teamLogin } from '../../redux/actions/auth.actions';
import { useNavigate } from 'react-router-dom'
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import './LoginForm.scss';
import { useEffect } from 'react';

const INITIAL_VALUE = {
    email: "",
    password: "",
};


const LoginForm = ({dispatch, team, player, coach, error, loginType}) => {

    const [loginData, setLoginData] = useState(INITIAL_VALUE);

    useEffect(() =>{
        if(team || player || coach){
            navigate('/home')
        }
    }, [team, player, coach])

    const navigate = useNavigate();

    const submitForm = ev => {
        ev.preventDefault();
        if(loginType === 'team'){
            dispatch(teamLogin(loginData))
            setLoginData(INITIAL_VALUE);
        }
    };

    const handleInputValue = ev =>{
        const {name, value} = ev.target;
        setLoginData({...loginData, [name]: value})
    };



    return (
        <div className='loginform'>
            <h3>{loginType} Access</h3>
            <div className="loginform__form">
                <form onSubmit={submitForm}>
                    <div className="loginform__form-input">
                        <span className="p-input-icon-right p-input-icon-right">
                            <i className="pi pi-envelope" />
                            <InputText
                                name="email"
                                type="email"
                                placeholder="Correo electrónico"
                                value={loginData.email}
                                onChange={handleInputValue}
                            ></InputText>
                        </span>
                    </div>
                    <div className="loginform__form-input">
                        <span className="p-input-icon-right p-input-icon-right">
                            <i className="pi pi-lock" />
                            <InputText
                                name="password"
                                type="password"
                                placeholder="Contraseña"
                                value={loginData.password}
                                onChange={handleInputValue}
                            ></InputText>
                        </span>
                    </div>
                    <p className='loginform__form-errors'>{error}</p>
                    <div className="loginform__form-btn">
                        <Button>Iniciar sesión</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const mapStateProps = (state) =>({
    team: state.auth.team,
    player: state.auth.player,
    coach: state.auth.coach,
    error: state.auth.error
});

export default connect(mapStateProps)(LoginForm);