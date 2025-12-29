/**
 * ===========================================
 * ABOUT SECTION (whoami)
 * ===========================================
 * Introduction section styled as a 'whoami' command output.
 */

import TerminalWindow from '../TerminalWindow';
import { aboutInfo } from '../../data/content';
import GlitchAscii from '../ui/GlitchAscii';

const AboutSection = () => {
  return (
    <section id='about' className='space-y-6'>
      {/* ASCII Art Banner */}
      <div className='hidden md:block overflow-x-hidden'>
         <GlitchAscii />
      </div>

      <TerminalWindow title='~/whoami'>
        <div className='space-y-4'>
          {/* User info */}
          <div className='space-y-2'>
            <p>
              <span className='text-accent'>user</span>
              <span className='text-muted-foreground'>@</span>
              <span className='text-primary'>{aboutInfo.name}</span>
            </p>
            <p>
              <span className='text-accent'>role:</span>
              <span className='text-primary ml-2'>{aboutInfo.role}</span>
            </p>
            <p>
              <span className='text-accent'>location:</span>
              <span className='text-primary ml-2'>{aboutInfo.location}</span>
            </p>
          </div>

          {/* Divider */}
          <div className='border-t border-border my-4' />

          {/* Bio lines */}
          <div className='space-y-3'>
            <p className='text-muted-foreground text-base'>$ cat ~/bio.txt</p>
            {aboutInfo.bio.map((line, index) => (
              <p
                key={index}
                className='text-primary boot-line'
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <span className='text-accent mr-2'>➞</span>
                {line}
              </p>
            ))}
          </div>
          {/* Fun terminal stats */}
          <div className='border-t border-border mt-6 pt-4'>
            <p className='text-muted-foreground text-sm mb-3'>$ uptime</p>

            <div className='flex justify-between text-sm'>
              <div className='flex items-center gap-2 min-w-[8rem]'>
                <span className='text-accent'>Commits:</span>
                <span className='text-primary'>2,847</span>
              </div>

              <div className='flex items-center gap-2 min-w-[8rem]'>
                <span className='text-accent'>Energy Drinks:</span>
                <span className='text-primary'>∞ cans</span>
              </div>

              <div className='flex items-center gap-2 min-w-[8rem]'>
                <span className='text-accent'>Bugs:</span>
                <span className='text-primary'>Too many</span>
              </div>

              <div className='flex items-center gap-2 min-w-[8rem]'>
                <span className='text-accent'>Status:</span>
                <span className='text-primary animate-glow-pulse'>Active</span>
              </div>
            </div>
          </div>
        </div>
      </TerminalWindow>
    </section>
  );
};

export default AboutSection;
