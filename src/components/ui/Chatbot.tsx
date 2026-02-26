"use client";

import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([
    { role: 'assistant', content: 'Olá! Sou a assistente interativa da FitPower. Como posso te ajudar hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });
      const data = await res.json();

      if (data.content) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.content }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: 'Desculpe, tive um problema de comunicação.' }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Ocorreu um erro ao processar sua mensagem.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="glass-panel w-80 sm:w-96 flex flex-col h-[500px] overflow-hidden shadow-2xl shadow-brand-emerald/20">
          {/* Header */}
          <div className="bg-white/10 p-4 flex justify-between items-center border-b border-white/10">
            <h3 className="text-white font-bold flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-brand-emerald" />
              FitPower AI
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${msg.role === 'user' ? 'bg-brand-emerald text-black rounded-tr-sm' : 'bg-white/10 text-white rounded-tl-sm'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 text-white rounded-2xl rounded-tl-sm p-3 text-sm flex gap-1 items-center">
                  <span className="w-2 h-2 rounded-full bg-brand-emerald animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-brand-emerald animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-2 h-2 rounded-full bg-brand-emerald animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-4 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua dúvida..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-brand-emerald text-sm"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-brand-emerald text-black p-2 rounded-xl hover:bg-opacity-90 transition-all disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-brand-emerald text-black p-4 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center animate-pulse"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
