import { Company } from '@/domain/entities/company.entity';
import { CreateCompanyUseCaseProps } from '../use-cases/create-company.usecase';

export abstract class CompanyRepository {
  abstract create(company: CreateCompanyUseCaseProps): Promise<Company>;
  abstract findById(id: string): Promise<Company | null>;
  abstract findAll(): Promise<Company[]>;
}
export const COMPANY_REPO = Symbol('COMPANY_REPO');
