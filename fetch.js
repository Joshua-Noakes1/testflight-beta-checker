// Libs (http://zetcode.com/javascript/cheerio/ cheerio info)
const fetch = require('node-fetch');
const cheerio = require('cheerio');
// vars
const open_email = ("example.com");
const testflight_url = ("example.com");

// starting our checks every 10 seconds
beta_status_check()
setInterval(beta_status_check, 10 * 1000);

function beta_status_check() {
    // beta url
    fetch(testflight_url)
        .then(res => res.text())
        .then(body => {
            // loading the body into cheerio and using the div beta status to find if the beta is full
            let $ = cheerio.load(body);
            var status = $('div.beta-status')
            // checking if its full or open 
            if (status.text().includes("full")) {
                console.log('----------\nBeta Full')
            } else if (status.text().includes("join")) {
                console.log('----------\nBeta Spot Open')
                // sending open email to ifttt
                fetch(open_email)
                    .then(res => res.text())
                    .catch(err => console.error(err));
            } else {
                console.log('So you should not see this but if you do Hi! \nThere\'s a most likely a bigger issue right now')
            }
        })
        .catch(err => console.error(err));
}