/**
 * ===========================================
 * TERMINAL NAVIGATION COMPONENT
 * ===========================================
 * Simple text-based navigation styled as terminal commands.
 * Each link triggers a typing animation effect.
 */

interface TerminalNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: 'about', label: './about', command: 'whoami' },
  { id: 'projects', label: './projects', command: 'ls /projects' },
  { id: 'blog', label: './blog', command: 'cat /logs' },
  { id: 'skills', label: './skills', command: 'sysinfo' },
  { id: 'contact', label: 'ssh contact', command: 'mailto' },
];

const TerminalNav = ({ activeSection, onNavigate }: TerminalNavProps) => {
  return (
    <nav className="flex flex-wrap gap-4 md:gap-6 justify-center py-4 px-4">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`
            terminal-link text-sm md:text-base transition-all duration-200
            ${activeSection === item.id 
              ? 'text-accent text-glow-strong' 
              : 'text-primary hover:text-accent'
            }
          `}
          aria-current={activeSection === item.id ? 'page' : undefined}
        >
          {/* Command prompt indicator for active item */}
          {activeSection === item.id && (
            <span className="text-muted-foreground mr-1">{'>'}</span>
          )}
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default TerminalNav;
