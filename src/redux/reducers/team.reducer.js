import * as actions from '../actions/team.actions';

const INITIAL_STATE = {
    playersList: false,
    filteredPlayers: false,
    error: false
};


export const teamReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case (actions.ACTION_PLAYERS_LIST_OK) : {
            return {...state, playersList: action.payload, error: false}
        }
        case (actions.ACTION_PLAYERS_LIST_ERROR): {
            return {...state, playersList: false, error: action.payload}
        }
        case (actions.ACTION_PLAYER_ADD_OK): {
            return {...state, playersList: action.payload, error: false}
        }
        case (actions.ACTION_PLAYER_ADD_ERROR): {
            return {...state, error: action.payload}
        }
        default:
            return state;
    }
}