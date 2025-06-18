
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ContentCalendar from '@/components/dashboard/ContentCalendar';
import AnalyticsDashboard from '@/components/dashboard/AnalyticsDashboard';
import CommentManager from '@/components/dashboard/CommentManager';
import AITools from '@/components/dashboard/AITools';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <ContentCalendar />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'comments':
        return <CommentManager />;
      case 'ai-tools':
        return <AITools />;
      case 'search':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">인기 스레드 상호작용</h1>
            <div className="text-center py-12 text-gray-500">
              <p>인기 스레드 검색 및 상호작용 기능이 곧 추가됩니다</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">사용 설정</h1>
            <div className="text-center py-12 text-gray-500">
              <p>설정 페이지가 곧 추가됩니다</p>
            </div>
          </div>
        );
      default:
        return <ContentCalendar />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
