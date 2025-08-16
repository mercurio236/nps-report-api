import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateResponseDto } from './dto/create-response.dto';
import { CreateResponseUseCase } from '@/domain/application/use-cases/create-response.usecase';
import { ListCompanyResponsesUseCase } from '@/domain/application/use-cases/list-company-responses.usecase';

@Controller('responses')
export class ResponsesController {
  constructor(
    private readonly createResponse: CreateResponseUseCase,
    private readonly listByCompany: ListCompanyResponsesUseCase,
  ) {}
  @Post() create(@Body() dto: CreateResponseDto) {
    return this.createResponse.execute(dto);
  }
  @Get('company/:id') list(@Param('id') id: string) {
    return this.listByCompany.execute(id);
  }
}
