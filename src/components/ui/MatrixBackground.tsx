'use client';

import { useEffect, useRef } from 'react';

const MatrixBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let drops: number[] = [];

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Re-initialize drops on resize based on new width
            const fontSize = 14;
            const columns = Math.ceil(canvas.width / fontSize);
            drops = new Array(columns).fill(1).map(() => Math.random() * -100); // Start at random negative positions
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const fontSize = 14;
        // Katakana + Latin + Numbers
        const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロヲゴゾドボポ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const charArray = chars.split('');

        const draw = () => {
            // Semi-transparent black to create fade trail effect
            // increased opacity for darker, cleaner look
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Random characters
                const text = charArray[Math.floor(Math.random() * charArray.length)];

                // Green text with slight variation for "hacker" feel
                const isWhite = Math.random() > 0.98;
                ctx.fillStyle = isWhite ? '#ffffff' : '#00ff41';
                
                // Add Glow
                ctx.shadowBlur = isWhite ? 8 : 2;
                ctx.shadowColor = isWhite ? '#ffffff' : '#00ff41';

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reset shadow
                ctx.shadowBlur = 0;

                // Reset drop to top randomly after it's crossed screen
                // Randomness ensures drops don't fall in unison
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                // Move drop down
                drops[i]++;
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 opacity-40 pointer-events-none"
            style={{ filter: 'blur(0.5px)' }} // Subtle blur
        />
    );
};

export default MatrixBackground;
