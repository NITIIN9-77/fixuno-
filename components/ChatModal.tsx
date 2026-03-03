
import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse } from '../services/geminiService';
import type { ChatMessage } from '../types';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, onOpen }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm Uno, your Fixuno assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Draggable State
  const [position, setPosition] = useState({ x: window.innerWidth - 80, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const dragThreshold = 5;
  const hasMoved = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    const userMessage: ChatMessage = { role: 'user', text: userText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await getChatResponse(userText);
      const modelMessage: ChatMessage = { role: 'model', text: responseText };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { role: 'model', text: "Sorry, I'm having some trouble right now. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Dragging Logic
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setDragStart({ x: clientX - position.x, y: clientY - position.y });
    setIsDragging(true);
    hasMoved.current = false;
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      
      const newX = clientX - dragStart.x;
      const newY = clientY - dragStart.y;

      // Distance check to distinguish click vs drag
      const dist = Math.sqrt(Math.pow(newX - position.x, 2) + Math.pow(newY - position.y, 2));
      if (dist > dragThreshold) {
        hasMoved.current = true;
      }

      // Constraints
      const boundedX = Math.max(10, Math.min(window.innerWidth - 70, newX));
      const boundedY = Math.max(10, Math.min(window.innerHeight - 70, newY));

      setPosition({ x: boundedX, y: boundedY });
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, dragStart, position]);

  const handleClick = (e: React.MouseEvent) => {
    if (hasMoved.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onOpen();
  };

  return (
    <>
      {!isOpen && (
        <div 
          className="fixed z-50 cursor-move transition-shadow"
          style={{ left: `${position.x}px`, top: `${position.y}px`, touchAction: 'none' }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          onClick={handleClick}
        >
          <button 
            className="bg-primary text-white rounded-full p-4 shadow-2xl hover:brightness-110 active:scale-95 transition-transform animate-glow relative group"
            aria-label="Drag to move, click to chat"
          >
            {/* Drag Handle UI */}
            <div className="absolute -top-1 -left-1 bg-white/20 rounded-full p-1 group-hover:bg-white/40 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 8h16M4 16h16" />
              </svg>
            </div>
            
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
          <div 
            className="w-full max-w-lg h-[80vh] max-h-[700px] bg-surface rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-up-fade-in border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="bg-primary text-white p-5 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">Uno Assistant</h3>
                  <p className="text-xs text-blue-100 flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                    Online • All Day Open
                  </p>
                </div>
              </div>
              <button onClick={onClose} aria-label="Close chat" className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>

            <div className="flex-1 p-5 overflow-y-auto bg-background/50 space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm text-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-slate-800 text-textPrimary rounded-tl-none border border-slate-700'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3 border border-slate-700">
                    <div className="flex space-x-1.5">
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-surface border-t border-slate-700">
              <div className="flex items-center bg-background border border-slate-600 rounded-xl px-3 py-1 focus-within:border-primary transition-colors group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about AC, wiring, plumbing..."
                  className="flex-1 py-2 bg-transparent focus:outline-none text-textPrimary text-sm"
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  className="p-2 text-primary hover:bg-primary/10 rounded-lg disabled:opacity-50 transition-all transform active:scale-90" 
                  disabled={isLoading || !input.trim()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <p className="text-[10px] text-center text-textSecondary mt-2">Powered by Uno AI • Fixuno Services</p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatModal;
