function initMap() {
        // Create a map object and specify the DOM element for display.
        var urls = [
         {
          name: 'crooked_road_sf_url',
          label: 'A',
          lat: 37.773972,
          lng: -122.431297
         },
         {
          name: 'golden_gate_sf',
          label: 'B',
          lat: 37.8199,
          lng: -122.4783
         },
         {
          name: 'napa_valley',
          label: 'C',
          lat: 38.5025,
          lng: -122.2654
         },
         {
          name: 'universal_studio_la',
          label: 'D',
          lat: 34.1381,
          lng: -118.3534
         },
         {
          name: 'disney_la',
          label: 'E',
          lat: 33.812511,
          lng: -117.918976
         }
        ]

        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: urls[0].lat, lng: urls[0].lng},
          scrollwheel: false,
          zoom: 5
        });

        markers = []

        urls.forEach(function(url){
         var marker = new google.maps.Marker({
           position: {lat: url.lat, lng: url.lng},
           map: map,
           label: url.label
         });
         markers.push(marker);
        })
      }
