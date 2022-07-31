import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { addCoach, findAllCoachs } from '../../redux/actions/team.actions';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Modal, Input, Row, Text } from "@nextui-org/react";
import './CoachList.scss';

const CoachList = ({dispatch, coachList, team, error}) => {
    const [updatedCoach, setUpdatedCoach] = useState({coachId: '', teamId: '', coachSalary: 0});
    const [visible, setVisible] = useState(false);

    useEffect(() =>{
        dispatch(findAllCoachs());
    },[])
    const closeHandler = () => setVisible(false);

    const refreshPostError = () =>{
        setTimeout(() =>{
            dispatch(findAllCoachs())
        }, 3000)
    };


    const header = (
        <div className="coachlist__header">
            <h3>Lista de entrenadores</h3>
        </div>
    );

    const getSalary = coach => <div><p>{coach.salary} €</p></div>;

    const displayTeamCoach = coach => {
        if (coach.team.length < 1) {
            return <div>Sin equipo actualmente</div>
        } else {
            return <p>{coach.team}</p>
        }
    };

    const btnActions = coach => {
        if (coach.team.length) {
            return <div>
                <Button icon="pi pi-plus"
                    className='p-button-success coachlist__btn'
                    iconPos='right'
                    disabled
                >
                </Button>
            </div>
        } else {
            return <div>
                <Button icon="pi pi-plus"
                    className='p-button-success coachlist__btn'
                    iconPos='right'
                    onClick={() => { handleUpdatedTeamData(coach.id) }}
                >
                </Button>
            </div>
        };
    };

    const handleUpdatedTeamData = coachId =>{
        setUpdatedCoach({coachId: coachId, teamId: team._id});
        setVisible(true);
    };

    const addCoachToTeam = () => {
        dispatch(addCoach(updatedCoach))
        closeHandler();
    };


    return (
        <div className='coachlist'>
            {!coachList &&
                <div>
                    <p className='budget-error'>{error}</p>
                    {refreshPostError()};
                </div>
            }
            {coachList &&
                <DataTable value={coachList} header={header} responsiveLayout="scroll">
                    <Column field="name" header="Nombre" body={coachList.name}></Column>
                    <Column field="salary" header="Salario" body={getSalary}></Column>
                    <Column field="name" header="Equipo" body={displayTeamCoach}></Column>
                    <Column field="actions" header="Dar de alta" body={btnActions}></Column>
                </DataTable>
            }
            <div className='coachlist__salary'>
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
                            name='coachSalary'
                            placeholder="Salario"
                            onChange={(ev) =>{
                                const {name, value} = ev.target;
                                setUpdatedCoach({...updatedCoach, [name]: value})
                            }}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button auto flat color="error" onClick={closeHandler}>
                            Cerrar
                        </Button>
                        <Button auto onClick={() =>{
                            addCoachToTeam()
                        }}>
                            Dar de alta
                        </Button>
                    </Modal.Footer>
                </Modal>
                }
            </div>
        </div>
    )
};

const mapStateProps = (state) =>({
    team: state.auth.team,
    coachList: state.team.coachList,
    error: state.team.error
})

export default connect(mapStateProps)(CoachList);