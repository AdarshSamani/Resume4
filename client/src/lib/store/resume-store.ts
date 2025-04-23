import { create } from "zustand"

interface Resume {
  personalInfo: {
    name: string
    title: string
    email: string
    phone: string
    location?: string
    github?: string
  }
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

interface ResumeStore {
  resume: Resume
  updateResume: (data: Resume) => void
  resetResume: () => void
}

const initialResume: Resume = {
  personalInfo: {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    github: "",
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  activities: [],
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resume: initialResume,
  updateResume: (data) => set({ resume: data }),
  resetResume: () => set({ resume: initialResume }),
})) 