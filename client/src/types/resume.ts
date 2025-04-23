export interface Resume {
  personalInfo: {
    name: string
    title: string
    email: string
    phone: string
    location?: string
    github?: string
  }
  summary?: string
  experience: Array<{
    title: string
    company: string
    duration: string
    description: string[]
  }>
  education: Array<{
    degree: string
    institution: string
    duration: string
    gpa?: string
    relevantCoursework?: string
  }>
  skills: string[]
  projects?: Array<{
    name: string
    description: string[]
    duration?: string
    technologies?: string[]
    achievements?: string[]
  }>
  activities?: Array<{
    name: string
    role: string
    duration: string
    description?: string[]
  }>
  languages?: string
  certifications?: string
  awards?: string
}

export interface Template {
  id: string
  name: string
  thumbnail: string
  description: string
  category: string
}

export interface ResumePreviewProps {
  resume: Resume
  template: string
}

export interface TemplateSelectorProps {
  selectedTemplate: string
  onSelectTemplate: (template: string) => void
}

export interface EditorPanelProps {
  resume: Resume
  onUpdate: (data: Partial<Resume>) => void
}

export interface Project {
  name: string
  description: string[]
  duration?: string
  technologies?: string[]
  achievements?: string[]
} 