// ============================================================
// JOBS PAGE — src/pages/JobsPage.tsx
// Python job listings portal with search, filtering by level,
// and dynamically calculated "posted" dates.
// ============================================================
import { useState, useMemo } from "react";
import { Briefcase, MapPin, DollarSign, Clock, ExternalLink, Search, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  level: string;
  posted: string;
  skills: string[];
  description: string;
}

// Each job has a fixed "daysOffset" — the posted date is calculated relative to today
const pythonJobsRaw: (Omit<Job, "posted"> & { daysOffset: number })[] = [
  { id: "1", title: "Junior Python Developer", company: "TechStart Inc.", location: "Remote", salary: "$55K – $75K", type: "Full-time", level: "Entry Level", daysOffset: 0, skills: ["Python", "Flask", "SQL", "Git"], description: "Build and maintain web applications using Python and Flask. Great opportunity for new developers." },
  { id: "2", title: "Python Data Analyst", company: "DataFlow Labs", location: "New York, NY", salary: "$70K – $95K", type: "Full-time", level: "Mid Level", daysOffset: 1, skills: ["Python", "Pandas", "SQL", "Tableau"], description: "Analyze large datasets and create visualizations to drive business decisions." },
  { id: "3", title: "Backend Python Engineer", company: "CloudScale Systems", location: "San Francisco, CA", salary: "$110K – $150K", type: "Full-time", level: "Senior", daysOffset: 2, skills: ["Python", "Django", "PostgreSQL", "AWS", "Docker"], description: "Design and build scalable backend services for our cloud platform." },
  { id: "4", title: "Python ML Engineer", company: "AI Dynamics", location: "Remote", salary: "$120K – $170K", type: "Full-time", level: "Senior", daysOffset: 3, skills: ["Python", "TensorFlow", "PyTorch", "MLOps", "AWS"], description: "Build and deploy machine learning models at scale for production systems." },
  { id: "5", title: "Python Automation Engineer", company: "AutomateX", location: "Austin, TX", salary: "$80K – $110K", type: "Full-time", level: "Mid Level", daysOffset: 4, skills: ["Python", "Selenium", "CI/CD", "Bash", "Jenkins"], description: "Automate testing and deployment pipelines. Build internal tooling with Python." },
  { id: "6", title: "Python DevOps Engineer", company: "InfraCore", location: "Remote", salary: "$100K – $140K", type: "Full-time", level: "Mid Level", daysOffset: 2, skills: ["Python", "Terraform", "Kubernetes", "AWS", "Linux"], description: "Manage cloud infrastructure and build automation tools using Python." },
  { id: "7", title: "Django Web Developer", company: "WebCraft Studio", location: "London, UK", salary: "£45K – £65K", type: "Full-time", level: "Mid Level", daysOffset: 1, skills: ["Python", "Django", "React", "PostgreSQL"], description: "Build full-stack web applications with Django backend and React frontend." },
  { id: "8", title: "Python Cybersecurity Analyst", company: "SecureNet", location: "Washington, DC", salary: "$90K – $130K", type: "Full-time", level: "Mid Level", daysOffset: 5, skills: ["Python", "Networking", "Penetration Testing", "Linux"], description: "Develop security tools and perform vulnerability assessments using Python." },
  { id: "9", title: "Python Intern", company: "CodeLearn Academy", location: "Remote", salary: "$20/hr", type: "Internship", level: "Entry Level", daysOffset: 0, skills: ["Python", "Git", "SQL"], description: "Learn industry best practices while contributing to real Python projects." },
  { id: "10", title: "Senior Data Engineer", company: "BigData Corp", location: "Seattle, WA", salary: "$140K – $180K", type: "Full-time", level: "Senior", daysOffset: 2, skills: ["Python", "Spark", "Airflow", "AWS", "SQL"], description: "Design and build data pipelines processing millions of records daily." },
  { id: "11", title: "Python QA Automation", company: "TestPro Solutions", location: "Remote", salary: "$65K – $90K", type: "Full-time", level: "Mid Level", daysOffset: 3, skills: ["Python", "Pytest", "Selenium", "API Testing"], description: "Build and maintain automated test suites for web and API testing." },
  { id: "12", title: "FastAPI Developer", company: "SpeedServe", location: "Berlin, Germany", salary: "€55K – €80K", type: "Full-time", level: "Mid Level", daysOffset: 6, skills: ["Python", "FastAPI", "PostgreSQL", "Docker", "Redis"], description: "Build high-performance APIs using FastAPI for our microservices architecture." },
  // ── Fresher Jobs ──
  { id: "13", title: "Python Trainee Developer", company: "FreshCode Labs", location: "Remote", salary: "$30K – $45K", type: "Full-time", level: "Fresher", daysOffset: 0, skills: ["Python", "Git", "HTML", "CSS"], description: "Perfect for fresh graduates! Learn on the job while building real Python projects with mentorship." },
  { id: "14", title: "Graduate Python Analyst", company: "InsightWave", location: "Bangalore, India", salary: "₹4L – ₹6L", type: "Full-time", level: "Fresher", daysOffset: 1, skills: ["Python", "Excel", "SQL", "Pandas"], description: "Kickstart your career in data analytics. No prior experience needed — just Python basics." },
  { id: "15", title: "Python Support Engineer (Fresher)", company: "HelpStack", location: "Remote", salary: "$28K – $40K", type: "Full-time", level: "Fresher", daysOffset: 0, skills: ["Python", "Linux", "Debugging", "Git"], description: "Debug and resolve customer issues using Python scripts. Great first job for PyMaster graduates!" },
  { id: "16", title: "Junior Python Web Developer", company: "StartupNest", location: "Hyderabad, India", salary: "₹3.5L – ₹5.5L", type: "Full-time", level: "Fresher", daysOffset: 2, skills: ["Python", "Flask", "HTML", "CSS", "JavaScript"], description: "Build web apps from day one. Ideal for freshers who completed Python + Flask training." },
  { id: "17", title: "Python Content Creator (Fresher)", company: "CodeEd Media", location: "Remote", salary: "$25K – $35K", type: "Full-time", level: "Fresher", daysOffset: 1, skills: ["Python", "Technical Writing", "Git"], description: "Write Python tutorials, create coding exercises, and help others learn. Perfect for PyMaster enthusiasts!" },
  { id: "18", title: "Python Testing Intern", company: "QualityFirst", location: "Chennai, India", salary: "₹15K/month", type: "Internship", level: "Fresher", daysOffset: 0, skills: ["Python", "Pytest", "Manual Testing"], description: "Learn automated testing with Python. No experience required — just willingness to learn!" },
];

