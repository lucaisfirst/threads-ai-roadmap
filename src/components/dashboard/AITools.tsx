
import React, { useState } from 'react';
import { Sparkles, Wand2, Link, Plus, Calendar, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface ContentIdea {
  id: string;
  title: string;
  content: string;
  selected: boolean;
  platform: 'threads' | 'instagram' | 'twitter';
}

const AITools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bulk' | 'link' | 'settings'>('bulk');
  const [contentIdeas, setContentIdeas] = useState<ContentIdea[]>([]);
  const [selectedAccount, setSelectedAccount] = useState('autofounderdog');
  const [isGenerating, setIsGenerating] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  // Mock content ideas
  const mockIdeas: ContentIdea[] = [
    {
      id: '1',
      title: 'RPA로 월 300만원 절약한 진짜 후기',
      content: '스타트업 운영하면서 반복 작업을 인간이던 시간을 얻어낸 실제 경험담을 공개합니다. 어떤 업무들을 자동화했고, 실제 ROI는 얼마였는지 구체적인 숫자와 함께...',
      selected: true,
      platform: 'threads'
    },
    {
      id: '2',
      title: '스타트업 대표가 말하는 진짜 필요한 자동화 툴',
      content: '수많은 자동화 툴 중에서 실제 비즈니스에 도움이 되는 몇 개만 골라서 소개합니다. 무료부터 유료까지, 각 소스의 활용법과 주의사항까지...',
      selected: false,
      platform: 'threads'
    },
    {
      id: '3',
      title: '사업계획서 100배이저할 3시간만에 완성하는 방법',
      content: '사업 자동화 툴을 활용해서 사업계획서 작성 시간의 90% 단축시킨 노하우 공개. 템플릿 작업 시간을 대폭 줄여서 내용에 집중할 수 있는 구체적인 방법...',
      selected: false,
      platform: 'threads'
    },
    {
      id: '4',
      title: '콘텐츠 마케팅 창의 자동화 시스템 구축기',
      content: '아이디어 발굴부터 콘텐츠 제작, 배포, 성과 분석까지 전 프로세스를 자동화했어요. 어떤 도구들을 연동했고, 어떤 업무를 자동화했는지 상세한 도구 가이드...',
      selected: true,
      platform: 'threads'
    }
  ];

  const handleGenerateIdeas = async () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setContentIdeas(mockIdeas);
      setIsGenerating(false);
    }, 2000);
  };

  const toggleIdeaSelection = (id: string) => {
    setContentIdeas(prev => 
      prev.map(idea => 
        idea.id === id ? { ...idea, selected: !idea.selected } : idea
      )
    );
  };

  const handleBulkSchedule = () => {
    const selectedIdeas = contentIdeas.filter(idea => idea.selected);
    console.log('Scheduling ideas:', selectedIdeas);
  };

  const handleLinkConvert = () => {
    console.log('Converting link:', linkUrl);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI 기능</h1>
          <p className="text-gray-600">AI를 활용해 콘텐츠를 생성하고 관리하세요</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'bulk', label: '콘텐츠 대량 발행', icon: Sparkles },
            { id: 'link', label: '링크 포스팅으로 변환', icon: Link },
            { id: 'settings', label: '계정 설정', icon: Wand2 }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  group inline-flex items-center px-1 py-4 border-b-2 font-medium text-sm
                  ${activeTab === tab.id 
                    ? 'border-purple-500 text-purple-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <Icon className={`-ml-0.5 mr-2 h-5 w-5 ${activeTab === tab.id ? 'text-purple-500' : 'text-gray-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bulk Content Generation */}
      {activeTab === 'bulk' && (
        <div className="space-y-6">
          {/* Header */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <span>스레드 콘텐츠 대량 발행</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">계정 선택 *</label>
                  <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="autofounderdog">autofounderdog (오늘룩 | AI 자동화 | 정부지원사업)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleGenerateIdeas}
                  disabled={isGenerating}
                  className="bg-purple-600 hover:bg-purple-700 text-white mt-6"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      콘텐츠 아이디어 생성중...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      콘텐츠 아이디어 생성하기
                    </>
                  )}
                </Button>
              </div>

              {contentIdeas.length > 0 && (
                <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-blue-800">콘텐츠 아이디어 보기</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Generated Ideas */}
          {contentIdeas.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>전체 선택 (0/4)</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    전체 확정 토글
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {contentIdeas.map((idea) => (
                  <div key={idea.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                    <Checkbox
                      checked={idea.selected}
                      onCheckedChange={() => toggleIdeaSelection(idea.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-2">
                      <h3 className="font-medium text-gray-900">{idea.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-3">{idea.content}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          @{selectedAccount}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Waiting Publish
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {/* Schedule Section */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">게시 설정</h4>
                      <p className="text-sm text-gray-600">선택된 콘텐츠의 발행 일정을 설정하세요</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Select defaultValue="immediate">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">즉시 발행</SelectItem>
                          <SelectItem value="schedule">예약 발행</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input type="datetime-local" className="w-48" defaultValue="2025-06-19T04:07" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="auto-repost" />
                      <label htmlFor="auto-repost" className="text-sm text-gray-700">
                        자동 리포스트
                      </label>
                      <Select defaultValue="18hours">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="18hours">18 시간 후 리포스트</SelectItem>
                          <SelectItem value="24hours">24 시간 후 리포스트</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline">
                        예약 발행
                      </Button>
                      <Button 
                        onClick={handleBulkSchedule}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        지금 발행
                      </Button>
                      <Button variant="outline">
                        취소
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Link to Post Conversion */}
      {activeTab === 'link' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Link className="h-5 w-5 text-purple-600" />
                <span>링크를 포스팅으로 변환</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">URL 입력</label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="변환하고 싶은 콘텐츠의 URL을 입력하세요"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleLinkConvert}
                    disabled={!linkUrl.trim()}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Wand2 className="h-4 w-4 mr-2" />
                    변환하기
                  </Button>
                </div>
              </div>
              
              <div className="text-center py-12 text-gray-500">
                <Link className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">URL을 입력하고 변환 버튼을 클릭하세요</p>
                <p className="text-xs text-gray-400 mt-1">
                  유튜브, 블로그, 뉴스 기사 등을 스레드 콘텐츠로 변환할 수 있습니다
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Account Settings */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wand2 className="h-5 w-5 text-purple-600" />
                <span>계정별 AI 설정</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">계정 소개</label>
                  <Textarea
                    placeholder="계정의 컨셉과 특성을 설명해주세요..."
                    className="min-h-24"
                    defaultValue="AI 자동화와 효율성에 관심이 많은 스타트업 대표입니다. 실제 경험을 바탕으로 한 실용적인 팁과 노하우를 공유합니다."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">글 작성 스타일</label>
                  <Textarea
                    placeholder="원하는 글 작성 스타일을 설명해주세요..."
                    className="min-h-24"
                    defaultValue="친근하면서도 전문적인 톤앤매너. 구체적인 수치와 실제 경험담을 포함한 실용적인 내용. 읽기 쉽게 단락을 나누고 이모지 적절히 활용."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">주요 키워드</label>
                  <Input
                    placeholder="AI, 자동화, 스타트업, 효율성, RPA, 생산성"
                    defaultValue="AI, 자동화, 스타트업, 효율성, RPA, 생산성, 마케팅, 비즈니스"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">금지 키워드</label>
                  <Input
                    placeholder="사용하지 않을 키워드들을 입력하세요"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <h3 className="font-medium text-gray-900">자동 콘텐츠 생성</h3>
                  <p className="text-sm text-gray-500">설정된 스타일에 따라 자동으로 콘텐츠를 생성합니다</p>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  설정 저장
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AITools;
