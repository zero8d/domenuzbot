interface IWhoIs {
  'Domain Name'?: string
  Registrar?: string
  'Whois Server'?: string
  'Referral URL'?: string
  'Name Server'?: string
  Status?: string
  'Updated Date'?: string
  'Creation Date'?: string
  'Expiration Date'?: string
  Registrant?: Array<string>
  'Domain servers in listed order'?: Array<string>
  'Administrative Contact'?: Array<string>
  'Technical Contact'?: Array<string>
  'Billing Contact'?: Array<string>
  found: boolean
}
