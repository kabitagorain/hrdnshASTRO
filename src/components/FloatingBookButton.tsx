import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

interface FloatingBookButtonProps {
  onBookSession: () => void;
}

export default function FloatingBookButton({ onBookSession }: FloatingBookButtonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show button after a short delay for visual effect
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <button
      onClick={onBookSession}
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full px-6 py-3.5 font-display text-[11px] font-bold uppercase tracking-widest text-zinc-950 bg-white shadow-lg shadow-orange-500/20 hover:bg-orange-500 hover:text-white hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
      id="floating-book-button"
      aria-label="Book a free consultation session"
    >
      <Calendar className="h-4 w-4 transition-transform group-hover:rotate-12" />
      <span className="hidden sm:inline">Book Free Session</span>
      <span className="sm:hidden">Book</span>
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-orange-400/20 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
    </button>
  );
}
