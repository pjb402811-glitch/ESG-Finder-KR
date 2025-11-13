import React, { Fragment } from 'react';
import { LeafIcon, UsersIcon, ScaleIcon, CloseIcon } from './Icons';

interface ESGGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Fix: Correctly typed the icon prop to allow passing a className, resolving the React.cloneElement error.
const GuideSection: React.FC<{ icon: React.ReactElement<{ className?: string }>; title: string; color: string; iconColor: string; children: React.ReactNode }> = ({ icon, title, color, iconColor, children }) => (
  <div className="flex gap-4">
    <div className={`mt-1 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${color}`}>
      {React.cloneElement(icon, { className: `w-5 h-5 ${iconColor}` })}
    </div>
    <div>
      <h4 className="font-bold text-lg text-slate-100">{title}</h4>
      <p className="text-slate-400">{children}</p>
    </div>
  </div>
);

const ESGGuideModal: React.FC<ESGGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 transform transition-all border border-slate-700" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-100">ESG 개념 알아보기</h2>
            <p className="mt-1 text-slate-400">ESG는 기업의 지속가능성을 평가하는 핵심 요소입니다.</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-500 hover:bg-slate-700 hover:text-slate-300">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="mt-6 space-y-6">
          <GuideSection icon={<LeafIcon />} title="E (Environment) - 환경" color="bg-green-900/50" iconColor="text-green-400">
            기업이 환경에 미치는 영향을 관리하는 것을 의미합니다. 탄소 배출량, 자원 사용, 폐기물 관리 등 환경 보호를 위한 노력이 포함됩니다.
          </GuideSection>
          <GuideSection icon={<UsersIcon />} title="S (Social) - 사회" color="bg-sky-900/50" iconColor="text-sky-400">
            기업이 사회와 맺는 관계를 다룹니다. 임직원의 안전과 인권, 공급망 관리, 지역사회 공헌 등 사회적 책임을 다하는 활동입니다.
          </GuideSection>
          <GuideSection icon={<ScaleIcon />} title="G (Governance) - 지배구조" color="bg-amber-900/50" iconColor="text-amber-400">
            기업의 의사결정 방식과 투명성을 의미합니다. 건전한 이사회 구조, 윤리 경영, 투명한 정보 공개 등을 통해 신뢰를 구축하는 것입니다.
          </GuideSection>
        </div>

        <div className="mt-8 text-right">
          <button 
            onClick={onClose}
            className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition-colors"
          >
            이해했습니다
          </button>
        </div>
      </div>
    </div>
  );
};

export default ESGGuideModal;