# Travel_Mate
Team-Work-Project

#The Ideal User
Our project is aimed at the photographer hobbyist who likes to travel and see the many sights this world has to offer. Given that our ideal user likes to travel and values design, we used a simple but attractive layout that is optimized for use on mobile platforms for quick use on the fly.


#The User's Experience
A user starts out on the main screen, which consists of a pretty picture of one creator's San Francisco neighborhood and a search bar where they can type in the name of a city. Upon clicking search, the user then sees a list of the top five locations to take scenic pictures in the given area. The search is returned as follows:
    -A photo of the place
    -The place name
    -The place address
    -A short description of the place

Below the div with the five listed areas are...

    -A button that will return five more results for further inspiration
    -A div containing four high quality pictures that a photographer can use as an example to get their creative juices flowing
    -A three day weather forecast so that the photographer can ensure they are visiting at a time when the weather is optimal for photo taking


#Back End Workload
What the user doesn't see is a myriad of coding action going down in the Javascript and CSS. The HTML is fairly clean and simple with multiple divs that are manipulated by the .JS file. The CSS gives a clean look and feels a bit simple on larger screens, but looks just right on a mobile platform as it's optimized for mobile use. 

In the Javascript are functions galore that take in the user's input and run it through three seperate APIs, FourSquare, Pixabay, and the Open Weather API. Travel_Mate conducts two kinds of searches on the FourSquare API and a total of 11 API calls to FourSquare per search given that the FourSquare API requires one search to give us the top locations (we limit the results to five) and two searches per location,one for the picture and another for the description. 