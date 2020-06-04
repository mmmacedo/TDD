export class InvalidPasswordConfirmationError extends Error {
  constructor () {
    super('Invalid password confirmation')
    this.name = 'InvalidPasswordConfirmationError'
  }
}
