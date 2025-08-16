import { Response } from '@/domain/entities/response.entity';

export abstract class ResponseRepository {
  abstract create(input: {
    companyId: string;
    stars: number;
    comment?: string | null;
  }): Promise<Response>;
  abstract listByCompany(companyId: string): Promise<Response[]>;
  abstract listStarsByCompany(companyId: string): Promise<number[]>;
}
export const RESPONSE_REPO = Symbol('RESPONSE_REPO');
