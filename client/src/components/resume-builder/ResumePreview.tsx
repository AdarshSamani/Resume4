"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { ResumePreviewProps } from "@/types/resume"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"

export function ResumePreview({ resume, template }: ResumePreviewProps) {
  const previewRef = React.useRef<HTMLDivElement>(null)

  const downloadPDF = async () => {
    if (!previewRef.current) return

    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: 794,
      windowHeight: 1123,
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save(`${resume?.personalInfo?.name || 'Resume'}.pdf`)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Preview</h2>
        <Button
          onClick={downloadPDF}
          className="bg-[#7d47ea] hover:bg-[#5a32c4] text-white transition-colors duration-300"
        >
          <Download className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
      </div>

      <motion.div
        ref={previewRef}
        className="resume-content bg-white text-black p-8 rounded-lg overflow-auto shadow-lg"
        style={{
          width: '210mm',
          minHeight: '297mm',
          margin: '0 auto',
          fontSize: '11pt',
          lineHeight: '1.3',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-1">{resume?.personalInfo?.name}</h1>
            {resume?.personalInfo?.title && (
              <div className="text-lg font-medium mb-2">{resume.personalInfo.title}</div>
            )}
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
              {resume?.personalInfo?.location && (
                <span className="flex items-center">
                  <span className="mr-1">|</span>
                  {resume.personalInfo.location}
                </span>
              )}
              {resume?.personalInfo?.phone && (
                <span className="flex items-center">
                  <span className="mr-1">|</span>
                  {resume.personalInfo.phone}
                </span>
              )}
              {resume?.personalInfo?.email && (
                <span className="flex items-center">
                  <span className="mr-1">|</span>
                  {resume.personalInfo.email}
                </span>
              )}
              {resume?.personalInfo?.github && (
                <span className="flex items-center">
                  <span className="mr-1">|</span>
                  <a 
                    href={resume.personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    GitHub
                  </a>
                </span>
              )}
            </div>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase mb-3 pb-1 border-b-2 border-black">EDUCATION</h2>
            {resume?.education?.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold">{edu.institution}</div>
                    <div>{edu.degree}</div>
                    {edu.relevantCoursework && (
                      <div className="text-sm">
                        Relevant Coursework: {edu.relevantCoursework}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div>{edu.duration}</div>
                    {edu.gpa && <div>Cumulative GPA: {edu.gpa}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase mb-3 pb-1 border-b-2 border-black">EXPERIENCE</h2>
            {resume?.experience?.map((exp, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-start">
                  <div className="font-bold">{exp.company}</div>
                  <div>{exp.duration}</div>
                </div>
                <div className="italic mb-1">{exp.title}</div>
                <ul className="list-disc ml-4 text-sm space-y-1">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Technical Skills */}
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase mb-3 pb-1 border-b-2 border-black">TECHNICAL SKILLS</h2>
            <div className="text-sm">
              {resume?.skills?.join(", ")}
            </div>
          </div>

          {/* Projects */}
          {resume?.projects && resume.projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold uppercase mb-3 pb-1 border-b-2 border-black">UNIVERSITY PROJECTS</h2>
              {resume.projects.map((project, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between items-start">
                    <div className="font-bold">{project.name}</div>
                    {project.duration && <div>{project.duration}</div>}
                  </div>
                  <ul className="list-disc ml-4 text-sm space-y-1">
                    {project.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="text-sm mb-1">
                      <span className="font-bold">Technologies:</span> {project.technologies.join(", ")}
                    </div>
                  )}
                  {project.achievements && project.achievements.length > 0 && (
                    <ul className="list-disc ml-4 text-sm space-y-1">
                      {project.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Activities */}
          {resume?.activities && resume.activities.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold uppercase mb-3 pb-1 border-b-2 border-black">ACTIVITIES</h2>
              {resume.activities.map((activity, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between items-start">
                    <div className="font-bold">{activity.name}</div>
                    <div>{activity.duration}</div>
                  </div>
                  <div className="italic mb-1">{activity.role}</div>
                  {activity.description && (
                    <ul className="list-disc ml-4 text-sm space-y-1">
                      {activity.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Additional */}
          {(resume?.languages || resume?.certifications || resume?.awards) && (
            <div className="mb-6">
              <h2 className="text-lg font-bold uppercase mb-3 pb-1 border-b-2 border-black">ADDITIONAL</h2>
              {resume?.languages && (
                <div className="mb-2">
                  <span className="font-bold">Languages:</span> {resume.languages}
                </div>
              )}
              {resume?.certifications && (
                <div className="mb-2">
                  <span className="font-bold">Certifications:</span> {resume.certifications}
                </div>
              )}
              {resume?.awards && (
                <div className="mb-2">
                  <span className="font-bold">Awards:</span> {resume.awards}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
} 