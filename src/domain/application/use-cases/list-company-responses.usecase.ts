import { Inject, Injectable } from '@nestjs/common'
import { RESPONSE_REPO, ResponseRepository } from '../../application/ports/response.repository'

@Injectable()
export class ListCompanyResponsesUseCase {
  constructor(@Inject(RESPONSE_REPO) private responses: ResponseRepository) {}
  execute(companyId: string) {
    return this.responses.listByCompany(companyId)
  }
}
