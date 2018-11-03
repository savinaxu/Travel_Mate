$(function() {

    var userInput

    //travelAPI
    var travelDate = "20181031";
    var travelClientId = "2H4GZJKNKX1JDBOYJSXSYC34FACBAEYH2B3F1CWFP1WMYOUQ";
    var travelClientSecret = "3W01MIAU01QTD0L4W3QE3NI4PQYZB1WNHMGQZ4UYGQVWYTJI";
    //travel Data
    var locationIds;
    

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

    function renderLandmarks() {

    }





})