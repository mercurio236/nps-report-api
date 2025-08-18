import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { COMPANY_REPO, CompanyRepository } from '../ports/company.repository';
import { CompanyWithStarsRoundedDTO } from '../dto/company-with-stars-rounded.dto';

@Injectable()
export class GetCompanyByIdUseCase {
  constructor(@Inject(COMPANY_REPO) private companies: CompanyRepository) {}

  async execute(id: string): Promise<CompanyWithStarsRoundedDTO> {
    const company = await this.companies.findOneWithAverageStars(id);
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }
}
