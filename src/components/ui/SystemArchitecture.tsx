"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
    Monitor, 
    Server, 
    Database, 
    Cloud, 
    Smartphone, 
    Globe, 
    Cpu,
    LucideIcon
} from "lucide-react";

// Types
type SkillCategory = "frontend" | "backend" | "database" | "devops";

interface ArchitectureNode {
    id: string;
    label: string;
    icon: LucideIcon;
    category: SkillCategory | "core";
    position: { x: number; y: number }; // Percentage 0-100
    description: string;
    skills: string[];
}

interface SystemArchitectureProps {
    skills: {
        frontend: string[];
        backend: string[];
        database: string[];
        devops: string[];
    };
}

const SystemArchitecture: React.FC<SystemArchitectureProps> = ({ skills }) => {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // Node Definitions
    const nodes: ArchitectureNode[] = [
        {
            id: "core",
            label: "System Core",
            icon: Cpu,
            category: "core",
            position: { x: 50, y: 15 }, // Top Center
            description: "Central processing & logic orchestration",
            skills: []
        },
        {
            id: "frontend",
            label: "Client Frontend",
            icon: Monitor,
            category: "frontend",
            position: { x: 20, y: 55 }, // Middle Left
            description: "Responsive, interactive UI/UX layers",
            skills: skills.frontend
        },
        {
            id: "backend",
            label: "API Services",
            icon: Server,
            category: "backend",
            position: { x: 50, y: 55 }, // Middle Center
            description: "Scalable business logic & APIs",
            skills: skills.backend
        },
        {
            id: "devops",
            label: "Cloud Infra",
            icon: Cloud,
            category: "devops",
            position: { x: 80, y: 55 }, // Middle Right
            description: "CI/CD, Hosting & Reliability",
            skills: skills.devops
        },
        {
            id: "database",
            label: "Data Store",
            icon: Database,
            category: "database",
            position: { x: 50, y: 85 }, // Bottom Center (under Backend)
            description: "Persistent & cached data management",
            skills: skills.database
        }
    ];

    // Connections: Tree structure
    const connections = [
        { from: "core", to: "frontend" },
        { from: "core", to: "backend" },
        { from: "core", to: "devops" },
        { from: "backend", to: "database" }, // Backend -> Database
        { from: "devops", to: "backend" }, // DevOps -> Backend (Deployment flow interaction)
    ];

    // Helper to get coordinates for SVG lines
    const getPos = (id: string) => nodes.find(n => n.id === id)?.position || { x: 0, y: 0 };

    return (
        <div className="relative w-full h-[600px] md:h-[700px] bg-card/20 rounded-xl overflow-hidden border border-border/40 my-8">
            {/* Background Grid/Matrix effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

            {/* SVG Layer for Lines & Particles */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {connections.map((conn, idx) => {
                    const start = getPos(conn.from);
                    const end = getPos(conn.to);
                    
                    return (
                        <ConnectionLine 
                            key={`${conn.from}-${conn.to}`} 
                            start={start} 
                            end={end} 
                            delay={idx * 0.5}
                        />
                    );
                })}
            </svg>

            {/* Nodes Layer */}
            {nodes.map((node) => (
                <ArchitectureNodeItem 
                    key={node.id} 
                    node={node} 
                    isHovered={hoveredNode === node.id}
                    onHover={setHoveredNode}
                />
            ))}
        </div>
    );
};

// Sub-component: Connection Line with moving particle
const ConnectionLine = ({ start, end, delay }: { start: {x:number, y:number}, end: {x:number, y:number}, delay: number }) => {
    return (
        <>
            {/* Base Line */}
            <line 
                x1={`${start.x}%`} 
                y1={`${start.y}%`} 
                x2={`${end.x}%`} 
                y2={`${end.y}%`} 
                stroke="currentColor" 
                strokeOpacity="0.1" 
                strokeWidth="2"
            />
            {/* Animated Particle */}
            <motion.circle 
                r="3" 
                fill="currentColor" 
                className="text-primary"
                initial={{ offsetDistance: "0%" }}
                animate={{ 
                    offsetDistance: "100%",
                    opacity: [0, 1, 1, 0] // Fade in start, fade out end
                }}
                transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: delay
                }}
                style={{
                    offsetPath: `path("M ${start.x} ${start.y} L ${end.x} ${end.y}")` // Note: percentage paths in CSS offset-path are tricky in some browsers, but let's try or fallback to motion value interpolation
                }}
            >
                {/* Fallback Animation if offsetPath isn't perfect: Move cx/cy */}
            </motion.circle>
            
            {/* Alternative: SVG Motion Path using stroke-dasharray? No, let's use actual coordinate interpolation for max compatibility */}
             <motion.circle 
                r="3" 
                fill="currentColor" 
                className="text-primary"
                initial={{ cx: `${start.x}%`, cy: `${start.y}%`, opacity: 0 }}
                animate={{ 
                    cx: `${end.x}%`, 
                    cy: `${end.y}%`,
                    opacity: [0, 1, 1, 0]
                }}
                transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: delay
                }}
            />
        </>
    );
};

// Sub-component: Individual Node
const ArchitectureNodeItem = ({ node, isHovered, onHover }: { node: ArchitectureNode, isHovered: boolean, onHover: (id: string | null) => void }) => {
    const isCore = node.category === "core";
    
    return (
        <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
            style={{ left: `${node.position.x}%`, top: `${node.position.y}%` }}
            onMouseEnter={() => onHover(node.id)}
            onMouseLeave={() => onHover(null)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            whileHover={{ scale: 1.1 }}
        >
            {/* Label Tooltip (Above the node) */}
            <motion.div 
                className={`absolute ${node.position.y > 60 ? '-bottom-10' : '-top-10'} left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-secondary/80 text-xs font-semibold backdrop-blur-sm pointer-events-none border border-border/50`}
                animate={{ opacity: isHovered || isCore ? 1 : 0.7, y: isHovered ? (node.position.y > 60 ? 5 : -5) : 0 }}
            >
                {node.label}
            </motion.div>

            {/* Icon Container */}
            <div className={`
                relative flex items-center justify-center rounded-2xl border shadow-xl transition-all duration-300
                ${isCore 
                    ? 'w-24 h-24 bg-primary/20 border-primary text-primary shadow-primary/20' 
                    : 'w-16 h-16 bg-card border-border text-foreground hover:border-primary/50 hover:text-primary hover:shadow-primary/10'}
            `}>
                {/* Pulse Effect for Core */}
                {isCore && (
                    <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping opacity-20" />
                )}
                
                {/* Icon */}
                <node.icon size={isCore ? 40 : 28} strokeWidth={1.5} />
            </div>

            {/* Floating Skills List (Below the node on hover) */}
            {node.skills.length > 0 && isHovered && (
                <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-48 z-50 pointer-events-none"
                >
                    <div className="bg-popover/90 backdrop-blur-md border border-border p-3 rounded-lg shadow-xl text-center">
                        <div className="flex flex-wrap justify-center gap-1.5">
                            {node.skills.map((skill, idx) => (
                                <span key={idx} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default SystemArchitecture;
