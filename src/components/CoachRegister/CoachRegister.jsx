import React from "react";
import { useState } from "react";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { coachRegister } from "../../redux/actions/auth.actions";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./CoachRegister.scss";

const INITIAL_VALUE = {
    name: "",
    email: "",
    password: "",
};

const CoachRegister = ({dispatch, coach, error}) => {
    const [coachData, setCoachData] = useState(INITIAL_VALUE);
    const navigate = useNavigate();

    useEffect(() =>{
        if(coach){
            navigate('/home')
        }
    }, [coach])

    const submitForm = ev => {
        ev.preventDefault();
        dispatch(coachRegister(coachData));
        setCoachData(INITIAL_VALUE)
    };

    const handleInputValue = ev =>{
        const {name, value} = ev.target;
        setCoachData({...coachData, [name]: value})
    };


    return (
        <div className="coachregister">
            <h3>Registro de Entrenadores</h3>
            <div className="coachregister__form">
                <form onSubmit={submitForm}>
                    <div className="coachregister__form-input">
                        <span className="p-input-icon-right p-input-icon-right">
                            <i className="pi pi-user" />
                            <InputText
                                name="name"
                                type="text"
                                placeholder="Nombre de entrenador *"
                                value={coachData.name}
                                onChange={handleInputValue}
                            ></InputText>
                        </span>
                    </div>
                    <div className="coachregister__form-input">
                        <span className="p-input-icon-right p-input-icon-right">
                            <i className="pi pi-envelope" />
                            <InputText
                                name="email"
                                type="email"
                                placeholder="Correo electrónico *"
                                value={coachData.email}
                                onChange={handleInputValue}
                            ></InputText>
                        </span>
                    </div>
                    <div className="coachregister__form-input">
                        <span className="p-input-icon-right p-input-icon-right">
                            <i className="pi pi-lock" />
                            <InputText
                                name="password"
                                type="password"
                                placeholder="Contraseña *"
                                value={coachData.password}
                                onChange={handleInputValue}
                            ></InputText>
                        </span>
                    </div>
                    <p className="coachregister__form-errors">{error}</p>
                    <div className="coachregister__form-btn">
                        <Button>Registrarme</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
const mapStateProps = (state) =>({
    coach: state.auth.coach,
    error: state.auth.error
});

export default connect(mapStateProps)(CoachRegister);
