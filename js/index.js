  //   const notifier = require('node-notifier');
      // String
      //notifier.notify('Message');

      // Object
      /*notifier.notify({
        title: 'My notification',
        message: 'Hello, there!'
      });*/
      
	  printHeadlines();
	  
	  function sendNotification(titleStr, messageStr)
      {
        notifier.notify({
          title: titleStr,
          message: messageStr
        });
      }

      //This function fixes the problem if the article has
      //a broken image file or link.
      function SRCcheck(image){
        image.onerror = null;
        image.src = "media/default.png";
      }
	  
	  var myVar;

	function loadAnim() {
		myVar = setTimeout(showPage, 250);
	}

	function showPage() {
	  document.getElementById("loader").style.display = "none";
	  document.getElementById("myDiv").style.display = "block";
	}


