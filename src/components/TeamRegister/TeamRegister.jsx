import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { teamRegister } from '../../redux/actions/auth.actions';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import './TeamRegister.scss';

const INITIAL_VALUE = {
  name: '',
  email: '',
  budget: 0,
  password: ''
};

const TeamRegister = ({ dispatch, team, error }) => {

  const [teamData, setTeamData] = useState(INITIAL_VALUE);
  const navigate = useNavigate();

  useEffect(() => {
    if (team) {
      navigate('/home')
    }
  }, [team])

  const submitForm = ev => {
    ev.preventDefault();
    dispatch(teamRegister(teamData))
    setTeamData(INITIAL_VALUE)
  };

  const handleInputValue = ev => {
    const { name, value } = ev.target;
    setTeamData({ ...teamData, [name]: value })
  };

  return (
    <div className='teamregister'>
      <h3>Registro de equipos</h3>
      <div className='teamregister__form'>
        <form onSubmit={submitForm}>
          <div className='teamregister__form-input'>
            <span className="p-input-icon-right p-input-icon-right">
              <i className="pi pi-user" />
              <InputText name='name' type="text" placeholder='Nombre del club *' value={teamData.name} onChange={handleInputValue}></InputText>
            </span>
          </div>
          <div className='teamregister__form-input'>
            <span className="p-input-icon-right p-input-icon-right">
              <i className="pi pi-envelope" />
              <InputText name='email' type="email" placeholder='Correo electrónico *' value={teamData.email} onChange={handleInputValue} required></InputText>
            </span>
          </div>
          <div className='teamregister__form-input'>
            <span className="p-input-icon-right p-input-icon-right">
              <i className="pi pi-money-bill" />
              <InputNumber mode="currency" currency="EUR" placeholder='Presupuesto' value={teamData.budget} onChange={(ev) => { setTeamData({ ...teamData, budget: ev.value }) }}></InputNumber>
            </span>
          </div>
          <div className='teamregister__form-input'>
            <span className="p-input-icon-right p-input-icon-right">
              <i className="pi pi-lock" />
              <InputText name='password' type="password" placeholder='Contraseña *' value={teamData.password} onChange={handleInputValue}></InputText>
            </span>
          </div>
          <p className='teamregister__form-errors'>{error}</p>
          <div className='teamregister__form-btn'>
            <Button>Registrar equipo</Button>
          </div>
        </form>
      </div>
    </div>
  )
};

const mapStateProps = (state) => ({
  team: state.auth.team,
  error: state.auth.error
});

export default connect(mapStateProps)(TeamRegister);