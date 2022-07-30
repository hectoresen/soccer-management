import React from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { connect } from 'react-redux';
import { useState } from 'react';
import { Button } from 'primereact/button';
import './Home.scss';
import PlayersList from '../../components/PlayersList/PlayersList';

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
            <p>Entrada</p>
          </div>
        }
        {activeIndex === 1 &&
          <div className='home__content__players'>
            <PlayersList />
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