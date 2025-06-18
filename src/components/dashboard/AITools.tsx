
import React, { useState } from 'react';
import { Sparkles, Wand2, Link, Plus, Calendar, Check, X, Brain, Zap, Target, Users, BarChart3, MessageSquare, TrendingUp, Bot } from 'lucide-react';
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
  aiScore: number;
  engagement: string;
}

const AITools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bulk' | 'link' | 'settings'>('bulk');
  const [contentIdeas, setContentIdeas] = useState<ContentIdea[]>([]);
  const [selectedAccount, setSelectedAccount] = useState('autofounderdog');
  const [isGenerating, setIsGenerating] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  // Enhanced mock content ideas with AI scoring
  const mockIdeas: ContentIdea[] = [
    {
      id: '1',
      title: 'RPA로 월 300만원 절약한 진짜 후기 - 스타트업 CEO 실제 경험담',
      content: '🚀 스타트업 운영하면서 반복 작업에 허덕이던 시간을 AI로 완전히 바꿨습니다.\n\n✅ 실제 자동화한 업무들:\n• 고객 문의 1차 분류 → 95% 정확도\n• 콘텐츠 스케줄링 → 주 40시간 → 3시간\n• 데이터 분석 리포트 → 일 8시간 → 30분\n\n💰 ROI 결과:\n• 인건비 절약: 월 300만원\n• 업무 효율성: 600% 증가\n• 실수율: 90% 감소\n\n어떤 도구를 어떻게 써서 이런 결과를 얻었는지, 구체적인 설정 방법까지 상세히 공유해드립니다. 댓글로 궁금한 점 물어보세요! 👇',
      selected: true,
      platform: 'threads',
      aiScore: 94,
      engagement: 'High'
    },
    {
      id: '2',
      title: '진짜 써본 자동화 툴 TOP 5 - 가성비순 완벽 분석',
      content: '💡 수십 개 자동화 툴을 직접 써보고 진짜 효과있는 것만 골랐습니다.\n\n🥇 1위: Zapier (월 2만원)\n• 연동 가능 앱: 5000+\n• 실제 활용도: ⭐⭐⭐⭐⭐\n• ROI: 투자대비 15배 수익\n\n🥈 2위: Make.com (월 1만원)\n• 복잡한 워크플로우 구성 가능\n• 시각적 인터페이스로 쉬운 설정\n• 개발자 없이도 고급 자동화 가능\n\n각 툴의 장단점, 실제 사용 후기, 그리고 어떤 비즈니스에 적합한지까지. 무료 대안도 함께 소개합니다.',
      selected: false,
      platform: 'threads',
      aiScore: 87,
      engagement: 'Medium'
    },
    {
      id: '3',
      title: '사업계획서 3시간 만에 완성하는 AI 워크플로우',
      content: '📊 사업계획서 작성에 2주씩 걸리시나요? AI로 3시간에 끝내는 방법 공개합니다.\n\n🤖 사용한 AI 도구들:\n• ChatGPT-4: 시장분석 & 경쟁사 리서치\n• Claude: 재무계획 및 수익모델 설계\n• Midjourney: 프레젠테이션용 인포그래픽\n• Notion AI: 문서 구조화 및 편집\n\n⚡ 3시간 워크플로우:\n1시간: AI로 시장조사 완료\n1시간: 재무모델 자동 생성\n1시간: 디자인 및 최종 검토\n\n실제 투자유치에 성공한 사업계획서 템플릿과 프롬프트까지 무료로 공유드립니다.',
      selected: false,
      platform: 'threads',
      aiScore: 91,
      engagement: 'High'
    },
    {
      id: '4',
      title: '콘텐츠 마케팅 완전 자동화 시스템 구축 A-Z',
      content: '📈 아이디어 발굴부터 성과 분석까지 모든 과정을 자동화했습니다.\n\n🔄 완전 자동화 시스템 구성:\n\n1️⃣ 아이디어 발굴\n• 트렌드 키워드 자동 수집\n• AI 기반 콘텐츠 아이디어 생성\n• 경쟁사 콘텐츠 분석 및 차별화\n\n2️⃣ 콘텐츠 제작\n• GPT-4로 초안 작성\n• 브랜드 톤앤매너 자동 적용\n• 이미지 자동 생성 및 편집\n\n3️⃣ 배포 & 관리\n• 최적 시간대 자동 포스팅\n• 댓글 모니터링 및 자동 응답\n• 성과 지표 실시간 트래킹\n\n결과: 콘텐츠 제작 시간 80% 단축, 참여율 300% 증가',
      selected: true,
      platform: 'threads',
      aiScore: 89,
      engagement: 'High'
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

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    return 'text-orange-600 bg-orange-50';
  };

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case 'High': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Brain className="h-8 w-8 text-purple-600" />
            <span>AI 마케팅 자동화</span>
          </h1>
          <p className="text-gray-600 mt-2">AI가 당신의 브랜드를 학습하고 자동으로 고품질 콘텐츠를 생성합니다</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span>AI 크레딧: 27/30</span>
          </div>
          <Badge variant="secondary" className="bg-green-50 text-green-700">
            자동화 활성
          </Badge>
        </div>
      </div>

      {/* AI 성능 지표 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">콘텐츠 적중률</p>
                <p className="text-lg font-bold text-blue-600">94.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">참여율 증가</p>
                <p className="text-lg font-bold text-green-600">+312%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">자동 답글률</p>
                <p className="text-lg font-bold text-purple-600">87.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-indigo-500" />
              <div>
                <p className="text-sm text-gray-600">시간 절약</p>
                <p className="text-lg font-bold text-indigo-600">92시간/월</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'bulk', label: '스마트 콘텐츠 대량 생성', icon: Sparkles },
            { id: 'link', label: 'AI 링크 변환 시스템', icon: Link },
            { id: 'settings', label: 'AI 학습 & 브랜드 설정', icon: Wand2 }
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
                <span>AI 기반 스마트 콘텐츠 대량 생성</span>
              </CardTitle>
              <p className="text-sm text-gray-600">
                브랜드 학습된 AI가 트렌드를 분석하고 고품질 콘텐츠를 자동 생성합니다. 
                각 콘텐츠는 참여율 예측 점수와 함께 제공됩니다.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    타겟 계정 선택 *
                  </label>
                  <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="autofounderdog">
                        autofounderdog (AI 자동화 전문 | 스타트업 CEO)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleGenerateIdeas}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white mt-6"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      AI 콘텐츠 생성중...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      고성과 콘텐츠 AI 생성
                    </>
                  )}
                </Button>
              </div>

              {contentIdeas.length > 0 && (
                <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-purple-200">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <span className="text-sm text-purple-800 font-medium">
                    AI가 분석한 고성과 콘텐츠 {contentIdeas.length}개 생성 완료
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Generated Ideas */}
          {contentIdeas.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>AI 생성 콘텐츠 (평균 성과 예측: 90.3점)</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      전체 선택 토글
                    </Button>
                    <Badge variant="secondary" className="bg-purple-50 text-purple-700">
                      {contentIdeas.filter(idea => idea.selected).length}/{contentIdeas.length} 선택됨
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {contentIdeas.map((idea) => (
                  <div key={idea.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <Checkbox
                      checked={idea.selected}
                      onCheckedChange={() => toggleIdeaSelection(idea.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium text-gray-900 leading-relaxed">{idea.title}</h3>
                        <div className="flex items-center space-x-2 ml-4">
                          <Badge variant="outline" className={`text-xs ${getScoreColor(idea.aiScore)}`}>
                            AI 점수: {idea.aiScore}
                          </Badge>
                          <Badge variant="outline" className={`text-xs ${getEngagementColor(idea.engagement)}`}>
                            {idea.engagement} 예상
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                          {idea.content}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            @{selectedAccount}
                          </Badge>
                          <Badge variant="outline" className="text-xs text-yellow-600 bg-yellow-50">
                            스케줄 대기중
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm" className="text-xs text-gray-500">
                            편집
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs text-red-500">
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Enhanced Schedule Section */}
                <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>스마트 스케줄링</span>
                      </h4>
                      <p className="text-sm text-gray-600">AI가 최적의 발행 시간을 자동으로 계산합니다</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Select defaultValue="smart">
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="smart">AI 최적 시간</SelectItem>
                          <SelectItem value="immediate">즉시 발행</SelectItem>
                          <SelectItem value="schedule">수동 예약</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input type="datetime-local" className="w-48" defaultValue="2025-06-19T04:07" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="auto-repost" />
                        <label htmlFor="auto-repost" className="text-sm text-gray-700">
                          자동 리포스트
                        </label>
                        <Select defaultValue="18hours">
                          <SelectTrigger className="w-36">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="18hours">18시간 후</SelectItem>
                            <SelectItem value="24hours">24시간 후</SelectItem>
                            <SelectItem value="48hours">48시간 후</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="auto-engage" />
                        <label htmlFor="auto-engage" className="text-sm text-gray-700">
                          자동 댓글 응답
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline">
                        스케줄 미리보기
                      </Button>
                      <Button 
                        onClick={handleBulkSchedule}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                      >
                        AI 최적화 발행
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
                <span>AI 링크 변환 시스템</span>
              </CardTitle>
              <p className="text-sm text-gray-600">
                URL을 입력하면 AI가 콘텐츠를 분석하고 브랜드에 맞는 고품질 포스트로 자동 변환합니다
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  변환할 콘텐츠 URL *
                </label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="유튜브, 블로그, 뉴스 기사 등의 URL을 입력하세요"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleLinkConvert}
                    disabled={!linkUrl.trim()}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                  >
                    <Wand2 className="h-4 w-4 mr-2" />
                    AI 변환 시작
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <BarChart3 className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <h3 className="font-medium text-blue-800">콘텐츠 분석</h3>
                  <p className="text-xs text-blue-600 mt-1">핵심 내용 추출 및 구조화</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Brain className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                  <h3 className="font-medium text-purple-800">브랜드 맞춤화</h3>
                  <p className="text-xs text-purple-600 mt-1">톤앤매너 및 스타일 적용</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <TrendingUp className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <h3 className="font-medium text-green-800">성과 최적화</h3>
                  <p className="text-xs text-green-600 mt-1">참여율 극대화 포맷 변환</p>
                </div>
              </div>
              
              <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                <Link className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm font-medium">URL을 입력하고 AI 변환을 시작하세요</p>
                <p className="text-xs text-gray-400 mt-2">
                  지원 형식: 유튜브, 블로그, 뉴스 기사, PDF, 웹페이지 등
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
                <span>AI 브랜드 학습 & 개인화 설정</span>
              </CardTitle>
              <p className="text-sm text-gray-600">
                AI가 당신의 브랜드를 깊이 학습하여 일관성 있는 고품질 콘텐츠를 생성하도록 설정하세요
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      브랜드 정체성 & 미션 *
                    </label>
                    <Textarea
                      placeholder="브랜드의 핵심 가치, 미션, 비전을 상세히 설명해주세요..."
                      className="min-h-32"
                      defaultValue="AI 자동화를 통해 중소기업과 스타트업의 생산성을 혁신적으로 향상시키는 것이 미션입니다. 복잡한 기술을 쉽게 접근할 수 있도록 하여, 모든 사업자가 AI의 혜택을 누릴 수 있도록 돕습니다."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      타겟 고객 페르소나
                    </label>
                    <Textarea
                      placeholder="주요 고객층의 특성, 니즈, 페인포인트를 구체적으로 기술해주세요..."
                      className="min-h-24"
                      defaultValue="30-45세 중소기업 대표, 스타트업 창업자. 기술에 관심은 있지만 전문 지식 부족. 비용 효율성과 실용성을 중시하며, 검증된 사례와 구체적인 ROI를 선호함."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      핵심 메시지 & 차별화 포인트
                    </label>
                    <Textarea
                      placeholder="경쟁사와 구별되는 핵심 메시지를 입력하세요..."
                      className="min-h-24"
                      defaultValue="'복잡한 AI를 쉽게' - 기술적 허들 없이 누구나 AI 자동화 혜택을 누릴 수 있도록. 실제 ROI와 구체적 성과 중심의 케이스 스터디 제공."
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      콘텐츠 톤앤매너 가이드 *
                    </label>
                    <Textarea
                      placeholder="원하는 글의 분위기, 어조, 스타일을 상세히 설명해주세요..."
                      className="min-h-32"
                      defaultValue="친근하면서도 전문적인 톤. 복잡한 개념을 쉬운 언어로 설명. 구체적인 수치와 실제 사례 중심. 이모지 적절히 활용하되 과하지 않게. 독자의 고민을 먼저 공감하고 해결책 제시하는 구조."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      주력 키워드 & 전문 분야
                    </label>
                    <Input
                      placeholder="AI, 자동화, 스타트업, 효율성..."
                      defaultValue="AI 자동화, RPA, 업무 효율화, 스타트업 운영, 마케팅 자동화, 데이터 분석, 생산성 향상, 비용 절감, 디지털 트랜스포메이션"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      피해야 할 키워드 & 표현
                    </label>
                    <Input
                      placeholder="사용하지 않을 키워드나 표현을 입력하세요"
                      defaultValue="완벽한, 100% 보장, 쉽게 억대, 부업, 투잡, 대박, 횡재"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CTA(행동 유도) 스타일
                    </label>
                    <Select defaultValue="question">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="question">질문형 (댓글로 궁금한 점 물어보세요)</SelectItem>
                        <SelectItem value="direct">직접형 (지금 바로 시작해보세요)</SelectItem>
                        <SelectItem value="soft">부드러운 제안형 (관심 있으시면 DM 주세요)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 flex items-center space-x-2">
                      <Bot className="h-5 w-5 text-purple-600" />
                      <span>고급 AI 학습 옵션</span>
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">더 정교한 브랜드 학습을 위한 추가 설정</p>
                  </div>
                  <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                    AI 학습 시작
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="competitor-analysis" />
                    <label htmlFor="competitor-analysis" className="text-sm text-gray-700">
                      경쟁사 콘텐츠 분석 학습
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="trend-learning" />
                    <label htmlFor="trend-learning" className="text-sm text-gray-700">
                      업계 트렌드 자동 학습
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="performance-optimization" />
                    <label htmlFor="performance-optimization" className="text-sm text-gray-700">
                      성과 기반 자동 최적화
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="audience-analysis" />
                    <label htmlFor="audience-analysis" className="text-sm text-gray-700">
                      오디언스 반응 패턴 학습
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AITools;
