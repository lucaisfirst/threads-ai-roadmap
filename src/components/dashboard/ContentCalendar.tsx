
import React, { useState } from 'react';
import { Calendar, Plus, Clock, BarChart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Post {
  id: string;
  title: string;
  content: string;
  scheduledAt: Date;
  status: 'published' | 'scheduled' | 'draft';
  platform: string;
  metrics?: {
    views: number;
    likes: number;
    comments: number;
  };
}

const ContentCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Mock data
  const posts: Post[] = [
    {
      id: '1',
      title: 'RPA로 월 300만원 절약한 진짜 후기',
      content: '스타트업 운영하면서 반복 작업을 인간이던 시간을 얻어낸 스토리...',
      scheduledAt: new Date(2025, 5, 18, 18, 23),
      status: 'published',
      platform: 'threads',
      metrics: { views: 53394, likes: 415, comments: 95 }
    },
    {
      id: '2', 
      title: '스타트업 대표가 말하는 진짜 필요한 자동화 툴',
      content: '수많은 자동화 툴 중에서 실제 비즈니스에 도움이 되는 몇 개...',
      scheduledAt: new Date(2025, 5, 19, 10, 0),
      status: 'scheduled',
      platform: 'threads'
    }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Previous month's trailing days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = new Date(year, month, -i);
      days.push({ date: day, isCurrentMonth: false });
    }
    
    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({ date, isCurrentMonth: true });
    }
    
    // Next month's leading days
    const remainingCells = 42 - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(year, month + 1, day);
      days.push({ date, isCurrentMonth: false });
    }
    
    return days;
  };

  const getPostsForDate = (date: Date) => {
    return posts.filter(post => {
      const postDate = new Date(post.scheduledAt);
      return postDate.toDateString() === date.toDateString();
    });
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">콘텐츠 대시보드</h1>
          <p className="text-gray-600">1개의 게정</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          새 게시물
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                <span>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
              </CardTitle>
              <div className="flex space-x-1">
                <Button variant="outline" size="sm">전체</Button>
                <Button variant="outline" size="sm">발행됨</Button>
                <Button variant="outline" size="sm">예약됨</Button>
                <Button variant="outline" size="sm">임시저장</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {dayNames.map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                  const dayPosts = getPostsForDate(day.date);
                  const isToday = day.date.toDateString() === new Date().toDateString();
                  
                  return (
                    <div
                      key={index}
                      className={`
                        min-h-24 p-2 border rounded-lg cursor-pointer transition-all
                        ${day.isCurrentMonth ? 'bg-white border-gray-200 hover:bg-gray-50' : 'bg-gray-50 border-gray-100'}
                        ${isToday ? 'ring-2 ring-purple-500 bg-purple-50' : ''}
                      `}
                      onClick={() => setSelectedDate(day.date)}
                    >
                      <div className={`text-sm font-medium ${day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}`}>
                        {day.date.getDate()}
                      </div>
                      
                      <div className="mt-1 space-y-1">
                        {dayPosts.slice(0, 2).map(post => (
                          <div key={post.id} className="text-xs p-1 rounded bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 truncate">
                            {post.title}
                          </div>
                        ))}
                        {dayPosts.length > 2 && (
                          <div className="text-xs text-gray-500">+{dayPosts.length - 2} more</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Recent Posts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">포스트</CardTitle>
              <p className="text-sm text-gray-600">39 건례</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {posts.map(post => (
                <div key={post.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex-shrink-0 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">🐕</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{post.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {post.scheduledAt.toLocaleDateString('ko-KR')} {post.scheduledAt.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant={post.status === 'published' ? 'default' : 'secondary'} className="text-xs">
                        {post.status === 'published' ? '발행됨' : '예약됨'}
                      </Badge>
                      {post.metrics && (
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Eye className="h-3 w-3" />
                          <span>{post.metrics.views.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">관련 게시물</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">선택한 기간에 대한 팔로워 기록 데이터가 없습니다</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContentCalendar;
