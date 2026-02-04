"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const AccordionContext = React.createContext<{
  openItems: string[];
  toggleItem: (value: string) => void;
} | null>(null);

const AccordionItemContext = React.createContext<{ value: string } | null>(null);

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  collapsible?: boolean;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, type = "single", defaultValue, collapsible = false, children, ...props }, ref) => {
    const [openItems, setOpenItems] = React.useState<string[]>(() => {
      if (Array.isArray(defaultValue)) return defaultValue;
      if (defaultValue) return [defaultValue];
      return [];
    });

    const toggleItem = React.useCallback(
      (value: string) => {
        setOpenItems((prev) => {
          if (type === "single") {
             // If collapsible is true, can toggle off. If false, must stay open? 
             // Logic: if clicking the open item AND collapsible, close it.
             // If clicking a different item, switch to it.
             if (prev.includes(value)) {
                 return collapsible ? [] : prev;
             }
             return [value];
          }
          // Multiple
          return prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value];
        });
      },
      [type, collapsible]
    );

    return (
      <AccordionContext.Provider value={{ openItems, toggleItem }}>
        <div ref={ref} className={cn("", className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = "Accordion";

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, children, ...props }, ref) => (
  <AccordionItemContext.Provider value={{ value }}>
      <div ref={ref} className={cn("border-b", className)} {...props}>
        {children}
      </div>
  </AccordionItemContext.Provider>
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, onClick, ...props }, ref) => {
  const context = React.useContext(AccordionContext);
  const itemContext = React.useContext(AccordionItemContext);

  if (!context || !itemContext) {
      throw new Error("AccordionTrigger must be used within Accordion and AccordionItem");
  }

  const { openItems, toggleItem } = context;
  const { value } = itemContext;
  const isOpen = openItems.includes(value);

  return (
    <h3 className="flex">
      <button
        ref={ref}
        onClick={(e) => {
            toggleItem(value);
            onClick?.(e);
        }}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline",
          isOpen && "[&[data-state=open]>svg]:rotate-180", // Rotates the chevron
          className
        )}
        data-state={isOpen ? "open" : "closed"}
        {...props}
      >
        {children}
        <ChevronDown 
            className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")} 
        />
      </button>
    </h3>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(AccordionContext);
  const itemContext = React.useContext(AccordionItemContext);

    if (!context || !itemContext) {
      return null;
  }

  const { openItems } = context;
  const { value } = itemContext;
  const isOpen = openItems.includes(value);

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
           initial={{ height: 0, opacity: 0 }}
           animate={{ height: "auto", opacity: 1 }}
           exit={{ height: 0, opacity: 0 }}
           transition={{ duration: 0.2 }}
           className="overflow-hidden"
        >
            <div ref={ref} className={cn("pb-4 pt-0", className)} {...props}>
                {children}
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
