//WIP=================================================================================
//Currently places current top streams in embedded iframes
'use strict';

const Mixer = require('beam-client-node');

const client = new Mixer.Client(new Mixer.DefaultRequestRunner());//api call

function printStreamsList()
{
    client.request('GET', '/channels', {//GET request to mixer.com/api/v1/channels
    qs: {
    limit: 5,
    //most viewers -> least viewers
    order: 'viewersCurrent:DESC',
    },
    }).then(res => {
    
    //Returns CHANNEL element
    //We need the "Channel ID" to use in the embedded frame

    const feed = document.getElementById("streamsFeed");
    for (let i = 0; i < 5; i++) {
        //"channel" is a single "CHANNEL" element from the api.
        //The attribute we're going to use is the channel id
        //All documentation of the REST API can be found here:
        //https://dev.mixer.com/rest.html#
        var channel = res.body[i];
        //console.log(channel.id);
        feed.innerHTML += "<div class=\"row rounded bg-secondary m-2 p-2\">"
                        +"<iframe "
                        + "allowfullscreen=\"true\" "
                        + "src=\"https://mixer.com/embed/player/" 
                        + channel.user.username
                        //the embedded video has no direct mute options
                        //workaround in the url call
                        + "?muted=true\" "
                        + "frameborder=\"0\" "
                        + "width=\"640\" "
                        + "height=\"360\" "
                        + "></iframe>"
                        + "<div><h1>" + channel.user.username + "</h1></div>"
                        + "<div><h2>Game: " + channel.type.name + "</h2></div>"
                        + "<div><h2>Viewers: " + channel.viewersCurrent + "</h2></div>"
                        + "</div>"

    }
    });
}
