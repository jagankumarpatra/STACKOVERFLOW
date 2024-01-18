import React from 'react'
import Navbar from './components/navbar';
import RightPart from './components/RightPart';
import LeftPart from './components/LeftPart';
import MainPart from './components/MainPart';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <RightPart/>
      <LeftPart/>
      <MainPart/>
      {/* <Header/> */}
    </div>
  );
}

export default App;



