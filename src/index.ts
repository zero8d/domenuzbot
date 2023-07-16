import { Bot } from 'grammy'
import axios, { ResponseType } from 'axios'
const bot = new Bot('2031567939:AAFzjxeHa-9Rw93M5rgEZ835UPx8f5adxu0')

bot.hears(/^[\w]{1,50}(\.uz)?$/, async ctx => {
  const word = ctx.match[0].split('.uz')[0]
  let res: ResponseType & {
    data: { status: string; domain: string; message: string }
  }
  try {
    const formData = new FormData()
    console.log(word)
    formData.append('domain', word)
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
  console.log(data)
  if (data.status === 'error') {
    ctx.reply("Domain can't be registered")
    return
  }
  if (data.status === 'success') {
    ctx.reply('Domain: ' + data.domain + '.uz is free')
    return
  }
  if (data.status === 'busy') {
    ctx.reply('Domain: ' + data.domain + ' already registered')
    return
  }
})

bot.on('message', ctx => {
  ctx.reply("Menga domen nomini domen yoki domen.uz shaklida yozib jo'nating")
})

bot.start()
console.log('Bot started')

// /.{2,}\.uz/
