import { lookup } from 'whois'
export const whois = (domain: string): Promise<IWhoIs> => {
  return new Promise((resolve, reject) => {
    lookup(domain, (err, data) => {
      if (err) {
        reject(err)
      }
      if (data.includes('Sorry, but domain')) {
        resolve({ found: false })
      }
      let objdata: any = { found: true }
      let lastel = ''
      data
        .split('\n')
        .filter(line => line.indexOf('%') !== 0 && line !== '')
        .forEach(line => {
          if (line.indexOf(':') === line.length - 1) {
            lastel = line.trim().replace(':', '')
            objdata[line.trim().replace(':', '')] = []
            return
          }
          if (line.indexOf(':') === -1) {
            objdata[lastel] = [
              ...objdata[lastel],
              ...line
                .split('\t')
                .map(el =>
                  el
                    .trim()
                    .replace(' [at] ', '@')
                    .replace('(', '')
                    .replace(')', '')
                ),
            ]
            return
          }
          let infoarr = line.split(':')
          objdata[infoarr[0].trim()] = infoarr[1].trim()
        })
      resolve(objdata)
    })
  })
}
