import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from '../infra/env/env';
import { EnvService } from '../infra/env/env.service';
import { PrismaModule } from '../infra/database/prisma/prisma.module';
import { CompaniesController } from '@/presentation/http/companies.controller';
import { ResponsesController } from '@/presentation/http/responses.controller';
import { ReportsController } from '@/presentation/http/reports.controller';
import { CreateCompanyUseCase } from '@/domain/application/use-cases/create-company.usecase';
import { CreateResponseUseCase } from '@/domain/application/use-cases/create-response.usecase';
import { GetCompanyNpsUseCase } from '@/domain/application/use-cases/get-company-nps.usecase';
import { ListCompanyResponsesUseCase } from '@/domain/application/use-cases/list-company-responses.usecase';
import { ListAllCompaniesNpsUseCase } from '@/domain/application/use-cases/list-all-companies-nps.usecase';
import { COMPANY_REPO_PROVIDER } from '../infra/database/prisma/repositories/company.prisma.repository';
import { RESPONSE_REPO_PROVIDER } from '../infra/database/prisma/repositories/response.prisma.repository';
import { NPS_REPORT_QUERY_PROVIDER } from '../infra/database/prisma/repositories/nps-report.prisma.query';
import { ListCompaniesUseCase } from '@/domain/application/use-cases/list-companies-usecase';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    PrismaModule,
  ],
  controllers: [CompaniesController, ResponsesController, ReportsController],
  providers: [
    EnvService,
    CreateCompanyUseCase,
    CreateResponseUseCase,
    GetCompanyNpsUseCase,
    ListCompanyResponsesUseCase,
    ListAllCompaniesNpsUseCase,
    ListCompaniesUseCase,
    COMPANY_REPO_PROVIDER,
    RESPONSE_REPO_PROVIDER,
    NPS_REPORT_QUERY_PROVIDER,
    COMPANY_REPO_PROVIDER
  ],
})
export class AppModule {}
