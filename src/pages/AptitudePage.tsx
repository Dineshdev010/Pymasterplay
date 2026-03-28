import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import {
  BookOpen,
  Brain,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck,
  Layers3,
  Lightbulb,
  ListChecks,
  Sparkles,
  Target,
  Trophy,
  WandSparkles,
} from "lucide-react";

const aptitudeTypes = [
  {
    title: "Quantitative Aptitude",
    focus: "Percentages, profit and loss, ratio, averages, time-speed-distance, time and work",
    howToClear: "Master formulas, convert words into equations quickly, and practice timed sets every day.",
    shortcuts: [
      "Use percentage to fraction conversions like 50%=1/2, 25%=1/4, 12.5%=1/8.",
      "For averages, total change = average change x number of items.",
      "For time and work, treat one day work as a fraction of the full job.",
    ],
    formulas: [
      "Percentage = (Part / Whole) x 100",
      "Speed = Distance / Time",
      "Work rate = 1 / total days",
    ],
    learningBlocks: [
      {
        title: "What to learn first",
        points: ["Percentages and fractions", "Ratios and proportions", "Averages and mixtures"],
      },
      {
        title: "Common traps",
        points: ["Using wrong base value for percentages", "Ignoring units in speed/time", "Adding ratios directly without scaling"],
      },
    ],
    mcqs: [
      {
        question: "If the price of a shirt increases from 800 to 920, what is the percentage increase?",
        options: ["10%", "12%", "15%", "20%"],
        answer: "15%",
        explanation: "Increase = 120. Percentage increase = 120/800 x 100 = 15%.",
        difficulty: "easy",
        companyTags: ["TCS", "Infosys"],
        strategy: "Find the increase first, then divide by the original value instead of the new value.",
      },
      {
        question: "A can finish a job in 10 days and B in 15 days. Together they finish in:",
        options: ["5 days", "6 days", "7.5 days", "12 days"],
        answer: "6 days",
        explanation: "Combined work rate = 1/10 + 1/15 = 1/6, so the work finishes in 6 days.",
        difficulty: "medium",
        companyTags: ["Accenture", "Capgemini"],
        strategy: "Convert each worker into a one-day work fraction, then add the rates.",
      },
      {
        question: "If the ratio of boys to girls in a class is 3:2 and there are 30 boys, how many girls are there?",
        options: ["18", "20", "22", "24"],
        answer: "20",
        explanation: "3 parts = 30, so 1 part = 10. Girls = 2 parts = 20.",
        difficulty: "easy",
        companyTags: ["Infosys", "Wipro"],
        strategy: "Reduce the ratio to one part first, then scale the missing side.",
      },
      {
        question: "A train covers 120 km in 2 hours. What is its speed?",
        options: ["40 km/h", "50 km/h", "60 km/h", "70 km/h"],
        answer: "60 km/h",
        explanation: "Speed = distance / time = 120 / 2 = 60 km/h.",
        difficulty: "easy",
        companyTags: ["Cognizant", "TCS"],
        strategy: "Use the direct speed formula and keep the units visible.",
      },
    ],
  },
  {
    title: "Logical Reasoning",
    focus: "Series, coding-decoding, blood relations, direction sense, syllogisms, puzzles",
    howToClear: "Write conditions cleanly, eliminate impossible options early, and draw quick diagrams for relations and directions.",
    shortcuts: [
      "For blood relations, draw a mini family tree instead of solving in your head.",
      "For direction problems, use N-E-S-W arrows and track every turn.",
      "In syllogisms, trust the exact statements, not real-world assumptions.",
    ],
    formulas: [
      "Series: check difference, ratio, squares, cubes, alternate pattern",
      "Directions: use x-y movement and Pythagoras for final distance",
      "Coding-decoding: compare position shift or letter pattern",
    ],
    learningBlocks: [
      {
        title: "What to learn first",
        points: ["Number patterns", "Direction diagrams", "Family tree mapping"],
      },
      {
        title: "Common traps",
        points: ["Guessing from intuition", "Skipping diagram steps", "Assuming facts not given"],
      },
    ],
    mcqs: [
      {
        question: "Find the next number in the series: 2, 6, 12, 20, 30, ?",
        options: ["36", "40", "42", "44"],
        answer: "42",
        explanation: "Differences are 4, 6, 8, 10, so next difference is 12. 30 + 12 = 42.",
        difficulty: "medium",
        companyTags: ["Infosys", "Wipro"],
        strategy: "Check the gap between terms before trying multiplication or alternate patterns.",
      },
      {
        question: "A man walks 5 km north, then 3 km east. How far is he from the start?",
        options: ["8 km", "5.8 km", "6 km", "7 km"],
        answer: "5.8 km",
        explanation: "Use Pythagoras: sqrt(5^2 + 3^2) = sqrt(34), approximately 5.8 km.",
        difficulty: "medium",
        companyTags: ["TCS", "Cognizant"],
        strategy: "Turn the movement into a right triangle and use Pythagoras only at the end.",
      },
      {
        question: "If SOUTH is coded as TPVUI, how is NORTH coded in the same pattern?",
        options: ["OPSUI", "NPSUI", "OQRUI", "OPSTI"],
        answer: "OPSUI",
        explanation: "Each letter moves one step forward: N->O, O->P, R->S, T->U, H->I.",
        difficulty: "easy",
        companyTags: ["Accenture", "Infosys"],
        strategy: "Map one sample word letter by letter and apply the same shift exactly.",
      },
      {
        question: "Pointing to a girl, Ravi said, 'She is the daughter of my father's only son.' Who is the girl to Ravi?",
        options: ["Sister", "Daughter", "Niece", "Cousin"],
        answer: "Daughter",
        explanation: "Ravi's father's only son is Ravi himself, so the girl is Ravi's daughter.",
        difficulty: "medium",
        companyTags: ["Wipro", "Capgemini"],
        strategy: "Resolve the innermost relation first and build outward one person at a time.",
      },
    ],
  },
  {
    title: "Verbal Ability",
    focus: "Reading comprehension, sentence correction, grammar, vocabulary, para jumbles",
    howToClear: "Read short passages daily, learn grammar rules by pattern, and eliminate options that sound awkward or ambiguous.",
    shortcuts: [
      "In sentence correction, first check subject-verb agreement and tense consistency.",
      "For para jumbles, find the opening sentence that introduces the topic, not a detail.",
      "In comprehension, answer from the passage, not from outside knowledge.",
    ],
    formulas: [
      "Subject + singular verb for singular heads like each/everyone",
      "Vocabulary: infer meaning from context first",
      "Para-jumbles: intro -> development -> example -> conclusion",
    ],
    learningBlocks: [
      {
        title: "What to learn first",
        points: ["Basic grammar rules", "High-frequency vocabulary", "Reading comprehension skimming"],
      },
      {
        title: "Common traps",
        points: ["Choosing what sounds familiar", "Ignoring tense mismatch", "Using outside knowledge in RC"],
      },
    ],
    mcqs: [
      {
        question: "Choose the correct sentence.",
        options: [
          "Each of the students have submitted their form.",
          "Each of the students has submitted his or her form.",
          "Each of the students have submit their form.",
          "Each of the students has submit their forms.",
        ],
        answer: "Each of the students has submitted his or her form.",
        explanation: "The subject 'Each' is singular, so it takes 'has submitted'.",
        difficulty: "easy",
        companyTags: ["TCS", "Capgemini"],
        strategy: "Find the real subject first. Words after 'of' usually do not control the verb.",
      },
      {
        question: "Choose the word closest in meaning to 'brief'.",
        options: ["Long", "Short", "Loud", "Sharp"],
        answer: "Short",
        explanation: "'Brief' means short in duration or length.",
        difficulty: "easy",
        companyTags: ["Infosys", "Cognizant"],
        strategy: "Eliminate opposites first, then match the closest everyday meaning.",
      },
      {
        question: "Choose the correct synonym of 'abundant'.",
        options: ["Scarce", "Plentiful", "Narrow", "Ancient"],
        answer: "Plentiful",
        explanation: "'Abundant' means more than enough or plentiful.",
        difficulty: "easy",
        companyTags: ["Wipro", "Accenture"],
        strategy: "Look for a meaning pair and remove words that describe size, time, or quantity shortage.",
      },
      {
        question: "Choose the best arrangement for a paragraph opening.",
        options: [
          "A sentence with 'however'",
          "A sentence introducing the main topic",
          "A sentence giving an example",
          "A sentence with a pronoun like 'they'",
        ],
        answer: "A sentence introducing the main topic",
        explanation: "An opening sentence should introduce the topic clearly, not refer back to earlier ideas.",
        difficulty: "medium",
        companyTags: ["Infosys", "TCS"],
        strategy: "An opener should stand alone. Avoid connectors, examples, or pronouns without context.",
      },
    ],
  },
  {
    title: "Data Interpretation",
    focus: "Tables, bar charts, pie charts, caselets, mixed charts",
    howToClear: "Estimate fast, compare values before calculating, and only compute exactly when the options are close.",
    shortcuts: [
      "Convert pie chart percentages into fractions when possible.",
      "Look for ratio comparisons first before doing long calculations.",
      "Round numbers smartly for approximation-based questions.",
    ],
    formulas: [
      "Average = Sum / Number of values",
      "Percentage change = (Change / Original) x 100",
      "Median for even values = average of two middle numbers",
    ],
    learningBlocks: [
      {
        title: "What to learn first",
        points: ["Tables and percentages", "Averages and median", "Ratio-based comparison"],
      },
      {
        title: "Common traps",
        points: ["Over-calculating too early", "Missing units", "Reading the wrong row or column"],
      },
    ],
    mcqs: [
      {
        question: "A company’s sales are 200, 250, and 300 units in three months. What is the average sales figure?",
        options: ["225", "240", "250", "260"],
        answer: "250",
        explanation: "Average = (200 + 250 + 300) / 3 = 250.",
        difficulty: "easy",
        companyTags: ["Capgemini", "Cognizant"],
        strategy: "Add the values carefully once, then divide by the number of entries.",
      },
      {
        question: "If category A is 40% of a total of 500, how many units are in A?",
        options: ["180", "190", "200", "220"],
        answer: "200",
        explanation: "40% of 500 = 0.4 x 500 = 200.",
        difficulty: "easy",
        companyTags: ["Accenture", "Infosys"],
        strategy: "Convert the percentage into a decimal or fraction before multiplying.",
      },
      {
        question: "The values in a table are 40, 50, 60, and 70. What is the median?",
        options: ["50", "55", "60", "65"],
        answer: "55",
        explanation: "For four values, median is the average of the middle two values: (50 + 60) / 2 = 55.",
        difficulty: "medium",
        companyTags: ["TCS", "Wipro"],
        strategy: "For an even count, sort if needed and average the middle two values only.",
      },
      {
        question: "If revenue rises from 400 to 460, what is the percentage increase?",
        options: ["10%", "12%", "15%", "18%"],
        answer: "15%",
        explanation: "Increase = 60. Percentage increase = 60/400 x 100 = 15%.",
        difficulty: "medium",
        companyTags: ["Infosys", "Capgemini"],
        strategy: "Use change divided by original value, not final value.",
      },
    ],
  },
];

