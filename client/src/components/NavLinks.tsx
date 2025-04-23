import { HoverEffect } from "./ui/card-hover-effect";

export function NavLinks() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "AI Advisor",
    link: "advisor",
  },
  {
    title: "Resume Builder",
    link: "resume-builder",
  },
  {
    title: "Roadmaps",
    link: "roadmap",
  },
  {
    title: "Interview Bot",
    link: "interviewbot",
  },
];
