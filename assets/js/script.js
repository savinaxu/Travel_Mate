$(function() {

//==========================================================================
//global variable
//==========================================================================
    var userInput
    //travelAPI
    var travelDate = "20181031";
    var travelClientId = "2H4GZJKNKX1JDBOYJSXSYC34FACBAEYH2B3F1CWFP1WMYOUQ";
    var travelClientSecret = "3W01MIAU01QTD0L4W3QE3NI4PQYZB1WNHMGQZ4UYGQVWYTJI";
    //travel Data
    var landmarkArr = [];
    //imgAPI
    var imgAPI = '10550959-d75d5c93391ba85fb4ccf5e31';
//==========================================================================
//render functions
//==========================================================================
//-----------------------------------
// ***render result page header*** //
//-----------------------------------
    //show the image on result header once get the api image url
    function renderResultHeader(locationImageUrl) {
        $(".result-header-bg-img").css("background-image", "url(" + locationImageUrl + ")")
    }
    //insert the user input location
    function renderUserInputLocation(location) {
        $(".user-input-location").text(location)
    }
//--------------------------------------
// ***render result page landmarks*** //
//--------------------------------------
    //create dynamic div for landmakrs
    function renderLandmarks(landmarkImgUrl, landmarkName, type, address, crossStreet) {
        //wrap div
        var landmarkDiv = $("<div class='landmarks-individual-content-container'>")

        //content div
        var landmarkContentContainer = $("<div class='individual-content-container'>")
        var landmarkImg = $("<img class='individual-content-img'>")
        var individualContentContainer = $("<div class='individual-content'>")
        var individualContentHeader = $("<h1 class='individual-content-header'>")
        var individualContentDescription = $("<p class='individual-content-description'>")
        var individualContentType = $("<span class='type'>")
        var individualContentAddress = $("<span class='address'>")
        var individualContentBr = $("<br>")

        //dividing div
        var dividing = $("<div class='individual-content-dividing-line'>")

        //insert data
        landmarkImg.attr("src", landmarkImgUrl)
        individualContentHeader.text(landmarkName)
        individualContentType.text("Type: " + type)
        individualContentAddress.text("Address: " + address)

        //append to html page
        individualContentDescription.append(individualContentType, individualContentBr,individualContentAddress)
        individualContentContainer.append(individualContentHeader, individualContentDescription)
        landmarkContentContainer.append(landmarkImg, individualContentContainer)
        landmarkDiv.append(landmarkContentContainer, dividing)

        //return landmarkDiv
        return landmarkDiv
    }

    //show landmark result
    function showLandmarks() {
        $(".landmarks-content-container").empty()
        for (var i = 0; i < landmarkArr.length; i++) {
            var landDiv = renderLandmarks(landmarkArr[i].image, landmarkArr[i].name, landmarkArr[i].type, landmarkArr[i].address, landmarkArr[i].crossStreet)
            $(".landmarks-content-container").append(landDiv)
        }
    }
//----------------------------------------
// ***render result page photographs*** //
//----------------------------------------



//==========================================================================
//iterate variables function
//==========================================================================
//---------------------
// ***push travel data*** //
//---------------------
    function pushLandmarksContent(arr) {
        for (var i = 0; i < arr.length; i++) {
            var landmarkIId = arr[i].venue.id
            var landmarkIName = arr[i].venue.name
            var landmarkIAddress = arr[i].venue.location.address
            var landmarkIType = arr[i].venue.categories[0].name
            
            var landmark = {
                id: landmarkIId,
                name: landmarkIName,
                type: landmarkIType,
                address: landmarkIAddress,
            }

            landmarkArr.push(landmark)
        }
    }

    function pushLandmarksImg(landmarkArr, id, secret) {
        for (var i = 0; i < landmarkArr.length; i++) {
            ajaxTravel2(landmarkArr[i].id, id, secret, landmarkArr[i])
        }
    }


//==========================================================================
//ajax apis
//==========================================================================
//---------------------
// ***travel api*** //
//---------------------
    function ajaxTravel1(location, id, secret, time) {
        var queryURL = "https://api.foursquare.com/v2/venues/explore?near=" + location + "&query=photos&limit=5&client_id=" + id + "&client_secret=" + secret + "&v=" + time;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var shortenObj1 = response.response.groups[0].items;
            pushLandmarksContent(shortenObj1)
            pushLandmarksImg(landmarkArr, travelClientId, travelClientSecret)
        })
    }
//---------------------------
// ***travel second api*** //
//---------------------------
    function ajaxTravel2(locationId, id, secret, landmark) {
        var queryURL = "https://api.foursquare.com/v2/venues/" + locationId + "/photos?&limit=1&client_id=" + id + "&client_secret=" + secret + "&v=20181031";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var prefix = response.response.photos.items[0].prefix
            var suffix = response.response.photos.items[0].suffix
            var imgURL = prefix + "original" + suffix

            landmark.image = imgURL
            showLandmarks()
        })
    }
//------------------
// ***img api*** //
//------------------
    // function ajaxImg(api, place) {
    //     var queryURL = "https://pixabay.com/api/?key="+ api +"&q="+ place + "&limit=5";
    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //     }).then(function(response) {
            
    //     })
    // }
    





//==========================================================================
// onlick function
//==========================================================================
//--------------------------
// ***search button*** //
//--------------------------
    $(".search-btn").on("click", function() {
        event.preventDefault()
        $("#home").hide()
        $("#result").show()
        event.preventDefault()
        userInput = $("#location").val()
        renderUserInputLocation(userInput)
        ajaxTravel1(userInput, travelClientId, travelClientSecret, travelDate)
    })
//--------------------------
// ***back button*** //
//--------------------------
    $(".back").on("click", function() {
        $("#location").val("")
        $("#result").hide()
        $("#home").show()
    })
//==========================================================================



})