import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { COMPANY_REPO, CompanyRepository } from '../ports/company.repository';
import { CompanyWithStarsRoundedDTO } from '../dto/company-with-stars-rounded.dto';

@Injectable()
export class GetCompanyByIdUseCase {
  constructor(@Inject(COMPANY_REPO) private companies: CompanyRepository) {}

  async execute(id: string): Promise<CompanyWithStarsRoundedDTO> {
    const c = await this.companies.findOneWithAverageStars(id);
    if (!c) throw new NotFoundException('Company not found');
    return c;
  }
}
