import {
  CompanyNpsReport,
  NPS_REPORT_QUERY,
  NpsReportPrismaQuery,
} from '@/infra/database/prisma/repositories/nps-report.prisma.query';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ListAllCompaniesNpsUseCase {
  constructor(@Inject(NPS_REPORT_QUERY) private query: NpsReportPrismaQuery) {}
  execute(): Promise<CompanyNpsReport[]> {
    return this.query.allCompanies();
  }
}
