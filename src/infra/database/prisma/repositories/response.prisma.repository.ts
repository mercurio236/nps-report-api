import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { toDomainResponse } from '../mappers/response.mapper';
import { RESPONSE_REPO, ResponseRepository } from '@/domain/application/ports/response.repository';

@Injectable()
export class ResponsePrismaRepository implements ResponseRepository {
  constructor(private prisma: PrismaService) {}
  async create(input: {
    companyId: string;
    stars: number;
    comment?: string | null;
  }) {
    const r = await this.prisma.response.create({ data: input });
    return toDomainResponse(r);
  }
  async listByCompany(companyId: string) {
    const list = await this.prisma.response.findMany({
      where: { companyId },
      orderBy: { createdAt: 'desc' },
    });
    return list.map(toDomainResponse);
  }
  async listStarsByCompany(companyId: string) {
    const list = await this.prisma.response.findMany({
      where: { companyId },
      select: { stars: true },
    });
    return list.map((x) => x.stars);
  }
}
export const RESPONSE_REPO_PROVIDER = {
  provide: RESPONSE_REPO,
  useClass: ResponsePrismaRepository,
};
