const NewsAPI = require('newsapi'); //Importing the news API
const newsapi = new NewsAPI('f18e802ece204e9280772a9179a6be6c');    //This is our API Key
const queryOptions =  'Super Smash OR league of legends OR Overwatch OR CSGO OR CS:GO OR Counter Strike OR PUBG OR Playunknown OR Fortnite OR Dota OR Call of duty';
const headlineQuery = 'Esports'
    //This is a list of all the keywords we're looking for
    //Keep everything in one string seperated by OR (can also use and)

//PRE:      News page is loaded
//POST:    Dispalys news to page
//PURPOSE:  Display news feed 
function displayNewsFeed() {
    //News API object
    //The everything keyword queries from everything
    //Can change to 'topHeadlines' for top headlines
	newsapi.v2.everything({
        //sources:
        //category:
        q: queryOptions,	  //The keywords to search for
        language: 'en'      //The language desired for news
    }).then(response => {
    
    text = response;    //Response is what we get back, asssigning it to a variable
                            //text is a JSON object with an array containing all the news information
                            //For a better understanding refer to here:
                            // https://newsapi.org/docs/endpoints/everything
  
	var numResponse = text.totalResults;
    console.log(numResponse);

    var count = 0;
    var feedLoc = document.getElementById('newsfeed');
	
	while(count <= 10){
        /*	
				This prints out the news title to page and url to console
			This currently displays duplicates. 
			It seems gameinformer's articles and comment sections have separate pages with identical titles
		*/
		feedLoc.innerHTML +='<p>';
		feedLoc.innerHTML += '  ' + text.articles[count].title;
		feedLoc.innerHTML +='</p>';

        console.log(text.articles[count].title);
        console.log("   " + text.articles[count].url);
        console.log();
        count++;
    }

  });
}

	
//PRE:      None
//POST:     No returns, just prints news to console
//PURPOSE:  Prints to console a list of ten results 
function printHeadlines() {
    //News API object
    //The everything keyword queries from everything
    //Can change to 'topHeadlines' for top headlines
    newsapi.v2.everything({
        //sources:
        //category:
        q: queryOptions,    //The keywords to search for
        language: 'en'      //The language desired for news
    }).then(response => {
    
    text = response;    //Response is what we get back, asssigning it to a variable
                            //text is a JSON object with an array containing all the news information
                            //For a better understanding refer to here:
                            // https://newsapi.org/docs/endpoints/everything
  
	var numResponse = text.totalResults;

    console.log(numResponse);

    var count = 0;
    while(count <= 10){
        //This prints out the news title followed by the description
        console.log(text.articles[count].title);
        console.log("   " + text.articles[count].description);
        console.log();
        count++;
    }

  });
}
