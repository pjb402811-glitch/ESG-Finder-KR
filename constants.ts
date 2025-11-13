import { Indicator, PerformanceIndicator, PerformanceData, QuantitativeData } from './types';

export const TOPIC_DETAILS = {
  E: { name: '환경 (Environment)', color: 'text-green-400', borderColor: 'border-green-500/50', bgColor: 'bg-green-500/10', barColor: 'bg-green-500' },
  S: { name: '사회 (Social)', color: 'text-sky-400', borderColor: 'border-sky-500/50', bgColor: 'bg-sky-500/10', barColor: 'bg-sky-500' },
  G: { name: '지배구조 (Governance)', color: 'text-amber-400', borderColor: 'border-amber-500/50', bgColor: 'bg-amber-500/10', barColor: 'bg-amber-500' },
};

export const INDICATORS: Indicator[] = [
  // --- Environment ---
  {
    id: 'E01', topic: 'E', indicator: '온실가스 배출 현황 파악',
    subQuestions: [{ id: 'Q1', type: 'choice', text: '1. 온실가스 배출 현황을 파악하고 있습니까?', options: [{ id: 'opt1', text: '예', points: 1 }, { id: 'opt2', text: '아니오', points: 0 }] }],
  },
  {
    id: 'E02', topic: 'E', indicator: '온실가스 감축 목표 설정',
    subQuestions: [{ id: 'Q1', type: 'choice', text: '2. 연간 온실가스 감축 목표를 정하고 있습니까?', options: [{ id: 'opt1', text: '예', points: 1 }, { id: 'opt2', text: '아니오', points: 0 }] }],
  },
  {
    id: 'E03', topic: 'E', indicator: '에너지 사용량 파악',
    subQuestions: [{ id: 'Q1', type: 'choice', text: '3. 연간 에너지 사용량을 파악하고 있습니까?', options: [{ id: 'opt1', text: '예', points: 1 }, { id: 'opt2', text: '아니오', points: 0 }] }],
  },
  {
    id: 'E04', topic: 'E', indicator: '에너지 절감 노력',
    subQuestions: [{ id: 'Q1', type: 'choice', text: '4. 에너지 사용량 절감을 위한 활동(고효율 장비 도입 등)을 하고 있습니까?', options: [{ id: 'opt1', text: '예', points: 1 }, { id: 'opt2', text: '아니오', points: 0 }] }],
  },
  {
    id: 'E05', topic: 'E', indicator: '폐기물 관리',
    subQuestions: [{ id: 'Q1', type: 'choice', text: '5. 폐기물 발생량을 파악하고, 재활용을 위해 노력하고 있습니까?', options: [{ id: 'opt1', text: '예', points: 1 }, { id: 'opt2', text: '아니오', points: 0 }] }],
  },
  {
    id: 'E06', topic: 'E', indicator: '환경 법규 준수',
    subQuestions: [{ id: 'Q1', type: 'choice', text: '6. 환경 관련 법규 및 규제를 위반한 사실이 최근 3년간 없습니까?', options: [{ id: 'opt1', text: '예', points: 1 }, { id: 'opt2', text: '아니오', points: 0 }] }],
  },
  // --- Social ---
  {
    id: 'S01', topic: 'S', indicator: '안전보건 관리체계 구축',
    subQuestions: [{ id: 'Q1', type: 'choice', text: '1. 산업안전보건법에 따른 안전보건 관리체계를 구축하였습니까?', options: [{ id: 'opt1', text: '예', points: 1 }, { id: 'opt2', text: '아니오', points: 0 }] }],
  },
  {
    id: 'S02', topic: 'S', indicator: '안전보건 교육 실시',
    subQuestions: [{ id: 'Q1', type: 'choice', text: '2. 전 직원을 대상으로 정기적인 안전보건 교육을 실시하고 있습니까?', options: [{ id: 'opt1', text: '예', points: 1 }, { id: 'opt2', text: '아니오', points: 0 }] }],
  },
  {
    id: 'S03', topic: 'S', indicator: '표준근로계약서 작성',
    subQuestions: [{ id: 'Q1', type: 'choice', text: '3. 모든 직원과 표준근로계약서를 작성하고 교부하였습니까?', options: [{ id: 'opt1', text: '예', points: 1 }, { id: 'opt2', text: '아니오', points: 0 }] }],
  },
  {
    id: 'S04', topic: 'S', indicator: '차별 없는 고용',
    subQuestions: [{ id: 'Q1', type: 'choice', text: '4. 채용, 승진 등에서 성별, 학력, 연령 등에 따른 차별이 없습니까?', options: [{ id: 'opt1', text: '예', points: 1 }, { id: 'opt2', text: '아니오', points: 0 }] }],
  },
  {
    id: 'S05', topic: 'S', indicator: '공급망 ESG 리스크 관리',
    subQuestions: [{ id: 'Q1', type: 'choice', text: '5. 주요 공급업체를 대상으로 ESG(환경, 인권 등) 관련 위험을 평가하고 있습니까?', options: [{ id: 'opt1', text: '예', points: 1 }, { id: 'opt2', text: '아니오', points: 0 }] }],
  },
  // --- Governance ---
  {
    id: 'G01', topic: 'G', indicator: '기업 윤리 정책 수립',
    subQuestions: [{ id: 'Q1', type: 'choice', text: '1. 임직원이 준수해야 할 윤리강령 또는 행동규범이 있습니까?', options: [{ id: 'opt1', text: '예', points: 1 }, { id: 'opt2', text: '아니오', points: 0 }] }],
  },
  {
    id: 'G02', topic: 'G', indicator: '윤리 교육 실시',
    subQuestions: [{ id: 'Q1', type: 'choice', text: '2. 임직원을 대상으로 윤리 교육을 정기적으로 실시하고 있습니까?', options: [{ id: 'opt1', text: '예', points: 1 }, { id: 'opt2', text: '아니오', points: 0 }] }],
  },
  {
    id: 'G03', topic: 'G', indicator: '정보보안 정책 수립',
    subQuestions: [{ id: 'Q1', type: 'choice', text: '3. 기업의 정보자산을 보호하기 위한 정보보안 정책이 있습니까?', options: [{ id: 'opt1', text: '예', points: 1 }, { id: 'opt2', text: '아니오', points: 0 }] }],
  },
  {
    id: 'G04', topic: 'G', indicator: 'ESG 정보 공개',
    subQuestions: [{ id: 'Q1', type: 'choice', text: '4. 기업 홈페이지 등을 통해 ESG 관련 활동이나 정보를 공개하고 있습니까?', options: [{ id: 'opt1', text: '예', points: 1 }, { id: 'opt2', text: '아니오', points: 0 }] }],
  },
  {
    id: 'G05', topic: 'G', indicator: '이사회 내 ESG 감독',
    subQuestions: [{ id: 'Q1', type: 'choice', text: '5. ESG 관련 안건이 이사회(또는 최고경영진)에 보고되고 있습니까?', options: [{ id: 'opt1', text: '예', points: 1 }, { id: 'opt2', text: '아니오', points: 0 }] }],
  },
];

