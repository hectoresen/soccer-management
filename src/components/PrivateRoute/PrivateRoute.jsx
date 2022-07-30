import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({team, player, coach, component}) => {
    const navigate = useNavigate();

    if(!component) throw new Error('Component not found');

    if(team || player || coach){
        return component;
    }
/*     if(!team || !player || !coach){
        navigate('/unauthorized');
    } */
}

const mapStateProps = state => ({
    team: state.auth.team,
    player: state.auth.player,
    coach: state.auth.coach
});

export default connect(mapStateProps)(PrivateRoute);