function formatPosted(daysAgo: number): string {
  if (daysAgo === 0) return "Today";
  if (daysAgo === 1) return "1 day ago";
  if (daysAgo < 7) return `${daysAgo} days ago`;
  if (daysAgo < 14) return "1 week ago";
  return `${Math.floor(daysAgo / 7)} weeks ago`;
}

const levels = ["All", "Fresher", "Entry Level", "Mid Level", "Senior"];
const types = ["All", "Full-time", "Internship"];

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");
  const [type, setType] = useState("All");

  const pythonJobs = useMemo<Job[]>(() =>
    pythonJobsRaw.map(j => ({ ...j, posted: formatPosted(j.daysOffset) })),
    []
  );

  const filtered = pythonJobs.filter(job => {
    const matchSearch = search === "" || job.title.toLowerCase().includes(search.toLowerCase()) || job.company.toLowerCase().includes(search.toLowerCase()) || job.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchLevel = level === "All" || job.level === level;
    const matchType = type === "All" || job.type === type;
    return matchSearch && matchLevel && matchType;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
          <Briefcase className="w-7 h-7 text-primary" /> <span className="bg-gradient-to-r from-primary via-primary to-streak-green bg-clip-text text-transparent">Exclusive Python</span> Jobs Board
        </h1>
        <p className="text-muted-foreground mt-2 border-l-2 border-primary pl-3 bg-surface-1 py-2 px-3 rounded-r-md max-w-2xl">
          100% Python-focused career opportunities. Stop filtering through generic tech boards. We curate the best roles for <span className="text-primary font-medium">PyMaster</span> graduates from fresher to senior.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search jobs, companies, skills..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-1 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {levels.map(l => (
            <button key={l} onClick={() => setLevel(l)} className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${level === l ? "bg-primary text-primary-foreground" : "bg-surface-1 text-muted-foreground border border-border hover:text-foreground"}`}>
              {l}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {types.map(t => (
            <button key={t} onClick={() => setType(t)} className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${type === t ? "bg-streak-green text-primary-foreground" : "bg-surface-1 text-muted-foreground border border-border hover:text-foreground"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{filtered.length} jobs found</p>

      {/* Job listings */}
      <div className="space-y-3">
        {filtered.map(job => (
          <div key={job.id} className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all duration-200 group">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{job.title}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${job.level === "Fresher" ? "bg-python-yellow/10 text-python-yellow border border-python-yellow/20" : job.level === "Entry Level" ? "bg-streak-green/10 text-streak-green border border-streak-green/20" : job.level === "Senior" ? "bg-expert-purple/10 text-expert-purple border border-expert-purple/20" : "bg-primary/10 text-primary border border-primary/20"}`}>
                    {job.level}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" />{job.company}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                  <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" />{job.salary}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.posted}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{job.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {job.skills.map(s => (
                    <span key={s} className="text-[11px] px-2 py-0.5 rounded-md bg-surface-2 text-foreground border border-border">{s}</span>
                  ))}
                </div>
              </div>
              <Button size="sm" className="gap-1 shrink-0 self-start" onClick={() => window.open(`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(job.title + " Python")}`, "_blank")}>
                Apply <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
