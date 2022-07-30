export const ACTION_PLAYERS_LIST = "ACTION_PLAYERS_LIST";
export const ACTION_PLAYERS_LIST_OK = "ACTION_PLAYERS_LIST_OK";
export const ACTION_PLAYERS_LIST_ERROR = "ACTION_PLAYERS_LIST_ERROR";

export const ACTION_PLAYER_ADD = "ACTION_PLAYER_ADD";
export const ACTION_PLAYER_ADD_OK = "ACTION_PLAYER_ADD__OK";
export const ACTION_PLAYER_ADD_ERROR = "ACTION_PLAYER_ADD_ERROR";


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

export const addPlayer = (playerId, teamId) =>{
    const editInfo = {
        playerId: playerId,
        teamId: teamId,
    };

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
            body: JSON.stringify(editInfo),
        });
        const result = await addPlayerRequest.json();

        if(addPlayerRequest.ok){
            dispatch({type: ACTION_PLAYER_ADD_OK, payload: result})
        }else{
            dispatch({type: ACTION_PLAYER_ADD_ERROR, payload: result.message})
        };
    };
};
