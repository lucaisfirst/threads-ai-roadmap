
import React from 'react';
import { Calendar, BarChart3, MessageSquare, Search, Zap, Settings, User, Plus, CreditCard, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', icon: Calendar, label: '대시보드', color: 'text-blue-600' },
  { id: 'analytics', icon: BarChart3, label: '성과 분석', color: 'text-green-600' },
  { id: 'comments', icon: MessageSquare, label: '답글 관리', color: 'text-purple-600' },
  { id: 'search', icon: Search, label: '인기 스레드 상호작용', color: 'text-orange-600' },
  { id: 'ai-tools', icon: Zap, label: 'AI 기능', color: 'text-indigo-600' },
  { id: 'pricing', icon: CreditCard, label: '구독 관리', color: 'text-pink-600' },
  { id: 'support', icon: HelpCircle, label: '고객 지원', color: 'text-yellow-600' },
  { id: 'settings', icon: Settings, label: '사용 설정', color: 'text-gray-600' },
];

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="font-bold text-xl text-gray-900">Allmize</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200",
                isActive 
                  ? "bg-blue-50 text-blue-700 border border-blue-200" 
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive ? "text-blue-600" : item.color)} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Status Section */}
      <div className="p-4 space-y-3 border-t border-gray-100">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Zap className="h-4 w-4 text-purple-500" />
          <span>플랜: free-trial</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span>AI 크레딧: 21/30</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <User className="h-4 w-4 text-pink-500" />
          <span>연동 계정 수: 1/5</span>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">autofounderdog</p>
            <p className="text-xs text-gray-500">free-trial</p>
          </div>
        </div>
        
        <Button className="w-full mt-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          새 게시물
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
