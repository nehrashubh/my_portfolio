import { useState, useEffect } from 'react';

const BOOT_LOGS = [
  "INITIALIZING NEHRA_OS KERNEL V1.0.4...",
  "CHECKING RAM... OK (INF_CAFFEINE_DETECTED)",
  "MOUNTING /DEV/BRAIN... SUCCESS",
  "ESTABLISHING SECURE CONNECTION TO SHUBHANKAR.DEV...",
  "HANDSHAKE PROTOCOL: RSA_4096_ENCRYPTED",
  "DECRYPTING PORTFOLIO_FILES...",
  "ACCESS GRANTED. LOADING INTERFACE..."
];

const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (currentIdx < BOOT_LOGS.length) {
      const timeout = setTimeout(() => {
        setLogs(prev => [...prev, BOOT_LOGS[currentIdx]]);
        setCurrentIdx(prev => prev + 1);
      }, currentIdx === 3 ? 1000 : 250); // Pause longer on "Establishing Connection"
      return () => clearTimeout(timeout);
    } else {
      const finalTimeout = setTimeout(onComplete, 800);
      return () => clearTimeout(finalTimeout);
    }
  }, [currentIdx, onComplete]);

  return (
    <div className="fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center p-6 font-mono overflow-hidden">
      <div className="max-w-2xl w-full space-y-2">
        {logs.map((log, i) => (
          <div key={i} className="flex gap-4 items-center">
            <span className="text-accent/40 text-xs">[{new Date().toLocaleTimeString()}]</span>
            <span className="text-primary text-sm md:text-base leading-relaxed">{log}</span>
          </div>
        ))}
        {currentIdx < BOOT_LOGS.length && (
          <div className="w-2 h-5 bg-primary animate-pulse inline-block ml-14" />
        )}
      </div>
      
      {/* Background static/scanline effect just for boot */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_center,_var(--accent-color)_0%,_transparent_70%)]" />
    </div>
  );
};

export default BootScreen;