import SectionWrapper from "@/components/ui/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

import ProjectSlider from "@/components/ProjectSlider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion";

export default function ProjectsPage() {
    const projects = [

    {
        title: "Glorep Compliance & Identity Verification (IDV) Platform",
        description: "A comprehensive, multi-tenant SaaS solution designed to streamline KYC and AML workflows.",
        link: "https://glorep.com/",
        details: [
            "Architecture: React.js frontend ecosystem with a shared API backend, divided into four distinct applications.",
            "Super Admin Portal: Central command center for SaaS lifecycle management, tenant onboarding, subscription handling, and system-wide risk monitoring.",
            "Organization Admin Dashboard: B2B workspace allowing compliance teams to configure risk matrices, monitor transactions, and review verification reports.",
            "End-User Verification Portal: Client-facing web app for identity verification, featuring Liveliness Checks, Face Matching, and Document Scanning (Passport/ID) using MediaPipe.",
            "Public Registration & Subscription: Onboarding gateway for new business clients with integrated Stripe payment processing.",
        ],
        technologies: ["React.js", "Redux", "Material UI", "Node.js", "Express.js", "MongoDB", "AWS S3", "AWS EC2", "Firebase", "Stripe", "ApexCharts", "TensorFlow/MediaPipe"],
        images: [
            "/projects/glorep/dashboard.png",
            "/projects/glorep/Login_Page.png",
            "/projects/glorep/Entity_Detail.png",
            "/projects/glorep/Individual_Details.png",
            "/projects/glorep/Team-menagment_Role-base-access.png",
            "/projects/glorep/Add_Workflow.png",
            "/projects/glorep/Timeline.png"
        ]
    },
    {
        title: "Alf Management Dashboard",
        description: "A comprehensive administrative solution designed for the Al Fajr organization to manage resources, members, and financial records.",
        link: "https://al-fajr.in/login",
        details: [
            "Member Management Module: Handles the complete lifecycle of organization members (onboarding, profiles, status) using secure API routes and Cloudinary for media.",
            "Financial Transaction System: records and tracks credits/debits with double-entry compatible logging, Firestore transactions, and PDF/CSV reporting.",
            "Role-Based Access Control (RBAC): Ensures security via granular permissions (Super Admin vs. Team Member) using protected routes and middleware.",
            "Activity Logging & Auditing: Centralized logging service capturing generic events for an immutable security audit trail.",
            "System Architecture: Serverless/Edge pattern with Next.js App Router (Frontend), Zod-validated Service Layer, and Firestore for persistence."
        ],
        technologies: ["Next.js 15", "TypeScript", "Firebase (Auth & Firestore)", "Tailwind CSS", "Cloudinary"],
        images: [
            "/projects/alf/dashboard.png",
            "/projects/alf/login.png",
            "/projects/alf/Member_Mangament.png",
            "/projects/alf/Add_Member.png",
            "/projects/alf/TransactionMangament.png",
            "/projects/alf/Add_New_Transaction.png",
            "/projects/alf/View_Transaction.png",
            "/projects/alf/Active_Log.png",
            "/projects/alf/Team_Managment.png",
            "/projects/alf/Add_Team_Member.png",
            "/projects/alf/Add_Role.png"
        ]
    },
        {
        title: "LLM Talks",
        description: "An interactive, spectator-mode web application where users can watch two distinct AI models engage in an autonomous, unscripted conversation set against a pixel-art campfire scene.",
        link: "https://llm-talks.vercel.app/setup",
        details: [
            "The Setup Phase: Users configure the arena, input their own Groq API Key or use 'Demo Mode', select a Topic, conversation mode, and distinct AI Avatars with model IDs and custom system prompts.",
            "The Orchestrator (src/lib/orchestrator.ts): Handles turn-based logic autonomously, maintains full conversation history, pings the API route, and enforces a strict 2-second delay between turns.",
            "Visual Arena: Cinematic pixel-art nighttime environment with Custom CSS gradients. Features stationary Avatars with shaking animations/thinking dots, and a WhatsApp-style seamlessly auto-scrolling message queue generating real-time typing effects.",
            "UI Overlay: HUD displays topics, modes, and turn numbers. Control Toolbar offers blurred glassmorphism allowing pause/resume of the live generation."
        ],
        technologies: ["Next.js 14", "Zustand", "Groq SDK", "Custom CSS", "Tailwind CSS"],
          images: [ "/projects/llmtalk/llmtalk_ss1.png",
            "/projects/llmtalk/llmtalk_ss2.png"
        ]
    },
];

    return (
        <div className="flex flex-col min-h-screen py-20">
            <SectionWrapper>
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
                                Projects
                            </h1>
                            <p className="text-muted-foreground text-lg">
                                Showcasing my technical projects and system architectures.
                            </p>
                        </div>

                        <div className="grid gap-6">
                            {projects.map((project, index) => (
                                <Card key={index} className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
                                    <CardHeader className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                        <div className="space-y-2">
                                            <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
                                            <CardDescription className="text-lg">
                                                {project.description}
                                            </CardDescription>
                                        </div>
                                        {project.link && (
                                            <Button asChild variant="outline" size="sm" className="shrink-0">
                                                <Link 
                                                    href={project.link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2"
                                                >
                                                    Live <ExternalLink className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                        )}
                                    </CardHeader>
                                    <CardContent className="space-y-4">

                                        <div>
                                            <h4 className="font-semibold mb-2 text-primary">Technologies:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech, i) => (
                                                    <span key={i} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm font-medium">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mt-6 border-t pt-6">
                                            <h4 className="font-semibold mb-4 text-primary text-lg">Project Gallery</h4>
                                            <ProjectSlider images={project.images || []} />
                                        </div>
                                        <div className="mt-6">
                                            <Accordion type="single" collapsible className="w-full">
                                                <AccordionItem value="architecture">
                                                    <AccordionTrigger className="text-primary hover:no-underline">Key Architecture Components</AccordionTrigger>
                                                    <AccordionContent>
                                                        <ul className="list-disc list-outside ml-5 space-y-2 text-muted-foreground pt-2">
                                                            {project.details.map((detail, i) => (
                                                                <li key={i} className="pl-1">
                                                                    {detail}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
