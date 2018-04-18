var fs = require('fs')

fs.readFile("favorites.txt", "utf8", (err, data) => {
  if (err) throw err;
  favs = document.getElementById("favorites")
  var links = data.split(/,| |\n/)
  for(i = 0; i < links.length - 1; i++) {
	favs.innerHTML += "<li class=\"list-group-item\""
					+ "id=\"expandView\">"
					+ "<button class=\"btn btn-outline-danger\" "
					+ "onClick=unfavorite(\"" + links[i] + "\")>"
					+ "Unfavorite"
					+ "</button> "
					+ "<button class=\"btn btn-outline-succes\" "
					+ "data-toggle=\"collapse\" data-target=\"#view\""
					+ "onClick=viewArticle(\"" + links[i] + "\")>"
					+ "View the article!"
					+ "</button> "
					+ "</li>"
  }
});

function viewArticle(link) {
	view = document.getElementById("expandView")
	view.innerHTML = "<button class=\"btn btn-outline-danger\" "
					+ "onClick=unfavorite(\"" 
					+ link 
					+ "\")>"
					+ "Unfavorite"
					+ "</button> "
					+ "<button class=\"btn btn-outline-succes\" "
					+ "onClick=viewHide(\"" 
					+ link 
					+ "\")>"
					+ "Hide the article!"
					+ "</button> "
					+ "<div id=\"view\">"
					+ "<iframe src=\""
					+ link
					+ "\" "
					+ "width=\""
					+ 700
					+ "\" height=\""
					+ 300
					+ "\""
					+ "</iframe>"
					+ "</div>"
	
}

function viewHide(link) {
	view = document.getElementById("expandView")
	view.innerHTML = "<button class=\"btn btn-outline-danger\" "
							+ "onClick=unfavorite(\"" 
							+ link 
							+ "\")>"
							+ "Unfavorite"
							+ "</button> "
							+ "<button class=\"btn btn-outline-succes\" "
							+ "data-toggle=\"collapse\" data-target=\"#view\""
							+ "onClick=viewArticle(\"" 
							+ link 
							+ "\")>"
							+ "View the article!"
							+ "</button> "
}

function unfavorite(link) {
	fs.readFile("favorites.txt", "utf8", (err, data) => {
	  if (err) throw err;

	  var newdata = data.replace(link + '\n', '')
	  fs.writeFile('favorites.txt', newdata,
		  (err) => {
		if (err) throw err;
		console.log('The file has been saved!');
	  });
	});
	window.location.reload(false);
}
