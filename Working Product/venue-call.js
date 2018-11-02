// Variables

var search = "";

var placeIDs = [];
var placeNames = [];


$(document).on("click", "#search-click", function() {
    search = $("#search-input").val();

    if (search.length > 0) {
        // Date notaion: YYYYMMDD
        date = "20181031";
        clientId = "2H4GZJKNKX1JDBOYJSXSYC34FACBAEYH2B3F1CWFP1WMYOUQ";
        clientSecret = "3W01MIAU01QTD0L4W3QE3NI4PQYZB1WNHMGQZ4UYGQVWYTJI";

        quearyURL = "https://api.foursquare.com/v2/venues/explore?near=" + search + "&query=photos&limit=5&client_id=" + clientId + "&client_secret=" + clientSecret + "&v=" + date;
        $.ajax({
            url: quearyURL,
            method: "GET"
        })
        .then(function(response) {
            // console.log(response);
            var shorten = response.response.groups[0].items;
            console.log(shorten);
            
            for (i = 0; i < shorten.length; i++) {
                // console.log(shorten[i].venue.name);
                // console.log(shorten[i].venue.id);

                placeIDs.push(shorten[i].venue.id);

                placeNames.push([shorten[i].venue.name]);
            }
            console.log(placeNames);
            console.log(placeIDs);

        })

    }
    else {
        alert("Don't be lazy, type a location!")
    }
})
