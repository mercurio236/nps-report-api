import { Company } from '@/domain/entities/company.entity';
import { CreateCompanyUseCaseProps } from '../use-cases/create-company.usecase';
import { CompanyWithStarsRoundedDTO } from '../dto/company-with-stars-rounded.dto';

export abstract class CompanyRepository {
  abstract create(company: CreateCompanyUseCaseProps): Promise<Company>;
  abstract findById(id: string): Promise<Company | null>;
  abstract findAll(): Promise<Company[]>;
  abstract findAllWithAverageStars(): Promise<CompanyWithStarsRoundedDTO[]>;
  abstract findOneWithAverageStars(
    id: string,
  ): Promise<CompanyWithStarsRoundedDTO | null>;
}
export const COMPANY_REPO = Symbol('COMPANY_REPO');
