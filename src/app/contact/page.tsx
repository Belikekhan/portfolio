import SectionWrapper from "@/components/ui/SectionWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
    const contactLinks = [
        {
            label: "Email",
            value: "hello@adnancreate.com",
            href: "mailto:hello@adnancreate.com",
            icon: <Mail className="w-6 h-6" />,
            description: "Drop me a line for opportunities or just to say hi."
        },
        {
            label: "LinkedIn",
            value: "linkedin.com/in/adnancreate",
            href: "https://linkedin.com/in/adnancreate",
            icon: <Linkedin className="w-6 h-6" />,
            description: "Connect with me professionally."
        },
        {
            label: "GitHub",
            value: "github.com/adnancreate",
            href: "https://github.com/adnancreate",
            icon: <Github className="w-6 h-6" />,
            description: "Check out my open source contributions."
        }
    ];

    return (
        <div className="flex flex-col min-h-screen py-20">
            <SectionWrapper>
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col gap-12 max-w-4xl mx-auto">
                        <div className="space-y-4 text-center">
                            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
                                Get in <span className="text-primary">Touch</span>
                            </h1>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            {contactLinks.map((link, index) => (
                                <Link 
                                    key={index} 
                                    href={link.href}
                                    target={link.label !== "Email" ? "_blank" : undefined}
                                    rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                                    className="block group"
                                >
                                    <Card className="h-full border-border/50 bg-card/50 backdrop-blur hover:bg-card hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md">
                                        <CardHeader>
                                            <div className="p-3 w-fit rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                                {link.icon}
                                            </div>
                                            <CardTitle className="flex items-center gap-2">
                                                {link.label}
                                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="font-medium truncate mb-1">
                                                {link.value}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {link.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
