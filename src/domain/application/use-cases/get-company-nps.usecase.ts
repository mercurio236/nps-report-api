import { Inject, Injectable } from '@nestjs/common'
import { RESPONSE_REPO, ResponseRepository } from '../ports/response.repository'
import { computeNps5 } from '@/domain/services/nps.service'

@Injectable()
export class GetCompanyNpsUseCase {
  constructor(@Inject(RESPONSE_REPO) private responses: ResponseRepository) {}
  async execute(companyId: string) {
    const stars = await this.responses.listStarsByCompany(companyId)
    return computeNps5(stars)
  }
}
