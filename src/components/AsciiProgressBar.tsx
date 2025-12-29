/**
 * ===========================================
 * ASCII PROGRESS BAR COMPONENT
 * ===========================================
 * Displays a progress bar using ASCII characters.
 * Classic terminal style: [#####-----] 50%
 */

interface AsciiProgressBarProps {
  value: number;      // 0-100
  width?: number;     // Number of characters
  filledChar?: string;
  emptyChar?: string;
  showPercentage?: boolean;
}

const AsciiProgressBar = ({
  value,
  width = 25,
  filledChar = '█',
  emptyChar = '░',
  showPercentage = true,
}: AsciiProgressBarProps) => {
  // Calculate filled portion
  const clampedValue = Math.min(100, Math.max(0, value));
  const filledCount = Math.round((clampedValue / 100) * width);
  const emptyCount = width - filledCount;

  // Build the bar string safely
  const filledStr = filledChar.repeat(Math.max(0, filledCount));
  const emptyStr = emptyChar.repeat(Math.max(0, emptyCount));

  return (
    <div className="ascii-progress font-mono inline-flex items-center gap-2">
      <span className="text-muted-foreground hidden sm:inline">[</span>
      
      {/* THE BAR ITSELF */}
      <span className="tracking-tighter">
        <span className="text-accent">{filledStr}</span>
        <span className="text-muted-foreground/30">{emptyStr}</span>
      </span>
      
      <span className="text-muted-foreground hidden sm:inline">]</span>
      
      {/* THE PERCENTAGE TEXT */}
      {showPercentage && (
        <span className="min-w-[4ch] text-right font-bold ml-2">
          {/* SWAPPED: Now using Primary (Main) color for text */}
          <span className="text-primary">{clampedValue}%</span>
        </span>
      )}
    </div>
  );
};

export default AsciiProgressBar;