import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';


var getProxyURL = async function(url){
  var response = await axios.get("/api/proxy", {
    params: {
      url: url,
    }
  });
  return response.data;

}


var addGeoRSS = async function(url,map){

  var xml = await getProxyURL(url);
  //console.log("XML: ", xml);
  var output = {};
  $(xml).find('item').each(function() {
    var nodes = $(this).children();
    $.each(nodes, function(i,node){
        var name = node.tagName;
        var value = node.textContent;
        output[name] = value;
    });
    // build markers from the output and add to the map
    //var marker = L.marker([output['georss:point'].split(' ')[0], output['georss:point'].split(' ')[1]]);
    console.log("Output: ", output);
    //var marker = L.marker([parseFloat(output['geo:lat']), parseFloat(output['geo:long'])]);
    var marker = L.marker([parseFloat(output['GEO:LAT']), parseFloat(output['GEO:LONG'])]);
    var popupContent = output.DESCRIPTION; 
    marker.bindPopup(popupContent)
    marker.addTo(map);
  });

}


var addGeoJSON = async function(url,map){
  var geojson = await getProxyURL(url);
  L.geoJSON(geojson).addTo(map);
}





class Mapa extends Component {
  
      
  render() {
    return (
      <div className="main­content">
          <div id="mapa"></div>
      </div>
    );
  }

  async componentDidMount() {
    // Especificando mapa y su centro. 
    var myMap = L.map('mapa').setView([51.505, -0.09], 6);

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

    // Carga de GeoRSS.
    // UK seismology
    await addGeoRSS("http://earthquakes.bgs.ac.uk/feeds/WorldSeismology.xml", myMap);
    
    // Carga de GeoJSON
    //await addGeoJSON("http://oceanview.pfeg.noaa.gov/erddap/tabledap/erdCalCOFIcufes.geoJson?longitude%2Clatitude%2Csardine_eggs&cruise=%22201504%22&sardine_eggs%3E=0&.draw=markers&.marker=5%7C5&.color=0x000000&.colorBar=%7C%7C%7C%7C%7C&.bgColor=0xffccccff", myMap);
    
    // KML

  }

}

  
  
  export default Mapa;
  