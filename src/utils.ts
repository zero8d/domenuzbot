import whoislookup from 'freewhois'
import { resolveTripleslashReference } from 'typescript'

export const whois = async (domain: string) => {
  const result: IWhoIsInfo = await whoislookup(domain)
  if (result.message === 'Domain not found') {
    return { message: result.message, found: false }
  }
  const registrantContact: Array<string> = []

  result.entities
    ?.find(el => el.roles[0] === 'registrant')
    ?.vcardArray.elements.forEach(el => {
      let fourthEl = el.at(3)
      return Array.isArray(fourthEl)
        ? fourthEl.forEach(el => registrantContact.push(String(el)))
        : registrantContact.push(String(fourthEl))
    })
  const whoisResult: IWhoIs = {
    status: result.status?.at(0),
    domainName: result.ldhName,
    found: true,
    registrar: String(
      result.entities
        ?.find(el => el.roles[0] == 'registrar')
        ?.vcardArray.elements.find(el => el[0] === 'org')
        ?.at(-1)
    ),
    lastUpdatedDate: result.events?.find(
      el => el.eventAction === 'last changed'
    )?.eventDate,
    createdDate: result.events?.find(el => el.eventAction === 'registration')
      ?.eventDate,
    expirationDate: result.events?.find(el => el.eventAction === 'expiration')
      ?.eventDate,
    registrantContact: registrantContact.filter(
      el => el.trim() != '' && el.trim() != '4.0'
    ),
  }
  return whoisResult
}
