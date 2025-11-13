// Fix: Replaced placeholder content with the full implementation of the Header component.
import React from 'react';
import { View } from '../types';

interface HeaderProps {
  onNavigate: (view: View) => void;
  currentView: View;
}

const NavLink: React.FC<{
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}> = ({ onClick, isActive, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md text-xl font-medium transition-colors ${
      isActive
        ? 'bg-green-500 text-white'
        : 'text-slate-400 hover:bg-slate-700 hover:text-slate-100'
    }`}
  >
    {children}
  </button>
);

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  return (
    <header className="bg-slate-800/80 backdrop-blur-sm sticky top-0 z-40 border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span 
              className="text-xl font-bold text-slate-100 cursor-pointer" 
              onClick={() => onNavigate('landing')}
              aria-label="홈으로 이동"
            >
              ESG AI 파인더-KR
            </span>
          </div>
          <nav className="flex items-center gap-2 sm:gap-4">
            <NavLink onClick={() => onNavigate('landing')} isActive={currentView === 'landing'}>
              홈
            </NavLink>
            <NavLink onClick={() => onNavigate('diagnosis')} isActive={['diagnosis', 'report'].includes(currentView)}>
              자가진단
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
