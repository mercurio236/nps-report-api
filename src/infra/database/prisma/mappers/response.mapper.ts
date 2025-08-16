import { Prisma } from '@prisma/client';
import { Response } from '@/domain/entities/response.entity';
import { Stars } from '@/domain/value-objects/stars.vo';

type Row = {
  id: string
  companyId: string
  stars: number
  comment: string | null
  createdAt: Date
}

export const toDomainResponse = (r: Row): Response =>
  new Response(
    r.id,
    r.companyId,
    Stars.create(r.stars),
    r.comment ?? null,
    r.createdAt,
  );
