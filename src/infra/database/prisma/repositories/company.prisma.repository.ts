import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { toDomainCompany } from '../mappers/company.mapper';
import {
  COMPANY_REPO,
  CompanyRepository,
} from '@/domain/application/ports/company.repository';
import { CreateCompanyUseCaseProps } from '@/domain/application/use-cases/create-company.usecase';
import { Prisma } from '@prisma/client';
import { Company } from '@/domain/entities/company.entity';
import { CompanyWithStarsRoundedDTO } from '@/domain/application/dto/company-with-stars-rounded.dto';

@Injectable()
export class CompanyPrismaRepository implements CompanyRepository {
  constructor(private prisma: PrismaService) {}

  async create(company: CreateCompanyUseCaseProps) {
    const exists = await this.prisma.company.findUnique({
      where: { name: company.name.trim() },
      select: { id: true },
    });

    if (exists) throw new ConflictException('Company name already exists');

    const c = await this.prisma.company.create({
      data: company,
    });

    return toDomainCompany(c);
  }

  async findById(id: string) {
    const c = await this.prisma.company.findUnique({ where: { id } });
    return c ? toDomainCompany(c) : null;
  }

  async findAll() {
    const list = await this.prisma.company.findMany({
      orderBy: { name: 'asc' },
      include: {
        responses: {
          select: {
            stars: true,
          },
        },
      },
    });
    return list.map(toDomainCompany);
  }

  async findAllWithAverageStars(): Promise<CompanyWithStarsRoundedDTO[]> {
    const companies = await this.prisma.company.findMany({
      select: { id: true, name: true, description: true },
      orderBy: { name: 'asc' },
    });

    if (companies.length === 0) return [];

    const aggs = await this.prisma.response.groupBy({
      by: ['companyId'],
      where: { companyId: { in: companies.map((c) => c.id) } },
      _avg: { stars: true },
    });

    const avgByCompany = new Map(
      aggs.map((a) => [a.companyId, a._avg.stars as number | null]),
    );

    return companies.map((c) => {
      const avg = avgByCompany.get(c.id);
      return {
        id: c.id,
        name: c.name,
        description: c.description ?? null,
        starsRounded: avg == null ? 0 : Math.round(avg),
      };
    });
  }

  async findOneWithAverageStars(
    id: string,
  ): Promise<CompanyWithStarsRoundedDTO | null> {
    const c = await this.prisma.company.findUnique({
      where: { id },
      select: { id: true, name: true, description: true },
    });
    if (!c) return null;

    const agg = await this.prisma.response.groupBy({
      by: ['companyId'],
      where: { companyId: id },
      _avg: { stars: true },
    });
    const avg = agg[0]?._avg.stars ?? null;

    return {
      id: c.id,
      name: c.name,
      description: c.description ?? null,
      starsRounded: avg == null ? 0 : Math.round(avg),
    };
  }
}

export const COMPANY_REPO_PROVIDER = {
  provide: COMPANY_REPO,
  useClass: CompanyPrismaRepository,
};
