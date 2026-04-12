"use client";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface AccordionFAQProps {
  items: FAQItem[];
}

export function AccordionFAQ({ items }: AccordionFAQProps) {
  return (
    <Accordion.Root type="single" collapsible className="flex flex-col gap-2">
      {items.map((item, i) => (
        <Accordion.Item
          key={i}
          value={`item-${i}`}
          className="border border-slate-200 rounded-xl overflow-hidden bg-white"
        >
          <Accordion.Header>
            <Accordion.Trigger
              className={cn(
                "w-full flex items-center justify-between px-5 py-4 text-left",
                "text-sm font-semibold text-slate-900 hover:text-sky-600 transition-colors",
                "group data-[state=open]:text-sky-600"
              )}
            >
              {item.question}
              <ChevronDown
                className="h-4 w-4 text-slate-400 group-data-[state=open]:text-sky-500 flex-shrink-0 ml-2
                  transition-transform duration-200 group-data-[state=open]:rotate-180"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content
            className="overflow-hidden text-sm text-slate-500 leading-relaxed
              data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
          >
            <div className="px-5 pb-4">{item.answer}</div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
