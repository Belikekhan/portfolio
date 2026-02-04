"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectSliderProps {
  images: string[];
}

export default function ProjectSlider({ images }: ProjectSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    // Set initial value
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ensure index is valid when itemsPerPage changes (Render-phase update)
  const maxIndex = Math.max(0, images.length - itemsPerPage);
  if (currentIndex > maxIndex) {
    setCurrentIndex(maxIndex);
  }

  // Auto-slide
  useEffect(() => {
    if (images.length <= itemsPerPage) return;
    
    const interval = setInterval(() => {
      // Check if we are at the end
      if (currentIndex >= images.length - itemsPerPage) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, itemsPerPage, images.length]);

  const nextSlide = () => {
    if (currentIndex >= images.length - itemsPerPage) {
        setCurrentIndex(0);
    } else {
        setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex === 0) {
        setCurrentIndex(Math.max(0, images.length - itemsPerPage));
    } else {
        setCurrentIndex((prev) => prev - 1);
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full group">
       {/* Controls */}
       {images.length > itemsPerPage && (
        <>
            <button 
                onClick={prevSlide}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/80 shadow-md rounded-full text-foreground hover:bg-background transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0 focus:opacity-100"
                aria-label="Previous image"
            >
                <ChevronLeft size={24} />
            </button>
            <button 
                onClick={nextSlide}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/80 shadow-md rounded-full text-foreground hover:bg-background transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0 focus:opacity-100"
                aria-label="Next image"
            >
                <ChevronRight size={24} />
            </button>
        </>
       )}

        <div className="overflow-hidden w-full px-1">
            <motion.div
                className="flex"
                animate={{
                    x: `-${currentIndex * (100 / itemsPerPage)}%`
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                {images.map((img, index) => (
                    <div 
                        key={index}
                        className="shrink-0 px-2 box-border"
                        style={{ width: `${100 / itemsPerPage}%` }}
                    >
                        <div className="relative aspect-[3/4] md:aspect-[4/3] rounded-xl overflow-hidden border border-border shadow-sm bg-muted/30">
                            <Image
                                src={img}
                                alt={`Project image ${index + 1}`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
        
        {/* Pagination Dots (only show if reasonable number of dots) */}
        {images.length - itemsPerPage + 1 <= 10 && (
            <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: Math.ceil(images.length - itemsPerPage + 1) }).map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            idx === currentIndex ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30 hover:bg-primary/50"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        )}
    </div>
  );
}
