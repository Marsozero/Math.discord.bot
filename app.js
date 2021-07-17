const Discord = require("discord.js")
const fs = require("fs")
const bot = new Discord.Client()
const config = require("./config.json")

bot.commands = new Discord.Collection()
const prefix = "!"

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))

for(const file of commandFiles) {
    const command = require(`./commands/${file}`)
    bot.commands.set(command.name, command)
}

bot.on("ready", () => {
    console.log(`logged in as ${bot.user.tag}`)
})

bot.on("message", (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return
    const args = message.content.slice(prefix.length).split(" ")
    const command = args.shift().toLowerCase()
    if(!bot.commands.has(command)) return
    try {
        bot.commands.get(command).execute(message, args, bot)
    } catch(err) {
        message.reply("Error.")
    }
})

bot.login(config.token)