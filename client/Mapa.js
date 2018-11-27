import React, { Component } from 'react';



class Mapa extends Component {
  
      
  render() {
    return (
      <div className="main­content">
          Aca habria un mapa!!
          <div id="mapa"></div>
      </div>
    );
  }

  componentDidMount() {
    // Especificando mapa y su centro. 
    var myMap = L.map('mapa').setView([51.505, -0.09], 13);

    // Capa Mapbox.
    var mapboxLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'your.mapbox.access.token'
    });
    // Agregándolo al mapa.
    //mapboxLayer.addTo(myMap);


  }

}

  
  
  export default Mapa;
  