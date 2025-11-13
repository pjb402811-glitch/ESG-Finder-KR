
import React, { useState, useEffect } from 'react';
import { DiagnosisResult } from '../types';
import { getDiagnoses } from '../services/storageService';
import { EyeIcon, CalendarIcon, BuildingIcon } from './Icons';

interface HistoryPageProps {
  onViewReport: (result: DiagnosisResult) => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ onViewReport }) => {
  const [results, setResults] = useState<DiagnosisResult[]>([]);

  useEffect(() => {
    // Sort by most recent first
    const savedResults = getDiagnoses().sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime());
    setResults(savedResults);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-slate-100 mb-6">나의 진단 기록</h2>
      
      {results.length === 0 ? (
        <div className="text-center py-16 bg-slate-800 rounded-2xl shadow-lg border border-slate-700">
          <p className="text-slate-400 text-lg">아직 저장된 진단 기록이 없습니다.</p>
          <p className="mt-2 text-slate-500">첫 진단을 완료하고 결과를 저장해보세요!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map(result => (
            <div key={result.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 transition-all hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                    <BuildingIcon className="w-5 h-5 text-slate-400" />
                    <h3 className="text-xl font-bold text-slate-100">{result.companyName}</h3>
                </div>
                <div className="flex items-center text-sm text-slate-400 gap-4">
                    <span className="flex items-center gap-1.5"><CalendarIcon className="w-4 h-4" /> {result.date}</span>
                    <span>종합점수: <span className="font-bold text-green-400">{result.scores.overall.toFixed(1)}</span></span>
                </div>
              </div>
              <button 
                onClick={() => onViewReport(result)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-700 text-slate-300 font-semibold py-2 px-5 rounded-lg hover:bg-slate-600 transition-colors"
              >
                <EyeIcon className="w-5 h-5"/>
                보고서 보기
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;