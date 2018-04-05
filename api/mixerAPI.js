//WIP=================================================================================
'use strict';

const Mixer = require('beam-client-node');

const client = new Mixer.Client(new Mixer.DefaultRequestRunner());

function printStreamsList()
{
    client.request('GET', '/channels', {
    qs: {
    limit: 5,
    order: 'viewersCurrent:DESC',
    },
    }).then(res => {
    
    const feed = document.getElementById("streamsFeed");
    for (let i = 0; i < 15; i++) {
        const channel = res.body[i];
        console.log(channel.id);
        feed.innerHTML += "<iframe allowfullscreen=\"true\" src=\"https://mixer.com/embed/player/\"" + channel.id + "></iframe>"

    }
    });
}
