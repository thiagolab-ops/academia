"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Olá! Sou a Luna, assistente da FitPower. Como posso ajudar?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { text: input, sender: "user" }]);
    setInput("");

    setTimeout(() => {
      setMessages(prev => [...prev, { text: "Nossos consultores entrarão em contato em breve! Quer agendar um treino experimental?", sender: "bot" }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-80 glass-panel border-brand-cyan/30 overflow-hidden flex flex-col"
            style={{ height: '400px' }}
          >
            <div className="p-4 border-b border-white/10 bg-gradient-to-r from-brand-cyan/20 to-brand-violet/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-cyan/20 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full border border-brand-cyan animate-ping opacity-50"></div>
                  <span className="text-brand-cyan text-xs font-bold">L</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm">Luna</h4>
                  <p className="text-xs text-brand-cyan">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col">
              {messages?.map((msg, i) => (
                <div key={i} className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-brand-cyan text-black self-end rounded-br-sm' : 'bg-white/10 self-start rounded-bl-sm'}`}>
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-white/10 bg-black/50 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-brand-cyan/50"
              />
              <button onClick={handleSend} className="w-10 h-10 rounded-full bg-brand-cyan text-black flex items-center justify-center hover:bg-brand-cyan/80 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-violet flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.4)] relative"
      >
        <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping"></div>
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </motion.button>
    </div>
  );
}
