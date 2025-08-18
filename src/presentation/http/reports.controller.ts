import { GetCompanyNpsUseCase } from '@/domain/application/use-cases/get-company-nps.usecase';
import { ListAllCompaniesNpsUseCase } from '@/domain/application/use-cases/list-all-companies-nps.usecase';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly allCompanies: ListAllCompaniesNpsUseCase,
    private readonly companyNps: GetCompanyNpsUseCase,
  ) {}

  @Get('nps')
  all() {
    return this.allCompanies.execute();
  }

  @Get('nps/:companyId')
  byCompany(@Param('companyId') id: string) {
    return this.companyNps.execute(id);
  }
}
