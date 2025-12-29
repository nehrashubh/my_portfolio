/**
 * ===========================================
 * TERMINAL HEADER COMPONENT
 * ===========================================
 * Displays system status bar at the top with theme toggling.
 */

import { useState, useEffect } from 'react';

interface HeaderProps {
  theme: string;
  onThemeToggle: () => void;
}

const TerminalHeader = ({ theme, onThemeToggle }: HeaderProps) => {
  const [time, setTime] = useState(new Date());

  const getThemeLabel = () => {
    if (theme === 'amber') return 'P3_AMBER';
    if (theme === 'cyan') return 'P2_CYAN';
    return 'P1_GREEN';
  };

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getStatus = (date: Date) => {
    const hours = date.getHours();
    // Sleeping mode between 10 PM and 6 AM
    if (hours >= 22 || hours < 6) {
      return {
        label: 'SLEEPING',
        color: 'text-orange-500',
        bg: 'bg-orange-500/10',
        led: 'bg-orange-500',
      };
    }
    return {
      label: 'ONLINE',
      color: 'text-primary',
      bg: 'bg-primary/5',
      led: 'bg-accent',
    };
  };

  const status = getStatus(time);

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-primary/20 px-6 py-2'>
      <div className='max-w-[1600px] mx-auto flex justify-between items-center font-mono text-sm uppercase tracking-tighter'>
        
        {/* Left Side (Identity) - KEEP SAME */}
        <div className='flex items-center gap-8'>
          <div className='flex items-center gap-2'>
            <span className='text-accent'>USER:</span>
            <span className='text-primary font-bold'>SHUBHANKAR</span>
          </div>
          <div className='hidden lg:flex items-center gap-2 border-l border-white/10 pl-8'>
            <span className='text-accent'>HOST:</span>
            <span className='text-primary'>SN_MAINFRAME</span>
          </div>
          <div className='hidden xl:flex items-center gap-2 border-l border-white/10 pl-8'>
            <span className='text-accent'>KERNEL:</span>
            <span className='text-primary'>v1.0.4-STABLE</span>
          </div>
        </div>

        {/* Right Side (Controls) */}
        <div className='flex items-center gap-6 md:gap-8'>
          
          {/* THEME TOGGLE BUTTON */}
          <button
            onClick={onThemeToggle}
            className='hidden sm:flex items-center gap-2 px-3 py-1 border border-primary/20 hover:bg-primary/10 transition-all rounded-sm'
          >
            <span className='text-accent'>THEME:</span>
            <span className='text-primary font-bold'>
              {getThemeLabel()}
            </span>
          </button>

          {/* ... (Status and Clock remain same) ... */}
           <div className={`hidden md:flex items-center gap-3 px-3 py-1 border border-white/10 rounded-sm ${status.bg}`}>
            <div className={`w-2 h-2 rounded-full animate-pulse ${status.led} shadow-[0_0_8px_rgba(var(--accent-rgb),0.8)]`} />
            <span className={`${status.color} font-bold tracking-widest text-[12px]`}>
              SYSTEM_{status.label}
            </span>
          </div>

          <div className='flex items-center gap-2 text-muted-foreground tabular-nums'>
            <span className='text-accent hidden sm:inline'>TIME:</span>
            <span className='text-primary'>{formatTime(time)}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TerminalHeader;