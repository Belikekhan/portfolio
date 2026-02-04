'use client';

import SectionWrapper from "@/components/ui/SectionWrapper";
import { Smartphone, Monitor } from "lucide-react";
import { motion } from "framer-motion";

// Client-side wrapper for Motion if strict separation needed, but usually fine in Next.js App Router for client components
// Marking file as client since we use Framer Motion

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen py-12 justify-center bg-[#0a0a0a]">
             {/* Ambient Background Glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            <SectionWrapper id="about-intro" className="relative z-10">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col gap-12 max-w-4xl mx-auto text-center items-center">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl text-white">
                                About <span className="text-green-500">Me</span>
                            </h1>
                            <div className="prose prose-xl dark:prose-invert text-gray-400 mx-auto">
                                <p>
                                    Anything you see on mobile & desktop, I can create.
                                </p>
                                <p className="font-semibold text-white">
                                    Mobile & Web Development.
                                </p>
                            </div>
                        </div>

                        {/* Animated Icons Showcase */}
                        <div className="flex items-center justify-center gap-12 mt-8">
                            {/* Desktop Icon */}
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full group-hover:bg-blue-500/40 transition-all duration-500"></div>
                                <Monitor size={80} className="text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.6)] relative z-10" />
                            </motion.div>

                            {/* Mobile Icon */}
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full group-hover:bg-green-500/40 transition-all duration-500"></div>
                                <Smartphone size={60} className="text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.6)] relative z-10" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
