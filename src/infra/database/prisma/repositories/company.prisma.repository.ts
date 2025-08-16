import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { toDomainCompany } from '../mappers/company.mapper';
import {
  COMPANY_REPO,
  CompanyRepository,
} from '@/domain/application/ports/company.repository';

@Injectable()
export class CompanyPrismaRepository implements CompanyRepository {
  constructor(private prisma: PrismaService) {}
  async create(name: string) {
    const c = await this.prisma.company.create({ data: { name } });
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
