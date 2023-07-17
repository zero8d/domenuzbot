const whoisPropsNames: any = {
  dName: 'Domen nomi',
  sRegistrator: "Ro'yxatdan otkazuvchi",
  dStatus: 'holati',
  sNs1: 'NS1',
  sNs2: 'NS2',
  sNs3: 'NS3',
  sNs4: 'NS4',
  dActivated: 'ishga tushgan vaqti',
  dExpired: 'tugash vaqti',
  sCustomer: 'Egasi',
  sCustomerPhone: 'telefon raqami',
  sCustomerEMail: 'email',
  sCustomerPost: 'pochta indeksi',
  sCustomerAddress: 'Manzil',
  sCustomerCity: 'Shaxar',
  sCustomerRegion: 'Region',
  sCustomerCountry: 'Davlat',
  sCustomerState: 'Davlat qisqa',
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
