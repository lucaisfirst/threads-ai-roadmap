
import React, { useState } from 'react';
import { MessageSquare, Calendar, Filter, Send, Sparkles, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  aiSuggestion?: string;
  replied: boolean;
  post: {
    id: string;
    title: string;
    excerpt: string;
  };
}

const CommentManager: React.FC = () => {
  const [expandedComment, setExpandedComment] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

  // Mock data
  const comments: Comment[] = [
    {
      id: '1',
      author: 'minisi2e',
      content: '그거',
      timestamp: new Date('2025-06-17T10:33:00'),
      aiSuggestion: '감사합니다! 더 궁금한 점이 있으시면 언제든 말씀해 주세요.',
      replied: false,
      post: {
        id: '1',
        title: '오늘룩 | AI 자동화 | 정부지원사업',
        excerpt: 'AI 자동화로 하루만에 유튜브 70개 예약 간이에 완성! 70개를 정체 예약했고...'
      }
    },
    {
      id: '2', 
      author: 'whywhying',
      content: '나무 신기하더 탐로만 기대됩니다',
      timestamp: new Date('2025-06-17T18:08:00'),
      aiSuggestion: '관심 가져주셔서 감사합니다! 앞으로도 유용한 정보 공유하겠습니다.',
      replied: false,
      post: {
        id: '1',
        title: '오늘룩 | AI 자동화 | 정부지원사업',
        excerpt: 'AI 자동화로 하루만에 유튜브 70개 예약 간이에 완성! 70개를 정체 예약했고...'
      }
    },
    {
      id: '3',
      author: 'evanismd',
      content: '우와 대단해!!! 메이크 자동화 찾기가 있더라',
      timestamp: new Date('2025-06-17T13:46:00'),
      aiSuggestion: '네, 메이크(Make)는 정말 강력한 자동화 도구입니다! 활용법이 궁금하시면 DM 주세요.',
      replied: false,
      post: {
        id: '1',
        title: '오늘룩 | AI 자동화 | 정부지원사업',
        excerpt: 'AI 자동화로 하루만에 유튜브 70개 예약 간이에 완성! 70개를 정체 예약했고...'
      }
    },
    {
      id: '4',
      author: 'ai_trigger',
      content: '얘가하는거야? 너무고마긍.!',
      timestamp: new Date('2025-06-17T13:19:00'),
      aiSuggestion: '도움이 되어서 기쁩니다! 다른 질문이나 궁금한 점 있으시면 편하게 말씀해 주세요.',
      replied: false,
      post: {
        id: '1',
        title: '오늘룩 | AI 자동화 | 정부지원사업',
        excerpt: 'AI 자동화로 하루만에 유튜브 70개 예약 간이에 완성! 70개를 정체 예약했고...'
      }
    }
  ];

  const handleReplyChange = (commentId: string, text: string) => {
    setReplyText(prev => ({ ...prev, [commentId]: text }));
  };

  const handleSendReply = (commentId: string) => {
    console.log(`Sending reply to comment ${commentId}:`, replyText[commentId]);
    setReplyText(prev => ({ ...prev, [commentId]: '' }));
  };

  const handleUseAISuggestion = (commentId: string, suggestion: string) => {
    setReplyText(prev => ({ ...prev, [commentId]: suggestion }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">답글 관리</h1>
          <p className="text-gray-600">스레드 포스트의 댓글을 관리하고 답글하세요</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 댓글</SelectItem>
                <SelectItem value="unanswered">답변 안함</SelectItem>
                <SelectItem value="answered">답변 완료</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">Jun 12, 2025 - Jun 19, 2025</span>
            </div>
            
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              최신순
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id} className="overflow-hidden">
            <CardContent className="p-0">
              {/* Post Context */}
              <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">🐕</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{comment.post.title}</p>
                    <p className="text-sm text-gray-600 truncate">{comment.post.excerpt}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">
                      {Math.floor(Math.random() * 60)} 시간 전
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => setExpandedComment(expandedComment === comment.id ? null : comment.id)}>
                      <ChevronDown className={`h-4 w-4 transition-transform ${expandedComment === comment.id ? 'rotate-180' : ''}`} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Comment */}
              <div className="px-6 py-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {comment.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">{comment.author}</span>
                      <span className="text-xs text-gray-500">
                        {comment.timestamp.toLocaleDateString('ko-KR')} {comment.timestamp.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-gray-800 mb-3">{comment.content}</p>
                    
                    {/* AI Suggestion */}
                    {comment.aiSuggestion && (
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3 mb-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <Sparkles className="h-4 w-4 text-purple-600" />
                          <span className="text-sm font-medium text-purple-900">AI 제안 답글</span>
                        </div>
                        <p className="text-sm text-purple-800 mb-2">{comment.aiSuggestion}</p>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleUseAISuggestion(comment.id, comment.aiSuggestion!)}
                          className="text-purple-700 border-purple-300 hover:bg-purple-100"
                        >
                          답글 생성
                        </Button>
                      </div>
                    )}

                    {/* Reply Section */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-700">답글 작성:</span>
                        <span className="text-xs text-gray-500">0/280</span>
                      </div>
                      
                      <Textarea
                        placeholder="답글을 여기에 입력하세요..."
                        value={replyText[comment.id] || ''}
                        onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                        className="min-h-20"
                      />
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {comment.replied ? '답변 완료' : '미답변'}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            초기화
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => handleSendReply(comment.id)}
                            disabled={!replyText[comment.id]?.trim()}
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                          >
                            <Send className="h-4 w-4 mr-2" />
                            답글 보내기
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bulk Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {comments.length}개의 댓글이 있습니다
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                모든 댓글 전송
              </Button>
              <Button variant="outline" size="sm">
                <Sparkles className="h-4 w-4 mr-2" />
                AI 답글 일괄 생성
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentManager;
