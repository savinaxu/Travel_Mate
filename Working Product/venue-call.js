$(function() {

// Variables

var search;

var placeIDs = [];
var placeNames = [];
var placeDescriptions = [];

// Ajax Call Info

// Date notaion: YYYYMMDD
var date = "20181103";
var clientId = "2H4GZJKNKX1JDBOYJSXSYC34FACBAEYH2B3F1CWFP1WMYOUQ";
var clientSecret = "3W01MIAU01QTD0L4W3QE3NI4PQYZB1WNHMGQZ4UYGQVWYTJI";


    $(document).on("click", "#search-click", function() {
        event.preventDefault();
        placeIDs = [];
        placeNames = [];
        placeDescriptions = [];
        $("#city").val("");
        search = $("#search-input").val();

        if (search.length > 0) {

            quearyURL = "https://api.foursquare.com/v2/venues/explore?near=" + search + "&query=photos&limit=5&client_id=" + clientId + "&client_secret=" + clientSecret + "&v=" + date;
            $.ajax({
                url: quearyURL,
                method: "GET"
            })
            .then(function(response) {
                // console.log(response);
                var shorten1 = response.response.groups[0].items;
                // console.log(shorten1);
                // console.log(shorten1[0].venue.location.city);
                $("#city").text(shorten1[0].venue.location.city);
                
                for (i = 0; i < shorten1.length; i++) {
                    placeIDs.push(shorten1[i].venue.id);
                    placeNames.push(shorten1[i].venue.name);
                }
                
            // for (i = 0; i < placeIDs.length; i++) {
                // var quearyURL2 = "https://api.foursquare.com/v2/venues/" + placeIDs[0] + "?&client_id=" + clientId + "&client_secret=" + clientSecret + "&v=" + date;

                // $.ajax({
                //     url: quearyURL2,
                //     method: "GET"
                // })
                // .then(function(response) {
                //     // console.log(response);

                //     // Note that shorten2 only collects data from first description available per location
                //     var shorten2 = response.response.venue.listed.groups[0].items[0].description;
                //     // console.log(shorten2);
                //     placeDescriptions.push(shorten2);
                // })
                // // }
                // console.log(placeNames);
                // console.log(placeIDs);
                // console.log(placeDescriptions);

                // Picture Search
                for (i = 0; i < placeNames.length; i++) {
                    var search = placeNames[i];
                    var API_KEY = '10550959-d75d5c93391ba85fb4ccf5e31';
                    var queryURL = "https://pixabay.com/api/?key="+API_KEY+"&q="+ search + "&per_page=3";


                        console.log(placeNames);
                        event.preventDefault();
                        $("#display-image").empty();
                        search = $("#search-input").val();

                        $.ajax({
                        url: queryURL,
                        method: "GET"
                    .then(function(response) {
                        console.log(response);
                        var imageURL = response.hits[0].largeImageURL
                        console.log(imageURL);
                        

                        $("#display-location").text(search);
                        var newPic = $("<img>");
                        newPic.attr("src", imageURL);
                        $("#display-image").append(newPic);
                    })
                    })

                }

                display();
            })
            
            
            //Display Function
                function display(){
                    $("#search-input").val("");
                    $("#display").empty();
                    for (i = 0; i < placeNames.length; i++) {
                            // console.log(placeDescriptions);
                            // console.log(placeDescriptions[i]);
                            var addDisplay = $("#display");
                            addDisplay.append("<li id='place" + [i] + "'>" + placeNames[i] + "</li>");
                            // addDisplay.append("<li id='description" + [i] + "'>Description: " + placeDescriptions[0] + "</li>");
                            addDisplay.append("<br>");
                    }
            }
        }
        else {
            alert("Don't be lazy, type a location!")
        }
    })
})