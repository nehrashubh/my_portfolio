/**
 * ===========================================
 * SKILLS SECTION (sysinfo)
 * ===========================================
 */

import TerminalWindow from '../TerminalWindow';
import AsciiProgressBar from '../AsciiProgressBar'; // Import the new component
import { skills } from '../../data/content';
import { useState, useEffect } from 'react';

const SkillsSection = () => {
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  // Mapped to match the categories exactly as defined in content.ts
  const categoryNames = {
    language: '[C: PROGRAMMING_LANGUAGES]',
    tool: '[D: SECURITY_&_ANALYSIS_TOOLS]',
    other: '[E: INFRASTRUCTURE_&_ENVIRONMENT]',
  };

  const [fileSize, setFileSize] = useState<string>('FETCHING...');

  useEffect(() => {
    fetch('/resume.pdf', { method: 'HEAD' })
      .then((res) => {
        const bytes = res.headers.get('content-length');
        if (bytes) {
          const size = parseInt(bytes, 10);
          setFileSize(size < 1048576 ? `${(size / 1024).toFixed(1)} KB` : `${(size / 1048576).toFixed(1)} MB`);
        } else {
          setFileSize('1.2 MB');
        }
      })
      .catch(() => setFileSize('NOT_FOUND'));
  }, []);

  return (
    <section id='skills' className='space-y-10 max-w-none'>
      {/* --- RESUME HEADER --- */}
      <div className='relative group border border-primary/30 p-4 bg-black/40 backdrop-blur-sm overflow-hidden'>
        <div className='absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

        <div className='relative z-10 flex flex-col md:flex-row items-center justify-between gap-6'>
          <div className='text-center md:text-left'>
            <div className='flex items-center justify-center md:justify-start gap-2 mb-1'>
              <span className='inline-block w-2 h-2 bg-accent animate-pulse rounded-full' />
              <h3 className='text-primary text-lg font-bold tracking-widest uppercase'>
                System_Dossier.sh
              </h3>
            </div>
            <p className='text-sm text-muted-foreground font-mono'>
              TYPE: DOCUMENT/PDF | SIZE: {fileSize} | STATUS: VERIFIED
            </p>
          </div>

          <button
            onClick={() => window.open('/resume.pdf', '_blank')}
            className='relative overflow-hidden px-8 py-3 bg-transparent border border-accent text-accent font-bold 
                       hover:text-black transition-all duration-300 group/btn active:scale-95'
          >
            <span className='absolute inset-0 bg-accent translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300' />
            <span className='relative z-20 flex items-center gap-2 font-mono'>
              <span className='text-lg'>💾</span>
              GET_RESUME.EXE
            </span>
          </button>
        </div>
      </div>

      <div className='text-muted-foreground text-base mb-4 font-mono'>
        <span className='text-accent'>$</span> sysinfo --modules |
        <span className='text-accent animate-pulse'> analyzing system capabilities...</span>
      </div>

      <TerminalWindow title='~/kernel/sys_capabilities.log'>
        <div className='space-y-12 font-mono p-4'>
          {Object.entries(groupedSkills).map(([category, categorySkills], catIndex) => (
            <div key={category} className='space-y-6'>
              {/* Category Header */}
              <div className='bg-primary/10 text-accent px-4 py-2 text-lg font-bold tracking-widest flex justify-between border border-white/10'>
                <span>
                  MODULE: {categoryNames[category as keyof typeof categoryNames] || `[UNIDENTIFIED: ${category.toUpperCase()}]`}
                </span>
                <span className='opacity-40 text-sm'>
                  0x{((catIndex + 1) * 1000).toString(16).toUpperCase()}
                </span>
              </div>

              <div className='divide-y divide-white/5'>
                {categorySkills.map((skill, sIdx) => {
                  const hexAddr = (0x4a20 + catIndex * 16 + sIdx).toString(16).toUpperCase();

                  return (
                    <div key={skill.name} className='py-5 group flex flex-col md:flex-row md:items-center gap-4 hover:bg-white/[0.03] transition-colors'>
                      
                      {/* Hex Address & Name */}
                      <div className='flex items-center gap-4 md:w-1/3'>
                        <div className='text-xs text-primary/40 group-hover:text-accent transition-colors font-mono'>
                          0x{hexAddr}
                        </div>
                        <span className='text-primary font-bold tracking-wider text-lg'>
                          {skill.name.toUpperCase()}
                        </span>
                      </div>

                      {/* ASCII Progress Bar */}
                      <div className='flex-1 flex justify-end md:justify-start'>
                        <AsciiProgressBar 
                          value={skill.level} 
                          width={30}  // 30 blocks wide for high resolution
                          filledChar="█" 
                          emptyChar="░" 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className='mt-12 pt-6 border-t border-white/10 text-sm text-muted-foreground flex justify-between'>
            <span>{'>'} MEMORY INTEGRITY CHECK: PASSED</span>
            <span className='animate-pulse text-accent font-bold'>● SYSTEM_ONLINE</span>
          </div>
        </div>
      </TerminalWindow>
    </section>
  );
};

export default SkillsSection;