export class Company {
  constructor(
    public readonly id: string,
    public name: string,
    public description: string | null,
    public stars: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
