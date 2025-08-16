import { Stars } from '../value-objects/stars.vo'

export class Response {
  constructor(
    public readonly id: string,
    public readonly companyId: string,
    public readonly stars: Stars,
    public readonly comment: string | null,
    public readonly createdAt: Date,
  ) {}
}
