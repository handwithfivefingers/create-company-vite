// USING TELEGRAM
const { BOT_Token } = require('../../../configs/telegram')
const { Bot } = require('grammy')
// bot.on('message:text', (ctx) => {
//   console.log('ctx', JSON.stringify(ctx, 0, 4))
//   return ctx.reply('Echo:' + ctx.message.text)
// })
// bot.start()
// console.log('bot', bot.api.sendMessage(-1002113835906, 'Test Sendiing'))
module.exports = class BotService {
  constructor() {
    this.TLCTBot = new Bot(BOT_Token) // <-- place your bot token in this string
  }

  onStart = () => {
    this.TLCTBot.start()
  }

  onSendMessage = async ({ message, groupID = -1002113835906 }) => {
    try {
      await this.TLCTBot.api.sendMessage(groupID, message, { parse_mode: 'HTML' })
      return true
    } catch (error) {
      console.error('Bot send error: ' + error)
      return error
    }
  }
}
