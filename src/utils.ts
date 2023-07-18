import { lookup } from 'whois'
export const whois = (domain: string): Promise<IWhoIs> => {
  return new Promise((resolve, reject) => {
    lookup(domain, (err, data) => {
      if (err) {
        reject(err)
        return
      }
      if (data.includes('Sorry, but domain')) {
        resolve({ found: false })
        return
      }
      let objdata: any = { found: true }
      let lastel = ''
      console.log(data)
      data
        .split('\n')
        .filter(line => line.indexOf('%') !== 0 && line !== '')
        .forEach(line => {
          if (line.indexOf(':') === line.length - 1) {
            lastel = line.trim().replace(':', '')
            objdata[line.trim().replace(':', '')] = []
            return
          }
          if (!line.includes(':') && line[0] === ' ') {
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
          if (infoarr.length > 1) {
            objdata[infoarr[0].trim()] = infoarr[1].trim()
            return
          }
        })
      resolve(objdata)
    })
  })
}
