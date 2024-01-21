// src/pages/Home.jsx
import React from 'react';
import { useState } from 'react'
import NavBar from '../components/GameNavBar';
import Info from '../components/Info';
import Settings from '../components/Settings';
import LoginForm from '../components/LogInForm';
import { Phaser3GameComponent } from '../gamePhaser/PhaserGame';

// TODO -> Change so game always shows up on home (loads only once) 
// and other parts show above it with higher z-index when clicked and not when not.

const Home = () => {
  const [info, setInfo] = useState(false)
  const [settings, setSettings] = useState(false)
  const [loggedIn, setLoggedIn] = useState(true)

  return (
    loggedIn ? (
      <>
        <div className="top-0 w-full" id='nav'>
          <NavBar 
            info={info} 
            setInfo={setInfo} 
            settings={settings} 
            setSettings={setSettings} 
          />
        </div>
        <div className={`${info ? 'flex' : 'hidden'} fixed inset-0 pt-12 w-full h-full bg-black bg-opacity-50 z-20 items-center justify-center`}>
          {/* Overlay for Info, starts below NavBar */}
          <Info setInfo={setInfo}/>
        </div>
        <div className={`${settings ? 'flex' : 'hidden'} fixed inset-0 pt-12 w-full h-full bg-black bg-opacity-50 z-20 items-center justify-center`}>
          {/* Overlay for Settings, starts below NavBar */}
          <Settings setLoggedIn={setLoggedIn} setSettings={setSettings}/>
        </div>
        <div >
          <Phaser3GameComponent/>
        </div>
      </>
    ) : (
      <div className="flex items-center justify-center h-screen">
        <LoginForm setLoggedIn={setLoggedIn} />
      </div>
    )
  );
};


export default Home;
