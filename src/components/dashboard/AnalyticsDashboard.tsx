
import React, { useState } from 'react';
import { Calendar, TrendingUp, Users, Heart, MessageCircle, Eye, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const AnalyticsDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedAccount, setSelectedAccount] = useState('all');

  // Mock data for the chart
  const chartData = [
    { date: '2025-05-20', views: 15000, likes: 300, comments: 45 },
    { date: '2025-05-21', views: 18000, likes: 350, comments: 52 },
    { date: '2025-05-22', views: 22000, likes: 420, comments: 68 },
    { date: '2025-05-23', views: 28000, likes: 480, comments: 72 },
    { date: '2025-05-24', views: 32000, likes: 520, comments: 85 },
    { date: '2025-05-25', views: 45000, likes: 680, comments: 95 },
    { date: '2025-05-26', views: 38000, likes: 590, comments: 88 },
    { date: '2025-05-27', views: 42000, likes: 620, comments: 92 },
    { date: '2025-05-28', views: 48000, likes: 720, comments: 105 },
    { date: '2025-06-01', views: 35000, likes: 560, comments: 78 },
    { date: '2025-06-02', views: 40000, likes: 610, comments: 82 },
    { date: '2025-06-03', views: 44000, likes: 650, comments: 89 },
    { date: '2025-06-04', views: 52000, likes: 780, comments: 112 },
    { date: '2025-06-05', views: 47000, likes: 720, comments: 98 },
    { date: '2025-06-06', views: 50000, likes: 750, comments: 102 },
    { date: '2025-06-07', views: 45000, likes: 680, comments: 94 },
    { date: '2025-06-08', views: 48000, likes: 710, comments: 99 },
    { date: '2025-06-09', views: 53000, likes: 790, comments: 108 },
    { date: '2025-06-18', views: 44000, likes: 670, comments: 91 }
  ];

  const keyMetrics = [
    { label: 'Followers', value: '0', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: '조회수', value: '53,394', icon: Eye, color: 'text-green-600', bg: 'bg-green-50' },
    { label: '좋아요', value: '415', icon: Heart, color: 'text-red-600', bg: 'bg-red-50' },
    { label: '댓글', value: '95', icon: MessageCircle, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: '리포스트', value: '106', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: '공유', value: '126', icon: BarChart, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: '인용', value: '0', icon: MessageCircle, color: 'text-gray-600', bg: 'bg-gray-50' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">분석 대시보드</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="모든 계정" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 계정</SelectItem>
              <SelectItem value="threads">Threads</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>내보내기</span>
          </Button>
          
          <Select defaultValue="content">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="content">차트 유형</SelectItem>
              <SelectItem value="followers">팔로워</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            날짜 범위
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${metric.bg}`}>
                    <Icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart className="h-5 w-5 text-purple-600" />
              <span>성과 추이</span>
            </CardTitle>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>May 20, 2025 - Jun 20, 2025</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getMonth() + 1}/${date.getDate()}`;
                    }}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString('ko-KR')}
                    formatter={(value: number, name: string) => [
                      value.toLocaleString(),
                      name === 'views' ? '조회수' : name === 'likes' ? '좋아요' : '댓글'
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#8b5cf6"
                    fill="url(#colorViews)"
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center text-sm text-gray-500">
              <span className="inline-flex items-center space-x-1">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <span>autofounderdog</span>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics Sidebar */}
        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {keyMetrics.slice(0, 7).map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${metric.bg}`}>
                      <Icon className={`h-4 w-4 ${metric.color}`} />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{metric.label}</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{metric.value}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>팔로워 성장</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">선택한 기간에 대한 팔로워 기록 데이터가 없습니다</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Best Times</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <p className="text-sm text-gray-500">분석할 데이터가 부족합니다</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Best Days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <p className="text-sm text-gray-500">분석할 데이터가 부족합니다</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
