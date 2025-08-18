import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { CreateCompanyDto } from './dto/create-company.dto';
import { CreateCompanyUseCase } from '@/domain/application/use-cases/create-company.usecase';
import { ListCompaniesUseCase } from '@/domain/application/use-cases/list-companies-usecase';
import { GetCompanyByIdUseCase } from '@/domain/application/use-cases/get-company-by-id.usecase';

@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly createCompany: CreateCompanyUseCase,
    private readonly listCompanies: ListCompaniesUseCase,
    private readonly getCompanyById: GetCompanyByIdUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateCompanyDto) {
    return this.createCompany.execute(dto);
  }

  @Get()
  findAll(@Query('id') id?: string) {
    if (id) {
      return this.getCompanyById.execute(id);
    }
    return this.listCompanies.execute();
  }

  @Get(':id')
  getCompanyId(@Param('id') id: string) {
    return this.getCompanyById.execute(id);
  }
}
