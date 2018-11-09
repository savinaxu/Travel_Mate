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
            var a = 0;
            var b = 6
            //weatherAPI
            var weatherAPI = '9155792ab652e78bd52c926cce6a999c';
            var cClick = 0;
            var fClick = 1;
    
    
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
                if (landmarkDescription.length > 0) {
                    individualContentComments.text("Comment: " + landmarkDescription)
                } else {
                    individualContentComments.text("Comment: A very cool place!")
                }
        
                //append to html page
                individualContentDescription.append(individualContentType, individualContentBr1,individualContentAddress, individualContentBr2, individualContentComments)
                individualContentContainer.append(individualContentHeader, individualContentDescription)
                landmarkContentContainer.append(landmarkImg, individualContentContainer)
                landmarkDiv.append(landmarkContentContainer, dividing)
        
                //return landmarkDiv
                return landmarkDiv
            }
        
            // show landmark result
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
        function ajaxImg(id, place, a, b) {
            var queryURL = "https://pixabay.com/api/?key="+ id + "&q=" + place + "&per_page=25";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                   var bgImgUrl = response.hits[0].largeImageURL
                   renderResultHeader(bgImgUrl)
                   var photoColumn1 = $(".photoColumn1")
                   var photoColumn2 = $(".photoColumn2")
                   if (a >= 24) {
                       $(".show-more").text("--- No more photos ---")
                   } else {
                    for (var i = 1+a ; i <= b ; i++){
                        var photo = response.hits[i].largeImageURL
                        if (i % 2 !== 0) {
                            randerImg(photo, photoColumn1)
                        } else {
                            randerImg(photo, photoColumn2)
                        }
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
    //validation check function
    //==========================================================================
        //--------------------------
        // ***user input check*** //
        //--------------------------
        function checkUserInput(userText, imgAPI, a, b) {
            var re = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/
    
            if (!re.test(userText)) {
                alert("Please enter a validated city!")
            } else {
                $("#home").hide()
                $("#result").show()
                ajaxImg(imgAPI, userText, a, b)
                renderUserInputLocation(userText)
                ajaxTravel1(userInput, travelClientId, travelClientSecret, travelDate)
                ajaxWeather(userInput, weatherAPI)
                $(".show-more").text("--- Show More ---")
            }
        }
    
        //------------------------
        // ***change unites*** //
        //------------------------
        // fahrenheit to celsius
        function fToC(degree) {
            var low = Math.floor(( degree - 32 ) / 1.8)
            var high = Math.ceil(( degree - 32 ) / 1.8)
            var dmf = degree - low
            var cmd = high - degree
    
            if (dmf <= cmd) {
                return low;
            } else {
                return high;
            }
            
        }
        // celsius to fahrenheit
        function cToF(degree) {
            var low = Math.floor(( degree * 1.8 )+ 32)
            var high = Math.ceil(( degree * 1.8 )+ 32)
            var dmf = degree - low
            var cmd = high - degree
    
            if (dmf <= cmd) {
                return low;
            } else {
                return high;
            }
        }
    //==========================================================================
    // onlick function
    //==========================================================================
        //------------------------
        // ***search button*** //
        //------------------------
            $(".search-btn").on("click", function() {
                event.preventDefault()
                userInput = $("#location").val().trim().toUpperCase()
                checkUserInput(userInput, imgAPI, a, b)
            })
        //----------------------
        // ***back button*** //
        //----------------------
            $(".back").on("click", function() {
                $(".photoColumn1").empty()
                $(".photoColumn2").empty()
                landmarkArr = [];
                $("#location").val("")
                $("#result").hide()
                $("#home").show()
                a = 0
                b = 6
            })
        //--------------------
        // ***show more*** //
        //--------------------
            $(".show-more").on("click", function() {
                a += 6
                b += 6
                ajaxImg(imgAPI, userInput, a, b) 
            })
        //-------------------------------
        // ***fahrenheit to celsius*** //
        //-------------------------------
            $(".fahrenheit").on("click",function() {
                if (fClick === 0) {
                    $(this).addClass("active")
                    $(".celsius").removeClass("active")
                    $(".individual-text-data").each(function() {
                        var degreeS = $(this).text()
                        var degree = parseInt(degreeS)
                        var cDegree = cToF(degree)
        
                        $(this).text(cDegree)
                    })
                    fClick = 1
                    cClick = 0
                }  
            })

            
            
        //-------------------------------
        // ***fcelsius to fahrenheit*** //
        //-------------------------------
            $(".celsius").on("click",function() {
                if (cClick === 0 ) {
                    $(this).addClass("active")
                    $(".fahrenheit").removeClass("active")
                    $(".individual-text-data").each(function() {
                        var degreeS = $(this).text()
                        var degree = parseInt(degreeS)
                        var cDegree = fToC(degree)
        
                        $(this).text(cDegree)
                    })
                }
                
                cClick = 1
                fClick = 0
            })
        //==========================================================================
        })