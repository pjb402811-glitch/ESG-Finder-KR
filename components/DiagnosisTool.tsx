import React, { useState, useEffect } from 'react';
import { DiagnosisResult, QuantitativeData, AnySubQuestion, Indicator, PerformanceData, ESGTopic } from '../types';
import { INDICATORS, TOPIC_DETAILS } from '../constants';
import PerformanceManagementPage from './PerformanceManagementPage';

interface DiagnosisToolProps {
  onComplete: (result: DiagnosisResult) => void;
}

type DiagnosisTab = 'performance' | 'E' | 'S' | 'G' | 'finalize';

const DiagnosisTool: React.FC<DiagnosisToolProps> = ({ onComplete }) => {
  const [currentTab, setCurrentTab] = useState<DiagnosisTab>('performance');
  const [answers, setAnswers] = useState<Record<string, Record<string, string[]>>>({});
  const [quantitativeAnswers, setQuantitativeAnswers] = useState<QuantitativeData>({});
  const [performanceYears, setPerformanceYears] = useState(['2024', '2023', '2022']);
  const [performanceData, setPerformanceData] = useState<PerformanceData>({});
  const [companyName, setCompanyName] = useState('');

  // Fix: Add the missing handleTabClick function to manage tab state.
  const handleTabClick = (tab: DiagnosisTab) => {
    setCurrentTab(tab);
  };

  const TABS: { id: DiagnosisTab; name: string; color: string; hoverColor: string; }[] = [
    { id: 'performance', name: '주요 성과 DATA 입력', color: 'bg-slate-600', hoverColor: 'bg-slate-700' },
    { id: 'E', name: 'E 영역', color: 'bg-green-500', hoverColor: 'hover:bg-green-600' },
    { id: 'S', name: 'S 영역', color: 'bg-sky-500', hoverColor: 'hover:bg-sky-600' },
    { id: 'G', name: 'G 영역', color: 'bg-amber-500', hoverColor: 'hover:bg-amber-600' },
  ];

  const handleAnswerChange = (indicatorId: string, subQuestionId: string, optionId: string) => {
    setAnswers(prev => {
        const newAnswers = JSON.parse(JSON.stringify(prev));
        if (!newAnswers[indicatorId]) newAnswers[indicatorId] = {};
        
        const subQuestion = INDICATORS.find(i => i.id === indicatorId)?.subQuestions.find(sq => sq.id === subQuestionId);
        if (subQuestion?.type !== 'choice') return prev;

        const currentSelection = newAnswers[indicatorId][subQuestionId] || [];
        const option = subQuestion.options.find(opt => opt.id === optionId);

        if (subQuestion.allowMultiple) {
            let updatedSelection = [...currentSelection];
            if (option?.isExclusive) {
                updatedSelection = currentSelection.includes(optionId) ? [] : [optionId];
            } else {
                updatedSelection = updatedSelection.filter(id => !subQuestion.options.find(opt => opt.id === id)?.isExclusive);
                if (updatedSelection.includes(optionId)) {
                    updatedSelection = updatedSelection.filter(id => id !== optionId);
                } else {
                    updatedSelection.push(optionId);
                }
            }
            newAnswers[indicatorId][subQuestionId] = updatedSelection;
        } else {
            newAnswers[indicatorId][subQuestionId] = [optionId];
        }
        return newAnswers;
    });
  };

  const handleQuantitativeChange = (indicatorId: string, subQuestionId: string, year: string, key: string, value: string) => {
    setQuantitativeAnswers(prev => {
        const newData = JSON.parse(JSON.stringify(prev));
        if (!newData[indicatorId]) newData[indicatorId] = {};
        if (!newData[indicatorId][subQuestionId]) newData[indicatorId][subQuestionId] = [];
        
        let yearEntry = newData[indicatorId][subQuestionId].find(entry => entry.year === year);
        if (yearEntry) {
            yearEntry[key] = value;
        } else {
            const newEntry: { [key: string]: string } = { year };
            newEntry[key] = value;
            newData[indicatorId][subQuestionId].push(newEntry);
        }
        newData[indicatorId][subQuestionId].sort((a, b) => parseInt(b.year) - parseInt(a.year));
        return newData;
    });
  };

  const handlePerformanceYearChange = (index: number, value: string) => {
    const newYears = [...performanceYears];
    const oldYear = newYears[index];
    newYears[index] = value;
    setPerformanceYears(newYears);

    // Update data keys
    const newData = { ...performanceData };
    Object.keys(newData).forEach(category => {
        if ((newData as any)[category][oldYear] !== undefined) {
            (newData as any)[category][value] = (newData as any)[category][oldYear];
            delete (newData as any)[category][oldYear];
        }
    });
    setPerformanceData(newData);
  };

  const handlePerformanceDataChange = (category: string, year: string, value: string) => {
      setPerformanceData(prev => {
          const newData = { ...prev };
          // Fix: Cast to `any` to work around the rigid `PerformanceData` type, which doesn't support dynamic years.
          if (!(newData as any)[category]) {
              (newData as any)[category] = { [performanceYears[0]]: '', [performanceYears[1]]: '', [performanceYears[2]]: '' };
          }
          const newCategoryData = { ...(newData as any)[category] };
          newCategoryData[year] = value;
          (newData as any)[category] = newCategoryData;
          return newData;
      });
  };
  
  const calculateScores = (): { E: number; S: number; G: number; overall: number; } => {
    const topicScores: Record<ESGTopic, { totalPoints: number; maxPoints: number }> = {
      E: { totalPoints: 0, maxPoints: 0 },
      S: { totalPoints: 0, maxPoints: 0 },
      G: { totalPoints: 0, maxPoints: 0 }
    };

    INDICATORS.forEach(indicator => {
      // The new structure has one sub-question per indicator, and it's always 'choice'
      const subQuestion = indicator.subQuestions[0];
      if (subQuestion && subQuestion.type === 'choice') {
        // Calculate max possible points for this question (will be 1 for 'Yes')
        const maxQuestionPoints = Math.max(...subQuestion.options.map(o => o.points));
        topicScores[indicator.topic].maxPoints += maxQuestionPoints;

        const selectedOptionIds = answers[indicator.id]?.[subQuestion.id] || [];
        
        let points = 0;
        if (selectedOptionIds.length > 0) {
            points = selectedOptionIds.reduce((sum, optId) => {
                const option = subQuestion.options.find(o => o.id === optId);
                return sum + (option?.points || 0);
            }, 0);
        }
        // Unanswered questions will have empty selectedOptionIds, resulting in 0 points, which is correct.
        topicScores[indicator.topic].totalPoints += points;
      }
    });

    const eScore = topicScores.E.maxPoints > 0 ? (topicScores.E.totalPoints / topicScores.E.maxPoints) * 5 : 0;
    const sScore = topicScores.S.maxPoints > 0 ? (topicScores.S.totalPoints / topicScores.S.maxPoints) * 5 : 0;
    const gScore = topicScores.G.maxPoints > 0 ? (topicScores.G.totalPoints / topicScores.G.maxPoints) * 5 : 0;
    const overallScore = (eScore + sScore + gScore) / 3;

    return { E: eScore, S: sScore, G: gScore, overall: overallScore };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) {
      alert('기업명을 입력해주세요.');
      return;
    }
    const scores = calculateScores();
    const result: DiagnosisResult = {
      id: new Date().toISOString(), companyName,
      date: new Date().toLocaleDateString('ko-KR'), scores,
      suggestions: null, answers, quantitativeData: quantitativeAnswers,
      // Fix: Added the missing 'performanceData' property to conform to the DiagnosisResult type.
      performanceData: performanceData,
    };
    onComplete(result);
  };
  
  const renderQuantitativeInput = (indicator: Indicator, subQuestion: AnySubQuestion) => {
    if (subQuestion.type !== 'quantitative') return null;
    const data = quantitativeAnswers[indicator.id]?.[subQuestion.id] || [];

    return (
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
            <thead className="text-left text-slate-400">
                <tr>
                    <th className="p-2 font-semibold">연도</th>
                    {subQuestion.columns.map(col => <th key={col.key} className="p-2 font-semibold">{col.label} ({col.unit})</th>)}
                    {subQuestion.columns.map(col => <th key={`${col.key}-change`} className="p-2 font-semibold">전년대비 증감</th>)}
                </tr>
            </thead>
            <tbody>
            {subQuestion.years.map((year, index) => {
                const currentYearData = data.find(d => d.year === year);
                const prevYear = subQuestion.years[index + 1];
                const prevYearData = data.find(d => d.year === prevYear);
                
                return (
                    <tr key={year}>
                        <td className="p-2">
                           <input type="text" value={currentYearData?.year || year} onChange={e => handleQuantitativeChange(indicator.id, subQuestion.id, year, 'year', e.target.value)}
                                className="w-24 px-2 py-1 border border-slate-600 rounded-md bg-slate-700 text-slate-100 font-bold"/>
                        </td>
                        {subQuestion.columns.map(col => {
                            const currentValue = parseFloat(currentYearData?.[col.key] || '0');
                            const prevValue = parseFloat(prevYearData?.[col.key] || '0');
                            const change = currentValue - prevValue;
                            const percentageChange = prevValue !== 0 ? (change / prevValue) * 100 : 0;
                            const isPositive = change > 0;
                            const changeColor = change === 0 ? 'text-slate-500' : isPositive ? 'text-red-400' : 'text-blue-400';

                            return (
                                <React.Fragment key={col.key}>
                                    <td className="p-2">
                                        <input type="text" value={currentYearData?.[col.key] || ''} onChange={e => handleQuantitativeChange(indicator.id, subQuestion.id, year, col.key, e.target.value)}
                                            className="w-full px-2 py-1 border border-slate-600 rounded-md bg-slate-700 text-slate-100 font-bold"/>
                                    </td>
                                    <td className={`p-2 font-semibold ${changeColor}`}>
                                      {prevYearData?.[col.key] !== undefined ? `${change > 0 ? '+' : ''}${change.toLocaleString()} (${percentageChange.toFixed(1)}%)` : '-'}
                                    </td>
                                </React.Fragment>
                            )
                        })}
                    </tr>
                );
            })}
            </tbody>
        </table>
      </div>
    );
  };


  const renderContent = () => {
    if (currentTab === 'performance') {
        return <PerformanceManagementPage 
            isEmbedded 
            years={performanceYears}
            data={performanceData}
            onYearChange={handlePerformanceYearChange}
            onDataChange={handlePerformanceDataChange}
            />;
    }
    if (currentTab === 'finalize') {
        return (
            <div className="text-center py-16">
                <h2 className="text-3xl font-bold text-slate-100">진단이 모두 완료되었습니다.</h2>
                <p className="mt-4 text-slate-400">보고서 생성을 위해 기업명을 입력해주세요. 이 정보는 보고서 생성에만 사용됩니다.</p>
                <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center gap-4">
                    <input
                        type="text"
                        value={companyName}
                        onChange={e => setCompanyName(e.target.value)}
                        placeholder="기업명을 입력하세요"
                        className="w-full max-w-sm px-4 py-3 border border-slate-600 bg-slate-700 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                    />
                    <button type="submit" className="w-full max-w-sm bg-green-500 text-white font-bold py-3 px-8 rounded-full hover:bg-green-600 transition-transform transform hover:scale-105 shadow-lg shadow-green-500/20">
                        진단 보고서 생성
                    </button>
                </form>
            </div>
        );
    }

    const filteredIndicators = INDICATORS.filter(ind => ind.topic === currentTab);
    return (
        <div className="space-y-8">
            {filteredIndicators.map(indicator => (
                <div key={indicator.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <div className="flex items-start gap-3 mb-4">
                      <span className={`inline-block px-2.5 py-1 text-sm font-semibold text-white ${TOPIC_DETAILS[indicator.topic as ESGTopic].color.replace('text-', 'bg-').replace('-400', '-500')} rounded-full mt-1`}>{indicator.id}</span>
                      <h2 className="text-xl font-bold text-slate-100">{indicator.indicator}</h2>
                    </div>
                    {indicator.subQuestions.map(sq => (
                        <div key={sq.id} className="mt-6 border-t border-slate-700 pt-6 first:mt-0 first:border-t-0 first:pt-0">
                           <p className="font-semibold text-slate-300 mb-3">{sq.text}</p>
                           {sq.type === 'choice' && (
                               <div className="space-y-2">
                                   {sq.options.map(opt => (
                                       <label key={opt.id} className="flex items-center p-3 rounded-md cursor-pointer transition-colors hover:bg-slate-700/50 border border-transparent has-[:checked]:bg-green-500/10 has-[:checked]:border-green-500/50">
                                            <input
                                                type={sq.allowMultiple ? 'checkbox' : 'radio'}
                                                name={`${indicator.id}-${sq.id}`}
                                                checked={(answers[indicator.id]?.[sq.id] || []).includes(opt.id)}
                                                onChange={() => handleAnswerChange(indicator.id, sq.id, opt.id)}
                                                className="h-5 w-5 rounded-sm border-slate-500 bg-slate-700 text-green-500 focus:ring-green-500 focus:ring-offset-slate-800"
                                            />
                                           <span className="ml-3 text-slate-200">{opt.text}</span>
                                       </label>
                                   ))}
                               </div>
                           )}
                           {sq.type === 'quantitative' && renderQuantitativeInput(indicator, sq)}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
  };
  
  const isFinalStep = currentTab === 'G';

  return (
    <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-slate-100">ESG 자가진단</h1>
        </div>
      <div className="flex mb-4 bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`flex-1 p-4 font-bold text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 ${currentTab === tab.id ? `${tab.color} text-white` : `bg-slate-800 text-slate-400 ${tab.hoverColor} hover:text-white`}`}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="rounded-b-lg">
        {renderContent()}
      </div>
      <div className="mt-8 flex justify-between">
          <button onClick={() => {
              const currentIndex = TABS.findIndex(t => t.id === currentTab);
              if (currentIndex > 0) handleTabClick(TABS[currentIndex - 1].id);
          }}
          disabled={currentTab === 'performance'}
          className="bg-slate-700 text-slate-300 font-semibold py-2 px-6 rounded-lg border border-slate-600 disabled:opacity-50 hover:bg-slate-600"
          >
            이전 영역
          </button>
          <button onClick={() => {
             if (isFinalStep) {
                 handleTabClick('finalize');
             } else {
                 const currentIndex = TABS.findIndex(t => t.id === currentTab);
                 if (currentIndex < TABS.length - 1) handleTabClick(TABS[currentIndex + 1].id);
             }
          }}
          className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600"
          >
            {isFinalStep ? '진단 완료하기' : '다음 영역'}
          </button>
      </div>
    </div>
  );
};

export default DiagnosisTool;