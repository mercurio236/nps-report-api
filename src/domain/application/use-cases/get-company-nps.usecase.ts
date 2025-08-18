import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CompanyNpsReport,
  NPS_REPORT_QUERY,
  NpsReportPrismaQuery,
} from '@/infra/database/prisma/repositories/nps-report.prisma.query';

@Injectable()
export class GetCompanyNpsUseCase {
  constructor(@Inject(NPS_REPORT_QUERY) private query: NpsReportPrismaQuery) {}
  async execute(companyId: string): Promise<CompanyNpsReport> {
    const data = await this.query.byCompany(companyId);
    if (!data) throw new NotFoundException('Company not found');
    return data;
  }
}
