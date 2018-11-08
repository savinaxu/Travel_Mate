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
        //weatherAPI
        var weatherAPI = '9155792ab652e78bd52c926cce6a999c';


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
        function renderLandmarks(landmarkImgUrl, landmarkName, type, address, landmarkDescription) {
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
            var individualContentComments = $("<span class='comments'>")
            var individualContentBr1 = $("<br>")
            var individualContentBr2 = $("<br>")
    
            //dividing div
            var dividing = $("<div class='individual-content-dividing-line'>")
    
            //insert data
            landmarkImg.attr("src", landmarkImgUrl)
            individualContentHeader.text(landmarkName)
            individualContentType.text("Type: " + type)
            individualContentAddress.text("Address: " + address)
            individualContentComments.text("Description :" + landmarkDescription)
    
            //append to html page
            individualContentDescription.append(individualContentType, individualContentBr1,individualContentAddress, individualContentBr2, individualContentComments)
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
                var landDiv = renderLandmarks(landmarkArr[i].image, landmarkArr[i].name, landmarkArr[i].type, landmarkArr[i].address, landmarkArr[i].description)
                $(".landmarks-content-container").append(landDiv)
            }
        }
    //------------------------------------
    // ***render result page weather*** //
    //------------------------------------
        function randerImg(photoUrl, holder) {
            var newPic = $("<img>")
            newPic.attr("src",photoUrl);
            holder.append(newPic);
        }
    //------------------------------------
    // ***render result page weather*** //
    //------------------------------------
        //create dynamic div for weather
        function randerWeather(weatherImgUrl, weatherDate, weatherData){
            //wrap div
            var weatherDiv = $("<div class='weather-individual-content-container'>")

            //content div
            var weatherTextContainer = $("<div class='weather-individual-text-container'>")
            var weatherIndividualText = $("<div class='individual-text'>")
            var individualTextDate = $("<p class='individual-text-date'>")
            var individualTextData = $("<h1 class='individual-text-data'>")
            var weatherImg = $("<img class='weather-content-img'>")

            //dividing div
            var dividing = $("<div class='individual-content-dividing-line'>")

            //insert data
            weatherImg.attr("src", weatherImgUrl)
            individualTextDate.text(weatherDate)
            individualTextData.text(weatherData)
    
            //append to html page
            weatherIndividualText.append(individualTextDate, individualTextData)
            weatherTextContainer.append(weatherIndividualText, weatherImg)
            weatherDiv.append(weatherTextContainer, dividing)
    
            //show on the page
            $(".weather-content-container").append(weatherDiv)
        }


//==========================================================================
//iterate variables function
//==========================================================================
    //--------------------------
    // ***push travel data*** //
    //--------------------------
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
                ajaxTravel3(landmarkArr[i].id, id, secret, landmarkArr[i])
            }
        }
    

//==========================================================================
//ajax apis
//==========================================================================
    //---------------------
    // ***travel api*** //
    //---------------------
        function ajaxTravel1(location, id, secret, time) {
            var queryURL = "https://api.foursquare.com/v2/venues/explore?near=" + location + "&query=photos&limit=6&client_id=" + id + "&client_secret=" + secret + "&v=" + time;
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
    //---------------------------
    // ***travel third api*** //
    //---------------------------
        function ajaxTravel3 (locationId, id, secret, comment) {
            var quearyURL = "https://api.foursquare.com/v2/venues/" + locationId + "?&client_id=" + id + "&client_secret=" + secret + "&v=20181031";
                $.ajax({
                    url: quearyURL,
                    method: "GET"
                }).then(function(response) {
                    var description = response.response.venue.listed.groups[0].items[0].description;
                    comment.description = description
                    showLandmarks()
                })
        }
    //------------------
    // ***img api*** //
    //------------------
    function ajaxImg(id, place) {
        var queryURL = "https://pixabay.com/api/?key="+ id + "&q=" + place + "&per_page=7";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
               var bgImgUrl = response.hits[0].largeImageURL
               renderResultHeader(bgImgUrl)
               var photoColumn1 = $(".photoColumn1")
               var photoColumn2 = $(".photoColumn2")
               photoColumn1.empty()
               photoColumn2.empty()
            for (var i = 1; i <= 7 ; i++){
                var photo = response.hits[i].largeImageURL
                if (i % 2 !== 0) {
                    randerImg(photo, photoColumn1)
                } else {
                    randerImg(photo, photoColumn2)
                }
                
            }
        })
    }
    //---------------------
    // ***weather api*** //
    //---------------------
        function ajaxWeather(location, api) {
            var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + location + "&cnt=17&units=imperial&appid=" + api;

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                var weatherList = response.list
                $(".weather-content-container").empty()
                for (var i = 0; i < weatherList.length; i +=8) {
                    var time = weatherList[i].dt_txt
                    var date = time.substring(0, 10)
                    var temp = Math.floor(weatherList[i].main.temp)
                    var prefix = "http://openweathermap.org/img/w/"
                    var icon = weatherList[i].weather[0].icon
                    var suffix = ".png"
                    var iconUrl = prefix + icon + suffix

                    randerWeather(iconUrl, date, temp)
                }
            })
        }


//==========================================================================
// onlick function
//==========================================================================
    //------------------------
    // ***search button*** //
    //------------------------
        $(".search-btn").on("click", function() {
            event.preventDefault()
            $("#home").hide()
            $("#result").show()
            event.preventDefault()
            userInput = $("#location").val().trim().toUpperCase()
            ajaxImg(imgAPI, userInput)
            renderUserInputLocation(userInput)
            ajaxTravel1(userInput, travelClientId, travelClientSecret, travelDate)
            ajaxWeather(userInput, weatherAPI)
        })
    //--------------------------
    // ***back button*** //
    //--------------------------
        $(".back").on("click", function() {
            landmarkArr = [];
            $("#location").val("")
            $("#result").hide()
            $("#home").show()
        })
    //==========================================================================
    })