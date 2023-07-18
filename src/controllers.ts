import { Context } from 'grammy'
import { translate } from './translate'
import { whois } from './utils'

export const getDomainInfo = async (
  ctx: Context & { match: string | RegExpMatchArray }
) => {
  const newMatch = ctx.match[0].match(/([a-zA-Z0-9-]+){3,}/)
  const word = newMatch ? ctx.match[0] + '.uz' : ctx.match[0]
  let res: IWhoIs
  try {
    res = await whois(word)
  } catch (error) {
    console.error(error)
    ctx.reply('error\n' + error)
    return
  }
  if (!res.found) {
    ctx.reply(`domen: ${word}\nholati: band emas`)
    return
  }
  let text = ''
  const resultData = translate(res)
  for (const property in resultData) {
    if (
      typeof resultData[property] === 'string' &&
      resultData[property].length > 0
    ) {
      text += `${property}: ${resultData[property]}\n`
      continue
    }
    text += `${property}: \n     ${resultData[property].join('\n     ')}\n`
  }
  ctx.reply(text)
}

export const anyMessageReply = (ctx: Context) => {
  ctx.reply("Menga domen nomini domen yoki domen.uz shaklida yozib jo'nating")
}
