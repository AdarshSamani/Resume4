"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { TemplateSelectorProps, Template } from "@/types/resume"
import { SparklesCore } from "@/components/ui/sparkles"
import { cn } from "@/lib/utils"

const templates: Template[] = [
  {
    id: "default",
    name: "Modern",
    thumbnail: "/placeholders/template1.png",
    description: "Clean and professional design with modern typography",
    category: "Professional",
  },
  {
    id: "classic",
    name: "Classic",
    thumbnail: "/placeholders/template2.png",
    description: "Traditional layout with timeless appeal",
    category: "Professional",
  },
  {
    id: "creative",
    name: "Creative",
    thumbnail: "/placeholders/template3.png",
    description: "Innovative design for creative professionals",
    category: "Creative",
  },
]

export function TemplateSelector({
  selectedTemplate,
  onSelectTemplate,
}: TemplateSelectorProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-6 text-white">Choose a Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "relative cursor-pointer rounded-xl overflow-hidden group",
              "bg-[#1a1a1a] border-2 transition-all duration-300",
              selectedTemplate === template.id
                ? "border-[#7d47ea] shadow-[0_0_20px_rgba(125,71,234,0.2)]"
                : "border-transparent hover:border-[#7d47ea]/40"
            )}
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="relative w-full h-[280px] bg-[#2a2a2a] flex items-center justify-center overflow-hidden">
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={200}
                className="absolute inset-0"
                particleColor="#7d47ea"
              />
              <div className="relative z-10 text-center p-4">
                <p className="text-gray-400 text-lg font-medium">{template.name}</p>
                <p className="text-gray-500 text-sm mt-2">{template.description}</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{template.name}</p>
                  <p className="text-gray-400 text-sm">{template.category}</p>
                </div>
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 transition-colors duration-300",
                  selectedTemplate === template.id
                    ? "border-[#7d47ea] bg-[#7d47ea]"
                    : "border-gray-500 group-hover:border-[#7d47ea]"
                )}>
                  {selectedTemplate === template.id && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 