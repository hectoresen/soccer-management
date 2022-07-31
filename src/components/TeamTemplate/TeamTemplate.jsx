import React from 'react';
import { connect } from 'react-redux';
import { getTemplate, unsubscribe } from '../../redux/actions/team.actions';
import { useState } from 'react';
import { useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import CoachList from '../CoachList/CoachList';
import './TeamTemplate.scss';

const TeamTemplate = ({dispatch, team, teamTemplate}) => {
    const {players, coachs} = teamTemplate;
    const [needCoach, setNeedCoach] = useState(false);

    useEffect(() =>{
        dispatch(getTemplate(team._id))
    },[])

    const playersHeader = (
        <div className='teamtemplate__header'>
            <h3>Jugadores</h3>
        </div>
    );
    const coachsHeader = (
        <div className='teamtemplate__header'>
            <h3>Entrenadores</h3>
            <div className='teamtemplate__header-findcoach'>
                <div className='teamtemplate__header-findcoach-item'>
                    <p>¿Necesitas un entrenador? <a href="#" onClick={() => setNeedCoach(true)}>Buscar <i className="pi pi-search"></i></a></p>
                </div>
            </div>
        </div>
    );

    const getSalary = player => <div><p>{player.salary} €</p></div>;

    const btnActions = player =>{
        return <div>
                    <Button icon="pi pi-trash"
                        className='p-button-warning templatelist__btn'
                        iconPos='right'
                        onClick={() => {
                            dispatch(unsubscribe({memberId: player.id, teamId: team._id}));
                        }}
                    >
                    </Button>
                </div>
    };

    return (
        <div className='teamtemplate'>
            {players &&
            <div className='teamtemplate__list'>
                <div className='teamtemplate__list-players'>
                    <DataTable value={players} header={playersHeader} responsiveLayout="scroll">
                        <Column field="name" header="Nombre" body={players.name}></Column>
                        <Column field="salary" header="Salario" body={getSalary}></Column>
                        <Column field="actions" header="Dar de baja" body={btnActions}></Column>
                    </DataTable>
                    {(!players.length) ? <p className='no-coaches'>No tienes jugadores</p> : ''}
                </div>
                <div className='teamtemplate__list-coachs'>
                    {!needCoach &&
                    <div className='teamtemplate__list-coachs-list'>
                        <DataTable value={coachs} header={coachsHeader} responsiveLayout="scroll">
                            <Column field="name" header="Nombre" body={players.name}></Column>
                            <Column field="salary" header="Salario" body={getSalary}></Column>
                            <Column field="actions" header="Dar de baja" body={btnActions}></Column>
                        </DataTable>
                    {(!coachs.length) ? <p className='no-coaches'>No tienes entrenadores</p> : ''}
                    </div>
                    }
                    {needCoach &&
                    <div className='teamtemplate__list-findcoach'>
                        <div className='teamtemplate__list-findcoach-item'>
                            <a href="#" onClick={() => setNeedCoach(false)}>Volver a mis entrenadores <i className="pi pi-arrow-up-left"></i></a>
                        </div>
                        <CoachList />
                    </div>
                    }
                </div>
            </div>
            }
        </div>
    )
};

const mapStateProps = (state) =>({
    team: state.auth.team,
    teamTemplate: state.team.teamTemplate
});

export default connect(mapStateProps)(TeamTemplate);