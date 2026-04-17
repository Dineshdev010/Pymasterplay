// ============================================================
// JOBS PAGE — src/pages/JobsPage.tsx
// Python job listings portal with search, filtering by level,
// and dynamically calculated "posted" dates.
// ============================================================
import { useEffect, useMemo, useState, useCallback } from "react";
import { Briefcase, MapPin, DollarSign, Clock, ExternalLink, Search, Building2, Sparkles, Rocket, Bookmark, CheckCircle2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/contexts/AuthContext";

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
const regions = ["All Jobs", "Abroad Jobs", "Origin Jobs"] as const;
const statusFilters = ["All Jobs", "Saved Jobs", "Applied Jobs"] as const;
const SAVED_JOBS_KEY = "pymaster_saved_jobs";
const APPLIED_JOBS_KEY = "pymaster_applied_jobs";

function getJobRegion(job: Job): "Abroad Jobs" | "Origin Jobs" {
  const location = job.location.toLowerCase();
  return location.includes("india") ? "Origin Jobs" : "Abroad Jobs";
}

export default function JobsPage() {
  const canonical = "https://pymaster.pro/jobs";
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");
  const [type, setType] = useState("All");
  const [region, setRegion] = useState<(typeof regions)[number]>("All Jobs");
  const [statusFilter, setStatusFilter] = useState<(typeof statusFilters)[number]>("All Jobs");
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = JSON.parse(window.localStorage.getItem(SAVED_JOBS_KEY) || "[]");
      const applied = JSON.parse(window.localStorage.getItem(APPLIED_JOBS_KEY) || "[]");

      setSavedJobs(Array.isArray(saved) ? saved : []);
      setAppliedJobs(Array.isArray(applied) ? applied : []);
    } catch {
      setSavedJobs([]);
      setAppliedJobs([]);
    }
  }, []);

  const toggleSavedJob = (jobId: string) => {
    setSavedJobs((current) => {
      const next = current.includes(jobId)
        ? current.filter((id) => id !== jobId)
        : [...current, jobId];
      window.localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const markApplied = (jobId: string) => {
    setAppliedJobs((current) => {
      if (current.includes(jobId)) return current;

      const next = [...current, jobId];
      window.localStorage.setItem(APPLIED_JOBS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const resetFilters = () => {
    setSearch("");
    setLevel("All");
    setType("All");
    setRegion("All Jobs");
    setStatusFilter("All Jobs");
  };

  const pythonJobs = useMemo<Job[]>(() =>
    pythonJobsRaw.map(j => ({ ...j, posted: formatPosted(j.daysOffset) })),
    []
  );

  const filtered = pythonJobs.filter(job => {
    const matchSearch = search === "" || job.title.toLowerCase().includes(search.toLowerCase()) || job.company.toLowerCase().includes(search.toLowerCase()) || job.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchLevel = level === "All" || job.level === level;
    const matchType = type === "All" || job.type === type;
    const matchRegion = region === "All Jobs" || getJobRegion(job) === region;
    const matchStatus =
      statusFilter === "All Jobs" ||
      (statusFilter === "Saved Jobs" && savedJobs.includes(job.id)) ||
      (statusFilter === "Applied Jobs" && appliedJobs.includes(job.id));
    return matchSearch && matchLevel && matchType && matchRegion && matchStatus;
  });

  const savedJobCards = pythonJobs.filter((job) => savedJobs.includes(job.id)).slice(0, 3);
  const remoteCount = pythonJobs.filter((job) => job.location.toLowerCase().includes("remote")).length;
  const abroadCount = pythonJobs.filter((job) => getJobRegion(job) === "Abroad Jobs").length;
  const fresherCount = pythonJobs.filter((job) => job.level === "Fresher").length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <Helmet>
        <title>Python Jobs | Fresher, Remote, and Abroad Roles on PyMaster</title>
        <meta
          name="description"
          content="Browse curated Python job openings including fresher, remote, internship, and abroad opportunities."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content="Python Jobs | PyMaster" />
        <meta property="og:description" content="Browse curated Python jobs for freshers, remote roles, internships, and abroad opportunities." />
        <meta property="og:image" content="https://pymaster.pro/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Python Jobs | PyMaster" />
        <meta name="twitter:description" content="Browse curated Python jobs for freshers, remote roles, internships, and abroad opportunities." />
        <meta name="twitter:image" content="https://pymaster.pro/og-image.png" />
      </Helmet>
      
      <div className="mb-8 overflow-hidden rounded-[2rem] border border-primary/15 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(34,197,94,0.14),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.96))] p-6 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Career Radar
            </div>
            <h1 id="tour-jobs-header" className="mt-4 text-3xl md:text-4xl font-black text-foreground flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-primary" />
              <span className="bg-gradient-to-r from-primary via-sky-500 to-streak-green bg-clip-text text-transparent">Python Jobs</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
              Handpicked Python roles for PyMaster learners. Browse fresher openings, remote work, and abroad opportunities without digging through generic boards.
            </p>

            
            <div id="tour-jobs-stats" className="mt-5 flex flex-wrap gap-2">
              {regions.map(option => (
                <Button
                  key={option}
                  type="button"
                  variant={region === option ? "default" : "outline"}
                  size="sm"
                  className={region === option ? "shadow-sm" : "bg-background/80"}
                  onClick={() => setRegion(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {statusFilters.map(option => (
                <Button
                  key={option}
                  type="button"
                  variant={statusFilter === option ? "default" : "outline"}
                  size="sm"
                  className={statusFilter === option ? "shadow-sm" : "bg-background/80"}
                  onClick={() => setStatusFilter(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-2">
            <div className="rounded-2xl border border-border/70 bg-background/85 p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <Rocket className="h-4 w-4 text-primary" />
                Freshers
              </div>
              <div className="mt-2 text-3xl font-bold text-foreground">{fresherCount}</div>
              <div className="text-xs text-muted-foreground">roles ready for beginners</div>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/85 p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                Abroad
              </div>
              <div className="mt-2 text-3xl font-bold text-foreground">{abroadCount}</div>
              <div className="text-xs text-muted-foreground">international roles</div>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/85 p-4 sm:col-span-1 lg:col-span-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <Bookmark className="h-4 w-4 text-primary" />
                Remote Ready
              </div>
              <div className="mt-2 text-3xl font-bold text-foreground">{remoteCount}</div>
              <div className="text-xs text-muted-foreground">remote Python roles in this board</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Saved Jobs</div>
          <div className="mt-2 text-2xl font-bold text-foreground">{savedJobs.length}</div>
          <div className="text-xs text-muted-foreground">your shortlist stays in this browser</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Applied</div>
          <div className="mt-2 text-2xl font-bold text-foreground">{appliedJobs.length}</div>
          <div className="text-xs text-muted-foreground">jobs you already opened to apply</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Visible Results</div>
          <div className="mt-2 text-2xl font-bold text-foreground">{filtered.length}</div>
          <div className="text-xs text-muted-foreground">matching your current filters</div>
        </div>
      </div>

      {/* Filters */}
      <div id="tour-jobs-filters" className="mb-6 rounded-2xl border border-border bg-card p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Search className="h-4 w-4 text-primary" />
          Refine Your Search
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
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
          <div className="flex gap-2 overflow-x-auto pb-1">
            {types.map(t => (
              <button key={t} onClick={() => setType(t)} className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${type === t ? "bg-streak-green text-primary-foreground" : "bg-surface-1 text-muted-foreground border border-border hover:text-foreground"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        {filtered.length} jobs found
        <span className="ml-3">Saved: {savedJobs.length}</span>
        <span className="ml-3">Applied: {appliedJobs.length}</span>
      </p>

      {savedJobCards.length > 0 && (
        <div className="mb-6 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Saved Jobs</h2>
              <p className="text-sm text-muted-foreground">Jump back into the jobs you bookmarked.</p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => setStatusFilter("Saved Jobs")}>
              View All Saved
            </Button>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {savedJobCards.map((job) => (
              <div key={`saved-${job.id}`} className="rounded-xl border border-border bg-surface-1 p-4">
                <div className="text-sm font-semibold text-foreground">{job.title}</div>
                <div className="mt-1 text-xs text-muted-foreground">{job.company} • {job.location}</div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {job.skills.slice(0, 3).map((skill) => (
                    <span key={`${job.id}-${skill}`} className="rounded-full bg-background px-2 py-0.5 text-[10px] font-medium text-muted-foreground border border-border">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-xs font-medium text-primary">{job.posted}</span>
                  <Button
                    size="sm"
                    className="gap-1"
                    onClick={() => {
                      markApplied(job.id);
                      window.open(`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(job.title + " Python")}`, "_blank");
                    }}
                  >
                    Apply <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Job listings */}
      <div id="tour-jobs-list" className="space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-[1.4rem] border border-border bg-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold text-foreground">No jobs match your filters</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  This usually happens when a level/type/status filter is too strict.
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button type="button" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
        ) : (
          filtered.map(job => (
            <div key={job.id} className="relative overflow-hidden rounded-[1.4rem] border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_18px_40px_rgba(59,130,246,0.08)] group">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-primary/5 transition-transform duration-500 group-hover:scale-125" />
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="relative z-10 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{job.title}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${job.level === "Fresher" ? "bg-python-yellow/10 text-python-yellow border border-python-yellow/20" : job.level === "Entry Level" ? "bg-streak-green/10 text-streak-green border border-streak-green/20" : job.level === "Senior" ? "bg-expert-purple/10 text-expert-purple border border-expert-purple/20" : "bg-primary/10 text-primary border border-primary/20"}`}>
                      {job.level}
                    </span>
                    {savedJobs.includes(job.id) && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-primary/10 text-primary border border-primary/20">
                        Saved
                      </span>
                    )}
                    {appliedJobs.includes(job.id) && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-streak-green/10 text-streak-green border border-streak-green/20 inline-flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Applied
                      </span>
                    )}
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
                      <span key={s} className="text-[11px] px-2 py-0.5 rounded-md bg-surface-2 text-foreground border border-border transition-colors group-hover:border-primary/20">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="relative z-10 flex shrink-0 self-start gap-2">
                  <Button
                    size="sm"
                    variant={savedJobs.includes(job.id) ? "default" : "outline"}
                    className="gap-1"
                    onClick={() => toggleSavedJob(job.id)}
                  >
                    {savedJobs.includes(job.id) ? "Saved" : "Save"}
                  </Button>
                  <Button
                    size="sm"
                    className="gap-1"
                    onClick={() => {
                      markApplied(job.id);
                      window.open(`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(job.title + " Python")}`, "_blank");
                    }}
                  >
                    {appliedJobs.includes(job.id) ? "Applied" : "Apply"} <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
