"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const courses = [
    {
        title: "Claud Code in Action",
        provider: "Skilljar / Anthropic",
        date: "Completed",
        link: "https://verify.skilljar.com/c/tunvnjv2hozr",
        description: "Advanced implementation and architectural patterns using Claude AI models for complex software development tasks.",
        status: "Certified"
    },
    {
        title: "Claude 101",
        provider: "Skilljar / Anthropic",
        date: "Completed",
        link: "https://verify.skilljar.com/c/8g5exusnggwh",
        description: "Foundational course on leveraging Claude AI models for prompt engineering and developer workflows.",
        status: "Certified"
    }
];

export default function Courses() {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            {courses.map((course, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <Card className="h-full bg-card/50 backdrop-blur border-border/60 hover:border-primary/50 transition-colors group overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Award size={80} />
                        </div>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2 text-primary font-medium text-sm">
                                    <CheckCircle2 size={16} />
                                    {course.status}
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground text-xs">
                                    <Calendar size={14} />
                                    {course.date}
                                </div>
                            </div>
                            <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                {course.title}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground font-medium">{course.provider}</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {course.description}
                            </p>
                            <Button asChild variant="outline" size="sm" className="w-full group/btn">
                                <Link 
                                    href={course.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2"
                                >
                                    Verify Certificate
                                    <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}