export const PERFORMANCE_INDICATORS: PerformanceIndicator[] = [
  // --- Environment ---
  { no: 1, category: "온실가스 배출량", unit: "tCO2-eq", notes: "Scope 1 + Scope 2" },
  { no: 2, category: "에너지 사용량", unit: "MWh", notes: "전력, 가스 등" },
  { no: 3, category: "재생에너지 생산량", unit: "MWh", notes: "" },
  { no: 4, category: "재생에너지 사용량", unit: "MWh", notes: "" },
  { no: 5, category: "용수 사용량", unit: "톤", notes: "" },
  { no: 6, category: "폐수 배출량", unit: "톤", notes: "" },
  { no: 7, category: "폐기물 배출량", unit: "톤", notes: "생활+사업장" },
  { no: 8, category: "폐기물 재활용량", unit: "톤", notes: "" },
  { no: 9, category: "대기오염물질 배출량", unit: "kg", notes: "NOx, SOx 등" },
  // --- Social ---
  { no: 10, category: "총 임직원 수", unit: "명", notes: "정규직+비정규직" },
  { no: 11, category: "여성 임직원 수", unit: "명", notes: "" },
  { no: 12, category: "여성 관리자 수", unit: "명", notes: "" },
  { no: 13, category: "신규 채용 인원", unit: "명", notes: "" },
  { no: 14, category: "퇴사 인원", unit: "명", notes: "" },
  { no: 15, category: "산업재해 발생 건수", unit: "건", notes: "" },
  { no: 16, category: "임직원 교육 시간", unit: "시간/인", notes: "총 교육시간 / 총 임직원" },
  { no: 17, category: "사회공헌 활동 금액", unit: "백만원", notes: "" },
  // --- Governance ---
  { no: 18, category: "이사회 개최 횟수", unit: "회", notes: "" },
  { no: 19, category: "이사회 참석률", unit: "%", notes: "" },
  { no: 20, category: "윤리 교육 이수 임직원 비율", unit: "%", notes: "" },
];
