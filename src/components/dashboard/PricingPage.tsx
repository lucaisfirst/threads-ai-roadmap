
import React, { useState } from 'react';
import { Check, X, Star, Calendar, Zap, Shield, Users, BarChart3, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const PricingPage: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: '스탠다드',
      price: billingPeriod === 'monthly' ? 25 : 250,
      period: billingPeriod === 'monthly' ? '월' : '연',
      originalPrice: billingPeriod === 'yearly' ? 300 : null,
      discount: billingPeriod === 'yearly' ? '17% 할인' : null,
      description: 'AI 기반의 SNS 계정을 완전 자동화하세요. 마케팅 워크플로우 5% 마음에 드는 것만 자동화',
      features: [
        { name: '계정당 완전 자동화 운영', included: true },
        { name: 'AI 자동 콘텐츠 생성 무제한', included: true },
        { name: 'AI 자동 댓글 관리', included: true },
        { name: '성과 분석 및 리포팅 대시보드', included: true },
        { name: '최대 3개 계정까지 학습 가능', included: true },
        { name: '스레드 마케팅 컨설팅', included: false },
        { name: '리포스팅 부스트 알고리즘', included: false }
      ],
      popular: false,
      buttonText: '구독하기',
      buttonColor: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  const freeTrialFeatures = [
    '스탠다드 플랜 모든 기능 포함',
    '계정 무제한 연동',
    '스레드 마케팅 컨설팅 지원',
    '초고수 부스트 알고리즘',
    '빌링/소훚형 OSMU 기능',
    'API 접근 및 커스텀 통합',
    '전담 계정 관리자 배정'
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">합리적인 가격으로 시작하세요</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          계정당 월 $25로 당신의 SNS 계정을 완전 자동화하세요. AI가 콘텐츠 생성부터 운영까지, 마치 전담 마케팅 대행사처럼 관리해드립니다.
        </p>
      </div>

      {/* 2주일 무료 체험 배너 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white text-center">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <Star className="h-6 w-6" />
          <h2 className="text-xl font-bold">2주일 무료 체험 중</h2>
        </div>
        <p className="mb-2">현재 2주일 무료 체험을 이용 중입니다.</p>
        <p className="text-sm opacity-90">AI가 자동으로 계정을 키우고 마케팅하는 모든 기능을 사용할 수 있습니다.</p>
        <div className="flex items-center justify-center space-x-2 mt-3">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">2025. 6. 18. ~ 2025. 7. 2.</span>
        </div>
      </div>

      {/* 빌링 주기 선택 */}
      <div className="flex justify-center">
        <div className="bg-gray-100 rounded-lg p-1 flex">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingPeriod === 'monthly' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            월간
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingPeriod === 'yearly' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            연간
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* 스탠다드 플랜 */}
        <Card className="relative">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-purple-600">스탠다드</CardTitle>
            <p className="text-sm text-gray-600 mt-2">AI 기반의 SNS 계정을 완전 자동화하세요. 마케 전담 마케팅 대행사가 되어 마케팅 워크플로우 5% 마음에 드는 것만 자동화</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">
                계정당 월 ${plans[0].price}
              </div>
              {plans[0].originalPrice && (
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <span className="text-lg text-gray-400 line-through">${plans[0].originalPrice}</span>
                  <Badge variant="secondary" className="text-xs">
                    {plans[0].discount}
                  </Badge>
                </div>
              )}
              <div className="text-sm text-gray-600 mt-1">
                마케팅 워크플로우를 5% 마음에 드는 것만 자동화
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900">연동 계정 수 신택 (구독 시 적용):</p>
              <div className="flex space-x-2">
                <Badge variant="secondary">1개 (월 $25)</Badge>
                <Badge variant="outline">2개 (월 $50)</Badge>
                <Badge variant="outline">3개 (월 $75)</Badge>
              </div>
            </div>

            <div className="space-y-3">
              {plans[0].features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  {feature.included ? (
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <X className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                    {feature.name}
                  </span>
                </div>
              ))}
            </div>

            <Button className={`w-full ${plans[0].buttonColor} text-white`}>
              {plans[0].buttonText}
            </Button>
          </CardContent>
        </Card>

        {/* 팀 요금제 */}
        <Card className="border-2 border-purple-200 bg-purple-50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-purple-600">팀 요금제</CardTitle>
            <p className="text-sm text-gray-600 mt-2">전문가 및 팀 에이전시를 위한 맞춤형 솔루션</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">별도 문의</div>
              <div className="text-sm text-gray-600 mt-1">
                전문가 그룹 및 에이전시를 위한 맞춤형 솔루션
              </div>
            </div>

            <div className="space-y-3">
              {freeTrialFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              문의하기
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 하단 정보 */}
      <div className="text-center space-y-4 pt-8">
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>플랜: free-trial</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4" />
            <span>AI 크레딧: 27/30</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>연동 계정 수: 1/5</span>
          </div>
        </div>
        <Button variant="link" className="text-purple-600">
          구독 관리하기
        </Button>
      </div>
    </div>
  );
};

export default PricingPage;
