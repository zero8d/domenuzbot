const whoisPropsNames: any = {
  domainName: 'Domen nomi',
  registrar: "Ro'yxatdan otkazuvchi",
  status: 'holati',
  lastUpdatedDate: 'yangilangan vaqti',
  createdDate: 'ishga tushgan vaqti',
  expirationDate: 'tugash vaqti',
  registrantContact: 'Domen egasi',
  nameServers: 'Domen serverlari',
}
const whoisPropsNamesKeys = Object.keys(whoisPropsNames)

export function translate(whois: any) {
  const newWhoIs: any = {}
  for (const key in whois) {
    if (whoisPropsNamesKeys.includes(key)) {
      newWhoIs[whoisPropsNames[key]] = whois[key]
    }
  }
  return newWhoIs
}
