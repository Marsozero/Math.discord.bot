module.exports = {
    name: "divide",
    execute: (message, args, bot) => {
        const [num1, num2] = args
        if(isNaN(+num1) || isNaN(+num2)) return message.reply("You need to provide two numbers")
        return message.reply(`Result is: ${Number(num1)/Number(num2)}`)
    }
}
