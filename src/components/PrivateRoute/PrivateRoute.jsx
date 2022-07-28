import React from 'react';
import { connect } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

const PrivateRoute = ({team, player, coach, component}) => {
    const location = useLocation();
    console.log(1);

    if(!component) throw new Error('Component not found');

    if(team || player || coach){
        return component;
    };
}

const mapStateProps = state => ({
    team: state.auth.team,
    player: state.auth.player,
    coach: state.auth.coach
});

export default connect(mapStateProps)(PrivateRoute);