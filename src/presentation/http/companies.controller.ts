import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateCompanyDto } from './dto/create-company.dto';
//import { COMPANY_REPO } from '@/application/ports/company.repository';
import { CreateCompanyUseCase } from '@/domain/application/use-cases/create-company.usecase';
import { ListCompaniesUseCase } from '@/domain/application/use-cases/list-companies-usecase';

@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly createCompany: CreateCompanyUseCase,
    private readonly listCompanies: ListCompaniesUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateCompanyDto) {
    return this.createCompany.execute(dto);
  }

  @Get()
  findAll() {
    return this.listCompanies.execute();
  }
}
