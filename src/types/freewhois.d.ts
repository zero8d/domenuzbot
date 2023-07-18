declare module 'freewhois' {
  export default function whois(
    domain: string
  ): Promise<IWhoIsInfo | { message: string }>
}
type vcardArray = {
  elements: Array<[string, object, string, string | Array<string>]>
}
interface IWhoIsInfo {
  objectClassName?: string
  handle?: string
  ldhName?: string
  links?: Array<{
    value: string
    rel: string
    href: string
    type: string
  }>
  status?: Array<string>
  entities?: Array<{
    objectClassName: string
    handle: string
    roles: ['registrant' | 'administrative' | 'technical' | 'registrar']
    publicIds: [{ type: string; identifier: string }]
    vcardArray: vcardArray
    entities: [
      {
        objectClassName: string
        roles: [string]
        vcardArray: [string, Array<string, object, string, string>]
      }
    ]
  }>
  events?: Array<{
    eventAction: 'registration' | 'expiration' | 'last changed'
    eventActor: number
    eventDate: string
  }>
  secureDNS?: { delegationSigned: boolean }
  nameservers?: Array<{ objectClassName: string; ldhName: string }>
  rdapConformance?: Array<string>
  notices?: Array<{
    title: string
    description: Array<string>
    links: Array<{ href: string; type: string }>
  }>
  entities?: Array<{
    roles: Array<string>
    events: Array<{
      eventDate: string
      eventActor: number
      eventAction: string
    }>
    remarks?: Array<{
      type: string
      title: string
      description: Array<string>
    }>
    vcardArray: vcardArray
    objectClassName: string
  }>

  nameservers?: Array<{
    events: Array<{
      eventDate: string
      eventActor: number
      eventAction: string
    }>
    handle: string
    status: Array<string>
    ldhName: string
    objectClassName: string
  }>
  objectClassName?: string
  rdapConformance?: Array<string>
  port43?: string
  message?: string
}
