const NewsAPI = require('newsapi'); //Importing the news API
const newsapi = new NewsAPI('f18e802ece204e9280772a9179a6be6c');    //This is our API Key
const defaultOptions =  'League of Legends OR Super Smash OR Overwatch OR CSGO OR CS:GO' + 
                        'OR Counter Strike OR PUBG OR Playunknown OR Fortnite OR Dota ' +
                        'OR Call of duty OR WoW OR World Of Warcraft';
    //This is a list of all the keywords we're looking for
    //Keep everything in one string seperated by OR
//PRE:      newsURL: The url we are launching
//          id: The ID of the button to edit the HTML of
//POST:     No returns, changes the html of the button to be an iframe of new article
//PURPOSE:  Launches the desired news article in an iframe within the button that it was pressed
function displayArticle(newsURL, id) {
    var newsFeed = document.getElementById(id)  //The button to edit

    feed.innerHTML = '<button id="' + buttonID + '" onclick="displayArticle(' + newsURL + ', ' + buttonID + ')">'
                    + '<div class="col-10">'
                    + '<iframe src=' + newsURL + '></iframe>'
                    + '</div>'
                    + '</div>'
                    + '</button>';
} 


//PRE:      None
//POST:     No returns, just prints news to html
//PURPOSE:  Prints to html a list of ten results
function printHeadlines() {
    //News API object
    //The everything keyword queries from everything
    //Can change to 'topHeadlines' for top headlines
    newsapi.v2.everything({
        //sources:
        //category:
        sortBy: 'popularity',
        q: defaultOptions,    //The keywords to search for
        language: 'en'      //The language desired for news
    }).then(response => {

    var text = response;    //Response is what we get back, asssigning it to a variable
                            //text is a JSON object with an array containing all the news information
                            //For a breakdown of the message refer to here:
                            // https://newsapi.org/docs/endpoints/everything
    var numResponse = text.totalResults;

    console.log(numResponse);

    var feed = document.getElementById("feed")

    var count = 1;
    while(count <= 15){
        //This prints out the news title followed by the description 
        var buttonID = 'button' + String(count);
        feed.innerHTML += '<button id="' + buttonID + '" onclick="displayArticle(' + text.articles[count].url + ', ' + buttonID + ')">'
                        + '<div class="row rounded bg-secondary m-2 p-2">'
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
                        //+ "<iframe src=" + text.articles[count].url + "></iframe>"
                        + '</div>'
                        + '</div>'
                        + '</button>';
        count++;
    }

  });
}
//Pre:      userOptions is a string containing the user inputted search options
//Post:     No returns, all user options will be searched and printed
//Purpose:  This is exactally the same as the function above except it searches for 
//          the user options instead of our default.
//          Additionally keeps a string compiled of all user options so they can continue adding more options
function printUserHeadlines(userOption){

    if(printUserHeadlines.totalOptions != null)
        printUserHeadlines.totalOptions += userOption;
    else
        printUserHeadlines.totalOptions = userOption;

    newsapi.v2.everything({
        //sources:  //Sources if we need to query by sources ever
        //category: //Catagories to sort by as well
        q: printUserHeadlines.totalOptions,    //The keywords to search for
        language: 'en'      //The language desired for news
    }).then(response => {

    var text = response;    //Response is what we get back, asssigning it to a variable
                            //text is a JSON object with an array containing all the news information
                            //For a breakdown of the message refer to here:
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

