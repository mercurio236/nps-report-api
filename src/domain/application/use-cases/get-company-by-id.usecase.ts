import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { COMPANY_REPO, CompanyRepository } from '../ports/company.repository';

@Injectable()
export class GetCompanyByIdUseCase {
  constructor(@Inject(COMPANY_REPO) private companies: CompanyRepository) {}

  async execute(id: string) {
    const company = await this.companies.findById(id);
    if (!company) {
      throw new NotFoundException(`Company with id ${id} not found`);
    }
    return company;
  }
}
