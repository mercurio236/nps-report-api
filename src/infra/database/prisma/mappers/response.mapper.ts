import { PrismaClient as PrismaResponse } from '@prisma/client';
import { Response } from '@/domain/entities/response.entity';
import { Stars } from '@/domain/value-objects/stars.vo';

export const toDomainResponse = (r: PrismaResponse): Response =>
  new Response(
    r.id,
    r.companyId,
    Stars.create(r.stars),
    r.comment ?? null,
    r.createdAt,
  );
