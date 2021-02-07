const { Client, Collection } = require('discord.js');
const fs = require('fs');
const client = new Client();
const config = require("./config.json");
const Discord = require("discord.js");
const db = require("quick.db");
//import { Rcon } from "rcon-client"
 //const rcon = await Rcon.connect({
    //host: "mc.netherrack.my.id", port: 30449, password: "GarudaHirzi"
client.config = config;

fs.readdir('./events/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		const event = require(`./events/${file}`);
		const eventName = file.split('.')[0];
		client.on(eventName, event.bind(null, client));
	});
});

client.commands = new Collection();

fs.readdir('./commands/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		const props = require(`./commands/${file}`);
		const commandName = file.split('.')[0];
		client.commands.set(commandName, props);
	});
});

client.on("guildMemberAdd", (member) => { //usage of welcome event
  let chx = db.get(`welchannel_${member.guild.id}`); //defining var
  
  if(chx === null) { //check if var have value or not
    return;
  }
    let dmeb = new Discord.MessageEmbed()
    .setTitle(`Welcome To **NetherRack Network** ${member.tag}`)
    .setDescription("Pastikan kamu mengikuti rules:\n1. Dilarang promosi/Adverting\nMempromosikan sesuatu yang tidak terkait dalam server minecraft netherrack\n\n2. Dilarang mengirim chat yang mengganggu\nSeperti spam, flood, capslock dan berkata kasar yang berlebihan atau hal lainnya\n\n3. Dilarang melakukan sesuatu yang dapat membuat mu terbanned dari server discord\n- Membahas pornografi\n- Melakukan penipuan\n- Menimbulkan pertikaian yang besar\n\n4. Wajib berprilaku baik pada orang lain\nHindari diskriminasi pada anak kecil atau orang lain dengan mengatai kekuranganya seperti bocah, bocil atau yang lainya\n\n5. Beretika ketika voice\nMenghormati seseorang ketika berbicara dan tidak memotong pembicaraan orang lain\n\n6. Pastikan username mu mudah untuk dipanggil maupun di tag\nHal ini untuk memudahkan kita semua untuk saling membantu dan mengingat siapa dirimu<n\n7. Dilarang mengirim Direct Message yang mengganggu\nJika kamu mengirim link atau sesuatu yang mengganggu orang lain, kamu dapat terbanned dari server ini\n\n8. Gunakan Command Bot Dichannel bot\nJika kamu mengunakan bot command di channel lain dapat membuat pembicaraan terpotong atau terngangu! gunakan command bot di <#785154877949083659> , kamu dapat termute jika melakukan ini\n\n9. Jangan mereport dichannel/direct message lain\npastikan kamu mereport hacker/user yang tidak mengikuti peraturan sebaiknya di channel <#785154877949083660>\n\nMakasih dah join NetherRack Network :)\Website :\nhttps://www.netherrack.my.id\nStore\nhttps://store.netherrack.my.id\nDiscord :\nhttps://discord.netherrack.my.id\nWhatsApp :\nhttps://wa.netherrack.my.id\nHelp Deks\nhttps://help.netherrack.my.id")
    .setFooter("Bot By HirziGamingYT#8701")

  let wembed = new Discord.MessageEmbed() //define embed
  .setAuthor(member.user.username, member.user.avatarURL())
  .setColor("#00ff00")
  .setThumbnail(member.user.avatarURL())
  .setDescription(`> ‎\n> Welcome <@${member.id}> to **NetherRack Network** Server!\n> ‎`);
  
  client.channels.cache.get(chx).send(wembed) //get channel and send embed
    member.send(dmeb)
})
client.on("guildMemberRemove", (member) => { //usage of welcome event
  let chx = db.get(`welchannel_${member.guild.id}`); //defining var
  
  if(chx === null) { //check if var have value or not
    return;
  }

  let wembed = new Discord.MessageEmbed() //define embed
  .setAuthor(member.user.username, member.user.avatarURL())
  .setColor("#ff0000")
  .setThumbnail(member.user.avatarURL())
  .setDescription(`> ‎\n> GoodBye <@${member.id}> we will miss you!\n> ‎`);
  
  client.channels.cache.get(chx).send(wembed) //get channel and send embed
})
//rcon.end()
client.login(config.token);

client.on('message', message => {
    if(message.content === 'ipnya') {
        let ip = new Discord.MessageEmbed()
.setTitle("NetherRack Server")
.addField("**Bedrock Edition**"," play.netherrack.my.id(port default)")
.addField("**Java Edition**","play.netherrack.my.id:19132")
.addField("**Version**",`Java Edition: 1.16.4\nBedrock Edition: 1.16.100+`)
.setTimestamp()
        message.channel.send(ip)
        }
})