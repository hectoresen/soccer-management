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
    const [activePage, setActivePage] = useState(1);
    const [enableNextPage, setEnableNextPage] = useState(false);
    const [enablePreviousPage, setEnablePreviousPage] = useState(false);
    const {players, totalPages} = playersList;

    useEffect(() =>{
        if(activePage === totalPages){
            setEnableNextPage(true);
            setEnablePreviousPage(false)
        }else if(activePage === 1 ){
            setEnablePreviousPage(true)
            setEnableNextPage(false)
        }else if(!activePage === 1 || activePage === totalPages){
            setEnableNextPage(false)
            setEnablePreviousPage(false)
        };
        dispatch(findAllPlayers(activePage));
    },[activePage]);

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
            {!playersList &&
                <div>Cargando jugadores</div>
            }
            {playersList &&
                <DataTable value={players} header={header} responsiveLayout="scroll">
                    <Column field="name" header="Nombre" body={players.name}></Column>
                    <Column field="name" header="Equipo" body={displayTeamPlayer}></Column>
                    <Column field="actions" header="Dar de alta" body={btnActions}></Column>
                    {error && <p>{error}</p>}
                </DataTable>
            }
        <div className='playerslist__paginator'>
            <div className='playerslist__paginator-text'>
                Cambiar de página
            </div>
            <div className='playerslist__paginator-buttons'>
                <Button icon="pi pi-arrow-left"
                        onClick={() => setActivePage(activePage -1)
                                }
                        disabled={enablePreviousPage}
                />
                <Button icon="pi pi-arrow-right"
                        onClick={() => setActivePage(activePage +1)}
                        disabled={enableNextPage}
                />
            </div>
        </div>
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