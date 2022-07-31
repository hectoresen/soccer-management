import React from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { connect } from 'react-redux';
import { useState } from 'react';
import { TeamTemplate, UpdateBudget, PlayersList } from '../../components';
import './Home.scss';

const Home = ({dispatch, team, player, coach}) => {

  const [activeIndex, setActiveIndex] = useState(0);

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
                <TabMenu model={clubItems} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
        </header>
      }
      <div className='home__content'>
        {activeIndex === 0 &&
          <div className='home__content__intro'>
            <p>Has iniciado sesión como <span>{team.name || player.name || coach.name}</span>, solo los equipos pueden gestionar salarios, presupuestos y plantillas</p>
          </div>
        }
        {activeIndex === 1 &&
          <div className='home__content__players'>
            <PlayersList />
          </div>
        }
        {activeIndex === 2 &&
          <div className='home__content__coachs'>
            <TeamTemplate />
          </div>
        }
        {activeIndex === 3 &&
          <div className='home__content__budget'>
            <UpdateBudget />
          </div>
        }
      </div>

    </section>
  )
};

const mapStateProps = (state) =>({
  team: state.auth.team,
  player: state.auth.player,
  coach: state.auth.coach
})

export default connect(mapStateProps)(Home);