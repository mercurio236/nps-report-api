import { Inject, Injectable } from '@nestjs/common';
import { COMPANY_REPO, CompanyRepository } from '../ports/company.repository';

export interface CreateCompanyUseCaseProps {
  name: string;
  description?: string;
  stars?: number;
}

@Injectable()
export class CreateCompanyUseCase {
  constructor(@Inject(COMPANY_REPO) private companies: CompanyRepository) {}
  execute(input: CreateCompanyUseCaseProps) {
    return this.companies.create({
      name: input.name,
      description: input.description,
      stars: input.stars,
    });
  }
}
