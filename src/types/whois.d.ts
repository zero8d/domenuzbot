declare module 'whois' {
  export function lookup(
    domain: string,
    cb: (err: Error, data: string) => void
  ): void
}
