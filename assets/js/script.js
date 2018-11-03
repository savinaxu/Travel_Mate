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
        $(".individual-content-description")

        //append to html page
        $(".individual-content").append(individualContentHeader, individualContentDescription)
        $(".individual-content-container").append(landmarkImg, individualContentContainer)
        $(".landmarks-content-container").append(landmarkContentContainer, dividing)
    }

//==========================================================================





})