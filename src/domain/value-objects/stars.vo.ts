export class Stars {
  private constructor(public readonly value: number) {}
  static create(n: number) {
    if (!Number.isInteger(n) || n < 0 || n > 5) {
      throw new Error('Stars must be an integer between 0 and 5')
    }
    return new Stars(n)
  }
}
