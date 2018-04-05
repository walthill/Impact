'use strict';

const Mixer = require('beam-client-node');

const client = new Mixer.Client(new Mixer.DefaultRequestRunner());

client.request('GET', '/channels', {
qs: {
limit: 5,
order: 'viewersCurrent:DESC',
},
}).then(res => {
for (let i = 0; i < res.body.length; i++) {
const channel = res.body[i];
console.log(channel);
console.log(`Your number of viewers is ${channel.viewersCurrent}!`);
}
});