export class InvalidEmailError extends Error {
  constructor (paramEmail: string) {
    super(`Invalid Email: ${paramEmail}`)
    this.name = 'InvalidEmailError'
  }
}
