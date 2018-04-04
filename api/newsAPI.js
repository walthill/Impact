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
    var newsFeed = document.getElementById(id);  //The button to edit

    feed.innerHTML = + '<div class="col-10">'
                    + '<iframe src=' + newsURL + '></iframe>'
                    + '</div>'
                    + '</div>';
} 


//PRE:      None
//POST:     No returns, just prints news to html
//PURPOSE:  Prints to html a list of ten results
function printHeadlines() {
    //News API object
    //The everything keyword queries from everything
    //Can change to 'topHeadlines' for top headlines
    newsapi.v2.everything({
        //pageSize: 100,
        sortBy: 'popularity',
        q: defaultOptions,    //The keywords to search for
        language: 'en'      //The language desired for news
    }).then(response => {

    var text = response;    //Response is what we get back, asssigning it to a variable
                            //text is a JSON object with an array containing all the news information
                            //For a breakdown of the message refer to here:
                            // https://newsapi.org/docs/endpoints/everything
    //var numResponse = text.totalResults;

    const feed = document.getElementById("feed")

    var count = 1;
    while(count <= 15){
        //This prints out the news title followed by the description
        const buttonID = 'button' + count;
        newsUrl = null;//text.articles[count].url;

        //console.log(buttonID);
        feed.innerHTML += '<button id=' + buttonID + ' onclick="console.log(' + buttonID + ')">'
         
        //'<button id=button1 onclick="displayArticle("' + text.articles[count].url + '", button1)">'
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
    feed.innerHTML += '<button onclick="loadMoreArticles()">More</button>'

  });
}

function loadMoreArticles(){
    if(typeof loadMoreArticles.isMoreArticles == 'undefined')
        loadMoreArticles.isMoreArticles = true;

    if(loadMoreArticles.isMoreArticles){

        if(typeof loadMoreArticles.articleCount == 'undefined')
            loadMoreArticles.articleCount = 16;
        
        startNum = loadMoreArticles.articleCount;
        loadMoreArticles.articleCount += 15;

        newsapi.v2.everything({
            pageSize: 99,
            sortBy: 'popularity',
            q: defaultOptions,    //The keywords to search for
            language: 'en'        //The language desired for news
        }).then(response => {

            var text = response;
            console.log(text.totalResults)    
            const feed = document.getElementById("feed")
            feed.innerHTML = "";

            while(startNum <= loadMoreArticles.articleCount && startNum < text.totalResults){

                if(text[startNum] == 'undefined'){
                    console.log('caught it')
                }
                //This prints out the news title followed by the description
                //console.log(text.articles[count].url); 
                const buttonID = 'button' + startNum;
                newsUrl = null;//text.articles[startNum].url;

                feed.innerHTML += '<button id=' + buttonID  + ')">'
                
                //'<button id=button1 onclick="displayArticle("' + text.articles[count].url + '", button1)">'
                                + '<div class="row rounded bg-secondary m-2 p-2">'
                                + '<div class="col-2">'
                                + '<img src="'
                                + text.articles[startNum].urlToImage
                                + '" class="articleThumb" onerror="SRCcheck(this)">'
                                + '</div>'
                                + '<div class="col-10">'
                                + "<h2>" + startNum + ": "
                                + text.articles[startNum].title + "</h2>"
                                + "<p>" + text.articles[startNum].description
                                + "</p>"
                                //+ "<iframe src=" + text.articles[startNum].url + "></iframe>"
                                + '</div>'
                                + '</div>'
                                + '</button>';
                startNum++;
                if(startNum == text.totalResults - 1)
                    loadMoreArticles.isMoreArticles = false;
            }
            feed.innerHTML += '<button id="loadMoreButton" onclick="loadMoreArticles()">More</button>'

            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;

        });
    }
    else{
        const feed = document.getElementById("loadMoreButton")
        feed.innerHTML = '<h2> No more articles to display! </h2>'
    }

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

