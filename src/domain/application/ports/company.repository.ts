import { Company } from '@/domain/entities/company.entity';

export abstract class CompanyRepository {
  abstract create(name: string): Promise<Company>;
  abstract findById(id: string): Promise<Company | null>;
  abstract findAll(): Promise<Company[]>;
}
export const COMPANY_REPO = Symbol('COMPANY_REPO');
