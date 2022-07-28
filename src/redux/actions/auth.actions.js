/* TEAM */
export const AUTH_TEAM_REGISTER = "AUTH_TEAM_REGISTER";
export const AUTH_TEAM_REGISTER_OK = "AUTH_TEAM_REGISTER_OK";
export const AUTH_TEAM_REGISTER_ERROR = "AUTH_TEAM_REGISTER_ERROR";

export const AUTH_TEAM_LOGIN = "AUTH_TEAM_LOGIN";
export const AUTH_TEAM_LOGIN_OK = "AUTH_TEAM_LOGIN_OK";
export const AUTH_TEAM_LOGIN_ERROR = "AUTH_TEAM_LOGIN_ERROR";

export const EDIT_TEAM = "EDIT_TEAM";
export const EDIT_TEAM_OK = "EDIT_TEAM_OK"
export const EDIT_TEAM_ERROR = "EDIT_TEAM_ERROR";

/* COACH */
export const AUTH_COACH_REGISTER = "AUTH_COACH_REGISTER";
export const AUTH_COACH_REGISTER_OK = "AUTH_COACH_REGISTER_OK";
export const AUTH_COACH_REGISTER_ERROR = "AUTH_COACH_REGISTER_ERROR";

export const AUTH_COACH_LOGIN = "AUTH_COACH_LOGIN";
export const AUTH_COACH_LOGIN_OK = "AUTH_COACH_LOGIN_OK";
export const AUTH_COACH_LOGIN_ERROR = "AUTH_COACH_LOGIN_ERROR";

/* PLAYER */
export const AUTH_PLAYER_REGISTER = "AUTH_PLAYER_REGISTER";
export const AUTH_PLAYER_REGISTER_OK = "AUTH_PLAYER_REGISTER_OK";
export const AUTH_PLAYER_REGISTER_ERROR = "AUTH_PLAYER_REGISTER_ERROR";

export const AUTH_PLAYER_LOGIN = "AUTH_PLAYER_LOGIN";
export const AUTH_PLAYER_LOGIN_OK = "AUTH_PLAYER_LOGIN_OK";
export const AUTH_PLAYER_LOGIN_ERROR = "AUTH_PLAYER_LOGIN_ERROR";



/* TEAM */
export const teamRegister = form =>{
    return async(dispatch) =>{
        dispatch({type: AUTH_TEAM_REGISTER});

        const registerRequest = await fetch('http://localhost:4000/team/register', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            credentials: "include",
            body: JSON.stringify(form),
        });
        const result = await registerRequest.json();

        if(registerRequest.ok){
            dispatch({type: AUTH_TEAM_REGISTER_OK, payload: result})
        }else{
            dispatch({type: AUTH_TEAM_REGISTER_ERROR, payload: result.message})
        };
    };
};

export const teamLogin = form =>{
    return async(dispatch) =>{
        console.log(form);
        dispatch({type: AUTH_TEAM_LOGIN});

        const loginRequest = await fetch('http://localhost:4000/team/login', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            credentials: "include",
            body: JSON.stringify(form),
        });
        const result = await loginRequest.json();
        if(loginRequest.ok){
            dispatch({type: AUTH_TEAM_LOGIN_OK, payload: result})
        }else{
            dispatch({type: AUTH_TEAM_LOGIN_ERROR, payload: result.message})
        };
    };
};


/* COACH */

/* PLAYER */
