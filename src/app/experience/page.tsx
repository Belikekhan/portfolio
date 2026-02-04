"use client";

import { useRef } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { 
    Brain, 
    MessageSquare, 
    Target, 
    Workflow, 
    Search, 
    Cpu, 
    Code2, 
    Database, 
    GitBranch, 
    Terminal 
} from "lucide-react";
import { motion } from "framer-motion";
import SystemArchitecture from "@/components/ui/SystemArchitecture";

// Fallback for Badge if it doesn't exist, I'll check first but for now using inline classes if needed or just standard tailwind
const SkillBadge = ({ children }: { children: React.ReactNode }) => (
    <span className="px-3 py-1 bg-secondary/50 text-secondary-foreground rounded-md text-sm font-medium border border-border/50">
        {children}
    </span>
);

const softSkills = [
    {
        title: "Client Communication",
        icon: <MessageSquare className="w-5 h-5 text-primary" />,
        description: "Translating complex technical concepts into clear, actionable business language."
    },
    {
        title: "Requirement Analysis",
        icon: <Target className="w-5 h-5 text-primary" />,
        description: "Deep diving into business needs to architect solutions that solve the right problems."
    },
    {
        title: "Problem Solving",
        icon: <Brain className="w-5 h-5 text-primary" />,
        description: "Approaching challenges with a logical, analytical mindset to find efficient solutions."
    },
    {
        title: "Pattern Recognition",
        icon: <Search className="w-5 h-5 text-primary" />,
        description: "Observing error patterns and workflow bottlenecks to preemptively optimize systems."
    }
];

const technicalArsenal = {
    frontend: ["React.js", "Next.js 15", "Redux Toolkit", "Material UI", "Tailwind CSS", "Framer Motion"],
    backend: ["Node.js", "Express.js", "REST API", "GraphQL", "Firebase Functions"],
    database: ["MongoDB", "Firestore", "Cloudinary", "AWS S3"],
    devops: ["Git", "GitHub actions", "AWS EC2", "Vercel", "Performance Optimization"],
    aiTools: ["Cursor", "Antigravity", "Windsurf", "Google Cloud Code", "Gemini CLI", "Firebase AI Studio", "GitHub Copilot", "OpenAI API", "V0 by Vercel", "Bolt.new", "Claude"]
};

const workflows = [
    {
        title: "Data Operations",
        description: "Full CRUD implementation with strict validation and error handling."
    },
    {
        title: "Authentication Flows",
        description: "Secure Sign-up/Login, OAuth integration, and session management."
    },
    {
        title: "Payment Architecture",
        description: "Secure payment gateway integration (Stripe) with webhooks and subscription lifecycle management."
    },
    {
        title: "Real-time Systems",
        description: "Firebase Messaging, Push Notifications, and live data synchronization."
    },
    {
        title: "API Architecture",
        description: "Scalable REST & GraphQL endpoints with efficient query optimization."
    },
    {
        title: "System Architecture",
        description: "Designing scalable multi-tenant SaaS platforms and serverless ecosystems."
    },
    {
        title: "AI Implementation",
        description: "Integration of Text Generation, Image Generation, and AI Voice Assistance models."
    }
];



export default function ExperiencePage() {
    const sliderRef = useRef<HTMLDivElement>(null);

    return (
        <div className="flex flex-col min-h-screen py-20 gap-16">
            <SectionWrapper>
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col gap-12 max-w-5xl mx-auto">
                        
                        {/* Header */}
                        <div className="space-y-4 text-center md:text-left">
                            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
                                Professional <span className="text-primary">Experience</span>
                            </h1>
                            <p className="text-muted-foreground text-lg max-w-3xl">
                                Beyond code, I bring a holistic approach to software development—combining technical precision with business acumen and a goal-oriented workflow.
                            </p>
                        </div>

                        {/* Soft Skills / Philosophy - Slider */}
                        <div className="relative group">
                            <motion.div ref={sliderRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
                                <motion.div 
                                    drag="x" 
                                    dragConstraints={sliderRef}
                                    className="flex gap-6 min-w-max pb-4 px-1"
                                >
                                    {softSkills.map((skill, idx) => (
                                        <Card key={idx} className="bg-card/50 backdrop-blur border-border/60 w-[280px] md:w-[320px] shrink-0 select-none">
                                            <CardHeader className="pb-3">
                                                <div className="p-2 w-fit rounded-lg bg-primary/10 mb-3">
                                                    {skill.icon}
                                                </div>
                                                <CardTitle className="text-lg">{skill.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm text-muted-foreground">{skill.description}</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </motion.div>
                            </motion.div>
                            {/* Visual hint for dragging */}
                            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden" />
                        </div>

                        {/* Technical Arsenal */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <Code2 className="text-primary" /> Technical Arsenal
                            </h2>
                            {/* Animated System Architecture Visualization */}
                            <SystemArchitecture skills={technicalArsenal} />
                        </div>

                        {/* AI & Workflows */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <Workflow className="text-primary" /> Efficient Workflows
                                </h2>
                                <p className="text-muted-foreground mb-4">
                                    I specialize in building robust, scalable systems with a focus on optimization and maintainability.
                                </p>
                                <ul className="space-y-3">
                                    {workflows.map((flow, idx) => (
                                        <li key={idx} className="flex gap-3 items-start">
                                            <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-primary" />
                                            <div>
                                                <span className="font-semibold text-foreground">{flow.title}: </span>
                                                <span className="text-muted-foreground">{flow.description}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <Brain className="text-primary" /> AI-Augmented Development
                                </h2>
                                <p className="text-muted-foreground mb-4">
                                    Leveraging cutting-edge AI tools to accelerate development, refactor legacy code, and optimize algorithms.
                                </p>
                                <div className="p-6 rounded-xl border border-border bg-gradient-to-br from-background to-secondary/20">
                                    <div className="flex flex-wrap gap-2">
                                        {technicalArsenal.aiTools.map(tool => (
                                            <SkillBadge key={tool}>{tool}</SkillBadge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
