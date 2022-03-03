import './App.css';
import React, {useState} from 'react';
import SliderBox  from './Components/SliderBox';

function App() {


  return (
    <div className="App">
      <div className='container'>
        <h1 className='title'>
          Mortage Calculator
        </h1>
        <div className='calcul-block'>
          <SliderBox />
        </div>
      </div>
    </div>
  );
}

export default App;
