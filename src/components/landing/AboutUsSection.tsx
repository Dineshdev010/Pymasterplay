import { Github, Linkedin, Twitter, Mail, Code2, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutUsSection() {
  return (
    <section className="py-24 bg-surface-0 relative overflow-hidden" id="about-us">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-python-yellow/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left: Instructor Image & Card */}
          <div className="w-full lg:w-5/12 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-python-yellow rounded-3xl blur-2xl opacity-20 transform -rotate-6 scale-105" />
            <div className="bg-surface-1 border border-border p-2 rounded-3xl shadow-2xl relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-surface-2 relative group">
                {/* 
                  TODO: Replace this placeholder with your actual photo in the public folder.
                  Example: <img src="/instructor.jpg" alt="M. Dinesh Raja" ... />
                */}
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" 
                  alt="M. Dinesh Raja" 
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                
                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-bold text-sm">"Empowering the next million developers."</p>
                </div>
              </div>
            </div>
            
            {/* Social Links floating next to the card */}
            <div className="absolute -right-6 bottom-12 flex flex-col gap-3">
              <Button size="icon" variant="outline" className="rounded-full w-12 h-12 bg-surface-1 shadow-xl hover:text-[#0A66C2] hover:border-[#0A66C2]">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full w-12 h-12 bg-surface-1 shadow-xl hover:text-white hover:border-white">
                <Github className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full w-12 h-12 bg-surface-1 shadow-xl hover:text-[#1DA1F2] hover:border-[#1DA1F2]">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Right: Content details */}
          <div className="w-full lg:w-7/12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              <Code2 className="w-4 h-4" /> About The Instructor
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-python-yellow">M. Dinesh Raja</span>
            </h2>
            
            <div className="space-y-6 text-muted-foreground text-lg mb-10">
              <p>
                As a passionate Senior Software Engineer and Educator, I built PyMaster to democratize Python education. I noticed that most premium coding platforms hide their best DSA problems and execution environments behind expensive paywalls.
              </p>
              <p>
                My goal is simple: Create the world's most engaging, gamified, and technically robust Python learning platform for absolute beginners and interview-prepping experts alike. Here, you learn by doing, earn real certificates, and build a lasting coding habit.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-10">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-foreground flex items-center gap-2">
                  10+ <span className="text-primary text-sm font-bold">Years</span>
                </span>
                <span className="text-sm text-muted-foreground mt-1">Industry Experience</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-foreground flex items-center gap-2">
                  5k+ <span className="text-streak-green text-sm font-bold">Students</span>
                </span>
                <span className="text-sm text-muted-foreground mt-1">Mentored Globally</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-foreground flex items-center gap-2">
                  100% <span className="text-python-yellow text-sm font-bold">Free</span>
                </span>
                <span className="text-sm text-muted-foreground mt-1">Platform Access</span>
              </div>
            </div>

            <Button size="lg" className="h-14 px-8 text-base bg-surface-1 text-foreground border border-border hover:bg-surface-2 gap-2">
              <Mail className="w-5 h-5" /> Contact Me Directly
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
