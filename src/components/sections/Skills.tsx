import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Code, Database, Globe, Lock, Server, Settings, Terminal, Wrench } from "lucide-react";

const skills = [
    {
        category: "Frontend",
        icon: <Globe className="w-5 h-5 mb-2 text-primary" />,
        items: ["React.js", "Next.js", "Tailwind CSS", "Redux", "Framer Motion"],
    },
    {
        category: "Backend",
        icon: <Server className="w-5 h-5 mb-2 text-primary" />,
        items: ["Node.js", "Express.js", "REST APIs", "GraphQL"],
    },
    {
        category: "Database",
        icon: <Database className="w-5 h-5 mb-2 text-primary" />,
        items: ["MongoDB", "Mongoose", "PostgreSQL", "Redis"],
    },
    {
        category: "Security",
        icon: <Lock className="w-5 h-5 mb-2 text-primary" />,
        items: ["JWT", "RBAC", "Encryption", "2FA", "OAuth 2.0"],
    },
    {
        category: "DevOps",
        icon: <Settings className="w-5 h-5 mb-2 text-primary" />,
        items: ["AWS", "Vercel", "Docker", "CI/CD (GitHub Actions)"],
    },
    {
        category: "Testing & Tools",
        icon: <Wrench className="w-5 h-5 mb-2 text-primary" />,
        items: ["Jest", "React Testing Library", "Git", "Jira", "Postman"],
    },
];

export default function Skills() {
    return (
        <SectionWrapper id="skills" className="py-12">
            <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
                    Technical Expertise
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {skills.map((skill, index) => (
                        <Card key={index} className="hover:border-primary/50 transition-colors">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    {skill.icon}
                                    <CardTitle>{skill.category}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {skill.items.map((item) => (
                                        <span
                                            key={item}
                                            className="inline-flex items-center rounded-md border border-input bg-secondary/50 px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-secondary"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
