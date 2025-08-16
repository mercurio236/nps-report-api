import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateCompanyDto } from './dto/create-company.dto';
//import { COMPANY_REPO } from '@/application/ports/company.repository';
import { CreateCompanyUseCase } from '@/domain/application/use-cases/create-company.usecase';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly createCompany: CreateCompanyUseCase) {}

  @Post() create(@Body() dto: CreateCompanyDto) {
    return this.createCompany.execute({ name: dto.name });
  }

  @Get() findAll(@Param() _p: any) {
     return ''
  }
}
