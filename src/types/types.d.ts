interface IWhoIs {
  domainName?: string
  registrar?: string
  status?: string
  lastUpdatedDate?: string
  createdDate?: string
  expirationDate?: string
  nameServers?: Array<string>
  registrantContact?: Array<string>
  administrativeContact?: Array<string>
  technicalContact?: Array<string>
  registrarContact?: Array<string>
  found: boolean
}