type AptitudeType = (typeof aptitudeTypes)[number];
type Mcq = AptitudeType["mcqs"][number];
type PageMode = "learning" | "practice" | "mock";
type DifficultyFilter = "all" | "easy" | "medium" | "hard";

const companySetLabels = ["All Companies", "Infosys", "TCS", "Wipro", "Accenture", "Cognizant", "Capgemini"] as const;
const difficultyFilters: DifficultyFilter[] = ["all", "easy", "medium", "hard"];
const mockSizes = [5, 10, 16];

const prepPlan = [
  "Start with one topic at a time instead of mixing all aptitude types in one session.",
  "Learn formulas and patterns first, then solve easy questions, then timed MCQs.",
  "After every mock set, review why each wrong option was wrong.",
  "Keep a one-page notebook of formulas, shortcut patterns, and frequent traps.",
];

const aptitudeStudyGuide = [
  {
    area: "For quantitative aptitude",
    subjects: ["Percentages", "Ratio and Proportion", "Averages", "Time and Work", "Speed-Time-Distance"],
  },
  {
    area: "For reasoning rounds",
    subjects: ["Series Patterns", "Coding-Decoding", "Blood Relations", "Direction Sense", "Syllogisms"],
  },
  {
    area: "For verbal and DI rounds",
    subjects: ["Grammar Rules", "Vocabulary", "Reading Comprehension", "Tables and Charts", "Percent Comparison"],
  },
];

