export const ACTION_PLAYERS_LIST = "ACTION_PLAYERS_LIST";
export const ACTION_PLAYERS_LIST_OK = "ACTION_PLAYERS_LIST_OK";
export const ACTION_PLAYERS_LIST_ERROR = "ACTION_PLAYERS_LIST_ERROR";

export const ACTION_PLAYER_ADD = "ACTION_PLAYER_ADD";
export const ACTION_PLAYER_ADD_OK = "ACTION_PLAYER_ADD__OK";
export const ACTION_PLAYER_ADD_ERROR = "ACTION_PLAYER_ADD_ERROR";

export const ACTION_COACHS_LIST = "ACTION_COACHS_LIST";
export const ACTION_COACHS_LIST_OK = "ACTION_COACHS_LIST_OK";
export const ACTION_COACHS_LIST_ERROR = "ACTION_COACHS_LIST_ERROR";

export const ACTION_COACH_ADD = "ACTION_COACH_ADD";
export const ACTION_COACH_ADD_OK = "ACTION_COACH_ADD_OK";
export const ACTION_COACH_ADD_ERROR = "ACTION_COACH_ADD_ERROR"

export const ACTION_TEMPLATE_LIST = "ACTION_TEMPLATE_LIST";
export const ACTION_TEMPLATE_LIST_OK = "ACTION_TEMPLATE_LIST_OK";
export const ACTION_TEMPLATE_LIST_ERROR = "ACTION_TEMPLATE_LIST_ERROR";

export const ACTION_FILTERING_PLAYERS = "ACTION_FILTERING_PLAYERS";
export const ACTION_FILTERING_PLAYERS_OK = "ACTION_FILTERING_PLAYERS_OK";
export const ACTION_FILTERING_PLAYERS_ERROR = "ACTION_FILTERING_PLAYERS_ERROR";

export const ACTION_UNSUBSCRIBE_PLAYER_COACH = "ACTION_UNSUBSCRIBE_PLAYER_COACH";
export const ACTION_UNSUBSCRIBE_PLAYER_COACH_OK = "ACTION_UNSUBSCRIBE_PLAYER_COACH_OK";
export const ACTION_UNSUBSCRIBE_PLAYER_COACH_ERROR = "ACTION_UNSUBSCRIBE_PLAYER_COACH_ERROR"

export const ACTION_UPDATEBUDGET = "ACTION_UPDATEBUDGET";
export const ACTION_UPDATEBUDGET_OK = "ACTION_UPDATEBUDGET_OK";
export const ACTION_UPDATEBUDGET_ERROR = "ACTION_UPDATEBUDGET_ERROR";


export const findAllPlayers = (activePage) =>{
    return async(dispatch) =>{
        dispatch({type: ACTION_PLAYERS_LIST});

        const findRequest = await fetch(`http://localhost:4000/team/allplayers/${activePage}`,{
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            credentials: "include",
        });
        const result = await findRequest.json();

        if(findRequest.ok){
            dispatch({type: ACTION_PLAYERS_LIST_OK, payload: result})
        }else{
            dispatch({type: ACTION_PLAYERS_LIST_ERROR, payload: result.message})
        };
    };
};

export const addPlayer = (formInfo) =>{
    return async(dispatch) =>{
        dispatch({type: ACTION_PLAYER_ADD});

        const addPlayerRequest = await fetch('http://localhost:4000/team/addplayer', {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            credentials: "include",
            body: JSON.stringify(formInfo),
        });
        const result = await addPlayerRequest.json();

        if(addPlayerRequest.ok){
            dispatch({type: ACTION_PLAYER_ADD_OK, payload: result})
        }else{
            dispatch({type: ACTION_PLAYER_ADD_ERROR, payload: result.message})
        };
    };
};

export const findAllCoachs = () =>{
    return async(dispatch) =>{
        dispatch({type: ACTION_COACHS_LIST});

        const findRequest = await fetch('http://localhost:4000/team/allcoachs', {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            credentials: "include",
        });
        const result = await findRequest.json();

        if(findRequest.ok){
            dispatch({type: ACTION_COACHS_LIST_OK, payload: result})
        }else{
            dispatch({type: ACTION_COACHS_LIST_ERROR, payload: result.message})
        };
    };
};

export const addCoach = (formInfo) =>{
    return async(dispatch) =>{
        dispatch({type: ACTION_COACH_ADD});

        const addCoachRequest = await fetch('http://localhost:4000/team/addcoach',{
            method: 'PUT',
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            credentials: "include",
            body: JSON.stringify(formInfo)
        });
        const result = await addCoachRequest.json();

        if(addCoachRequest.ok){
            dispatch({type: ACTION_COACH_ADD, payload: result})
        }else{
            dispatch({type: ACTION_COACH_ADD_ERROR, payload: result.message})
        };
    };
};

export const getTemplate = (teamId) =>{
    return async(dispatch) =>{
        dispatch({type: ACTION_TEMPLATE_LIST});

        const findRequest = await fetch(`http://localhost:4000/team/teamtemplate/${teamId}`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            credentials: "include",
        });
        const result = await findRequest.json();

        if(findRequest.ok){
            dispatch({type: ACTION_TEMPLATE_LIST_OK, payload: result})
        }else{
            dispatch({type: ACTION_TEMPLATE_LIST_ERROR, payload: result.message})
        };
    };
};

export const filteringPlayers = value =>{
    return async(dispatch) =>{
        dispatch({type: ACTION_FILTERING_PLAYERS});

        const filterRequest = await fetch(`http://localhost:4000/team/filteringplayer/${value}`,{
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            credentials: "include",
        });
        const result = await filterRequest.json();

        if(filterRequest.ok){
            dispatch({type: ACTION_FILTERING_PLAYERS_OK, payload: result})
        }else{
            dispatch({type: ACTION_FILTERING_PLAYERS_ERROR, payload: result.message})
        };
    };
};

export const unsubscribe = info => {
    return async(dispatch) =>{
        dispatch({type: ACTION_UNSUBSCRIBE_PLAYER_COACH});

        const unsubscribeRequest = await fetch('http://localhost:4000/team/unsubscribe', {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            credentials: "include",
            body: JSON.stringify(info)
        });
        const result = await unsubscribeRequest.json();

        if(unsubscribeRequest.ok){
            dispatch({type: ACTION_UNSUBSCRIBE_PLAYER_COACH_OK, payload: result})
        }else{
            dispatch({type: ACTION_UNSUBSCRIBE_PLAYER_COACH_ERROR, payload: result.message})
        };
    };
};

export const updateBudget = (teamId, newBudget) =>{
    const info = {
        teamId : teamId,
        newBudget: newBudget
    };

    return async(dispatch) =>{
        dispatch({type: ACTION_UPDATEBUDGET});

        const updateBudgetRequest = await fetch('http://localhost:4000/team/updatebudget', {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            credentials: "include",
            body: JSON.stringify(info)
        });
        const result = await updateBudgetRequest.json();

        if(updateBudgetRequest.ok){
            dispatch({type: ACTION_UPDATEBUDGET_OK, payload: result})
        }else{
            dispatch({type: ACTION_UPDATEBUDGET_ERROR, payload: result.message})
        }
    };
};

