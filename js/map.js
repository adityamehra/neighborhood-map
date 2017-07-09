// Array to store markers
var markers = [];
var infowindow;
var map;

var wikiContent = null;
var flickrContent = null;

function mapError(){
    console.log('Unable to load map!');
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
       visible: true,
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

// Fills the info window with more info...
function showMoreInfo(marker){
    if(infowindow.maker != marker){
     infowindow.marker = marker;
     infowindow.setContent('');
     // gets the content...
     getContent(marker, infowindow);
     infowindow.open(map, marker);
     infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
     });
    }
}

// Fills the info window with title(name) of the marker/palce
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

// Gets the content from wikiAPI and flickrAPI
function getContent(marker, infowindow){

    var wikiData = null;
    var flickrPhotos = null;

    //reset wikiContent and flickrContent
    wikiContent = null;
    flickrContent = null;


    var wikiAPI = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${marker.title}&format=json&callback=wikiCallback`;
    var flickrAPI = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=f300ce3ad381fbe11e3b8c498851ae9b&accuracy=11&lat=${marker.getPosition().lat().toFixed(4)}&lon=${marker.getPosition().lng().toFixed(4)}&format=json&nojsoncallback=1`;

    $.ajax({
        url: wikiAPI,
        dataType: "jsonp",
        success: function (data, textStatus, jqXHR) {
         for(let i = 0; i < data[1].length; i++){
          if(wikiData === null){
           wikiData = `<a href="${data[3][i]}"  target="_blank">${data[1][i]}</a>
                      <p>${data[2][i]}</p>`;
          }else{
           wikiData += `<a href="${data[3][i]}"  target="_blank">${data[1][i]}</a>
                       <p>${data[2][i]}</p>`;
          }
         }
         addWikiData(wikiData);
         },
        error: function (errorMessage) {
         wikiData = "<p>Unable to get data from wikipedia...</p>";
         addWikiData(wikiData);
        }
    });

    $.getJSON( flickrAPI, {
         format: "json"
       }).done(function(data){
           if(data.stat == 'ok'){
            for(var i = 0; i < 10; i++){
             if(flickrPhotos === null){
              flickrPhotos = `<h3>${i+1}</h3>
                              <img src="https://farm${data.photos.photo[i].farm}.staticflickr.com/${data.photos.photo[i].server}/${data.photos.photo[i].id}_${data.photos.photo[i].secret}.jpg" />`;
             }else{
              flickrPhotos += `<h3>${i+1}</h3>
                               <img src="https://farm${data.photos.photo[i].farm}.staticflickr.com/${data.photos.photo[i].server}/${data.photos.photo[i].id}_${data.photos.photo[i].secret}.jpg" />`;
             }
            }
           }else{
            flickrPhotos = "<p>Unalbe to load Flickr photos...</p>";
           }
           addFlickrData(marker, flickrPhotos);
       }).fail(function(err){
        flickrPhotos = "<p>Unalbe to load Flickr photos...</p>";
        addFlickrData(marker, flickrPhotos);
       });
}

// helper method to handle the async nature..
function addWikiData(wikiData){
    if(wikiContent === null){
     wikiContent = wikiData;
    }
}

// helper method to handle the async nature...
function addFlickrData(marker, flickrData){
    if(flickrContent === null){
     flickrContent = flickrData;
    }
    setContent(marker, infowindow);
}

// checks for various combinations to set the data...
function setContent(marker, mainContent){
    if(wikiContent !== null && flickrContent !== null){
     console.log("1");
     infowindow.setContent(`<h2>${marker.title}</h2>
                            <h4>Wikipedia Articles</h4>
                            ${wikiContent}
                            <h4>Flickr Photos</h4>
                            <p> These photos are taken from Flicker</p>
                            ${flickrContent}`
                           );
    }else if(wikiContent !== null && flickrContent === null){
     console.log("2");
     infowindow.setContent(`<h2>${marker.title}</h2>
                            <img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=150x100&location=${marker.title}&fov=90&heading=235&pitch=10">
                            <h4>Wikipedia Articles</h4>
                            ${wikiContent}`
                           );
    }else if(wikiContent === null && flickrContent !== null){
     console.log("3");
     infowindow.setContent(`<h2>${marker.title}</h2>
                            <h4>Flickr Photos</h4>
                            <p> These photos are taken from Flicker</p>
                            ${flickrContent}`
                           );
    }else{
     console.log("4");
     infowindow.setContent(`<h2>${marker.title}</h2>
                            <img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=150x100&location=${marker.title}&fov=90&heading=235&pitch=10">`
                           );

    }
}
