// Fix: Replaced placeholder content with the full implementation of all required types.
export type View = 'landing' | 'diagnosis' | 'report';

export type ESGTopic = 'E' | 'S' | 'G';

export interface ChoiceOption {
  id: string;
  text: string;
  points: number;
  isExclusive?: boolean;
}

export interface ChoiceSubQuestion {
  id: string;
  type: 'choice';
  text: string;
  allowMultiple?: boolean;
  options: ChoiceOption[];
}

export interface QuantitativeDataRow {
    year: string;
    [key: string]: string;
}

export interface QuantitativeInputColumn {
    key: string;
    label: string;
    unit: string;
}

export interface QuantitativeSubQuestion {
  id: string;
  type: 'quantitative';
  text: string;
  years: string[];
  columns: QuantitativeInputColumn[];
}

export type AnySubQuestion = ChoiceSubQuestion | QuantitativeSubQuestion;

export interface Indicator {
  id: string;
  topic: ESGTopic;
  indicator: string;
  subQuestions: AnySubQuestion[];
}

export interface PerformanceIndicator {
  no: number;
  category: string;
  unit: string;
  notes: string;
}

export type PerformanceData = Record<string, Record<string, string>>;

export type QuantitativeData = Record<string, Record<string, QuantitativeDataRow[]>>;

export interface ReportSuggestions {
    overallSummary: string;
    strengths: string[];
    weaknesses: string[];
    detailedAnalysis: {
        E: { currentStatus: string; recommendations: string[]; };
        S: { currentStatus: string; recommendations: string[]; };
        G: { currentStatus: string; recommendations: string[]; };
    };
}

export interface DiagnosisResult {
  id: string;
  companyName: string;
  date: string;
  scores: {
    E: number;
    S: number;
    G: number;
    overall: number;
  };
  suggestions: ReportSuggestions | null;
  answers: Record<string, Record<string, string[]>>;
  quantitativeData: QuantitativeData;
  performanceData: PerformanceData;
}