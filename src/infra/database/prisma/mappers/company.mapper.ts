import { Company } from '@/domain/entities/company.entity';

type Row = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export const toDomainCompany = (c: Row): Company =>
  new Company(c.id, c.name, c.createdAt, c.updatedAt);
