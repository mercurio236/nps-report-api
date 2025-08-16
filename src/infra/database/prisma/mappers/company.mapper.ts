import { PrismaClient as PrismaCompany } from '@prisma/client';
import { Company } from '@/domain/entities/company.entity';

export const toDomainCompany = (c: PrismaCompany): Company =>
  new Company(c.id, c.name, c.createdAt, c.updatedAt);
