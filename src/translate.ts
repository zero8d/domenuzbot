const whoisPropsNames: any = {
  'Domain Name': 'Domen nomi',
  Registrar: "Ro'yxatdan otkazuvchi",
  Status: 'holati',
  'Updated Date': 'yangilangan vaqti',
  'Creation Date': 'ishga tushgan vaqti',
  'Expiration Date': 'tugash vaqti',
  Registrant: 'Domen egasi',
  'Domain servers in listed order': 'Domen serverlari',
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
