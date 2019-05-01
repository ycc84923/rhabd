const Discord = require('discord.js');
const config = require("./config.json");
const bot = new Discord.Client();

bot.on('ready', () => {
  console.log(`成功登入 ${bot.user.tag}!`);
});
//以下程式碼
var rollstarted = false;
var rollPoint = 0;
const rollResult = new Map();

function roll(number = 100){
  return r = Math.floor(Math.random() * number) + 1;
}
bot.on('message', message => {

  if (message.author.bot){
    return;
  }

//  message.channel.send("你好！ " + message.author.username);

 if (message.content == "早安"){
   message.channel.send("早安！ " + message.author.username)
 }

 if (message.content == "午安"){
   message.channel.send("午安！ " + message.author.username)
 }

 if (message.content == "晚安"){
   message.channel.send("晚安！ " + message.author.username)
 }

 var m1 = message.content.split(" ");
 if (!m1[0].startsWith(config.prefix)) return;

if (m1[0] == "!骰"){
  var result;
  if (m1.length == 2){
    result = roll(m1[1]);
    message.channel.send("使用者 【 " + message.author.username + " 】擲出了 " + result + " 點。")
  } else {
    result = roll(100);
    message.channel.send("使用者 【 " + message.author.username + " 】擲出了 " + result + " 點。")
  }

  if (rollstarted){
    if (rollResult.has(message.author.username)){
      message.reply("此次擲骰結果不會記錄，因為你在本次賭局中已經擲過骰了！")
    } else {
      rollResult.set(message.author.username, result);
    }
  }
}else if (m1[0] == "!開局") {
  if (rollstarted){
    message.channel.send("賭局已經開始！")
  } else {
      if (m1.length == 2){
        rollPoint = m1[1];
      } else if (m1.length == 1){
        rollPoint = 100;
      } else
    message.channel.send("賭局開始！")
    rollstarted = true;
  }
}else if (m1[0] == "!離手") {
  if (rollstarted){
    rollstarted = false;
    var winner = 0;
    var endMsg = "贏家是：";
    for (var [name, value] of rollResult){
      if (value > winner) winner = value;
    }
    for (var [name, value] of rollResult){
      if (value == winner) endMsg += name + " ";
    }
    message.channel.send(endMsg);
  } else {
    message.channel.send("賭局尚未開始！")
  }
 } else {
   message.channel.send("你說啥？")
 }
});
//以上程式碼

bot.login(config.token);
