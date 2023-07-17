import { Context } from 'grammy'
import { translate } from './translate'
import { whois } from './utils'

export const getDomainInfo = async (
  ctx: Context & { match: string | RegExpMatchArray }
) => {
  const word = ctx.match[0].split('.uz')[0]
  let res: IWhoIs
  try {
    res = await whois(word + '.uz')
  } catch (error) {
    console.error(error)
    ctx.reply('Could not fetch')
    return
  }
  if (!res.found) {
    ctx.reply(`domen: ${word}.uz\nholati: band emas`)
    return
  }
  let text = ''
  const resultData = translate(res)
  for (const property in resultData) {
    if (typeof resultData[property] === 'string') {
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
