import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { toDomainCompany } from '../mappers/company.mapper';
import {
  COMPANY_REPO,
  CompanyRepository,
} from '@/domain/application/ports/company.repository';
import { CreateCompanyUseCaseProps } from '@/domain/application/use-cases/create-company.usecase';
import { Prisma } from '@prisma/client';

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
    });
    return list.map(toDomainCompany);
  }
}
export const COMPANY_REPO_PROVIDER = {
  provide: COMPANY_REPO,
  useClass: CompanyPrismaRepository,
};
