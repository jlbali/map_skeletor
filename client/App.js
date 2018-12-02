import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Mapa from './Mapa';


class App extends Component {
  

  
  render() {
    return (
      <div className="main­content">
        Compositor de Mapas
        <Mapa />
      </div>
    );
  }
}


ReactDOM.render(
    <App />
,
  document.getElementById('root')    
);


