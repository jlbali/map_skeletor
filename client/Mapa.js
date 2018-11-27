import React, { Component } from 'react';



class Mapa extends Component {
  
      
  render() {
    return (
      <div className="main­content">
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
    
    // Capa Google Satellite.
    var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3']
    });

    
    // Agregándolo al mapa.
    //mapboxLayer.addTo(myMap);
    googleSat.addTo(myMap);
    console.log("prueba");

  }

}

  
  
  export default Mapa;
  