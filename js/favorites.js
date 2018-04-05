var fs = require('fs')

fs.readFile("favorites.txt", "utf8", (err, data) => {
  if (err) throw err;
  favs = document.getElementById("favorites")
  var links = data.split(/,| |\n/)
  for(i = 0; i < links.length - 1; i++) {
	favs.innerHTML += "<li class=\"list-group-item\">"
					+ "<button class=\"btn btn-outline-danger\" "
					+ "onClick=unfavorite(\"" + links[i] + "\")>"
					+ "Unfavorite"
					+ "</button> "
					+ links[i]
					+ "</li>"
  }
});

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
