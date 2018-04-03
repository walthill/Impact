window.onscroll = function() {checkTop()};

function checkTop() {
    if (document.body.scrollTop > 195 || document.documentElement.scrollTop > 195) {
        document.getElementById("topButton").style.display = "block";
    } 
    else {
        document.getElementById("topButton").style.display = "none";
    }
}

function toTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}