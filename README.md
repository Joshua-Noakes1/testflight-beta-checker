# Testflght Beta Checker
## About
What is Testflight Beta Checker about?

I made Testflight Beta Checker (TBC for short) becuase i was tired of wanting to join an IOS app beta and have it say its full.   

So i wrote a nodejs app that checks for you and uses IFTTT to email you when a spot is open!  

## Setup
Setup for TBC is simple!

1. Clone the git reop   
Clone this reop to your pc 
```shell
git clone https://github.com/Joshua-Noakes1/testflight-beta-checker.git
```
2. Install the dependencies   
Install the required dependencies found in package.json using npm
```shell
npm i
```
3. Add your Testflight url and IFTTT webhook url   
3.a Adding your Testflight url   
You'll need to rename env.example to .env and add your testflight url to line called tf=     
3.b Adding your IFTTT webhook url   
We're going to use IFTTT to send you an email when the beta is open so make an account [here](https://ifttt.com/join) if you don't have one.   
Once you have an account with IFTTT you want to create a new webhook with a webhookas a triger and the output as an email.    
After you've created your applet you need to head [here](https://ifttt.com/maker_webhooks) and click documentation then find the link in the section that looks like.   
```shell
CURL -X POST https://maker.ifttt.com/trigger/{event}/with/key/
```
You need to grab that link and replace {event} with the name of your webhook and add it to tf_email= in your .env file

4. Your Done
Thats it start the app with 
```shell
node index.js
``` 