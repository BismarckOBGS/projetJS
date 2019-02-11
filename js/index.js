
//Initialisation de la carte


var map = L.map('map').setView([45.743317, 4.815747], 13);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
 { attribution: 'Map data &copy; <a href="http://www.osm.org">OpenStreetMap</a>' })
 
 .addTo(map);


 // Chargement des données depui JCDecaux


var url = 'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=132e27d3cf194a30390caf93dfad62b69949fe27';
var oXhr = new XMLHttpRequest();

oXhr.onload = function () {
  var data = JSON.parse(this.responseText);
  // ici les données sont exploitables

  for(var i=0;i<data.length;i++)
  {
    var staVel = data[i];
    var posX = staVel.position.lat;
    var posY = staVel.position.lng

     //Pour les details de la station

    var initDispo =  staVel.available_bike_stands;
    var dispo =  staVel.available_bikes;
    var adresse = staVel.address;

    // -------------------------------------------

    var status = staVel.status;

    var marker = L.marker([posX, posY]).addTo(map);
    
    marker.bindPopup(staVel.status);


    marker.on('mouseover', function(e){ marker.openPopup(); });
    marker.on('mouseout', function(e){ marker.closePopup(); });
    marker.on('click', function(e){
      document.querySelector('#info_station').innerHTML = '<div> Adresse : ' + 
      staVel.address + '</div>'
    })

  }

};
oXhr.onerror = function (data) {
  console.log('Erreur ...');
};
oXhr.open('GET', url, true);
oXhr.send(null);




//pour le slider

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var jumbotrons = document.getElementsByClassName("jumbotron");
  for (i = 0; i < jumbotrons.length; i++) {
    jumbotrons[i].style.display = "none"; 
  }
  slideIndex++;
  if (slideIndex > jumbotrons.length) {slideIndex = 1} 
  jumbotrons[slideIndex-1].style.display = "block"; 
  setTimeout(showSlides, 1000); // Change image every 2 seconds
}







