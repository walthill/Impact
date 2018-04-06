const notifier = require('node-notifier');
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
    let newsFeed = document.getElementById(id);  //The button to edit

    feed.innerHTML = + '<div class="col-10">'
                    + '<iframe src=' + newsURL + '></iframe>'
                    + '</div>'
                    + '</div>';
}

function topHeadlineCarousel() {
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

    const Carousel = document.getElementById("topHeadlineCarousel")
    var headlineClass;
    var count = 1;
    while(count <= 3){
        if(count == 1){
            headlineClass="carousel-item active"
        }
        else{
           headlineClass="carousel-item"
        }
        Carousel.innerHTML += '<div class=\"' + headlineClass + '">'
                            + '<img src="' + text.articles[count].urlToImage +'">'
                            + '<div class="carousel-caption">'
                            + '<h3>' + text.articles[count].title + '</h3>'
                            + '<p>' + text.articles[count].description
                            + "<button class=\"btn btn-dark\" onclick=favoriteArticle(\""
                            + text.articles[count].url
                            + "\")>Favorite</button>"
                            + '</p>'
                            + '</div>'
                            + '</div>';
        count++;
    }
    //Carousel.innerHTML += '<button class=\"row rounded m-2 p-2 btn\" onclick="loadMoreArticles()">More</button>'

  });
}


//PRE:      None
//POST:     No returns, just prints news to html
//PURPOSE:  Prints to html a list of ten results
function printHeadlines() {
    //News API object
    //The everything keyword queries from everything
    //Can change to 'topHeadlines' for top headlines
    let numArticles = 15;
    let newsHTML = '';

    newsapi.v2.everything ({
        pageSize: 99,
        sortBy: 'popularity',
        q: defaultOptions,    //The keywords to search for
        language: 'en'      //The language desired for news
    }).then(response => {

        const feed = document.getElementById("feed");
        console.log(response);

        for (let count = 1; count < numArticles; count++) {
            //This prints out the news title followed by the description
            const buttonID = 'button' + count;
            try
            {
                newsHTML +='<div id="' + buttonID + '" class="article bg-secondary">' +
                    '           <img class="article-thumb" src="' + response.articles[count].urlToImage + '" onerror="SRCcheck(this)">' +
                    '           <div class="article-details">' +
                    '               <p class="article-title">' +
                    '                   <a href="' + response.articles[count].url + '" target="_blank">' +
                    '                       ' + count + ': ' + response.articles[count].title + '' +
                    '                   </a>' +
                    '               </p>' +
                    '               <p class="article-source">By: ' + response.articles[count].source.name + '</p>' +
                    '               <p class="article-desc">' + response.articles[count].description + '</p>' +
                    '               <button class="btn btn-dark" onclick=favoriteArticle("' + response.articles[count].url + '")>Favorite</button>' +
                    '           </div>' +
                    '       </div>';
            }
            catch (e) {
                console.log('Error with article: ' + response.articles[count]);
            }
        }
        newsHTML += '<button class="row rounded m-2 p-2 btn" onclick="loadMoreArticles()">More</button>';

        feed.innerHTML = newsHTML;
  });
}

//PRE:      None
//POST:     No returns, just prints the new news articles to html
//PURPOSE:  Updates the html with a new set of 15 articles. Can continue
//          loading more articles until there is none left in the JSON
//          element that is received
function loadMoreArticles(){

    let newsHTML = '';
    //Initializes the isMoreArticles boolean if not initialized
    if(typeof loadMoreArticles.isMoreArticles == 'undefined')
        loadMoreArticles.isMoreArticles = true;

    //Only loads more articles if there is more to be loaded
    if(loadMoreArticles.isMoreArticles){
        if(typeof loadMoreArticles.articleCount == 'undefined')
            loadMoreArticles.articleCount = 16;

        let count = loadMoreArticles.articleCount;
        loadMoreArticles.articleCount += 15;

        newsapi.v2.everything({
            pageSize: 99,
            sortBy: 'popularity',
            q: defaultOptions,    //The keywords to search for
            language: 'en'        //The language desired for news
        }).then(response => {

            const feed = document.getElementById("feed");

            if (!response.hasOwnProperty("totalResults"))
                return;

            while(count <= loadMoreArticles.articleCount && count < response.totalResults) {
                //This prints out the news title followed by the description
                //console.log(text.articles[count].url);
                const buttonID = 'button' + count;
                newsUrl = null;//text.articles[startNum].url;

                try
                {
                    newsHTML +='<div id="' + buttonID + '" class="article bg-secondary">' +
                        '           <img class="article-thumb" src="' + response.articles[count].urlToImage + '" onerror="SRCcheck(this)">' +
                        '           <div class="article-details">' +
                        '               <p class="article-title">' +
                        '                   <a href="' + response.articles[count].url + '" target="_blank">' +
                        '                       ' + count + ': ' + response.articles[count].title + '' +
                        '                   </a>' +
                        '               </p>' +
                        '               <p class="article-source">By: ' + response.articles[count].source.name + '</p>' +
                        '               <p class="article-desc">' + response.articles[count].description + '</p>' +
                        '               <button class="btn btn-dark" onclick=favoriteArticle("' + response.articles[count].url + '")>Favorite</button>' +
                        '           </div>' +
                        '       </div>';
                }
                catch (e) {
                    console.log('Error with article: ' + response.articles[count]);
                }

                count++;
                if(count === response.totalResults - 1)
                    loadMoreArticles.isMoreArticles = false;
            }

            newsHTML += '<button class=\"row rounded m-2 p-2 btn\" id="loadMoreButton" onclick="loadMoreArticles()">More</button>';

            feed.innerHTML = newsHTML;

            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;

        });
    }
    //When there is no more articles to load changed the "More" button to "No more articles to display"
    else{
        const feed = document.getElementById("loadMoreButton");
        feed.innerHTML = '<h2> No more articles :(</h2>'
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

    let text = response;    //Response is what we get back, asssigning it to a variable
                            //text is a JSON object with an array containing all the news information
                            //For a breakdown of the message refer to here:
                            // https://newsapi.org/docs/endpoints/everything
    let numResponse = text.totalResults;

    console.log(numResponse);

    const feed = document.getElementById("feed");

    let count = 1;
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

function favoriteArticle(article) {

    let fs = require('fs');

    fs.appendFile('favorites.txt', article + "\n",
        (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
	  sendNotification('Article Favorited', 'Go to the Favorites page to access the url!');
    });
}
