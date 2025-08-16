import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { RESPONSE_REPO, ResponseRepository } from '../ports/response.repository'
import { COMPANY_REPO, CompanyRepository } from '../ports/company.repository'

@Injectable()
export class CreateResponseUseCase {
  constructor(
    @Inject(RESPONSE_REPO) private responses: ResponseRepository,
    @Inject(COMPANY_REPO) private companies: CompanyRepository,
  ) {}
  async execute(input: { companyId: string; stars: number; comment?: string }) {
    const company = await this.companies.findById(input.companyId)
    if (!company) throw new NotFoundException('Company not found')
    return this.responses.create(input)
  }
}
