import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { computeNps5 } from '@/domain/services/nps.service';


export const NPS_REPORT_QUERY = Symbol('NPS_REPORT_QUERY');

export type CompanyNpsReport = {
  companyId: string;
  company: string;
  nps: number | null;
  counts: { promoters: number; passives: number; detractors: number; total: number };
  pct: { promoters: number; passives: number; detractors: number };
  averageStars: number | null;     // média real (0..5, com casas decimais)
  starsRounded: number | null;     // média arredondada (exibição: 0..5 inteiro)
  lastResponseAt: Date | null;     // data da última avaliação
  comments: Array<{ comment: string; stars: number; createdAt: Date }>; // últimos N
};

@Injectable()
export class NpsReportPrismaQuery {
  private readonly COMMENTS_PER_COMPANY = 5;

  constructor(private prisma: PrismaService) {}

  async allCompanies(): Promise<CompanyNpsReport[]> {
    // 1) empresas
    const companies = await this.prisma.company.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    });

    const ids = companies.map(c => c.id);

    if (ids.length === 0) return [];

    // 2) agregados por empresa (count, avg(stars), max(createdAt))
    const aggs = await this.prisma.response.groupBy({
      by: ['companyId'],
      where: { companyId: { in: ids } },
      _count: { _all: true },
      _avg: { stars: true },
      _max: { createdAt: true },
    });
    const aggByCompany = new Map(
      aggs.map(a => [a.companyId, { total: a._count._all, avgStars: a._avg.stars ?? null, lastAt: a._max.createdAt ?? null }]),
    );

    // 3) estrelas para NPS
    const starsByCompany = await Promise.all(
      companies.map(async c => {
        const rows = await this.prisma.response.findMany({
          where: { companyId: c.id },
          select: { stars: true },
        });
        return [c.id, rows.map(r => r.stars)] as const;
      }),
    );
    const starsMap = new Map<string, number[]>(starsByCompany);

    // 4) últimos comentários (N por empresa)
    const commentsByCompany = await Promise.all(
      companies.map(async c => {
        const rows = await this.prisma.response.findMany({
          where: { companyId: c.id, NOT: { comment: null } },
          select: { comment: true, stars: true, createdAt: true },
          orderBy: { createdAt: 'desc' },
          take: this.COMMENTS_PER_COMPANY,
        });
        return [c.id, rows.map(r => ({ comment: r.comment as string, stars: r.stars, createdAt: r.createdAt }))] as const;
      }),
    );
    const commentsMap = new Map<string, Array<{ comment: string; stars: number; createdAt: Date }>>(commentsByCompany);

    // 5) montar resultado final
    const result: CompanyNpsReport[] = companies.map(c => {
      const agg = aggByCompany.get(c.id) ?? { total: 0, avgStars: null, lastAt: null };
      const stars = starsMap.get(c.id) ?? [];
      const lastResponseAt = agg.lastAt;
      const averageStars = agg.avgStars; 
      const starsRounded = averageStars == null ? null : Math.round(averageStars); 

      const { nps, counts, pct } = computeNps5(stars);

      return {
        companyId: c.id,
        company: c.name,
        nps,
        counts,
        pct,
        averageStars,
        starsRounded,
        lastResponseAt,
        comments: commentsMap.get(c.id) ?? [],
      };
    });

    return result;
  }

  async byCompany(companyId: string): Promise<CompanyNpsReport | null> {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
      select: { id: true, name: true },
    });
    if (!company) return null;

    const agg = await this.prisma.response.groupBy({
      by: ['companyId'],
      where: { companyId },
      _count: { _all: true },
      _avg: { stars: true },
      _max: { createdAt: true },
    });

    const total = agg[0]?._count._all ?? 0;
    const avgStars = agg[0]?._avg.stars ?? null;
    const lastAt = agg[0]?._max.createdAt ?? null;

    const rows = await this.prisma.response.findMany({
      where: { companyId },
      select: { stars: true },
    });
    const stars = rows.map(r => r.stars);
    const { nps, counts, pct } = computeNps5(stars);

    const commentsRows = await this.prisma.response.findMany({
      where: { companyId, NOT: { comment: null } },
      select: { comment: true, stars: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: this.COMMENTS_PER_COMPANY,
    });

    return {
      companyId: company.id,
      company: company.name,
      nps,
      counts,
      pct,
      averageStars: avgStars,
      starsRounded: avgStars == null ? null : Math.round(avgStars),
      lastResponseAt: lastAt,
      comments: commentsRows.map(r => ({ comment: r.comment as string, stars: r.stars, createdAt: r.createdAt })),
    };
  }
}

// provider token
export const NPS_REPORT_QUERY_PROVIDER = {
  provide: NPS_REPORT_QUERY,
  useClass: NpsReportPrismaQuery,
};
