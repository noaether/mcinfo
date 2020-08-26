const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const keepAliveApp = express();
const voteApp = express();
const emoji = require("emoji-log");

keepAliveApp.all('/', (req, res)=>{
    res.send('Your bot is alive!')
})

function keepAlive(){
    keepAliveApp.listen(3000, ()=>{console.emoji('🖥 ' , ' KeepAlive Server is ON')});
}

module.exports = keepAlive;