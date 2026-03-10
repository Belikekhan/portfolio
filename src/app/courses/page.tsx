"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import Courses from "@/components/sections/Courses";

export default function CoursesPage() {
    return (
        <div className="flex flex-col min-h-screen py-20 bg-[#0a0a0a]">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

            <SectionWrapper id="courses-header" className="relative z-10 pt-10">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col gap-12 max-w-5xl mx-auto">
                        <div className="space-y-4 text-center">
                            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl text-white">
                                Completed <span className="text-primary">Courses</span> & Certifications
                            </h1>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Continuous learning is at the heart of my development process. Here are some of the professional certifications I&apos;ve earned.
                            </p>
                        </div>
                        
                        <Courses />
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
