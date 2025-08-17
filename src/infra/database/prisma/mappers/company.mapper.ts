import { Company } from '@/domain/entities/company.entity';

type Row = {
  id: string;
  name: string;
  description: string | null;
  stars: number;
  createdAt: Date;
  updatedAt: Date;
};

export const toDomainCompany = (c: Row): Company =>
  new Company(c.id, c.name, c.description, c.stars, c.createdAt, c.updatedAt);
