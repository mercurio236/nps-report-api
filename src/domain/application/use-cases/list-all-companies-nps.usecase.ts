import { Inject, Injectable } from '@nestjs/common'
import { NPS_REPORT_QUERY, NpsReportQuery } from '../ports/nps-report.query'

@Injectable()
export class ListAllCompaniesNpsUseCase {
  constructor(@Inject(NPS_REPORT_QUERY) private query: NpsReportQuery) {}
  execute() { return this.query.allCompanies() }
}
