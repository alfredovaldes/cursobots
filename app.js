var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());
server.get(/.*/, restify.plugins.serveStatic({ 'directory': '.', 'default': 'index.html' }));

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said:"+process.env.MicrosoftAppId+" pass : "+process.env.MicrosoftAppPassword+"   %s", session.message.text);
});
console.log(process.env.MicrosoftAppId);
console.log(process.env.MicrosoftAppPassword);