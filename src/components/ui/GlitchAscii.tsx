import React, { useState, useEffect } from 'react';

// Use String.raw to ensure backslashes don't cause errors
const FULL_NAME = String.raw`
 ██████╗██╗  ██╗██╗   ██╗██████╗ ██╗  ██╗ █████╗ ███╗   ██╗██╗  ██╗ █████╗ ██████╗ 
██╔════╝██║  ██║██║   ██║██╔══██╗██║  ██║██╔══██╗████╗  ██║██║ ██╔╝██╔══██╗██╔══██╗
╚█████╗ ███████║██║   ██║██████╔╝███████║███████║██  ██╗██║█████╔╝ ███████║██████╔╝
 ╚═══██╗██╔══██║██║   ██║██╔══██╗██╔══██║██╔══██║██║ ╚████║██╔═██╗ ██╔══██║██╔══██╗
██████╔╝██║  ██║╚██████╔╝██████╔╝██║  ██║██║  ██║██║  ╚███║██║  ██╗██║  ██║██║  ██║
╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝   ╚══╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
`;

const NICKNAME = String.raw`
 ██████╗██╗  ██╗██╗   ██╗██████╗ ██╗  ██╗
██╔════╝██║  ██║██║   ██║██╔══██╗██║  ██║
╚█████╗ ███████║██║   ██║██████╔╝███████║
 ╚═══██╗██╔══██║██║   ██║██╔══██╗██╔══██║
██████╔╝██║  ██║╚██████╔╝██████╔╝██║  ██║
╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝
`;

const CORRUPTED = String.raw`
 ░░▒▒▓▓██░░▒▒  ▓▓██░░   ▒▒▓▓██░░▒▒▓▓  ██░░ ▒▒▓▓██░░▒▒▓▓  ██░░ ▒▒▓▓  ██░░ ▒▒▓▓██░░▒▒
▒▒▓▓██░░▒▒▓▓  ██░░▒▒▓▓  ██░░▒▒▓▓██░░  ▒▒▓▓  ██░░▒▒▓▓██░░  ▒▒▓▓  ██░░ ▒▒▓▓  ██░░▒▒▓▓
▓▓██░░▒▒▓▓██  ░░▒▒▓▓██  ░░▒▒▓▓██░░▒▒  ▓▓██  ░░▒▒▓▓██░░▒▒  ▓▓██  ░░▒▒ ▓▓██  ░░▒▒▓▓██
██░░▒▒▓▓██░░  ▒▒▓▓██░░  ▒▒▓▓██░░▒▒▓▓  ██░░  ▒▒▓▓██░░▒▒▓▓  ██░░  ▒▒▓▓  ██░░ ▒▒▓▓██░░
▒▒▓▓██░░▒▒▓▓  ██░░▒▒▓▓  ██░░▒▒▓▓██░░  ▒▒▓▓  ██░░▒▒▓▓██░░  ▒▒▓▓  ██░░ ▒▒▓▓  ██░░▒▒▓▓
░░▒▒▓▓██░░▒▒  ▓▓██░░▒▒  ▓▓██░░▒▒▓▓██  ░░▒▒  ▓▓██░░▒▒▓▓██  ░░▒▒  ▓▓██  ░░▒▒ ▓▓██░░▒▒
`;

const GlitchAscii = () => {
  const [mode, setMode] = useState<'full' | 'nick'>('full');
  const [displayText, setDisplayText] = useState(FULL_NAME);
  const [isGlitching, setIsGlitching] = useState(false);
  const [jitter, setJitter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setDisplayText(CORRUPTED);

      // Random jitter movement
      const jitterTimer = setInterval(() => {
        setJitter({ 
          x: Math.random() * 12 - 6, 
          y: Math.random() * 4 - 2 
        });
      }, 30);

      setTimeout(() => {
        clearInterval(jitterTimer);
        setJitter({ x: 0, y: 0 });
        setIsGlitching(false);
        
        // Explicitly toggle modes
        setMode(prev => {
          const next = prev === 'full' ? 'nick' : 'full';
          setDisplayText(next === 'full' ? FULL_NAME : NICKNAME);
          return next;
        });
      }, 250);

    }, 5000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="w-full flex justify-start py-6 select-none overflow-hidden">
      <div className="relative inline-block">
        <pre 
          style={{ 
            transform: isGlitching ? `translate(${jitter.x}px, ${jitter.y}px)` : 'none',
          }}
          className={`font-mono text-[0.5rem] sm:text-[0.6rem] lg:text-xs leading-none transition-colors duration-75
          ${isGlitching ? 'text-accent brightness-200' : 'text-primary'} text-glow`}
        >
          {displayText}
        </pre>
      </div>
    </div>
  );
};

export default GlitchAscii;