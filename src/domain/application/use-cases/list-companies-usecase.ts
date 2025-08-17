import { Inject, Injectable } from '@nestjs/common';
import { COMPANY_REPO, CompanyRepository } from '../ports/company.repository';
import { Company } from '@/domain/entities/company.entity';

@Injectable()
export class ListCompaniesUseCase {
  constructor(@Inject(COMPANY_REPO) private companies: CompanyRepository) {}

  async execute(): Promise<Company[]> {
    return this.companies.findAll();
  }
}
