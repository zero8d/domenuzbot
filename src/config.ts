const CONNSTRING = process.env.CONNSTRING
const BOTTOKEN = process.env.BOTTOKEN

if (!CONNSTRING) {
  throw new Error('CONNSTRING not found')
}
if (!BOTTOKEN) {
  throw new Error('BOTTOKEN not found')
}

export const connstring = CONNSTRING
export const bottoken = BOTTOKEN
