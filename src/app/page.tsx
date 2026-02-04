'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import SectionWrapper from "@/components/ui/SectionWrapper";
import TerminalHero from "@/components/ui/TerminalHero";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <SectionWrapper id="hero" className="relative flex items-center justify-center min-h-[calc(100vh-80px)] overflow-hidden bg-[#0a0a0a]">
       {/* Background ambient glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container px-4 md:px-6 relative z-10 w-full h-full flex flex-col md:flex-row items-center gap-12">
        
        {/* Terminal - Top Left (Stack first on mobile, Left on Desktop) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 order-1 md:order-1 flex justify-start"
        >
            {/* Scaled down slightly to fit well as a side element */}
           <div className="w-full max-w-[500px]">
              <TerminalHero />
           </div>
        </motion.div>

        {/* Main Text Content - Restored Original Font & Style */}
        <motion.div 
           initial={{ opacity: 0, x: 50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="w-full md:w-1/2 order-2 md:order-2 flex flex-col items-center md:items-start text-center md:text-left space-y-8"
        >
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl text-white">
              Full Stack Developer <br className="hidden sm:inline" />
              <span className="text-gray-400 block mt-2 text-3xl sm:text-4xl font-bold">
                Building Scalable & Secure Web Apps
              </span>
            </h1>
            <p className="max-w-[600px] text-gray-400 md:text-xl leading-relaxed">
            4+ years of experience developing robust digital systems for SaaS and enterprise environments, including projects requiring structured workflows, reliability, and compliance-ready design.
            </p>
          </div>
          
          <div className="flex flex-row gap-4">
            <Button asChild size="lg" className="h-12 px-8 text-base bg-white text-black hover:bg-gray-200">
              <Link href="/projects" className="flex items-center gap-2">
                View Projects
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <Link href="/contact">Contact Me</Link>
            </Button>
          </div>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
