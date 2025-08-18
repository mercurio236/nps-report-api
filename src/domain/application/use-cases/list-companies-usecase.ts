import { Inject, Injectable } from '@nestjs/common';
import { COMPANY_REPO, CompanyRepository } from '../ports/company.repository';
import { CompanyWithStarsRoundedDTO } from '../dto/company-with-stars-rounded.dto';

@Injectable()
export class ListCompaniesUseCase {
  constructor(@Inject(COMPANY_REPO) private companies: CompanyRepository) {}

  async execute(): Promise<CompanyWithStarsRoundedDTO[]> {
    return this.companies.findAllWithAverageStars();
  }
}
