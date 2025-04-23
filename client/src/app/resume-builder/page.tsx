"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { useMyContext } from "@/context/MyContext"
import { ResumePreview } from "@/components/resume-builder/ResumePreview"
import { TemplateSelector } from "@/components/resume-builder/TemplateSelector"
import { EditorPanel } from "@/components/resume-builder/EditorPanel"
import { useResumeStore } from "@/lib/store/resume-store"
import { SparklesCore } from "@/components/ui/sparkles"
import { cn } from "@/lib/utils"

export default function ResumeBuilder() {
  const { userProfile } = useMyContext()
  const [selectedTemplate, setSelectedTemplate] = useState<string>("default")
  const { resume, updateResume } = useResumeStore()

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="max-w-[90vw] mx-auto relative z-10 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#ffaa40] via-[#7D47EA] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
            AI Resume Builder
          </h1>
          <p className="text-gray-300 text-lg">
            Create your professional resume with our AI-powered builder
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Editor */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#1a1a1a] rounded-xl p-6 border border-[#7d47ea]/20 shadow-[0_0_20px_rgba(125,71,234,0.1)] hover:border-[#7d47ea]/40 transition-all duration-300"
          >
            <TemplateSelector 
              selectedTemplate={selectedTemplate}
              onSelectTemplate={setSelectedTemplate}
            />
            <EditorPanel 
              resume={resume}
              onUpdate={updateResume}
            />
          </motion.div>

          {/* Right Panel - Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[#1a1a1a] rounded-xl p-6 border border-[#7d47ea]/20 shadow-[0_0_20px_rgba(125,71,234,0.1)] hover:border-[#7d47ea]/40 transition-all duration-300"
          >
            <ResumePreview 
              resume={resume}
              template={selectedTemplate}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
} 