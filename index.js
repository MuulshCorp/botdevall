const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");

client.on("ready", () => {
  console.log('ready');
  client.user.setActivity(config.prefix+`help`);
});

client.on("message", async message => {
const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

if(message.content.indexOf(config.prefix) !== 0) return;

if (!message.content.startsWith(config.prefix) || message.author.bot) return;
logs(message.content, args);


if(command == "say") {
  	if(!message.member.roles.some(r=>[config.role.say].includes(r.name)) )
  	return message.reply("Vous n'avez pas le role "+config.role.say+" pour utiliser cette commande!");
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
}

if(command == "prefix") {
  	if(!message.member.roles.some(r=>[config.role.staff].includes(r.name)) )
  	return message.reply("Vous n'avez pas le role "+config.role.staff+" pour utiliser cette commande!");
  	prefix = args[0];
    message.channel.send(config.prefix+' est le nouveau prefix !');
}

if(command == "help") {
	message.channel.send(config.prefix+'say : il faut avoir le role '+config.role.say+'\n'+config.prefix+'prefix : il faut avoir le role '+config.role.staff+'\n'+config.prefix+'edit : pour modifier les roles qu\'il faut avoir, il faut la perm `ADMINISTRATOR`');
}

});
client.login(process.env.TOKEN);