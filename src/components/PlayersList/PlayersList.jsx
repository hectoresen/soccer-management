import React from 'react';
import { connect } from 'react-redux';
import { addPlayer, findAllPlayers } from '../../redux/actions/team.actions';
import { useState } from 'react';
import { useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Modal, Input, Row, Checkbox, Text } from "@nextui-org/react";
import './PlayersList.scss';

const PlayersList = ({ dispatch, playersList, filteredPlayers, team, error }) => {
    const [activePage, setActivePage] = useState(1);
    const [enableNextPage, setEnableNextPage] = useState(false);
    const [enablePreviousPage, setEnablePreviousPage] = useState(false);
    const [updatedPlayer, setUpdatedPlayer] = useState({ playerId: '', teamId: '', playerSalary: 0 })
    const [visible, setVisible] = useState(false);
    const { players, totalPages } = playersList;

    useEffect(() => {
        if (activePage === totalPages) {
            setEnableNextPage(true);
            setEnablePreviousPage(false)
        } else if (activePage === 1) {
            setEnablePreviousPage(true)
            setEnableNextPage(false)
        } else if (!activePage === 1 || activePage === totalPages) {
            setEnableNextPage(false)
            setEnablePreviousPage(false)
        };
        dispatch(findAllPlayers(activePage));
    }, [activePage]);

    useEffect(() =>{
        if(error){
            setVisible(true);
        }
    },[error])

    const closeHandler = () => setVisible(false);

    const header = (
        <div className="playerslist__header">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" placeholder="Buscar jugadores..." />
            </span>
        </div>
    );

    const displayTeamPlayer = player => {
        if (player.team.length < 1) {
            return <div>Sin equipo actualmente</div>
        } else {
            return <p>{player.team}</p>
        }
    };

    const handleUpdatedTeamData = playerId => {
        console.log(1);
        setUpdatedPlayer({ playerId: playerId, teamId: team._id });
        setVisible(true)
    }

    const addPlayerToTeam = () => {
        dispatch(addPlayer(updatedPlayer));
        closeHandler();
    };

    const getSalary = player => {
        return <div><p>{player.salary}</p></div>
    };

    const btnActions = player => {
        if (player.team.length) {
            return <div>
                <Button icon="pi pi-plus"
                    className='p-button-success playerslist__btn'
                    iconPos='right'
                    disabled
                >
                </Button>
            </div>
        } else {
            return <div>
                <Button icon="pi pi-plus"
                    className='p-button-success playerslist__btn'
                    iconPos='right'
                    onClick={() => { handleUpdatedTeamData(player.id) }}
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
                        <Column field="salary" header="Salario" body={getSalary}></Column>
                        <Column field="actions" header="Dar de alta" body={btnActions}></Column>
                    </DataTable>
                }
                <div className='playerslist__paginator'>
                    <div className='playerslist__paginator-text'>
                        Cambiar de página
                    </div>
                    <div className='playerslist__paginator-buttons'>
                        <Button icon="pi pi-arrow-left"
                            onClick={() => setActivePage(activePage - 1)
                            }
                            disabled={enablePreviousPage}
                        />
                        <Button icon="pi pi-arrow-right"
                            onClick={() => setActivePage(activePage + 1)}
                            disabled={enableNextPage}
                        />
                    </div>
                </div>
                <div className='playerslist__salary'>
                    {!error &&
                    <Modal
                        closeButton
                        blur
                        aria-labelledby="modal-title"
                        open={visible}
                        onClose={closeHandler}
                    >
                        <Modal.Header>
                            <Text id="modal-title" size={18}>
                                Indica el salario para este jugador
                            </Text>
                        </Modal.Header>
                        <Modal.Body>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                label='El total de salarios no debe sobrepasar el presupuesto del equipo'
                                color="primary"
                                type="number"
                                size="lg"
                                name='playerSalary'
                                placeholder="Salario"
                                onChange={(ev) =>{
                                    const {name, value} = ev.target;
                                    setUpdatedPlayer({...updatedPlayer, [name]: value})
                                }}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button auto flat color="error" onClick={closeHandler}>
                                Cerrar
                            </Button>
                            <Button auto onClick={() =>{
                                addPlayerToTeam()
                            }}>
                                Dar de alta
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    }
                    {error &&
                        <Modal
                            closeButton
                            blur
                            aria-labelledby="modal-title"
                            open={visible}
                            onClose={closeHandler}
                        >
                            <Modal.Header>
                                <Text id="modal-title" size={18}>
                                    <p className='budget-error'>{error}</p>
                                </Text>
                            </Modal.Header>
                        </Modal>
                    }
                </div>
            </div>
        </>
    )
};

const mapStateProps = (state) => ({
    team: state.auth.team,
    playersList: state.team.playersList,
    filteredPlayers: state.team.filteredPlayers,
    error: state.team.error
});

export default connect(mapStateProps)(PlayersList);