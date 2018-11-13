# Travel_Mate
Team-Work-Project

##Origin Story
Our project is aimed at the photographer hobbyist who likes to travel and see the many sights this world has to offer. Given that our ideal user lives a life on the go and values good design, we used a simple but attractive layout that can be used quickly and is optimized for use on mobile platforms.


##The User's Experience
A user starts out on the main screen, which consists of a pretty picture of one app dev's San Francisco neighborhood and a search bar where they can type in the name of a city. Upon clicking search, the user then sees a list of the top five locations that FourSquare recommends for scenic pictures in the given area. The search is returned as follows:

##Features: The Results Section
    -Place name
    -A FourSquare user-derived photo of the place
    -The place address
    -A short description of the place written by a FourSquare commenter

##Features: The Image Section
Below the results div with the five listed areas are other divs containing...

    -A div containing six high quality images that a photographer can use as an example to get their creative juices flowing
    -A button that will return six more high-quality images for further inspiration

##Features: The Weather Section
    -A three day weather forecast so that the photographer can ensure they are visiting at a time when the weather is optimal for photo taking. This comes complete with API-derived icons that change according to the weather. By default, Fahrenheit is displayed but a pair of buttons enables a user to switch to Celsius as well. 


##Back End Workload
What the user doesn't see is a myriad of coding action going down in the code.

    ###JavaScript
    In the Javascript are functions galore that take in the user's input and run it through three separate APIs, FourSquare, Pixabay, and the Open Weather API. 
    
        ##APIS##
        
            FourSquare: Travel_Mate conducts two kinds of searches on the FourSquare API and a total of 11 API calls to FourSquare per search given that the FourSquare API requires one search to give us the top locations (we limit the results to five) and two searches per location, one for the picture and another for the description. The FourSquare API breaks down calls into two categories, Regular and Premium, with Premium calls being limited to 500/day. Given that 10 of the 11 FourSquare calls are Premium calls, try not to make too many searches! 
            
            Pixabay: The Pixabay call is far more straightforward. 25 pictures are called from the Pixabay API. The display function calls 6 of them at a time and displays them into two columns. If a user selects the "Show more" button, the next six pictures in the returned array (containing 25 elements) is displayed on screen.

            Open Weather Map: Another fairly straightforward API call. The complicated part was the button that can alter between Fahrenheit and Celsius. But alas, it works. Huzahh!

    ###HTML
    Building this was no small feat. Oh wait, it was! Our HTMKL is simple and clean, just to make you guys happy and reduce the number of Advils you need in your lives. Just the appropriate links in the head and a bunch of divs in the body that can be manipulated by the whims of the JavaScript and CSS. 


    ###CSS
    Yes, Bootstrap makes life easier, but this code is pretty badass even without it. The default layout is optimized for use on a mobile device. The @media calls that alter the site size enable use on tablets and desktops. Don't try to view this on a huge screen or else things will get funky!


# Project Link
https://savinaxu.github.io/Travel_Mate/