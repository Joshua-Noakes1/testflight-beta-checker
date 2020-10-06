// libs
require('dotenv').config();
const fetch = require('node-fetch');
const cheerio = require('cheerio');

// we use this so that we dont send one then more email by using the most recent value if its more than 0 then we dont send else send
const data = [0];

beta();
setInterval(beta, 10 * 1000);

function beta() {
    // beta url
    fetch(process.env.tf)
        .then(res => res.text())
        .then(body => {
            // loading the body into cheerio and using the div beta status to find if the beta is full
            let $ = cheerio.load(body);
            var status = $('div.beta-status')
            // checking if its full or open 
            if (status.text().includes("full")) {
                if (!data[data.length -1] == 0) {
                    // we do this so we dont send more then one email
                    data.push(0);
                }
                console.log('----------\nBeta Full')
            } else if (status.text().includes("join")) {
                console.log('----------\nBeta Spot Open')
                if (data[data.length - 1] == 0) {
                    // we do this so we dont send more then one email
                    data.push(1);
                    // sending open email to ifttt
                    fetch(process.env.tf_email)
                        .then(res => res.text())
                        .catch(err => console.error(err));
                    console.log('Sent Email')
                }
            } else {
                console.log('So you should not see this but if you do Hi! \nWe cant find the word full or join so either apple is rate limiting us or their website has changed')
            }
        })
        .catch(err => console.error(err));
}