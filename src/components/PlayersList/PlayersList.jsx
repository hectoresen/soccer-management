import React from 'react';
import { connect } from 'react-redux';
import { addPlayer, findAllPlayers } from '../../redux/actions/team.actions';
import { useState } from 'react';
import { useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import './PlayersList.scss';

const PlayersList = ({dispatch, playersList, filteredPlayers, team, error}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() =>{
        console.log('Estás con el equipo->', team);
        dispatch(findAllPlayers());
    },[])

    const header = (
        <div className="playerslist__header">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" placeholder="Buscar jugadores..." />
            </span>
        </div>
    );

    const displayTeamPlayer = player =>{
        if(player.team.length <1){
            return <div>Sin equipo actualmente</div>
        }else{
            return <p>{player.team}</p>
        }
    };

    const addPlayerToTeam = playerId =>{
        dispatch(addPlayer(playerId, team._id));
    };

    const btnActions = player =>{
        if(player.team.length){
            return <div>
                <Button icon="pi pi-plus"
                        className='p-button-success playerslist__btn'
                        iconPos='right'
                        disabled
                >
                </Button>
            </div>
        }else{
            return <div>
                <Button icon="pi pi-plus"
                        className='p-button-success playerslist__btn'
                        iconPos='right'
                        onClick={() =>{addPlayerToTeam(player.id)}}
                >
                </Button>
            </div>
        };
    };

    return (
        <>
        <div className='playerslist'>
            <DataTable value={playersList} header={header} responsiveLayout="scroll">
                <Column field="name" header="Nombre" body={playersList.name}></Column>
                <Column field="name" header="Equipo" body={displayTeamPlayer}></Column>
                <Column field="actions" header="Dar de alta" body={btnActions}></Column>
            </DataTable>
        </div>
        </>
    )
};

const mapStateProps = (state) =>({
    team: state.auth.team,
    playersList: state.team.playersList,
    filteredPlayers: state.team.filteredPlayers,
    error: state.team.error
});

export default connect(mapStateProps)(PlayersList);