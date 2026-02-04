'use client';

import { useState, useEffect, useRef } from 'react';

const TerminalHero = () => {
  const [lines, setLines] = useState<Array<{ type: 'command' | 'output', text: React.ReactNode, id: number }>>([]);
  const [isTyping, setIsTyping] = useState(true);
  const initialized = useRef(false);
  
  // Sequence of events
  // 1. Type: whoami
  // 2. Output: MERN Stack Developer
  // 3. Type: cat experience.json
  // 4. Output: Structured JSON of skills

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    let timeoutId: NodeJS.Timeout;
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sequence = async () => {
      // Clear initial state
      setLines([]);
      
      // Helper to type a command
      const typeCommand = async (cmd: string) => {
        setIsTyping(true);
        const id = Date.now();
        setLines(prev => [...prev, { type: 'command', text: '', id }]);
        
        for (let i = 0; i <= cmd.length; i++) {
          await new Promise(r => setTimeout(r, 80 + Math.random() * 50)); // Random typing speed
          setLines(prev => prev.map(line => 
            line.id === id ? { ...line, text: cmd.substring(0, i) } : line
          ));
        }
        setIsTyping(false);
        await new Promise(r => setTimeout(r, 500)); // Pause after typing
      };

      // Helper to show output
      const showOutput = async (text: React.ReactNode) => {
        setLines(prev => [...prev, { type: 'output', text, id: Date.now() + Math.random() }]);
        await new Promise(r => setTimeout(r, 100)); // Small delay between outputs
      };

      // Start Sequence
      await new Promise(r => setTimeout(r, 1000)); // Initial generic delay

      // 1. whoami
      await typeCommand('whoami');
      await showOutput('Full Stack Developer');
      await new Promise(r => setTimeout(r, 800));

      // 2. cat experience.json
      await typeCommand('cat experience.json');
      
      const coreStack = {
        Frontend: ["React.js", "Next.js", "Tailwind CSS", "Redux"],
        Backend: ["Node.js", "Express.js", "GraphQL", "Firebase"]
      };

      const infra = {
        Cloud: ["AWS S3", "EC2"],
        DevOps: ["Docker", "Git", "CI/CD", "Nginx"]
      };

      // Render nicely formatted JSON-like output
      const jsonOutput = (
        <div className="space-y-1 text-gray-300">
           <div>{'{'}</div>
           <div className="pl-4">
             <span className="text-yellow-400">"Core_Stack"</span>: {'{'}
             <div className="pl-4">
                <span className="text-blue-400">"Frontend"</span>: [<span className="text-green-300">"{coreStack.Frontend.join('", "')}"</span>],
             </div>
             <div className="pl-4">
                <span className="text-blue-400">"Backend"</span>: [<span className="text-green-300">"{coreStack.Backend.join('", "')}"</span>]
             </div>
             <div>{'}'},</div>
           </div>
           <div className="pl-4">
             <span className="text-yellow-400">"Infrastructure"</span>: {'{'}
             <div className="pl-4">
                <span className="text-blue-400">"Cloud"</span>: [<span className="text-green-300">"{infra.Cloud.join('", "')}"</span>],
             </div>
             <div className="pl-4">
                <span className="text-blue-400">"DevOps"</span>: [<span className="text-green-300">"{infra.DevOps.join('", "')}"</span>]
             </div>
             <div>{'}'}</div>
           </div>
           <div>{'}'}</div>
        </div>
      );

      await showOutput(jsonOutput);
    };

    sequence();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto perspective-1000">
      <div className="relative bg-[#0c0c0c] rounded-lg border border-gray-800 shadow-2xl overflow-hidden min-h-[380px] font-mono text-sm md:text-base">
        
        {/* CRT Overlay Effects */}
        <div className="absolute inset-0 pointer-events-none z-20 scanline opacity-5"></div>
        <div className="absolute inset-0 pointer-events-none z-10 screen-flicker mix-blend-overlay bg-green-900/5"></div>

        {/* Terminal Header */}
        <div className="flex items-center px-4 py-2 bg-[#1a1a1a] border-b border-gray-800">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="ml-4 text-xs text-gray-500">root@portfolio:~</div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 overflow-y-auto max-h-[500px]">
          {lines.map((line) => (
            <div key={line.id} className="mb-2 break-words">
              {line.type === 'command' ? (
                <div className="flex items-center text-green-400 font-bold">
                  <span className="mr-2">$</span>
                  <span>{line.text}</span>
                  {/* Show cursor only on the last line if it's a command and currently typing */}
                  {lines.indexOf(line) === lines.length - 1 && isTyping && (
                    <span className="w-2.5 h-5 bg-green-400 ml-1 animate-pulse inline-block align-middle"></span>
                  )}
                </div>
              ) : (
                <div className="ml-0 md:ml-4">
                  {line.text}
                </div>
              )}
            </div>
          ))}
          
          {/* Active Cursor at bottom when idle */}
          {!isTyping && (
            <div className="flex items-center text-green-400 mt-2 font-bold">
              <span className="mr-2">$</span>
              <span className="w-2.5 h-5 bg-green-400 animate-pulse inline-block align-middle"></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TerminalHero;
