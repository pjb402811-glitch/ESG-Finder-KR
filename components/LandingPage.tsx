import React, { useState, useEffect } from 'react';
import { ChevronRightIcon } from './Icons';
import { getUsageCount, isLimitReached, incrementUsageCount, DAILY_LIMIT } from '../services/storageService';

// A new SVG logo component inspired by the user-provided image.
// This is defined here to avoid creating new files.
const EsgLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="ESG Logo with a train"
  >
    <defs>
      <linearGradient id="globeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#4ade80', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#16a34a', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    
    {/* Globe shape with abstract pattern */}
    <circle cx="100" cy="100" r="90" fill="url(#globeGradient)" />
    <path
      fill="#fff"
      opacity="0.1"
      d="M100 10 A 90 90 0 0 1 155.1 34.6 L 100 100 Z M158.9 41.1 A 90 90 0 0 1 190 100 L 100 100 Z M188.9 108.9 A 90 90 0 0 1 145.4 165.4 L 100 100 Z M136.6 171.2 A 90 90 0 0 1 100 190 L 100 100 Z M91.1 188.9 A 90 90 0 0 1 34.6 145.4 L 100 100 Z M28.8 136.6 A 90 90 0 0 1 10 100 L 100 100 Z M11.1 91.1 A 90 90 0 0 1 54.6 34.6 L 100 100 Z M63.4 28.8 A 90 90 0 0 1 100 10 L 100 100 Z"
    />
     <path
      d="M60,120 Q80,90 130,80 Q150,110 140,140 L110,160 Z M70,60 Q90,50 110,65 L100,90 Z M130,100 Q140,90 150,100 L145,115 Z M40 80 L 60 70 L 70 90 Z"
      fill="white"
      opacity="0.2"
    />

    {/* Swoosh lines */}
    <path
      d="M30,90 C50,50 150,50 170,95"
      stroke="#a7f3d0"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
      transform="rotate(-5, 100, 100)"
    />
    <path
      d="M40,150 C60,190 140,190 160,140"
      stroke="#a7f3d0"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
      transform="rotate(5, 100, 100)"
    />

    {/* Text */}
    <text
      x="100"
      y="114"
      fontFamily="'M PLUS Rounded 1c', sans-serif"
      fontSize="40"
      fontWeight="800"
      fill="#f8fafc"
      textAnchor="middle"
      style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}
    >
      ESG
    </text>

    {/* Train graphic */}
    <g>
      <path
        d="M40,142 Q100,150 160,142"
        stroke="#a7f3d0"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M55,130 c5,-5 15,-5 20,0 l55,0 c10,0 10,10 0,10 l-75,0 z"
        fill="#f8fafc"
        style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))' }}
      />
    </g>
  </svg>
);


interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [usageCount, setUsageCount] = useState(0);

  useEffect(() => {
    setUsageCount(getUsageCount());

    // VERCEL DEPLOYMENT DEBUG: Check if the API key is available on the client.
    // This alert is for debugging purposes and can be removed after the issue is resolved.
    if (!process.env.VITE_API_KEY) {
      console.error("Vercel Environment Variable VITE_API_KEY is NOT set or not exposed to the client.");
      alert("배포 환경 설정 오류: AI 기능을 위한 API 키가 설정되지 않았습니다. Vercel 대시보드에서 'VITE_API_KEY' 환경 변수를 확인하고 다시 배포해주세요.");
    }
  }, []);

  const handleStartClick = () => {
    if (isLimitReached()) {
      alert(`일일 사용 횟수(${DAILY_LIMIT}회)를 초과하였습니다. 내일 다시 시도해주세요.`);
      return;
    }
    incrementUsageCount();
    setUsageCount(count => count + 1);
    onStart();
  };


  return (
    <>
      <div className="text-center py-12 sm:py-16">
        <div className="flex justify-center mb-8 animate-fade-in-down">
          <EsgLogo className="w-48 h-48 sm:w-56 sm:h-56" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight mb-4">
          AI가 귀사의 ESG 경영에 대해 진단·제언해 드립니다
        </h1>
        <p className="text-xl sm:text-2xl text-slate-400 max-w-3xl mx-auto mb-12">
          ( 귀사의 ESG경영 활동에 도움을 받아보세요)
        </p>
        
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleStartClick}
            className="w-full sm:w-auto flex items-center justify-center gap-4 bg-green-500 text-white font-bold py-8 px-16 text-3xl rounded-full hover:bg-green-600 transition-transform transform hover:scale-105 shadow-lg shadow-green-500/20"
          >
            ESG 자가진단 시작하기
            <ChevronRightIcon className="w-8 h-8" />
          </button>
          <div className="mt-4 text-slate-400 text-lg">
            금일 사용횟수: {usageCount} / {DAILY_LIMIT}
          </div>
        </div>

        <div className="mt-16 sm:mt-24 text-center">
            <p className="text-xl font-bold text-slate-400">국가철도공단</p>
            <p className="mt-2 text-lg text-slate-500">(문의 : 경영성과처 ESG 담당자 : 042-607-3160)</p>
        </div>
      </div>
    </>
  );
};

export default LandingPage;