type AptitudeTrack = {
  id: "beginner" | "timed_practice" | "mock";
  title: string;
  description: string;
  icon: typeof BookOpen;
  mode: PageMode;
  difficulty: DifficultyFilter;
  company: (typeof companySetLabels)[number];
  mockSize?: number;
  topicOrder: AptitudeType["title"][];
  plan: string[];
};

const practiceTracks: AptitudeTrack[] = [
  {
    id: "beginner",
    title: "Beginner Aptitude Track",
    description: "Build confidence with formulas, reasoning patterns, and short verbal practice in learning mode.",
    icon: BookOpen,
    mode: "learning",
    difficulty: "all",
    company: "All Companies",
    topicOrder: ["Quantitative Aptitude", "Logical Reasoning", "Verbal Ability", "Data Interpretation"],
    plan: [
      "Pick one topic and read the learning blocks first.",
      "Revise 3 formulas and 3 shortcut cards.",
      "Solve 2 questions without revealing the answer.",
      "Reveal answer, read explanation, then read the strategy line.",
    ],
  },
  {
    id: "timed_practice",
    title: "Timed Practice Track",
    description: "Use practice mode to answer topic-wise MCQs and review the shortcut behind each answer.",
    icon: Target,
    mode: "practice",
    difficulty: "easy",
    company: "All Companies",
    topicOrder: ["Quantitative Aptitude", "Logical Reasoning", "Verbal Ability", "Data Interpretation"],
    plan: [
      "Start with easy questions for speed and accuracy.",
      "Submit each answer and read the strategy line immediately.",
      "Repeat the same topic until you get 80%+ accuracy.",
      "Move to medium difficulty only after consistency.",
    ],
  },
  {
    id: "mock",
    title: "Mock Test Track",
    description: "Simulate placement-style aptitude rounds with a timer, filtered sets, and result summaries.",
    icon: Clock3,
    mode: "mock",
    difficulty: "medium",
    company: "Infosys",
    mockSize: 10,
    topicOrder: ["Quantitative Aptitude", "Logical Reasoning", "Verbal Ability", "Data Interpretation"],
    plan: [
      "Choose a company set and medium difficulty.",
      "Start a 10-question mock and finish within the timer.",
      "Submit the mock and review every wrong question.",
      "Switch company set and rebuild the mock to avoid repetition.",
    ],
  },
];

