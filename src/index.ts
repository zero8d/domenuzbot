import { Bot, Context, SessionFlavor, session } from 'grammy'
import dotenv from 'dotenv'
dotenv.config({})
import { MongoDBAdapter, ISession } from '@grammyjs/storage-mongodb'
import mongoose from 'mongoose'
import { bottoken, connstring } from './config'
import { anyMessageReply, getDomainInfo } from './controllers'
interface SessionData {
  state: 'start'
  username?: string
  name?: string
  hasblocked: boolean
}
// Flavor the context type to include sessions.
type MyContext = Context & SessionFlavor<SessionData>

const bot = new Bot<MyContext>(bottoken)
function initial(): SessionData {
  return { state: 'start', hasblocked: false }
}
const main = async () => {
  const conn = await mongoose.connect(connstring)
  console.log('connected db: ', conn.connection.db.databaseName)
  const collection = mongoose.connection.db.collection<ISession>('sessions')
  bot.use(session({ initial, storage: new MongoDBAdapter({ collection }) }))
  bot.on('my_chat_member:from', ctx => {
    if (ctx.myChatMember.new_chat_member.status == 'kicked') {
      console.log('blocked me: ', ctx.myChatMember.from.first_name)
      ctx.session.hasblocked = true
    }
  })
  bot.command('start', ctx => {
    ctx.session.username = ctx.from?.username
    ctx.session.name = ctx.from?.first_name
    ctx.reply("Menga domen nomini domen yoki domen.uz shaklida yozib jo'nating")
  })
  bot.hears(
    /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/,
    getDomainInfo
  )
  bot.on('message', anyMessageReply)
  bot.catch(err => console.log(err))
  bot.start()

  console.log('Bot started')
}
main()
