require('dotenv').config()
const tmi = require("tmi.js");

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


const client = new tmi.client(options);

module.exports.Connect = function(){

    client.connect(); // Connect

    // Conect message
    client.on("connected",(address,port) => {
        client.action("Twibbe", "Hello chat! imGlitch")
    });
};

module.exports.ChatCommands = function(){
    client.on("chat", (channel,user,message,self) => {
        if(message.toLowerCase().trim() === "!hype"){
            client.action("Twibbe","TwitchLit TwitchLit TwitchLit TwitchLit TwitchLit TwitchLit");
        }
        else if(message.toLowerCase().trim() === "!rules"){
            client.action("Twibbe","- Be friendly and use common sense.");
            client.action("Twibbe","- No politics.");
            client.action("Twibbe","- No religion.");
            client.action("Twibbe","- No NSFW.");
        };
    });
};

module.exports.ChatCommandsInterval = function(){
    setInterval(function(){ 
        client.action("Twibbe","Please leave a follow if like the stream.");
    }, 3600000);
                
};

// user name client.action("Twibbe",user["display-name"]);