const quickStats = [
  { label: "Core aptitude types", value: "4", tone: "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-300" },
  { label: "Practice MCQs", value: "16", tone: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300" },
  { label: "Company-style sets", value: "6", tone: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" },
];

export default function AptitudePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const didApplyUrlTrack = useRef(false);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [activeType, setActiveType] = useState(aptitudeTypes[0].title);
  const [pageMode, setPageMode] = useState<PageMode>("learning");
  const [activeDifficulty, setActiveDifficulty] = useState<DifficultyFilter>("all");
  const [activeCompany, setActiveCompany] = useState<(typeof companySetLabels)[number]>("All Companies");
  const [activeTrackId, setActiveTrackId] = useState<AptitudeTrack["id"]>("beginner");
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submittedTests, setSubmittedTests] = useState<Record<string, boolean>>({});
  const [mockAnswers, setMockAnswers] = useState<Record<string, string>>({});
  const [mockSubmitted, setMockSubmitted] = useState(false);
  const [mockStarted, setMockStarted] = useState(false);
  const [mockQuestionKeys, setMockQuestionKeys] = useState<string[]>([]);
  const [mockSize, setMockSize] = useState(10);
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const selectedType = aptitudeTypes.find((type) => type.title === activeType) ?? aptitudeTypes[0];
  const allQuestions = aptitudeTypes.flatMap((type) =>
    type.mcqs.map((mcq, index) => ({
      ...mcq,
      topic: type.title,
      key: `${type.title}-${index}`,
    })),
  );
  const filteredQuestions = allQuestions.filter((question) => {
    const companyMatch =
      activeCompany === "All Companies" ? true : question.companyTags?.includes(activeCompany);
    const difficultyMatch = activeDifficulty === "all" ? true : question.difficulty === activeDifficulty;

    return companyMatch && difficultyMatch;
  });
  const selectedTypeQuestions = filteredQuestions.filter((question) => question.topic === selectedType.title);
  const answeredCount = allQuestions.filter((question) => selectedAnswers[question.key]).length;
  const totalCorrect = allQuestions.filter((question) => selectedAnswers[question.key] === question.answer).length;
  const practiceAccuracy = answeredCount === 0 ? 0 : Math.round((totalCorrect / answeredCount) * 100);
  const weakTopic =
    aptitudeTypes
      .map((type) => {
        const topicQuestions = allQuestions.filter((question) => question.topic === type.title && submittedTests[question.key]);
        const topicCorrect = topicQuestions.filter((question) => selectedAnswers[question.key] === question.answer).length;

        return {
          title: type.title,
          attempted: topicQuestions.length,
          accuracy: topicQuestions.length === 0 ? 0 : Math.round((topicCorrect / topicQuestions.length) * 100),
        };
      })
      .filter((topic) => topic.attempted > 0)
      .sort((first, second) => first.accuracy - second.accuracy)[0] ?? null;
  const strongTopic =
    aptitudeTypes
      .map((type) => {
        const topicQuestions = allQuestions.filter((question) => question.topic === type.title && submittedTests[question.key]);
        const topicCorrect = topicQuestions.filter((question) => selectedAnswers[question.key] === question.answer).length;

        return {
          title: type.title,
          attempted: topicQuestions.length,
          accuracy: topicQuestions.length === 0 ? 0 : Math.round((topicCorrect / topicQuestions.length) * 100),
        };
      })
      .filter((topic) => topic.attempted > 0)
      .sort((first, second) => second.accuracy - first.accuracy)[0] ?? null;
  const mockQuestions = allQuestions.filter((question) => mockQuestionKeys.includes(question.key));
  const mockAttempted = mockQuestions.filter((question) => mockAnswers[question.key]).length;
  const mockCorrect = mockQuestions.filter((question) => mockAnswers[question.key] === question.answer).length;
  const mockAccuracy = mockQuestions.length === 0 ? 0 : Math.round((mockCorrect / mockQuestions.length) * 100);

  useEffect(() => {
    if (!mockStarted || mockSubmitted) return;

    const interval = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(interval);
          setMockSubmitted(true);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [mockStarted, mockSubmitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const buildMockTest = () => {
    const source = filteredQuestions.length >= mockSize ? [...filteredQuestions] : [...allQuestions];
    const shuffled = [...source].sort(() => Math.random() - 0.5).slice(0, mockSize);

    setMockQuestionKeys(shuffled.map((question) => question.key));
    setMockAnswers({});
    setMockSubmitted(false);
    setMockStarted(true);
    setTimeLeft(mockSize * 60);
  };

  const jumpToHub = (mode: PageMode) => {
    setPageMode(mode);
    window.setTimeout(() => {
      document.getElementById("aptitude-hub")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const applyTrack = (track: AptitudeTrack) => {
    setActiveTrackId(track.id);
    setPageMode(track.mode);
    setActiveCompany(track.company);
    setActiveDifficulty(track.difficulty);
    setActiveType(track.topicOrder[0] ?? aptitudeTypes[0].title);
    if (typeof track.mockSize === "number") setMockSize(track.mockSize);
    jumpToHub(track.mode);
  };

  useEffect(() => {
    if (didApplyUrlTrack.current) return;
    const urlTrack = searchParams.get("track");
    if (!urlTrack) return;

    const track = practiceTracks.find((candidate) => candidate.id === urlTrack);
    didApplyUrlTrack.current = true;
    if (track) {
      setActiveTrackId(track.id);
      setPageMode(track.mode);
      setActiveCompany(track.company);
      setActiveDifficulty(track.difficulty);
      setActiveType(track.topicOrder[0] ?? aptitudeTypes[0].title);
      if (typeof track.mockSize === "number") setMockSize(track.mockSize);
      window.setTimeout(() => {
        document.getElementById("aptitude-hub")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    }

    const next = new URLSearchParams(searchParams);
    next.delete("track");
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  const renderTestCard = (mcq: Mcq, typeTitle: string, index: number) => {
    const questionKey = `${typeTitle}-${index}`;
    const selectedOption = selectedAnswers[questionKey];
    const isSubmitted = Boolean(submittedTests[questionKey]);

    return (
      <div key={questionKey} className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]">
          <span className="text-primary">
            {typeTitle} • Question {index + 1}
          </span>
          <span className="rounded-full border border-border bg-background px-2 py-1 text-[10px] text-muted-foreground">
            {mcq.difficulty}
          </span>
          {mcq.companyTags?.slice(0, 2).map((company) => (
            <span key={company} className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-700 dark:text-emerald-300">
              {company}
            </span>
          ))}
        </div>
        <p className="mt-2 text-sm font-medium leading-6 text-foreground">{mcq.question}</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {mcq.options.map((option) => {
            const isCorrect = option === mcq.answer;
            const isPicked = selectedOption === option;
            const stateClass = isSubmitted
              ? isCorrect
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : isPicked
                  ? "border-destructive/30 bg-destructive/10 text-destructive"
                  : "border-border/60 bg-background text-muted-foreground"
              : isPicked
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border/60 bg-background text-muted-foreground";

            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  if (isSubmitted) return;
                  setSelectedAnswers((current) => ({ ...current, [questionKey]: option }));
                }}
                className={`rounded-xl border px-3 py-2 text-left text-sm transition-colors ${stateClass}`}
              >
                {option}
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSubmittedTests((current) => ({ ...current, [questionKey]: true }))}
            disabled={!selectedOption || isSubmitted}
            className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitted ? "Submitted" : "Submit Answer"}
          </button>
          {isSubmitted ? (
            <button
              type="button"
              onClick={() => {
                setSubmittedTests((current) => ({ ...current, [questionKey]: false }));
                setSelectedAnswers((current) => {
                  const next = { ...current };
                  delete next[questionKey];
                  return next;
                });
              }}
              className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground"
            >
              Reset
            </button>
          ) : null}
        </div>
        {isSubmitted ? (
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            <span className="font-medium text-foreground">Correct answer:</span> {mcq.answer}
            <br />
            <span className="font-medium text-foreground">Explanation:</span> {mcq.explanation}
            <br />
            <span className="font-medium text-foreground">How to think:</span> {mcq.strategy}
          </p>
        ) : (
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Pick one option and submit to check your answer. This pattern is commonly seen in {mcq.companyTags?.join(", ")} style rounds.
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Aptitude Prep | PyMaster</title>
        <meta
          name="description"
          content="Prepare for aptitude rounds with quantitative aptitude, logical reasoning, verbal ability, data interpretation, shortcuts, and practice MCQs."
        />
      </Helmet>

      <section className="relative overflow-hidden border-b border-border/60 bg-[linear-gradient(135deg,rgba(14,165,233,0.08),rgba(245,158,11,0.08),rgba(16,185,129,0.06))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(245,158,11,0.16),transparent_24%),radial-gradient(circle_at_bottom,rgba(16,185,129,0.12),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-14">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur">
              <Calculator className="h-3.5 w-3.5" />
              Aptitude Prep
            </div>
            <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Modern aptitude prep with cleaner cards and interactive practice.
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Study by topic, revise with shortcut cards, practice company-style sets, and take timed mocks with live scoring. The page is more colorful, more compact on mobile, and easier to scan during quick prep.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="inline-flex rounded-full border border-border bg-background/80 p-1">
                <button
                  type="button"
                  onClick={() => setPageMode("learning")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    pageMode === "learning" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  Aptitude Learning
                </button>
                <button
                  type="button"
                  onClick={() => setPageMode("practice")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    pageMode === "practice" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  Aptitude Practice
                </button>
                <button
                  type="button"
                  onClick={() => setPageMode("mock")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    pageMode === "mock" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  Mock Test Mode
                </button>
              </div>
              <button
                type="button"
                onClick={() => jumpToHub("practice")}
                className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                <Target className="h-4 w-4" />
                Start Practice
              </button>
              <button
                type="button"
                onClick={() => jumpToHub("mock")}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-background"
              >
                <Clock3 className="h-4 w-4" />
                Start Mock
              </button>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {quickStats.map((stat) => (
              <div key={stat.label} className={`rounded-3xl border p-5 shadow-sm backdrop-blur ${stat.tone}`}>
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em]">{stat.label}</div>
                <div className="mt-2 text-3xl font-bold">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[1.75rem] border border-border/70 bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">How To Clear Aptitude Rounds</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {prepPlan.map((step) => (
                <div key={step} className="rounded-2xl border border-border/60 bg-background/70 p-4 text-sm leading-6 text-muted-foreground">
                  {step}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-primary/20 bg-primary/5 p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Golden Rule</h2>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                In aptitude tests, speed matters, but clean thinking matters more. Learn patterns first, then build speed on top of them.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-emerald-500/20 bg-emerald-500/5 p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <h2 className="text-lg font-semibold text-foreground">Best Sequence</h2>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                Learn concept, solve two easy examples, attempt one timed MCQ, then review the shortcut that saves the most time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <div id="aptitude-hub" className="rounded-[2rem] border border-border/70 bg-card p-4 shadow-sm sm:p-5">
            <div className="mb-4 flex items-center gap-2">
              <Layers3 className="h-4 w-4 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
                {pageMode === "learning"
                  ? "Aptitude Learning Hub"
                  : pageMode === "practice"
                    ? "Aptitude Practice Hub"
                    : "Aptitude Mock Test Hub"}
              </h2>
            </div>
          <div className="mb-5 grid gap-3 rounded-[1.5rem] border border-border/60 bg-background/70 p-4 sm:grid-cols-2 xl:grid-cols-3">
            <div>
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Difficulty</div>
              <div className="flex flex-wrap gap-2">
                {difficultyFilters.map((difficulty) => (
                  <button
                    key={difficulty}
                    type="button"
                    onClick={() => setActiveDifficulty(difficulty)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                      activeDifficulty === difficulty
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground"
                    }`}
                  >
                    {difficulty === "all" ? "All Levels" : difficulty}
                  </button>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2 xl:col-span-2">
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Company-Style Sets</div>
              <div className="flex flex-wrap gap-2">
                {companySetLabels.map((company) => (
                  <button
                    key={company}
                    type="button"
                    onClick={() => setActiveCompany(company)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                      activeCompany === company
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-border bg-card text-muted-foreground"
                    }`}
                  >
                    {company}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-5 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {aptitudeTypes.map((type) => (
              <button
                key={type.title}
                onClick={() => setActiveType(type.title)}
                className={`rounded-full border px-3 py-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedType.title === type.title
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {type.title}
              </button>
            ))}
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="rounded-[1.5rem] border border-border/60 bg-[linear-gradient(180deg,rgba(14,165,233,0.04),rgba(255,255,255,0.02))] p-4 sm:p-5">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                <WandSparkles className="h-3.5 w-3.5" />
                {selectedType.title}
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                <span className="font-medium text-foreground">Covers:</span> {selectedType.focus}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                <span className="font-medium text-foreground">How to clear it:</span> {selectedType.howToClear}
              </p>
              <div className="mt-5">
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Shortcut Cards
                </div>
                <div className="grid gap-3">
                  {selectedType.shortcuts.map((shortcut, index) => (
                    <div key={shortcut} className="rounded-2xl border border-border/60 bg-background/80 p-4 shadow-sm">
                      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                        Shortcut {index + 1}
                      </div>
                      <p className="text-sm leading-6 text-muted-foreground">{shortcut}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
                  <BookOpen className="h-3.5 w-3.5" />
                  Learning Blocks
                </div>
                <div className="grid gap-3">
                  {selectedType.learningBlocks.map((block) => (
                    <div key={block.title} className="rounded-2xl border border-border/60 bg-background/80 p-4 shadow-sm">
                      <div className="text-sm font-semibold text-foreground">{block.title}</div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {block.points.map((point) => (
                          <span key={point} className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                            {point}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-300">
                  <Calculator className="h-3.5 w-3.5" />
                  Must-Know Formulas
                </div>
                <div className="grid gap-2">
                  {selectedType.formulas.map((formula) => (
                    <div key={formula} className="rounded-xl border border-border/60 bg-card px-4 py-3 text-sm text-foreground">
                      {formula}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-border/60 bg-background/80 p-4 sm:p-5">
              <div className="mb-3 flex items-center gap-2">
                {pageMode === "learning" ? <CheckCircle2 className="h-4 w-4 text-primary" /> : <FileCheck className="h-4 w-4 text-primary" />}
                <h3 className="text-lg font-semibold text-foreground">
                  {pageMode === "learning"
                    ? "Interactive Learning Cards"
                    : pageMode === "practice"
                      ? "Topic Practice Test"
                      : "Timed Mock Builder"}
                </h3>
              </div>
              {pageMode === "learning" ? (
                <p className="mb-4 text-sm leading-6 text-muted-foreground">
                  Try the question first. The answer stays hidden until the user taps <span className="font-medium text-foreground">Show Answer</span>.
                </p>
              ) : pageMode === "practice" ? (
                <div className="mb-4 rounded-2xl border border-primary/15 bg-primary/5 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-foreground">{selectedType.title} Practice</div>
                      <div className="text-xs text-muted-foreground">Attempt, submit, and review each question with strategy notes.</div>
                    </div>
                    <div className="rounded-full border border-primary/20 bg-background px-3 py-1 text-xs font-semibold text-primary">
                      Score {selectedType.mcqs.filter((mcq, index) => selectedAnswers[`${selectedType.title}-${index}`] === mcq.answer).length}/{selectedType.mcqs.length}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-4 space-y-4 rounded-2xl border border-primary/15 bg-primary/5 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-foreground">Build a Timed Mock</div>
                      <div className="text-xs text-muted-foreground">Questions follow your current company and difficulty filters when possible.</div>
                    </div>
                    <div className="rounded-full border border-primary/20 bg-background px-3 py-1 text-xs font-semibold text-primary">
                      Timer {formatTime(timeLeft)}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mockSizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setMockSize(size)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                          mockSize === size ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground"
                        }`}
                      >
                        {size === 16 ? "Full Test" : `${size} Questions`}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={buildMockTest}
                      className="inline-flex items-center rounded-full border border-primary bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
                    >
                      {mockStarted ? "Rebuild Mock" : "Start Mock"}
                    </button>
                    {mockStarted ? (
                      <button
                        type="button"
                        onClick={() => setMockSubmitted(true)}
                        className="inline-flex items-center rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground"
                      >
                        Submit Mock
                      </button>
                    ) : null}
                  </div>
                </div>
              )}
              <div className="space-y-4">
                {pageMode === "mock" ? (
                  mockStarted ? (
                    mockQuestions.map((mcq, index) => {
                      const pickedAnswer = mockAnswers[mcq.key];

                      return (
                        <div key={mcq.key} className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
                          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]">
                            <span className="text-primary">Mock Question {index + 1}</span>
                            <span className="rounded-full border border-border bg-background px-2 py-1 text-[10px] text-muted-foreground">{mcq.topic}</span>
                            <span className="rounded-full border border-border bg-background px-2 py-1 text-[10px] text-muted-foreground">{mcq.difficulty}</span>
                          </div>
                          <p className="mt-2 text-sm font-medium leading-6 text-foreground">{mcq.question}</p>
                          <div className="mt-3 grid gap-2 sm:grid-cols-2">
                            {mcq.options.map((option) => {
                              const showResult = mockSubmitted;
                              const isCorrect = option === mcq.answer;
                              const isPicked = pickedAnswer === option;
                              const stateClass = showResult
                                ? isCorrect
                                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                                  : isPicked
                                    ? "border-destructive/30 bg-destructive/10 text-destructive"
                                    : "border-border/60 bg-background text-muted-foreground"
                                : isPicked
                                  ? "border-primary/30 bg-primary/10 text-primary"
                                  : "border-border/60 bg-background text-muted-foreground";

                              return (
                                <button
                                  key={option}
                                  type="button"
                                  disabled={mockSubmitted}
                                  onClick={() => setMockAnswers((current) => ({ ...current, [mcq.key]: option }))}
                                  className={`rounded-xl border px-3 py-2 text-left text-sm transition-colors ${stateClass}`}
                                >
                                  {option}
                                </button>
                              );
                            })}
                          </div>
                          <div className="mt-3 text-sm leading-6 text-muted-foreground">
                            {mockSubmitted ? (
                              <>
                                <span className="font-medium text-foreground">Correct answer:</span> {mcq.answer}
                                <br />
                                <span className="font-medium text-foreground">Explanation:</span> {mcq.explanation}
                                <br />
                                <span className="font-medium text-foreground">How to think:</span> {mcq.strategy}
                              </>
                            ) : (
                              <>This question appears in {mcq.companyTags?.join(", ")} style mock sets.</>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="rounded-2xl border border-dashed border-border bg-card p-6 text-sm leading-6 text-muted-foreground">
                      Pick a mock size, keep your current filters if you want, and start the test to generate a timed aptitude set.
                    </div>
                  )
                ) : selectedTypeQuestions.length > 0 ? (
                  selectedTypeQuestions.map((mcq) => {
                    const index = selectedType.mcqs.findIndex((item) => item.question === mcq.question);

                    if (pageMode === "practice") {
                      return renderTestCard(mcq, selectedType.title, index);
                    }

                    const answerKey = `${selectedType.title}-${index}`;
                    const isRevealed = Boolean(revealedAnswers[answerKey]);

                    return (
                      <div key={mcq.question} className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]">
                          <span className="text-primary">Question {index + 1}</span>
                          <span className="rounded-full border border-border bg-background px-2 py-1 text-[10px] text-muted-foreground">{mcq.difficulty}</span>
                          {mcq.companyTags?.map((company) => (
                            <span key={company} className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-700 dark:text-emerald-300">
                              {company}
                            </span>
                          ))}
                        </div>
                        <p className="mt-2 text-sm font-medium leading-6 text-foreground">{mcq.question}</p>
                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                          {mcq.options.map((option) => (
                            <div key={option} className={`rounded-xl border px-3 py-2 text-sm ${
                              isRevealed && option === mcq.answer
                                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                                : "border-border/60 bg-background text-muted-foreground"
                            }`}>
                              {option}
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => setRevealedAnswers((current) => ({ ...current, [answerKey]: !isRevealed }))}
                          className="mt-3 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/15"
                        >
                          {isRevealed ? "Hide Answer" : "Show Answer"}
                        </button>
                        {isRevealed ? (
                          <p className="mt-3 text-sm leading-6 text-muted-foreground">
                            <span className="font-medium text-foreground">Answer:</span> {mcq.answer}
                            <br />
                            <span className="font-medium text-foreground">Explanation:</span> {mcq.explanation}
                            <br />
                            <span className="font-medium text-foreground">How to think:</span> {mcq.strategy}
                          </p>
                        ) : (
                          <p className="mt-3 text-sm leading-6 text-muted-foreground">
                            Solve it first, then reveal the answer and the shortcut strategy when you are ready.
                          </p>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="rounded-2xl border border-dashed border-border bg-card p-6 text-sm leading-6 text-muted-foreground">
                    No questions match this topic with the current filters yet. Switch the difficulty or company set to see more.
                  </div>
                )}
              </div>
              {pageMode === "mock" && mockSubmitted ? (
                <div className="mt-4 rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-4">
                  <div className="text-sm font-semibold text-foreground">Mock Result Summary</div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-4">
                    <div className="rounded-2xl border border-border/60 bg-background p-3">
                      <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Score</div>
                      <div className="mt-1 text-xl font-bold text-foreground">{mockCorrect}/{mockQuestions.length}</div>
                    </div>
                    <div className="rounded-2xl border border-border/60 bg-background p-3">
                      <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Attempted</div>
                      <div className="mt-1 text-xl font-bold text-foreground">{mockAttempted}</div>
                    </div>
                    <div className="rounded-2xl border border-border/60 bg-background p-3">
                      <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Accuracy</div>
                      <div className="mt-1 text-xl font-bold text-foreground">{mockAccuracy}%</div>
                    </div>
                    <div className="rounded-2xl border border-border/60 bg-background p-3">
                      <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Recommendation</div>
                      <div className="mt-1 text-sm font-medium text-foreground">
                        {mockAccuracy >= 80 ? "Ready for tougher sets" : mockAccuracy >= 60 ? "Revise weak areas once" : "Go back to learning mode"}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {aptitudeTypes.map((type) => (
            <div key={type.title} className="rounded-[1.75rem] border border-border/70 bg-card p-5 shadow-sm transition-transform hover:-translate-y-1">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                Topic
              </div>
              <h3 className="text-xl font-semibold text-foreground">{type.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{type.focus}</p>
              <button
                onClick={() => setActiveType(type.title)}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                Open topic
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-border/70 bg-card p-4 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-2">
            {pageMode === "learning" ? <Brain className="h-4 w-4 text-primary" /> : <ListChecks className="h-4 w-4 text-primary" />}
            <h2 className="text-lg font-semibold text-foreground">
              {pageMode === "learning"
                ? "All Aptitude Questions On One Page"
                : pageMode === "practice"
                  ? "Full Aptitude Practice Section"
                  : "Mock Performance And Company Prep"}
            </h2>
          </div>
          {pageMode !== "learning" ? (
            <div className="mb-6 grid gap-4 md:grid-cols-4">
              <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Attempted</div>
                <div className="mt-2 text-2xl font-bold text-foreground">{answeredCount}/{allQuestions.length}</div>
              </div>
              <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Correct</div>
                <div className="mt-2 text-2xl font-bold text-foreground">{totalCorrect}</div>
              </div>
              <div className="rounded-2xl border border-amber-500/15 bg-amber-500/5 p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Accuracy</div>
                <div className="mt-2 text-2xl font-bold text-foreground">
                  {practiceAccuracy}%
                </div>
              </div>
              <div className="rounded-2xl border border-violet-500/15 bg-violet-500/5 p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Weak Topic</div>
                <div className="mt-2 text-sm font-semibold text-foreground">{weakTopic?.title ?? "Attempt practice first"}</div>
              </div>
            </div>
          ) : null}
          {pageMode !== "learning" ? (
            <div className="mb-6 grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Performance Tracking</div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  You are strongest in <span className="font-medium text-foreground">{strongTopic?.title ?? "none yet"}</span> and need the most revision in <span className="font-medium text-foreground">{weakTopic?.title ?? "the first attempted topic"}</span>.
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Improve Weak Topic</div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {weakTopic
                    ? `Spend 15 minutes in learning mode on ${weakTopic.title}, then retake a filtered ${activeCompany === "All Companies" ? "mixed-company" : activeCompany} practice set.`
                    : "Submit a few practice questions first and the page will recommend your next topic automatically."}
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Chapter Formula Sheet</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedType.formulas.map((formula) => (
                    <span key={formula} className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {formula}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
          <div className="space-y-6">
            {aptitudeTypes.map((type) => (
              <div key={type.title} className="rounded-[1.5rem] border border-border/60 bg-background/70 p-4 sm:p-5">
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                    {type.title}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{type.focus}</p>
                </div>
                <div className="space-y-4">
                  {type.mcqs.map((mcq, index) => {
                    if (pageMode === "practice") {
                      return renderTestCard(mcq, type.title, index);
                    }

                    const answerKey = `all-${type.title}-${index}`;
                    const isRevealed = Boolean(revealedAnswers[answerKey]);

                    return (
                      <div key={mcq.question} className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]">
                          <span className="text-primary">{type.title} • Question {index + 1}</span>
                          <span className="rounded-full border border-border bg-background px-2 py-1 text-[10px] text-muted-foreground">{mcq.difficulty}</span>
                          {mcq.companyTags?.slice(0, 2).map((company) => (
                            <span key={company} className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-700 dark:text-emerald-300">
                              {company}
                            </span>
                          ))}
                        </div>
                        <p className="mt-2 text-sm font-medium leading-6 text-foreground">{mcq.question}</p>
                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                          {mcq.options.map((option) => (
                            <div
                              key={option}
                              className={`rounded-xl border px-3 py-2 text-sm ${
                                isRevealed && option === mcq.answer
                                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                                  : "border-border/60 bg-background text-muted-foreground"
                              }`}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => setRevealedAnswers((current) => ({ ...current, [answerKey]: !isRevealed }))}
                          className="mt-3 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/15"
                        >
                          {isRevealed ? "Hide Answer" : "Show Answer"}
                        </button>
                        {isRevealed ? (
                          <p className="mt-3 text-sm leading-6 text-muted-foreground">
                            <span className="font-medium text-foreground">Answer:</span> {mcq.answer}
                            <br />
                            <span className="font-medium text-foreground">Explanation:</span> {mcq.explanation}
                            <br />
                            <span className="font-medium text-foreground">How to think:</span> {mcq.strategy}
                          </p>
                        ) : (
                          <p className="mt-3 text-sm leading-6 text-muted-foreground">
                            Solve first, then reveal the answer when you are ready.
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-primary/15 bg-[linear-gradient(135deg,rgba(14,165,233,0.08),rgba(245,158,11,0.08),rgba(16,185,129,0.08))] p-6 shadow-[0_18px_60px_rgba(15,23,42,0.12)] sm:p-8">
          <div className="mb-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              <BookOpen className="h-3.5 w-3.5" />
              Aptitude Learning Map
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Learn these aptitude subjects first
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              Use this as your syllabus checklist. Master the first row before you attempt harder timed mocks.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {aptitudeStudyGuide.map((group) => (
              <div key={group.area} className="rounded-3xl border border-border/60 bg-background/80 p-5">
                <h3 className="text-lg font-semibold text-foreground">{group.area}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.subjects.map((subject) => (
                    <span key={subject} className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="grid gap-6 lg:grid-cols-3">
            {practiceTracks.map((track) => {
              const Icon = track.icon;
              const isActive = activeTrackId === track.id;
              return (
                <div
                  key={track.id}
                  className={`rounded-3xl border bg-card p-6 shadow-sm transition-transform hover:-translate-y-0.5 ${
                    isActive ? "border-primary/35" : "border-border/70"
                  }`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-foreground">{track.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{track.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-muted-foreground">
                      Mode: {track.mode}
                    </span>
                    <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-muted-foreground">
                      Level: {track.difficulty === "all" ? "all" : track.difficulty}
                    </span>
                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                      {track.company}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => applyTrack(track)}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                  >
                    Start track
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
          <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
            {(() => {
              const activeTrack = practiceTracks.find((track) => track.id === activeTrackId) ?? practiceTracks[0];
              return (
                <>
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                    Track plan
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-foreground">{activeTrack.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{activeTrack.description}</p>
                  <div className="mt-4 space-y-2">
                    {activeTrack.plan.map((step) => (
                      <div key={step} className="rounded-2xl border border-border/60 bg-background/70 p-3 text-sm text-muted-foreground">
                        {step}
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-2xl border border-border/60 bg-background/70 p-4 text-sm leading-6 text-muted-foreground">
                    <span className="font-medium text-foreground">Topics order:</span> {activeTrack.topicOrder.join(" → ")}
                    {typeof activeTrack.mockSize === "number" ? (
                      <>
                        <br />
                        <span className="font-medium text-foreground">Mock size:</span> {activeTrack.mockSize}
                      </>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => applyTrack(activeTrack)}
                    className="mt-5 inline-flex items-center rounded-full border border-primary bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                  >
                    Start {activeTrack.mode === "mock" ? "Mock" : activeTrack.mode === "practice" ? "Practice" : "Learning"} Now
                  </button>
                </>
              );
            })()}
          </div>
        </div>
      </section>
    </div>
  );
}
