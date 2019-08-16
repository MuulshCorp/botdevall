const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");

function date() {
  var now     = new Date();
  var annee   = now.getFullYear();
  var mois    = now.getMonth() + 1;
  var jour    = now.getDate();
  var heure   = now.getHours() + 2;
  var minute  = now.getMinutes();
  var seconde = now.getSeconds();
  return "Nous somme le "+jour+"/"+mois+"/"+annee+" et il est "+heure+"h "+minute+"mins "+seconde+"sec";
}

client.on("ready", () => {
  let rawdata = fs.readFileSync('config.json');  
  let config = JSON.parse(rawdata);
  console.log('ready');
  client.user.setActivity(config.prefix+`help`);
  var slogs = client.channels.get('486909004908331018');
  slogs.send('ready');
});

client.on('guildMemberAdd', member => {
  let role = member.guild.roles.find("name", "Membre");
  member.addRole(role);
  console.log('member join: {member} ');
});


client.on("message", async message => {
let rawdata = fs.readFileSync('config.json');  
let config = JSON.parse(rawdata);
const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

function name() {
  return message.author.username+"#"+message.author.discriminator;
}

if(message.content.indexOf(config.prefix) !== 0) return;

if (!message.content.startsWith(config.prefix) || message.author.bot) return;

if(command == "say") {
	if(!message.member.roles.some(r=>[config.role.staff].includes(r.name)))
  		return message.reply("Il vous faut le rôle `"+config.role.staff+"` pour utiliser cette commande!");
    
	if (args[0] == "" || args[0] == null) {
      return message.channel.send('Vous devez écrire un message !')
    }

    const sayMessage = args.join(" ");
    message.delete(1000);
    return message.channel.send(sayMessage);
}
	
	
	
	
if(command == "prefix") {
  	if(!message.member.roles.some(r=>[config.role.staff].includes(r.name)) )
  	return message.reply("Vous n'avez pas le rôle `"+config.role.staff+"` pour utiliser cette commande!");

    if (args[0] == "" || args[0] == null) {
      return message.channel.send('Vous devez choisir un nouveau préfixe ! (le nouveau préfixe ne doit pas contenir d\'espace)')
    }

  	prefix = args[0];

    var raw = { prefix: prefix, role: { say: config.role.say, staff: config.role.staff } };
    let data = JSON.stringify(raw, null, 2);
    fs.writeFileSync('config.json', data);

    client.user.setActivity(prefix+`help`);
    return message.channel.send('Le nouveau préfixe est `'+prefix+'` !').catch(O_o=>{});

}

if(command == "edit") {
    if(!message.member.roles.some(r=>[config.role.staff].includes(r.name))) 
    return message.reply("Vous n'avez pas le rôle  `"+config.role.staff+"` pour utiliser cette commande!");
  
    staff = config.role.staff;

    if (args[0] == "say") {
      staff = args[1];
    } else {
      return message.channel.send('La commande à suivre :\n›`'+config.prefix+'edit <role> <nouveau nom du rôle>` (<role> = say)')
    }
    
    if (args[1] == "" || args[1] == null) {
      return message.channel.send('Vous devez choisir un nouveau nom ! (le nouveau nom ne doit pas contenir d\'espace)')
    }

    var raw = { prefix: config.prefix, role: { staff: staff } };
    let data = JSON.stringify(raw, null, 2);
    fs.writeFileSync('config.json', data);

    message.channel.send('Le nouveau rôle pour les commandes d\'administration est  `'+staff+'` !').catch(O_o=>{});
    
}

if(command == "help") { 
	return message.channel.send('›`'+config.prefix+'say <message>` \nLe rôle `'+config.role.staff+'` est requis`);
}

});
client.login(process.env.TOKEN);
