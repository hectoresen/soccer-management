import {combineReducers} from "redux";
import { authReducer } from "./auth.reducer";
import { teamReducer } from "./team.reducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    team: teamReducer
});
