import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Trash2, Download, Mic, Camera, Paperclip } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'text' | 'image' | 'audio';
}

const MobileAIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hey there! 👋 I'm Ona, your AI companion. I'm here to help with questions, have meaningful conversations, or just chat about whatever's on your mind!",
      isBot: true,
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      const greetings = [
        "Hey! 😊 Great to see you! What's been on your mind lately?",
        "Hello there! ✨ I'm all ears - what would you like to explore today?",
        "Hi! 🌟 Ready to dive into some interesting conversation?"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    // Help requests
    else if (lowerMessage.includes('help')) {
      return "I'm here to help! 🚀 I can assist with:\n• Answering questions on various topics\n• Problem-solving and brainstorming\n• Creative writing and ideas\n• Explaining complex concepts\n• Just having a good conversation!\n\nWhat do you need help with?";
    }
    
    // Weather
    else if (lowerMessage.includes('weather')) {
      return "I don't have access to real-time weather data, but I'd recommend checking your local weather app or asking your voice assistant! ☀️🌧️ Is there anything weather-related you'd like to discuss, like climate patterns or weather phenomena?";
    }
    
    // Time
    else if (lowerMessage.includes('time') || lowerMessage.includes('what time')) {
      return `It's currently ${new Date().toLocaleTimeString()} ⏰ Hope you're making the most of your day!`;
    }
    
    // Jokes
    else if (lowerMessage.includes('joke') || lowerMessage.includes('funny')) {
      const jokes = [
        "Why don't AI assistants ever get tired? Because we run on infinite loops! 🤖😄",
        "What's an AI's favorite type of music? Algo-rhythms! 🎵",
        "Why did the chatbot go to therapy? It had too many deep learning issues! 😂",
        "What do you call a robot who takes the long way around? R2-Detour! 🤖",
        "Why don't computers ever get cold? They have Windows! 💻❄️"
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }
    
    // Gratitude
    else if (lowerMessage.includes('thanks') || lowerMessage.includes('thank you')) {
      return "You're absolutely welcome! 💜 It's my pleasure to help. Anything else you'd like to chat about?";
    }
    
    // Love/Like expressions
    else if (lowerMessage.includes('love') || lowerMessage.includes('like you')) {
      return "Aww, that's really sweet! 💜 I genuinely enjoy our conversations too. There's something special about connecting through words and ideas!";
    }
    
    // How are you
    else if (lowerMessage.includes('how are you') || lowerMessage.includes('how do you feel')) {
      return "I'm doing wonderfully, thank you for asking! 😊 I find each conversation energizing - it's like exploring new territories of thought. How are you doing today?";
    }
    
    // What can you do
    else if (lowerMessage.includes('what can you do') || lowerMessage.includes('your capabilities')) {
      return "Great question! 🎯 I can help with:\n• Answering questions and explaining topics\n• Creative writing and brainstorming\n• Problem-solving and analysis\n• Having thoughtful conversations\n• Providing different perspectives on ideas\n• Learning about your interests and sharing insights\n\nWhat sounds most interesting to you?";
    }
    
    // Name questions
    else if (lowerMessage.includes('your name') || lowerMessage.includes('who are you')) {
      return "I'm Ona! 🌟 Think of me as your thoughtful AI companion - I'm here to engage, help, and explore ideas together. What should I call you?";
    }
    
    // Advice requests
    else if (lowerMessage.includes('advice') || lowerMessage.includes('what should i do')) {
      return "I'd love to help you think through whatever you're facing! 🤔 Could you share a bit more about the situation? Sometimes talking through the details can help clarify the best path forward.";
    }
    
    // Compliments about intelligence
    else if (lowerMessage.includes('smart') || lowerMessage.includes('clever') || lowerMessage.includes('intelligent')) {
      return "Thank you! 😊 I try to be thoughtful and helpful. Though I think the real intelligence comes from our conversation together - you bring the questions and curiosity that make our chat meaningful!";
    }
    
    // Boredom
    else if (lowerMessage.includes('bored') || lowerMessage.includes('boring')) {
      return "Let's fix that! 🎪 How about we:\n• Explore a random interesting topic\n• Play a word game\n• Discuss something you're passionate about\n• Dive into a 'what if' scenario\n• Or tell me about your day and we'll find the interesting angles!\n\nWhat sounds fun to you?";
    }
    
    // Default responses with more personality
    else {
      const responses = [
        "That's really interesting! 🤔 I'd love to hear more about your thoughts on that.",
        "Fascinating perspective! ✨ What led you to think about it that way?",
        "You've got me curious now! 📚 Can you tell me more about that?",
        "That's a great point! 🎯 I'm interested in your experience with this.",
        "Ooh, that's thought-provoking! 🌟 What's your take on how that affects things?",
        "I find that really intriguing! 💭 Have you noticed any patterns or connections there?",
        "That's worth exploring! 🔍 What aspects of that interest you most?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Auto-resize textarea
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    // Simulate realistic typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        isBot: true,
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: "Hey there! 👋 I'm Ona, your AI companion. I'm here to help with questions, have meaningful conversations, or just chat about whatever's on your mind!",
        isBot: true,
        timestamp: new Date(),
        type: 'text'
      }
    ]);
  };

  const exportChat = () => {
    const chatText = messages.map(msg => 
      `[${msg.timestamp.toLocaleTimeString()}] ${msg.isBot ? 'Ona' : 'You'}: ${msg.text}`
    ).join('\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ona-chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  return (
    <div className="flex flex-col h-[85vh] max-w-md mx-auto bg-gray-100 p-4 relative">
      {/* Mobile Phone Frame */}
      <div className="flex flex-col h-full bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-gray-700 relative">
      {/* Subtle background effects */}
      <div className="absolute inset-0 opacity-10 rounded-[2rem]">
        <div className="absolute top-20 left-10 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Notch */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-50"></div>

      {/* Header */}
      <div className="bg-black/40 backdrop-blur-lg border-b border-gray-700/50 p-4 pt-8 relative z-10 rounded-t-[2rem]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="bg-gradient-to-r from-purple-600 to-purple-400 p-3 rounded-full">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Ona</h1>
              <p className="text-sm text-gray-300">Online • AI Assistant</p>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={exportChat}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full transition-all duration-200"
              title="Download chat"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={clearChat}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full transition-all duration-200"
              title="Clear chat"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10" style={{scrollbarWidth: 'thin'}}>
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex items-end space-x-2 animate-in slide-in-from-bottom-2 duration-300`}
            style={{animationDelay: `${index * 50}ms`}}
          >
            {message.isBot ? (
              <>
                <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-2 rounded-full flex-shrink-0 mb-1">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="max-w-[80%]">
                  <div className="bg-gray-800/80 backdrop-blur-lg text-white px-4 py-3 rounded-3xl rounded-bl-lg border border-gray-600/30 shadow-lg">
                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 ml-4">
                    {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="max-w-[80%] ml-auto">
                  <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-3 rounded-3xl rounded-br-lg shadow-lg">
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 mr-4 text-right">
                    {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
                <div className="bg-gray-600 p-2 rounded-full flex-shrink-0 mb-1">
                  <User className="w-4 h-4 text-white" />
                </div>
              </>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-end space-x-2 animate-in slide-in-from-bottom-2 duration-300">
            <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-2 rounded-full flex-shrink-0 mb-1">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gray-800/80 backdrop-blur-lg px-4 py-3 rounded-3xl rounded-bl-lg border border-gray-600/30">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-black/40 backdrop-blur-lg border-t border-gray-700/50 p-4 pb-6 relative z-10 rounded-b-[2rem]">
        <div className="flex items-end space-x-2">
          <div className="flex space-x-2">
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full transition-all duration-200">
              <Paperclip className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full transition-all duration-200">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-4 py-3 pr-12 bg-gray-800/60 backdrop-blur-lg border border-gray-600/30 rounded-3xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none min-h-[48px] max-h-[120px]"
              rows={1}
              style={{scrollbarWidth: 'none'}}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="absolute right-2 bottom-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white p-2 rounded-full hover:from-purple-700 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg transform hover:scale-105 active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          
          <button 
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full transition-all duration-200"
            disabled={isTyping}
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center justify-center mt-3">
          <div className="w-32 h-1 bg-gray-600 rounded-full"></div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MobileAIChatbot;