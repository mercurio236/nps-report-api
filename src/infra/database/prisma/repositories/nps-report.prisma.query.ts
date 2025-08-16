import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { computeNps5 } from '@/domain/services/nps.service';
import {
  CompanyNpsRow,
  NPS_REPORT_QUERY,
  NpsReportQuery,
} from '@/domain/application/ports/nps-report.query';

@Injectable()
export class NpsReportPrismaQuery implements NpsReportQuery {
  constructor(private prisma: PrismaService) {}
  async allCompanies(): Promise<CompanyNpsRow[]> {
    const companies = await this.prisma.company.findMany({
      select: { id: true, name: true },
    });
    const rows = await Promise.all(
      companies.map(async (c) => {
        const stars = await this.prisma.response.findMany({
          where: { companyId: c.id },
          select: { stars: true },
        });
        const r = computeNps5(stars.map((s) => s.stars));
        return { companyId: c.id, company: c.name, ...r };
      }),
    );
    return rows.sort((a, b) => (b.nps ?? -Infinity) - (a.nps ?? -Infinity));
  }
}
export const NPS_REPORT_QUERY_PROVIDER = {
  provide: NPS_REPORT_QUERY,
  useClass: NpsReportPrismaQuery,
};
