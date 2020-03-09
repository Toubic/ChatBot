require('dotenv').config()
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
        client.action("Twibbe", "Hello chat! imGlitch")
    });
};

function getCommand(sMessage){
    var sCommand;

    sCommand = sMessage.trim();

    if(sCommand.indexOf(" ") > 0){
        sCommand = sCommand.slice(0,sCommand.indexOf(" "));
    }

    return sCommand;
};

module.exports.ChatCommands = function(){
    var sCommand;

    client.on("chat", (channel,user,message,self) => {
        sCommand = getCommand(message);
        
        switch(sCommand){
            case "!hype":
                client.action("Twibbe","TwitchLit TwitchLit TwitchLit TwitchLit TwitchLit TwitchLit");
                break;
            case "!rules":
                client.action("Twibbe","- Be friendly and use common sense.");
                client.action("Twibbe","- No politics/religion/NSFW.");
                break;
            case "!hey":
                client.action("Twibbe"," Hey " + message.trim().slice(5) + " HeyGuys");
                break;
            case "!so":
                client.action("Twibbe","Check out this awesome streamer ->  www.twitch.tv/" + message.trim().slice(4));
                break;
            case "!github":
                client.action("Twibbe","Check out my GitHub page -> github.com/Toubic");
                break;
            case "!gg":
                client.action("Twibbe","GG!  HSWP SeemsGood");
                break;
            case "!rcg":
                Scry.Cards.random().then(result => client.action("Twibbe",result.name + " (" + result.set + ")")); 
                break;
            case "!rcqg":
                Scry.Cards.random().then(result => client.action("Twibbe",result.flavor_text)); 
                break;
            case "!lands":
                Scry.Catalog.landTypes().then((result) => { 
                    result = result.filter(result => result === "Plains" || result === "Swamp" || result === "Mountain" || result === "Forest" || result === "Island") 
                    result.forEach(result => client.action("Twibbe",result));
                });
                break;
            case "!card": // TODO
                message = message.slice(5).trim();
                Scry.Cards.byName(message).then((result) => { 
                    client.action("Twibbe",result.name + " (" + result.set + ") " + result.oracle_text + " " + result.flavor_text); 
                });
                break;
            default:
                //client.action("Twibbe",user["display-name"] + " that command does not exist.");
        }
    });
};

module.exports.ChatCommandsInterval = function(){
    setInterval(function(){ 
        client.action("Twibbe","Please leave a follow if you like the stream.");
    }, 3600000);
                
};

// user name client.action("Twibbe",user["display-name"]);