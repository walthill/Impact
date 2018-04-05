var myVar;

function loadAnim() {
    myVar = setTimeout(showPage, 1200);
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}
