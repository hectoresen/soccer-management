import * as actions from '../actions/auth.actions';

const INITIAL_STATE = {
    player: false,
    team: false,
    coach: false,
    error: false
};

export const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case (actions.AUTH_TEAM_REGISTER_OK) : {
            return {...state, team: action.payload }
        }
        case (actions.AUTH_TEAM_REGISTER_ERROR) : {
            return {...state, team: false, error: action.payload }
        }
        case (actions.AUTH_TEAM_LOGIN_OK) : {
            return {...state, team: action.payload, error: false}
        }
        case (actions.AUTH_TEAM_LOGIN_ERROR) : {
            return {...state, team: false, error: action.payload}
        }
        case (actions.AUTH_PLAYER_REGISTER_OK): {
            return {...state, player: action.payload, error: false}
        }
        case (actions.AUTH_PLAYER_REGISTER_ERROR): {
            return {...state, player: false, error: action.payload}
        }
        case (actions.AUTH_PLAYER_LOGIN_OK): {
            return {...state, player: action.payload, error: false}
        }
        case (actions.AUTH_PLAYER_LOGIN_ERROR): {
            return {...state, player: false, error: action.payload}
        }
        case (actions.AUTH_COACH_REGISTER_OK): {
            return {...state, coach: action.payload, error: false}
        }
        case (actions.AUTH_COACH_REGISTER_ERROR): {
            return {...state, coach: false, error: action.payload}
        }
        case (actions.AUTH_COACH_LOGIN_OK): {
            return {...state, coach: action.payload, error: false}
        }
        case (actions.AUTH_COACH_LOGIN_ERROR): {
            return {...state, coach: false, error: action.payload}
        }
        default:
            return state;
    }
};
