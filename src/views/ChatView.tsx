import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, Mic, History, User, MessageCircle } from 'lucide-react';
import { getBibleChatResponse } from '../services/geminiService';
import { useAuth } from '../context/AuthContext';
import { ChatMessage } from '../types';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';

export default function ChatView() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      loadHistory();
    }
  }, [user]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadHistory = async () => {
    if (!user) return;
    const chatPath = `users/${user.uid}/chatHistory`;
    try {
      const q = query(
        collection(db, chatPath),
        orderBy('createdAt', 'desc'),
        limit(20)
      );
      const snap = await getDocs(q);
      const history = snap.docs.map(doc => doc.data() as ChatMessage).reverse();
      setMessages(history);
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, chatPath);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !user) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: input,
      createdAt: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Save user message
    const chatPath = `users/${user.uid}/chatHistory`;
    try {
      await addDoc(collection(db, chatPath), userMsg);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, chatPath);
    }

    const response = await getBibleChatResponse(messages, input);

    const modelMsg: ChatMessage = {
      role: 'model',
      content: response,
      createdAt: new Date().toISOString(),
    };

    setMessages(prev => [...prev, modelMsg]);
    setLoading(false);

    // Save model message
    try {
      await addDoc(collection(db, chatPath), modelMsg);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, chatPath);
    }
  };

  const suggestions = [
    "How do I pray?",
    "What does the Bible say about anxiety?",
    "Help me forgive someone",
    "Read me a Psalm"
  ];

  return (
    <div className="flex flex-col h-full bg-brand-cream relative">
      <header className="p-6 border-b border-brand-olive/5 bg-white/50 backdrop-blur-md sticky top-0 z-10 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-medium text-brand-olive">Bible Chat</h1>
          <p className="text-xs text-gray-400 font-medium tracking-tight">AI GUIDANCE ROOTED IN SCRIPTURE</p>
        </div>
        <History size={20} className="text-brand-olive/60" />
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8 pt-12">
            <div className="w-20 h-20 bg-brand-olive/10 rounded-full flex items-center justify-center text-brand-olive">
              <Sparkles size={40} />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-display font-medium text-brand-olive italic">Ask anything about the Bible</h2>
              <p className="text-gray-500 text-sm max-w-xs mx-auto">Get guidance, find verses, or learn about biblical history.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3 w-full max-w-xs">
              {suggestions.map((s, i) => (
                <button 
                  key={i}
                  onClick={() => setInput(s)}
                  className="p-3 bg-white border border-brand-olive/10 rounded-2xl text-sm text-brand-olive hover:bg-brand-olive hover:text-white transition-all text-left flex items-center gap-2"
                >
                  <Sparkles size={14} className="opacity-60" /> {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-brand-olive text-white' : 'bg-brand-cream border border-brand-olive/20 text-brand-olive'}`}>
                  {msg.role === 'user' ? <User size={16} /> : <MessageCircle size={16} />}
                </div>
                <div className={`p-4 rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-brand-olive text-white' : 'bg-white text-gray-800'}`}>
                  <div className="markdown-body text-sm leading-relaxed">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 p-2">
            <span className="w-2 h-2 bg-brand-olive rounded-full animate-bounce" />
            <span className="w-2 h-2 bg-brand-olive rounded-full animate-bounce [animation-delay:0.2s]" />
            <span className="w-2 h-2 bg-brand-olive rounded-full animate-bounce [animation-delay:0.4s]" />
          </motion.div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="p-6 bg-white border-t border-brand-olive/5 pb-10">
        <div className="flex gap-2 bg-brand-sage/50 p-2 rounded-3xl border border-brand-olive/10 shadow-inner">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question..."
            className="flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none text-brand-olive"
          />
          <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="p-3 bg-brand-olive text-white rounded-2xl disabled:opacity-50 shadow-lg shadow-brand-olive/20"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
