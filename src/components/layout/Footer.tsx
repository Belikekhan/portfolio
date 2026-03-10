import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-border bg-background py-12">
            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col gap-2 text-center md:text-left">
                    <Link href="/" className="text-lg font-bold">
                        AdnanCreate
                    </Link>
                    <p className="text-sm text-muted-foreground">
                        Building scalable, secure, and user-centric web applications.
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <a
                        href="https://github.com/Belikekhan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="GitHub"
                    >
                        <Github size={20} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/mohammed-adnan-khan-923832239"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={20} />
                    </a>
                    <a
                        href="mailto:adnankhan3120@gmail.com"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Email"
                    >
                        <Mail size={20} />
                    </a>
                </div>

                <p className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Mohammed Adnan Khan. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
