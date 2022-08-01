import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { updateBudget } from '../../redux/actions/team.actions';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import './UpdateBudget.scss';

const UpdateBudget = ({dispatch, team, error, updatedBudget}) => {
    const [budget, setBudget] = useState(0);

    const submitNewBudget = (ev) =>{
        ev.preventDefault();
        dispatch(updateBudget(team._id, budget));
    }


    return (
        <div className='updatebudget'>
            <div className='updatebudget__info'>
                <p>El presupuesto de tu equipo es de <span> {team.budget} €</span></p>
            </div>
            <div className='updatebudget__form'>
                <div>
                    <span className="p-input-icon-right p-input-icon-right">
                        <i className="pi pi-money-bill" />
                        <InputNumber mode="currency" currency="EUR" placeholder='Presupuesto' value={budget} onChange={(ev) => {setBudget(ev.value)}}></InputNumber>
                    </span>
                </div>
                <div className='updatebudget__form-btn'>
                    <Button
                    onClick={submitNewBudget}
                    disabled={(budget === 0) || (budget === null)}
                    >
                        Actualizar presupuesto
                    </Button>
                </div>
            </div>
                <div className='updatebudget-warning'>
                    {budget !== 0 &&
                        <p>Vas a cambiar el presupuesto de tu equipo por <span>{budget} €</span></p>
                    }
                    {error &&
                        <p className='updatebudget-warning-error'>{error}</p>
                    }
                    {updatedBudget && <p className='budget-updated'>¡{updatedBudget}!</p>}
                </div>
        </div>
    );
};

const mapStateProps = (state) => ({
    team: state.auth.team,
    error: state.team.error,
    updatedBudget: state.team.updatedBudget
});

export default connect(mapStateProps)(UpdateBudget);