var ViewModel = function() {

    var that = this;

    this.listOfMarkers = ko.observableArray([]);

    markers.forEach(function(marker){
     that.listOfMarkers.push(marker);
    });

    // https://stackoverflow.com/questions/20857594/knockout-filtering-on-observable-array
    this.placeToBeSearched = ko.observable('');

    // this function filters the list based on the search query...
    this.filteredPlaces = ko.computed( function() {
   		var filter = that.placeToBeSearched().toLowerCase();
   		if (!filter) {
      console.log("no filter");
      that.listOfMarkers().forEach(function(marker){
       marker.setVisible(true);
      });
   			return that.listOfMarkers();
   		} else {
      console.log(filter);
   			return ko.utils.arrayFilter(that.listOfMarkers(), function(marker) {
   				var string = marker.title.toLowerCase();
   				var result = (string.search(filter) >= 0);
       if(result === false){
        marker.setVisible(false);
       }else{
        marker.setVisible(true);
       }
   				return result;
   			});
   		}
   	}, that);

    // links the click on listView with the map...
    this.showItem = function(clickedItem){
     bounceMarker(clickedItem);
     showMoreInfo(clickedItem);
    }
}

ko.applyBindings(new ViewModel());
