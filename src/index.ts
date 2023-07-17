import { Bot, Context, SessionFlavor, session } from 'grammy'
import axios, { ResponseType } from 'axios'
import dotenv from 'dotenv'
dotenv.config({})
import { translate } from './translate'
import { MongoDBAdapter, ISession } from '@grammyjs/storage-mongodb'
import mongoose from 'mongoose'
import { bottoken, connstring } from './config'
interface SessionData {
  state: 'start'
}

// Flavor the context type to include sessions.
type MyContext = Context & SessionFlavor<SessionData>

const bot = new Bot<MyContext>(bottoken)
function initial(): SessionData {
  return { state: 'start' }
}
const main = async () => {
  const conn = await mongoose.connect(connstring)
  console.log('connected db: ', conn.connection.db.databaseName)
  const collection = mongoose.connection.db.collection<ISession>('sessions')
  bot.use(session({ initial, storage: new MongoDBAdapter({ collection }) }))
  bot.hears(/^[\w]{1,50}(\.uz)?$/, async ctx => {
    const word = ctx.match[0].split('.uz')[0]
    let res: ResponseType & {
      data: { status: string; domain: string; message: string; whois: IWhoIs }
    }
    try {
      const formData = new FormData()
      formData.append('domain', word)
      formData.append('whois', 'true')

      res = await axios.post('https://my.eskiz.uz/api/whois', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    } catch (error) {
      ctx.reply('Could not fetch')
      return
    }
    const data = res.data
    if (data.status === 'error') {
      ctx.reply("Ma'lumot olishni iloji bo'lmadi")
      return
    }
    if (data.whois.rcode == '0') {
      ctx.reply('domen: ' + data.domain + 'band emas')
      return
    }
    if (data.whois?.rcode == '1') {
      const resultObjs = translate(data.whois)
      let text = ''
      for (const property in resultObjs) {
        text += `${property}: ${resultObjs[property]}\n`
      }
      ctx.reply(text)
    }
  })

  bot.on('message', ctx => {
    ctx.reply("Menga domen nomini domen yoki domen.uz shaklida yozib jo'nating")
  })

  bot.start()
  console.log('Bot started')
}
main()
// /.{2,}\.uz/
