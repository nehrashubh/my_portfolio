import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ScanlineOverlay from '../components/ScanlineOverlay';
import TerminalHeader from '../components/TerminalHeader';
import TerminalNav from '../components/TerminalNav';
import CommandLine from '../components/CommandLine';
import BootScreen from '../components/BootScreen'; // 1. ADD THIS IMPORT
import AboutSection from '../components/sections/AboutSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import BlogSection from '../components/sections/BlogSection';
import SkillsSection from '../components/sections/SkillsSection';
import ContactSection from '../components/sections/ContactSection';

const sectionCommands: Record<string, string> = {
  about: 'whoami',
  projects: 'ls -la /projects',
  blog: 'cat /var/logs/blog/*',
  skills: 'sysinfo --modules',
  contact: 'ssh contact@shubhankar.dev',
};

const Index = () => {
  const [isBooting, setIsBooting] = useState(true); // Initial state is true
  const [theme, setTheme] = useState('green');
  const [activeSection, setActiveSection] = useState('about');
  const [currentCommand, setCurrentCommand] = useState(sectionCommands.about);
  const [isTyping, setIsTyping] = useState(false);
  const [showContent, setShowContent] = useState(true);

  const cycleTheme = () => {
    if (theme === 'green') setTheme('cyan');
    else if (theme === 'cyan') setTheme('amber');
    else setTheme('green');
  };

  const handleNavigate = (section: string) => {
    if (section === activeSection) return;
    setIsTyping(true);
    setShowContent(false);
    setCurrentCommand(sectionCommands[section]);
    const typingDuration = sectionCommands[section].length * 50 + 200;
    setTimeout(() => {
      setActiveSection(section);
      setIsTyping(false);
      setShowContent(true);
    }, typingDuration);
  };

  const renderSection = () => {
    if (!showContent) return null;
    switch (activeSection) {
      case 'about':
        return <AboutSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'blog':
        return <BlogSection />;
      case 'skills':
        return <SkillsSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <AboutSection />;
    }
  };

  return (
    <div className={theme === 'amber' ? 'theme-amber' : 
      theme === 'cyan' ? 'theme-cyan' : ''}>
      <Helmet>
        <title>Shubhankar Nehra | Portfolio</title>
      </Helmet>

      {isBooting && <BootScreen onComplete={() => setIsBooting(false)} />}

      <ScanlineOverlay />

      <div
        className={`min-h-screen crt-flicker ${
          !isBooting ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-1000`}
      >
        {/* 3. PASS PROPS to TerminalHeader */}
        <TerminalHeader
          theme={theme}
          onThemeToggle={cycleTheme}
        />

        <main className='mx-auto px-6 md:px-12 pt-24 pb-12 max-w-[1600px] w-full'>
          <TerminalNav
            activeSection={activeSection}
            onNavigate={handleNavigate}
          />
          <CommandLine command={currentCommand} isTyping={isTyping} />

          <div
            className={`transition-opacity duration-300 ${
              showContent ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {renderSection()}
          </div>

          <footer className='mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground font-mono'>
            <p>
              <span className='text-accent'>©</span> 2025 SHUBHANKAR NEHRA
              <span className='mx-2'>|</span>
              <span className='text-primary'>v1.0.4-stable</span>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
