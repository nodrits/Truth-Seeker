import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageSquare, Share2, Plus, PenLine, Sparkles } from 'lucide-react';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy, addDoc, updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { Prayer } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../context/AuthContext';

export default function CommunityView() {
  const { user, profile } = useAuth();
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [newPrayer, setNewPrayer] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'prayers'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snap) => {
      const docs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Prayer));
      setPrayers(docs);
    });
    return unsubscribe;
  }, []);

  const handlePost = async () => {
    if (!newPrayer.trim() || !user) return;
    setIsPosting(true);
    try {
      await addDoc(collection(db, 'prayers'), {
        userId: user.uid,
        authorName: profile?.displayName || 'Faithful Soul',
        text: newPrayer,
        createdAt: new Date().toISOString(),
        isPublic: true,
        likes: [],
      });
      setNewPrayer('');
      setShowModal(false);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'prayers');
    } finally {
      setIsPosting(false);
    }
  };

  const handleLike = async (prayer: Prayer) => {
    if (!user) return;
    const isLiked = prayer.likes.includes(user.uid);
    try {
      await updateDoc(doc(db, 'prayers', prayer.id), {
        likes: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid)
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `prayers/${prayer.id}`);
    }
  };

  return (
    <div className="p-6 space-y-8 pb-32">
      <header className="flex justify-between items-center">
        <div className="space-y-1">
          <p className="text-sm font-medium text-brand-olive/60 uppercase tracking-widest">Community</p>
          <h1 className="text-3xl font-display font-medium text-brand-olive italic">Prayer Wall</h1>
        </div>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowModal(true)}
          className="p-3 bg-brand-olive text-white rounded-full shadow-lg shadow-brand-olive/20"
        >
          <Plus size={24} />
        </motion.button>
      </header>

      <div className="space-y-4">
        {prayers.map((prayer) => (
          <motion.div 
            key={prayer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-5 space-y-4 shadow-xl shadow-brand-olive/5"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-olive/10 flex items-center justify-center text-brand-olive font-bold text-xs">
                  {prayer.authorName[0]}
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-brand-olive">{prayer.authorName}</h4>
                  <p className="text-[10px] text-gray-400 font-medium uppercase">{formatDistanceToNow(new Date(prayer.createdAt))} ago</p>
                </div>
              </div>
              <Sparkles size={16} className="text-brand-gold animate-pulse" />
            </div>

            <p className="text-gray-700 leading-relaxed font-serif text-lg">
              "{prayer.text}"
            </p>

            <div className="flex gap-6 border-t border-brand-olive/5 pt-4">
              <button 
                onClick={() => handleLike(prayer)}
                className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${prayer.likes.includes(user?.uid || '') ? 'text-red-500' : 'text-gray-400'}`}
              >
                <Heart size={18} className={prayer.likes.includes(user?.uid || '') ? 'fill-red-500' : ''} />
                {prayer.likes.length} Praying
              </button>
              <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-400">
                <MessageSquare size={18} />
                Reply
              </button>
              <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 ml-auto">
                <Share2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-0">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-6 w-full max-w-md relative z-10 shadow-2xl space-y-6"
            >
              <div className="space-y-1">
                <h2 className="text-2xl font-display font-medium text-brand-olive italic">Share a Prayer</h2>
                <p className="text-sm text-gray-500">Let the community lift you up in faith.</p>
              </div>

              <div className="relative">
                <textarea 
                  value={newPrayer}
                  onChange={(e) => setNewPrayer(e.target.value)}
                  placeholder="What's on your heart?"
                  className="w-full h-40 bg-brand-sage/30 rounded-2xl p-4 text-brand-olive placeholder:text-brand-olive/40 focus:outline-none border-2 border-transparent focus:border-brand-olive/10 transition-all resize-none font-serif text-lg"
                />
                <div className="absolute top-4 right-4 text-brand-olive/20">
                  <PenLine size={24} />
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-4 rounded-2xl font-semibold text-gray-400 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handlePost}
                  disabled={isPosting || !newPrayer.trim()}
                  className="flex-1 py-4 rounded-2xl font-semibold bg-brand-olive text-white shadow-xl shadow-brand-olive/20 disabled:opacity-50 transition-all"
                >
                  {isPosting ? 'Posting...' : 'Post anonymously'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
