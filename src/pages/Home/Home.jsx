import React from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { connect } from 'react-redux';
import './Home.scss';

const Home = ({dispatch, team, player, coach}) => {
  const clubItems = [
    {label: 'Inicio', icon: 'pi pi-fw pi-home'},
    {label: 'Buscar Jugadores', icon: 'pi pi-fw pi-search'},
    {label: 'Mi plantilla', icon: 'pi pi-fw pi-pencil'},
    {label: 'Presupuesto', icon: 'pi pi-fw pi-dollar'}
  ];


  return (
    <section className='home'>
      {team &&
        <header className='home__header'>
          <TabMenu model={clubItems} />
        </header>
      }

      Home
    </section>
  )
};

const mapStateProps = (state) =>({
  team: state.auth.team,
  player: state.auth.player,
  coach: state.auth.coach
})

export default connect(mapStateProps)(Home);