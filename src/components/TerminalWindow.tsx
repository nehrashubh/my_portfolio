/**
 * ===========================================
 * TERMINAL WINDOW COMPONENT
 * ===========================================
 * A reusable terminal window container with the classic
 * title bar, traffic lights, and content area.
 */

import { ReactNode } from 'react';

interface TerminalWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const TerminalWindow = ({ title, children, className = '' }: TerminalWindowProps) => {
  return (
    <div className={`terminal-window fade-in ${className}`}>
      {/* Title bar with traffic lights */}
      <div className="terminal-header">
        {/* Traffic light buttons */}
        <div className="flex items-center gap-1.5">
          <div className="terminal-dot terminal-dot-red" />
          <div className="terminal-dot terminal-dot-yellow" />
          <div className="terminal-dot terminal-dot-green" />
        </div>
        
        {/* Window title */}
        <span className="text-muted-foreground text-xs ml-3 flex-1">{title}</span>
        
        {/* Minimize/maximize indicators */}
        <div className="flex items-center gap-2 text-muted-foreground text-xs">
          <span>─</span>
          <span>□</span>
        </div>
      </div>
      
      {/* Content area */}
      <div className="p-4 md:p-6">
        {children}
      </div>
    </div>
  );
};

export default TerminalWindow;
