// Array to store markers
var markers = [];
//console.log(markers.length);
var infowindow;
var map;

function mapError(){
 console.log('error error !');
}

function initMap() {
 // Create a map object and specify the DOM element for display.
 map = new google.maps.Map(document.getElementById('map'), {
   center: places[0].location,
   scrollwheel: false,
   zoom: 5
 });

 infowindow = new google.maps.InfoWindow();
 var bounds = new google.maps.LatLngBounds();

 places.forEach(function(place){
  var marker = new google.maps.Marker({
    position: place.location,
    map: map,
    icon: `http://maps.google.com/mapfiles/ms/micons/${place.icon}.png`,
    title: place.name,
    animation: google.maps.Animation.DROP
  });

  marker.addListener('click', function(){
   bounceMarker(this);
   showMoreInfo(this);
   changeIcon(this);
  });

  marker.addListener('mouseover', function(){
   showLessInfo(this);
  });

  markers.push(marker);

  bounds.extend(marker.position);
 });

 map.fitBounds(bounds);
 //console.log(markers.length);
}

function bounceMarker(marker) {
 // Set the BOUNCE animation on the marker
 marker.setAnimation(google.maps.Animation.BOUNCE);
 // Remove the BOUNCE animation on the marker after one cycle
 setTimeout(function(){ marker.setAnimation(null); }, 750);
}

function changeIcon(marker){
 // Change the icon to red-dot
 marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
}

// Fills the info window
function showMoreInfo(marker){
 if(infowindow.maker != marker){
  infowindow.marker = marker;
  getContent(marker, infowindow);
  infowindow.open(map, marker);
  infowindow.addListener('closeclick', function() {
   infowindow.marker = null;
  });
 }
}

function showLessInfo(marker){
 if(infowindow.maker != marker){
  infowindow.marker = marker;
  infowindow.setContent(`${marker.title}`);
  infowindow.open(map, marker);
  infowindow.addListener('closeclick', function() {
   infowindow.marker = null;
  });
 }
}

function getContent(marker, infowindow){

 var wikiAPI = `http://en.wikipedia.org/w/api.php?action=opensearch&search=${marker.title}&format=json&callback=wikiCallback`;
 console.log(wikiAPI);
 var wikiData = null;

 $.ajax({
     url: wikiAPI,
     dataType: "jsonp",
     success: function (data, textStatus, jqXHR) {
      console.log(data);
      for(let i = 0; i < data[1].length; i++){
       if(wikiData === null){
        wikiData = `<a href="${data[3][i]}"  target="_blank">${data[1][i]}</a>
                   <p>${data[2][i]}</p>`;
       }else{
        wikiData += `<a href="${data[3][i]}"  target="_blank">${data[1][i]}</a>
                    <p>${data[2][i]}</p>`;
       }
      }
      setContent(marker, wikiData, infowindow);
      },
     error: function (errorMessage) {
      console.log("Unable to get data from wikipedia...")
     }
 });
}

function setContent(marker, wikiData, infowindow){
 if(wikiData !== null){
  infowindow.setContent(`<h2>${marker.title}</h2>
                         <h4>Wikipedia Articles</h4>
                         ${wikiData}
                         <img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=150x100&location=${marker.title}&fov=90&heading=235&pitch=10">`
                        );
 }else{
  infowindow.setContent(`<h2>${marker.title}</h2>
                         <img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=150x100&location=${marker.title}&fov=90&heading=235&pitch=10">`
                        );
 }
}
