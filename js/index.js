topHeadlineCarousel();
printHeadlines();

function sendNotification(titleStr, messageStr) {
    notifier.notify({
        title: titleStr,
        message: messageStr
    });
}

//This function fixes the problem if the article has
//a broken image file or link.
function SRCcheck(image) {
    image.onerror = null;
    image.src = "media/default.png";
}
