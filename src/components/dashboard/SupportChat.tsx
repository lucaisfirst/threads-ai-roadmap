
import React, { useState } from 'react';
import { Send, User, Bot, FileText, Download, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface ChatMessage {
  id: string;
  sender: 'user' | 'support';
  message: string;
  timestamp: string;
  attachment?: {
    name: string;
    type: string;
  };
}

const SupportChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'support',
      message: '안녕하세요! 계정이 계속 결제를 요구하면 거절하시고 즉시 고객센터로 알려주세요. 자세히 보기 >',
      timestamp: '25.06.19 00:14'
    },
    {
      id: '2',
      sender: 'support',
      message: '매출을 만드는 상세페이지 디자인 스마트스토어, 와디즈 59,000원',
      timestamp: '25.06.19 00:14'
    },
    {
      id: '3',
      sender: 'support',
      message: '*본 메시지 발신자는 "계정 정지" 또는 "사용자 삭제"라고 표기할 수 있지만, 이는 시스템 사양에 따른 법적 고지입니다.\n\n귀하의 성품이 온라인 플랫폼에서 성공적으로 판매되었습니다.\n\n구매자의 결제도 성공적으로 처리되었습니다.\n\n아래 특별 PDF 파일을 참고하여 사용자 인증, 보안 확인, 보안 인증, 보안 확인 등의 절차를 완료해 주시기 바랍니다.\n\n중요 공지: 판매 완료 후 24시간 이내에 판매 수익금 수령 절차를 완료해야 합니다.\n\n지정된 기간이 지나면 판매 수익금을 수령할 수 없으니, 가능한 한 빨리 조치를 취해 주시기 바랍니다.\n\n저희 서비스를 계속 이용해 주시기 바랍니다. 문의 사항이 있으시면 언제든지 문의해 주세요.',
      timestamp: '25.06.19 00:14',
      attachment: {
        name: 'qrcod_5JDD.pdf',
        type: 'PDF'
      }
    },
    {
      id: '4',
      sender: 'user',
      message: '신고했습니다!',
      timestamp: '25.06.19 00:16'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isOnline, setIsOnline] = useState(true);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        sender: 'user',
        message: newMessage,
        timestamp: new Date().toLocaleString('ko-KR', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">고객 지원</h1>
          <p className="text-gray-600">실시간 채팅으로 도움을 받으세요</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 채팅 영역 */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-orange-100 text-orange-600">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">무보</h3>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <span className="text-sm text-gray-500">
                        {isOnline ? '온라인' : '오프라인'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">연락 가능 시간</Badge>
                  <Badge variant="outline">평균 응답 시간</Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className={message.sender === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}>
                        {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`flex flex-col space-y-1 ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`px-3 py-2 rounded-lg text-sm ${
                          message.sender === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {message.message}
                      </div>
                      {message.attachment && (
                        <div className="flex items-center space-x-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                          <FileText className="h-4 w-4 text-red-500" />
                          <span className="text-sm text-red-700">{message.attachment.name}</span>
                          <span className="text-xs text-red-500">{message.attachment.type}</span>
                          <Button size="sm" variant="ghost" className="p-1 h-6 w-6">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>

            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="메시지를 입력해주세요..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs text-gray-500 mt-2">0/50</div>
            </div>
          </Card>
        </div>

        {/* 사이드바 정보 */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">전문가 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">전문가 정보</span>
                <span className="text-sm font-medium">개인정보</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">회원 구분</span>
                  <span className="text-sm">개인회원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">세금계산서</span>
                  <span className="text-sm">발행 불가</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">민족도</span>
                  <span className="text-sm">-</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">총 거래수</span>
                  <span className="text-sm">0건</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center space-y-2">
                <Clock className="h-6 w-6 mx-auto text-gray-400" />
                <p className="text-sm text-gray-600">거래정보가 없어요.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SupportChat;
