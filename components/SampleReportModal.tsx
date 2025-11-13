import React from 'react';
import { CloseIcon } from './Icons';

interface SampleReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Fix: The static sample report HTML is extracted into its own component for clarity and to fix JSX parsing errors.
// All 'class' attributes have been replaced with 'className'.
const SampleReportContent = () => (
  <div className="max-w-4xl mx-auto">
    <div className="mb-8 p-8 bg-slate-800 rounded-2xl shadow-lg border border-slate-700">
      <h3 className="text-2xl font-bold text-center text-slate-100 mb-6">종합 진단 결과</h3>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path className="text-slate-700" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
              <path className="text-green-500" strokeWidth="3" strokeDasharray="37.77777777777777, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-slate-100">1.9</span>
              <span className="text-slate-400">/ 5.0</span>
            </div>
          </div>
          <p className="mt-4 text-lg font-semibold text-slate-300">종합 점수</p>
        </div>
        <div className="w-full h-64 sm:h-80">
          <svg width="100%" height="100%" viewBox="0 0 399 320">
            <g className="recharts-polar-grid">
              <g className="recharts-polar-grid-concentric">
                <path stroke="#475569" fill="none" cx="199.5" cy="160" r="0" d="M 199.5,160L 199.5,160L 199.5,160Z"></path>
                <path stroke="#475569" fill="none" cx="199.5" cy="160" r="49.6" d="M 199.5,110.4L 242.45486002770815,184.8L 156.54513997229185,184.8Z"></path>
                <path stroke="#475569" fill="none" cx="199.5" cy="160" r="99.2" d="M 199.5,60.8L 285.4097200554163,209.6L 113.59027994458368,209.6Z"></path>
                <path stroke="#475569" fill="none" cx="199.5" cy="160" r="124" d="M 199.5,36L 306.88715006927043,222L 92.1128499307296,222Z"></path>
              </g>
              <g className="recharts-polar-grid-angle">
                <line stroke="#475569" cx="199.5" cy="160" x1="199.5" y1="160" x2="199.5" y2="36"></line>
                <line stroke="#475569" cx="199.5" cy="160" x1="199.5" y1="160" x2="306.88715006927043" y2="222"></line>
                <line stroke="#475569" cx="199.5" cy="160" x1="199.5" y1="160" x2="92.1128499307296" y2="222"></line>
              </g>
            </g>
            <g className="recharts-layer recharts-radar">
              <g className="recharts-layer recharts-radar-polygon">
                <path name="OOO " stroke="#22c55e" fill="#22c55e" fillOpacity="0.6" className="recharts-polygon" d="M199.5,118.66666666666667L242.45486002770815,184.8L156.54513997229185,184.8L199.5,118.66666666666667Z"></path>
              </g>
            </g>
            <g className="recharts-layer recharts-polar-radius-axis radiusAxis">
              <g className="recharts-layer recharts-polar-radius-axis-ticks">
                <text transform="rotate(60, 199.5, 160)" stroke="none" x="199.5" y="160" className="recharts-text recharts-polar-radius-axis-tick-value" textAnchor="start" fill="transparent"><tspan x="199.5" dy="0em">0</tspan></text>
                <text transform="rotate(60, 242.45486002770815, 135.2)" stroke="none" x="242.45486002770815" y="135.2" className="recharts-text recharts-polar-radius-axis-tick-value" textAnchor="start" fill="transparent"><tspan x="242.45486002770815" dy="0em">2</tspan></text>
                <text transform="rotate(60, 285.4097200554163, 110.4)" stroke="none" x="285.4097200554163" y="110.4" className="recharts-text recharts-polar-radius-axis-tick-value" textAnchor="start" fill="transparent"><tspan x="285.4097200554163" dy="0em">4</tspan></text>
                <text transform="rotate(60, 306.88715006927043, 98)" stroke="none" x="306.88715006927043" y="98" className="recharts-text recharts-polar-radius-axis-tick-value" textAnchor="start" fill="transparent"><tspan x="306.88715006927043" dy="0em">5</tspan></text>
              </g>
            </g>
            <g className="recharts-layer recharts-polar-angle-axis angleAxis">
              <path fill="none" className="recharts-polygon recharts-polar-angle-axis-line" d="M199.5,36L306.88715006927043,222L92.1128499307296,222L199.5,36Z"></path>
              <g className="recharts-layer recharts-polar-angle-axis-ticks">
                <g className="recharts-layer recharts-polar-angle-axis-tick"><text stroke="none" fontSize="14" x="199.5" y="28" className="recharts-text recharts-polar-angle-axis-tick-value" textAnchor="middle" fill="#cbd5e1"><tspan x="199.5" dy="0em">환경 (E)</tspan></text></g>
                <g className="recharts-layer recharts-polar-angle-axis-tick"><text stroke="none" fontSize="14" x="313.8153532995459" y="226" className="recharts-text recharts-polar-angle-axis-tick-value" textAnchor="start" fill="#cbd5e1"><tspan x="313.8153532995459" dy="0.355em">사회 (S)</tspan></text></g>
                <g className="recharts-layer recharts-polar-angle-axis-tick"><text stroke="none" fontSize="14" x="85.1846467004541" y="226" className="recharts-text recharts-polar-angle-axis-tick-value" textAnchor="end" fill="#cbd5e1"><tspan x="85.1846467004541" dy="0.355em">지배구조 (G)</tspan></text></g>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <div className="mt-8 space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1"><span className="font-bold text-lg text-green-400">환경 (Environment)</span><span className="font-semibold text-green-400">1.7 / 5.0</span></div>
          <div className="w-full bg-slate-700 rounded-full h-2.5"><div className="h-2.5 rounded-full bg-green-500" style={{width: "33.3333%"}}></div></div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-1"><span className="font-bold text-lg text-sky-400">사회 (Social)</span><span className="font-semibold text-sky-400">2.0 / 5.0</span></div>
          <div className="w-full bg-slate-700 rounded-full h-2.5"><div className="h-2.5 rounded-full bg-sky-500" style={{width: "40%"}}></div></div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-1"><span className="font-bold text-lg text-amber-400">지배구조 (Governance)</span><span className="font-semibold text-amber-400">2.0 / 5.0</span></div>
          <div className="w-full bg-slate-700 rounded-full h-2.5"><div className="h-2.5 rounded-full bg-amber-500" style={{width: "40%"}}></div></div>
        </div>
      </div>
    </div>
    <div className="space-y-8">
      <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700">
        <div className="p-6 border-b border-slate-700 flex items-center gap-3 bg-slate-700/50 rounded-t-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75c0-.231-.035-.454-.1-.664M6.75 7.5h1.5v-1.5h-1.5v1.5zm0 3h1.5v-1.5h-1.5v1.5zm0 3h1.5v-1.5h-1.5v1.5z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M6 21a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08H6.75A2.25 2.25 0 004.5 6.108v12.785c0 1.243 1.007 2.25 2.25 2.25z"></path></svg>
          <h3 className="text-2xl font-bold text-slate-100">종합 전략 제언</h3>
        </div>
        <div className="p-6"><p className="text-slate-300 whitespace-pre-wrap leading-relaxed">OOO 기업은 현재 ESG 경영 도입의 초기 단계에 있으며, 전반적인 ESG 점수(1.9/5.0)는 개선이 시급함을 보여줍니다. 환경 법규 준수, 차별 없는 고용, 이사회 내 ESG 안건 보고 등 일부 긍정적인 기초를 마련하고 있으나, 온실가스 관리, 안전보건 관리체계 구축, 표준근로계약서 작성, 윤리 및 정보보안 정책 수립 등 핵심적인 ESG 경영 시스템과 데이터 기반의 관리가 전반적으로 부재합니다. 지속가능한 성장을 위해서는 단편적인 활동을 넘어, 각 분야별 체계적인 정책 수립과 목표 설정, 그리고 실행 가능한 개선 과제들을 수립하고 이행하여 ESG를 기업의 핵심 경영 전략으로 통합하는 것이 시급합니다. 이를 통해 잠재적 리스크를 관리하고 새로운 비즈니스 기회를 모색해야 합니다.</p></div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700">
          <div className="p-6 border-b border-slate-700 flex items-center gap-3 bg-green-500/10 rounded-t-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path></svg>
            <h3 className="text-2xl font-bold text-slate-100">주요 강점</h3>
          </div>
          <div className="p-6">
            <ul className="space-y-3 text-slate-300 list-disc list-inside leading-relaxed">
              <li>환경 법규 준수: 최근 3년간 환경 관련 법규 위반 사실이 없어 기본적인 법규 준수 역량을 갖추고 있습니다.</li>
              <li>차별 없는 고용 및 안전보건 교육 실시: 채용 및 승진에서 성별, 학력, 연령 등에 따른 차별이 없으며, 전 직원을 대상으로 정기적인 안전보건 교육을 실시하여 직원의 인권과 안전을 위한 최소한의 노력을 기울이고 있습니다.</li>
              <li>이사회 내 ESG 감독 및 윤리 교육 실시: ESG 관련 안건이 이사회에 보고되고 있으며, 임직원을 대상으로 윤리 교육을 정기적으로 실시하여 투명하고 윤리적인 경영 기반을 마련하려는 의지를 보이고 있습니다.</li>
            </ul>
          </div>
        </div>
        <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700">
          <div className="p-6 border-b border-slate-700 flex items-center gap-3 bg-red-500/10 rounded-t-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
            <h3 className="text-2xl font-bold text-slate-100">주요 개선 영역</h3>
          </div>
          <div className="p-6">
            <ul className="space-y-3 text-slate-300 list-disc list-inside leading-relaxed">
              <li>환경 성과 관리 체계 부재: 온실가스 배출 현황 파악 및 감축 목표 설정, 에너지 절감 활동, 폐기물 관리 등 환경 성과 지표 관리 및 개선 활동이 전반적으로 미흡하여 환경 리스크에 대한 대응이 어렵습니다.</li>
              <li>핵심 인적 자원 관리 및 안전 시스템 미흡: 산업안전보건 관리체계가 미구축되어 있으며, 모든 직원과 표준근로계약서가 작성되지 않아 기본적인 근로권 보장 및 안전 관리 시스템이 취약하여 법적/운영적 리스크가 큽니다.</li>
              <li>기본적인 윤리 및 정보보안 정책 부재: 임직원 윤리강령 및 행동규범, 정보자산 보호를 위한 정보보안 정책이 수립되어 있지 않아 기업의 핵심 자산 보호와 윤리적 의사결정 기반이 취약하고 투명성이 부족합니다.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700">
        <div className="p-6 border-b border-slate-700 flex items-center gap-3 bg-slate-700/50 rounded-t-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-sky-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75c0-.231-.035-.454-.1-.664M6.75 7.5h1.5v-1.5h-1.5v1.5zm0 3h1.5v-1.5h-1.5v1.5zm0 3h1.5v-1.5h-1.5v1.5z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M6 21a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08H6.75A2.25 2.25 0 004.5 6.108v12.785c0 1.243 1.007 2.25 2.25 2.25z"></path></svg>
          <h3 className="text-2xl font-bold text-slate-100">부문별 상세 분석</h3>
        </div>
        <div className="p-6 space-y-8">
          <div className="p-6 rounded-xl border-2 border-green-500/50 bg-green-500/10">
            <h4 className="text-xl font-bold mb-4 text-green-400">환경 (Environment)</h4>
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 bg-slate-700 border border-slate-600 rounded-full px-4 py-1.5 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path></svg>
                <p className="font-bold text-slate-200 text-md">현황 분석</p>
              </div>
              <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">OOO 기업은 연간 에너지 사용량을 파악하고 있으며 최근 3년간 환경 관련 법규 위반 사실이 없다는 점은 긍정적입니다. 그러나 온실가스 배출 현황을 파악하고 있지 않으며, 연간 온실가스 감축 목표도 설정되어 있지 않습니다. 또한, 에너지 사용량 절감을 위한 고효율 장비 도입 등의 활동이 미흡하고, 폐기물 발생량 파악 및 재활용 노력이 부족하여 환경 경영 전반에 걸친 시스템적 접근이 미흡한 상태입니다. 기본적인 현황 파악은 이루어지고 있으나, 이를 바탕으로 한 구체적인 목표 설정과 실행 계획, 그리고 성과 관리가 부재합니다.</p>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-slate-700 border border-slate-600 rounded-full px-4 py-1.5 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                <p className="font-bold text-slate-200 text-md">개선 제안</p>
              </div>
              <ul className="space-y-2 text-slate-300 list-disc list-inside pl-2">
                <li className="leading-relaxed">온실가스 배출량 측정 및 감축 목표 설정: 우선 기업의 온실가스 배출원(Scope 1, 2)을 파악하고 연간 배출량을 측정하는 시스템을 구축해야 합니다. 이를 기반으로 단기 및 중장기 감축 목표를 수립하고, 목표 달성을 위한 세부 실행 계획을 마련해야 합니다. [사례] 중소 제조기업 B사는 외부 전문기관의 도움을 받아 배출량 산정 시스템을 구축하고, 비효율적인 설비 교체를 통해 1년 만에 탄소 배출량을 10% 감축하는 성과를 보였습니다.</li>
                <li className="leading-relaxed">에너지 효율 개선 및 폐기물 관리 체계 구축: 현재 파악하고 있는 에너지 사용량을 바탕으로 고효율 설비 도입 계획을 수립하고, 정기적인 에너지 진단을 통해 개선점을 찾아야 합니다. 또한, 폐기물 발생량을 파악하고, 재활용 가능한 폐기물 분리 배출 시스템을 강화하며 재활용률을 높이는 노력을 해야 합니다. [사례] 카페 C사는 고효율 냉난방 시스템으로 교체하고 다회용컵 사용 캠페인을 통해 에너지 비용을 절감하고 폐기물 발생량도 줄여 지역 사회에서 친환경 기업으로 인정받았습니다.</li>
                <li className="leading-relaxed">환경 경영 가이드라인 수립: ISO 14001 인증 수준은 아니더라도, 기업의 규모에 맞는 내부 환경 경영 가이드라인을 수립하여 환경 목표, 책임자, 실행 절차 등을 명문화하는 것이 필요합니다. 이를 통해 전 직원이 환경 경영에 대한 인식을 높이고 참여를 유도할 수 있습니다. [사례] IT 스타트업 D사는 자체적으로 '그린 오피스 가이드라인'을 수립하여 전 직원이 참여하는 자원 절약 및 친환경 구매 활동을 장려하며 환경 의식을 고취했습니다.</li>
              </ul>
            </div>
          </div>
          <div className="p-6 rounded-xl border-2 border-sky-500/50 bg-sky-500/10">
            <h4 className="text-xl font-bold mb-4 text-sky-400">사회 (Social)</h4>
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 bg-slate-700 border border-slate-600 rounded-full px-4 py-1.5 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path></svg>
                <p className="font-bold text-slate-200 text-md">현황 분석</p>
              </div>
              <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">OOO 기업은 전 직원을 대상으로 정기적인 안전보건 교육을 실시하고 있으며, 채용 및 승진 과정에서 차별이 없다는 점에서 긍정적입니다. 그러나 산업안전보건법에 따른 안전보건 관리체계가 아직 구축되지 않았고, 모든 직원과 표준근로계약서가 작성되지 않아 기본적인 근로 조건의 투명성과 안정성이 부족합니다. 또한, 주요 공급업체를 대상으로 ESG(환경, 인권 등) 관련 위험을 평가하지 않아 공급망 전반의 사회적 책임 관리 역량이 미흡한 상태입니다. 이는 잠재적인 법적, 평판 리스크로 작용할 수 있습니다.</p>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-slate-700 border border-slate-600 rounded-full px-4 py-1.5 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                <p className="font-bold text-slate-200 text-md">개선 제안</p>
              </div>
              <ul className="space-y-2 text-slate-300 list-disc list-inside pl-2">
                <li className="leading-relaxed">산업안전보건 관리체계 구축 및 강화: 산업안전보건법에 의거한 안전보건 관리체계를 구축하고, 정기적인 위험성 평가를 실시하여 잠재적 위험 요소를 식별하고 개선해야 합니다. 안전보건 담당자를 지정하고, 비상 대응 훈련을 포함한 체계적인 안전 프로그램을 운영해야 합니다. [사례] 건설 자재 공급 중소기업 E사는 안전보건 전담 인력을 배치하고 정기적인 위험성 평가 및 개선 활동을 통해 중대재해 제로화를 달성하고 안전 기업 이미지를 구축했습니다.</li>
                <li className="leading-relaxed">표준근로계약서 작성 의무화 및 인권 정책 수립: 모든 신규 및 기존 직원을 대상으로 표준근로계약서를 작성하고 교부하는 것을 의무화해야 합니다. 또한, 채용, 승진 외에도 임금, 복리후생, 근무 시간 등 전반적인 인사 관리에서 차별이 없도록 하는 인권 존중 정책을 수립하고 정기적으로 검토해야 합니다. [사례] 서비스업 F사는 모든 직원에 대한 표준근로계약서 작성 및 교부 의무를 준수하고, 근로기준법 교육을 정기적으로 실시하여 노사 상생 문화를 정착시켰습니다.</li>
                <li className="leading-relaxed">공급망 ESG 리스크 초기 진단 및 관리: 주요 공급업체를 대상으로 ESG 관련 위험을 평가하는 간단한 체크리스트를 개발하고, 납품 계약 시 이를 활용해야 합니다. 환경 오염, 아동 노동, 강제 노동 등 심각한 위험이 있는 공급망부터 우선적으로 파악하고 개선을 요구하는 단계를 시작해야 합니다. [사례] 식품 제조 중소기업 G사는 주요 원재료 공급업체에 대한 자체 ESG 체크리스트를 개발하여 납품 계약 시 활용하고, 잠재적 리스크를 사전에 파악하여 관리하고 있습니다.</li>
              </ul>
            </div>
          </div>
          <div className="p-6 rounded-xl border-2 border-amber-500/50 bg-amber-500/10">
            <h4 className="text-xl font-bold mb-4 text-amber-400">지배구조 (Governance)</h4>
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 bg-slate-700 border border-slate-600 rounded-full px-4 py-1.5 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path></svg>
                <p className="font-bold text-slate-200 text-md">현황 분석</p>
              </div>
              <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">OOO 기업은 임직원 대상 윤리 교육을 정기적으로 실시하고 ESG 관련 안건이 이사회에 보고되고 있다는 점에서 거버넌스 개선 의지를 보이고 있습니다. 그러나 임직원이 준수해야 할 윤리강령 또는 행동규범이 명확히 수립되어 있지 않으며, 기업의 정보자산을 보호하기 위한 정보보안 정책도 부재합니다. 또한, 기업 홈페이지 등을 통해 ESG 관련 활동이나 정보를 공개하고 있지 않아 이해관계자와의 투명한 소통이 부족한 상태입니다. 이는 기업의 신뢰도와 투명성에 부정적인 영향을 미칠 수 있습니다.</p>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-slate-700 border border-slate-600 rounded-full px-4 py-1.5 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                <p className="font-bold text-slate-200 text-md">개선 제안</p>
              </div>
              <ul className="space-y-2 text-slate-300 list-disc list-inside pl-2">
                <li className="leading-relaxed">기업 윤리강령 및 행동규범 수립 및 내재화: 임직원 모두가 준수해야 할 명확한 기업 윤리강령 또는 행동규범을 수립하고, 이를 임직원 교육을 통해 내재화해야 합니다. 더 나아가 윤리 위반 행위에 대한 익명 제보 시스템을 도입하여 투명하고 건전한 조직 문화를 조성해야 합니다. [사례] 유통업 중소기업 H사는 투명한 경영을 위해 윤리 강령을 제정하고 익명 제보 시스템을 도입하여 임직원의 부정행위를 사전에 방지하고 청렴한 조직 문화를 조성했습니다.</li>
                <li className="leading-relaxed">정보보안 정책 수립 및 정기적 교육 실시: 기업의 정보자산을 보호하기 위한 정보보안 정책(개인정보 보호, 데이터 보안, 시스템 접근 통제 등)을 수립해야 합니다. 임직원을 대상으로 정보보안 교육을 정기적으로 실시하고, 보안 시스템을 강화하여 정보 유출 및 사이버 공격에 대한 대비 태세를 갖추어야 합니다. [사례] 소프트웨어 개발사 I사는 정보보호 관리체계를 수립하고 정기적인 정보보안 교육 및 모의 해킹 훈련을 통해 고객 정보 유출 리스크를 최소화하고 신뢰도를 높였습니다.</li>
                <li className="leading-relaxed">ESG 정보 공개 및 소통 채널 구축: 기업 홈페이지 내에 '지속가능경영' 또는 'ESG 경영' 섹션을 신설하여 OOO의 ESG 비전, 주요 정책, 그리고 현재 진행 중인 환경, 사회, 지배구조 관련 활동 및 성과를 공개해야 합니다. 이는 이해관계자들과의 투명한 소통을 시작하는 중요한 단계입니다. [사례] 패션 스타트업 J사는 자사 홈페이지에 지속가능경영 페이지를 신설하여 친환경 소재 사용, 직원 복지 프로그램, 기부 활동 등 주요 ESG 활동 내역을 공개하며 고객과의 소통을 강화했습니다.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-slate-800 rounded-2xl shadow-lg border border-slate-700">
        <div className="p-6 w-full flex items-center gap-3 bg-slate-700/50 rounded-t-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path></svg>
          <h3 className="text-2xl font-bold text-slate-100">사용자 답변 상세 내역</h3>
        </div>
        <div className="user-answers-details">
          <div className="p-6 space-y-4">
            <div className="p-4 border border-slate-700 rounded-lg bg-slate-900/50"><p className="font-bold text-slate-300">온실가스 배출 현황 파악</p><div className="mt-2 pl-4"><p className="text-sm font-semibold text-slate-400">1. 온실가스 배출 현황을 파악하고 있습니까?</p><p className="text-sm text-slate-200 pl-4">- 아니오</p></div></div>
            <div className="p-4 border border-slate-700 rounded-lg bg-slate-900/50"><p className="font-bold text-slate-300">온실가스 감축 목표 설정</p><div className="mt-2 pl-4"><p className="text-sm font-semibold text-slate-400">2. 연간 온실가스 감축 목표를 정하고 있습니까?</p><p className="text-sm text-slate-200 pl-4">- 아니오</p></div></div>
            <div className="p-4 border border-slate-700 rounded-lg bg-slate-900/50"><p className="font-bold text-slate-300">에너지 사용량 파악</p><div className="mt-2 pl-4"><p className="text-sm font-semibold text-slate-400">3. 연간 에너지 사용량을 파악하고 있습니까?</p><p className="text-sm text-slate-200 pl-4">- 예</p></div></div>
            <div className="p-4 border border-slate-700 rounded-lg bg-slate-900/50"><p className="font-bold text-slate-300">에너지 절감 노력</p><div className="mt-2 pl-4"><p className="text-sm font-semibold text-slate-400">4. 에너지 사용량 절감을 위한 활동(고효율 장비 도입 등)을 하고 있습니까?</p><p className="text-sm text-slate-200 pl-4">- 아니오</p></div></div>
            <div className="p-4 border border-slate-700 rounded-lg bg-slate-900/50"><p className="font-bold text-slate-300">폐기물 관리</p><div className="mt-2 pl-4"><p className="text-sm font-semibold text-slate-400">5. 폐기물 발생량을 파악하고, 재활용을 위해 노력하고 있습니까?</p><p className="text-sm text-slate-200 pl-4">- 아니오</p></div></div>
            <div className="p-4 border border-slate-700 rounded-lg bg-slate-900/50"><p className="font-bold text-slate-300">환경 법규 준수</p><div className="mt-2 pl-4"><p className="text-sm font-semibold text-slate-400">6. 환경 관련 법규 및 규제를 위반한 사실이 최근 3년간 없습니까?</p><p className="text-sm text-slate-200 pl-4">- 예</p></div></div>
            <div className="p-4 border border-slate-700 rounded-lg bg-slate-900/50"><p className="font-bold text-slate-300">안전보건 관리체계 구축</p><div className="mt-2 pl-4"><p className="text-sm font-semibold text-slate-400">1. 산업안전보건법에 따른 안전보건 관리체계를 구축하였습니까?</p><p className="text-sm text-slate-200 pl-4">- 아니오</p></div></div>
            <div className="p-4 border border-slate-700 rounded-lg bg-slate-900/50"><p className="font-bold text-slate-300">안전보건 교육 실시</p><div className="mt-2 pl-4"><p className="text-sm font-semibold text-slate-400">2. 전 직원을 대상으로 정기적인 안전보건 교육을 실시하고 있습니까?</p><p className="text-sm text-slate-200 pl-4">- 예</p></div></div>
            <div className="p-4 border border-slate-700 rounded-lg bg-slate-900/50"><p className="font-bold text-slate-300">표준근로계약서 작성</p><div className="mt-2 pl-4"><p className="text-sm font-semibold text-slate-400">3. 모든 직원과 표준근로계약서를 작성하고 교부하였습니까?</p><p className="text-sm text-slate-200 pl-4">- 아니오</p></div></div>
            <div className="p-4 border border-slate-700 rounded-lg bg-slate-900/50"><p className="font-bold text-slate-300">차별 없는 고용</p><div className="mt-2 pl-4"><p className="text-sm font-semibold text-slate-400">4. 채용, 승진 등에서 성별, 학력, 연령 등에 따른 차별이 없습니까?</p><p className="text-sm text-slate-200 pl-4">- 예</p></div></div>
            <div className="p-4 border border-slate-700 rounded-lg bg-slate-900/50"><p className="font-bold text-slate-300">공급망 ESG 리스크 관리</p><div className="mt-2 pl-4"><p className="text-sm font-semibold text-slate-400">5. 주요 공급업체를 대상으로 ESG(환경, 인권 등) 관련 위험을 평가하고 있습니까?</p><p className="text-sm text-slate-200 pl-4">- 아니오</p></div></div>
            <div className="p-4 border border-slate-700 rounded-lg bg-slate-900/50"><p className="font-bold text-slate-300">기업 윤리 정책 수립</p><div className="mt-2 pl-4"><p className="text-sm font-semibold text-slate-400">1. 임직원이 준수해야 할 윤리강령 또는 행동규범이 있습니까?</p><p className="text-sm text-slate-200 pl-4">- 아니오</p></div></div>
            <div className="p-4 border border-slate-700 rounded-lg bg-slate-900/50"><p className="font-bold text-slate-300">윤리 교육 실시</p><div className="mt-2 pl-4"><p className="text-sm font-semibold text-slate-400">2. 임직원을 대상으로 윤리 교육을 정기적으로 실시하고 있습니까?</p><p className="text-sm text-slate-200 pl-4">- 예</p></div></div>
            <div className="p-4 border border-slate-700 rounded-lg bg-slate-900/50"><p className="font-bold text-slate-300">정보보안 정책 수립</p><div className="mt-2 pl-4"><p className="text-sm font-semibold text-slate-400">3. 기업의 정보자산을 보호하기 위한 정보보안 정책이 있습니까?</p><p className="text-sm text-slate-200 pl-4">- 아니오</p></div></div>
            <div className="p-4 border border-slate-700 rounded-lg bg-slate-900/50"><p className="font-bold text-slate-300">ESG 정보 공개</p><div className="mt-2 pl-4"><p className="text-sm font-semibold text-slate-400">4. 기업 홈페이지 등을 통해 ESG 관련 활동이나 정보를 공개하고 있습니까?</p><p className="text-sm text-slate-200 pl-4">- 아니오</p></div></div>
            <div className="p-4 border border-slate-700 rounded-lg bg-slate-900/50"><p className="font-bold text-slate-300">이사회 내 ESG 감독</p><div className="mt-2 pl-4"><p className="text-sm font-semibold text-slate-400">5. ESG 관련 안건이 이사회(또는 최고경영진)에 보고되고 있습니까?</p><p className="text-sm text-slate-200 pl-4">- 예</p></div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);


const SampleReportModal: React.FC<SampleReportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sample-report-title"
    >
      <div 
        className="bg-slate-900 rounded-2xl shadow-2xl max-w-4xl w-full h-[90vh] overflow-y-auto transform transition-all border border-slate-700" 
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-slate-900/80 backdrop-blur-sm p-4 border-b border-slate-700 flex justify-between items-center z-10">
            <h2 id="sample-report-title" className="text-xl font-bold text-slate-100">보고서 샘플</h2>
            <button onClick={onClose} className="p-1 rounded-full text-slate-500 hover:bg-slate-700 hover:text-slate-300" aria-label="닫기">
                <CloseIcon className="w-6 h-6" />
            </button>
        </div>
        
        <main className="container mx-auto px-4 py-8 sm:py-12">
          <SampleReportContent />
        </main>
      </div>
    </div>
  );
};

export default SampleReportModal;