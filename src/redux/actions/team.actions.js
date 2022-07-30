export const ACTION_PLAYERS_LIST = "ACTION_PLAYERS_LIST";
export const ACTION_PLAYERS_LIST_OK = "ACTION_PLAYERS_LIST_OK";
export const ACTION_PLAYERS_LIST_ERROR = "ACTION_PLAYERS_LIST_ERROR";


export const findAllPlayers = () =>{
    return async(dispatch) =>{
        dispatch({type: ACTION_PLAYERS_LIST});

        const findRequest = await fetch('http://localhost:4000/team/allplayers',{
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