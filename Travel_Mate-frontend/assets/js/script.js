$(function() {

    var userInput

    //travelAPI
    var travelDate = "20181031";
    var travelClientId = "2H4GZJKNKX1JDBOYJSXSYC34FACBAEYH2B3F1CWFP1WMYOUQ";
    var travelClientSecret = "3W01MIAU01QTD0L4W3QE3NI4PQYZB1WNHMGQZ4UYGQVWYTJI";
    //travel Data
    var locationIds;
    var locationNames;
    var locationDescriptions;


//result page header
//==========================================================================

    //show the image on result header once get the api image url
    function renderResultHeader(locationImageUrl) {
        $(".result-header-bg-img").css("background-image", "url(" + locationImageUrl + ")")
    }
    //insert the user input location
    function renderUserInputLocation(location) {
        $(".user-input-location").text(location)
    }

//==========================================================================

//result page landmarks
//==========================================================================

    function renderLandmarks(landmarkImgUrl, landmarkName, landmarkDescription) {
        //wrap div
        var landmarkDiv = $("<div class='landmarks-individual-content-container'>")

        //content div
        var landmarkContentContainer = $("<div class='individual-content-container'>")
        var landmarkImg = $("<img class='individual-content-img'>")
        var individualContentContainer = $("<div class='individual-content'>")
        var individualContentHeader = $("<h1 class='individual-content-header'>")
        var individualContentDescription = $("<p class='individual-content-description'>")

        //dividing div
        var dividing = $("<div class='individual-content-dividing-line'>")

        //insert data
        $(".individual-content-img").attr("src", landmarkImgUrl)
        $(".individual-content-header").text(landmarkName)
        $(".individual-content-description").text(landmarkDescription)

        //append to html page
        $(".individual-content").append(individualContentHeader, individualContentDescription)
        $(".individual-content-container").append(landmarkImg, individualContentContainer)
        $(".landmarks-content-container").append(landmarkContentContainer, dividing)
    }

// 
////
//////

// Gabe

// Variables

var search;

var placeIDs = [];
var placeNames = [];
// var placeDescriptions = [];

// Ajax Call Info

// Date notaion: YYYYMMDD
var date = "20181103";
var clientId = "2H4GZJKNKX1JDBOYJSXSYC34FACBAEYH2B3F1CWFP1WMYOUQ";
var clientSecret = "3W01MIAU01QTD0L4W3QE3NI4PQYZB1WNHMGQZ4UYGQVWYTJI";


    $(document).on("click", ".search-btn", function() {
        event.preventDefault();
        placeIDs = [];
        placeNames = [];
        // placeDescriptions = [];
        // $("#city").val("");
        search = $("#location").val();

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
                // $("#city").text(shorten1[0].venue.location.city);
                
                for (i = 0; i < shorten1.length; i++) {
                    placeIDs.push(shorten1[i].venue.id);
                    placeNames.push(shorten1[i].venue.name);
                }
            
                //
                ////
                //////
                ////////
                // for (i = 0; i < placeIDs.length; i++) {

                //     quearyURL2 = "https://api.foursquare.com/v2/venues/" + placeIDs[i] + "?&client_id=" + clientId + "&client_secret=" + clientSecret + "&v=" + date;

                //     $.ajax({
                //         url: quearyURL2,
                //         method: "GET"
                //     })
                //     .then(function(response) {
                //         // console.log(response);

                //         // Note that shorten2 only collects data from first description available per location
                //         var shorten2 = response.response.venue.listed.groups[0].items[0].description;
                //         // console.log(shorten2);
                //         placeDescriptions.push(shorten2);
                //         // display();
                //     })
                // }
                ////////
                //////
                ////
                //


                // console.log(placeNames);
                // console.log(placeIDs);
                // console.log(placeDescriptions);

                renderLandmarks("assets/images/yiran-ding-1101233-unsplash.jpg", placeNames[0], "hfhfhghgj");

                // display();
            })
            // console.log(placeDescriptions);

            // //Displace Function
            //     function display(){
            //         $("#location").val("");
            //         $("#display").empty();
            //         for (i = 0; i < placeNames.length; i++) {
            //                 // console.log(placeDescriptions);
            //                 // console.log(placeDescriptions[i]);
            //                 var addDisplay = $("#display");
            //                 addDisplay.append("<li id='place" + [i] + "'>" + placeNames[i] + "</li>");
            //                 // addDisplay.append("<li id='description" + [i] + "'>Description: " + placeDescriptions[i] + "</li>");
            //                 addDisplay.append("<br>");
            //         }
            // }
        }
        else {
            alert("Don't be lazy, type a location!")
        }
    })

//////
////
//


//==========================================================================





})