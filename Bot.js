require('dotenv').config()
let SongRequests = require("./SongRequests.js");
const tmi = require("tmi.js");
const Scry = require("scryfall-sdk");

const options = {
    options: {
        debug: true,

    },
    connection: {
        cluster: "aws",
        reconnect: true,
    },
    identity: {
        username: "TwibbeBot",
        password: process.env.OAUTH_TOKEN,
    },
    channels: ["Twibbe"],
};
 
const client = new tmi.client(options);1

module.exports.Connect = function(){

    client.connect(); // Connect

    // Conect message
    client.on("connected",(address,port) => {
        client.action(options.channels[0], "Hello chat! imGlitch")
    });
};

function getCommand(sMessage){
    let sCommand;

    sCommand = sMessage.trim();

    if(sCommand.indexOf(" ") > 0){
        sCommand = sCommand.slice(0,sCommand.indexOf(" "));
    }

    return sCommand;
};

module.exports.ChatCommands = function(){
    let sCommand;

    client.on("chat", (channel,user,message,self) => {
        sCommand = getCommand(message);
        
        switch(sCommand){
            case "!hype":
                client.action(options.channels[0],"TwitchLit TwitchLit TwitchLit TwitchLit TwitchLit TwitchLit");
                break;
            case "!rules":
                client.action(options.channels[0],"- Be friendly and use common sense.");
                client.action(options.channels[0],"- No politics/religion/NSFW.");
                break;
            case "!hey":
                client.action(options.channels[0]," Hey " + message.trim().slice(5) + " HeyGuys");
                break;
            case "!so":
                client.action(options.channels[0],"Check out this awesome streamer ->  www.twitch.tv/" + message.trim().slice(4));
                break;
            case "!github":
                client.action(options.channels[0],"Check out my GitHub page -> github.com/Toubic");
                break;
            case "!discord":
                    client.action(options.channels[0],"Check out the Discord -> https://discord.gg/SjHtM4sW");
                    break;
            case "!gg":
                client.action(options.channels[0],"GG!  HSWP SeemsGood");
                break;
            case "!rcg":
                Scry.Cards.random().then(result => client.action(options.channels[0],result.name + " (" + result.set + ")")); 
                break;
            case "!rcqg":
                Scry.Cards.random().then(result => client.action(options.channels[0],result.flavor_text)); 
                break;
            case "!card":
                message = message.slice(5).trim();
                Scry.Cards.byName(message).then((result) => { 
                    client.action(options.channels[0],result.name + " (" + result.set + ") " + result.oracle_text + " " + result.flavor_text); 
                });
                break;
            case "!song": // TODO
                SongRequests.addSong();
                break;
            default:
                //client.action("Twibbe",user["display-name"] + " that command does not exist.");
        }
    });
};

module.exports.ChatCommandsInterval = function(){
    /*
    setInterval(function(){ 
        client.action(options.channels[0],"/clear");
    }, 900000);
    */
    setInterval(function(){ 
        client.action(options.channels[0],"Please leave a follow if you like the stream.");
    }, 3600000);        
};

// user name client.action("Twibbe",user["display-name"]);
