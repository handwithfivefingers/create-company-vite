// USING TELEGRAM
const { BOT_Token } = require('../../../configs/telegram')
const { Bot } = require('grammy')
const TELEGRAM_CODE = require('../../../constant/telegramCode')
const moment = require('moment-timezone')
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

  onHandleErrorMsg = ({ remoteAddress, originalUrl, method = 'GET', data }) => {
    const msg = `
    <b>${moment().format('YYYY/MM/DD HH:mm:ss')}:</b>
     - IP: <code>${remoteAddress?.replace('::ffff:', '')}</code> 
     - URL:<code>${originalUrl} </code>
     - METHOD:<code>${method} </code>
     - Description: <code>${JSON.stringify(data)}</code>

     --------------------------------------------------------------------------------
     `
    console.log('msg', msg)
    this.onSendMessageFromThread({ message: msg, message_thread_id: TELEGRAM_CODE.TOPIC.ERROR })
  }

  onSendMessage = async ({ message, groupID = TELEGRAM_CODE.GROUP }) => {
    try {
      await this.TLCTBot.api.sendMessage(groupID, message, { parse_mode: 'HTML' })
      return true
    } catch (error) {
      console.error('Bot send error: ' + error)
      return error
    }
  }
  onSendMessageFromThread = async ({
    message,
    groupID = TELEGRAM_CODE.GROUP,
    message_thread_id = TELEGRAM_CODE.TOPIC.ERROR,
    parse_mode = 'HTML',
  }) => {
    try {
      await this.TLCTBot.api.sendMessage(groupID, message, { message_thread_id, parse_mode })
      return true
    } catch (error) {
      console.error('Bot send error: ' + error)
      return error
    }
  }

  registerListeners = async () => {
    try {
      // await this.TLCTBot.api.sendMessage(groupID, message, { parse_mode: 'HTML' })
      await this.TLCTBot.on('message:text', (ctx) => {
        console.log('ctx', JSON.stringify(ctx, null, 4))
        console.log('THREAD ID', ctx.update?.message?.message_thread_id)
        // this.TLCTBot.api.sendMessage(-1002113835906, ctx.message.text, { message_thread_id: 38 })
      })
      return true
    } catch (error) {
      console.error('Bot send error: ' + error)
      return error
    }
  }
}
