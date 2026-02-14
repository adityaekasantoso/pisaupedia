import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = {
  question: string;
  answer: string;
};

const faqsData: FaqItem[] = [
  {
    question: "What types of knives do you sell?",
    answer:
      "We offer a wide range of knives including chef knives, santoku knives, cleavers, fillet knives, paring knives, and specialty knives for sushi and sashimi. All products are carefully selected for quality, sharpness, and durability.",
  },
  {
    question: "What materials are used for the knife blades?",
    answer:
      "Our knives are made from high-quality stainless steel, high-carbon steel, and Damascus steel. Each material is chosen for its sharpness retention, corrosion resistance, and long-lasting performance.",
  },
  {
    question: "Are your knives suitable for professional use?",
    answer:
      "Yes, our knives are designed for both home cooks and professional chefs. They offer excellent balance, razor-sharp edges, and ergonomic handles for extended use in professional kitchens.",
  },
  {
    question: "How should I care for and maintain my knife?",
    answer:
      "We recommend hand washing your knife with mild soap and drying it immediately after use. Avoid dishwashers, store in a knife block or sheath, and regularly sharpen using a whetstone or sharpening tool to maintain optimal performance.",
  },
  {
    question: "Do you offer sharpening services?",
    answer:
      "Currently, we provide sharpening guides and tools for purchase. Detailed instructions are available to help you maintain your knife’s sharpness at home.",
  },
  {
    question: "What are the shipping options and delivery times?",
    answer:
      "We offer standard and express shipping options. Delivery times typically range from 2–7 business days depending on your location. Shipping costs are calculated at checkout.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we provide international shipping to selected countries. Shipping fees and delivery times vary depending on the destination.",
  },
  {
    question: "What is your return and warranty policy?",
    answer:
      "We offer a 7–14 day return policy for unused items in their original packaging. Additionally, selected products come with a warranty covering manufacturing defects.",
  },
  {
    question: "Are your knives authentic and original?",
    answer:
      "Yes, all knives sold on our website are 100% authentic and sourced directly from trusted manufacturers or official distributors.",
  },
];

const FaqContent = () => {
  return (
    <section>
      <h3 className="text-xl sm:text-2xl font-bold text-black mb-5 sm:mb-6">
        Frequently asked questions
      </h3>
      <Accordion type="single" collapsible>
        {faqsData.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx + 1}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FaqContent;
