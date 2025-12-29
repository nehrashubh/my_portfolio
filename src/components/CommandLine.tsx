/**
 * ===========================================
 * COMMAND LINE COMPONENT
 * ===========================================
 * Displays the current command with a typing animation.
 * Mimics a terminal prompt with blinking cursor.
 */

import { useState, useEffect } from 'react';

interface CommandLineProps {
  command: string;
  isTyping: boolean;
}

const CommandLine = ({ command, isTyping }: CommandLineProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  // Typing animation effect
  useEffect(() => {
    if (isTyping) {
      setDisplayedText('');
      let index = 0;
      
      const typeInterval = setInterval(() => {
        if (index < command.length) {
          setDisplayedText(command.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
        }
      }, 50); // 50ms per character

      return () => clearInterval(typeInterval);
    } else {
      setDisplayedText(command);
    }
  }, [command, isTyping]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="command-line py-3 px-4 bg-card border border-border rounded-sm mb-6">
      {/* Prompt symbol */}
      <span className="command-prompt">$</span>
      
      {/* User indicator */}
      <span className="text-muted-foreground ml-2">shubh@system-32</span>
      <span className="text-accent">:</span>
      <span className="text-primary">~</span>
      <span className="text-accent">$</span>
      
      {/* Command text */}
      <span className="text-primary ml-2 text-glow">{displayedText}</span>
      
      {/* Blinking cursor */}
      {showCursor && (
        <span className="inline-block w-2.5 h-5 bg-primary ml-0.5 align-middle" />
      )}
    </div>
  );
};

export default CommandLine;
