import React from "react";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./CoachRegister.scss";

const INITIAL_VALUE = {
    name: "",
    email: "",
    password: "",
};

const CoachRegister = () => {
    const [coachData, setCoachData] = useState(INITIAL_VALUE);

    const submitForm = ev => {
        ev.preventDefault();
        console.log("Total del formulario", coachData);
    };

    const handleInputValue = ev =>{
        const {name, value} = ev.target;
        setCoachData({...coachData, [name]: value})
    };


    return (
        <div className="coachregister">
            <h3>Registro de Entrenadores</h3>
            <div className="teamregister__form">
                <form onSubmit={submitForm}>
                    <div className="teamregister__form-input">
                        <span className="p-input-icon-right p-input-icon-right">
                            <i className="pi pi-user" />
                            <InputText
                                name="name"
                                type="text"
                                placeholder="Nombre de entrenador"
                                value={coachData.name}
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
                                value={coachData.email}
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
                                value={coachData.password}
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
    );
};

export default CoachRegister;
