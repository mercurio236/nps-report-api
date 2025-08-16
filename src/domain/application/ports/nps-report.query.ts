export type CompanyNpsRow = {
  companyId: string;
  company: string;
  nps: number | null;
  counts: {
    promoters: number;
    passives: number;
    detractors: number;
    total: number;
  };
  pct: { promoters: number; passives: number; detractors: number };
};

export abstract class NpsReportQuery {
  abstract allCompanies(): Promise<CompanyNpsRow[]>;
}
export const NPS_REPORT_QUERY = Symbol('NPS_REPORT_QUERY');
