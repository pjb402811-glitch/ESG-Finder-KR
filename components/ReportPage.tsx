import React, { useState, useEffect, useRef } from 'react';
import { DiagnosisResult, ESGTopic, Indicator } from '../types';
import { generateSuggestions } from '../services/geminiService';
import { saveDiagnosis } from '../services/storageService';
import { TOPIC_DETAILS, INDICATORS } from '../constants';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import {
  LightBulbIcon,
  ArrowUturnLeftIcon,
  HomeIcon,
  ArrowPathIcon,
  CheckIcon,
  NoSymbolIcon,
  DownloadIcon,
  ClipboardListIcon,
  DocumentTextIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  InfoIcon,
} from './Icons';

interface ReportPageProps {
  result: DiagnosisResult;
  onBack: () => void;
  onGoHome: () => void;
  onSuggestionsGenerated: (updatedResult: DiagnosisResult) => void; // State lifting callback
}

const ScoreBar: React.FC<{ topic: ESGTopic; score: number }> = ({ topic, score }) => {
  const details = TOPIC_DETAILS[topic];
  const percentage = (score / 5) * 100;
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className={`font-bold text-lg ${details.color}`}>{details.name}</span>
        <span className={`font-semibold ${details.color}`}>{score.toFixed(1)} / 5.0</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2.5">
        <div className={`h-2.5 rounded-full ${details.barColor}`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

const UserAnswers: React.FC<{ result: DiagnosisResult }> = ({ result }) => {
    const [isOpen, setIsOpen] = useState(false);

    const findIndicator = (id: string): Indicator | undefined => INDICATORS.find(i => i.id === id);

    return (
        <div className="mt-8 bg-slate-800 rounded-2xl shadow-lg border border-slate-700">
            <button
                className="p-6 w-full flex justify-between items-center bg-slate-700/50 rounded-t-2xl user-answers-toggle-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-3">
                    <DocumentTextIcon className="w-8 h-8 text-slate-400" />
                    <h3 className="text-2xl font-bold text-slate-100">사용자 답변 상세 내역</h3>
                </div>
                {isOpen ? <ChevronUpIcon className="w-6 h-6 text-slate-400" /> : <ChevronDownIcon className="w-6 h-6 text-slate-400" />}
            </button>
            <div className={`user-answers-details ${isOpen ? '' : 'hidden'}`}>
                <div className="p-6 space-y-4">
                    {Object.entries(result.answers).map(([indicatorId, questions]) => {
                        const indicator = findIndicator(indicatorId);
                        if (!indicator) return null;
                        return (
                            <div key={indicatorId} className="p-4 border border-slate-700 rounded-lg bg-slate-900/50">
                                <p className="font-bold text-slate-300">{indicator.indicator}</p>
                                {Object.entries(questions).map(([sqId, answerIds]) => {
                                    const subQuestion = indicator.subQuestions.find(sq => sq.id === sqId);
                                    if (subQuestion?.type !== 'choice') return null;
                                    const answerTexts = answerIds.map(ansId => subQuestion.options.find(o => o.id === ansId)?.text).filter(Boolean);
                                    return (
                                        <div key={sqId} className="mt-2 pl-4">
                                            <p className="text-sm font-semibold text-slate-400">{subQuestion.text}</p>
                                            <p className="text-sm text-slate-200 pl-4">- {answerTexts.join(', ')}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

const ReportPage: React.FC<ReportPageProps> = ({ result, onBack, onGoHome, onSuggestionsGenerated }) => {
  // REMOVED: Local state for report data. Now uses the `result` prop as the single source of truth.
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reportContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      // Only fetch if suggestions don't already exist in the prop
      if (!result.suggestions) {
        setIsLoading(true);
        setError(null);
        
        try {
          saveDiagnosis(result); // Save initial result without suggestions
          const suggestions = await generateSuggestions(result);
          const updatedResult = { ...result, suggestions };
          saveDiagnosis(updatedResult); // Save final result with suggestions
          onSuggestionsGenerated(updatedResult); // <<-- Lift the final state up to the parent
        } catch (err) {
          console.error("Failed to generate suggestions:", err);
          setError("AI 제언 생성에 실패했습니다. 잠시 후 다시 시도해주세요.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchSuggestions();
  }, [result, onSuggestionsGenerated]);

  const { scores, suggestions } = result; // Use prop directly

  const chartData = [
    { topic: '환경 (E)', score: scores.E, fullMark: 5 },
    { topic: '사회 (S)', score: scores.S, fullMark: 5 },
    { topic: '지배구조 (G)', score: scores.G, fullMark: 5 },
  ];

  const handleDownloadReport = () => {
    if (!reportContentRef.current) return;

    const reportClone = reportContentRef.current.cloneNode(true) as HTMLElement;
    
    // Make user answers visible in the clone
    const userAnswersDetails = reportClone.querySelector('.user-answers-details');
    userAnswersDetails?.classList.remove('hidden');

    const userAnswersToggleButton = reportClone.querySelector('.user-answers-toggle-button');
    if (userAnswersToggleButton) {
      // Create a new static header div
      const staticHeader = document.createElement('div');
      staticHeader.className = 'p-6 w-full flex items-center gap-3 bg-slate-700/50 rounded-t-2xl';
      
      // Copy the title content from the button but without the chevron icon
      const titleContent = userAnswersToggleButton.querySelector('div.flex.items-center.gap-3');
      if (titleContent) {
        staticHeader.innerHTML = titleContent.innerHTML;
      }
      
      // Replace the interactive button with the new static header
      userAnswersToggleButton.parentNode?.replaceChild(staticHeader, userAnswersToggleButton);
    }

    const reportHtml = reportClone.innerHTML;
    const companyName = result.companyName || 'ESG_Report';
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${companyName} ESG 진단 보고서</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap');
          body { font-family: 'Noto Sans KR', sans-serif; background-color: #0f172a; color: #cbd5e1; }
          .no-print { display: none; }
        </style>
      </head>
      <body class="bg-slate-900 text-slate-300">
        <main class="container mx-auto px-4 py-8 sm:py-12">
          <div class="max-w-4xl mx-auto">
            ${reportHtml}
          </div>
        </main>
      </body>
      </html>
    `;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${companyName}_ESG_진단보고서.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderLoading = () => (
    <div className="text-center py-20 bg-slate-800 rounded-2xl shadow-lg animate-pulse">
        <div className="flex justify-center items-center gap-4">
            <ArrowPathIcon className="w-8 h-8 text-green-500 animate-spin" />
            <p className="text-xl font-semibold text-slate-300">AI가 맞춤형 진단 보고서를 생성하고 있습니다...</p>
        </div>
      <p className="mt-4 text-slate-400">잠시만 기다려주세요. 약 1~2분 정도 소요될 수 있습니다.</p>
    </div>
  );

  const renderError = () => (
    <div className="text-center py-20 bg-red-900/20 border border-red-500/30 rounded-2xl shadow-lg">
      <p className="text-xl font-semibold text-red-400">{error}</p>
      <button 
        onClick={onBack}
        className="mt-6 bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600 transition-colors"
      >
        진단으로 돌아가기
      </button>
    </div>
  );
  
  const renderSuggestions = () => (
    <>
      <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700">
          <div className="p-6 border-b border-slate-700 flex items-center gap-3 bg-slate-700/50 rounded-t-2xl">
              <ClipboardListIcon className="w-8 h-8 text-amber-400" />
              <h3 className="text-2xl font-bold text-slate-100">종합 전략 제언</h3>
          </div>
          <div className="p-6">
              <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {suggestions!.overallSummary}
              </p>
          </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700">
            <div className="p-6 border-b border-slate-700 flex items-center gap-3 bg-green-500/10 rounded-t-2xl">
                <CheckIcon className="w-8 h-8 text-green-400" />
                <h3 className="text-2xl font-bold text-slate-100">주요 강점</h3>
            </div>
            <div className="p-6">
                <ul className="space-y-3 text-slate-300 list-disc list-inside leading-relaxed">
                    {suggestions!.strengths.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </div>
        </div>
        <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700">
            <div className="p-6 border-b border-slate-700 flex items-center gap-3 bg-red-500/10 rounded-t-2xl">
                <NoSymbolIcon className="w-8 h-8 text-red-400" />
                <h3 className="text-2xl font-bold text-slate-100">주요 개선 영역</h3>
            </div>
            <div className="p-6">
                <ul className="space-y-3 text-slate-300 list-disc list-inside leading-relaxed">
                    {suggestions!.weaknesses.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </div>
        </div>
      </div>
      
      <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700">
          <div className="p-6 border-b border-slate-700 flex items-center gap-3 bg-slate-700/50 rounded-t-2xl">
              <ClipboardListIcon className="w-8 h-8 text-sky-400" />
              <h3 className="text-2xl font-bold text-slate-100">부문별 상세 분석</h3>
          </div>
          <div className="p-6 space-y-8">
              {(['E', 'S', 'G'] as ESGTopic[]).map(topic => (
                   <div key={topic} className={`p-6 rounded-xl border-2 ${TOPIC_DETAILS[topic].borderColor} ${TOPIC_DETAILS[topic].bgColor}`}>
                      <h4 className={`text-xl font-bold mb-4 ${TOPIC_DETAILS[topic].color}`}>{TOPIC_DETAILS[topic].name}</h4>
                      
                      <div className="mb-4">
                          <div className="inline-flex items-center gap-2 bg-slate-700 border border-slate-600 rounded-full px-4 py-1.5 mb-2">
                              <DocumentTextIcon className="w-5 h-5 text-slate-400" />
                              <p className="font-bold text-slate-200 text-md">현황 분석</p>
                          </div>
                          <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{suggestions!.detailedAnalysis[topic].currentStatus}</p>
                      </div>

                      <div>
                          <div className="inline-flex items-center gap-2 bg-slate-700 border border-slate-600 rounded-full px-4 py-1.5 mb-2">
                              <LightBulbIcon className="w-5 h-5 text-amber-400" />
                              <p className="font-bold text-slate-200 text-md">개선 제안</p>
                          </div>
                          <ul className="space-y-2 text-slate-300 list-disc list-inside pl-2">
                              {suggestions!.detailedAnalysis[topic].recommendations.map((item, index) => <li key={index} className="leading-relaxed">{item}</li>)}
                          </ul>
                      </div>
                   </div>
              ))}
          </div>
      </div>
    </>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-100">{result.companyName} ESG 진단 보고서</h2>
          <p className="text-slate-400 mt-1">진단 일자: {result.date}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
           <button onClick={onBack} className="flex items-center gap-2 bg-slate-700 text-slate-300 font-semibold py-2 px-4 rounded-lg border border-slate-600 hover:bg-slate-600 transition-colors">
             <ArrowUturnLeftIcon className="w-5 h-5" />
             다시 진단
           </button>
           <button onClick={onGoHome} className="flex items-center gap-2 bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
             <HomeIcon className="w-5 h-5" />
             홈으로
           </button>
           <button onClick={handleDownloadReport} className="flex items-center gap-2 bg-slate-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-500 transition-colors">
              <DownloadIcon className="w-5 h-5" />
              보고서 다운로드
            </button>
        </div>
      </div>
      
      <div className="my-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg flex items-center justify-center gap-3 text-center">
        <InfoIcon className="w-5 h-5 text-yellow-400 flex-shrink-0" />
        <p className="text-yellow-300 text-sm font-medium">
          '홈으로' 버튼을 클릭하면 기업의 정보보호를 위해 모든 정보 및 데이터가 삭제됩니다.
        </p>
      </div>

      <div ref={reportContentRef}>
        <div className="mb-8 p-8 bg-slate-800 rounded-2xl shadow-lg border border-slate-700">
          <h3 className="text-2xl font-bold text-center text-slate-100 mb-6">종합 진단 결과</h3>
          <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col items-center justify-center">
                  <div className="relative w-48 h-48">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                          <path className="text-slate-700" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path className="text-green-500"
                                strokeWidth="3"
                                strokeDasharray={`${(scores.overall/5)*100}, 100`}
                                strokeLinecap="round"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-4xl font-extrabold text-slate-100">{scores.overall.toFixed(1)}</span>
                          <span className="text-slate-400">/ 5.0</span>
                      </div>
                  </div>
                  <p className="mt-4 text-lg font-semibold text-slate-300">종합 점수</p>
              </div>
              <div className="w-full h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                          <PolarGrid stroke="#475569" />
                          <PolarAngleAxis dataKey="topic" tick={{ fill: '#cbd5e1', fontSize: 14 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: 'transparent' }} />
                          <Radar name={result.companyName} dataKey="score" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                          <Tooltip
                              contentStyle={{
                                  backgroundColor: '#1e293b',
                                  borderColor: '#334155',
                                  borderRadius: '0.5rem',
                              }}
                              labelStyle={{ color: '#f1f5f9', fontWeight: 'bold' }}
                          />
                      </RadarChart>
                  </ResponsiveContainer>
              </div>
          </div>
          <div className="mt-8 space-y-4">
              <ScoreBar topic="E" score={scores.E} />
              <ScoreBar topic="S" score={scores.S} />
              <ScoreBar topic="G" score={scores.G} />
          </div>
        </div>
        
        {isLoading && !suggestions && renderLoading()}
        {error && !isLoading && renderError()}
        {suggestions && !isLoading && !error && (
            <div className="space-y-8">
              {renderSuggestions()}
              <UserAnswers result={result} />
            </div>
        )}
      </div>
    </div>
  );
};

export default ReportPage;