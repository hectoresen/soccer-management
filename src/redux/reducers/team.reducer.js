import * as actions from '../actions/team.actions';

const INITIAL_STATE = {
    playersList: false,
    filteredPlayers: false,
    coachList: false,
    teamTemplate: false,
    error: false,
    unsubscribed: false,
    updatedBudget: false,
    updatedPlayers: false,
    updatedCoachs: false
};


export const teamReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case (actions.ACTION_PLAYERS_LIST_OK) : {
            return {...state, playersList: action.payload, error: false, unsubscribed: false, updatedPlayers: false}
        }
        case (actions.ACTION_PLAYERS_LIST_ERROR): {
            return {...state, playersList: false, error: action.payload, updatedPlayers: false}
        }
        case (actions.ACTION_PLAYER_ADD_OK): {
            return {...state, updatedPlayers: action.payload, error: false}
        }
        case (actions.ACTION_PLAYER_ADD_ERROR): {
            return {...state, updatedPlayers: false, error: action.payload}
        }
        case (actions.ACTION_COACHS_LIST_OK): {
            return {...state, coachList: action.payload, error: false}
        }
        case (actions.ACTION_COACHS_LIST_ERROR): {
            return {...state, coachList: false, error: action.payload}
        }
        case (actions.ACTION_TEMPLATE_LIST_OK): {
            return {...state, teamTemplate: action.payload, unsubscribed: false, error: false}
        }
        case (actions.ACTION_TEMPLATE_LIST_ERROR): {
            return {...state, teamTemplate: false, error: action.payload}
        }
        case (actions.ACTION_COACH_ADD_OK): {
            return {...state, updatedCoachs: action.payload, error: false}
        }
        case (actions.ACTION_COACH_ADD_ERROR): {
            return {...state, updatedCoachs: false, error: action.payload}
        }
        case (actions.ACTION_FILTERING_PLAYERS_OK): {
            return {...state, filteredPlayers: action.payload}
        }
        case (actions.ACTION_FILTERING_PLAYERS_ERROR): {
            return {...state, filteredPlayers: action.payload}
        }
        case (actions.ACTION_UNSUBSCRIBE_PLAYER_COACH_OK):{
            return {...state, unsubscribed: true}
        }
        case (actions.ACTION_UNSUBSCRIBE_PLAYER_COACH_ERROR): {
            return {...state, unsubscribed: false}
        }
        case (actions.ACTION_UPDATEBUDGET_OK): {
            return {...state, updatedBudget: action.payload, error: false}
        }
        case (actions.ACTION_UPDATEBUDGET_ERROR): {
            return {...state, updatedBudget: false, error: action.payload}
        }
        default:
            return state;
    }
}