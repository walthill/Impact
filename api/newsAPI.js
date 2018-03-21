const NewsAPI = require('newsapi'); //Importing the news API
const newsapi = new NewsAPI('f18e802ece204e9280772a9179a6be6c');    //This is our API Key
const queryOptions =  'Super Smash OR league of legends OR Overwatch OR CSGO OR CS:GO OR Counter Strike OR PUBG OR Playunknown OR Fortnite OR Dota OR Call of duty';
    //This is a list of all the keywords we're looking for
    //Keep everything in one string seperated by OR (can also use and)


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

    var text = response;    //Response is what we get back, asssigning it to a variable
                            //text is a JSON object with an array containing all the news information
                            //For a better understanding refer to here:
                            // https://newsapi.org/docs/endpoints/everything
    var numResponse = text.totalResults;

    console.log(numResponse);

    const feed = document.getElementById("feed")

    var count = 1;
    while(count <= 15){
        //This prints out the news title followed by the description
        feed.innerHTML += '<div class="row rounded bg-secondary m-2 p-2">'
                        + '<div class="col-2">'
                        + '<img src="'
						+ text.articles[count].urlToImage
                        + '" class="articleThumb" onerror="SRCcheck(this)">'
                        + '</div>'
                        + '<div class="col-10">'
                        + "<h2>" + count + ": "
                        + text.articles[count].title + "</h2>"
						+ "<p>" + text.articles[count].description
                        + "</p>"
                        + '</div>'
                        + '</div>';
        count++;
    }

  });
}
