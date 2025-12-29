/**
 * ===========================================
 * CONTACT SECTION (mailto/ssh style)
 * ===========================================
 * Contact links styled as terminal commands.
 */

import TerminalWindow from '../TerminalWindow';
import { contactInfo } from '../../data/content';

const ContactSection = () => {
  // Contact methods with command-style labels
  const contactMethods = [
    {
      id: 'email',
      command: 'mail -s "Hello"',
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      protocol: 'smtp://',
    },
    {
      id: 'github',
      command: 'git clone',
      value: 'github.com/nehrashubh',
      href: contactInfo.github,
      protocol: 'https://',
    },
    {
      id: 'linkedin',
      command: 'connect --professional',
      value: 'linkedin.com/in/nehrashubh',
      href: contactInfo.linkedin,
      protocol: 'https://',
    },
  ];

  return (
    <section id="contact" className="space-y-6">
      {/* Section header */}
      <div className="text-muted-foreground text-base mb-4">
        <span className="text-accent">$</span> cat /etc/contact.conf |
        <span className='text-accent animate-pulse'> establishing connections...</span>
      </div>

      <TerminalWindow title="~/contact/open_channels">
        <div className="space-y-6">
          {/* Introduction */}
          <div className="text-base space-y-2">
            <p className="text-primary">
              <span className="text-accent">// </span>
              Ready to collaborate? Send a signal through any of these channels.
            </p>
            <p className="text-muted-foreground">
              <span className="text-accent">// </span>
              Response time: Usually within 24-48 hours
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Contact links */}
          <div className="space-y-4">
            {contactMethods.map((method, index) => (
              <a
                key={method.id}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block group boot-line"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-2 text-base hover:bg-secondary/50 p-2 -mx-2 rounded-sm transition-colors">
                  {/* Command prompt */}
                  <span className="text-accent shrink-0">$</span>
                  
                  {/* Command */}
                  <span className="text-muted-foreground shrink-0">
                    {method.command}
                  </span>
                  
                  {/* Value/link */}
                  <span className="text-primary group-hover:text-accent transition-colors truncate">
                    {method.protocol}{method.value}
                  </span>

                  {/* Arrow indicator */}
                  <span className="text-accent ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* ASCII art signature */}
          <div className="border-t border-border pt-4">
            <pre className="text-muted-foreground text-sm leading-tight">
{`
 ____________________________
< Let's build something cool >
 ----------------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
`}
            </pre>
          </div>

          {/* Footer message */}
          <div className="text-sm text-muted-foreground">
            <span className="text-accent">EOF</span> - End of contact information
          </div>
        </div>
      </TerminalWindow>
    </section>
  );
};

export default ContactSection;
