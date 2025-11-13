import React from 'react';
// Fix: Corrected import path for constants
import { PERFORMANCE_INDICATORS } from '../constants';
import { PerformanceData } from '../types';

interface PerformanceManagementPageProps {
  isEmbedded?: boolean;
  years: string[];
  data: PerformanceData;
  onYearChange: (index: number, value: string) => void;
  onDataChange: (category: string, year: string, value: string) => void;
}

const PerformanceManagementPage: React.FC<PerformanceManagementPageProps> = ({ 
  isEmbedded = false,
  years,
  data,
  onYearChange,
  onDataChange,
}) => {
  
  const inputClasses = "w-28 px-2 py-1 border border-slate-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 bg-slate-700 text-slate-50 font-bold";
  
  return (
    <div className={!isEmbedded ? "max-w-7xl mx-auto" : ""}>
      {!isEmbedded && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-100">ESG 진단 컨설팅 필요 성과지표 목록</h2>
          <p className="mt-2 text-slate-400">
            원활한 ESG 컨설팅 진행을 위해 현장방문 전까지 아래의 자료를 작성하여 준비해주시기 바랍니다.
            <span className="text-red-400 font-semibold">(해당하는 지표만 입력, ex. 재생에너지 생산 없을 시 입력X)</span>
          </p>
        </div>
      )}

      <div className="bg-slate-800 rounded-2xl shadow-lg overflow-x-auto border border-slate-700">
        <table className="w-full text-sm text-left text-slate-400">
          <thead className="text-xs text-slate-400 uppercase bg-slate-700/50">
            <tr>
              <th scope="col" className="px-6 py-3 font-bold">No.</th>
              <th scope="col" className="px-6 py-3 font-bold">구분</th>
              <th scope="col" className="px-6 py-3 font-bold">단위</th>
              {years.map((year, index) => (
                <th key={index} scope="col" className="px-6 py-3 font-bold text-center">
                   <input
                      type="text"
                      value={year}
                      onChange={e => onYearChange(index, e.target.value)}
                      className={`${inputClasses} text-center`}
                      aria-label={`${index + 1}번째 연도`}
                    />
                </th>
              ))}
              <th scope="col" className="px-6 py-3 font-bold">비고</th>
            </tr>
          </thead>
          <tbody>
            {PERFORMANCE_INDICATORS.map(indicator => (
              <tr key={indicator.no} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50">
                <td className="px-6 py-4 font-medium text-slate-300">{indicator.no}</td>
                <td className="px-6 py-4 font-medium text-slate-200">{indicator.category}</td>
                <td className="px-6 py-4">{indicator.unit}</td>
                {years.map(year => (
                  <td key={year} className="px-6 py-4">
                    <input
                      type="text"
                      value={data[indicator.category]?.[year] || ''}
                      onChange={e => onDataChange(indicator.category, year, e.target.value)}
                      className={inputClasses}
                    />
                  </td>
                ))}
                <td className="px-6 py-4 text-xs">{indicator.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PerformanceManagementPage;