import { Inject, Injectable } from '@nestjs/common'
import { COMPANY_REPO, CompanyRepository } from '../ports/company.repository'


@Injectable()
export class CreateCompanyUseCase {
  constructor(@Inject(COMPANY_REPO) private companies: CompanyRepository) {}
  execute(input: { name: string }) {
    return this.companies.create(input.name)
  }
}
