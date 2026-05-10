import { type Exercise } from "./lessons";

const CAREER_TRANSLATION_LANGS = ["tamil", "kannada", "telugu", "hindi"] as const;
type CareerTranslationLang = (typeof CAREER_TRANSLATION_LANGS)[number];

export interface CareerLesson {
  id: string;
  title: string;
  description: string;
  category?: string;
  content: string;
  codeExample: string;
  translations?: Partial<
    Record<
      CareerTranslationLang,
      {
        title?: string;
        description?: string;
        category?: string;
        content?: string;
        codeExample?: string;
      }
    >
  >;
  exercises: {
    beginner: Exercise;
    intermediate: Exercise;
    advanced: Exercise;
  };
}

export interface CareerTrack {
  id: string;
  title: string;
  description: string;
  color: string;
  language?: "python" | "sql" | "bash";
  lessons: CareerLesson[];
}

function withFullCareerTranslations(lesson: CareerLesson): CareerLesson {
  const translations: NonNullable<CareerLesson["translations"]> = { ...(lesson.translations ?? {}) };
  for (const lang of CAREER_TRANSLATION_LANGS) {
    const existing = translations[lang] ?? {};
    translations[lang] = {
      title: existing.title ?? lesson.title,
      description: existing.description ?? lesson.description,
      category: existing.category ?? lesson.category,
      content: existing.content ?? lesson.content,
      codeExample: existing.codeExample ?? lesson.codeExample,
    };
  }
  return { ...lesson, translations };
}

function withFullTrackTranslations(track: CareerTrack): CareerTrack {
  return { ...track, lessons: track.lessons.map(withFullCareerTranslations) };
}

function da(): CareerLesson[] {
  return [
    {
      id: "da-best-practices",
      title: "0. Best Practices & Classic Mistakes",
      description: "Dos, Don'ts, and what to avoid in Data Analysis",
      category: "Foundations",
      content:
        "## The Golden Rules of Analysis 📊\n\nBefore diving into data, you must understand the rules to avoid making incorrect conclusions.\n\n### DOs (What you should use)\n- **DO** check for missing values and duplicates first.\n- **DO** visualize your data before running complex models.\n- **DO** document your assumptions and data cleaning steps.\n\n### DON'Ts (Classic Mistakes)\n- **DON'T** ignore outliers without investigating them.\n- **DON'T** confuse correlation with causation (just because A and B happen together doesn't mean A causes B).\n- **DON'T** present misleading charts (e.g., truncating the Y-axis to exaggerate differences).",
      codeExample:
        "# DO: Check for missing values\n# print(df.isnull().sum())\n\n# DON'T: Drop missing values blindly\n# df.dropna(inplace=True)",
      exercises: {
        beginner: { type: "quiz", prompt: "Should you always delete outliers immediately?", options: ["Yes, they ruin data", "No, investigate them first", "Only if they are negative"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "Print 'Correlation is not causation'", starterCode: "print('___')", expectedOutput: "Correlation is not causation" },
        advanced: { type: "code", prompt: "Print 'Data Cleaning'", starterCode: "print('___')", expectedOutput: "Data Cleaning" },
      },
    },
    // ═══════════════════════════════════════════════════════
    // PHASE 1: FOUNDATIONS (Modules 1–4)
    // Build the mindset, math, stats & business context first
    // ═══════════════════════════════════════════════════════
    {
      id: "da-intro", title: "1. The Analyst Mindset", description: "Overview of the Data Analyst role and workflow",
      content: "## The Data Analyst Role\n\nData Analysts translate numbers into business decisions.\n\n### The Workflow\n1. **Question** — Define the business problem.\n2. **Collect** — Gather data from SQL, APIs, or Files.\n3. **Clean** — Handle missing values and errors.\n4. **Analyze** — Find patterns, trends, and correlations.\n5. **Visualize** — Create charts and dashboards.\n6. **Communicate** — Present findings to stakeholders.",
      codeExample: "import pandas as pd\ndf = pd.DataFrame({'Sales': [100, 150, 200], 'Month': ['Jan', 'Feb', 'Mar']})\nprint(df.describe())",
      translations: {
        tamil: { title: "1. பகுப்பாய்வாளர் மனநிலை", description: "தரவு பகுப்பாய்வாளர் பங்கு மற்றும் பணிப்பாய்வு பற்றிய கண்ணோட்டம்" },
        kannada: { title: "1. ವಿಶ್ಲೇಷಕ ಮನಸ್ಥಿತಿ", description: "ಡೇಟಾ ವಿಶ್ಲೇಷಕರ ಪಾತ್ರ ಮತ್ತು ಕೆಲಸದ ಹರಿವಿನ ಅವಲೋಕನ" },
        telugu: { title: "1. విశ్లేషకుడి మనస్తత్వం", description: "డేటా అనలిస్ట్ పాత్ర మరియు వర్క్‌ఫ్లో అవలోకనం" },
        hindi: { title: "1. विश्लेषक मानसिकता", description: "डेटा विश्लेषक भूमिका और कार्यप्रवाह का अवलोकन" },
      },
      exercises: {
        beginner: { prompt: "Print the string 'Question, Collect, Clean, Analyze, Visualize, Communicate'.", starterCode: "", expectedOutput: "Question, Collect, Clean, Analyze, Visualize, Communicate" },
        intermediate: { prompt: "Calculate average: `data = [10, 20, 30]`. Print the mean.", starterCode: "data = [10, 20, 30]\n\n# Print mean\n", expectedOutput: "20.0" },
        advanced: { prompt: "If `step = 'Visualize'`, print 'Next is Communicate'. Else print 'Keep working'.", starterCode: "step = 'Visualize'\n\n# Print next step\n", expectedOutput: "Next is Communicate" },
      },
    },
    {
      id: "da-math-foundations", title: "2. Data Math", description: "Ratios, Percentages, and Logarithms",
      content: "## Math for Analysis\n\n### Key Concepts\n- **Ratios** — Comparing two quantities (e.g. 2:1).\n- **Logarithms** — Used to 'un-squish' data that grows exponentially (like wealth or population).\n- **Linear Functions** — Predicting $y$ based on $x$.",
      codeExample: "import math\nprint(\"Log of 100:\", math.log10(100))",
      translations: {
        tamil: { title: "2. தரவு கணிதம்", description: "விகிதங்கள், சதவீதங்கள் மற்றும் மடக்கைகள்" },
        kannada: { title: "2. ಡೇಟಾ ಗಣಿತ", description: "ಅನುಪಾತಗಳು, ಶೇಕಡಾವಾರು ಮತ್ತು ಲಾಗರಿಥಮ್‌ಗಳು" },
        telugu: { title: "2. డేటా గణితం", description: "నిష్పత్తులు, శాతాలు మరియు లాగరిథమ్స్" },
        hindi: { title: "2. डेटा गणित", description: "अनुपात, प्रतिशत और लघुगणक" },
      },
      exercises: {
        beginner: { prompt: "Calculate 20% of 500. Print result.", starterCode: "", expectedOutput: "100.0" },
        intermediate: { prompt: "Calculate ratio of 80 to 40. Print result.", starterCode: "", expectedOutput: "2.0" },
        advanced: { prompt: "Calculate `math.log2(8)`. Print result.", starterCode: "import math\n", expectedOutput: "3.0" },
      },
    },
    {
      id: "da-statistics", title: "3. Statistics & Probability", description: "Mean, Median, Std Dev, and Distributions",
      content: "## Data Science Statistics\n\n### Descriptive Stats\n- **Mean** — Average.\n- **Median** — Middle value (good for outliers).\n- **Standard Deviation** — How 'spread out' the data is.\n\n### Probability\n- **Normal Distribution** — The 'Bell Curve'.\n- **Bayes' Theorem** — Updating probability with new evidence.",
      codeExample: "import statistics\ndata = [1, 2, 2, 3, 100]\nprint(\"Median:\", statistics.median(data))",
      translations: {
        tamil: { title: "3. புள்ளிவிவரம் & நிகழ்தகவு", description: "சராசரி, இடைநிலை, திட்ட விலக்கம் மற்றும் பரவல்கள்" },
        kannada: { title: "3. ಅಂಕಿಅಂಶ ಮತ್ತು ಸಂಭವನೀಯತೆ", description: "ಸರಾಸರಿ, ಮಧ್ಯದ ಬೆಲೆ, ಪ್ರಮಾಣಿತ ವಿಚಲನ ಮತ್ತು ವಿತರಣೆಗಳು" },
        telugu: { title: "3. గణాంకాలు & సంభావ్యత", description: "సగటు, మధ్యగతం, ప్రామాణిక విచలనం మరియు పంపిణీలు" },
        hindi: { title: "3. सांख्यिकी और संभावना", description: "माध्य, माध्यिका, मानक विचलन और वितरण" },
      },
      exercises: {
        beginner: { prompt: "Calculate Mean: `[10, 20, 30]`. Print result.", starterCode: "", expectedOutput: "20" },
        intermediate: { prompt: "Find Median: `[1, 5, 2, 4, 3]`. Print result.", starterCode: "", expectedOutput: "3" },
        advanced: { prompt: "Identify outlier in `[10, 12, 11, 500]`. Print it.", starterCode: "", expectedOutput: "500" },
      },
    },
    {
      id: "da-business-metrics", title: "4. Business Metrics", description: "Revenue, Churn, LTV, and KPIs",
      content: "## The Business Side of Data\n\n### Core Metrics\n- **Revenue** — Total money in.\n- **Churn** — % of customers who leave.\n- **LTV** — Lifetime Value of a customer.\n- **Growth Rate** — % increase over time.",
      codeExample: "revenue = 5000\ncost = 2000\nprofit = revenue - cost\nprint(f\"Margin: {(profit/revenue)*100}%\")",
      translations: {
        tamil: { title: "4. வணிக அளவீடுகள்", description: "வருவாய், வாடிக்கையாளர் இழப்பு மற்றும் முக்கிய செயல்திறன் குறிகாட்டிகள்" },
        kannada: { title: "4. ವ್ಯಾಪಾರ ಮೆಟ್ರಿಕ್‌ಗಳು", description: "ಆದಾಯ, ಗ್ರಾಹಕ ನಷ್ಟ ಮತ್ತು ಪ್ರಮುಖ ಕಾರ್ಯಕ್ಷಮತೆಯ ಸೂಚಕಗಳು" },
        telugu: { title: "4. వ్యాపార కొలమానాలు", description: "ఆదాయం, వినియోగదారుల నష్టం మరియు కీలక పనితీరు సూచికలు" },
        hindi: { title: "4. व्यावसायिक मेट्रिक्स", description: "राजस्व, मंथन और प्रमुख प्रदर्शन संकेतक" },
      },
      exercises: {
        beginner: { prompt: "Calculate Profit: `rev=100, cost=60`. Print it.", starterCode: "", expectedOutput: "40" },
        intermediate: { prompt: "Churn Rate: `start=100, lost=5`. Print percentage.", starterCode: "", expectedOutput: "5.0" },
        advanced: { prompt: "Calculate Growth: `old=100, new=120`. Print % increase.", starterCode: "old = 100\nnew = 120\n", expectedOutput: "20.0" },
      },
    },
    // ═══════════════════════════════════════════════════════
    // PHASE 2: PROGRAMMING TOOLS (Modules 5–8)
    // Master the languages and libraries of data
    // ═══════════════════════════════════════════════════════
    {
      id: "da-python-foundations", title: "5. Python for Analysis", description: "Variables, Loops, Conditions, and Functions",
      content: "## Python for Analysts\n\nPython is the #1 tool for data analysis because of its simplicity and powerful libraries.\n\n### Data Structures\n- **Lists** — To store ordered sequences.\n- **Dictionaries** — To store key-value pairs (like rows).\n- **Functions** — To automate cleaning steps.",
      codeExample: "def get_roi(revenue, cost):\n    return (revenue - cost) / cost\n\nprint(f\"ROI: {get_roi(100, 80)}\")",
      translations: {
        tamil: { title: "5. பகுப்பாய்விற்கான பைதான்", description: "மாறிகள், சுழற்சிகள், நிபந்தனைகள் மற்றும் செயல்பாடுகள்" },
        kannada: { title: "5. ವಿಶ್ಲೇಷಣೆಗಾಗಿ ಪೈಥಾನ್", description: "ವೇರಿಯೇಬಲ್‌ಗಳು, ಲೂಪ್‌ಗಳು, ಷರತ್ತುಗಳು ಮತ್ತು ಕಾರ್ಯಗಳು" },
        telugu: { title: "5. విశ్లేషణ కోసం పైథాన్", description: "వేరియబుల్స్, లూప్స్, కండిషన్స్ మరియు ఫంక్షన్లు" },
        hindi: { title: "5. विश्लेषण के लिए पायथन", description: "चर, लूप, स्थितियाँ और कार्य" },
      },
      exercises: {
        beginner: { prompt: "Create a list `nums = [1, 2, 3]`. Print its `sum()`.", starterCode: "", expectedOutput: "6" },
        intermediate: { prompt: "Create a dict `d = {'a': 1, 'b': 2}`. Print the value for key `'b'`.", starterCode: "", expectedOutput: "2" },
        advanced: { prompt: "Write a loop to print items in `['data', 'is', 'fun']` on new lines.", starterCode: "", expectedOutput: "data\nis\nfun" },
      },
    },
    {
      id: "da-numpy-basics", title: "6. NumPy Power", description: "Arrays, Math Operations, and Broadcasting",
      content: "## NumPy Basics\n\nNumPy is the foundation for almost all Python data libraries. It allows for fast mathematical operations on large sets of data.\n\n### Key Features\n- **Arrays** — Much faster than Python lists.\n- **Broadcasting** — Perform math on every item in an array instantly.\n- **Vectorization** — No more loops for simple math!",
      codeExample: "# Conceptual NumPy broadcasting\narray = [1, 2, 3]\nresult = [x * 2 for x in array]\nprint(result)",
      translations: {
        tamil: { title: "6. NumPy ஆற்றல்", description: "அணிகள், கணித செயல்பாடுகள் மற்றும் பிராட்காஸ்டிங்" },
        kannada: { title: "6. NumPy ಶಕ್ತಿ", description: "ಅರೇಗಳು, ಗಣಿತದ ಕಾರ್ಯಾಚರಣೆಗಳು ಮತ್ತು ಬ್ರಾಡ್‌ಕಾಸ್ಟಿಂಗ್" },
        telugu: { title: "6. NumPy పవర్", description: "శ్రేణులు, గణిత కార్యకలాపాలు మరియు బ్రాడ్‌కాస్టింగ్" },
        hindi: { title: "6. NumPy पावर", description: "एरे, गणित संचालन और ब्रॉडकास्टिंग" },
      },
      exercises: {
        beginner: { prompt: "Multiply every item in `[10, 20, 30]` by 2. Print the new list.", starterCode: "data = [10, 20, 30]\n", expectedOutput: "[20, 40, 60]" },
        intermediate: { prompt: "Calculate the mean of `[1, 2, 3, 4, 5]`. Print it.", starterCode: "", expectedOutput: "3.0" },
        advanced: { prompt: "Find common items in `[1, 2]` and `[2, 3]`. Print the list.", starterCode: "", expectedOutput: "[2]" },
      },
    },
    {
      id: "da-pandas-mastery", title: "7. Pandas Mastery", description: "Indexing, Filtering, Grouping, and Merging",
      content: "## Advanced Pandas\n\nPandas DataFrames are the industry standard for tabular data.\n\n### Mastery Patterns\n- **Filtering** — `df[df['age'] > 20]`\n- **Grouping** — `df.groupby('city').mean()`\n- **Merging** — `pd.merge(df1, df2)`",
      codeExample: "import pandas as pd\ndf = pd.DataFrame({'a': [1, 2], 'b': [3, 4]})\nprint(df.iloc[0, 1])",
      translations: {
        tamil: { title: "7. பாண்டாஸ் திறன்", description: "குறியீட்டு முறை, வடிகட்டுதல், குழுவாக்குதல் மற்றும் இணைத்தல்" },
        kannada: { title: "7. ಪಾಂಡಾಸ್ ಪಾಂಡಿತ್ಯ", description: "ಇಂಡೆಕ್ಸಿಂಗ್, ಫಿಲ್ಟರಿಂಗ್, ಗ್ರೂಪಿಂಗ್ ಮತ್ತು ವಿಲೀನಗೊಳಿಸುವಿಕೆ" },
        telugu: { title: "7. పాండాస్ మాస్టరీ", description: "ఇండెక్సింగ్, ఫిల్టరింగ్, గ్రూపింగ్ మరియు విలీనం" },
        hindi: { title: "7. पांडा में महारत", description: "अनुक्रमण, फ़िल्टरिंग, समूहीकरण और विलय" },
      },
      exercises: {
        beginner: { prompt: "Sum values in `{'a': 1, 'b': 2}`. Print result.", starterCode: "", expectedOutput: "3" },
        intermediate: { prompt: "Find key for max value in `{'a': 1, 'b': 10}`. Print key.", starterCode: "", expectedOutput: "b" },
        advanced: { prompt: "Filter `[10, 20, 30]` for values `> 15`. Print count.", starterCode: "", expectedOutput: "2" },
      },
    },
    {
      id: "da-r-intro", title: "8. Introduction to R", description: "Statistical Modeling and Visualization in R",
      content: "## Why R?\n\nR was built by statisticians. While Python is great for pipelines, R is legendary for deep statistical research.\n\n### Tidyverse\nThe most popular set of R libraries for data analysis.",
      codeExample: "print('ggplot2 for best charts')",
      translations: {
        tamil: { title: "8. ஆர் அறிமுகம்", description: "ஆர்-ல் புள்ளிவிவர மாடலிங் மற்றும் காட்சிப்படுத்தல்" },
        kannada: { title: "8. R ಗೆ ಪರಿಚಯ", description: "R ನಲ್ಲಿ ಅಂಕಿಅಂಶಗಳ ಮಾಡೆಲಿಂಗ್ ಮತ್ತು ದೃಶ್ಯೀಕರಣ" },
        telugu: { title: "8. R పరిచయం", description: "R లో గణాంక నమూనా మరియు విజువలైజేషన్" },
        hindi: { title: "8. आर का परिचय", description: "R में सांख्यिकीय मॉडलिंग और विज़ुअलाइज़ेशन" },
      },
      exercises: {
        beginner: { prompt: "Which is older, Python or R? Print word.", starterCode: "", expectedOutput: "Python" },
        intermediate: { prompt: "Which is better for deep stats? Print letter.", starterCode: "", expectedOutput: "R" },
        advanced: { prompt: "R's famous chart library? Print word.", starterCode: "", expectedOutput: "ggplot2" },
      },
    },
    // ═══════════════════════════════════════════════════════
    // PHASE 3: DATA HANDLING (Modules 9–13)
    // Acquire, clean, and manage data at scale
    // ═══════════════════════════════════════════════════════
    {
      id: "da-spreadsheets", title: "9. Spreadsheets", description: "Formulas, Pivot Tables, and Charts",
      content: "## Spreadsheet Mastery\n\nExcel/Sheets are the #1 data tools. Every analyst must master them.\n\n### Essential Skills\n- **VLOOKUP/XLOOKUP** — Find data in other tables.\n- **Pivot Tables** — Summarize thousands of rows in seconds.\n- **Conditional Formatting** — Highlight trends visually.",
      codeExample: "# Logic for XLOOKUP\nlookup = {'id1': 'Apple', 'id2': 'Banana'}\nprint(lookup.get('id1'))",
      translations: {
        tamil: { title: "9. விரிதாள்கள்", description: "சூத்திரங்கள், பிவோட் அட்டவணைகள் மற்றும் வரைபடங்கள்" },
        kannada: { title: "9. ಸ್ಪ್ರೆಡ್‌ಶೀಟ್‌ಗಳು", description: "ಫಾರ್ಮುಲಾಗಳು, ಪಿವೋಟ್ ಟೇಬಲ್‌ಗಳು ಮತ್ತು ಚಾರ್ಟ್‌ಗಳು" },
        telugu: { title: "9. స్ప్రెడ్‌షీట్లు", description: "ఫార్ములాలు, పివట్ టేబుల్స్ మరియు చార్ట్‌లు" },
        hindi: { title: "9. स्प्रेडशीट", description: "फॉर्मूले, पिवट टेबल और चार्ट" },
      },
      exercises: {
        beginner: { prompt: "Sum `[10, 20, 30]`. Print result.", starterCode: "", expectedOutput: "60" },
        intermediate: { prompt: "Average `[10, 20, 30]`. Print result.", starterCode: "", expectedOutput: "20.0" },
        advanced: { prompt: "If `sales > 100` print 'High', else 'Low'. Test with 150.", starterCode: "sales = 150\n", expectedOutput: "High" },
      },
    },
    {
      id: "da-sql-advanced", title: "10. Advanced SQL", description: "Joins, Subqueries, and Window Functions",
      content: "## Advanced SQL for Analysts\n\n### Beyond SELECT\n- **Joins** — Combine tables like a pro.\n- **Subqueries** — Use queries inside other queries.\n- **Window Functions** — Calculate running totals and rankings.",
      codeExample: "SELECT name, RANK() OVER (ORDER BY sales DESC) FROM team;",
      translations: {
        tamil: { title: "10. மேம்பட்ட SQL", description: "இணைப்புகள், துணை வினவல்கள் மற்றும் விண்டோ செயல்பாடுகள்" },
        kannada: { title: "10. ಸುಧಾರಿತ SQL", description: "ಜೋಯಿನ்கள், ಸಬ್-ಕ್ವೆರಿಗಳು ಮತ್ತು ವಿಂಡೋ ಕಾರ್ಯಗಳು" },
        telugu: { title: "10. అడ్వాన్స్‌డ్ SQL", description: "జాయిన్లు, సబ్‌క్వరీలు మరియు విండో ఫంక్షన్లు" },
        hindi: { title: "10. उन्नत SQL", description: "जॉइन, सबक्वेरी और विंडो फ़ंक्शन" },
      },
      exercises: {
        beginner: { prompt: "Which SQL command sorts results? Print word.", starterCode: "", expectedOutput: "ORDER BY" },
        intermediate: { prompt: "Which SQL command groups data? Print word.", starterCode: "", expectedOutput: "GROUP BY" },
        advanced: { prompt: "Join type for ALL rows in left table? Print word.", starterCode: "", expectedOutput: "LEFT" },
      },
    },
    {
      id: "da-cleaning-mastery", title: "11. Cleaning Mastery", description: "Handling Missing Values, Outliers, and Normalization",
      content: "## Data Cleaning\n\n80% of an analyst's time is cleaning. If the data is bad, the insight is bad.\n\n### Tasks\n- **Missing Values** — Impute with mean or drop.\n- **Standardization** — Make units consistent.\n- **Outliers** — Find and remove data errors.",
      codeExample: "data = [1, 2, None]\nclean = [x if x is not None else 0 for x in data]\nprint(clean)",
      translations: {
        tamil: { title: "11. தூய்மைப்படுத்துதல் திறன்", description: "விடுபட்ட மதிப்புகள், வெளி மதிப்புகள் மற்றும் இயல்பாக்கம் கையாளுதல்" },
        kannada: { title: "11. ಶುಚಿಗೊಳಿಸುವ ಪಾಂಡಿತ್ಯ", description: "ಕಾಣೆಯಾದ ಮೌಲ್ಯಗಳು, ಹೊರಗಿನವರು ಮತ್ತು ಸಾಮಾನ್ಯೀಕರಣವನ್ನು ನಿರ್ವಹಿಸುವುದು" },
        telugu: { title: "11. క్లీనింగ్ మాస్టరీ", description: "తప్పిపోయిన విలువలు, అవుట్లైయర్లు మరియు సాధారణీకరణను నిర్వహించడం" },
        hindi: { title: "11. सफाई में महारत", description: "गुम मानों, आउटलेर्स और सामान्यीकरण को संभालना" },
      },
      exercises: {
        beginner: { prompt: "Remove `None` from `[1, None, 2]`. Print list.", starterCode: "", expectedOutput: "[1, 2]" },
        intermediate: { prompt: "Convert `['10', '20']` to integers. Print list.", starterCode: "", expectedOutput: "[10, 20]" },
        advanced: { prompt: "Filter `[1, 2, 100]` for values `< 10`. Print list.", starterCode: "", expectedOutput: "[1, 2]" },
      },
    },
    {
      id: "da-data-management", title: "12. Databases & ETL", description: "Relational vs NoSQL and ETL Pipelines",
      content: "## Data Management\n\n- **Relational (SQL)** — Organized tables.\n- **NoSQL (MongoDB)** — Flexible JSON documents.\n- **ETL** — Extract, Transform, Load (Moving data from A to B).",
      codeExample: "extract() >> transform() >> load()",
      translations: {
        tamil: { title: "12. தரவுத்தளங்கள் & ETL", description: "தொடர்பு மற்றும் NoSQL மற்றும் ETL குழாய்கள்" },
        kannada: { title: "12. ಡೇಟಾಬೇಸ್‌ಗಳು ಮತ್ತು ETL", description: "ರಿಲೇಶನಲ್ ಮತ್ತು NoSQL ಮತ್ತು ETL ಪೈಪ್‌ಲೈನ್‌ಗಳು" },
        telugu: { title: "12. మేనేజ్‌మెంట్: డేటాబేస్ & ETL", description: "రిలేషనల్ మరియు NoSQL మరియు ETL పైప్‌లైన్లు" },
        hindi: { title: "12. डेटाबेस और ईटीएल", description: "रिलेशनल बनाम नोएसक्यूएल और ईटीएल पाइपलाइन" },
      },
      exercises: {
        beginner: { prompt: "What is the 'E' in ETL? Print word.", starterCode: "", expectedOutput: "Extract" },
        intermediate: { prompt: "Database with tables? Print word.", starterCode: "", expectedOutput: "Relational" },
        advanced: { prompt: "Database with documents? Print word.", starterCode: "", expectedOutput: "NoSQL" },
      },
    },
    {
      id: "da-cloud-tools", title: "13. Cloud Data Tools", description: "BigQuery, Redshift, and Data Warehousing",
      content: "## Cloud Data Warehouses\n\nModern analysts work in the cloud.\n\n### Tools\n- **Google BigQuery** — Serverless, fast SQL.\n- **AWS Redshift** — Massive scale SQL.\n- **Snowflake** — Multi-cloud data platform.",
      codeExample: "SELECT * FROM `project.dataset.table` LIMIT 10",
      translations: {
        tamil: { title: "13. கிளவுட் தரவு கருவிகள்", description: "BigQuery, Redshift மற்றும் தரவு சேமிப்பு" },
        kannada: { title: "13. ಕ್ಲೌಡ್ ಡೇಟಾ ಪರಿಕರಗಳು", description: "BigQuery, Redshift ಮತ್ತು ಡೇಟಾ ವೇರ್‌ಹೌಸಿಂಗ್" },
        telugu: { title: "13. మేనేజ్‌మెంట్: క్లౌడ్ డేటా టూల్స్", description: "BigQuery, Redshift మరియు డేటా వేర్‌హౌసింగ్" },
        hindi: { title: "13. क्लाउड डेटा टूल्स", description: "बिगक्वेरी, रेडशिफ्ट और डेटा वेयरहाउसिंग" },
      },
      exercises: {
        beginner: { prompt: "Google's data tool? Print word.", starterCode: "", expectedOutput: "BigQuery" },
        intermediate: { prompt: "Amazon's data tool? Print word.", starterCode: "", expectedOutput: "Redshift" },
        advanced: { prompt: "Scale without servers is...? Print word.", starterCode: "", expectedOutput: "Serverless" },
      },
    },
    // ═══════════════════════════════════════════════════════
    // PHASE 4: ANALYSIS & MODELING (Modules 14–20)
    // Extract insights and make predictions
    // ═══════════════════════════════════════════════════════
    {
      id: "da-eda-mastery", title: "14. EDA Mastery", description: "Distributions, Trends, Anomalies, and Correlations",
      content: "## Exploratory Data Analysis\n\nEDA is the phase where you find the 'story' in the data.\n\n### Focus Areas\n- **Distributions** — Is the data skewed?\n- **Correlations** — Does $X$ affect $Y$?\n- **Anomalies** — Are there errors or rare events?",
      codeExample: "df.corr() # The core EDA command",
      translations: {
        tamil: { title: "14. EDA திறன்", description: "பரவல்கள், போக்குகள், முரண்பாடுகள் மற்றும் தொடர்புகள்" },
        kannada: { title: "14. EDA ಪಾಂಡಿತ್ಯ", description: "ವಿತರಣೆಗಳು, ಪ್ರವೃತ್ತಿಗಳು, ವೈಪರೀತ್ಯಗಳು ಮತ್ತು ಪರಸ್ಪರ ಸಂಬಂಧಗಳು" },
        telugu: { title: "14. EDA మాస్టరీ", description: "పంపిణీలు, పోకడలు, క్రమరాహిత్యాలు మరియు సహసంబంధాలు" },
        hindi: { title: "14. ईडीए महारत", description: "वितरण, रुझान, विसंगतियां और सहसंबंध" },
      },
      exercises: {
        beginner: { prompt: "Identify repeating pattern term? Print word.", starterCode: "", expectedOutput: "Seasonality" },
        intermediate: { prompt: "What is a 'strange spike' in data? Print word.", starterCode: "", expectedOutput: "Anomaly" },
        advanced: { prompt: "Relationship between two vars? Print word.", starterCode: "", expectedOutput: "Correlation" },
      },
    },
    {
      id: "da-visualization-techniques", title: "15. Techniques", description: "Choosing the Right Chart for the Story",
      content: "## Data Visualization\n\n### Techniques\n- **Bar Charts** — Comparison.\n- **Line Charts** — Trends over time.\n- **Scatter Plots** — Relationships/Correlations.\n- **Heatmaps** — Visualizing matrices.",
      codeExample: "print('Trend = Line Chart')",
      translations: {
        tamil: { title: "15. நுட்பங்கள்", description: "கதைக்கு சரியான வரைபடத்தைத் தேர்ந்தெடுப்பது" },
        kannada: { title: "15. ತಂತ್ರಗಳು", description: "ಕಥೆಗೆ ಸರಿಯಾದ ಚಾರ್ಟ್ ಆಯ್ಕೆ ಮಾಡುವುದು" },
        telugu: { title: "15. పద్ధతులు", description: "కథ కోసం సరైన చార్ట్‌ను ఎంచుకోవడం" },
        hindi: { title: "15. तकनीक", description: "कहानी के लिए सही चार्ट चुनना" },
      },
      exercises: {
        beginner: { prompt: "Chart for trend? Print word.", starterCode: "", expectedOutput: "Line" },
        intermediate: { prompt: "Chart for comparison? Print word.", starterCode: "", expectedOutput: "Bar" },
        advanced: { prompt: "Chart for relationship? Print word.", starterCode: "", expectedOutput: "Scatter" },
      },
    },
    {
      id: "da-viz-libraries", title: "16. Python Libraries", description: "Matplotlib, Seaborn, and Plotly",
      content: "## Python Viz Ecosystem\n\n- **Matplotlib** — Low level, maximum control.\n- **Seaborn** — Statistical, beautiful defaults.\n- **Plotly** — Interactive and web-ready.",
      codeExample: "import seaborn as sns\nsns.histplot(data)",
      translations: {
        tamil: { title: "16. பைதான் நூலகங்கள்", description: "Matplotlib, Seaborn மற்றும் Plotly" },
        kannada: { title: "16. ಪೈಥಾನ್ ಲೈಬ್ರರಿಗಳು", description: "Matplotlib, Seaborn ಮತ್ತು Plotly" },
        telugu: { title: "16. పైథాన్ లైబ్రరీలు", description: "Matplotlib, Seaborn మరియు Plotly" },
        hindi: { title: "16. पायथन लाइब्रेरी", description: "Matplotlib, Seaborn और Plotly" },
      },
      exercises: {
        beginner: { prompt: "Which library is for interactive charts? Print word.", starterCode: "", expectedOutput: "Plotly" },
        intermediate: { prompt: "Which library is for beautiful statistical plots? Print word.", starterCode: "", expectedOutput: "Seaborn" },
        advanced: { prompt: "Which is the base library for most Python viz? Print word.", starterCode: "", expectedOutput: "Matplotlib" },
      },
    },
    {
      id: "da-bi-tools", title: "17. BI Tools", description: "Power BI, Tableau, and Dashboards",
      content: "## Business Intelligence\n\nCompanies use BI tools for executive dashboards.\n\n### Concepts\n- **Dimensions** — Categorical data (Region, Product).\n- **Measures** — Numerical data (Sales, Profit).\n- **Slicers** — Interactive filters.",
      codeExample: "print('Sales = Measure, Region = Dimension')",
      translations: {
        tamil: { title: "17. பிஐ கருவிகள்", description: "Power BI, Tableau மற்றும் டேஷ்போர்டுகள்" },
        kannada: { title: "17. BI ಪರಿಕರಗಳು", description: "Power BI, Tableau ಮತ್ತು ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗಳು" },
        telugu: { title: "17. BI టూల్స్", description: "Power BI, Tableau మరియు డాష్‌బోర్డ్‌లు" },
        hindi: { title: "17. बीआई टूल्स", description: "Power BI, Tableau और डैशबोर्ड" },
      },
      exercises: {
        beginner: { prompt: "Is 'Year' a Dimension or Measure? Print word.", starterCode: "", expectedOutput: "Dimension" },
        intermediate: { prompt: "Is 'Profit' a Dimension or Measure? Print word.", starterCode: "", expectedOutput: "Measure" },
        advanced: { prompt: "Tool for interactive business reports? Print word.", starterCode: "", expectedOutput: "Dashboard" },
      },
    },
    {
      id: "da-predictive-analytics", title: "18. Predictive Analytics", description: "Regression, Classification, and Clustering",
      content: "## Machine Learning for Analysts\n\nAnalysts use ML to predict future trends.\n\n### Models\n- **Linear Regression** — Predicting numbers.\n- **Logistic Regression** — Predicting Yes/No.\n- **K-Means Clustering** — Grouping similar customers.",
      codeExample: "from sklearn.linear_model import LinearRegression",
      translations: {
        tamil: { title: "18. முன்கணிப்பு பகுப்பாய்வு", description: "பின்னடைவு, வகைப்படுத்தல் மற்றும் கிளஸ்டரிங்" },
        kannada: { title: "18. ಮುನ್ಸೂಚಕ ವಿಶ್ಲೇಷಣೆ", description: "ರಿಗ್ರೆಷನ್, ವರ್ಗೀಕರಣ ಮತ್ತು ಕ್ಲಸ್ಟರಿಂಗ್" },
        telugu: { title: "18. ప్రిడిక్టివ్ అనలిటిక్స్", description: "రిగ్రెషన్, వర్గీకరణ మరియు క్లస్టరింగ్" },
        hindi: { title: "18. भविष्य कहने वाला विश्लेषण", description: "रिग्रेशन, वर्गीकरण और क्लस्टरिंग" },
      },
      exercises: {
        beginner: { prompt: "Predicting a house price is...? Print word.", starterCode: "", expectedOutput: "Regression" },
        intermediate: { prompt: "Predicting Spam or Not is...? Print word.", starterCode: "", expectedOutput: "Classification" },
        advanced: { prompt: "Grouping similar items is...? Print word.", starterCode: "", expectedOutput: "Clustering" },
      },
    },
    {
      id: "da-hypothesis-testing", title: "19. Hypothesis Testing", description: "T-Tests, Chi-Square, and ANOVA",
      content: "## Proving Results\n\nIs a change 'statistically significant' or just luck?\n\n### Tests\n- **T-Test** — Comparing two groups.\n- **ANOVA** — Comparing three or more groups.\n- **P-Value** — The probability that your result was luck ($p < 0.05$ is the goal).",
      codeExample: "from scipy.stats import ttest_ind",
      translations: {
        tamil: { title: "19. கருதுகோள் சோதனை", description: "T-Tests, Chi-Square மற்றும் ANOVA" },
        kannada: { title: "19. ಹೈಪೋಥೆಸಿಸ್ ಟೆಸ್ಟಿಂಗ್", description: "T-Tests, Chi-Square ಮತ್ತು ANOVA" },
        telugu: { title: "19. పరికల్పన పరీక్ష", description: "T-Tests, Chi-Square మరియు ANOVA" },
        hindi: { title: "19. परिकल्पना परीक्षण", description: "T-Tests, Chi-Square और ANOVA" },
      },
      exercises: {
        beginner: { prompt: "If p=0.01, is it significant? Print 'Yes' or 'No'.", starterCode: "", expectedOutput: "Yes" },
        intermediate: { prompt: "Test for 2 groups? Print word.", starterCode: "", expectedOutput: "T-Test" },
        advanced: { prompt: "Test for 3+ groups? Print word.", starterCode: "", expectedOutput: "ANOVA" },
      },
    },
    {
      id: "da-ab-testing-mastery", title: "20. A/B Testing", description: "Experiment Design and Statistical Significance",
      content: "## The Gold Standard\n\nA/B Testing is how top companies (Netflix, Google) make decisions.\n\n### Design\n- **Control** — The current version.\n- **Treatment** — The new version.\n- **Conversion Lift** — The improvement %.",
      codeExample: "lift = (treatment - control) / control",
      translations: {
        tamil: { title: "20. ஏ/பி சோதனை", description: "பரிசோதனை வடிவமைப்பு மற்றும் புள்ளிவிவர முக்கியத்துவம்" },
        kannada: { title: "20. A/B ಪರೀಕ್ಷೆ", description: "ಪ್ರಯೋಗ ವಿನ್ಯಾಸ ಮತ್ತು ಅಂಕಿಅಂಶಗಳ ಪ್ರಾಮುಖ್ಯತೆ" },
        telugu: { title: "20. A/B టెస్టింగ్", description: "ప్రయోగ రూపకల్పన మరియు గణాంక ప్రాముఖ్యత" },
        hindi: { title: "20. ए/बी टेस्टिंग", description: "प्रयोग डिजाइन और सांख्यिकीय महत्व" },
      },
      exercises: {
        beginner: { prompt: "The group with NO changes? Print word.", starterCode: "", expectedOutput: "Control" },
        intermediate: { prompt: "The group with the change? Print word.", starterCode: "", expectedOutput: "Treatment" },
        advanced: { prompt: "Goal of an A/B test? Print word.", starterCode: "", expectedOutput: "Improvement" },
      },
    },
    // ═══════════════════════════════════════════════════════
    // PHASE 5: PROFESSIONAL SKILLS (Modules 21–24)
    // Communicate, think critically, and land the job
    // ═══════════════════════════════════════════════════════
    {
      id: "da-soft-skills", title: "21. Communication", description: "Presenting Insights and Writing Reports",
      content: "## The Human Side\n\nIf you can't explain your data, your analysis doesn't matter.\n\n### Principles\n- **Executive Summary** — Tell the answer first.\n- **Know your Audience** — Business leaders want ROI, not p-values.\n- **Clarity** — Remove clutter from your charts.",
      codeExample: "print('Communication is 80% of the job')",
      translations: {
        tamil: { title: "21. தகவல் தொடர்பு", description: "உண்ணோக்குகளை வழங்குதல் மற்றும் அறிக்கைகளை எழுதுதல்" },
        kannada: { title: "21. ಸಂವಹನ", description: "ಒಳನೋಟಗಳನ್ನು ಪ್ರಸ್ತುತಪಡಿಸುವುದು ಮತ್ತು ವರದಿಗಳನ್ನು ಬರೆಯುವುದು" },
        telugu: { title: "21. కమ్యూనికేషన్", description: "అంతర్దృష్టులను ప్రదర్శించడం మరియు నివేదికలు రాయడం" },
        hindi: { title: "21. संचार", description: "अंतर्दृष्टि प्रस्तुत करना और रिपोर्ट लिखना" },
      },
      exercises: {
        beginner: { prompt: "Brief summary at the start? Print word.", starterCode: "", expectedOutput: "Executive" },
        intermediate: { prompt: "People who use your insights? Print word.", starterCode: "stakeholders = ['CEO', 'Manager']\n", expectedOutput: "Stakeholders" },
        advanced: { prompt: "Goal of a report? Print word.", starterCode: "goal = 'Finding meaningful information'\n", expectedOutput: "Insight" },
      },
    },
    {
      id: "da-critical-thinking", title: "22. Critical Thinking", description: "Business Questions and Avoiding Bias",
      content: "## The Analyst Mindset\n\n- **Framing** — Turning a vague business request into a data query.\n- **Bias** — Avoiding 'cherry picking' data that fits your opinion.\n- **Skepticism** — Asking 'Why is this number so high?' before reporting it.",
      codeExample: "print('Avoid Selection Bias')",
      translations: {
        tamil: { title: "22. விமர்சன சிந்தனை", description: "வணிக கேள்விகள் மற்றும் சார்புகளைத் தவிர்த்தல்" },
        kannada: { title: "22. ವಿಮರ್ಶಾತ್ಮಕ ಚಿಂತನೆ", description: "ವ್ಯಾಪಾರ ಪ್ರಶ್ನೆಗಳು ಮತ್ತು ಪಕ್ಷಪಾತವನ್ನು ತಪ್ಪಿಸುವುದು" },
        telugu: { title: "22. క్రిటికల్ థింకింగ్", description: "వ్యాపార ప్రశ్నలు మరియు పక్షపాతాన్ని నివారించడం" },
        hindi: { title: "22. महत्वपूर्ण सोच", description: "व्यावसायिक प्रश्न और पूर्वाग्रह से बचना" },
      },
      exercises: {
        beginner: { prompt: "Choosing only 'good' data? Print word.", starterCode: "", expectedOutput: "Bias" },
        intermediate: { prompt: "The 'Why' behind data? Print word.", starterCode: "reasoning = 'logical thinking'\n", expectedOutput: "Reasoning" },
        advanced: { prompt: "Step before querying? Print word.", starterCode: "step = 'Defining the problem'\n", expectedOutput: "Framing" },
      },
    },
    {
      id: "da-domain-knowledge", title: "23. Domain Expertise", description: "Finance, Marketing, and Healthcare Metrics",
      content: "## Context is King\n\nYou must understand the industry you work in.\n\n### Domains\n- **Finance** — ROI, Cash Flow.\n- **Marketing** — CTR, CAC.\n- **SaaS** — MRR, ARR.",
      codeExample: "mrr = sum(subscriptions)",
      translations: {
        tamil: { title: "23. டொமைன் நிபுணத்துவம்", description: "நிதி, சந்தைப்படுத்தல் மற்றும் சுகாதார அளவீடுகள்" },
        kannada: { title: "23. ಡೊಮೇನ್ ಪರಿಣತಿ", description: "ಹಣಕಾಸು, ಮಾರ್ಕೆಟಿಂಗ್ ಮತ್ತು ಆರೋಗ್ಯ ರಕ್ಷಣೆಯ ಮೆಟ್ರಿಕ್‌ಗಳು" },
        telugu: { title: "23. డొమైన్ నైపుణ్యం", description: "ఫైనాన్స్, మార్కెటింగ్ మరియు హెల్త్‌కేర్ మెట్రిక్స్" },
        hindi: { title: "23. डोमेन विशेषज्ञता", description: "वित्त, विपणन और स्वास्थ्य सेवा मेट्रिक्स" },
      },
      exercises: {
        beginner: { prompt: "Marketing: Click Through Rate acronym? Print it.", starterCode: "", expectedOutput: "CTR" },
        intermediate: { prompt: "SaaS: Monthly Recurring Revenue acronym? Print it.", starterCode: "", expectedOutput: "MRR" },
        advanced: { prompt: "Finance: Return on Investment acronym? Print it.", starterCode: "", expectedOutput: "ROI" },
      },
    },
    {
      id: "da-career-prep", title: "24. Career & Portfolio", description: "Building Projects and Interviewing",
      content: "## Get the Job\n\n1. **GitHub** — Host your code.\n2. **LinkedIn** — Show your insights.\n3. **Portfolio** — Tell the stories of your 3 best projects.",
      codeExample: "print('Hired!')",
      translations: {
        tamil: { title: "24. தொழில் & போர்ட்ஃபோலியோ", description: "திட்டங்களை உருவாக்குதல் மற்றும் நேர்காணல்" },
        kannada: { title: "24. ವೃತ್ತಿ ಮತ್ತು ಪೋರ್ಟ್‌ಫೋಲಿಯೊ", description: "ಯೋಜನೆಗಳನ್ನು ನಿರ್ಮಿಸುವುದು ಮತ್ತು ಸಂದರ್ಶನ ಮಾಡುವುದು" },
        telugu: { title: "24. కెరీర్ & పోర్ట్‌ఫోలియో", description: "ప్రాజెక్ట్‌లను నిర్మించడం మరియు ఇంటర్వ్యూ చేయడం" },
        hindi: { title: "24. करियर और पोर्टफोलियो", description: "परियोजनाओं का निर्माण और साक्षात्कार" },
      },
      exercises: {
        beginner: { prompt: "Where to host code? Print word.", starterCode: "", expectedOutput: "GitHub" },
        intermediate: { prompt: "Most important portfolio element? Print word.", starterCode: "", expectedOutput: "Story" },
        advanced: { prompt: "The goal of an interview? Print word.", starterCode: "print('Success')", expectedOutput: "Confidence" },
      },
    },
  ];
}

function wd(): CareerLesson[] {
  return [
    {
      id: "wd-best-practices",
      title: "0. Best Practices & Classic Mistakes",
      description: "Dos, Don'ts, and what to avoid in Web Dev",
      category: "Foundations",
      content:
        "## The Golden Rules of Web Dev 🌐\n\nBefore building apps, you must understand the rules for security and performance.\n\n### DOs (What you should use)\n- **DO** validate all user input on the backend (never trust the client).\n- **DO** use semantic HTML tags (`<header>`, `<nav>`, `<article>`) for accessibility and SEO.\n- **DO** write mobile-first CSS.\n\n### DON'Ts (Classic Mistakes)\n- **DON'T** store plain text passwords. Always hash them.\n- **DON'T** block the main JavaScript thread with heavy synchronous tasks.\n- **DON'T** forget to handle API errors and loading states in the UI.",
      codeExample:
        "// DO: Semantic HTML\n// <button>Submit</button>\n\n// DON'T: Non-semantic interactive elements\n// <div class=\"button\" onclick=\"submit()\">Submit</div>",
      exercises: {
        beginner: { type: "quiz", prompt: "Where should you validate user input for security?", options: ["Frontend only", "Backend only", "Both Backend and Frontend"], correctOption: 2, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "Print 'Never trust user input'", starterCode: "print('___')", expectedOutput: "Never trust user input" },
        advanced: { type: "code", prompt: "Print 'Semantic HTML'", starterCode: "print('___')", expectedOutput: "Semantic HTML" },
      },
    },
    // ═══════════════════════════════════════════════════════
    // PHASE 1: BEGINNER - FOUNDATIONS (Modules 1–3)
    // ═══════════════════════════════════════════════════════
    {
      id: "wd-foundations", title: "1. Python Foundations for Web", description: "JSON, HTTP Basics, and File I/O",
      content: "## The Web Analyst Toolbox\n\n### Core Skills\n- **JSON Handling** — The language of the web APIs.\n- **HTTP Basics** — Understanding GET, POST, and Status Codes.\n- **File I/O** — Handling uploads and configuration files.\n- **Exceptions** — Graceful error handling for web requests.",
      codeExample: "import json\ndata = {'status': 'active', 'id': 101}\njson_string = json.dumps(data)\nprint(f'API Payload: {json_string}')",
      exercises: {
        beginner: { prompt: "Convert `{'ok': True}` to a JSON string. Print it.", starterCode: "import json\n", expectedOutput: "{\"ok\": true}" },
        intermediate: { prompt: "Parse `{\"price\": 9.99}` and print the value of 'price'.", starterCode: "import json\njs = '{\"price\": 9.99}'\n", expectedOutput: "9.99" },
        advanced: { prompt: "Write a function that returns 'OK' if a status code is 200, else 'Error'. Test with 404.", starterCode: "", expectedOutput: "Error" },
      },
    },
    {
      id: "wd-frameworks", title: "2. Intro to Web Frameworks", description: "Flask Basics, Routing, and Templates",
      content: "## Modern Web Frameworks\n\n### Flask Essentials\n- **@app.route** — Mapping URLs to Python functions.\n- **Jinja2** — Rendering dynamic HTML with variables.\n- **Static Files** — Serving CSS, JS, and Images.",
      codeExample: "from flask import Flask, render_template\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return '<h1>Welcome to PyMaster</h1>'",
      exercises: {
        beginner: { prompt: "Define a route string for the 'about' page. Print it.", starterCode: "", expectedOutput: "/about" },
        intermediate: { prompt: "Use an f-string to render 'Hello, Alice!' where name='Alice'.", starterCode: "name = 'Alice'\n", expectedOutput: "Hello, Alice!" },
        advanced: { prompt: "Filter a list `['index.html', 'style.css']` for files ending in `.css`. Print result.", starterCode: "", expectedOutput: "['style.css']" },
      },
    },
    {
      id: "wd-databases", title: "3. Database Basics", description: "SQLite, SQLAlchemy, and Migrations",
      content: "## Persistent Storage\n\n### SQL for Web\n- **SQLite** — Lightweight, local database.\n- **SQLAlchemy** — Mapping Python classes to database tables (ORM).\n- **Migrations** — Managing schema changes with Alembic.",
      codeExample: "from flask_sqlalchemy import SQLAlchemy\n# User(id=1, username='dinesh') -> mapped to DB row",
      exercises: {
        beginner: { prompt: "Print the SQL command to create a table named 'users'.", starterCode: "", expectedOutput: "CREATE TABLE users" },
        intermediate: { prompt: "Given a list of dicts, filter where 'id' == 1. Print the name.", starterCode: "db = [{'id': 1, 'name': 'Alice'}, {'id': 2, 'name': 'Bob'}]\n", expectedOutput: "Alice" },
        advanced: { prompt: "If `db_type = 'sqlite'`, print 'Local'. Else print 'Cloud'. Test with 'postgres'.", starterCode: "db_type = 'postgres'\n", expectedOutput: "Cloud" },
      },
    },

    // ═══════════════════════════════════════════════════════
    // PHASE 2: INTERMEDIATE - APIS & AUTH (Modules 4–6)
    // ═══════════════════════════════════════════════════════
    {
      id: "wd-auth", title: "4. User Authentication", description: "Sessions, JWT, and Password Hashing",
      content: "## Securing Your App\n\n### Auth Layers\n- **Sessions** — Server-side state management.\n- **JWT** — Stateless tokens for mobile/modern apps.\n- **Bcrypt/Argon2** — Strong password hashing techniques.",
      codeExample: "import hashlib\npwd = 'secret123'\nhash = hashlib.sha256(pwd.encode()).hexdigest()\nprint(f'Secure Hash: {hash[:10]}...')",
      exercises: {
        beginner: { prompt: "Hash '12345' using sha256 and print the hex digest length.", starterCode: "import hashlib\n", expectedOutput: "64" },
        intermediate: { prompt: "Check if 'token' exists in `{'user': 'A', 'token': '123'}`. Print result.", starterCode: "", expectedOutput: "True" },
        advanced: { prompt: "Simulate a login: if `pwd == 'admin'` print '200', else '401'. Test with 'guest'.", starterCode: "pwd = 'guest'\n", expectedOutput: "401" },
      },
    },
    {
      id: "wd-rest-api", title: "5. REST API Development", description: "FastAPI, Swagger, and OpenAPI",
      content: "## Building Pro APIs\n\n### The Async Stack\n- **FastAPI** — High-performance async Python framework.\n- **Pydantic** — Strict data validation.\n- **Auto-Docs** — Interactive Swagger/OpenAPI documentation.",
      codeExample: "from fastapi import FastAPI\napp = FastAPI()\n\n@app.get('/items/{id}')\nasync def read_item(id: int):\n    return {'item_id': id}",
      exercises: {
        beginner: { prompt: "What does REST stand for? Print the full form.", starterCode: "", expectedOutput: "Representational State Transfer" },
        intermediate: { prompt: "Define an async function `get_data()` that returns 'Done'. Print the call.", starterCode: "import asyncio\n", expectedOutput: "Done" },
        advanced: { prompt: "Filter `[1, 2, 3]` for even numbers using list comprehension. Print result.", starterCode: "", expectedOutput: "[2]" },
      },
    },
    {
      id: "wd-frontend", title: "6. Frontend Integration", description: "React, Tailwind, and Form Validation",
      content: "## Full-Stack Connectivity\n\n### Integration Patterns\n- **Templates** — Server-side rendering (Django/Jinja).\n- **Headless** — React/Vue consuming a JSON API.\n- **Validation** — WTForms and Pydantic for data integrity.",
      codeExample: "const response = await fetch('/api/data');\nconst data = await response.json();",
      exercises: {
        beginner: { prompt: "Print the tag used to link CSS in HTML.", starterCode: "", expectedOutput: "<link>" },
        intermediate: { prompt: "Print a JSON object representing `{id: 1, name: 'UI'}`.", starterCode: "", expectedOutput: "{\"id\": 1, \"name\": \"UI\"}" },
        advanced: { prompt: "Write a function that returns 'valid' if len > 5, else 'short'. Test 'abc'.", starterCode: "", expectedOutput: "short" },
      },
    },

    // ═══════════════════════════════════════════════════════
    // PHASE 3: ADVANCED - SCALE & SECURITY (Modules 7–9)
    // ═══════════════════════════════════════════════════════
    {
      id: "wd-async", title: "7. Async & Background Tasks", description: "Celery, Redis, and AsyncIO",
      content: "## High-Performance Backgrounding\n\n### Task Queues\n- **AsyncIO** — Concurrent programming in FastAPI.\n- **Celery** — Distributed task queue for heavy processing.\n- **Redis** — The lightning-fast message broker.",
      codeExample: "@app.task\ndef send_email_task(user_id):\n    # This runs in the background\n    pass",
      exercises: {
        beginner: { prompt: "Is Redis a database or a broker? Print word.", starterCode: "", expectedOutput: "Broker" },
        intermediate: { prompt: "Print 'Success' after a 1 second async sleep simulation.", starterCode: "import asyncio\n", expectedOutput: "Success" },
        advanced: { prompt: "Append 'task' to every item in `['mail', 'sms']`. Print result.", starterCode: "", expectedOutput: "['mailtask', 'smstask']" },
      },
    },
    {
      id: "wd-security", title: "8. Security & Best Practices", description: "CORS, CSRF, and Role-Based Access",
      content: "## Hardening the Server\n\n### Critical Protection\n- **CSRF** — Cross-Site Request Forgery protection.\n- **CORS** — Managing cross-origin resource sharing.\n- **RBAC** — Role-Based Access Control for permissions.",
      codeExample: "from flask_cors import CORS\nCORS(app) # Enable secure sharing",
      exercises: {
        beginner: { prompt: "What does HTTPS stand for? Print full form.", starterCode: "", expectedOutput: "Hypertext Transfer Protocol Secure" },
        intermediate: { prompt: "If user is 'admin', print 'All'. Else 'Limited'. Test with 'guest'.", starterCode: "user = 'guest'\n", expectedOutput: "Limited" },
        advanced: { prompt: "Check if URL 'http://' is secure. Print 'Secure' or 'Insecure'.", starterCode: "url = 'http://google.com'\n", expectedOutput: "Insecure" },
      },
    },
    {
      id: "wd-testing", title: "9. Testing & Debugging", description: "PyTest, Coverage, and Debug Toolbars",
      content: "## Zero-Bug Development\n\n### Reliability Tools\n- **PyTest** — The gold standard for Python testing.\n- **Coverage** — Measuring how much of your code is tested.\n- **Debuggers** — Using Flask/Django Debug Toolbars for deep inspection.",
      codeExample: "def test_api():\n    response = client.get('/')\n    assert response.status_code == 200",
      exercises: {
        beginner: { prompt: "What command runs pytest? Print it.", starterCode: "", expectedOutput: "pytest" },
        intermediate: { prompt: "Assert 10 == 10. If passes, print 'OK'.", starterCode: "", expectedOutput: "OK" },
        advanced: { prompt: "Check if 'error' is in `{'msg': 'ok'}`. Print 'Alert' or 'Safe'.", starterCode: "", expectedOutput: "Safe" },
      },
    },

    // ═══════════════════════════════════════════════════════
    // PHASE 4: EXPERT - ENTERPRISE (Modules 10–12)
    // ═══════════════════════════════════════════════════════
    {
      id: "wd-microservices", title: "10. Microservices & APIs", description: "GraphQL, Gateways, and Orchestration",
      content: "## The Distributed Web\n\n### Architecture\n- **GraphQL** — Flexible data fetching (Graphene/Strawberry).\n- **API Gateways** — Centralized entry point for services.\n- **Service Mesh** — Managing inter-service communication.",
      codeExample: "query { user(id: 1) { username email } }",
      exercises: {
        beginner: { prompt: "Is GraphQL better for precise data fetching? Print 'Yes' or 'No'.", starterCode: "", expectedOutput: "Yes" },
        intermediate: { prompt: "Print a dictionary representing a GraphQL user object with id 1.", starterCode: "", expectedOutput: "{\"id\": 1}" },
        advanced: { prompt: "Join two strings 'Service' and 'A' with a dash. Print result.", starterCode: "", expectedOutput: "Service-A" },
      },
    },
    {
      id: "wd-devops", title: "11. Deployment & DevOps", description: "Docker, CI/CD, and Cloud Pipelines",
      content: "## The Ship-It Phase\n\n### DevOps Toolkit\n- **Docker** — Containerizing your Python environment.\n- **CI/CD** — Automating builds with GitHub Actions.\n- **Cloud** — Deployment on AWS, Azure, and Vercel.",
      codeExample: "FROM python:3.9\nCOPY . /app\nRUN pip install -r requirements.txt",
      exercises: {
        beginner: { prompt: "Command to build a docker image? Print it.", starterCode: "", expectedOutput: "docker build" },
        intermediate: { prompt: "What file defines Docker instructions? Print filename.", starterCode: "", expectedOutput: "Dockerfile" },
        advanced: { prompt: "Check if 'AWS' is in `['AWS', 'GCP']`. Print 'Cloud' or 'Local'.", starterCode: "", expectedOutput: "Cloud" },
      },
    },
    {
      id: "wd-enterprise", title: "12. Enterprise Full-Stack Apps", description: "Scaling, Kubernetes, and Multi-DB",
      content: "## Scaling to Millions\n\n### Massive Systems\n- **Kubernetes** — Orchestrating containers at scale.\n- **Multi-DB** — Handling PostgreSQL and MongoDB together.\n- **High Availability** — Zero-downtime deployment patterns.",
      codeExample: "apiVersion: apps/v1\nkind: Deployment\nmetadata: name: web-app",
      exercises: {
        beginner: { prompt: "What is K8s short for? Print full word.", starterCode: "", expectedOutput: "Kubernetes" },
        intermediate: { prompt: "Print 'Cluster' 3 times using a loop.", starterCode: "", expectedOutput: "Cluster\nCluster\nCluster" },
        advanced: { prompt: "Calculate required replicas: 100 users / 20 per pod. Print result.", starterCode: "", expectedOutput: "5.0" },
      },
    },
  ];
}

function aiml(): CareerLesson[] {
  return [
    {
      id: "aiml-best-practices",
      title: "0. Best Practices & Classic Mistakes",
      description: "Dos, Don'ts, and what to avoid in AI/ML",
      category: "Foundations",
      content:
        "## The Golden Rules of ML 🤖\n\nBefore training models, you must understand how to avoid building useless or biased systems.\n\n### DOs (What you should use)\n- **DO** split your data into Training, Validation, and Test sets.\n- **DO** normalize or scale your input features.\n- **DO** establish a simple baseline model before trying complex Deep Learning.\n\n### DON'Ts (Classic Mistakes)\n- **DON'T** leak test data into your training process (Data Leakage).\n- **DON'T** use Accuracy as the only metric for imbalanced datasets (use F1-score or Precision/Recall).\n- **DON'T** assume a model is fair; always check for bias.",
      codeExample:
        "# DO: Train/Test Split\n# X_train, X_test = train_test_split(X, test_size=0.2)\n\n# DON'T: Train and evaluate on the exact same data\n# model.fit(X, y)\n# score = model.score(X, y) # 100% accuracy? It's memorized!",
      exercises: {
        beginner: { type: "quiz", prompt: "What is it called when information from outside the training dataset is used to create the model?", options: ["Overfitting", "Data Leakage", "Underfitting"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "Print 'Data Leakage'", starterCode: "print('___')", expectedOutput: "Data Leakage" },
        advanced: { type: "code", prompt: "Print 'Train Test Split'", starterCode: "print('___')", expectedOutput: "Train Test Split" },
      },
    },
    // ═══════════════════════════════════════════════════════
    // PHASE 1: FOUNDATIONS & DATA (Modules 1–2)
    // Master the core concepts and prepare data for modeling
    // ═══════════════════════════════════════════════════════
    {
      id: "ml-foundations", title: "1. Foundations of AI & ML", description: "Mathematics, CS Basics, and Core ML Concepts",
      content: "## The Building Blocks of AI\n\n### Mathematics for ML\n- **Linear Algebra**: Vectors, matrices, eigenvalues, and eigenvectors are the language of data.\n- **Calculus**: Derivatives and partial derivatives enable optimization (Gradient Descent).\n- **Probability & Statistics**: Normal distributions, Bayes' Theorem, and hypothesis testing provide the foundation for uncertainty.\n\n### CS Basics\n- **Algorithms**: Understanding complexity (Big O) and data structures is crucial for efficient model implementation.\n\n### Core ML Concepts\n- **Supervised vs Unsupervised**: Learning from labels vs. finding hidden patterns.\n- **Tradeoffs**: Understanding Overfitting vs. Underfitting and the Bias-Variance tradeoff.",
      codeExample: "import numpy as np\n\n# Vector dot product demo\na = np.array([1, 2])\nb = np.array([3, 4])\ndot = np.dot(a, b) # 1*3 + 2*4 = 11",
      translations: {
        tamil: { title: "1. AI & ML இன் அடிப்படைகள்", description: "கணிதம், கணினி அறிவியல் மற்றும் ML கருத்துக்கள்" },
        kannada: { title: "1. AI மற்றும் ML ನ ಅಡಿಪಾಯಗಳು", description: "ಗಣಿತ, CS ಮೂಲಗಳು ಮತ್ತು ML ಪರಿಕಲ್ಪನೆಗಳು" },
        telugu: { title: "1. AI & ML పునాదులు", description: "గణితం, CS బేసిక్స్ మరియు ML కాన్సెప్ట్లకు" },
        hindi: { title: "1. AI और ML की नींव", description: "गणित, CS बेसिक्स और ML कॉन्सेप्ट्स" },
      },
      exercises: {
        beginner: { prompt: "If a model performs great on training data but poorly on new data, what is it called? Print word.", starterCode: "", expectedOutput: "Overfitting" },
        intermediate: { prompt: "Algorithm for finding the minimum of a function? Print words.", starterCode: "", expectedOutput: "Gradient Descent" },
        advanced: { prompt: "Calculate dot product of [1, 3] and [2, 4]. Print the result.", starterCode: "a = [1, 3]\nb = [2, 4]\n# Compute dot product\n", expectedOutput: "14" },
      },
    },
    {
      id: "ml-data-prep", title: "2. Data Preparation & Feature Engineering", description: "Cleaning, Scaling, and Dimensionality Reduction",
      content: "## Turning Raw Data into Intelligence\n\n### Data Cleaning\nHandling missing values (Imputation), duplicates, and outliers using Z-scores or IQR.\n\n### Feature Engineering\n- **Encoding**: Converting categorical variables to numbers using One-Hot or Label encoding.\n- **Scaling**: Normalization (Min-Max) and Standardization (Z-score scaling).\n- **Transformation**: Creating polynomial features to capture non-linear relationships.\n\n### Dimensionality Reduction\n- **PCA (Principal Component Analysis)**: Reducing feature count while preserving variance.\n- **t-SNE & LDA**: Techniques for visualization and class separation.",
      codeExample: "data = [10, 20, 30, 40, 50]\nmn, mx = min(data), max(data)\nnormalized = [(x - mn) / (mx - mn) for x in data]\nprint(normalized)",
      translations: {
        tamil: { title: "2. தரவு தயாரிப்பு மற்றும் அம்ச பொறியியல்", description: "சுத்தம் செய்தல், அளவிடுதல் மற்றும் பரிமாணக் குறைப்பு" },
        kannada: { title: "2. ಡೇಟಾ ತಯಾರಿ ಮತ್ತು ಫೀಚರ್ ಎಂಜಿನಿಯರಿಂಗ್", description: "ಶುಚಿಗೊಳಿಸುವಿಕೆ, ಸ್ಕೇಲಿಂಗ್ ಮತ್ತು ಆಯಾಮದ ಕಡಿತ" },
        telugu: { title: "2. డేటా ప్రిపరేషన్ & ఫీచర్ ఇంజనీరింగ్", description: "క్లీనింగ్, స్కేలింగ్ మరియు డైమెన్షనాలిటీ రిడక్షన్" },
        hindi: { title: "2. डेटा तैयारी और फ़ीचर इंजीनियरिंग", description: "सफाई, स्केलिंग और आयामी कमी" },
      },
      exercises: {
        beginner: { prompt: "Process of handling missing data? Print word.", starterCode: "", expectedOutput: "Imputation" },
        intermediate: { prompt: "Reducing input variables while keeping info? Print acronym.", starterCode: "", expectedOutput: "PCA" },
        advanced: { prompt: "Calculate Z-score for value 15 where mean=10, std=5. Print it.", starterCode: "v = 15\nmean = 10\nstd = 5\n# Z = (v - mean) / std\n", expectedOutput: "1.0" },
      },
    },
    // ═══════════════════════════════════════════════════════
    // PHASE 2: CORE MACHINE LEARNING (Modules 3–4)
    // Learn standard supervised and unsupervised algorithms
    // ═══════════════════════════════════════════════════════
    {
      id: "ml-supervised", title: "3. Supervised Learning", description: "Regression, Classification, and Ensembles",
      content: "## Predictive Modeling\n\n### Regression\n- **Linear & Polynomial**: Predicting house prices or stock trends.\n- **Regularization**: Ridge and Lasso to prevent overfitting.\n\n### Classification\n- **Logistic Regression**: Binary classification (Yes/No).\n- **SVM & Decision Trees**: Robust boundary-based classification.\n- **Random Forest**: An ensemble of trees to improve stability.\n\n### Ensemble Methods\n- **Bagging**: Parallel model training.\n- **Boosting**: Sequential training (XGBoost, AdaBoost, LightGBM) to correct errors.",
      codeExample: "from sklearn.ensemble import RandomForestClassifier\nprint('Model Ready: Random Forest Ensemble')",
      translations: {
        tamil: { title: "3. மேற்பார்வையிடப்பட்ட கற்றல்", description: "ரெக்ரஷன், வகைப்படுத்தல் மற்றும் குழுக்கள்" },
        kannada: { title: "3. ಮೇಲ್ವಿಚಾರಣೆಯ ಕಲಿಕೆ", description: "ರಿಗ್ರೆಷನ್, ವರ್ಗೀಕರಣ ಮತ್ತು ಎನ್ಸೆಂಬಲ್ಸ್" },
        telugu: { title: "3. సూపర్వైజ్డ్ లెర్నింగ్", description: "రిగ్రెషన్, క్లాసిఫికేషన్ మరియు ఎంసెంబుల్స్" },
        hindi: { title: "3. सुपर्वाइज्ड लर्निंग", description: "रिग्रेशन, वर्गीकरण और एन्सेम्बल्स" },
      },
      exercises: {
        beginner: { prompt: "Predicting a category (Spam vs Ham) is called? Print word.", starterCode: "", expectedOutput: "Classification" },
        intermediate: { prompt: "Combining multiple models for better accuracy? Print word.", starterCode: "", expectedOutput: "Ensemble" },
        advanced: { prompt: "Acronym for Extreme Gradient Boosting? Print word.", starterCode: "", expectedOutput: "XGBoost" },
      },
    },
    {
      id: "ml-unsupervised", title: "4. Unsupervised Learning", description: "Clustering, Association, and Anomaly Detection",
      content: "## Finding Hidden Structures\n\n### Clustering\n- **K-Means**: Grouping data points into K clusters based on distance.\n- **Hierarchical Clustering**: Building a tree-like hierarchy of clusters.\n- **DBSCAN**: Density-based clustering for complex shapes.\n\n### Association Rule Learning\n- **Apriori Algorithm**: Used for market basket analysis ('Customers who bought bread also bought milk').\n- **Anomaly Detection\n- **Isolation Forest**: Detecting rare events (Fraud detection, system failure).",
      codeExample: "print('Clusters found using K-Means: 5')",
      translations: {
        tamil: { title: "4. மேற்பார்வையிடப்படாத கற்றல்", description: "கிளஸ்டரிங் மற்றும் அசோசியேஷன்" },
        kannada: { title: "4. ಮೇಲ್ವಿಚಾರಣೆಯಿಲ್ಲದ ಕಲಿಕೆ", description: "ಕ್ಲಸ್ಟರಿಂಗ್ ಮತ್ತು ಅಸೋಸಿಯೇಷನ್" },
        telugu: { title: "4. అన్-సూపర్వైజ్డ్ లెర్నింగ్", description: "క్లస్టరింగ్ మరియు అసోసియేషన్" },
        hindi: { title: "4. अनसुपरवाइज्ड लर्निंग", description: "क्लस्टरिंग और एसोसिएशन" },
      },
      exercises: {
        beginner: { prompt: "Most common clustering algorithm? Print word.", starterCode: "", expectedOutput: "K-Means" },
        intermediate: { prompt: "Learning without labels? Print word.", starterCode: "", expectedOutput: "Unsupervised" },
        advanced: { prompt: "Method to find 'unusual' fraud data? Print words.", starterCode: "", expectedOutput: "Anomaly Detection" },
      },
    },
    // ═══════════════════════════════════════════════════════
    // PHASE 3: ADVANCED AI (Modules 5–7)
    // Deep Learning, NLP, and Computer Vision
    // ═══════════════════════════════════════════════════════
    {
      id: "ml-deep-learning", title: "5. Neural Networks & Deep Learning", description: "Architectures from CNNs to Transformers",
      content: "## Inspired by the Biological Brain\n\n### Neural Architecture\n- **Layers**: Input, Hidden (with weights/biases), and Output.\n- **Activations**: ReLU (standard), Sigmoid (probabilistic), and Softmax (multi-class).\n- **Optimization**: Backpropagation and Stochastic Gradient Descent (SGD).\n\n### Advanced Architectures\n- **CNN (Convolutional Neural Networks)**: Optimized for spatial data (Images).\n- **RNN & LSTM**: Designed for sequential data (Text, Time-series).\n- **Transformers**: The architecture behind LLMs (GPT, BERT) using the 'Attention' mechanism.",
      codeExample: "import math\ndef relu(x): return max(0, x)\nprint(f'ReLU of -5 is {relu(-5)}')",
      translations: {
        tamil: { title: "5. நரம்பியல் நெட்வொர்க்குகள் & ஆழ்ந்த கற்றல்", description: "CNN-கள், RNN-கள் மற்றும் டிரான்ஸ்பார்மர்கள்" },
        kannada: { title: "5. ನರಮಂಡಲದ ಜಾಲಗಳು ಮತ್ತು ಆಳವಾದ ಕಲಿಕೆ", description: "CNN ಗಳು, RNN ಗಳು ಮತ್ತು ಟ್ರಾನ್ಸ್ಫಾರ್ಮರ್ಗಳು" },
        telugu: { title: "5. న్యూరల్ నెట్వర్క్స్ & డీప్ లెర్నింగ్", description: "CNNలు, RNNలు మరియు ట్రాన్స్ఫార్మర్లు" },
        hindi: { title: "5. न्यूरल नेटवर्क और डीप लर्निंग", description: "CNN, RNN और ट्रांसफॉर्मर" },
      },
      exercises: {
        beginner: { prompt: "Mechanism powering modern Transformers? Print word.", starterCode: "", expectedOutput: "Attention" },
        intermediate: { prompt: "Best network for image processing? Print acronym.", starterCode: "", expectedOutput: "CNN" },
        advanced: { prompt: "Calculation: Weight=0.5, Input=10, Bias=1. Print the neuron output before activation.", starterCode: "w = 0.5\ni = 10\nb = 1\n# y = w*i + b\n", expectedOutput: "6.0" },
      },
    },
    {
      id: "ml-nlp", title: "6. Natural Language Processing (NLP)", description: "Text Processing, Sentiment, and Language Models",
      content: "## Teaching Computers to Read and Speak\n\n### Text Processing\n- **Tokenization**: Splitting text into words/sub-words.\n- **Normalization**: Stemming, Lemmatization, and removing Stop Words.\n- **Vectorization**: Bag-of-Words, TF-IDF, and Word Embeddings (Word2Vec).\n\n### Applications\n- **Sentiment Analysis**: Detecting emotion in text.\n- **Named Entity Recognition (NER)**: Extracting names, places, and dates.\n- **Machine Translation**: Converting languages (Seq2Seq).",
      codeExample: "text = 'AI is amazing!'\ntokens = text.lower().split()\nprint(tokens)",
      translations: {
        tamil: { title: "6. இயற்கை மொழி செயலாக்கம் (NLP)", description: "உரை செயலாக்கம் மற்றும் மொழி மாதிரிகள்" },
        kannada: { title: "6. ನೈಸರ್ಗಿಕ ಭಾಷಾ ಸಂಸ್ಕರಣೆ (NLP)", description: "ಪಠ್ಯ ಸಂಸ್ಕರಣೆ ಮತ್ತು ಭಾಷಾ ಮಾದರಿಗಳು" },
        telugu: { title: "6. నేచురల్ లాంగ్వేజ్ ప్రాసెసింగ్ (NLP)", description: "టెక్స్ట్ ప్రాసెసింగ్ మరియు భాషా నమూనాలు" },
        hindi: { title: "6. नेचुरल लैंग्वेज प्रोसेसिंग (NLP)", description: "टेक्स्ट प्रोसेसिंग और भाषा मॉडल" },
      },
      exercises: {
        beginner: { prompt: "Splitting text into words is called? Print word.", starterCode: "", expectedOutput: "Tokenization" },
        intermediate: { prompt: "Detecting positive/negative emotion? Print words.", starterCode: "", expectedOutput: "Sentiment Analysis" },
        advanced: { prompt: "Vectorization technique starting with T? Print acronym.", starterCode: "", expectedOutput: "TF-IDF" },
      },
    },
    {
      id: "ml-cv", title: "7. Computer Vision & Reinforcement Learning", description: "Object Detection and Learning via Rewards",
      content: "## Perception and Action\n\n### Computer Vision\n- **Image Processing**: Filtering, edge detection (Canny), and augmentation.\n- **Object Detection**: YOLO (You Only Look Once) and R-CNN for localized recognition.\n- **Segmentation**: Identifying precise pixel-boundaries of objects.\n\n### Reinforcement Learning (RL)\n- **The Agent-Environment Loop**: Learning via rewards and penalties.\n- **Q-Learning & Policy Gradients**: Algorithms for finding the optimal policy.\n- **Applications**: Game AI (AlphaGo) and autonomous robotics.",
      codeExample: "print('Vision Model: Object Detection Active (YOLO v8)')",
      translations: {
        tamil: { title: "7. கம்ப்யூட்டர் விஷன் & வலுவூட்டல் கற்றல்", description: "பொருள் கண்டறிதல் மற்றும் வெகுமதிகள் மூலம் கற்றல்" },
        kannada: { title: "7. ಕಂಪ್ಯೂಟರ್ ವಿಷನ್ ಮತ್ತು ಬಲವರ್ಧನೆಯ ಕಲಿಕೆ", description: "ವಸ್ತು ಪತ್ತೆ ಮತ್ತು ಪ್ರತಿಫಲಗಳ ಮೂಲಕ ಕಲಿಯುವುದು" },
        telugu: { title: "7. కంప్యూటర్ విజన్ & రీఇన్ఫోర్స్మెంట్ లెర్నింగ్", description: "ఆబ్జెక్ట్ డిటెక్షన్ మరియు రివార్డుల ద్వారా నేర్చుకోవడం" },
        hindi: { title: "7. कंप्यूटर विजन और सुदृढीकरण सीखना", description: "ऑब्जेक्ट डिटेक्शन और पुरस्कार के माध्यम से सीखना" },
      },
      exercises: {
        beginner: { prompt: "Acronym for 'You Only Look Once'? Print word.", starterCode: "", expectedOutput: "YOLO" },
        intermediate: { prompt: "AI learning through rewards/penalties? Print acronym.", starterCode: "", expectedOutput: "RL" },
        advanced: { prompt: "The decision maker in RL is called the...? Print word.", starterCode: "", expectedOutput: "Agent" },
      },
    },
    // ═══════════════════════════════════════════════════════
    // PHASE 4: PRODUCTION & ETHICS (Modules 8–9)
    // Deploy models responsibly with MLOps
    // ═══════════════════════════════════════════════════════
    {
      id: "ml-tools-ethics", title: "8. ML Tools, Ethics, and Responsible AI", description: "PyTorch, TensorFlow, and Ethical AI",
      content: "## Deployment and Responsibility\n\n### Frameworks\n- **PyTorch (Meta)**: Dynamic graphs, widely used in research.\n- **TensorFlow (Google)**: Production-ready, ecosystem with Keras.\n\n### Responsible AI\n- **Fairness**: Mitigating bias in datasets to prevent discrimination.\n- **Explainability (XAI)**: Tools like SHAP and LIME to explain *why* a model made a choice.\n- **Privacy**: Differential Privacy and Federated Learning to protect user data.",
      codeExample: "print('Framework: PyTorch 2.0 | Ethics Check: Passed')",
      translations: {
        tamil: { title: "8. ML கருவிகள், நெறிமுறைகள் & பொறுப்பான AI", description: "PyTorch, TensorFlow மற்றும் நெறிமுறை AI" },
        kannada: { title: "8. ML ಪರಿಕರಗಳು, ನೈತಿಕತೆ ಮತ್ತು ಜವಾಬ್ದಾರಿಯುತ AI", description: "PyTorch, TensorFlow ಮತ್ತು ನೈತಿಕ AI" },
        telugu: { title: "8. ML టూల్స్, ఎథిక్స్ & బాధ్యతాయుతమైన AI", description: "PyTorch, TensorFlow మరియు నైతిక AI" },
        hindi: { title: "8. ML टूल्स, नैतिकता और जिम्मेदार AI", description: "PyTorch, TensorFlow और नैतिक AI" },
      },
      exercises: {
        beginner: { prompt: "Deep Learning framework by Meta? Print word.", starterCode: "", expectedOutput: "PyTorch" },
        intermediate: { prompt: "Acronym for Explainable AI? Print acronym.", starterCode: "", expectedOutput: "XAI" },
        advanced: { prompt: "Protecting user identity in training? Print word.", starterCode: "", expectedOutput: "Privacy" },
      },
    },
    {
      id: "ml-mlops", title: "9. MLOps & Real-World Applications", description: "Deployment, Monitoring, and Industry Case Studies",
      content: "## From Laptop to Production\n\n### MLOps\n- **CI/CD for ML**: Automating retraining and deployment.\n- **Monitoring**: Detecting Data Drift (when incoming data changes over time).\n- **Serving**: Flask/FastAPI for model APIs and Docker for containerization.\n\n### Industry Applications\n- **Healthcare**: Diagnosing diseases from medical scans.\n- **Finance**: Algorithmic trading and credit scoring.\n- **Retail**: Personalization engines and inventory forecasting.",
      codeExample: "print('Pipeline Status: Deployed to Production | Drifting: No')",
      translations: {
        tamil: { title: "9. MLOps மற்றும் நிஜ உலக பயன்பாடுகள்", description: "வரிசைப்படுத்துதல், கண்காணிப்பு மற்றும் தொழில்துறை ஆய்வுகள்" },
        kannada: { title: "9. MLOps ಮತ್ತು ನೈಜ-ಪ್ರಪಂಚದ ಅನ್ವಯಗಳು", description: "ನಿಯೋಜನೆ, ಮೇಲ್ವಿಚಾರಣೆ ಮತ್ತು ಉದ್ಯಮ ಅಧ್ಯಯನಗಳು" },
        telugu: { title: "9. MLOps మరియు రియల్-వరల్డ్ అప్లికేషన్స్", description: "డిప్లాయ్మెంట్, మానిటరింగ్ మరియు ఇండస్ట్రీ స్టడీస్" },
        hindi: { title: "9. MLOps और वास्तविक दुनिया के अनुप्रयोग", description: "परिनियोजन, निगरानी और उद्योग अध्ययन" },
      },
      exercises: {
        beginner: { prompt: "When data changes over time, it is called Data...? Print word.", starterCode: "", expectedOutput: "Drift" },
        intermediate: { prompt: "Container tool for ML deployment? Print word.", starterCode: "", expectedOutput: "Docker" },
        advanced: { prompt: "Modern framework for building high-performance APIs? Print word.", starterCode: "", expectedOutput: "FastAPI" },
      },
    },
  ];
}

function auto(): CareerLesson[] {
  return [
    {
      id: "auto-best-practices",
      title: "0. Best Practices & Classic Mistakes",
      description: "Dos, Don'ts, and what to avoid in Automation",
      category: "Foundations",
      content:
        "## The Golden Rules of Automation ⚙️\n\nBefore writing scripts to automate your life or business, learn how to keep them secure and reliable.\n\n### DOs (What you should use)\n- **DO** use environment variables (`.env`) for secrets like API keys and passwords.\n- **DO** use modern libraries like `pathlib` for file paths instead of string manipulation.\n- **DO** add robust logging so you know exactly when and why a script fails.\n\n### DON'Ts (Classic Mistakes)\n- **DON'T** hardcode passwords into your scripts.\n- **DON'T** use blanket exception handling (e.g., `except Exception: pass`). It hides the real bugs.\n- **DON'T** run destructive scripts (like deleting files) without testing them in a safe 'dry run' mode first.",
      codeExample:
        "# DO: Catch specific errors\n# try:\n#     import os; key = os.environ['API_KEY']\n# except KeyError:\n#     print('Missing key!')\n\n# DON'T: Hide all errors blindly\n# try:\n#     do_something()\n# except:\n#     pass",
      exercises: {
        beginner: { type: "quiz", prompt: "Where should you store sensitive API keys?", options: ["In a text file", "Hardcoded in the script", "In environment variables (.env)"], correctOption: 2, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "Print 'Never hardcode secrets'", starterCode: "print('___')", expectedOutput: "Never hardcode secrets" },
        advanced: { type: "code", prompt: "Print 'Use robust logging'", starterCode: "print('___')", expectedOutput: "Use robust logging" },
      },
    },
    {
      id: "auto-intro", title: "Python Automation Basics", description: "Automate repetitive tasks",
      content: "## Why Automation?\n\nIf you do something more than twice, automate it.\n\n### What Can You Automate?\n- File organization & renaming\n- Data entry & form filling\n- Email sending & reporting\n- Web scraping & data collection\n- System monitoring\n\n### Python's Toolkit\n- os / shutil — File operations\n- requests — HTTP calls\n- BeautifulSoup — Web scraping\n- schedule — Task scheduling",
      codeExample: "files = [\"report_jan.csv\", \"report_feb.csv\", \"image.png\", \"report_mar.csv\"]\ncsv_files = [f for f in files if f.endswith(\".csv\")]\nprint(\"CSV files:\", csv_files)\nfor f in csv_files:\n    month = f.split(\"_\")[1].split(\".\")[0]\n    print(\" \", month, \"->\", f)",
      translations: {
        tamil: { title: "Python Automation அடிப்படைகள்", description: "மீண்டும் மீண்டும் செய்யும் பணிகளை தானியக்கமாக்குங்கள்" },
        kannada: { title: "Python Automation ಮೂಲಭಾಗಗಳು", description: "ಪುನರಾವರ್ತಿತ ಕೆಲಸಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತಗೊಳಿಸಿ" },
        telugu: { title: "Python Automation బేసిక్స్", description: "పునరావృత పనులను ఆటోమేట్ చేయండి" },
        hindi: { title: "Python Automation Basics", description: "दोहराए जाने वाले कार्यों को ऑटोमेट करें" },
      },
      exercises: {
        beginner: { prompt: "Filter files ending with `.png` or `.jpg` from a list. Print the filtered list and its `len()`.", starterCode: "files = ['doc.pdf', 'img.png', 'data.csv', 'pic.jpg']\n\n# Filter images, print list and count\n", expectedOutput: "['img.png', 'pic.jpg']\n2" },
        intermediate: { prompt: "Add `'backup_'` prefix to each filename in `['data.csv', 'config.json']`. Print the new list.", starterCode: "files = ['data.csv', 'config.json']\n\n# Prefix each, print\n", expectedOutput: "['backup_data.csv', 'backup_config.json']" },
        advanced: { prompt: "Count lines starting with `'ERROR'` in a log list. Print the count and the first error message.", starterCode: "logs = [\n    'INFO: Started',\n    'ERROR: Connection failed',\n    'INFO: OK',\n    'ERROR: Timeout'\n]\n\n# Count errors, print count and first error\n", expectedOutput: "2\nERROR: Connection failed" },
      },
    },
    {
      id: "auto-scraping", title: "Web Scraping Basics", description: "Extract data from websites",
      content: "## Web Scraping\n\nExtract data from websites programmatically.\n\n### How It Works\n1. Send HTTP request\n2. Parse HTML content\n3. Extract needed data\n4. Store it\n\n### Tools\n- requests — Fetch pages\n- BeautifulSoup — Parse HTML\n- Scrapy — Full framework",
      codeExample: "html = '<h1>Welcome</h1><p class=\"price\">29.99</p><p class=\"price\">49.99</p>'\nimport re\nprices = re.findall(r'class=\"price\">(\\d+\\.\\d+)', html)\nprint(\"Prices found:\", prices)\nprint(\"Total:\", sum(float(p) for p in prices))",
      exercises: {
        beginner: { prompt: "Extract text between `<h1>` and `</h1>` from `'<h1>Hello</h1>'` using `.replace()`. Print it.", starterCode: "html = '<h1>Hello</h1>'\n\n# Extract text and print\n", expectedOutput: "Hello" },
        intermediate: { prompt: "Parse `'$29.99'` to a float by removing `'$'`. Print the float and its `type().__name__`.", starterCode: "price_str = '$29.99'\n\n# Parse to float, print value and type\n", expectedOutput: "29.99\nfloat" },
        advanced: { prompt: "Count URLs starting with `'https'` in a text. Also count `'http'` (non-https). Print both counts.", starterCode: "text = 'Visit https://a.com or http://b.com or https://c.org'\n\n# Count https and http-only URLs, print both\n", expectedOutput: "2\n1" },
      },
    },
    {
      id: "auto-regex", title: "Regular Expressions", description: "Pattern matching for text automation",
      content: "## Regular Expressions (Regex)\n\nRegex lets you search for patterns in text.\n\n### Common Patterns\n- \\d — Any digit\n- \\w — Any word character\n- . — Any character\n- * — Zero or more\n- + — One or more\n- [] — Character class\n\n### Python's re module\n- re.search() — Find first match\n- re.findall() — Find all matches\n- re.sub() — Replace matches",
      codeExample: "import re\n\ntext = \"Contact us at support@example.com or sales@company.org\"\n\n# Find all emails\nemails = re.findall(r'[\\w.]+@[\\w.]+', text)\nprint(\"Emails:\", emails)\n\n# Find all phone-like patterns\nphones = \"Call 555-1234 or 555-5678\"\nnumbers = re.findall(r'\\d{3}-\\d{4}', phones)\nprint(\"Numbers:\", numbers)",
      exercises: {
        beginner: { prompt: "Use `re.findall(r'\\d+', 'abc123def456')`. Print the list of matches.", starterCode: "import re\ntext = 'abc123def456'\n\n# Find all digit groups, print\n", expectedOutput: "['123', '456']" },
        intermediate: { prompt: "Extract email domains from `'user@gmail.com admin@yahoo.com'` using `re.findall(r'@([\\w.]+)')`. Print the list.", starterCode: "import re\ntext = 'user@gmail.com admin@yahoo.com'\n\n# Extract domains, print\n", expectedOutput: "['gmail.com', 'yahoo.com']" },
        advanced: { prompt: "Replace all digits with `'#'` in `'Phone: 555-1234'` using `re.sub()`. Print the result.", starterCode: "import re\ntext = 'Phone: 555-1234'\n\n# Replace digits, print\n", expectedOutput: "Phone: ###-####" },
      },
    },
    {
      id: "auto-api", title: "API Integration", description: "Connect to external services via APIs",
      content: "## API Integration\n\nAPIs let your scripts talk to other services.\n\n### REST API Basics\n- GET — Read data\n- POST — Send data\n- Headers — Authentication, content type\n- JSON — Standard data format\n\n### Common APIs\n- Weather data\n- Social media\n- Payment processing\n- Email services",
      codeExample: "import json\n\n# Simulating API response\napi_response = json.dumps({\n    \"status\": \"success\",\n    \"data\": {\"temp\": 72, \"city\": \"New York\"},\n    \"count\": 1\n})\n\nparsed = json.loads(api_response)\nprint(\"City:\", parsed[\"data\"][\"city\"])\nprint(\"Temp:\", parsed[\"data\"][\"temp\"])",
      exercises: {
        beginner: { prompt: "Parse JSON `'{\"name\": \"Alice\"}'` using `json.loads()`. Print the name.", starterCode: "import json\n\n# Parse and print name\n", expectedOutput: "Alice" },
        intermediate: { prompt: "Convert `{'status': 'ok', 'code': 200}` to JSON using `json.dumps()`. Print the string.", starterCode: "import json\ndata = {'status': 'ok', 'code': 200}\n\n# Convert and print\n", expectedOutput: '{"status": "ok", "code": 200}' },
        advanced: { prompt: "Build a query string from `{'q': 'python', 'page': '1'}` using `join()`. Print the result.", starterCode: "params = {'q': 'python', 'page': '1'}\n\n# Build query string, print\n", expectedOutput: "q=python&page=1" },
      },
    },
    {
      id: "auto-scheduling", title: "Task Scheduling & Cron", description: "Run scripts on a schedule",
      content: "## Task Scheduling\n\nAutomate when scripts run.\n\n### Methods\n- **time.sleep()** — Simple delays\n- **schedule library** — Readable scheduling\n- **cron (Linux)** — OS-level scheduling\n- **Windows Task Scheduler**\n\n### Use Cases\n- Daily report generation\n- Hourly data sync\n- Monitoring & alerts\n- Backup automation",
      codeExample: "import time\nfrom datetime import datetime\n\n# Simulating a scheduled task\ndef run_task():\n    now = datetime.now().strftime(\"%H:%M:%S\")\n    print(f\"[{now}] Task executed\")\n\n# Simulating cron-like schedule\nschedule = {\n    \"daily_report\": \"08:00\",\n    \"hourly_sync\": \"every 1h\",\n    \"backup\": \"02:00\"\n}\n\nfor task, when in schedule.items():\n    print(f\"{task}: runs at {when}\")",
      exercises: {
        beginner: { prompt: "Get the current hour using `datetime.now().hour`. Print its `type().__name__`.", starterCode: "from datetime import datetime\n\n# Get hour, print its type name\n", expectedOutput: "int" },
        intermediate: { prompt: "Create a schedule dict with 3 tasks and their times. Print `len(schedule)` and the keys as a sorted list.", starterCode: "# Create schedule dict, print count and sorted keys\n", expectedOutput: "3\n['backup', 'report', 'sync']" },
        advanced: { prompt: "Parse cron `'*/5 * * * *'`. Split by space, extract interval from first field. Print the field and the interval as int.", starterCode: "cron = '*/5 * * * *'\n\n# Parse first field and interval, print both\n", expectedOutput: "*/5\n5" },
      },
    },
    {
      id: "auto-email", title: "Email Automation", description: "Send automated emails with Python",
      content: "## Email Automation\n\nAutomate sending emails for reports, alerts, notifications.\n\n### Python Email Libraries\n- **smtplib** — Built-in SMTP client\n- **email.mime** — Create rich email messages\n- **SendGrid / Mailgun** — Cloud email APIs\n\n### Email Structure\n- From, To, Subject\n- Body (plain text or HTML)\n- Attachments",
      codeExample: "# Email template builder\ndef build_email(to, subject, body, attachments=None):\n    email = {\n        \"to\": to,\n        \"subject\": subject,\n        \"body\": body,\n        \"attachments\": attachments or []\n    }\n    return email\n\nemail = build_email(\n    \"user@example.com\",\n    \"Daily Report\",\n    \"Here is your report for today.\"\n)\nprint(f\"To: {email['to']}\")\nprint(f\"Subject: {email['subject']}\")",
      exercises: {
        beginner: { prompt: "Create email dict with `to`, `subject`, `body`. Print `subject` and `len()` of keys.", starterCode: "# Create email dict, print subject and key count\n", expectedOutput: "Hello\n3" },
        intermediate: { prompt: "Format email body using f-string: `name='Alice'`, `total=150`. Print `f'Dear {name}, total is ${total}.'`.", starterCode: "name = 'Alice'\ntotal = 150\n\n# Format and print body\n", expectedOutput: "Dear Alice, total is $150." },
        advanced: { prompt: "Split CSV `'a@mail.com,b@mail.com,c@mail.com'` into a list. Print the list and `len()`.", starterCode: "csv = 'a@mail.com,b@mail.com,c@mail.com'\n\n# Split and print list and count\n", expectedOutput: "['a@mail.com', 'b@mail.com', 'c@mail.com']\n3" },
      },
    },
    {
      id: "auto-cli-logging", title: "CLI Tools & Logging", description: "Build reusable command-line scripts with good logs",
      content: "## CLI Tools\n\nA lot of real automation is just clean CLI scripts.\n\n### Must-have skills\n- **argparse** — parse command-line arguments\n- **logging** — structured output you can trust\n- **exit codes** — tell other tools success/failure\n\n### Logging levels\n- DEBUG: details\n- INFO: normal progress\n- WARNING: something odd\n- ERROR: failed",
      codeExample: "import logging\n\nlogging.basicConfig(level=logging.INFO, format=\"%(levelname)s: %(message)s\")\n\ndef run(task):\n    logging.info(\"Starting %s\", task)\n    if task == \"backup\":\n        logging.info(\"Backup complete\")\n        return 0\n    logging.error(\"Unknown task\")\n    return 1\n\ncode = run(\"backup\")\nprint(code)\n",
      exercises: {
        beginner: { prompt: "Print `'INFO'` if `ok=True` else `'ERROR'`. Then print `type(ok).__name__`.", starterCode: "ok = True\n\n# Print INFO/ERROR and type name\n", expectedOutput: "INFO\nbool" },
        intermediate: { prompt: "Write `exit_code(success)` returning `0` if True else `1`. Test with `True` and `False`. Print both.", starterCode: "# Define exit_code, test both\n", expectedOutput: "0\n1" },
        advanced: { prompt: "Given `args = ['--task', 'clean', '--verbose']`. Find `'--task'` index and print next value. Also check if `'--verbose'` is in args, print True/False.", starterCode: "args = ['--task', 'clean', '--verbose']\n\n# Parse task value and check verbose flag\n", expectedOutput: "clean\nTrue" },
      },
    },
    {
      id: "auto-concurrency", title: "Concurrency for Faster Automation", description: "Run multiple tasks in parallel safely",
      content: "## Concurrency\n\nWhen automation feels slow, it is often waiting on I/O (network, disk).\n\n### Options\n- **threads**: good for I/O bound tasks\n- **async**: good for many network calls\n- **processes**: for CPU heavy work\n\n### Safety rules\n- Limit parallelism (do not spawn 1000 tasks)\n- Timeouts everywhere\n- Retries with backoff for network calls",
      codeExample: "from concurrent.futures import ThreadPoolExecutor\n\nitems = [1, 2, 3, 4]\n\ndef work(x):\n    return x * x\n\nwith ThreadPoolExecutor(max_workers=2) as ex:\n    results = list(ex.map(work, items))\n\nprint(results)\n",
      exercises: {
        beginner: { prompt: "Square each number in `[1, 2, 3]` using a list comprehension. Print the list.", starterCode: "nums = [1, 2, 3]\n\n# Square each, print\n", expectedOutput: "[1, 4, 9]" },
        intermediate: { prompt: "Use `map()` with a lambda to double `[2, 4, 6]`. Print the resulting list.", starterCode: "nums = [2, 4, 6]\n\n# Use map to double, print\n", expectedOutput: "[4, 8, 12]" },
        advanced: { prompt: "Given `tasks = ['a', 'b', 'c']`. Set `max_workers = min(2, len(tasks))`. Print `max_workers` and `len(tasks)`.", starterCode: "tasks = ['a', 'b', 'c']\n\n# Calculate max_workers, print both\n", expectedOutput: "2\n3" },
      },
    },
  ];
}

function de(): CareerLesson[] {
  return [
    {
      id: "de-best-practices",
      title: "0. Best Practices & Classic Mistakes",
      description: "Dos, Don'ts, and what to avoid in Data Engineering",
      category: "Foundations",
      content:
        "## The Golden Rules of Data Engineering 🚰\n\nBefore building data pipelines, you must understand the rules of reliability and scalability.\n\n### DOs (What you should use)\n- **DO** design pipelines to be 'idempotent' (safe to retry multiple times without duplicating data).\n- **DO** use incremental loads instead of full table scans when dealing with large datasets.\n- **DO** log failures clearly with timestamps and tracebacks.\n\n### DON'Ts (Classic Mistakes)\n- **DON'T** use `for` loops in Python to transform millions of rows (use vectorized operations in Pandas/Spark, or use SQL).\n- **DON'T** tightly couple your extraction and loading logic. Keep them separate.\n- **DON'T** ignore data quality checks; bad data in means bad data out.",
      codeExample:
        "# DO: Vectorized operations\n# df['new_col'] = df['col1'] + df['col2']\n\n# DON'T: Loops for large transformations\n# for i in range(len(df)):\n#     df.loc[i, 'new_col'] = df.loc[i, 'col1'] + df.loc[i, 'col2']",
      exercises: {
        beginner: { type: "quiz", prompt: "What does 'idempotent' mean in Data Engineering?", options: ["Fast execution", "Safe to run multiple times with same result", "Written in Python"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "Print 'Avoid full table scans'", starterCode: "print('___')", expectedOutput: "Avoid full table scans" },
        advanced: { type: "code", prompt: "Print 'Vectorized Operations'", starterCode: "print('___')", expectedOutput: "Vectorized Operations" },
      },
    },
    {
      id: "de-intro", title: "Data Engineering Fundamentals", description: "Pipelines, ETL, and data infrastructure",
      content: "## What is Data Engineering?\n\nData engineers build infrastructure that makes data usable.\n\n### Key Concepts\n- **ETL** — Extract, Transform, Load\n- **Data Pipeline** — Automated data flow\n- **Data Warehouse** — Centralized store\n- **Data Lake** — Raw data storage\n\n### ETL Process\n1. Extract — Pull from sources\n2. Transform — Clean, validate\n3. Load — Store in destination",
      codeExample: "def extract():\n    return [{\"name\": \"Alice\", \"age\": \"25\"}, {\"name\": \"Bob\", \"age\": \"thirty\"}]\n\ndef transform(data):\n    clean = []\n    for row in data:\n        try:\n            row[\"age\"] = int(row[\"age\"])\n            clean.append(row)\n        except ValueError:\n            print(\"Skipping:\", row[\"name\"])\n    return clean\n\ndef load(data):\n    for row in data:\n        print(\"Loaded:\", row[\"name\"])\n\nload(transform(extract()))",
      translations: {
        tamil: { title: "Data Engineering அடிப்படைகள்", description: "Pipelines, ETL மற்றும் data infrastructure அறிமுகம்" },
        kannada: { title: "Data Engineering ಮೂಲಭಾಗಗಳು", description: "Pipelines, ETL ಮತ್ತು data infrastructure" },
        telugu: { title: "Data Engineering ఫండమెంటల్స్", description: "Pipelines, ETL మరియు data infrastructure" },
        hindi: { title: "Data Engineering Fundamentals", description: "Pipelines, ETL और data infrastructure" },
      },
      exercises: {
        beginner: { prompt: "Remove `None` values from `[1, None, 3, None, 5]`. Print the clean list.", starterCode: "data = [1, None, 3, None, 5]\n\n# Remove Nones, print\n", expectedOutput: "[1, 3, 5]" },
        intermediate: { prompt: "Convert string numbers to int, skip invalid with `try/except`. Print valid count and the valid list.", starterCode: "raw = ['10', '20', 'abc', '40']\n\n# Convert, skip errors, print count and list\n", expectedOutput: "3\n[10, 20, 40]" },
        advanced: { prompt: "Transform: uppercase all names in `[{'name':'alice'},{'name':'bob'}]`. Print the transformed list.", starterCode: "data = [{'name': 'alice'}, {'name': 'bob'}]\n\n# Uppercase names, print list\n", expectedOutput: "[{'name': 'ALICE'}, {'name': 'BOB'}]" },
      },
    },
    {
      id: "de-sql", title: "SQL for Data Engineers", description: "Master SQL queries and database design",
      content: "## SQL Mastery\n\nData engineers live and breathe SQL.\n\n### Advanced SQL\n- **JOINs** — Combine tables\n- **GROUP BY** — Aggregate data\n- **Window Functions** — Running totals, rankings\n- **Subqueries** — Queries within queries\n- **CTEs** — Common Table Expressions\n\n### Database Design\n- Normalization (1NF, 2NF, 3NF)\n- Star schema vs snowflake\n- Indexing strategies",
      codeExample: "# Simulating SQL operations in Python\norders = [\n    {\"id\": 1, \"customer\": \"Alice\", \"amount\": 100},\n    {\"id\": 2, \"customer\": \"Bob\", \"amount\": 200},\n    {\"id\": 3, \"customer\": \"Alice\", \"amount\": 150},\n]\n\n# GROUP BY customer, SUM(amount)\nfrom collections import defaultdict\ntotals = defaultdict(int)\nfor o in orders:\n    totals[o[\"customer\"]] += o[\"amount\"]\n\nfor customer, total in totals.items():\n    print(f\"{customer}: ${total}\")",
      exercises: {
        beginner: { prompt: "Group `['Eng', 'Sales', 'Eng', 'Sales']` and count occurrences. Print the counts dict.", starterCode: "items = ['Eng', 'Sales', 'Eng', 'Sales']\n\n# Count each, print dict\n", expectedOutput: "{'Eng': 2, 'Sales': 2}" },
        intermediate: { prompt: "Simulate LEFT JOIN: for each user, find matching orders. Print the number of orders for user id=1.", starterCode: "users = [{'id': 1, 'name': 'A'}, {'id': 2, 'name': 'B'}]\norders = [{'uid': 1, 'item': 'X'}, {'uid': 1, 'item': 'Y'}]\n\n# Count orders for user 1, print\n", expectedOutput: "2" },
        advanced: { prompt: "Calculate running total of `[100, 200, 150]`. Print the running totals list.", starterCode: "values = [100, 200, 150]\n\n# Build running total list, print\n", expectedOutput: "[100, 300, 450]" },
      },
    },
    {
      id: "de-pipelines", title: "Building Data Pipelines", description: "Design and implement data workflows",
      content: "## Data Pipelines\n\nAutomate the flow of data from source to destination.\n\n### Pipeline Components\n1. **Source** — Where data comes from\n2. **Processor** — Transform/clean\n3. **Sink** — Where data goes\n4. **Scheduler** — When it runs\n5. **Monitor** — Track failures\n\n### Pipeline Patterns\n- Batch processing (hourly/daily)\n- Stream processing (real-time)\n- Lambda architecture (batch + stream)",
      codeExample: "# Pipeline builder pattern\nclass Pipeline:\n    def __init__(self):\n        self.steps = []\n    \n    def add_step(self, name, func):\n        self.steps.append((name, func))\n        return self\n    \n    def run(self, data):\n        for name, func in self.steps:\n            data = func(data)\n            print(f\"Step '{name}': {len(data)} records\")\n        return data\n\np = Pipeline()\np.add_step(\"filter\", lambda d: [x for x in d if x > 0])\np.add_step(\"double\", lambda d: [x * 2 for x in d])\nresult = p.run([-1, 2, -3, 4, 5])\nprint(\"Result:\", result)",
      exercises: {
        beginner: { prompt: "Apply two steps: filter positives from `[-1, 2, -3, 4]`, then double them. Print the final list.", starterCode: "data = [-1, 2, -3, 4]\n\n# Filter positives, double, print\n", expectedOutput: "[4, 8]" },
        intermediate: { prompt: "Chain 3 transformations on `[' Alice ', ' BOB ']`: `.strip()`, `.lower()`, `.capitalize()`. Print the result list.", starterCode: "names = [' Alice ', ' BOB ']\n\n# Strip, lower, capitalize each, print\n", expectedOutput: "['Alice', 'Bob']" },
        advanced: { prompt: "Write 3 functions: `extract()` returns `range(10)` as list, `transform(data)` filters evens, `load(data)` returns `len`. Chain them. Print the final count.", starterCode: "# Define extract, transform, load. Chain and print\n", expectedOutput: "5" },
      },
    },
    {
      id: "de-streaming", title: "Stream Processing", description: "Handle real-time data streams",
      content: "## Stream Processing\n\nProcess data as it arrives, not in batches.\n\n### Concepts\n- **Events** — Individual data points\n- **Producers** — Generate events\n- **Consumers** — Process events\n- **Topics** — Event categories\n- **Windowing** — Group events by time\n\n### Tools\n- Apache Kafka — Event streaming\n- Apache Flink — Stream processing\n- Redis Streams — Lightweight streaming",
      codeExample: "from collections import deque\n\n# Simulating a message queue\nclass MessageQueue:\n    def __init__(self):\n        self.queue = deque()\n    \n    def produce(self, message):\n        self.queue.append(message)\n    \n    def consume(self):\n        return self.queue.popleft() if self.queue else None\n\nmq = MessageQueue()\nmq.produce({\"event\": \"click\", \"user\": \"Alice\"})\nmq.produce({\"event\": \"purchase\", \"user\": \"Bob\"})\n\nwhile msg := mq.consume():\n    print(f\"Processing: {msg['event']} by {msg['user']}\")",
      exercises: {
        beginner: { prompt: "Use `deque` as a queue. Append `'a','b','c'`. `popleft()`. Print popped value and remaining deque.", starterCode: "from collections import deque\n\n# Create deque, append, popleft, print both\n", expectedOutput: "a\ndeque(['b', 'c'])" },
        intermediate: { prompt: "Sliding window average of `[1,3,5,7,9]` with `window=3`. Print the list of averages.", starterCode: "data = [1, 3, 5, 7, 9]\nwindow = 3\n\n# Calculate sliding averages, print list\n", expectedOutput: "[3.0, 5.0, 7.0]" },
        advanced: { prompt: "Count events by type from `['click','view','click','click','view']`. Print the counts dict.", starterCode: "events = ['click', 'view', 'click', 'click', 'view']\n\n# Count by type, print dict\n", expectedOutput: "{'click': 3, 'view': 2}" },
      },
    },
    {
      id: "de-cloud", title: "Cloud Data Platforms", description: "AWS, GCP, and Azure for data engineering",
      content: "## Cloud Data Platforms\n\n### AWS Data Services\n- **S3** — Object storage\n- **Redshift** — Data warehouse\n- **Glue** — ETL service\n- **Kinesis** — Streaming\n\n### GCP Data Services\n- **BigQuery** — Serverless analytics\n- **Cloud Storage** — Object storage\n- **Dataflow** — Stream & batch processing\n\n### Key Concepts\n- Infrastructure as Code\n- Auto-scaling\n- Cost optimization",
      codeExample: "# Cloud storage path patterns\ndef s3_path(bucket, prefix, date, filename):\n    return f\"s3://{bucket}/{prefix}/{date}/{filename}\"\n\n# Partitioned data paths\nfor month in [\"2024-01\", \"2024-02\", \"2024-03\"]:\n    path = s3_path(\"data-lake\", \"sales\", month, \"data.parquet\")\n    print(path)",
      exercises: {
        beginner: { prompt: "Build an S3 path from `bucket='my-bucket'` and `key='data/file.csv'`. Print it.", starterCode: "bucket = 'my-bucket'\nkey = 'data/file.csv'\n\n# Build path, print\n", expectedOutput: "s3://my-bucket/data/file.csv" },
        intermediate: { prompt: "Generate partitioned paths for `dates=['2024-01','2024-02','2024-03']`. Print each path and total count.", starterCode: "dates = ['2024-01', '2024-02', '2024-03']\n\n# Generate paths, print each and count\n", expectedOutput: "data/date=2024-01/part.parquet\ndata/date=2024-02/part.parquet\ndata/date=2024-03/part.parquet\n3" },
        advanced: { prompt: "Parse `'s3://analytics-bucket/raw/users/data.csv'`. Extract and print the bucket name and the key (everything after bucket).", starterCode: "path = 's3://analytics-bucket/raw/users/data.csv'\n\n# Extract bucket and key, print both\n", expectedOutput: "analytics-bucket\nraw/users/data.csv" },
      },
    },
    {
      id: "de-data-modeling", title: "Data Modeling Mastery", description: "Dimensional modeling, keys, and schema design",
      content: "## Data Modeling\n\nGood models make analytics easy.\n\n### Common models\n- **Star schema**: fact table + dimension tables\n- **Snowflake**: normalized dimensions\n\n### Key ideas\n- **Primary key**: unique row id\n- **Foreign key**: links tables\n- **Grain**: what one row represents\n\n### Interview gold\nAlways state the grain first. It avoids 50% of modeling bugs.",
      codeExample: "# Fact table grain example\nfacts = [\n    {\"order_id\": 1, \"user_id\": 10, \"amount\": 50},\n    {\"order_id\": 2, \"user_id\": 10, \"amount\": 20},\n    {\"order_id\": 3, \"user_id\": 11, \"amount\": 30},\n]\n\n# Aggregate to user grain\nby_user = {}\nfor f in facts:\n    by_user[f[\"user_id\"]] = by_user.get(f[\"user_id\"], 0) + f[\"amount\"]\nprint(by_user[10])\n",
      exercises: {
        beginner: { prompt: "Print `'one row = one order'`. Then print `len('order')`.", starterCode: "# Print grain phrase and len of 'order'\n", expectedOutput: "one row = one order\n5" },
        intermediate: { prompt: "Given `orders=[(1,10),(2,10),(3,11)]`. Count orders for user `10` and print. Also print total orders.", starterCode: "orders = [(1, 10), (2, 10), (3, 11)]\n\n# Count user 10 orders and total, print both\n", expectedOutput: "2\n3" },
        advanced: { prompt: "Detect duplicate IDs in `[1, 2, 2, 3]`. Print `True` if duplicates exist. Also print how many duplicates.", starterCode: "ids = [1, 2, 2, 3]\n\n# Check for dups, print bool and count\n", expectedOutput: "True\n1" },
      },
    },
    {
      id: "de-data-quality", title: "Data Quality & Reliability", description: "Validation checks, null handling, and pipeline trust",
      content: "## Data Quality\n\nIf data is wrong, everything is wrong.\n\n### Common checks\n- Not null for key columns\n- Uniqueness for ids\n- Valid ranges (age 0-120)\n- Referential integrity (foreign keys exist)\n\n### Reliability habits\n- Add checks at every stage\n- Fail fast for bad data\n- Track metrics: rows in/out, null rate, duplicates",
      codeExample: "# Simple data validation checks\nrows = [\n    {\"id\": 1, \"age\": 25},\n    {\"id\": 2, \"age\": None},\n    {\"id\": 2, \"age\": 40},\n]\n\nids = [r[\"id\"] for r in rows]\nnull_age = sum(1 for r in rows if r[\"age\"] is None)\nduplicates = len(ids) - len(set(ids))\nprint(null_age, duplicates)\n",
      exercises: {
        beginner: { prompt: "Count `None` values in `[1, None, 2, None]`. Print the count and total length.", starterCode: "data = [1, None, 2, None]\n\n# Count Nones and total, print both\n", expectedOutput: "2\n4" },
        intermediate: { prompt: "Check if ALL ages in `[10, 50, 130]` are between 0-120. Print the result. Also print the invalid value.", starterCode: "ages = [10, 50, 130]\n\n# Check validity, print result and invalid value\n", expectedOutput: "False\n130" },
        advanced: { prompt: "Count duplicate values in `ids=[1,2,2,2]`. Print unique count and duplicate count.", starterCode: "ids = [1, 2, 2, 2]\n\n# Print unique count and duplicate count\n", expectedOutput: "2\n2" },
      },
    },
  ];
}

function cs(): CareerLesson[] {
  return [
    {
      id: "cs-best-practices",
      title: "0. Best Practices & Classic Mistakes",
      description: "Dos, Don'ts, and what to avoid in Cybersecurity",
      category: "Foundations",
      content:
        "## The Golden Rules of Security 🛡️\n\nBefore writing scripts that deal with security, you must learn the defensive mindset.\n\n### DOs (What you should use)\n- **DO** sanitize all user input before using it in a shell command or SQL query.\n- **DO** use modern, built-in security libraries (e.g., Python's `secrets` module instead of `random` for passwords).\n- **DO** adhere to the Principle of Least Privilege (give scripts only the permissions they absolutely need).\n\n### DON'Ts (Classic Mistakes)\n- **DON'T** write your own cryptography algorithms (always use proven, standard libraries).\n- **DON'T** print sensitive information (like tokens or PII) to standard logs.\n- **DON'T** assume internal networks are inherently safe (Zero Trust).",
      codeExample:
        "# DO: Use secrets for security tokens\n# import secrets\n# token = secrets.token_hex(16)\n\n# DON'T: Use random for security\n# import random\n# token = str(random.random()) # Not secure!",
      exercises: {
        beginner: { type: "quiz", prompt: "Which Python module should you use for generating secure passwords and tokens?", options: ["random", "math", "secrets"], correctOption: 2, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "Print 'Sanitize all input'", starterCode: "print('___')", expectedOutput: "Sanitize all input" },
        advanced: { type: "code", prompt: "Print 'Principle of Least Privilege'", starterCode: "print('___')", expectedOutput: "Principle of Least Privilege" },
      },
    },
    {
      id: "cs-intro", title: "Python for Cybersecurity", description: "Security fundamentals with Python",
      content: "## Cybersecurity with Python\n\nPython is widely used by security teams for **defense**, **automation**, and **incident response**.\n\n### First Rule (Important)\nOnly test systems you **own** or have **written permission** to test. Learning security is great, but \"hacking anything\" is illegal and harmful.\n\n### Applications\n- Security automation\n- Log analysis and detection\n- Forensics\n- Secure coding and hardening\n- Authorized security testing (with permission)\n\n### Key Libraries\n- hashlib — Hashing (MD5, SHA256)\n- hmac — Secure comparisons and signatures\n- secrets — Secure random tokens\n- cryptography — Encryption\n- socket — Network programming (safe diagnostics)\n- re/json/csv — Parsing security logs",
      codeExample: "import hashlib\npassword = \"SecurePass123\"\nhashed = hashlib.sha256(password.encode()).hexdigest()\nprint(\"SHA256:\", hashed[:20] + \"...\")\n\ndef verify(pwd, hash_val):\n    return hashlib.sha256(pwd.encode()).hexdigest() == hash_val\nprint(\"Valid:\", verify(\"SecurePass123\", hashed))\nprint(\"Invalid:\", verify(\"wrong\", hashed))",
      translations: {
        tamil: { title: "Cybersecurity க்கான Python", description: "Python மூலம் பாதுகாப்பின் அடிப்படைகளை கற்றுக்கொள்ளுங்கள்" },
        kannada: { title: "Cybersecurity ಗೆ Python", description: "Python ಮೂಲಕ ಭದ್ರತಾ ಮೂಲಭಾಗಗಳನ್ನು ಕಲಿಯಿರಿ" },
        telugu: { title: "Cybersecurity కోసం Python", description: "Python తో security fundamentals నేర్చుకోండి" },
        hindi: { title: "Cybersecurity के लिए Python", description: "Python के साथ security fundamentals" },
      },
      exercises: {
        beginner: { prompt: "Caesar cipher: shift each char in `'abc'` by 1 using `chr(ord(c)+1)`. Print encrypted string.", starterCode: "text = 'abc'\n\n# Shift each char, print\n", expectedOutput: "bcd" },
        intermediate: { prompt: "Check password `'Secure1!'`: length >= 8, has digit, has uppercase. Print `True`/`False` and the length.", starterCode: "pwd = 'Secure1!'\n\n# Check strength, print result and length\n", expectedOutput: "True\n8" },
        advanced: { prompt: "XOR encrypt `'Hi'` with `key=42`. Print the encrypted list. Then decrypt back and print the original string.", starterCode: "text = 'Hi'\nkey = 42\n\n# Encrypt, print list. Decrypt, print string.\n", expectedOutput: "[98, 67]\nHi" },
      },
    },
    {
      id: "cs-ethics", title: "Ethics, Law, and Safe Labs", description: "Learn safely without harming anyone",
      content: "## Ethics and Permission\n\nSecurity skills must be used responsibly.\n\n### What is allowed\n- Your own devices and applications\n- Systems you have **explicit written permission** to test\n- Practice targets designed for learning (CTFs and labs)\n\n### What is not allowed\n- Testing random websites/apps\n- Attempting to access accounts/data you do not own\n- \"Trying\" attacks on public networks\n\n### Safe practice labs (recommended)\n- OWASP Juice Shop (web app practice)\n- DVWA (web vulnerability practice)\n- TryHackMe / Hack The Box (guided labs)\n\n### A professional pentest always includes\n1. Scope + permission\n2. Testing plan\n3. Evidence (screenshots/logs)\n4. Fix recommendations\n5. Final report",
      codeExample: "# Scope guard: only allow testing approved targets\nallowed = {\"localhost\", \"127.0.0.1\", \"example.com\"}\n\ndef in_scope(host: str) -> bool:\n    return host.strip().lower() in allowed\n\ntests = [\"localhost\", \"Example.com\", \"google.com\"]\nfor host in tests:\n    print(host, \"->\", \"IN SCOPE\" if in_scope(host) else \"OUT OF SCOPE\")\n",
      exercises: {
        beginner: { prompt: "Create an allowlist `{'localhost', '127.0.0.1'}`. Check `'localhost'`. Print result and `len()` of set.", starterCode: "allowed = {'localhost', '127.0.0.1'}\n\n# Check and print result + set size\n", expectedOutput: "True\n2" },
        intermediate: { prompt: "Normalize `'  ExAmPlE.Com  '` with `.strip().lower()`. Print the result and its `len()`.", starterCode: "host = '  ExAmPlE.Com  '\n\n# Normalize, print result and length\n", expectedOutput: "example.com\n11" },
        advanced: { prompt: "Given hosts, check each against allowlist. Print in-scope count and out-of-scope count.", starterCode: "allowed = {'localhost', '127.0.0.1'}\nhosts = ['localhost', 'google.com', '127.0.0.1', 'evil.com']\n\n# Count in-scope and out-of-scope, print both\n", expectedOutput: "2\n2" },
      },
    },
    {
      id: "cs-network", title: "Network Monitoring", description: "DNS, traffic basics, and safe diagnostics",
      content: "## Network Monitoring (Defensive)\n\nThis section focuses on **defensive** network skills: understanding traffic, reading logs, and doing safe diagnostics.\n\n### Key Concepts\n- **Ports** — Services listen on specific ports (80=HTTP, 443=HTTPS)\n- **TCP/UDP** — Transport protocols\n- **IP Addresses** — Network identification\n- **DNS** — Domain name resolution\n\n### Defensive tasks\n- Read firewall logs\n- Detect repeated failed connections\n- Spot suspicious spikes\n- Track top source IPs\n\n### Python tools\n- socket — DNS lookup and safe connectivity checks\n- collections — counting and grouping\n- datetime — timelines",
      codeExample: "# Firewall log parsing (defensive)\nlogs = [\n    \"ALLOW 192.168.1.10 -> 10.0.0.2:443\",\n    \"DENY 10.0.0.5 -> 10.0.0.2:22\",\n    \"DENY 10.0.0.5 -> 10.0.0.2:22\",\n    \"DENY 10.0.0.5 -> 10.0.0.2:22\",\n    \"ALLOW 192.168.1.20 -> 10.0.0.2:80\",\n]\n\ncounts = {}\nfor line in logs:\n    action, src, _, _ = line.split(maxsplit=3)\n    if action == \"DENY\":\n        counts[src] = counts.get(src, 0) + 1\n\nfor src, c in counts.items():\n    if c >= 3:\n        print(f\"ALERT: repeated denies from {src} ({c})\")\n",
      exercises: {
        beginner: { prompt: "Count `'DENY'` entries in `['ALLOW', 'DENY', 'DENY']`. Print the count and `'ALLOW'` count.", starterCode: "logs = ['ALLOW', 'DENY', 'DENY']\n\n# Count DENY and ALLOW, print both\n", expectedOutput: "2\n1" },
        intermediate: { prompt: "Extract port from `'10.0.0.2:443'` by splitting on `':'`. Print the port as int and the IP.", starterCode: "dest = '10.0.0.2:443'\n\n# Split, print port and IP\n", expectedOutput: "443\n10.0.0.2" },
        advanced: { prompt: "Find the most common IP from `['10.0.0.5','10.0.0.5','192.168.1.10']`. Print it and its count.", starterCode: "sources = ['10.0.0.5', '10.0.0.5', '192.168.1.10']\n\n# Count, find max, print IP and count\n", expectedOutput: "10.0.0.5\n2" },
      },
    },
    {
      id: "cs-crypto", title: "Cryptography Essentials", description: "Encryption, hashing, and digital signatures",
      content: "## Cryptography\n\n### Types\n- **Symmetric** — Same key to encrypt & decrypt (AES)\n- **Asymmetric** — Public/private key pair (RSA)\n- **Hashing** — One-way transformation (SHA256)\n\n### Common Algorithms\n- AES — Advanced Encryption Standard\n- RSA — Public key encryption\n- SHA256 — Secure hash\n- bcrypt — Password hashing\n\n### Use Cases\n- Secure communication (HTTPS)\n- Password storage\n- Digital signatures\n- Blockchain",
      codeExample: "# Simple substitution cipher\nimport string\n\ndef caesar_encrypt(text, shift):\n    result = \"\"\n    for char in text:\n        if char.isalpha():\n            base = ord('A') if char.isupper() else ord('a')\n            result += chr((ord(char) - base + shift) % 26 + base)\n        else:\n            result += char\n    return result\n\nencrypted = caesar_encrypt(\"Hello World\", 3)\nprint(\"Encrypted:\", encrypted)\ndecrypted = caesar_encrypt(encrypted, -3)\nprint(\"Decrypted:\", decrypted)",
      exercises: {
        beginner: { prompt: "ROT13 encrypt `'abc'`. Print the result.", starterCode: "text = 'abc'\n\n# ROT13 encrypt, print\n", expectedOutput: "nop" },
        intermediate: { prompt: "XOR encrypt `'Hi'` with `key=7`, then decrypt. Print whether decrypted matches original.", starterCode: "text = 'Hi'\nkey = 7\n\n# Encrypt, decrypt, compare, print True/False\n", expectedOutput: "True" },
        advanced: { prompt: "Generate hash by summing char codes of `'password'` mod 1000. Print the hash. Also print `len('password')`.", starterCode: "text = 'password'\n\n# Calculate hash and length, print both\n", expectedOutput: "879\n8" },
      },
    },
    {
      id: "cs-forensics", title: "Digital Forensics", description: "Investigate and analyze digital evidence",
      content: "## Digital Forensics\n\nInvestigating security incidents and analyzing evidence.\n\n### Key Areas\n- **Log Analysis** — Server and application logs\n- **File Analysis** — Metadata, hidden data\n- **Memory Forensics** — RAM analysis\n- **Network Forensics** — Packet capture analysis\n\n### Python Tools\n- os/pathlib — File system analysis\n- struct — Binary file parsing\n- datetime — Timeline analysis\n- json/csv — Log parsing",
      codeExample: "# Log analysis for security\nlogs = [\n    \"2024-01-15 10:30:00 LOGIN alice 192.168.1.10 SUCCESS\",\n    \"2024-01-15 10:31:00 LOGIN root 10.0.0.5 FAILED\",\n    \"2024-01-15 10:31:05 LOGIN root 10.0.0.5 FAILED\",\n    \"2024-01-15 10:31:10 LOGIN root 10.0.0.5 FAILED\",\n    \"2024-01-15 10:35:00 LOGIN bob 192.168.1.20 SUCCESS\",\n]\n\n# Detect brute force (3+ failures from same IP)\nfailures = {}\nfor log in logs:\n    if \"FAILED\" in log:\n        ip = log.split()[3]\n        failures[ip] = failures.get(ip, 0) + 1\n\nfor ip, count in failures.items():\n    if count >= 3:\n        print(f\"ALERT: Brute force from {ip} ({count} attempts)\")",
      exercises: {
        beginner: { prompt: "Count `'FAILED'` entries in `['SUCCESS', 'FAILED', 'SUCCESS', 'FAILED', 'FAILED']`. Print the count.", starterCode: "logs = ['SUCCESS', 'FAILED', 'SUCCESS', 'FAILED', 'FAILED']\n\n# Count FAILED, print\n", expectedOutput: "3" },
        intermediate: { prompt: "Extract unique IPs from log lines. Print the set and its `len()`.", starterCode: "logs = ['192.168.1.1 GET /', '10.0.0.1 POST /login', '192.168.1.1 GET /about']\n\n# Extract unique IPs, print set and count\n", expectedOutput: "{'192.168.1.1', '10.0.0.1'}\n2" },
        advanced: { prompt: "Find IP with most requests from `['192.168.1.1','10.0.0.1','192.168.1.1','192.168.1.1']`. Print the IP and its count.", starterCode: "logs = ['192.168.1.1', '10.0.0.1', '192.168.1.1', '192.168.1.1']\n\n# Count, find max, print IP and count\n", expectedOutput: "192.168.1.1\n3" },
      },
    },
    {
      id: "cs-pentest", title: "Ethical Security Testing", description: "Authorized testing and professional reporting",
      content: "## Ethical Security Testing (With Permission)\n\nThis is about **authorized** security testing, not hacking random targets.\n\n### Always required\n- Written permission + scope\n- A safe test environment (labs/CTFs/staging)\n- A report that helps developers fix issues\n\n### High-level workflow\n1. **Scope** — what is allowed and not allowed\n2. **Discovery** — identify assets and entry points\n3. **Validation** — confirm issues safely (no data theft)\n4. **Fix guidance** — recommend secure changes\n5. **Reporting** — evidence + impact + remediation\n\n### Common web risk categories (OWASP-style)\n- Injection\n- Broken authentication\n- Security misconfiguration\n- Sensitive data exposure\n- Access control issues",
      codeExample: "# SQL Injection detection concept\ndef is_sql_injection(input_str):\n    suspicious = [\"'\", \"--\", \"OR 1=1\", \"DROP\", \"UNION SELECT\", \";\", \"/*\"]\n    input_upper = input_str.upper()\n    return any(s.upper() in input_upper for s in suspicious)\n\ntests = [\"Alice\", \"' OR 1=1 --\", \"normal_user\", \"'; DROP TABLE users;--\"]\nfor t in tests:\n    result = \"⚠️ INJECTION\" if is_sql_injection(t) else \"✅ Safe\"\n    print(f\"{t[:20]:20s} -> {result}\")",
      exercises: {
        beginner: { prompt: "Check if `\"hello'world\"` contains a single quote. Print `True`/`False` and `len()` of the string.", starterCode: "user_input = \"hello'world\"\n\n# Check for quote, print result and length\n", expectedOutput: "True\n11" },
        intermediate: { prompt: "Strip and lowercase `'  Admin  '`. Print the result and check if it equals `'admin'`.", starterCode: "user_input = '  Admin  '\n\n# Clean, print result and equality check\n", expectedOutput: "admin\nTrue" },
        advanced: { prompt: "Check if `pwd='admin'` is in common list `['password','123456','admin']`. Print `'Weak'`/`'OK'`. Also print `len(common)`.", starterCode: "common = ['password', '123456', 'admin']\npwd = 'admin'\n\n# Check and print result + common list size\n", expectedOutput: "Weak\n3" },
      },
    },
    {
      id: "cs-secure-coding", title: "Secure Coding in Python", description: "Input validation, secrets, and safer defaults",
      content: "## Secure Coding\n\nCybersecurity is not only pen testing. Secure coding prevents issues from existing.\n\n### Safer habits\n- Validate and sanitize user input\n- Never hardcode secrets (use environment variables)\n- Use constant-time comparisons for tokens\n- Keep dependencies updated\n\n### Common web-ish mistakes\n- Using `eval()` on user input\n- Building SQL strings with concatenation\n- Logging secrets\n\nThis lesson focuses on defensive practices you can apply anywhere.",
      codeExample: "import hmac\n\n# Constant-time comparison\nexpected = \"token123\"\nprovided = \"token123\"\nprint(hmac.compare_digest(expected, provided))\n",
      exercises: {
        beginner: { prompt: "Check if `';'` is in `'ok;drop'`. Print `'Reject'`/`'OK'`. Also print the input length.", starterCode: "s = 'ok;drop'\n\n# Check for semicolon, print result and length\n", expectedOutput: "Reject\n7" },
        intermediate: { prompt: "Use `os.environ.get('ENV', 'local')` for a missing var. Print the result and its `type().__name__`.", starterCode: "import os\n\n# Get env var with default, print value and type\n", expectedOutput: "local\nstr" },
        advanced: { prompt: "Safely convert `'42'` to int (no `eval`). Print the int and check `type().__name__` is `'int'`.", starterCode: "s = '42'\n\n# Convert safely, print value and type check\n", expectedOutput: "42\nTrue" },
      },
    },
    {
      id: "cs-detection-basics", title: "Detection Basics: Logs to Alerts", description: "Simple rules and anomaly checks on log data",
      content: "## Detection Basics\n\nMany security roles involve detection engineering.\n\n### What you do\n- Collect logs (auth, app, network)\n- Normalize fields (time, user, ip, action)\n- Write rules (thresholds, patterns)\n- Reduce false positives\n\n### Example ideas\n- 5+ failed logins from one IP in 10 minutes\n- Rare admin actions\n- Sudden spike in 404/500s",
      codeExample: "# Detect repeated failures per IP\nlogs = [\n    \"FAILED 10.0.0.1\",\n    \"FAILED 10.0.0.1\",\n    \"OK 10.0.0.1\",\n    \"FAILED 10.0.0.1\",\n]\n\nfails = {}\nfor line in logs:\n    status, ip = line.split()\n    if status == \"FAILED\":\n        fails[ip] = fails.get(ip, 0) + 1\n\nprint(fails.get(\"10.0.0.1\", 0))\n",
      exercises: {
        beginner: { prompt: "Count `'FAILED'` in `['OK','FAILED','FAILED']`. Print count and total list length.", starterCode: "items = ['OK', 'FAILED', 'FAILED']\n\n# Count FAILED and total, print both\n", expectedOutput: "2\n3" },
        intermediate: { prompt: "Given `counts={'ip': 4}`. If value `>= 3` print `'ALERT'` else `'OK'`. Also print the count.", starterCode: "counts = {'ip': 4}\n\n# Check threshold, print alert and count\n", expectedOutput: "ALERT\n4" },
        advanced: { prompt: "Extract IPs from `['FAILED 1.1.1.1','OK 2.2.2.2']`. Print the IP list and unique count.", starterCode: "logs = ['FAILED 1.1.1.1', 'OK 2.2.2.2']\n\n# Extract IPs, print list and unique count\n", expectedOutput: "['1.1.1.1', '2.2.2.2']\n2" },
      },
    },
  ];
}

function githubMastery(): CareerLesson[] {
  return [
    {
      id: "github-best-practices",
      title: "0. Best Practices & Classic Mistakes",
      description: "Dos, Don'ts, and what to avoid in Git & GitHub",
      category: "Foundations",
      content:
        "## The Golden Rules of Version Control 🐙\n\nBefore making changes to production codebases, you must learn the rules of collaboration.\n\n### DOs (What you should use)\n- **DO** write clear, imperative commit messages (e.g., 'Fix login bug' instead of 'fixed stuff').\n- **DO** commit early and often to keep changes small and logical.\n- **DO** pull the latest changes from the remote branch before starting your work.\n\n### DON'Ts (Classic Mistakes)\n- **DON'T** commit large binary files or sensitive `.env` files (use `.gitignore`).\n- **DON'T** force push (`git push -f`) to a shared branch like `main` or `master`.\n- **DON'T** work directly on the `main` branch. Always create a feature branch.",
      codeExample:
        "# DO: Clear, imperative messages\n# git commit -m \"Add user authentication flow\"\n\n# DON'T: Vague, unhelpful messages\n# git commit -m \"finally works idk\"",
      exercises: {
        beginner: { type: "quiz", prompt: "What file should you use to prevent sensitive files like `.env` from being committed to Git?", options: [".gitconfig", ".gitignore", "README.md"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { prompt: "Print 'Use feature branches'.", starterCode: "echo '___'", expectedOutput: "Use feature branches" },
        advanced: { prompt: "Print 'Never force push to main'.", starterCode: "echo '___'", expectedOutput: "Never force push to main" },
      },
    },
    {
      id: "git-intro", title: "Git: The Starting Line", description: "Introduction to tracking changes and collaboration",
      content: "## Why Version Control?\n\nAs a developer, you need to track changes, undo mistakes, and collaborate with others. Git is the world's most popular tool for this.\n\n### Key Concepts\n- **History** — Going back in time to any version of your project\n- **Branching** — Working on new features without breaking the main app\n- **Staging** — Preparing files for a commit\n- **Collaboration** — Sharing code via GitHub\n\n### Git's Areas\n1. **Working Directory** — Files you are editing now\n2. **Staging Area** — Files marked to be saved in the next snapshot\n3. **Local Repo** — Your local snapshots (commits)",
      codeExample: "$ mkdir my-project\n$ cd my-project\n$ git init\nInitialized empty Git repository in /my-project/.git/",
      translations: {
        tamil: { title: "Git: தொடக்க கட்டம்", description: "மாற்றங்களை கண்காணித்தல் மற்றும் கூட்டுப் பணியின் அறிமுகம்" },
        kannada: { title: "Git: ಪ್ರಾರಂಭ ಹಂತ", description: "ಬದಲಾವಣೆಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡುವುದು ಮತ್ತು ಸಹಕಾರದ ಪರಿಚಯ" },
        telugu: { title: "Git: ప్రారంభ స్థాయి", description: "మార్పులను ట్రాక్ చేయడం మరియు collaboration పరిచయం" },
        hindi: { title: "Git: शुरुआत की रेखा", description: "changes tracking और collaboration का परिचय" },
      },
      exercises: {
        beginner: { prompt: "Initialize a new git repository in the current directory.", starterCode: "", expectedOutput: "git init" },
        intermediate: { prompt: "Check the status of your git repository.", starterCode: "", expectedOutput: "git status" },
        advanced: { prompt: "Create a new file called 'notes.txt' using the touch command.", starterCode: "", expectedOutput: "touch notes.txt" },
      },
    },
    {
      id: "git-staging", title: "Staging: The Waiting Room", description: "Learn to prepare files for commit",
      content: "## The Staging Area\n\nIn Git, you don't save every change immediately. You move them to a **Staging Area** first.\n\n### Commands\n- `git status`: See what is changed and staged\n- `git add <file>`: Stage a specific file\n- `git add .`: Stage ALL changes in the directory\n\nThink of staging as picking products for a shipping box before you seal it (commit it).",
      codeExample: "$ touch app.py\n$ git status\nUntracked files:\n  app.py\n\n$ git add app.py\n$ git status\nChanges to be committed:\n  new file:   app.py",
      exercises: {
        beginner: { prompt: "Stage all files in the current directory.", starterCode: "", expectedOutput: "git add ." },
        intermediate: { prompt: "Stage a specific file named 'main.py'.", starterCode: "", expectedOutput: "git add main.py" },
        advanced: { prompt: "Remove 'main.py' from the staging area (unstage it).", starterCode: "", expectedOutput: "git restore --staged main.py" },
      },
    },
    {
      id: "git-commits", title: "Committing: Taking Snapshots", description: "Save your progress permanently",
      content: "## The Commit\n\nA commit is a permanent snapshot of your staged changes. It includes a message and a unique ID (hash).\n\n### Rules for Messages\n1. **Be Concise** — Keep it under 50 chars if possible\n2. **Imperative Mood** — Use 'Add login' NOT 'Added login'\n3. **Context** — Mention what changed and why\n\n### Command\n`git commit -m \"Your message here\"`",
      codeExample: "$ git commit -m \"Initial commit\"\n[main (root-commit) 1a2b3c4] Initial commit\n 1 file changed, 0 insertions(+), 0 deletions(-)\n create mode 100644 app.py",
      exercises: {
        beginner: { prompt: "Commit your staged changes with the message 'Initial commit'.", starterCode: "", expectedOutput: "git commit -m \"Initial commit\"" },
        intermediate: { prompt: "Commit changes with the message 'Add login feature'.", starterCode: "", expectedOutput: "git commit -m \"Add login feature\"" },
        advanced: { prompt: "View the commit history.", starterCode: "", expectedOutput: "git log" },
      },
    },
    {
      id: "github-remotes", title: "Connecting to GitHub", description: "The Cloud: Remotes and SSH",
      content: "## GitHub & Remotes\n\nGitHub is a host for your Git repositories. To connect your local computer to GitHub, you use **Remotes**.\n\n### Connection Types\n- **HTTPS**: Uses a Personal Access Token (PAT). Good for beginners.\n- **SSH**: Uses digital keys for passwordless security. Recommended for Pros.\n\n### Commands\n- `git remote add origin <url>`: Connect local repo to remote URL\n- `git remote -v`: Verify the connection",
      codeExample: "$ git remote add origin https://github.com/user/repo.git\n$ git remote -v\norigin  https://github.com/user/repo.git (fetch)\norigin  https://github.com/user/repo.git (push)",
      exercises: {
        beginner: { prompt: "Verify your remote URLs.", starterCode: "", expectedOutput: "git remote -v" },
        intermediate: { prompt: "Add a remote named 'origin' with URL 'https://github.com/user/repo.git'.", starterCode: "", expectedOutput: "git remote add origin https://github.com/user/repo.git" },
        advanced: { prompt: "Remove a remote named 'origin'.", starterCode: "", expectedOutput: "git remote remove origin" },
      },
    },
    {
      id: "git-push-pull", title: "Push & Pull: Syncing", description: "Sharing and receiving code",
      content: "## Syncing Changes\n\n- `git push origin main`: Send your local commits to GitHub\n- `git pull origin main`: Get latest changes from teammates onto your machine\n- `git clone <url>`: Copy an entire repository from GitHub for the first time\n\n### Conflict Warning\nIf someone else pushed changes to the same lines you edited, `git pull` will ask you to resolve a **Merge Conflict**.",
      codeExample: "$ git push origin main\nCounting objects: 3, done.\nWriting objects: 100% (3/3), done.\nTo https://github.com/user/repo.git\n * [new branch]      main -> main",
      exercises: {
        beginner: { prompt: "Push your local 'main' branch commits to the 'origin' remote.", starterCode: "", expectedOutput: "git push origin main" },
        intermediate: { prompt: "Pull the latest commits from the 'main' branch on 'origin'.", starterCode: "", expectedOutput: "git pull origin main" },
        advanced: { prompt: "Clone a repository from 'https://github.com/user/repo.git'.", starterCode: "", expectedOutput: "git clone https://github.com/user/repo.git" },
      },
    },
    {
      id: "git-branches", title: "Branches: Parallel Worlds", description: "Developing features in isolation",
      content: "## Why Branches?\n\nBranches let you work on a New Feature or Bug Fix without breaking the Main code. This is called **Isolation**.\n\n### Commands\n- `git checkout -b <name>`: Create and switch to a new branch\n- `git branch`: List all branches\n- `git merge <name>`: Combine branch back into main\n- `git checkout <name>`: Switch between existing branches",
      codeExample: "$ git checkout -b feature-login\nSwitched to a new branch 'feature-login'\n\n$ git branch\n* feature-login\n  main",
      exercises: {
        beginner: { prompt: "Create and switch to a new branch called 'dev'.", starterCode: "", expectedOutput: "git checkout -b dev" },
        intermediate: { prompt: "List all local branches.", starterCode: "", expectedOutput: "git branch" },
        advanced: { prompt: "Switch back to the 'main' branch.", starterCode: "", expectedOutput: "git checkout main" },
      },
    },
    {
      id: "github-prs", title: "Pull Requests & Reviews", description: "How teams collaborate on GitHub",
      content: "## The Pull Request (PR)\n\nA Pull Request is how you tell your team: \"I've finished a feature, please review it and merge it into the main project.\"\n\n### PR Lifecycle\n1. **Open PR**: Describe your changes\n2. **Review**: Teammates comment on your code\n3. **Approve**: Senior devs approve the logic\n4. **Merge**: code joins the project",
      codeExample: "# Pull Requests are usually managed in the GitHub web interface\n# But you can push a branch to start the process:\n$ git push origin feature-login\n# Then open GitHub to create the PR",
      exercises: {
        beginner: { prompt: "Push a branch named 'feature-auth' to 'origin'.", starterCode: "", expectedOutput: "git push origin feature-auth" },
        intermediate: { prompt: "Merge 'feature-auth' branch into your current branch.", starterCode: "", expectedOutput: "git merge feature-auth" },
        advanced: { prompt: "Delete the local branch named 'feature-auth'.", starterCode: "", expectedOutput: "git branch -d feature-auth" },
      },
    },
    {
      id: "github-forking", title: "Forking: Open Source Mastery", description: "Contributing to any project in the world",
      content: "## Forking vs Branching\n\n- **Branch**: Internal development within one repo.\n- **Fork**: A copy of someone else's repo in YOUR GitHub account. You use this to contribute to Open Source.\n\n### Workflow\n1. **Fork** the Repo\n2. **Clone** your fork\n3. **Branch** & Update\n4. Push to your fork\n5. Open a **PR** to the original owner",
      codeExample: "$ git clone https://github.com/my-username/forked-repo.git\n$ cd forked-repo\n$ git remote add upstream https://github.com/original-owner/repo.git\n$ git fetch upstream",
      exercises: {
        beginner: { prompt: "Clone your fork: 'https://github.com/you/repo.git'", starterCode: "", expectedOutput: "git clone https://github.com/you/repo.git" },
        intermediate: { prompt: "Add an 'upstream' remote pointing to 'https://github.com/owner/repo.git'", starterCode: "", expectedOutput: "git remote add upstream https://github.com/owner/repo.git" },
        advanced: { prompt: "Fetch all changes from the 'upstream' remote.", starterCode: "", expectedOutput: "git fetch upstream" },
      },
    },
    {
      id: "git-conflicts", title: "Resolving Conflicts", description: "Handling overlapping changes (Simulated)",
      content: "## What is a Conflict?\n\nA conflict happens when Git can't automatically merge two branches because they both changed the SAME line of the SAME file.\n\n### How to Fix\n1. Open the file\n2. Find the markers: `<<<<<<< HEAD` and `>>>>>>>`\n3. Choose which code to keep\n4. Remove markers, `git add`, and `git commit`",
      codeExample: "$ git merge featurex\nAuto-merging index.html\nCONFLICT (content): Merge conflict in index.html\nAutomatic merge failed; fix conflicts and then commit the result.",
      exercises: {
        beginner: { prompt: "View the current conflict status.", starterCode: "", expectedOutput: "git status" },
        intermediate: { prompt: "After fixing a conflict in 'index.html', stage the resolved file.", starterCode: "", expectedOutput: "git add index.html" },
        advanced: { prompt: "Finalize the merge by committing the resolved changes.", starterCode: "", expectedOutput: "git commit -m \"Fix merge conflict\"" },
      },
    },
    {
      id: "github-actions", title: "GitHub Actions: CI/CD Basics", description: "Automating your development with Workflows",
      content: "## Automation with Actions\n\nGitHub Actions lets you run code every time you push to GitHub. This is used for **Automated Testing** and **Deployment**.\n\n### Key Terms\n- **Workflow**: The automation file (.yaml)\n- **Event**: What triggers the run (e.g., Push, PR)\n- **Job**: A set of steps (e.g., Run Tests, Deploy)\n- **Runner**: The cloud computer running your actions",
      codeExample: "$ mkdir -p .github/workflows\n$ touch .github/workflows/main.yml\n$ git add .github/workflows/main.yml\n$ git commit -m \"Create CI/CD workflow\"",
      exercises: {
        beginner: { prompt: "Create the workflows directory: 'mkdir -p .github/workflows'", starterCode: "", expectedOutput: "mkdir -p .github/workflows" },
        intermediate: { prompt: "Create a new workflow file: 'touch .github/workflows/test.yml'", starterCode: "", expectedOutput: "touch .github/workflows/test.yml" },
        advanced: { prompt: "Stage the new workflows directory.", starterCode: "", expectedOutput: "git add .github/workflows" },
      },
    },
    {
      id: "github-pages", title: "GitHub Pages & Portfolios", description: "Hosting your portfolio with one click",
      content: "## GitHub Pages\n\nGitHub Pages is a hosting service that turns your repository into a live website—for free!\n\n### How to enable\n1. Go to **Settings** > **Pages**\n2. Select your `main` branch\n3. Click Save\n\nYour site will be live at `https://username.github.io/repo-name`",
      codeExample: "# GitHub Pages primarily requires pushing a specific branch or repo\n$ git checkout -b gh-pages\n$ git push origin gh-pages",
      exercises: {
        beginner: { prompt: "Create and switch to a branch named 'gh-pages'.", starterCode: "", expectedOutput: "git checkout -b gh-pages" },
        intermediate: { prompt: "Push the 'gh-pages' branch to 'origin'.", starterCode: "", expectedOutput: "git push origin gh-pages" },
        advanced: { prompt: "List branches to visually confirm you are on 'gh-pages'.", starterCode: "", expectedOutput: "git branch" },
      },
    },
    {
      id: "github-master-pro", title: "Master Profile & Portfolio", description: "Building the ultimate dev presence",
      content: "## The Master Profile\n\nGitHub is your **Developer Resume**. \n\n### Essential Checklist\n- **Profile README**: Use a special repo named after your username to show a bio.\n- **Green Grass**: Keep a consistent commit streak.\n- **Pinned Repos**: Show your best work.\n- **Organizations**: Join teams to show professional experience.\n\nCongratulations! You have mastered the GitHub journey from Start to Finish.",
      codeExample: "$ mkdir my-username\n$ cd my-username\n$ echo \"# Hi, I'm a Developer!\" > README.md\n$ git init\n$ git add README.md\n$ git commit -m \"Add profile bio\"",
      exercises: {
        beginner: { prompt: "Create a user profile repo directory (e.g. 'mkdir username')", starterCode: "", expectedOutput: "mkdir username" },
        intermediate: { prompt: "Print a bio string to the terminal: 'echo \"I am a dev\"'", starterCode: "", expectedOutput: "echo \"I am a dev\"" },
        advanced: { prompt: "View your terminal command history.", starterCode: "", expectedOutput: "history" },
      },
    },
  ];
}



function sqlLessons(): CareerLesson[] {
  return [
    // ═══════════════════════════════════════════════════════
    // PHASE 1: SQL FOUNDATIONS (Modules 1–5)
    // Master the basics of retrieving and manipulating data
    // ═══════════════════════════════════════════════════════
    {
      id: "sql-best-practices",
      title: "0. Best Practices & Classic Mistakes",
      description: "Dos, Don'ts, and what to avoid in SQL",
      category: "Phase 1 — Foundations",
      content:
        "## The Rules of the Database 📜\n\nBefore writing your first query, internalize these golden rules. Violating them can corrupt data, crash production, or grind servers to a halt.\n\n### DOs ✅\n- **DO** always name columns explicitly — `SELECT id, name` not `SELECT *`. `SELECT *` breaks silently when columns are added or reordered.\n- **DO** use `JOIN` with an `ON` clause instead of comma-separated tables in `FROM`. Old-style `FROM a, b WHERE a.id = b.id` is ambiguous and error-prone.\n- **DO** filter data early with `WHERE` before aggregating or joining — it dramatically reduces the amount of data the engine needs to process.\n- **DO** always end SQL statements with a semicolon `;` — especially when running multiple statements at once.\n- **DO** add `ORDER BY` when the order of your output matters (e.g., for exercises or reports). Without it, the database can return rows in any order.\n\n### DON'Ts ❌\n- **DON'T** run `UPDATE` or `DELETE` without a `WHERE` clause — you will modify or erase every row in the table. Always double-check.\n- **DON'T** use `ORDER BY` in subqueries or CTEs — it's meaningless there and may be ignored by the optimizer.\n- **DON'T** assume `NULL = NULL` is true. Always use `IS NULL` or `IS NOT NULL`.\n- **DON'T** store computed values (like age) — store source data (like birthdate) and compute at query time.\n\n### SQL Injection Warning 🛡️\nNever build SQL by concatenating user input strings (e.g., `'SELECT * FROM users WHERE name = ' + input`). Always use parameterized queries in application code.",
      codeExample:
        "-- ✅ DO: Explicit columns, early filter\nSELECT id, name, city\nFROM customers\nWHERE city = 'Delhi'\nORDER BY name;\n\n-- ❌ DON'T: Brittle and slow\n-- SELECT * FROM customers;\n\n-- ❌ DANGER: DELETE without WHERE wipes all rows!\n-- DELETE FROM orders;  -- Never do this!\n\n-- ✅ SAFE: Always use WHERE on mutations\n-- DELETE FROM orders WHERE status = 'cancelled';",
      translations: {
        tamil: { title: "0. சிறந்த நடைமுறைகள்", description: "SQL-ல் செய்ய வேண்டியவை மற்றும் தவிர்க்க வேண்டியவை", category: "Foundations" },
        kannada: { title: "0. ಉತ್ತಮ ಅಭ್ಯಾಸಗಳು", description: "SQL ನಲ್ಲಿ ಮಾಡಬೇಕಾದದ್ದು ಮತ್ತು ಮಾಡಬಾರದದ್ದು", category: "Foundations" },
        telugu: { title: "0. ఉత్తమ పద్ధతులు", description: "SQL లో ఏమి చేయాలి మరియు ఏమి చేయకూడదు", category: "Foundations" },
        hindi: { title: "0. सर्वोत्तम प्रथाएँ", description: "SQL में क्या करें और क्या न करें", category: "Foundations" },
      },
      exercises: {
        beginner: {
          prompt: "Write a safe query. Select ONLY the `name` column from the `products` table, sorted alphabetically and limited to 3 rows.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "name\nAlgorithmic Socks\nCushion Cover\nData Science Cap",
          solution: "SELECT name FROM products ORDER BY name LIMIT 3;",
        },
        intermediate: {
          prompt: "The query `SELECT * FROM orders` is considered bad practice. Rewrite it to select only `id` and `status`, limiting to 2 rows.",
          starterCode: "SELECT * FROM orders;",
          expectedOutput: "id,status\n1,completed\n2,completed",
          solution: "SELECT id, status FROM orders LIMIT 2;",
        },
        advanced: {
          prompt: "Demonstrate filtering EARLY. Select `name` and `price` from `products` where price is greater than 1000, ordered by price DESC, limit 2.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "name,price\nDell 24-inch Monitor,12000\nSony Headphones,4500",
          solution: "SELECT name, price FROM products WHERE price > 1000 ORDER BY price DESC LIMIT 2;",
        },
      },
    },
    {
      id: "sql-intro",
      title: "1. SQL Foundations (DQL)",
      description: "SELECT, FROM, ORDER BY, LIMIT — your first queries",
      category: "Phase 1 — Foundations",
      content:
        "## SQL Foundations (DQL) 🏗️\n\nSQL (Structured Query Language) is the universal language for communicating with relational databases. Every major database — PostgreSQL, MySQL, SQLite, SQL Server — uses SQL.\n\n### The Anatomy of a SELECT Query\n```sql\nSELECT column1, column2  -- What to show\nFROM table_name           -- Where to look\nWHERE condition           -- Which rows to include\nORDER BY column ASC|DESC  -- How to sort\nLIMIT n;                  -- How many rows\n```\n\n### How the Database Actually Executes a Query\nEven though you write `SELECT` first, SQL is processed in this order:\n1. `FROM` — identify the table\n2. `WHERE` — filter rows\n3. `SELECT` — compute output columns\n4. `ORDER BY` — sort the result\n5. `LIMIT` — cut to the top N rows\n\nThis is why you **cannot reference a SELECT alias in a WHERE clause** — WHERE runs before SELECT!\n\n### Handling Ties in ORDER BY\nIf two rows share the same sort value (e.g., same price), the order between them is undefined. Always add a secondary column to guarantee a deterministic output:\n`ORDER BY price DESC, name ASC`\n\n### Practice Database (ShopDB)\nYou have a built-in e-commerce dataset with: `customers`, `products`, `orders`, `order_items`.",
      codeExample:
        "-- The execution order: FROM → WHERE → SELECT → ORDER BY → LIMIT\nSELECT id, name, city\nFROM customers\nWHERE city != 'Mumbai'     -- Filter first\nORDER BY city ASC, name ASC  -- Sort by city, then name for ties\nLIMIT 5;                     -- Then take top 5",
      translations: {
        tamil: { title: "1. SQL அடித்தளம் (DQL)", description: "SELECT, FROM, ORDER BY, LIMIT — உங்கள் முதல் queries", category: "DQL (SELECT)" },
        kannada: { title: "1. SQL Foundations (DQL)", description: "SELECT, FROM, ORDER BY, LIMIT — ನಿಮ್ಮ ಮೊದಲ queries", category: "DQL (SELECT)" },
        telugu: { title: "1. SQL Foundations (DQL)", description: "SELECT, FROM, ORDER BY, LIMIT — మీ మొదటి queries", category: "DQL (SELECT)" },
        hindi: { title: "1. SQL Foundations (DQL)", description: "SELECT, FROM, ORDER BY, LIMIT — आपकी पहली queries", category: "DQL (SELECT)" },
      },
      exercises: {
        beginner: {
          prompt: "Select the first 5 customers (id, name) ordered by id (use LIMIT).",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "id,name\n1,Alice Johnson\n2,Bob Sharma\n3,Charlie Dave\n4,Diana Prince\n5,Ethan Hunt",
          solution: "SELECT id, name FROM customers ORDER BY id LIMIT 5;",
        },
        intermediate: {
          prompt: "List Electronics products (name, price) ordered by price DESC.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "name,price\nDell 24-inch Monitor,12000\nSony Headphones,4500\nMechanical Keyboard,2500\nLogitech Mouse,800",
          solution: "SELECT name, price FROM products WHERE category = 'Electronics' ORDER BY price DESC;",
        },
        advanced: {
          prompt: "Show the top 3 most expensive products (name, price).",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "name,price\nDell 24-inch Monitor,12000\nSony Headphones,4500\nMechanical Keyboard,2500",
          solution: "SELECT name, price FROM products ORDER BY price DESC LIMIT 3;",
        },
      },
    },
    {
      id: "sql-filtering",
      title: "2. Filtering & Sorting",
      description: "WHERE, AND/OR, LIKE, BETWEEN, IN, ORDER BY",
      category: "Phase 1 — Foundations",
      content:
        "## Filtering & Sorting 🔍\n\n### Core Filtering Clauses\n- `WHERE`: Filters rows before aggregation (e.g., `WHERE price > 500`)\n- `AND` / `OR`: Combine conditions. `AND` has higher precedence than `OR`, so use parentheses: `WHERE (city = 'Delhi' OR city = 'Mumbai') AND status = 'active'`\n- `IN (...)`: Cleaner membership check — `WHERE city IN ('Delhi', 'Mumbai')` is equivalent to `city = 'Delhi' OR city = 'Mumbai'`\n- `NOT IN (...)`: Excludes a set — but **beware**: if the list contains a `NULL`, the result is always empty!\n- `BETWEEN a AND b`: Inclusive range check (e.g., `WHERE price BETWEEN 300 AND 1000`)\n- `LIKE`: Pattern matching — `%` matches any sequence of characters, `_` matches exactly one character.\n  - `'A%'` → starts with A\n  - `'%son'` → ends with 'son'\n  - `'_ell%'` → second char is 'e', third is 'l'\n\n### NULL — The Tricky Third State\nNULL means \"unknown\", not \"empty\". This has surprising consequences:\n- `NULL = NULL` → **false** (unknown = unknown is still unknown!)\n- `NULL != NULL` → **false**\n- **Always use** `IS NULL` or `IS NOT NULL` to check for NULL values.\n\n### Sorting: Deterministic Output\nAlways add a secondary sort column when the primary column can have ties:\n`ORDER BY price ASC, name ASC` — guarantees the same output every time.",
      codeExample:
        "-- Multi-condition filtering with IN and LIKE\nSELECT name, city, signup_date\nFROM customers\nWHERE city IN ('Delhi', 'Mumbai')\n  AND name LIKE 'A%'\nORDER BY city, name;\n\n-- Check for NULLs correctly\n-- SELECT name FROM customers WHERE phone IS NULL;",
      translations: {
        tamil: {
          title: "2. Filtering & Sorting",
          description: "WHERE, AND/OR, LIKE, BETWEEN, IN, ORDER BY",
          category: "Filtering & Sorting",
          content:
            "## Filtering & Sorting\n\n### முக்கிய clauses\n- `WHERE` rows-ஐ filter செய்கிறது\n- `AND` / `OR` conditions-ஐ இணைக்கிறது\n- `IN` membership சரிபார்க்கிறது\n- `BETWEEN` range சரிபார்க்கிறது\n- `LIKE` pattern matching (`%` wildcard)\n\n### Sorting Ties (ஒரே மதிப்புள்ள தரவுகள்)\nபல வரிசைகள் ஒரே மதிப்பைக் கொண்டிருந்தால் (உதாரணமாக விலை), வரிசையை சீராக வைக்க இரண்டாவது வரிசைப்படுத்தும் தூணைப் பயன்படுத்தவும்:\n`ORDER BY price, name` (முதலில் விலை, பிறகு பெயரின் அடிப்படையில்).\n\nTip: output order முக்கியமானால் எப்போதும் `ORDER BY` சேர்க்கவும் (exercises-க்கு இது மிக முக்கியம்).",
        },
        kannada: {
          title: "2. Filtering & Sorting",
          description: "WHERE, AND/OR, LIKE, BETWEEN, IN, ORDER BY",
          category: "Filtering & Sorting",
          content:
            "## Filtering & Sorting\n\n### ಮುಖ್ಯ clauses\n- `WHERE` rows ಅನ್ನು filter ಮಾಡುತ್ತದೆ\n- `AND` / `OR` conditions ಅನ್ನು ಸೇರಿಸುತ್ತದೆ\n- `IN` membership ಪರಿಶೀಲಿಸುತ್ತದೆ\n- `BETWEEN` range ಪರಿಶೀಲಿಸುತ್ತದೆ\n- `LIKE` pattern matching (`%` wildcard)\n\n### Sorting Ties (ಸಮಾನ ಮೌಲ್ಯಗಳು)\nಒಂದಕ್ಕಿಂತ ಹೆಚ್ಚು ಸಾಲುಗಳು ಒಂದೇ ಮೌಲ್ಯವನ್ನು ಹೊಂದಿದ್ದರೆ (ಉದಾಹರಣೆಗೆ ಬೆಲೆ), ಕ್ರಮವನ್ನು ಸ್ಥಿರವಾಗಿಡಲು ಎರಡನೇ ಕಾಲಮ್ ಬಳಸಿ:\n`ORDER BY price, name` (ಮೊದಲು ಬೆಲೆ, ನಂತರ ಹೆಸರು).\n\nTip: output order ಮುಖ್ಯವಾದರೆ ಯಾವಾಗಲೂ `ORDER BY` ಸೇರಿಸಿ (exercises ಗೆ ವಿಶೇಷವಾಗಿ).",
        },
        telugu: {
          title: "2. Filtering & Sorting",
          description: "WHERE, AND/OR, LIKE, BETWEEN, IN, ORDER BY",
          category: "Filtering & Sorting",
          content:
            "## Filtering & Sorting\n\n### ముఖ్య clauses\n- `WHERE` rows ని filter చేస్తుంది\n- `AND` / `OR` conditions ని కలుపుతుంది\n- `IN` membership చెక్ చేస్తుంది\n- `BETWEEN` range చెక్ చేస్తుంది\n- `LIKE` pattern matching (`%` wildcard)\n\n### Sorting Ties (ఒకే విలువలు ఉన్నప్పుడు)\nఒకటి కంటే ఎక్కువ వరుసలు ఒకే విలువను కలిగి ఉంటే (ఉదాహరణకు ధర), క్రమాన్ని స్థిరంగా ఉంచడానికి రెండవ కాలమ్ ఉపయోగించండి:\n`ORDER BY price, name` (ముందు ధర, తర్వాత పేరు).\n\nTip: output order ముఖ్యమైతే ఎప్పుడూ `ORDER BY` వాడండి (exercises కి చాలా ముఖ్యం).",
        },
        hindi: {
          title: "2. Filtering & Sorting",
          description: "WHERE, AND/OR, LIKE, BETWEEN, IN, ORDER BY",
          category: "Filtering & Sorting",
          content:
            "## Filtering & Sorting\n\n### मुख्य clauses\n- `WHERE` rows को filter करता है\n- `AND` / `OR` conditions को जोड़ता है\n- `IN` membership check करता है\n- `BETWEEN` range check करता है\n- `LIKE` pattern matching (`%` wildcard)\n\n### Sorting Ties (समान मान होने पर)\nयदि एक से अधिक rows का मान समान है (जैसे मूल्य), तो क्रम को स्थिर रखने के लिए दूसरे कॉलम का उपयोग करें:\n`ORDER BY price, name` (पहले मूल्य, फिर नाम).\n\nTip: output order ज़रूरी हो तो हमेशा `ORDER BY` लगाएँ (खासकर exercises में).",
        },
      },
      exercises: {
        beginner: {
          prompt: "List customers from Mumbai (name, city) ordered by name.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "name,city\nAlice Johnson,Mumbai\nDiana Prince,Mumbai\nJulia Roberts,Mumbai",
          solution: "SELECT name, city FROM customers WHERE city = 'Mumbai' ORDER BY name;",
        },
        intermediate: {
          prompt: "Show March 2026 orders (id, order_date, status) ordered by order_date.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "id,order_date,status\n4,2026-03-12,completed\n5,2026-03-15,completed\n6,2026-03-18,processing\n7,2026-03-20,completed\n8,2026-03-25,shipped\n9,2026-03-28,completed",
          solution: "SELECT id, order_date, status FROM orders WHERE order_date LIKE '2026-03-%' ORDER BY order_date;",
        },
        advanced: {
          prompt: "List products priced between 100 and 2000 (name, price) ordered by price and then name.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "name,price\nOrganic Tea,250\nCushion Cover,300\nNescafe Coffee,350\nAlgorithmic Socks,400\nResistance Band,400\nSteelo Water Bottle,450\nParker Pen,500\nData Science Cap,600\nLogitech Mouse,800\nPython Book,800\nYoga Mat,900\nTable Lamp,1100\nMoleskine Diary,1200\nSQL Masterclass,1200\nDumbbell 5kg,1500",
          solution: "SELECT name, price FROM products WHERE price BETWEEN 100 AND 2000 ORDER BY price, name;",
        },
      },
    },
    {
      id: "sql-scalar-functions",
      title: "3. Scalar Functions",
      description: "UPPER, SUBSTR, ROUND, DATE functions — transform your data",
      category: "Phase 2 — Core Skills",
      content:
        "## Scalar Functions 🔧\n\nScalar functions operate on a **single value** and return **one output per row**. They're your Swiss Army knife for transforming and cleaning data.\n\n### String Functions\n| Function | What it Does | Example |\n|---|---|---|\n| `UPPER(x)` | Uppercase | `UPPER('hello')` → `'HELLO'` |\n| `LOWER(x)` | Lowercase | `LOWER('HELLO')` → `'hello'` |\n| `LENGTH(x)` | Character count | `LENGTH('abc')` → `3` |\n| `TRIM(x)` | Remove leading/trailing spaces | `TRIM('  hi ')` → `'hi'` |\n| `REPLACE(x, old, new)` | Substitution | `REPLACE('a-b', '-', '')` → `'ab'` |\n| `SUBSTR(x, start, len)` | Extract substring (1-indexed) | `SUBSTR('hello', 2, 3)` → `'ell'` |\n| `x \\|\\| y` | String concatenation | `'Hi' \\|\\| ' ' \\|\\| 'Bob'` → `'Hi Bob'` |\n\n### Numeric Functions\n- `ROUND(x, n)`: Round to `n` decimal places. `ROUND(3.14159, 2)` → `3.14`\n- `ABS(x)`: Absolute value. `ABS(-5)` → `5`\n- `MAX(a, b)` / `MIN(a, b)`: Works per-row in SQLite (not to be confused with aggregate MAX/MIN).\n\n### Date Functions (SQLite)\n- `date('now')` → today's date as `'YYYY-MM-DD'`\n- `strftime('%Y-%m', order_date)` → extracts year-month like `'2026-03'`\n- `strftime('%Y', 'now') - strftime('%Y', birthdate)` → approximate age in years\n\n### LEFT / RIGHT Emulation\nSQLite doesn't have `LEFT()` or `RIGHT()`. Use `SUBSTR` instead:\n- `LEFT(x, 3)` → `SUBSTR(x, 1, 3)` (first 3 chars)\n- `RIGHT(x, 3)` → `SUBSTR(x, -3)` (last 3 chars)",
      codeExample:
        "-- String transformations: build a formatted label and extract the month\nSELECT\n  UPPER(name) || ' (' || city || ')' AS customer_label,\n  SUBSTR(signup_date, 1, 7) AS signup_month,\n  LENGTH(REPLACE(phone, '-', '')) AS digits_in_phone\nFROM customers\nORDER BY customer_label\nLIMIT 5;",
      translations: {
        tamil: {
          title: "3. Scalar Functions",
          description: "UPPER, SUBSTR, ROUND, DATE functions — தரவை மாற்றியமைக்க",
          category: "Functions",
          content:
            "## Scalar Functions\n\nScalar functions ஒவ்வொரு row-க்கும் ஒரு input பெற்று ஒரு output-ஐ தரும்.\n\n### முக்கிய functions\n- **String**: `UPPER(x)`, `LOWER(x)`, `LENGTH(x)` (நீளம்), `REPLACE(x, old, new)` (மாற்ற), `TRIM(x)` (தேவையற்ற இடைவெளியை நீக்க), மற்றும் `SUBSTR(x, start, len)`.\n- **Concatenation**: strings-ஐ இணைக்க `||` பயன்படுத்தவும்.\n- **Numeric**: `ROUND(x, precision)`, `ABS(x)`.\n- **Date**: `strftime('%Y-%m', date_col)`.\n\n### Left & Right (மாற்று வழி)\nSQLite-ல் `LEFT()` அல்லது `RIGHT()` கிடையாது. அதற்கு பதிலாக `SUBSTR` பயன்படுத்தவும்:\n- **LEFT(x, 3)** → `SUBSTR(x, 1, 3)`\n- **RIGHT(x, 3)** → `SUBSTR(x, -3)`",
        },
        kannada: {
          title: "3. Scalar Functions",
          description: "UPPER, SUBSTR, ROUND, DATE functions — ಡೇಟಾವನ್ನು ಬದಲಾಯಿಸಲು",
          category: "Functions",
          content:
            "## Scalar Functions\n\nScalar functions ಪ್ರತಿ ಸಾಲಿಗೆ ಒಂದು ಇನ್‌ಪುಟ್ ತೆಗೆದುಕೊಂಡು ಒಂದು ಔಟ್‌ಪುಟ್ ನೀಡುತ್ತದೆ.\n\n### ಮುಖ್ಯ functions\n- **String**: `UPPER(x)`, `LOWER(x)`, `LENGTH(x)` (ಉದ್ದ), `REPLACE(x, old, new)` (ಬದಲಾಯಿಸಲು), `TRIM(x)`, ಮತ್ತು `SUBSTR(x, start, len)`.\n- **Concatenation**: strings ಸೇರಿಸಲು `||` ಬಳಸಿ.\n- **Numeric**: `ROUND(x, precision)`, `ABS(x)`.\n- **Date**: `strftime('%Y-%m', date_col)`.\n\n### Left & Right\nSQLite ನಲ್ಲಿ `LEFT()` ಅಥವಾ `RIGHT()` ಇಲ್ಲ. ಅದರ ಬದಲು `SUBSTR` ಬಳಸಿ:\n- **LEFT(x, 3)** → `SUBSTR(x, 1, 3)`\n- **RIGHT(x, 3)** → `SUBSTR(x, -3)`",
        },
        telugu: {
          title: "3. Scalar Functions",
          description: "UPPER, SUBSTR, ROUND, DATE functions — డేటాను మార్చడానికి",
          category: "Functions",
          content:
            "## Scalar Functions\n\nScalar functions ప్రతి వరుసకు ఒక ఇన్‌పుట్ తీసుకొని ఒక అవుట్‌పుట్ ఇస్తాయి.\n\n### ముఖ్యమైన functions\n- **String**: `UPPER(x)`, `LOWER(x)`, `LENGTH(x)` (పొడవు), `REPLACE(x, old, new)` (మార్చడానికి), `TRIM(x)`, మరియు `SUBSTR(x, start, len)`.\n- **Concatenation**: strings ని కలపడానికి `||` వాడండి.\n- **Numeric**: `ROUND(x, precision)`, `ABS(x)`.\n- **Date**: `strftime('%Y-%m', date_col)`.\n\n### Left & Right\nSQLite లో `LEFT()` లేదా `RIGHT()` లేవు. వాటి బదులు `SUBSTR` వాడండి:\n- **LEFT(x, 3)** → `SUBSTR(x, 1, 3)`\n- **RIGHT(x, 3)** → `SUBSTR(x, -3)`",
        },
        hindi: {
          title: "3. Scalar Functions",
          description: "UPPER, SUBSTR, ROUND, DATE functions — डेटा को ट्रांसफॉर्म करें",
          category: "Functions",
          content:
            "## Scalar Functions\n\nScalar functions हर row के लिए एक इनपुट लेते हैं और एक आउटपुट देते हैं।\n\n### मुख्य functions\n- **String**: `UPPER(x)`, `LOWER(x)`, `LENGTH(x)` (लम्बाई), `REPLACE(x, old, new)` (बदलने के लिए), `TRIM(x)`, और `SUBSTR(x, start, len)`.\n- **Concatenation**: strings को जोड़ने के लिए `||` का उपयोग करें।\n- **Numeric**: `ROUND(x, precision)`, `ABS(x)`.\n- **Date**: `strftime('%Y-%m', date_col)`.\n\n### Left & Right\nSQLite में `LEFT()` या `RIGHT()` नहीं होते हैं। इसके बजाय `SUBSTR` का उपयोग करें:\n- **LEFT(x, 3)** → `SUBSTR(x, 1, 3)`\n- **RIGHT(x, 3)** → `SUBSTR(x, -3)`",
        },
      },
      exercises: {
        beginner: {
          prompt: "Format customer names as 'NAME from CITY' in uppercase (name the column 'label'), ordered by label, limit 5.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "label\nALICE JOHNSON FROM MUMBAI\nBOB SHARMA FROM DELHI\nCHARLIE DAVE FROM BENGALURU\nDIANA PRINCE FROM MUMBAI\nETHAN HUNT FROM PUNE",
          solution: "SELECT UPPER(name) || ' FROM ' || UPPER(city) AS label FROM customers ORDER BY label LIMIT 5;",
        },
        intermediate: {
          prompt: "Clean phone numbers by removing '+91-' prefix (use REPLACE) and show their character length. Output (clean_phone, phone_len) for first 5 customers ordered by id.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "clean_phone,phone_len\n9876543210,14\n9876543211,14\n9876543212,14\n9876543213,14\n9876543214,14",
          solution: "SELECT REPLACE(phone, '+91-', '') AS clean_phone, LENGTH(phone) AS phone_len FROM customers ORDER BY id LIMIT 5;",
        },
        advanced: {
          prompt: "Show product names and their prices with an 18% tax added (rounded to 0 decimal places, name it 'price_with_tax'). Also include a 'short_name' which is just the first 5 characters of the product name. Top 5 by price_with_tax DESC and then name.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "name,price_with_tax,short_name\nDell 24-inch Monitor,14160.0,Dell \nSony Headphones,5310.0,Sony \nMechanical Keyboard,2950.0,Mecha\nPyMaster Hoodie,2596.0,PyMas\nDumbbell 5kg,1770.0,Dumbb",
          solution: "SELECT name, ROUND(price * 1.18, 0) AS price_with_tax, SUBSTR(name, 1, 5) AS short_name FROM products ORDER BY price_with_tax DESC, name LIMIT 5;",
        },
      },
    },
    {
      id: "sql-advanced-logic",
      title: "4. Advanced Logic",
      description: "CASE, COALESCE, CAST — handle logic and types",
      category: "Phase 2 — Core Skills",
      content:
        "## Advanced Logic 🧠\n\n### Conditional Logic with CASE\n`CASE` is SQL's if-else statement. There are two forms:\n\n**Searched CASE** (most flexible):\n```sql\nCASE\n  WHEN price > 5000 THEN 'Luxury'\n  WHEN price > 1000 THEN 'Premium'\n  WHEN price > 500  THEN 'Standard'\n  ELSE 'Budget'\nEND\n```\n**Simple CASE** (equality checks only):\n```sql\nCASE status\n  WHEN 'completed' THEN '✅'\n  WHEN 'cancelled'  THEN '❌'\n  ELSE '⏳'\nEND\n```\nCASE evaluates conditions top-to-bottom and returns the **first match**. If no condition matches and there's no `ELSE`, it returns `NULL`.\n\n### Handling NULLs\n- `COALESCE(a, b, c, ...)`: Returns the **first non-NULL** value in the list. Perfect for default values.\n  - `COALESCE(discount, 0)` → use 0 if discount is NULL\n  - `COALESCE(mobile, landline, 'No phone')` → try each fallback\n- `NULLIF(val1, val2)`: Returns `NULL` if both values are equal, otherwise returns `val1`. Useful to prevent division by zero:\n  - `total / NULLIF(count, 0)` → if count is 0, returns NULL instead of crashing\n\n### Type Conversion with CAST\nDatabases store data in specific types. Use `CAST` to convert explicitly:\n- `CAST(price AS TEXT)` → turns a number into a string for concatenation\n- `CAST('42' AS INTEGER)` → turns a string into a number for math\n- `CAST(3.7 AS INTEGER)` → truncates (→ `3`), does NOT round",
      codeExample:
        "-- Three-tier price classification with CASE\nSELECT\n  name,\n  price,\n  CASE\n    WHEN price >= 5000 THEN '💎 Luxury'\n    WHEN price >= 1000 THEN '⭐ Premium'\n    ELSE '💰 Budget'\n  END AS tier,\n  -- Prefix price string safely with CAST\n  '₹' || CAST(price AS TEXT) AS price_label\nFROM products\nORDER BY price DESC\nLIMIT 6;",
      translations: {
        tamil: { title: "4. Advanced Logic", description: "CASE, COALESCE, CAST — logic மற்றும் types கையாள", category: "Logic" },
        kannada: { title: "4. Advanced Logic", description: "CASE, COALESCE, CAST — logic ಮತ್ತು types ನಿರ್ವಹಿಸಲು", category: "Logic" },
        telugu: { title: "4. Advanced Logic", description: "CASE, COALESCE, CAST — logic మరియు types హ్యాండిల్ చేయడానికి", category: "Logic" },
        hindi: { title: "4. Advanced Logic", description: "CASE, COALESCE, CAST — logic और types को हैंडल करें", category: "Logic" },
      },
      exercises: {
        beginner: {
          prompt: "Categorize products as 'Premium' (> 1000) or 'Budget' (<= 1000). Output (name, price, tag) ordered by price DESC, limit 5.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "name,price,tag\nDell 24-inch Monitor,12000,Premium\nSony Headphones,4500,Premium\nMechanical Keyboard,2500,Premium\nPyMaster Hoodie,2200,Premium\nDumbbell 5kg,1500,Premium",
          solution: "SELECT name, price, CASE WHEN price > 1000 THEN 'Premium' ELSE 'Budget' END AS tag FROM products ORDER BY price DESC LIMIT 5;",
        },
        intermediate: {
          prompt: "List all products and their rating. Use COALESCE to show 0 if no rating exists. Output (name, rating) ordered by name, limit 5.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "name,rating\nAlgorithmic Socks,0\nCushion Cover,0\nData Science Cap,0\nDell 24-inch Monitor,0\nDumbbell 5kg,0",
          solution: "SELECT p.name, COALESCE(r.rating, 0) AS rating FROM products p LEFT JOIN product_reviews r ON p.id = r.product_id ORDER BY p.name LIMIT 5;",
        },
        advanced: {
          prompt: "Display prices as text with a prefix 'Price: '. Output 'price_text' ordered by price DESC, limit 5.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "price_text\nPrice: 12000\nPrice: 4500\nPrice: 2500\nPrice: 2200\nPrice: 1500",
          solution: "SELECT 'Price: ' || CAST(price AS TEXT) AS price_text FROM products ORDER BY price DESC LIMIT 5;",
        },
      },
    },
    {
      id: "sql-aggregations",
      title: "5. Aggregations & GROUP BY",
      description: "COUNT, SUM, AVG, GROUP BY, HAVING",
      category: "Phase 2 — Core Skills",
      content:
        "## Aggregations & GROUP BY 📊\n\nAggregation functions **collapse multiple rows into a single summary value**. They are the engine behind dashboards, reports, and analytics.\n\n### Core Aggregate Functions\n| Function | Description | Ignores NULLs? |\n|---|---|---|\n| `COUNT(*)` | Counts all rows including NULLs | No |\n| `COUNT(col)` | Counts only non-NULL values | Yes |\n| `SUM(col)` | Sum of non-NULL values | Yes |\n| `AVG(col)` | Average of non-NULL values | Yes |\n| `MIN(col)` / `MAX(col)` | Smallest / largest non-NULL value | Yes |\n\n### GROUP BY — Aggregating Per Group\n`GROUP BY` splits the table into groups and applies the aggregate to each group:\n```sql\nSELECT category, COUNT(*) AS product_count, AVG(price) AS avg_price\nFROM products\nGROUP BY category;\n```\n⚠️ **Rule**: Every column in `SELECT` must either be in `GROUP BY` or wrapped in an aggregate function.\n\n### HAVING — Filtering Groups (not rows)\n- `WHERE` filters individual rows **before** grouping.\n- `HAVING` filters aggregated groups **after** grouping.\n```sql\n-- Only categories with avg price > 500\nSELECT category, AVG(price) AS avg_price\nFROM products\nGROUP BY category\nHAVING AVG(price) > 500;\n```\n\n### COUNT(*) vs COUNT(col)\n- `COUNT(*)` = total rows (never ignores anything)\n- `COUNT(column)` = rows where that column is NOT NULL\n- Use `COUNT(DISTINCT column)` to count unique values",
      codeExample:
        "-- Sales summary: orders, revenue and avg order value per status\nSELECT\n  o.status,\n  COUNT(*) AS order_count,\n  SUM(p.price * oi.quantity) AS total_revenue,\n  ROUND(AVG(p.price * oi.quantity), 0) AS avg_line_value\nFROM orders o\nJOIN order_items oi ON o.id = oi.order_id\nJOIN products p ON oi.product_id = p.id\nGROUP BY o.status\nHAVING COUNT(*) > 5\nORDER BY total_revenue DESC;",
      translations: {
        tamil: {
          title: "5. Aggregations & GROUP BY",
          description: "COUNT, SUM, AVG, GROUP BY, HAVING",
          category: "Aggregations",
          content:
            "## Aggregations\n\n### பொதுவான functions\n- `COUNT(*)`\n- `SUM(x)`\n- `AVG(x)`\n- `MIN(x)`, `MAX(x)`\n\n### GROUP BY\nrows-ஐ குழுவாக்கி, ஒவ்வொரு group-க்கும் aggregate கணக்கிடுகிறது.\n\n### HAVING\naggregation பிறகு *groups*-ஐ filter செய்கிறது.",
        },
        kannada: {
          title: "5. Aggregations & GROUP BY",
          description: "COUNT, SUM, AVG, GROUP BY, HAVING",
          category: "Aggregations",
          content:
            "## Aggregations\n\n### ಸಾಮಾನ್ಯ functions\n- `COUNT(*)`\n- `SUM(x)`\n- `AVG(x)`\n- `MIN(x)`, `MAX(x)`\n\n### GROUP BY\nrows ಗಳನ್ನು group ಮಾಡಿ, ಪ್ರತಿ group ಗೆ aggregate ಲೆಕ್ಕ ಹಾಕುತ್ತದೆ.\n\n### HAVING\naggregation ನಂತರ *groups* ಅನ್ನು filter ಮಾಡುತ್ತದೆ.",
        },
        telugu: {
          title: "5. Aggregations & GROUP BY",
          description: "COUNT, SUM, AVG, GROUP BY, HAVING",
          category: "Aggregations",
          content:
            "## Aggregations\n\n### సాధారణ functions\n- `COUNT(*)`\n- `SUM(x)`\n- `AVG(x)`\n- `MIN(x)`, `MAX(x)`\n\n### GROUP BY\nrows ని group చేసి, ప్రతి group కి aggregates లెక్కిస్తుంది.\n\n### HAVING\naggregation తర్వాత *groups* ని filter చేస్తుంది.",
        },
        hindi: {
          title: "5. Aggregations & GROUP BY",
          description: "COUNT, SUM, AVG, GROUP BY, HAVING",
          category: "Aggregations",
          content:
            "## Aggregations\n\n### Common functions\n- `COUNT(*)`\n- `SUM(x)`\n- `AVG(x)`\n- `MIN(x)`, `MAX(x)`\n\n### GROUP BY\nrows को group करके हर group के लिए aggregate निकालता है.\n\n### HAVING\naggregation के बाद *groups* को filter करता है.",
        },
      },
      exercises: {
        beginner: {
          prompt: "Count orders by status (status, count) ordered by status.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "status,count\ncancelled,1\ncompleted,13\npending,1\nprocessing,3\nshipped,2",
          solution: "SELECT status, COUNT(*) AS count FROM orders GROUP BY status ORDER BY status;",
        },
        intermediate: {
          prompt: "For completed orders only, compute total quantity sold per product (name, total_qty) ordered by total_qty DESC then name.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "name,total_qty\nLays Chips,10\nPython Book,4\nAlgorithmic Socks,3\nNescafe Coffee,3\nSony Headphones,3\nDumbbell 5kg,2\nMechanical Keyboard,2\nMoleskine Diary,2\nParker Pen,2\nPyMaster Hoodie,2\nSteelo Water Bottle,2\nTable Lamp,2\nData Science Cap,1\nLogitech Mouse,1\nOrganic Tea,1\nResistance Band,1\nSQL Masterclass,1\nYoga Mat,1",
          solution: "SELECT p.name, SUM(oi.quantity) AS total_qty FROM order_items oi JOIN orders o ON oi.order_id = o.id JOIN products p ON oi.product_id = p.id WHERE o.status = 'completed' GROUP BY p.name ORDER BY total_qty DESC, p.name;",
        },
        advanced: {
          prompt: "Compute revenue per completed order (order_id, revenue) ordered by order_id.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "order_id,revenue\n1,2000\n2,7000\n4,2000\n5,1150\n7,3400\n9,6700\n10,550\n12,3900\n14,2800\n16,7000\n17,2400\n18,2900\n20,400",
          solution: "SELECT o.id AS order_id, SUM(p.price * oi.quantity) AS revenue FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id WHERE o.status = 'completed' GROUP BY o.id ORDER BY o.id;",
        },
      },
    },
    // ═══════════════════════════════════════════════════════
    // PHASE 2: RELATIONAL ALGEBRA (Modules 6–9)
    // Learn complex queries, joins, and window functions
    // ═══════════════════════════════════════════════════════
    {
      id: "sql-joins",
      title: "6. JOINs (All 4 Types)",
      description: "INNER, LEFT, RIGHT, and FULL OUTER JOINs",
      category: "Phase 3 — Advanced SQL",
      content:
        "## JOINs 🔗\n\n### The Big Idea\nA JOIN combines rows from two tables based on a **matching key**. Think of it as merging two spreadsheets by a common column.\n\n### Visual Comparison\n| JOIN Type | Returns |\n|---|---|\n| `INNER JOIN` | Only rows with a match in **both** tables |\n| `LEFT JOIN` | **All** left rows + matching right rows (NULL if no match) |\n| `RIGHT JOIN` | **All** right rows + matching left rows (NULL if no match) |\n| `FULL OUTER JOIN` | **All** rows from both tables (NULL where no match) |\n\n---\n\n### 1. INNER JOIN\nMost common JOIN. Returns only the rows where a match exists in **both** tables.\n```sql\nSELECT o.id, c.name, o.status\nFROM orders o\nINNER JOIN customers c ON o.customer_id = c.id;\n-- Only orders that have a matching customer\n```\n\n### 2. LEFT JOIN\nReturns every row from the **left** table. If no match exists in the right table, those columns are filled with `NULL`.\n```sql\nSELECT c.name, o.id AS order_id\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id;\n-- ALL customers shown, even those with NO orders (order_id = NULL)\n```\n\n### 3. RIGHT JOIN\nMirror of LEFT JOIN. Returns every row from the **right** table, with NULLs for unmatched left rows.\n```sql\nSELECT c.name, o.id AS order_id\nFROM orders o\nRIGHT JOIN customers c ON o.customer_id = c.id;\n-- Same result as the LEFT JOIN example above (just tables swapped)\n```\n\n### 4. FULL OUTER JOIN\nReturns rows from **both** tables. Where there is no match on either side, NULLs appear.\n```sql\nSELECT c.name, o.id AS order_id\nFROM customers c\nFULL OUTER JOIN orders o ON c.id = o.customer_id;\n-- Customers with no orders AND orders with no customer both appear\n```\n\n### Filtering NULLs After a JOIN\nYou can use `IS NULL` after a LEFT JOIN to find records that do NOT have a match — this is called an **Anti-JOIN**:\n```sql\n-- Customers who have NEVER placed an order\nSELECT c.name\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nWHERE o.id IS NULL;\n```\n\n### Joining 3+ Tables\nChain multiple JOINs to combine more tables:\n```sql\nSELECT c.name, p.name AS product, oi.quantity\nFROM orders o\nJOIN customers c   ON c.id = o.customer_id\nJOIN order_items oi ON oi.order_id = o.id\nJOIN products p    ON p.id = oi.product_id;\n```\n\n**Tip**: When totals can be NULL after a LEFT JOIN, use `COALESCE(SUM(x), 0)` to turn `NULL` into `0`.",
      codeExample:
        "-- Orders with customer names\nSELECT o.id AS order_id, c.name, o.status\nFROM orders o\nINNER JOIN customers c ON c.id = o.customer_id\nORDER BY o.id;",
      translations: {
        tamil: {
          title: "6. JOINs (4 வகைகள்)",
          description: "INNER, LEFT, RIGHT, மற்றும் FULL OUTER JOINs",
          category: "Joins",
          content:
            "## JOINs\n\n### முக்கிய idea\nmatching key மூலம் பல tables-லிருந்த rows-ஐ JOIN இணைக்கிறது. இதில் 4 முக்கிய வகைகள் உள்ளன:\n\n### 1. INNER JOIN\nஇரண்டு tables-லும் match ஆன rows மட்டும்.\n\n### 2. LEFT JOIN\nleft table-ன் rows அனைத்தும் மற்றும் match ஆன right rows.\n\n### 3. RIGHT JOIN\nright table-ன் rows அனைத்தும் மற்றும் match ஆன left rows.\n\n### 4. FULL OUTER JOIN\nஇரண்டில் எதில் match ஆனாலும் அனைத்து rows-ம் வரும்.\n\nTip: totals இல்லாமல் NULL வரலாம்; `COALESCE(x, 0)` மூலம் NULL → 0 ஆக மாற்றலாம்.",
        },
        kannada: {
          title: "6. JOINs (4 ಪ್ರಕಾರಗಳು)",
          description: "INNER, LEFT, RIGHT, ಮತ್ತು FULL OUTER JOINs",
          category: "Joins",
          content:
            "## JOINs\n\n### ಮುಖ್ಯ idea\nmatching key ಬಳಸಿ tables ಗಳ rows ಅನ್ನು JOIN ಸೇರಿಸುತ್ತದೆ. ಇದರಲ್ಲಿ 4 ಮುಖ್ಯ ಪ್ರಕಾರಗಳಿವೆ:\n\n### 1. INNER JOIN\nಎರಡೂ tables ನಲ್ಲಿ match ಆದ rows ಮಾತ್ರ.\n\n### 2. LEFT JOIN\nleft table ನ ಎಲ್ಲಾ rows ಮತ್ತು match ಆದ right rows.\n\n### 3. RIGHT JOIN\nright table ನ ಎಲ್ಲಾ rows ಮತ್ತು match ಆದ left rows.\n\n### 4. FULL OUTER JOIN\nಎರಡರಲ್ಲಾದರೂ match ಆದರೆ ಎಲ್ಲಾ rows ಬರುತ್ತವೆ.\n\nTip: totals ನಲ್ಲಿ NULL ಬರಬಹುದು; `COALESCE(x, 0)` ಬಳಸಿ NULL → 0 ಮಾಡಿ.",
        },
        telugu: {
          title: "6. JOINs (4 రకాలు)",
          description: "INNER, LEFT, RIGHT, మరియు FULL OUTER JOINs",
          category: "Joins",
          content:
            "## JOINs\n\n### ముఖ్య idea\nmatching key ద్వారా tables లోని rows ని JOIN కలుపుతుంది. ఇందులో 4 ముఖ్య రకాలు ఉన్నాయి:\n\n### 1. INNER JOIN\nరెండు tables లో match అయ్యే rows మాత్రమే.\n\n### 2. LEFT JOIN\nleft table లోని అన్ని rows మరియు match అయిన right rows.\n\n### 3. RIGHT JOIN\nright table లోని అన్ని rows మరియు match అయిన left rows.\n\n### 4. FULL OUTER JOIN\nరెండింటిలో ఎందులో match అయినా అన్ని rows వస్తాయి.\n\nTip: totals లో NULL రావచ్చు; `COALESCE(x, 0)` తో NULL → 0 చేయండి.",
        },
        hindi: {
          title: "6. JOINs (4 प्रकार)",
          description: "INNER, LEFT, RIGHT, और FULL OUTER JOINs",
          category: "Joins",
          content:
            "## JOINs\n\n### मुख्य idea\nmatching key की मदद से JOIN अलग-अलग tables के rows को जोड़ता है. इसके 4 मुख्य प्रकार हैं:\n\n### 1. INNER JOIN\nसिर्फ वो rows जो दोनों tables में match हों.\n\n### 2. LEFT JOIN\nleft table के सभी rows और match होने वाले right rows.\n\n### 3. RIGHT JOIN\nright table के सभी rows और match होने वाले left rows.\n\n### 4. FULL OUTER JOIN\nदोनों में से किसी में भी match होने पर सभी rows.\n\nTip: totals में NULL आ सकता है; `COALESCE(x, 0)` से NULL → 0 करें.",
        },
      },
      exercises: {
        beginner: {
          prompt: "List all orders with customer name (order_id, name, status) ordered by order_id.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "order_id,name,status\n1,Alice Johnson,completed\n2,Bob Sharma,completed\n3,Alice Johnson,cancelled\n4,Charlie Dave,completed\n5,Diana Prince,completed\n6,Ethan Hunt,processing\n7,Fiona Apple,completed\n8,George Miller,shipped\n9,Hannah Abbott,completed\n10,Ian Wright,completed\n11,Julia Roberts,processing\n12,Kevin Hart,completed\n13,Laura Palmer,shipped\n14,Mike Ross,completed\n15,Nina Simone,pending\n16,Alice Johnson,completed\n17,Bob Sharma,completed\n18,Oscar Wilde,completed\n19,Charlie Dave,processing\n20,Fiona Apple,completed",
          solution: "SELECT o.id AS order_id, c.name, o.status FROM orders o JOIN customers c ON o.customer_id = c.id ORDER BY o.id;",
        },
        intermediate: {
          prompt: "For order_id=1, list items (order_id, product, quantity) ordered by product.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "order_id,product,quantity\n1,Logitech Mouse,1\n1,Nescafe Coffee,2\n1,Parker Pen,1",
          solution: "SELECT oi.order_id, p.name AS product, oi.quantity FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = 1 ORDER BY p.name;",
        },
        advanced: {
          prompt: "Total spent per customer on completed orders (include customers with 0). Output (name, total_spent) ordered by total_spent DESC and then name.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "name,total_spent\nBob Sharma,9400\nAlice Johnson,9000\nHannah Abbott,6700\nKevin Hart,3900\nFiona Apple,3800\nOscar Wilde,2900\nMike Ross,2800\nCharlie Dave,2000\nDiana Prince,1150\nIan Wright,550\nEthan Hunt,0\nGeorge Miller,0\nJulia Roberts,0\nLaura Palmer,0\nNina Simone,0",
          solution: "SELECT c.name, COALESCE(SUM(p.price * oi.quantity), 0) AS total_spent FROM customers c LEFT JOIN orders o ON c.id = o.customer_id AND o.status = 'completed' LEFT JOIN order_items oi ON o.id = oi.order_id LEFT JOIN products p ON oi.product_id = p.id GROUP BY c.name ORDER BY total_spent DESC, c.name;",
        },
      },
    },
    {
      id: "sql-subqueries",
      title: "7. Subqueries",
      description: "IN, EXISTS, scalar subqueries, derived tables",
      category: "Phase 3 — Advanced SQL",
      content:
        "## Subqueries 🔍\n\nA subquery is a query nested inside another query. They let you break complex problems into smaller, focused pieces.\n\n### The 3 Placement Patterns\n\n**1. In WHERE — Filter against a computed list**\n```sql\n-- Customers who placed at least one cancelled order\nSELECT name FROM customers\nWHERE id IN (SELECT customer_id FROM orders WHERE status = 'cancelled');\n```\n\n**2. In FROM — Derived Table (gives a name to a temp result)**\n```sql\n-- Find orders above the average revenue\nSELECT * FROM (\n  SELECT order_id, SUM(price * qty) AS revenue FROM order_items GROUP BY order_id\n) AS summary\nWHERE revenue > 3000;\n```\n\n**3. In SELECT — Scalar Subquery (returns exactly one value)**\n```sql\n-- Each product with count of how many times it was ordered\nSELECT name,\n  (SELECT COUNT(*) FROM order_items oi WHERE oi.product_id = p.id) AS times_ordered\nFROM products p;\n```\n\n### IN vs EXISTS\n- `IN (subquery)`: Evaluates the subquery once, builds a list, then checks membership. Can be slow for large lists.\n- `EXISTS (subquery)`: Stops as soon as the first match is found. **Faster** when you only need to know *if* something exists, not what it is.\n- `NOT IN` with NULLs: If the subquery returns even one NULL, `NOT IN` returns no rows! Use `NOT EXISTS` instead.\n\n### Correlated Subquery\nA correlated subquery references a column from the outer query. It runs once for every row in the outer query (potentially slow but very powerful):\n```sql\n-- Products priced above their category's average\nSELECT name, price, category\nFROM products p1\nWHERE price > (\n  SELECT AVG(price) FROM products p2 WHERE p2.category = p1.category\n);\n```",
      codeExample:
        "-- Products ordered MORE than once (using IN)\nSELECT name, category, price\nFROM products\nWHERE id IN (\n  SELECT product_id\n  FROM order_items\n  GROUP BY product_id\n  HAVING COUNT(*) > 1\n)\nORDER BY category, name;",
      translations: {
        tamil: {
          title: "7. Subqueries",
          description: "IN, EXISTS, scalar subqueries, derived tables",
          category: "Subqueries",
          content:
            "## Subqueries\n\nஒரு query-க்குள் இன்னொரு query-ஐ பயன்படுத்த subquery உதவுகிறது.\n\n### பொதுவான patterns\n- `WHERE x IN (SELECT ...)`\n- `WHERE EXISTS (SELECT ...)`\n- `FROM`-ல் subquery (derived table)\n\nTip: values வேண்டாம், presence மட்டும் வேண்டும் என்றால் `EXISTS` நல்லது.",
        },
        kannada: {
          title: "7. Subqueries",
          description: "IN, EXISTS, scalar subqueries, derived tables",
          category: "Subqueries",
          content:
            "## Subqueries\n\nಒಂದು query ಒಳಗೆ ಇನ್ನೊಂದು query ಬಳಸಲು subquery ಸಹಾಯ ಮಾಡುತ್ತದೆ.\n\n### ಸಾಮಾನ್ಯ patterns\n- `WHERE x IN (SELECT ...)`\n- `WHERE EXISTS (SELECT ...)`\n- `FROM` ನಲ್ಲಿ subquery (derived table)\n\nTip: values ಬೇಕಿಲ್ಲ, presence ಮಾತ್ರ ಬೇಕಾದರೆ `EXISTS` ಉತ್ತಮ.",
        },
        telugu: {
          title: "7. Subqueries",
          description: "IN, EXISTS, scalar subqueries, derived tables",
          category: "Subqueries",
          content:
            "## Subqueries\n\nఒక query లో మరో query ని ఉపయోగించడానికి subquery సహాయపడుతుంది.\n\n### సాధారణ patterns\n- `WHERE x IN (SELECT ...)`\n- `WHERE EXISTS (SELECT ...)`\n- `FROM` లో subquery (derived table)\n\nTip: values అవసరం లేకుండా presence మాత్రమే చెక్ చేయాలంటే `EXISTS` బెటర్.",
        },
        hindi: {
          title: "7. Subqueries",
          description: "IN, EXISTS, scalar subqueries, derived tables",
          category: "Subqueries",
          content:
            "## Subqueries\n\nSubquery आपको एक query के अंदर दूसरी query इस्तेमाल करने देता है.\n\n### Common patterns\n- `WHERE x IN (SELECT ...)`\n- `WHERE EXISTS (SELECT ...)`\n- `FROM` में subquery (derived table)\n\nTip: सिर्फ presence check करना हो तो `EXISTS` बेहतर है (values नहीं चाहिए).",
        },
      },
      exercises: {
        beginner: {
          prompt: "Find customers who have a cancelled order (name).",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "name\nAlice Johnson",
          solution: "SELECT name FROM customers WHERE id IN (SELECT customer_id FROM orders WHERE status = 'cancelled');",
        },
        intermediate: {
          prompt: "Find products that were never ordered (name) ordered by name.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "name\nCushion Cover",
          solution: "SELECT name FROM products WHERE id NOT IN (SELECT product_id FROM order_items) ORDER BY name;",
        },
        advanced: {
          prompt: "Find customers whose completed total_spent is greater than the average total_spent across all customers (include 0). Output (name, total_spent) ordered by total_spent DESC.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "name,total_spent\nBob Sharma,9400\nAlice Johnson,9000\nHannah Abbott,6700\nKevin Hart,3900\nFiona Apple,3800\nOscar Wilde,2900",
          solution: "WITH customer_spend AS (\n  SELECT c.name, COALESCE(SUM(p.price * oi.quantity), 0) AS total_spent\n  FROM customers c\n  LEFT JOIN orders o ON c.id = o.customer_id AND o.status = 'completed'\n  LEFT JOIN order_items oi ON o.id = oi.order_id\n  LEFT JOIN products p ON oi.product_id = p.id\n  GROUP BY c.name\n)\nSELECT name, total_spent \nFROM customer_spend \nWHERE total_spent > (SELECT AVG(total_spent) FROM customer_spend)\nORDER BY total_spent DESC;",
        },
      },
    },
    {
      id: "sql-ctes",
      title: "8. CTEs (WITH)",
      description: "Readable multi-step queries with WITH",
      category: "Phase 3 — Advanced SQL",
      content:
        "## CTEs (Common Table Expressions) 📐\n\nA CTE uses the `WITH` keyword to give a name to an intermediate result set. Think of it as **naming a subquery** so you can reference it cleanly.\n\n### Basic Syntax\n```sql\nWITH cte_name AS (\n  SELECT ... FROM ... WHERE ...\n)\nSELECT * FROM cte_name;\n```\n\n### Why CTEs Over Subqueries?\n- **Readability**: Each step has a name — `WITH monthly_sales AS (...)` is self-documenting.\n- **Reusability**: You can reference the same CTE multiple times in the final query (subqueries would have to be repeated).\n- **Debugging**: You can SELECT from just the CTE to inspect intermediate results.\n\n### Chaining Multiple CTEs\nYou can define several CTEs in one `WITH` clause, separated by commas. Each can reference the previous:\n```sql\nWITH\n  step1 AS (SELECT ... FROM orders WHERE status = 'completed'),\n  step2 AS (SELECT customer_id, COUNT(*) AS cnt FROM step1 GROUP BY customer_id),\n  step3 AS (SELECT * FROM step2 WHERE cnt > 2)\nSELECT c.name, s.cnt\nFROM customers c\nJOIN step3 s ON c.id = s.customer_id;\n```\n\n### CTEs vs Subqueries vs Temp Tables\n| Feature | CTE | Subquery | Temp Table |\n|---|---|---|---|\n| Readable | ✅ | ❌ (deep nesting) | ✅ |\n| Reusable in query | ✅ | ❌ | ✅ |\n| Persists beyond query | ❌ | ❌ | ✅ |\n| Materialized | No (re-runs) | No | Yes |\n\n### Recursive CTEs (Advanced)\nSQLite supports recursive CTEs for hierarchical data (like org charts or graph traversal):\n```sql\nWITH RECURSIVE countdown(n) AS (\n  SELECT 5  -- base case\n  UNION ALL\n  SELECT n - 1 FROM countdown WHERE n > 1  -- recursive step\n)\nSELECT n FROM countdown;  -- 5, 4, 3, 2, 1\n```",
      codeExample:
        "-- Two-step CTE: monthly revenue, then identify peak month\nWITH order_revenue AS (\n  SELECT\n    SUBSTR(o.order_date, 1, 7) AS month,\n    SUM(p.price * oi.quantity) AS revenue\n  FROM orders o\n  JOIN order_items oi ON oi.order_id = o.id\n  JOIN products p ON p.id = oi.product_id\n  WHERE o.status = 'completed'\n  GROUP BY month\n),\npeak AS (\n  SELECT MAX(revenue) AS max_rev FROM order_revenue\n)\nSELECT month, revenue\nFROM order_revenue, peak\nWHERE revenue = max_rev;",
      translations: {
        tamil: {
          title: "8. CTEs (WITH)",
          description: "WITH மூலம் readable multi-step queries",
          category: "CTEs",
          content:
            "## Common Table Expressions (CTEs)\n\nintermediate results-க்கு பெயர் கொடுத்து complex queries-ஐ வாசிக்க எளிதாக்குகிறது.\n\n### பயன்கள்\n- logic-ஐ steps ஆக பிரிக்கலாம்\n- computed set-ஐ மீண்டும் பயன்படுத்தலாம்\n- repeated subqueries-ஐ விட பாதுகாப்பானது",
        },
        kannada: {
          title: "8. CTEs (WITH)",
          description: "WITH ಬಳಸಿ readable multi-step queries",
          category: "CTEs",
          content:
            "## Common Table Expressions (CTEs)\n\nintermediate results ಗೆ ಹೆಸರು ಕೊಟ್ಟು complex queries ಓದಲು ಸುಲಭವಾಗುತ್ತದೆ.\n\n### ಲಾಭಗಳು\n- logic ಅನ್ನು steps ಆಗಿ ವಿಭಜಿಸಿ\n- computed set ಅನ್ನು ಮರುಬಳಕೆ ಮಾಡಿ\n- subqueries ಪುನರಾವರ್ತನೆಗಿಂತ ಸುರಕ್ಷಿತ",
        },
        telugu: {
          title: "8. CTEs (WITH)",
          description: "WITH తో readable multi-step queries",
          category: "CTEs",
          content:
            "## Common Table Expressions (CTEs)\n\nintermediate results కు పేర్లు ఇవ్వడం ద్వారా complex queries చదవడానికి సులభం అవుతాయి.\n\n### ప్రయోజనాలు\n- logic ను steps గా విడగొట్టండి\n- computed set ను మళ్లీ ఉపయోగించండి\n- repeated subqueries కంటే safer",
        },
        hindi: {
          title: "8. CTEs (WITH)",
          description: "WITH के साथ readable multi-step queries",
          category: "CTEs",
          content:
            "## Common Table Expressions (CTEs)\n\nIntermediate results को नाम देकर complex queries को पढ़ना आसान बनाते हैं.\n\n### फायदे\n- logic को steps में तोड़ें\n- computed set को reuse करें\n- repeated subqueries की तुलना में safer",
        },
      },
      exercises: {
        beginner: {
          prompt: "Using a CTE, compute completed order revenue (order_id, revenue) ordered by order_id.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "order_id,revenue\n1,2000\n2,7000\n4,2000\n5,1150\n7,3400\n9,6700\n10,550\n12,3900\n14,2800\n16,7000\n17,2400\n18,2900\n20,400",
          solution: "WITH order_rev AS (\n  SELECT oi.order_id, SUM(p.price * oi.quantity) AS revenue\n  FROM order_items oi\n  JOIN products p ON oi.product_id = p.id\n  GROUP BY oi.order_id\n)\nSELECT o.id AS order_id, r.revenue\nFROM orders o\nJOIN order_rev r ON o.id = r.order_id\nWHERE o.status = 'completed'\nORDER BY o.id;",
        },
        intermediate: {
          prompt: "Compute monthly completed revenue (month, revenue) ordered by month.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "month,revenue\n2026-01,9000\n2026-03,13250\n2026-04,19950",
          solution: "WITH monthly_rev AS (\n  SELECT substr(o.order_date, 1, 7) AS month, p.price * oi.quantity AS line_revenue\n  FROM orders o\n  JOIN order_items oi ON o.id = oi.order_id\n  JOIN products p ON oi.product_id = p.id\n  WHERE o.status = 'completed'\n)\nSELECT month, SUM(line_revenue) AS revenue\nFROM monthly_rev\nGROUP BY month\nORDER BY month;",
        },
        advanced: {
          prompt: "Find the top customer by completed total_spent (name, total_spent).",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "name,total_spent\nBob Sharma,9400",
          solution: "WITH spend AS (\n  SELECT c.name, SUM(p.price * oi.quantity) AS total_spent\n  FROM customers c\n  JOIN orders o ON c.id = o.customer_id\n  JOIN order_items oi ON o.id = oi.order_id\n  JOIN products p ON p.id = oi.product_id\n  WHERE o.status = 'completed'\n  GROUP BY c.name\n)\nSELECT name, total_spent \nFROM spend \nORDER BY total_spent DESC \nLIMIT 1;",
        },
      },
    },
    {
      id: "sql-windows",
      title: "9. Window Functions",
      description: "RANK, DENSE_RANK, OVER(), running totals",
      category: "Phase 3 — Advanced SQL",
      content:
        "## Window Functions 🪟\n\nWindow functions compute a value for each row **using a group of related rows** (the \"window\") — without collapsing those rows the way `GROUP BY` does. This is what makes them incredibly powerful for analytics.\n\n### Syntax Pattern\n```sql\nfunction_name() OVER (\n  PARTITION BY col    -- optional: define groups\n  ORDER BY col        -- optional: define order within the window\n  ROWS BETWEEN ...    -- optional: define the window frame\n)\n```\n\n### Ranking Functions\n| Function | Behavior | Gaps? |\n|---|---|---|\n| `ROW_NUMBER()` | Unique sequential number per row | N/A |\n| `RANK()` | Same rank for ties, then skips numbers | Yes (1,1,3) |\n| `DENSE_RANK()` | Same rank for ties, no gaps | No (1,1,2) |\n\nExample: `RANK() OVER (PARTITION BY category ORDER BY price DESC)` — ranks products within each category by price.\n\n### Offset Functions (Access Neighboring Rows)\n- `LAG(col, n)`: Value from `n` rows **before** the current row. Great for month-over-month comparisons.\n- `LEAD(col, n)`: Value from `n` rows **after** the current row.\n\n```sql\n-- Month-over-month revenue growth\nSELECT month, revenue,\n  LAG(revenue) OVER (ORDER BY month) AS prev_month_revenue\nFROM monthly_summary;\n```\n\n### Aggregate Window Functions (Running Totals, Moving Averages)\n```sql\n-- Running total of revenue\nSUM(revenue) OVER (ORDER BY order_date)\n\n-- 3-row moving average\nAVG(price) OVER (ORDER BY date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)\n```\n\n### PARTITION BY vs GROUP BY\n- `GROUP BY`: collapses rows into one row per group.\n- `PARTITION BY` (in a window): splits rows into groups **but keeps all original rows**.",
      codeExample:
        "-- Three ranking functions compared side-by-side\nSELECT\n  category, name, price,\n  ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) AS row_num,\n  RANK()       OVER (PARTITION BY category ORDER BY price DESC) AS rank,\n  DENSE_RANK() OVER (PARTITION BY category ORDER BY price DESC) AS dense_rank\nFROM products\nORDER BY category, price DESC;",
      translations: {
        tamil: {
          title: "9. Window Functions",
          description: "RANK, DENSE_RANK, OVER(), running totals",
          category: "Window Functions",
          content:
            "## Window Functions\n\nGROUP BY போல rows-ஐ collapse செய்யாமல், rows set முழுவதிலும் values கணக்கிட உதவும்.\n\n### உதாரணங்கள்\n- category-க்குள் ranking\n- running totals\n- moving averages\n\nSyntax:\n`func(...) OVER (PARTITION BY ... ORDER BY ...)`",
        },
        kannada: {
          title: "9. Window Functions",
          description: "RANK, DENSE_RANK, OVER(), running totals",
          category: "Window Functions",
          content:
            "## Window Functions\n\nGROUP BY ಹಾಗೆ rows ಅನ್ನು collapse ಮಾಡದೆ, rows set ಮೇಲೆ values ಲೆಕ್ಕ ಹಾಕುತ್ತದೆ.\n\n### ಉದಾಹರಣೆಗಳು\n- category ಒಳಗೆ ranking\n- running totals\n- moving averages\n\nSyntax:\n`func(...) OVER (PARTITION BY ... ORDER BY ...)`",
        },
        telugu: {
          title: "9. Window Functions",
          description: "RANK, DENSE_RANK, OVER(), running totals",
          category: "Window Functions",
          content:
            "## Window Functions\n\nGROUP BY లా rows ని collapse చేయకుండా, rows set పై values లెక్కిస్తుంది.\n\n### Examples\n- category లో ranking\n- running totals\n- moving averages\n\nSyntax:\n`func(...) OVER (PARTITION BY ... ORDER BY ...)`",
        },
        hindi: {
          title: "9. Window Functions",
          description: "RANK, DENSE_RANK, OVER(), running totals",
          category: "Window Functions",
          content:
            "## Window Functions\n\nGROUP BY की तरह rows को collapse किए बिना, rows के set पर values compute करते हैं.\n\n### Examples\n- category के अंदर ranking\n- running totals\n- moving averages\n\nSyntax:\n`func(...) OVER (PARTITION BY ... ORDER BY ...)`",
        },
      },
      exercises: {
        beginner: {
          prompt: "Rank products by price within each category (category, name, price, price_rank) ordered by category, name.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "category,name,price,price_rank\nApparel,Algorithmic Socks,400,3\nApparel,Data Science Cap,600,2\nApparel,PyMaster Hoodie,2200,1\nBooks,Python Book,800,2\nBooks,SQL Masterclass,1200,1\nElectronics,Dell 24-inch Monitor,12000,1\nElectronics,Logitech Mouse,800,4\nElectronics,Mechanical Keyboard,2500,3\nElectronics,Sony Headphones,4500,2\nFitness,Dumbbell 5kg,1500,1\nFitness,Resistance Band,400,3\nFitness,Yoga Mat,900,2\nGrocery,Lays Chips,20,3\nGrocery,Nescafe Coffee,350,1\nGrocery,Organic Tea,250,2\nHome,Cushion Cover,300,3\nHome,Steelo Water Bottle,450,2\nHome,Table Lamp,1100,1\nStationery,Moleskine Diary,1200,1\nStationery,Parker Pen,500,2",
          solution: "SELECT category, name, price, RANK() OVER (PARTITION BY category ORDER BY price DESC) AS price_rank FROM products ORDER BY category, name;",
        },
        intermediate: {
          prompt: "Show completed daily revenue and running_total (order_date, revenue, running_total) ordered by order_date.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "order_date,revenue,running_total\n2026-01-05,2000,2000\n2026-01-06,7000,9000\n2026-03-12,2000,11000\n2026-03-15,1150,12150\n2026-03-20,3400,15550\n2026-03-28,6700,22250\n2026-04-01,550,22800\n2026-04-05,3900,26700\n2026-04-10,2800,29500\n2026-04-15,7000,36500\n2026-04-18,2400,38900\n2026-04-20,2900,41800\n2026-04-25,400,42200",
          solution: "WITH daily_rev AS (\n  SELECT o.order_date, SUM(p.price * oi.quantity) AS revenue\n  FROM orders o\n  JOIN order_items oi ON o.id = oi.order_id\n  JOIN products p ON oi.product_id = p.id\n  WHERE o.status = 'completed'\n  GROUP BY o.order_date\n)\nSELECT order_date, revenue, SUM(revenue) OVER (ORDER BY order_date) AS running_total\nFROM daily_rev\nORDER BY order_date;",
        },
        advanced: {
          prompt: "Top 2 customers by completed total_spent with rank (name, total_spent, spend_rank) ordered by spend_rank.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "name,total_spent,spend_rank\nBob Sharma,9400,1\nAlice Johnson,9000,2",
          solution: "WITH spend AS (\n  SELECT c.name, SUM(p.price * oi.quantity) AS total_spent\n  FROM customers c\n  JOIN orders o ON c.id = o.customer_id\n  JOIN order_items oi ON o.id = oi.order_id\n  JOIN products p ON p.id = oi.product_id\n  WHERE o.status = 'completed'\n  GROUP BY c.name\n)\nSELECT name, total_spent, RANK() OVER (ORDER BY total_spent DESC) AS spend_rank\nFROM spend\nORDER BY spend_rank\nLIMIT 2;",
        },
      },
    },
    // ═══════════════════════════════════════════════════════
    // PHASE 3: DATABASE MANAGEMENT (Modules 10–12)
    // Create tables, insert data, and manage transactions
    // ═══════════════════════════════════════════════════════
    {
      id: "sql-ddl",
      title: "10. DDL (CREATE / ALTER / DROP)",
      description: "Define tables, constraints, and schema",
      category: "Phase 4 — Database Engineering",
      content:
        "## DDL (Data Definition Language) 🏗️\n\nDDL is the language for **building and modifying your database's structure**. Think of it as the architect's blueprints — it defines what tables exist and what rules govern them.\n\n### Core Commands\n- `CREATE TABLE`: Defines a new table with columns and their data types.\n- `ALTER TABLE`: Modifies an existing table (add/rename/drop columns).\n- `DROP TABLE`: Permanently deletes a table and all its data — **irreversible without a backup!**\n- `TRUNCATE TABLE`: Removes all rows but keeps the table structure (faster than DELETE without WHERE).\n\n### Column Constraints (The Rules)\n| Constraint | Description |\n|---|---|\n| `PRIMARY KEY` | Unique identifier, never NULL, one per table |\n| `NOT NULL` | Column must always have a value |\n| `UNIQUE` | All values in the column must be different |\n| `DEFAULT val` | Provides a default value if none is supplied |\n| `CHECK (expr)` | Validates data against a condition |\n| `FOREIGN KEY` | Links to a column in another table (referential integrity) |\n\n### Foreign Keys — Keeping Data Consistent\nA foreign key prevents \"orphan\" records. For example, `order.customer_id` must reference a real `customer.id`:\n```sql\nCREATE TABLE orders (\n  id INTEGER PRIMARY KEY,\n  customer_id INTEGER NOT NULL,\n  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE\n);\n```\n`ON DELETE CASCADE`: If a customer is deleted, all their orders are automatically deleted too.\n\n### SQLite Note\nSQLite uses dynamic typing, so `INTEGER`, `TEXT`, `REAL`, and `BLOB` are the four main storage classes. Foreign key enforcement must be explicitly enabled: `PRAGMA foreign_keys = ON`.",
      codeExample:
        "-- Create a well-constrained table and verify it\nCREATE TABLE projects (\n  id       INTEGER PRIMARY KEY,\n  name     TEXT    NOT NULL UNIQUE,\n  budget   REAL    DEFAULT 0.0,\n  status   TEXT    CHECK(status IN ('active', 'closed'))\n);\n\n-- Verify the table was created\nSELECT name FROM sqlite_master\nWHERE type = 'table' AND name = 'projects';",
      translations: {
        tamil: {
          title: "10. DDL (CREATE / ALTER / DROP)",
          description: "Tables, constraints, schema வரையறுக்க",
          category: "DDL",
          content:
            "## DDL (Data Definition Language)\n\nDDL database structure-ஐ மாற்றுகிறது.\n\n### பொதுவான commands\n- `CREATE TABLE`\n- `ALTER TABLE`\n- `DROP TABLE`\n\nPractice editor-ல் `;` மூலம் பிரித்து பல statements ஒன்றாக run செய்யலாம்.",
        },
        kannada: {
          title: "10. DDL (CREATE / ALTER / DROP)",
          description: "Tables, constraints, schema ನಿರ್ವಚನೆ",
          category: "DDL",
          content:
            "## DDL (Data Definition Language)\n\nDDL database structure ಅನ್ನು ಬದಲಾಯಿಸುತ್ತದೆ.\n\n### ಸಾಮಾನ್ಯ commands\n- `CREATE TABLE`\n- `ALTER TABLE`\n- `DROP TABLE`\n\nPractice editor ನಲ್ಲಿ `;` ಮೂಲಕ ಬೇರ್ಪಡಿಸಿ ಹಲವು statements ಒಂದೇ run ನಲ್ಲಿ ಚಾಲನೆ ಮಾಡಬಹುದು.",
        },
        telugu: {
          title: "10. DDL (CREATE / ALTER / DROP)",
          description: "Tables, constraints, schema నిర్వచించండి",
          category: "DDL",
          content:
            "## DDL (Data Definition Language)\n\nDDL database structure ని మార్చుతుంది.\n\n### Common commands\n- `CREATE TABLE`\n- `ALTER TABLE`\n- `DROP TABLE`\n\nPractice editor లో `;` తో వేరు చేసి multiple statements ను ఒకే run లో నడపవచ్చు.",
        },
        hindi: {
          title: "10. DDL (CREATE / ALTER / DROP)",
          description: "Tables, constraints और schema define करें",
          category: "DDL",
          content:
            "## DDL (Data Definition Language)\n\nDDL database की structure बदलता है.\n\n### Common commands\n- `CREATE TABLE`\n- `ALTER TABLE`\n- `DROP TABLE`\n\nPractice editor में `;` से अलग करके multiple statements एक execution में चला सकते हैं.",
        },
      },
      exercises: {
        beginner: {
          prompt: "Create table temp_notes(id INTEGER, note TEXT) then select its name from sqlite_master.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "name\ntemp_notes",
          solution: "CREATE TABLE temp_notes(id INTEGER, note TEXT);\nSELECT name FROM sqlite_master WHERE type='table' AND name='temp_notes';",
        },
        intermediate: {
          prompt: "Create table projects(id INTEGER PRIMARY KEY, name TEXT NOT NULL), insert 1 row, then select count.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "count\n1",
          solution: "CREATE TABLE projects(id INTEGER PRIMARY KEY, name TEXT NOT NULL);\nINSERT INTO projects(name) VALUES ('Project 1');\nSELECT COUNT(*) AS count FROM projects;",
        },
        advanced: {
          prompt: "Create table emails(email TEXT UNIQUE), insert 2 distinct emails, then select count.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "count\n2",
          solution: "CREATE TABLE emails(email TEXT UNIQUE);\nINSERT INTO emails(email) VALUES ('a@b.com'), ('c@d.com');\nSELECT COUNT(*) AS count FROM emails;",
        },
      },
    },
    {
      id: "sql-dml",
      title: "11. DML (INSERT / UPDATE / DELETE)",
      description: "Modify rows safely with conditions",
      category: "Phase 4 — Database Engineering",
      content:
        "## DML (Data Manipulation Language) ✏️\n\nDML changes the **data within** tables — adding, modifying, and removing rows. Master DML safely and you'll never accidentally wipe a production table.\n\n### INSERT — Adding Rows\n```sql\n-- Single row\nINSERT INTO products (id, name, price) VALUES (101, 'USB Hub', 499);\n\n-- Multiple rows at once (much faster than one-by-one)\nINSERT INTO products (id, name, price) VALUES\n  (102, 'Webcam', 2499),\n  (103, 'Desk Mat', 799);\n\n-- Insert from a SELECT\nINSERT INTO archive_orders SELECT * FROM orders WHERE status = 'cancelled';\n```\n\n### UPDATE — Changing Rows\n⚠️ **Critical Rule: ALWAYS use WHERE on UPDATE or you change every row!**\n```sql\n-- Safe update: changes only matching rows\nUPDATE products SET price = price * 1.1 WHERE category = 'Electronics';\n\n-- DANGER: changes ALL rows in the table\n-- UPDATE products SET price = 0;  -- Never do this without WHERE!\n```\nUse `RETURNING` (PostgreSQL/SQLite 3.35+) to see what was changed:\n```sql\nUPDATE products SET price = 999 WHERE id = 1 RETURNING id, name, price;\n```\n\n### DELETE — Removing Rows\n⚠️ **Critical Rule: ALWAYS use WHERE on DELETE or you erase all rows!**\n```sql\n-- Safe delete: removes only cancelled orders\nDELETE FROM orders WHERE status = 'cancelled' AND order_date < '2025-01-01';\n```\n\n### The Safe Pattern for Production\nBefore running a destructive UPDATE/DELETE, run a SELECT first with the same WHERE clause to see exactly which rows will be affected.",
      codeExample:
        "-- Step 1: INSERT a new product\nINSERT INTO products (id, name, category, price)\nVALUES (100, 'Smart Pen', 'Stationery', 1299);\n\n-- Step 2: UPDATE its price with a 10% discount\nUPDATE products SET price = price * 0.9 WHERE id = 100;\n\n-- Step 3: Verify the result\nSELECT id, name, price FROM products WHERE id = 100;",
      translations: {
        tamil: {
          title: "11. DML (INSERT / UPDATE / DELETE)",
          description: "conditions உடன் rows-ஐ பாதுகாப்பாக மாற்ற",
          category: "DML",
          content:
            "## DML (Data Manipulation Language)\n\nDML row data-ஐ மாற்றுகிறது.\n\n### Commands\n- `INSERT` புதிய rows சேர்க்க\n- `UPDATE` rows மாற்ற (அனைத்தையும் update செய்ய நினைக்கவில்லை என்றால் `WHERE` அவசியம்)\n- `DELETE` rows நீக்க\n\nTip: மாற்றம் செய்த பிறகு உடனே `SELECT` மூலம் verify செய்யலாம்.",
        },
        kannada: {
          title: "11. DML (INSERT / UPDATE / DELETE)",
          description: "conditions ಜೊತೆಗೆ rows ಅನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಬದಲಿಸಿ",
          category: "DML",
          content:
            "## DML (Data Manipulation Language)\n\nDML row data ಅನ್ನು ಬದಲಾಯಿಸುತ್ತದೆ.\n\n### Commands\n- `INSERT` ಹೊಸ rows ಸೇರಿಸಿ\n- `UPDATE` rows ಬದಲಿಸಿ (ಎಲ್ಲವನ್ನೂ update ಮಾಡಲು ಉದ್ದೇಶಿಸದಿದ್ದರೆ `WHERE` ಬಳಸಿ)\n- `DELETE` rows ಅಳಿಸಿ\n\nTip: ಬದಲಾವಣೆಗಳ ನಂತರ ತಕ್ಷಣ `SELECT` ಮೂಲಕ ಪರಿಶೀಲಿಸಿ.",
        },
        telugu: {
          title: "11. DML (INSERT / UPDATE / DELETE)",
          description: "conditions తో rows ని safe గా మార్చండి",
          category: "DML",
          content:
            "## DML (Data Manipulation Language)\n\nDML row data ని మార్చుతుంది.\n\n### Commands\n- `INSERT` కొత్త rows జోడించండి\n- `UPDATE` rows మార్చండి (అన్ని update చేయాలనుకోకపోతే తప్పకుండా `WHERE` వాడండి)\n- `DELETE` rows తొలగించండి\n\nTip: changes చేసిన వెంటనే `SELECT` తో verify చేయండి.",
        },
        hindi: {
          title: "11. DML (INSERT / UPDATE / DELETE)",
          description: "conditions के साथ rows को safely modify करें",
          category: "DML",
          content:
            "## DML (Data Manipulation Language)\n\nDML row data बदलता है.\n\n### Commands\n- `INSERT` rows जोड़ता है\n- `UPDATE` rows बदलता है (अगर सभी rows update नहीं करने हैं तो `WHERE` ज़रूर लगाएँ)\n- `DELETE` rows हटाता है\n\nTip: practice में changes के बाद तुरंत `SELECT` से verify करें.",
        },
      },
      exercises: {
        beginner: {
          prompt: "Insert a customer (id=101, Farah, Delhi) then select (name, city) for id=101.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "name,city\nFarah,Delhi",
          solution: "INSERT INTO customers(id, name, city, signup_date, phone) VALUES (101, 'Farah', 'Delhi', '2026-04-26', '+91-9876543299');\nSELECT name, city FROM customers WHERE id = 101;",
        },
        intermediate: {
          prompt: "Update order 3 from cancelled to completed, then count completed orders (count).",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "count\n14",
          solution: "UPDATE orders SET status = 'completed' WHERE id = 3;\nSELECT COUNT(*) AS count FROM orders WHERE status = 'completed';",
        },
        advanced: {
          prompt: "Delete order_items for order_id=3, then show total_qty for order 3 as 0 (use COALESCE).",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "total_qty\n0",
          solution: "DELETE FROM order_items WHERE order_id = 3;\nSELECT COALESCE(SUM(quantity), 0) AS total_qty FROM order_items WHERE order_id = 3;",
        },
      },
    },
    {
      id: "sql-transactions",
      title: "12. Transactions (TCL)",
      description: "BEGIN, COMMIT, ROLLBACK for safe changes",
      category: "Phase 4 — Database Engineering",
      content:
        "## Transactions (TCL) 🔒\n\nA transaction is a group of SQL statements that are executed as a **single, atomic unit** — either ALL succeed or ALL fail. This is the foundation of data integrity in real-world systems.\n\n### The ACID Properties\n| Property | Meaning | Example |\n|---|---|---|\n| **A**tomicity | All-or-nothing | Transfer: debit AND credit, or neither |\n| **C**onsistency | Data stays valid | Bank balance can't go negative |\n| **I**solation | Transactions don't interfere | Two users buying last item |\n| **D**urability | Committed data survives crashes | Power outage after COMMIT |\n\n### TCL Commands\n- `BEGIN` / `BEGIN TRANSACTION`: Starts a transaction block. All changes after this are temporary.\n- `COMMIT`: Makes all changes permanent. The transaction is complete.\n- `ROLLBACK`: Discards all changes since the last `BEGIN`. Rolls the database back to its previous state.\n- `SAVEPOINT name`: Creates a named checkpoint inside a transaction.\n- `ROLLBACK TO name`: Rolls back to a savepoint without discarding the entire transaction.\n\n### Real-world Example: Bank Transfer\n```sql\nBEGIN;\n  UPDATE accounts SET balance = balance - 5000 WHERE id = 1;  -- Debit sender\n  UPDATE accounts SET balance = balance + 5000 WHERE id = 2;  -- Credit receiver\n  -- If either fails, the whole block rolls back automatically\nCOMMIT;\n```\n\n### SQLite Auto-commit\nIn SQLite, every statement outside a transaction is automatically wrapped in its own `BEGIN...COMMIT`. This means changes are permanent immediately. Use `BEGIN` explicitly when you want to group multiple changes.",
      codeExample:
        "-- ROLLBACK demo: the change disappears\nBEGIN;\nUPDATE products SET price = 99999 WHERE name = 'Parker Pen';\n-- Oops, wrong price!\nROLLBACK;\n\n-- Verify price is unchanged\nSELECT name, price FROM products WHERE name = 'Parker Pen';",
      translations: {
        tamil: {
          title: "12. Transactions (TCL)",
          description: "BEGIN, COMMIT, ROLLBACK மூலம் safe changes",
          category: "Transactions (TCL)",
          content:
            "## Transactions\n\nபல changes-ஐ ஒரே group ஆக நடத்த transactions உதவும் — அனைத்தும் நடக்கும் அல்லது ஒன்றும் நடக்காது.\n\n### Commands\n- `BEGIN` / `BEGIN TRANSACTION`\n- `COMMIT` changes சேமிக்க\n- `ROLLBACK` changes திரும்பப்பெற\n\nPayments, inventory போன்ற real systems-ல் correctness-க்கு இது மிக அவசியம்.",
        },
        kannada: {
          title: "12. Transactions (TCL)",
          description: "BEGIN, COMMIT, ROLLBACK ಬಳಸಿ safe changes",
          category: "Transactions (TCL)",
          content:
            "## Transactions\n\nಬಹು changes ಅನ್ನು ಒಂದೇ group ಆಗಿ ಮಾಡಬಹುದು — ಎಲ್ಲವೂ ಆಗಬೇಕು ಅಥವಾ ಯಾವುದೂ ಆಗಬಾರದು.\n\n### Commands\n- `BEGIN` / `BEGIN TRANSACTION`\n- `COMMIT` changes ಉಳಿಸಿ\n- `ROLLBACK` changes ಹಿಂತೆಗೆದು\n\nPayments, inventory ಮುಂತಾದ real systems ನಲ್ಲಿ correctness ಗೆ ಇದು ಅಗತ್ಯ.",
        },
        telugu: {
          title: "12. Transactions (TCL)",
          description: "BEGIN, COMMIT, ROLLBACK తో safe changes",
          category: "Transactions (TCL)",
          content:
            "## Transactions\n\nచేంజెస్ ని ఒక గ్రూప్‌గా చేసి — అన్నీ జరగాలి లేదా ఏదీ జరగకూడదు అనేలా transactions సహాయపడతాయి.\n\n### Commands\n- `BEGIN` / `BEGIN TRANSACTION`\n- `COMMIT` changes save చేయండి\n- `ROLLBACK` changes undo చేయండి\n\nPayments, inventory వంటి real systems లో correctness కి ఇది చాలా అవసరం.",
        },
        hindi: {
          title: "12. Transactions (TCL)",
          description: "BEGIN, COMMIT, ROLLBACK से safe changes",
          category: "Transactions (TCL)",
          content:
            "## Transactions\n\nTransactions changes को group करते हैं ताकि या तो सभी changes हों या एक भी नहीं.\n\n### Commands\n- `BEGIN` / `BEGIN TRANSACTION`\n- `COMMIT` changes save करता है\n- `ROLLBACK` changes undo करता है\n\nPayments, inventory जैसे real systems में correctness के लिए यह ज़रूरी है.",
        },
      },
      exercises: {
        beginner: {
          prompt: "BEGIN; insert a customer (id=101); ROLLBACK; then count customers (count).",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "count\n15",
          solution: "BEGIN;\nINSERT INTO customers(id, name, city, signup_date, phone) VALUES (101, 'Farah', 'Delhi', '2026-04-26', '+91-9876543299');\nROLLBACK;\nSELECT COUNT(*) AS count FROM customers;",
        },
        intermediate: {
          prompt: "BEGIN; update Pen price to 9999; ROLLBACK; then select Pen price (price).",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "price\n500",
          solution: "BEGIN;\nUPDATE products SET price = 9999 WHERE name = 'Parker Pen';\nROLLBACK;\nSELECT price FROM products WHERE name = 'Parker Pen';",
        },
        advanced: {
          prompt: "BEGIN; update Pen price to 15; COMMIT; then select Pen price (price).",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "price\n15",
          solution: "BEGIN;\nUPDATE products SET price = 15 WHERE name = 'Parker Pen';\nCOMMIT;\nSELECT price FROM products WHERE name = 'Parker Pen';",
        },
      },
    },
    // ═══════════════════════════════════════════════════════
    // PHASE 4: PERFORMANCE & ARCHITECTURE (Modules 13–14)
    // Optimize queries and design robust database structures
    // ═══════════════════════════════════════════════════════
    {
      id: "sql-indexes",
      title: "13. Indexes & Performance Basics",
      description: "What indexes do and when to use them",
      category: "Phase 4 — Database Engineering",
      content:
        "## Indexes & Performance 🚀\n\nAn index is a **separate lookup structure** that the database maintains alongside a table. Like a book's index, it lets the database find rows without reading every single page.\n\n### Without an Index (Full Table Scan)\nThe database reads every row to find matches — `O(n)`. Fine for small tables, catastrophically slow for millions of rows.\n\n### With an Index (B-Tree Lookup)\nThe database jumps directly to the matching rows — `O(log n)`. Dramatically faster for large tables.\n\n### Creating & Dropping Indexes\n```sql\n-- Create: speed up queries filtering by customer_id\nCREATE INDEX idx_orders_customer ON orders(customer_id);\n\n-- Composite index: speeds up queries filtering by BOTH columns\nCREATE INDEX idx_orders_status_date ON orders(status, order_date);\n\n-- Unique index: enforces uniqueness AND provides a fast lookup\nCREATE UNIQUE INDEX idx_customers_email ON customers(email);\n\n-- Drop an index\nDROP INDEX idx_orders_customer;\n```\n\n### When to Create an Index\n✅ **Do index** columns that appear frequently in:\n- `WHERE` conditions (e.g., `WHERE customer_id = 5`)\n- `JOIN` `ON` clauses (foreign keys)\n- `ORDER BY` columns on large tables\n\n❌ **Avoid indexing**:\n- Columns with very few distinct values (e.g., a boolean `is_active` — an index barely helps)\n- Tables with very few rows\n- Columns that are updated extremely frequently (every write must also update the index)\n\n### Trade-offs\n| Factor | Without Index | With Index |\n|---|---|---|\n| SELECT speed | Slow (full scan) | Fast (tree lookup) |\n| INSERT/UPDATE/DELETE | Fast | Slightly slower |\n| Storage | None | Extra disk space |\n\n### Inspecting Indexes in SQLite\n```sql\nSELECT name, tbl_name\nFROM sqlite_master\nWHERE type = 'index';\n```",
      codeExample:
        "-- Create two indexes and inspect them\nCREATE INDEX idx_orders_customer ON orders(customer_id);\nCREATE INDEX idx_orders_status   ON orders(status);\n\n-- List all indexes on the 'orders' table\nSELECT name AS index_name, tbl_name AS on_table\nFROM sqlite_master\nWHERE type = 'index' AND tbl_name = 'orders'\nORDER BY name;",
      translations: {
        tamil: {
          title: "13. Indexes & Performance Basics",
          description: "indexes என்ன செய்கிறது, எப்போது பயன்படுத்த வேண்டும்",
          category: "Indexes",
          content:
            "## Indexes\n\nIndexes ஒரு கூடுதல் data structure உருவாக்கி lookups-ஐ வேகப்படுத்தும்.\n\n### முக்கிய idea\nReads வேகமாகும்; ஆனால் writes சில நேரம் மெதுவாகலாம்.\n\nSQLite-ல் `sqlite_master` மூலம் indexes-ஐ பார்க்கலாம்.",
        },
        kannada: {
          title: "13. Indexes & Performance Basics",
          description: "indexes ಏನು ಮಾಡುತ್ತವೆ ಮತ್ತು ಯಾವಾಗ ಬಳಸಿ",
          category: "Indexes",
          content:
            "## Indexes\n\nIndexes ಹೆಚ್ಚುವರಿ data structure ರಚಿಸಿ lookups ಅನ್ನು ವೇಗಗೊಳಿಸುತ್ತವೆ.\n\n### ಮುಖ್ಯ idea\nReads ವೇಗವಾಗುತ್ತವೆ; writes ಸ್ವಲ್ಪ ನಿಧಾನವಾಗಬಹುದು.\n\nSQLite ನಲ್ಲಿ `sqlite_master` ಮೂಲಕ indexes ನೋಡಬಹುದು.",
        },
        telugu: {
          title: "13. Indexes & Performance Basics",
          description: "indexes ఏమి చేస్తాయి, ఎప్పుడు వాడాలి",
          category: "Indexes",
          content:
            "## Indexes\n\nIndexes అదనపు data structure సృష్టించి lookups ని వేగంగా చేస్తాయి.\n\n### Key idea\nReads వేగంగా; కానీ writes కొద్దిగా నెమ్మదిగా కావచ్చు.\n\nSQLite లో `sqlite_master` తో indexes చూడచ్చు.",
        },
        hindi: {
          title: "13. Indexes & Performance Basics",
          description: "indexes क्या करते हैं और कब use करें",
          category: "Indexes",
          content:
            "## Indexes\n\nIndexes एक extra data structure बनाकर lookups को तेज़ करते हैं.\n\n### Key idea\nReads तेज़ होते हैं, लेकिन writes धीमे हो सकते हैं.\n\nSQLite में `sqlite_master` से indexes inspect कर सकते हैं.",
        },
      },
      exercises: {
        beginner: {
          prompt: "Create index idx_orders_customer on orders(customer_id) then list index names for orders (name).",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "name\nidx_orders_customer",
          solution: "CREATE INDEX idx_orders_customer ON orders(customer_id);\nSELECT name FROM sqlite_master WHERE type='index' AND tbl_name='orders' AND name = 'idx_orders_customer';",
        },
        intermediate: {
          prompt: "Create two indexes on orders: idx_orders_customer and idx_orders_status, then list them ordered by name.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "name\nidx_orders_customer\nidx_orders_status",
          solution: "CREATE INDEX idx_orders_customer ON orders(customer_id);\nCREATE INDEX idx_orders_status ON orders(status);\nSELECT name FROM sqlite_master WHERE type='index' AND tbl_name='orders' AND name LIKE 'idx_orders_%' ORDER BY name;",
        },
        advanced: {
          prompt: "After creating the two indexes, count how many indexes exist on orders (count).",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "count\n2",
          solution: "CREATE INDEX idx_orders_customer ON orders(customer_id);\nCREATE INDEX idx_orders_status ON orders(status);\nSELECT COUNT(*) AS count FROM sqlite_master WHERE type='index' AND tbl_name='orders' AND name LIKE 'idx_orders_%';",
        },
      },
    },
    {
      id: "sql-views",
      title: "14. Views",
      description: "Saved queries for reuse and simplicity",
      category: "Phase 4 — Database Engineering",
      content:
        "## Views 🔭\n\nA view is a **named, saved SELECT query** stored in the database. When you query a view, the database runs the underlying SELECT and returns the result. Think of it as a reusable window into your data.\n\n### Creating & Using Views\n```sql\n-- Create a view\nCREATE VIEW v_active_customers AS\nSELECT id, name, city\nFROM customers\nWHERE signup_date >= '2025-01-01';\n\n-- Query it like a regular table\nSELECT name FROM v_active_customers WHERE city = 'Delhi';\n\n-- Drop a view\nDROP VIEW v_active_customers;\n```\n\n### Why Use Views?\n- **Abstraction**: Hide complex JOIN logic behind a simple name. `SELECT * FROM v_order_details` is much cleaner than a 4-table JOIN every time.\n- **Security**: Grant users access to a view but NOT the underlying tables. Expose only the columns they should see.\n- **Consistency**: One place to update a query; all consumers get the fix automatically.\n- **Reusability**: Reference the same view across dozens of reports.\n\n### Views vs CTEs\n| Feature | View | CTE |\n|---|---|---|\n| Persists after query | ✅ Yes | ❌ No |\n| Reusable across sessions | ✅ Yes | ❌ No |\n| Supports parameters | ❌ No | ❌ No |\n| Good for one-off complex queries | ❌ | ✅ |\n\n### Updatable Views\nIn some databases (PostgreSQL, MySQL), you can `INSERT`, `UPDATE`, or `DELETE` through a simple view. SQLite supports this for single-table views without aggregations.\n\n### Inspecting Views in SQLite\n```sql\nSELECT name, sql FROM sqlite_master WHERE type = 'view';\n```",
      codeExample:
        "-- Create a view encapsulating a 3-table JOIN\nCREATE VIEW v_order_summary AS\nSELECT\n  o.id        AS order_id,\n  c.name      AS customer,\n  o.status,\n  SUM(p.price * oi.quantity) AS total\nFROM orders o\nJOIN customers c   ON c.id = o.customer_id\nJOIN order_items oi ON oi.order_id = o.id\nJOIN products p    ON p.id = oi.product_id\nGROUP BY o.id, c.name, o.status;\n\n-- Use it like a table\nSELECT customer, total\nFROM v_order_summary\nWHERE status = 'completed'\nORDER BY total DESC\nLIMIT 3;",
      translations: {
        tamil: {
          title: "14. Views",
          description: "மீண்டும் பயன்படுத்த saved queries",
          category: "Views",
          content:
            "## Views\n\nView என்பது saved query — இது virtual table போல செயல்படும்.\n\n### ஏன் views?\n- பொதுவான joins-ஐ மீண்டும் பயன்படுத்த\n- reporting queries-ஐ எளிமைப்படுத்த\n- application queries-ஐ சுத்தமாக வைத்திருக்க",
        },
        kannada: {
          title: "14. Views",
          description: "ಮರುಬಳಕೆಗೆ saved queries",
          category: "Views",
          content:
            "## Views\n\nView ಒಂದು saved query — ಇದು virtual table처럼 ವರ್ತಿಸುತ್ತದೆ.\n\n### Views ಯಾಕೆ?\n- ಸಾಮಾನ್ಯ joins ಅನ್ನು ಮರುಬಳಕೆ ಮಾಡಿ\n- reporting queries ಸರಳಗೊಳಿಸಿ\n- application queries ಕ್ಲೀನ್ ಆಗಿರಲಿ",
        },
        telugu: {
          title: "14. Views",
          description: "reuse కోసం saved queries",
          category: "Views",
          content:
            "## Views\n\nView అనేది saved query — ఇది virtual table లా పనిచేస్తుంది.\n\n### Views ఎందుకు?\n- common joins ని reuse చేయండి\n- reporting queries ని సింపుల్ చేయండి\n- application queries ని clean గా ఉంచండి",
        },
        hindi: {
          title: "14. Views",
          description: "reuse और simplicity के लिए saved queries",
          category: "Views",
          content:
            "## Views\n\nView एक saved query है जो virtual table की तरह काम करता है.\n\n### Views क्यों?\n- common joins reuse करें\n- reporting queries आसान बनाएं\n- application queries को clean रखें",
        },
      },
      exercises: {
        beginner: {
          prompt: "Create view v_completed_orders (orders + customers for completed) then select first 2 rows (order_id, name) ordered by order_id.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "order_id,name\n1,Alice Johnson\n2,Bob Sharma",
          solution: "CREATE VIEW v_completed_orders AS\nSELECT o.id AS order_id, c.name\nFROM orders o\nJOIN customers c ON o.customer_id = c.id\nWHERE o.status = 'completed';\n\nSELECT order_id, name FROM v_completed_orders ORDER BY order_id LIMIT 2;",
        },
        intermediate: {
          prompt: "Create view v_customer_spend (name,total_spent for completed) then list customers with total_spent > 2000 ordered by total_spent DESC.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "name,total_spent\nBob Sharma,9400\nAlice Johnson,9000\nHannah Abbott,6700\nKevin Hart,3900\nFiona Apple,3800\nOscar Wilde,2900\nMike Ross,2800",
          solution: "CREATE VIEW v_customer_spend AS\nSELECT c.name, SUM(p.price * oi.quantity) AS total_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nJOIN order_items oi ON o.id = oi.order_id\nJOIN products p ON oi.product_id = p.id\nWHERE o.status = 'completed'\nGROUP BY c.name;\n\nSELECT name, total_spent FROM v_customer_spend WHERE total_spent > 2000 ORDER BY total_spent DESC;",
        },
        advanced: {
          prompt: "Create then DROP view v_customer_spend, then verify it no longer exists (count).",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "count\n0",
          solution: "CREATE VIEW v_customer_spend AS SELECT name FROM customers;\nDROP VIEW v_customer_spend;\nSELECT COUNT(*) AS count FROM sqlite_master WHERE type='view' AND name='v_customer_spend';",
        },
      },
    },
  ];
}

function linuxMastery(): CareerLesson[] {
  return [
    {
      id: "linux-best-practices",
      title: "0. Best Practices & Classic Mistakes",
      description: "Dos, Don'ts, and what to avoid in Linux",
      category: "Foundations",
      content:
        "## The Golden Rules of Linux 🐧\n\nBefore taking control of a Linux server, you must learn how to not break it.\n\n### DOs (What you should use)\n- **DO** use `sudo` only when absolutely necessary. Default to a regular user.\n- **DO** use `man <command>` to read the manual before running an unknown command.\n- **DO** make backups of configuration files before editing them (e.g., `cp config config.bak`).\n\n### DON'Ts (Classic Mistakes)\n- **DON'T** blindly copy and paste curl-to-bash scripts from the internet into your terminal.\n- **DON'T** ever run `rm -rf /` or blindly use wildcards with `rm` (e.g., `rm -rf *`).\n- **DON'T** log in as `root` via SSH. Disable root SSH login immediately.",
      codeExample:
        "# DO: Make a backup before editing\n# cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak\n# nano /etc/ssh/sshd_config\n\n# DON'T: Edit system files blindly without backup",
      exercises: {
        beginner: { type: "quiz", prompt: "What should you do before running an unfamiliar command you found online?", options: ["Run it with sudo", "Read the manual (man page) first", "Run it in the background"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { prompt: "Print 'Make backups first'.", starterCode: "echo '___'", expectedOutput: "Make backups first" },
        advanced: { prompt: "Print 'Never copy paste blindly'.", starterCode: "echo '___'", expectedOutput: "Never copy paste blindly" },
      },
    },
    {
      id: "linux-01-intro",
      title: "1. Intro to Linux",
      description: "Kernel vs OS, Distros, and Open Source",
      content: `## Welcome to Linux

Linux is the backbone of modern computing. It powers everything from Android phones to the world's most powerful supercomputers and AWS servers.

### Key Concepts
- **The Kernel**: The core of the OS that talks to hardware.
- **Distributions (Distros)**: Versions of Linux like Ubuntu, Debian, CentOS, or Fedora.
- **Open Source**: The source code is free to study, modify, and distribute.

### Why Learn It?
In most dev jobs, your code will run on a Linux server. Understanding Linux is non-negotiable for professional developers.`,
      codeExample: `$ uname -a
Linux pymaster-vm 5.15.0-91-generic`,
      translations: {
        tamil: {
          title: "1. Linux அறிமுகம்",
          description: "Kernel vs OS, Distros மற்றும் Open Source",
          content:
            "## Linux-க்கு வரவேற்கிறோம்\n\nLinux என்பது modern computing-ன் backbone. Android முதல் supercomputers வரை, cloud servers வரை Linux இயங்குகிறது.\n\n### முக்கிய கருத்துகள்\n- **Kernel**: hardware-ஐ பேசும் OS-ன் core\n- **Distros**: Ubuntu, Debian போன்ற Linux versions\n- **Open Source**: source code-ஐ பார்க்க/மாற்ற/விநியோகிக்க முடியும்\n\n### ஏன் Linux கற்க வேண்டும்?\nபெரும்பாலான dev jobs-ல் உங்கள் code Linux server-ல் ஓடும். Linux தெரிந்திருக்க வேண்டும்.",
        },
        kannada: {
          title: "1. Linux ಪರಿಚಯ",
          description: "Kernel vs OS, Distros, ಮತ್ತು Open Source",
          content:
            "## Linux ಗೆ ಸ್ವಾಗತ\n\nLinux modern computing ನ backbone. Android ನಿಂದ supercomputers ಮತ್ತು cloud servers ತನಕ Linux ಚಾಲಿತ.\n\n### ಮುಖ್ಯ ಕಲ್ಪನೆಗಳು\n- **Kernel**: hardware ಜೊತೆ ಮಾತನಾಡುವ OS ನ core\n- **Distros**: Ubuntu, Debian ಮುಂತಾದ Linux versions\n- **Open Source**: source code ನೋಡಲು/ಬದಲಿಸಲು/ಹಂಚಲು ಸಾಧ್ಯ\n\n### Linux ಯಾಕೆ ಕಲಿಯಬೇಕು?\nಬಹುತೇಕ dev jobs ನಲ್ಲಿ ನಿಮ್ಮ code Linux server ನಲ್ಲಿ ಓಡುತ್ತದೆ. Linux ತಿಳಿದಿರಬೇಕು.",
        },
        telugu: {
          title: "1. Linux పరిచయం",
          description: "Kernel vs OS, Distros, మరియు Open Source",
          content:
            "## Linux కి స్వాగతం\n\nLinux modern computing కి backbone. Android నుండి supercomputers, cloud servers వరకు Linux పనిచేస్తుంది.\n\n### ముఖ్య కాన్సెప్ట్స్\n- **Kernel**: hardware తో మాట్లాడే OS core\n- **Distros**: Ubuntu, Debian వంటి Linux versions\n- **Open Source**: source code చూడ/మార్చ/పంచుకోవచ్చు\n\n### ఎందుకు Linux నేర్చుకోవాలి?\nచాలా dev jobs లో మీ code Linux server లోనే రన్ అవుతుంది. Linux తెలిసి ఉండాలి.",
        },
        hindi: {
          title: "1. Linux परिचय",
          description: "Kernel vs OS, Distros और Open Source",
          content:
            "## Linux में आपका स्वागत है\n\nLinux modern computing की backbone है। Android से लेकर supercomputers और cloud servers तक Linux चलता है।\n\n### Key concepts\n- **Kernel**: OS का core जो hardware से बात करता है\n- **Distros**: Ubuntu, Debian जैसे Linux versions\n- **Open Source**: source code देख/बदल/वितरित कर सकते हैं\n\n### Linux क्यों सीखें?\nज्यादातर dev jobs में आपका code Linux server पर चलता है। Linux जानना ज़रूरी है।",
        },
      },
      exercises: {
        beginner: { prompt: "Check your Linux kernel version using uname.", starterCode: "", expectedOutput: "uname -a" },
        intermediate: { prompt: "Display the short OS name.", starterCode: "", expectedOutput: "uname" },
        advanced: { prompt: "Identify who is currently logged in.", starterCode: "", expectedOutput: "whoami" },
      },
    },
    {
      id: "linux-02-install",
      title: "2. Installation & Setup",
      description: "VM, Dual Boot, and WSL",
      content: `## Getting Linux

You don't need to delete Windows to use Linux. Here are the 3 best ways to start:

1. **WSL (Windows Subsystem for Linux)**: Install a Linux terminal right inside Windows. Run \`wsl --install\` in PowerShell.
2. **Virtual Machine (VM)**: Use 'VirtualBox' to run Linux in a window like a regular app.
3. **Dual Boot**: Install Linux on a separate partition next to Windows.

### First Command: Updating
Once installed, your first step is always to update the software list.`,
      codeExample: "$ sudo apt update",
      translations: {
        tamil: {
          title: "2. Installation & Setup",
          description: "VM, Dual Boot, மற்றும் WSL",
          content:
            "## Linux பெறுவது\n\nWindows-ஐ delete செய்ய வேண்டாம். ஆரம்பிக்க 3 நல்ல வழிகள்:\n\n1. **WSL**: Windows-உள்ளே Linux terminal.\n2. **Virtual Machine (VM)**: VirtualBox மூலம் Linux-ஐ window-ல் ஓட்ட.\n3. **Dual Boot**: தனி partition-ல் Linux.\n\n### முதல் command\nInstall ஆனதும் முதலில் package list update செய்யுங்கள்.",
        },
        kannada: {
          title: "2. Installation & Setup",
          description: "VM, Dual Boot, ಮತ್ತು WSL",
          content:
            "## Linux ಪಡೆಯುವುದು\n\nWindows ಅಳಿಸುವ ಅಗತ್ಯವಿಲ್ಲ. ಆರಂಭಿಸಲು 3 ಉತ್ತಮ ಮಾರ್ಗಗಳು:\n\n1. **WSL**: Windows ಒಳಗೆ Linux terminal.\n2. **Virtual Machine (VM)**: VirtualBox ಮೂಲಕ Linux ಅನ್ನು window ನಲ್ಲಿ ಓಡಿಸಿ.\n3. **Dual Boot**: ಬೇರೆ partition ನಲ್ಲಿ Linux.\n\n### ಮೊದಲ command\nInstall ಆದ ನಂತರ ಮೊದಲು package list update ಮಾಡಿ.",
        },
        telugu: {
          title: "2. Installation & Setup",
          description: "VM, Dual Boot, మరియు WSL",
          content:
            "## Linux ఇన్‌స్టాల్ చేయడం\n\nWindows ని తొలగించాల్సిన అవసరం లేదు. మొదలుపెట్టడానికి 3 బెస్ట్ మార్గాలు:\n\n1. **WSL**: Windows లోనే Linux terminal.\n2. **Virtual Machine (VM)**: VirtualBox తో Linux ని window లో రన్ చేయండి.\n3. **Dual Boot**: వేరే partition లో Linux.\n\n### First command\nInstall తర్వాత ముందుగా package list update చేయండి.",
        },
        hindi: {
          title: "2. Installation & Setup",
          description: "VM, Dual Boot और WSL",
          content:
            "## Linux कैसे शुरू करें\n\nWindows हटाने की ज़रूरत नहीं। शुरू करने के 3 तरीके:\n\n1. **WSL**: Windows के अंदर Linux terminal.\n2. **Virtual Machine (VM)**: VirtualBox में Linux चलाएँ.\n3. **Dual Boot**: अलग partition में Linux.\n\n### First command\nInstall के बाद सबसे पहले package list update करें.",
        },
      },
      exercises: {
        beginner: { prompt: "Update your package list using sudo and apt.", starterCode: "", expectedOutput: "sudo apt update" },
        intermediate: { prompt: "Upgrade all your installed software packages.", starterCode: "", expectedOutput: "sudo apt upgrade" },
        advanced: { prompt: "Check if the system needs a reboot after update.", starterCode: "", expectedOutput: "ls /var/run/reboot-required" },
      },
    },
    {
      id: "linux-03-shell",
      title: "3. The Shell & Terminal",
      description: "Bash, Keyboard hacks, and History",
      content: `## The Command Line

The **Shell** (usually \`bash\`) is the program that interprets your commands. The **Terminal** is the window where you type them.

### Pro Shortcuts
- \`Tab\`: Auto-completes filenames and commands.
- \`Ctrl + C\`: Stops a hanging process.
- \`Ctrl + L\`: Clears the screen.
- \`Up/Down Arrows\`: Cycles through your command history.

### History
Linux remembers everything you type.`,
      codeExample: `$ history
  1  ls
  2  cd Documents
  3  python3 app.py`,
      translations: {
        tamil: {
          title: "3. Shell & Terminal",
          description: "Bash, shortcuts, மற்றும் history",
          content:
            "## Command Line\n\n**Shell** (பொதுவாக `bash`) என்பது command-ஐ interpret செய்யும் program. **Terminal** என்பது நீங்கள் type செய்யும் window.\n\n### Shortcuts\n- `Tab` auto-complete\n- `Ctrl + C` process stop\n- `Ctrl + L` clear screen\n- Arrow keys history\n\n### History\nLinux நீங்கள் type செய்த commands-ஐ நினைவில் வைத்திருக்கும்.",
        },
        kannada: {
          title: "3. Shell & Terminal",
          description: "Bash, shortcuts, ಮತ್ತು history",
          content:
            "## Command Line\n\n**Shell** (ಸಾಮಾನ್ಯವಾಗಿ `bash`) command ಅನ್ನು interpret ಮಾಡುತ್ತದೆ. **Terminal** ನೀವು type ಮಾಡುವ window.\n\n### Shortcuts\n- `Tab` auto-complete\n- `Ctrl + C` process stop\n- `Ctrl + L` clear\n- Arrow keys history\n\n### History\nLinux ನೀವು type ಮಾಡಿದ commands ಅನ್ನು ನೆನಪಿಟ್ಟುಕೊಳ್ಳುತ್ತದೆ.",
        },
        telugu: {
          title: "3. Shell & Terminal",
          description: "Bash, shortcuts, మరియు history",
          content:
            "## Command Line\n\n**Shell** (సాధారణంగా `bash`) command ని interpret చేస్తుంది. **Terminal** మీరు type చేసే window.\n\n### Shortcuts\n- `Tab` auto-complete\n- `Ctrl + C` process stop\n- `Ctrl + L` clear\n- Arrow keys history\n\n### History\nLinux మీరు టైప్ చేసిన commands ని గుర్తుంచుకుంటుంది.",
        },
        hindi: {
          title: "3. Shell & Terminal",
          description: "Bash, shortcuts और history",
          content:
            "## Command Line\n\n**Shell** (आमतौर पर `bash`) command interpret करता है। **Terminal** वह window है जहाँ आप type करते हैं।\n\n### Shortcuts\n- `Tab` auto-complete\n- `Ctrl + C` process stop\n- `Ctrl + L` clear\n- Arrow keys history\n\n### History\nLinux आपके typed commands याद रखता है।",
        },
      },
      exercises: {
        beginner: { prompt: "Clear the terminal screen using a command.", starterCode: "", expectedOutput: "clear" },
        intermediate: { prompt: "Show your command history.", starterCode: "", expectedOutput: "history" },
        advanced: { prompt: "Print 'Linux is Power' to the terminal.", starterCode: "", expectedOutput: "echo \"Linux is Power\"" },
      },
    },
    {
      id: "linux-04-hierarchy",
      title: "4. Filesystem Hierarchy",
      description: "The tree: / vs C:\\",
      content: `## The Linux Tree

Unlike Windows, Linux has no 'C:' drive. Everything starts at the **Root** (\`/\`).

### Key Folders
- \`/bin\`: Core binaries (commands like \`ls\`, \`cp\`).
- \`/etc\`: Configuration files (the 'Brain' of the system).
- \`/home\`: Personal files for all users.
- \`/var/log\`: Where the system stores logs.
- \`/tmp\`: Temporary files (wiped on reboot).`,
      codeExample: `$ ls /etc`,
      translations: {
        tamil: {
          title: "4. Filesystem Hierarchy",
          description: "Tree: / vs C:\\",
          content:
            "## Linux Tree\n\nWindows போல `C:` drive இல்லை. எல்லாமே **Root** (`/`) இருந்து தொடங்கும்.\n\n### முக்கிய folders\n- `/bin` core commands\n- `/etc` config files\n- `/home` user files\n- `/var/log` logs\n- `/tmp` temp files\n\nஇந்த structure தெரிந்தால் server-ல் வேலை செய்ய எளிதாகும்.",
        },
        kannada: {
          title: "4. Filesystem Hierarchy",
          description: "Tree: / vs C:\\",
          content:
            "## Linux Tree\n\nWindows ನಂತೆ `C:` drive ಇಲ್ಲ. ಎಲ್ಲವೂ **Root** (`/`) ಇಂದ ಶುರು.\n\n### ಮುಖ್ಯ folders\n- `/bin` core commands\n- `/etc` config files\n- `/home` user files\n- `/var/log` logs\n- `/tmp` temp files\n\nಈ structure ತಿಳಿದರೆ server ನಲ್ಲಿ ಕೆಲಸ ಸುಲಭ.",
        },
        telugu: {
          title: "4. Filesystem Hierarchy",
          description: "Tree: / vs C:\\",
          content:
            "## Linux Tree\n\nWindows లా `C:` drive లేదు. అన్నీ **Root** (`/`) నుంచే ప్రారంభం.\n\n### ముఖ్య folders\n- `/bin` core commands\n- `/etc` config files\n- `/home` user files\n- `/var/log` logs\n- `/tmp` temp files\n\nఈ structure తెలుసుకుంటే server పని సులభం.",
        },
        hindi: {
          title: "4. Filesystem Hierarchy",
          description: "Tree: / vs C:\\",
          content:
            "## Linux Tree\n\nWindows की तरह `C:` drive नहीं होता। सब कुछ **Root** (`/`) से शुरू होता है।\n\n### मुख्य folders\n- `/bin` core commands\n- `/etc` config files\n- `/home` user files\n- `/var/log` logs\n- `/tmp` temp files\n\nयह structure समझना server work के लिए ज़रूरी है।",
        },
      },
      exercises: {
        beginner: { prompt: "List the contents of the root directory /", starterCode: "", expectedOutput: "ls /" },
        intermediate: { prompt: "List content of the configuration folder etc.", starterCode: "", expectedOutput: "ls /etc" },
        advanced: { prompt: "Navigate to the bin directory.", starterCode: "", expectedOutput: "cd /bin" },
      },
    },
    {
      id: "linux-05-nav",
      title: "5. Navigation Mastery",
      description: "Absolute vs Relative paths",
      content: `## Moving Around

- \`pwd\`: Print Working Directory (Where am I?).
- \`cd\`: Change Directory.
- \`~\`: Shortcut for your HOME folder.
- \`..\`: Move up one level.

### Absolute vs Relative
- **Absolute**: Starts from root (\`/\`). Works anywhere.
- **Relative**: Starts from where you are (\`notes\`).`,
      codeExample: `$ pwd
/home/learner
$ cd Documents
$ cd ..`,
      translations: {
        tamil: {
          title: "5. Navigation Mastery",
          description: "Absolute vs Relative paths",
          content:
            "## Moving Around\n\n- `pwd` — நீங்கள் எங்கே இருக்கிறீர்கள்\n- `cd` — directory மாற்ற\n- `~` — home shortcut\n- `..` — ஒரு level மேலே\n\n### Absolute vs Relative\n- **Absolute**: `/` இருந்து தொடங்கும்\n- **Relative**: current folder-இல் இருந்து தொடங்கும்",
        },
        kannada: {
          title: "5. Navigation Mastery",
          description: "Absolute vs Relative paths",
          content:
            "## Moving Around\n\n- `pwd` — ನೀವು ಎಲ್ಲಿದ್ದೀರೋ\n- `cd` — directory ಬದಲಿಸಿ\n- `~` — home shortcut\n- `..` — ಒಂದು level ಮೇಲಕ್ಕೆ\n\n### Absolute vs Relative\n- **Absolute**: `/` ಇಂದ\n- **Relative**: current folder ಇಂದ",
        },
        telugu: {
          title: "5. Navigation Mastery",
          description: "Absolute vs Relative paths",
          content:
            "## Moving Around\n\n- `pwd` — మీరు ఎక్కడ ఉన్నారు\n- `cd` — directory మార్చండి\n- `~` — home shortcut\n- `..` — ఒక level పైకి\n\n### Absolute vs Relative\n- **Absolute**: `/` నుండి\n- **Relative**: current folder నుండి",
        },
        hindi: {
          title: "5. Navigation Mastery",
          description: "Absolute vs Relative paths",
          content:
            "## Moving Around\n\n- `pwd` — आप कहाँ हैं\n- `cd` — directory बदलें\n- `~` — home shortcut\n- `..` — एक level ऊपर\n\n### Absolute vs Relative\n- **Absolute**: `/` से शुरू\n- **Relative**: current folder से शुरू",
        },
      },
      exercises: {
        beginner: { prompt: "Check which directory you are currently in.", starterCode: "", expectedOutput: "pwd" },
        intermediate: { prompt: "Go to your home directory using the ~ shortcut.", starterCode: "", expectedOutput: "cd ~" },
        advanced: { prompt: "Go up two levels in the directory tree.", starterCode: "", expectedOutput: "cd ../.." },
      },
    },
    {
      id: "linux-06-filemgmt",
      title: "6. File Management",
      description: "Create, Copy, Move, and Delete",
      content: `## Managing Data

- \`touch\`: Create a new empty file.
- \`mkdir\`: Create a new folder.
- \`cp\`: Copy a file.
- \`mv\`: Move or Rename a file.
- \`rm\`: Remove (Delete) a file.

### Pro Tip
To delete a folder and everything inside it, use \`rm -rf\` (Be careful!).`,
      codeExample: `$ mkdir project
$ touch project/main.py
$ cp project/main.py backup.py`,
      translations: {
        tamil: {
          title: "6. File Management",
          description: "Create, Copy, Move, Delete",
          content:
            "## Files & Folders\n\n- `touch` file உருவாக்க\n- `mkdir` folder உருவாக்க\n- `cp` copy\n- `mv` move/rename\n- `rm` delete\n\n⚠️ `rm -rf` folder+உள்ளடக்கம் அனைத்தும் delete. கவனமாக.",
        },
        kannada: {
          title: "6. File Management",
          description: "Create, Copy, Move, Delete",
          content:
            "## Files & Folders\n\n- `touch` file create\n- `mkdir` folder create\n- `cp` copy\n- `mv` move/rename\n- `rm` delete\n\n⚠️ `rm -rf` folder ಮತ್ತು ಒಳಗಿನ ಎಲ್ಲವೂ delete. ಜಾಗ್ರತೆ.",
        },
        telugu: {
          title: "6. File Management",
          description: "Create, Copy, Move, Delete",
          content:
            "## Files & Folders\n\n- `touch` file create\n- `mkdir` folder create\n- `cp` copy\n- `mv` move/rename\n- `rm` delete\n\n⚠️ `rm -rf` folder + అంతా delete. జాగ్రత్త.",
        },
        hindi: {
          title: "6. File Management",
          description: "Create, Copy, Move, Delete",
          content:
            "## Files & Folders\n\n- `touch` file बनाए\n- `mkdir` folder बनाए\n- `cp` copy\n- `mv` move/rename\n- `rm` delete\n\n⚠️ `rm -rf` folder और अंदर सब delete कर देता है — सावधान।",
        },
      },
      exercises: {
        beginner: { prompt: "Create a new file called README.md", starterCode: "", expectedOutput: "touch README.md" },
        intermediate: { prompt: "Create a directory called 'assets'.", starterCode: "", expectedOutput: "mkdir assets" },
        advanced: { prompt: "Forcefully remove a directory called 'tmp' and its contents.", starterCode: "", expectedOutput: "rm -rf tmp" },
      },
    },
    {
      id: "linux-07-viewing",
      title: "7. Viewing & Reading",
      description: "cat, less, head, and tail",
      content: `## Reading Files

You don't always need to open an editor to see what's in a file.

- \`cat\`: Print the whole file to terminal (Good for small files).
- \`less\`: Open the file in a scrollable view (Press 'q' to quit).
- \`head\`: See the first 10 lines.
- \`tail\`: See the last 10 lines (Great for checking logs!).`,
      codeExample: `$ cat .bashrc
$ tail -n 20 /var/log/syslog`,
      translations: {
        tamil: {
          title: "7. Viewing & Reading",
          description: "cat, less, head, tail",
          content:
            "## Reading Files\n\n- `cat` முழு file print (small files)\n- `less` scroll view (`q` quit)\n- `head` முதல் lines\n- `tail` கடைசி lines / logs\n- `tail -f` real-time logs",
        },
        kannada: {
          title: "7. Viewing & Reading",
          description: "cat, less, head, tail",
          content:
            "## Reading Files\n\n- `cat` ಸಂಪೂರ್ಣ file print (small)\n- `less` scroll view (`q` quit)\n- `head` ಮೊದಲ lines\n- `tail` ಕೊನೆಯ lines / logs\n- `tail -f` real-time logs",
        },
        telugu: {
          title: "7. Viewing & Reading",
          description: "cat, less, head, tail",
          content:
            "## Reading Files\n\n- `cat` మొత్తం file print (small)\n- `less` scroll view (`q` quit)\n- `head` మొదటి lines\n- `tail` చివరి lines / logs\n- `tail -f` real-time logs",
        },
        hindi: {
          title: "7. Viewing & Reading",
          description: "cat, less, head, tail",
          content:
            "## Reading Files\n\n- `cat` पूरा file print (small)\n- `less` scroll view (`q` quit)\n- `head` शुरुआती lines\n- `tail` आख़िरी lines / logs\n- `tail -f` real-time logs",
        },
      },
      exercises: {
        beginner: { prompt: "Print the contents of README.md to the terminal.", starterCode: "", expectedOutput: "cat README.md" },
        intermediate: { prompt: "View the first 5 lines of a file named 'data.txt'.", starterCode: "", expectedOutput: "head -n 5 data.txt" },
        advanced: { prompt: "Follow a log file in real-time as it updates (stream logs).", starterCode: "", expectedOutput: "tail -f syslog" },
      },
    },
    {
      id: "linux-08-editors",
      title: "8. Nano & Vim basics",
      description: "Editing files in the terminal",
      content: `## Terminal Editors

If you are on a remote server, you won't have VS Code. You must know these:

1. **Nano**: The easy one. Text stays at the bottom identifying shortcuts like \`^O\` (Save) and \`^X\` (Exit).
2. **Vim**: The pro choice. It has modes. Press \`i\` to type, \`Esc\` to stop, and \`:wq\` to save and quit.

### Escape from Vim
If you get stuck, hit \`Esc\` then type \`:q!\` to quit without saving.`,
      codeExample: `$ nano config.txt
$ vim app.py`,
      translations: {
        tamil: {
          title: "8. Nano & Vim basics",
          description: "Terminal-ல் files edit",
          content:
            "## Terminal Editors\n\nRemote server-ல் VS Code இருக்காது; இந்த editors தெரிந்திருக்க வேண்டும்.\n\n- **Nano**: எளிது (`^O` save, `^X` exit)\n- **Vim**: modes உள்ளது (`i` type, `Esc`, `:wq` save+quit)\n\nVim-ல் சிக்கினால்: `Esc` → `:q!`",
        },
        kannada: {
          title: "8. Nano & Vim basics",
          description: "Terminal ನಲ್ಲಿ files edit",
          content:
            "## Terminal Editors\n\nRemote server ನಲ್ಲಿ VS Code ಇರದೇ ಇರಬಹುದು; ಈ editors ತಿಳಿದಿರಬೇಕು.\n\n- **Nano**: ಸುಲಭ (`^O` save, `^X` exit)\n- **Vim**: modes (`i` type, `Esc`, `:wq` save+quit)\n\nVim ನಲ್ಲಿ stuck ಆದರೆ: `Esc` → `:q!`",
        },
        telugu: {
          title: "8. Nano & Vim basics",
          description: "Terminal లో files edit",
          content:
            "## Terminal Editors\n\nRemote server లో VS Code ఉండకపోవచ్చు; ఈ editors తెలుసుకోండి.\n\n- **Nano**: సులువు (`^O` save, `^X` exit)\n- **Vim**: modes (`i` type, `Esc`, `:wq` save+quit)\n\nVim లో stuck అయితే: `Esc` → `:q!`",
        },
        hindi: {
          title: "8. Nano & Vim basics",
          description: "Terminal में files edit करना",
          content:
            "## Terminal Editors\n\nRemote server पर VS Code नहीं होता; ये editors जानना ज़रूरी है।\n\n- **Nano**: आसान (`^O` save, `^X` exit)\n- **Vim**: modes (`i` type, `Esc`, `:wq` save+quit)\n\nVim में फँस जाएँ: `Esc` → `:q!`",
        },
      },
      exercises: {
        beginner: { prompt: "Open a file named 'app.py' with the nano editor.", starterCode: "", expectedOutput: "nano app.py" },
        intermediate: { prompt: "Open the same file with vim.", starterCode: "", expectedOutput: "vim app.py" },
        advanced: { prompt: "Exit vim saving your changes (command).", starterCode: "", expectedOutput: ":wq" },
      },
    },
    {
      id: "linux-09-users",
      title: "9. Users & Groups",
      description: "/etc/passwd and management",
      content: `## Multi-user System

Linux is built to handle many users at once. 

- \`whoami\`: Who am I?
- \`id\`: Detailed info about your user and groups.
- \`/etc/passwd\`: The file where all user accounts are listed.
- \`adduser\`: Add a new human user.
- \`groupadd\`: Create a team (group).`,
      codeExample: `$ id
uid=1000(learner) gid=1000(learner)`,
      translations: {
        tamil: {
          title: "9. Users & Groups",
          description: "/etc/passwd மற்றும் management",
          content:
            "## Multi-user System\n\nLinux பல users-ஐ handle செய்ய வடிவமைக்கப்பட்டது.\n\n- `whoami` — நான் யார்\n- `id` — user + groups info\n- `/etc/passwd` — user accounts list\n- `adduser` — புதிய user\n- `groupadd` — புதிய group",
        },
        kannada: {
          title: "9. Users & Groups",
          description: "/etc/passwd ಮತ್ತು management",
          content:
            "## Multi-user System\n\nLinux ಹಲವು users ಅನ್ನು handle ಮಾಡಲು ಮಾಡಲಾಗಿದೆ.\n\n- `whoami` — ನಾನು ಯಾರು\n- `id` — user + groups info\n- `/etc/passwd` — user accounts list\n- `adduser` — ಹೊಸ user\n- `groupadd` — ಹೊಸ group",
        },
        telugu: {
          title: "9. Users & Groups",
          description: "/etc/passwd మరియు management",
          content:
            "## Multi-user System\n\nLinux అనేక users ని handle చేయడానికి రూపొందించబడింది.\n\n- `whoami` — నేను ఎవరు\n- `id` — user + groups info\n- `/etc/passwd` — user accounts list\n- `adduser` — కొత్త user\n- `groupadd` — కొత్త group",
        },
        hindi: {
          title: "9. Users & Groups",
          description: "/etc/passwd और management",
          content:
            "## Multi-user System\n\nLinux कई users को handle करने के लिए बनाया गया है।\n\n- `whoami` — मैं कौन\n- `id` — user + groups info\n- `/etc/passwd` — user accounts list\n- `adduser` — नया user\n- `groupadd` — नया group",
        },
      },
      exercises: {
        beginner: { prompt: "Display your user ID and groups.", starterCode: "", expectedOutput: "id" },
        intermediate: { prompt: "Add a new user named 'guest'.", starterCode: "", expectedOutput: "sudo adduser guest" },
        advanced: { prompt: "Show the last 5 lines of the user password file.", starterCode: "", expectedOutput: "tail -n 5 /etc/passwd" },
      },
    },
    {
      id: "linux-10-permissions",
      title: "10. Permissions Deep Dive",
      description: "rwx and Octal values",
      content: `## Secure by Default

Every file has permissions for 3 entities:
1. **User (Owner)**
2. **Group**
3. **Others**

### Permission Types
- \`r\` (Read): 4
- \`w\` (Write): 2
- \`x\` (Execute): 1

### Examples
- \`755\`: Owner can do everything (7), others can just read and run (5).
- \`644\`: Owner can edit (6), others only read (4).
- \`chmod +x\`: Make a script runnable.`,
      codeExample: `$ chmod 777 bad_permission.sh
$ chmod +x startup.sh`,
      exercises: {
        beginner: { prompt: "Make a file named 'run.sh' executable.", starterCode: "", expectedOutput: "chmod +x run.sh" },
        intermediate: { prompt: "Change file owner to 'root' for 'secret.txt'.", starterCode: "", expectedOutput: "sudo chown root secret.txt" },
        advanced: { prompt: "Set permissions to read/write for owner, but nothing for anyone else (Octal).", starterCode: "", expectedOutput: "chmod 600 private.txt" },
      },
    },
    {
      id: "linux-11-sudo",
      title: "11. Superuser Power",
      description: "root, sudo, and visudo",
      content: `## The God Mode

The **Root** user can do anything, including deleting the entire system. Because of this, we use \`sudo\` (SuperUser DO).

### Rules
- Never log in as root directly.
- Use \`sudo\` only for system-wide changes (installing apps, changing configs).
- \`visudo\`: The safe way to edit who has sudo power.`,
      codeExample: "$ sudo rm -rf /  # NEVER EVER DO THIS",
      exercises: {
        beginner: { prompt: "Switch to the root user identity (interactive).", starterCode: "", expectedOutput: "sudo su" },
        intermediate: { prompt: "Run 'ls /root' with administrative privileges.", starterCode: "", expectedOutput: "sudo ls /root" },
        advanced: { prompt: "Edit the sudoers file safely.", starterCode: "", expectedOutput: "sudo visudo" },
      },
    },
    {
      id: "linux-12-apt",
      title: "12. Apt Package Manager",
      description: "Installing and Purging software",
      content: `## App Store for Terminal

On Ubuntu/Debian, we use \`apt\` to manage software.

- \`apt search\`: Find an app.
- \`apt install\`: Download and install.
- \`apt remove\`: Uninstall but keep configs.
- \`apt purge\`: Uninstall everything including configs.
- \`apt autoremove\`: Clean up leftover junk.`,
      codeExample: "$ sudo apt install git python3-pip",
      exercises: {
        beginner: { prompt: "Install the 'neofetch' package.", starterCode: "", expectedOutput: "sudo apt install neofetch" },
        intermediate: { prompt: "Search for all packages related to 'nginx'.", starterCode: "", expectedOutput: "apt search nginx" },
        advanced: { prompt: "Completely remove 'git' including configuration.", starterCode: "", expectedOutput: "sudo apt purge git" },
      },
    },
    {
      id: "linux-13-processes",
      title: "13. Processes & Signals",
      description: "ps, top, and kill",
      content: `## Monitor your System

Everything running on Linux is a **Process** with a unique **PID** (Process ID).

- \`ps aux\`: List every process running right now.
- \`top\` / \`htop\`: A live manager (like Task Manager).
- \`kill <PID>\`: Ask a process to stop.
- \`kill -9 <PID>\`: Force a process to stop immediately.`,
      codeExample: `$ ps aux | grep python
$ kill 420`,
      exercises: {
        beginner: { prompt: "Open the live process monitor.", starterCode: "", expectedOutput: "top" },
        intermediate: { prompt: "List all running processes with user details.", starterCode: "", expectedOutput: "ps aux" },
        advanced: { prompt: "Force kill process with ID 999.", starterCode: "", expectedOutput: "kill -9 999" },
      },
    },
    {
      id: "linux-14-resources",
      title: "14. System Resources",
      description: "df, du, and free",
      content: `## Hardware Health

Is your disk full? Is your RAM exhausted? 

- \`df -h\`: Disk Free (How much space is left?).
- \`du -sh\`: Disk Usage (How big is this folder?).
- \`free -h\`: How much RAM is being used?
- \`uptime\`: How long has the server been running?`,
      codeExample: `$ df -h
$ free -m`,
      exercises: {
        beginner: { prompt: "Show disk space in human-readable format.", starterCode: "", expectedOutput: "df -h" },
        intermediate: { prompt: "Check current RAM usage in megabytes.", starterCode: "", expectedOutput: "free -m" },
        advanced: { prompt: "See the size of your current directory summaries.", starterCode: "", expectedOutput: "du -sh" },
      },
    },
    {
      id: "linux-15-grep",
      title: "15. Text Processing I (grep)",
      description: "Pipes and Searching",
      content: `## The Power of the Pipe

Piping (\`|\`) lets you take the output of one command and 'pipe' it as input to another. It's the most powerful feature of Linux.

- \`grep\`: Search for text.
- \`>\` : Save output to a file (Overwrites).
- \`>>\`: Save output to a file (Appends).`,
      codeExample: `$ ps aux | grep python
$ cat log.txt | grep 'error' > errors.txt`,
      exercises: {
        beginner: { prompt: "List all files and find which ones contain 'config'.", starterCode: "", expectedOutput: "ls | grep config" },
        intermediate: { prompt: "Save the word 'Master' into a new file named 'status.txt'.", starterCode: "", expectedOutput: "echo \"Master\" > status.txt" },
        advanced: { prompt: "Search for 'Failed' in 'auth.log' but ignore case.", starterCode: "", expectedOutput: "grep -i 'Failed' auth.log" },
      },
    },
    {
      id: "linux-16-sedawk",
      title: "16. Text Processing II (sed/awk)",
      description: "Master level stream editing",
      content: `## Editing Streams

- \`sed\`: The Stream Editor. Great for replacing text in files without opening them.
- \`awk\`: A full programming language for processing spreadsheets (columns and rows) in the terminal.

Example: \`sed 's/apple/orange/g' file.txt\` (Replace all apples with oranges).`,
      codeExample: "$ awk '{print $1}' config.csv",
      exercises: {
        beginner: { prompt: "Use sed to replace 'old' with 'new' in 'script.sh' (preview only).", starterCode: "", expectedOutput: "sed 's/old/new/g' script.sh" },
        intermediate: { prompt: "Print the first column of a file using awk.", starterCode: "", expectedOutput: "awk '{print $1}' data.txt" },
        advanced: { prompt: "Use sed to delete the first line of a file.", starterCode: "", expectedOutput: "sed '1d' file.txt" },
      },
    },
    {
      id: "linux-17-networking",
      title: "17. Networking & Connections",
      description: "ip, ping, and traceroute",
      content: `## The Web in Terminal

- \`ip addr\`: Show your IP address.
- \`ping\`: Check if a website is up.
- \`curl\`: Download content from a URL (used 99% of the time by devs).
- \`netstat -tlnp\`: See what ports are open on your machine.`,
      codeExample: `$ curl ifconfig.me
$ ip addr show eth0`,
      exercises: {
        beginner: { prompt: "Check your local IP address.", starterCode: "", expectedOutput: "ip addr" },
        intermediate: { prompt: "Ping google.com to check connectivity.", starterCode: "", expectedOutput: "ping google.com" },
        advanced: { prompt: "Download the content of 'example.com' to the terminal.", starterCode: "", expectedOutput: "curl example.com" },
      },
    },
    {
      id: "linux-18-ssh",
      title: "18. SSH Mastery",
      description: "Remote access and Keys",
      content: `## Remote Control

**SSH** (Secure Shell) lets you log into a Linux server across the world securely.

- \`ssh user@server\`: Log in with a password.
- \`ssh-keygen\`: Create digital keys so you never need a password.
- \`scp\`: Secure Copy (Send files to a server).`,
      codeExample: `$ ssh-keygen -t rsa
$ scp app.py user@192.168.1.100:/home/user/`,
      exercises: {
        beginner: { prompt: "Generate a new pair of SSH keys.", starterCode: "", expectedOutput: "ssh-keygen" },
        intermediate: { prompt: "Attempt to connect to a server at 10.0.0.5 as user 'dev'.", starterCode: "", expectedOutput: "ssh dev@10.0.0.5" },
        advanced: { prompt: "Check your public key content in the .ssh folder.", starterCode: "", expectedOutput: "cat ~/.ssh/id_rsa.pub" },
      },
    },
    {
      id: "linux-19-systemd",
      title: "19. Services with Systemd",
      description: "Managing background apps",
      content: `## Controlling Services

Most Linux apps (like Nginx, MySQL, SSH) run in the background as **Services**.

- \`systemctl start\`: Start a service.
- \`systemctl stop\`: Stop it.
- \`systemctl enable\`: Make it start automatically when the PC turns on.
- \`journalctl -u\`: View the logs for that specific service.`,
      codeExample: "$ sudo systemctl restart nginx",
      exercises: {
        beginner: { prompt: "Check the status of the 'ssh' service.", starterCode: "", expectedOutput: "systemctl status ssh" },
        intermediate: { prompt: "Restart the web server 'nginx'.", starterCode: "", expectedOutput: "sudo systemctl restart nginx" },
        advanced: { prompt: "View logs for the 'docker' service.", starterCode: "", expectedOutput: "journalctl -u docker" },
      },
    },
    {
      id: "linux-20-cron",
      title: "20. Automation (Cron)",
      description: "Scheduling tasks",
      content: `## Set it and Forget it

**Cron** is the Linux job scheduler. You can tell Linux to 'run this script every night at 3 AM'.

- \`crontab -e\`: Edit your schedule.
- \`crontab -l\`: List your schedule.

### Format
\`Minute Hour Day Month Weekday Command\``,
      codeExample: "0 3 * * * /home/user/backup.sh",
      exercises: {
        beginner: { prompt: "List your active cron tasks.", starterCode: "", expectedOutput: "crontab -l" },
        intermediate: { prompt: "Open the cron editor.", starterCode: "", expectedOutput: "crontab -e" },
        advanced: { prompt: "Check system-wide cron jobs in /etc.", starterCode: "", expectedOutput: "ls /etc/cron.daily" },
      },
    },
    {
      id: "linux-21-scripting1",
      title: "21. Shell Scripting I",
      description: "Variables and Loops",
      content: `## The Dev Power

A shell script is just a text file starting with \`#!/bin/bash\`. It lets you automate anything.

\`\`\`bash
#!/bin/bash
NAME="PyMaster"
echo "Hello $NAME"
\`\`\``,
      codeExample: `$ nano script.sh
$ chmod +x script.sh
$ ./script.sh`,
      exercises: {
        beginner: { prompt: "Create a script file named 'hello.sh'.", starterCode: "", expectedOutput: "touch hello.sh" },
        intermediate: { prompt: "Set a variable 'ENV' to 'prod' in the terminal.", starterCode: "", expectedOutput: "export ENV=prod" },
        advanced: { prompt: "Run a local script named 'setup.sh'.", starterCode: "", expectedOutput: "./setup.sh" },
      },
    },
    {
      id: "linux-22-scripting2",
      title: "22. Shell Scripting II",
      description: "Advanced logic",
      content: `## Conditionals & Logic

Professional scripts check if things work before continuing.

\`\`\`bash
if [ -f "file.txt" ]; then
  echo "File exists!"
else
  echo "File missing!"
fi
\`\`\``,
      codeExample: "for i in {1..5}; do echo $i; done",
      exercises: {
        beginner: { prompt: "Write a loop to print numbers 1 to 5 (command line).", starterCode: "", expectedOutput: "for i in {1..5}; do echo $i; done" },
        intermediate: { prompt: "Check if 'notes.txt' exists using [ -f... ].", starterCode: "", expectedOutput: "[ -f notes.txt ]" },
        advanced: { prompt: "Print all environment variables.", starterCode: "", expectedOutput: "env" },
      },
    },
    {
      id: "linux-23-ufw",
      title: "23. Security & Firewalls (UFW)",
      description: "Protecting your server",
      content: `## Locking the Door

**UFW** (Uncomplicated Firewall) is the standard for Ubuntu security.

- \`ufw enable\`: Turn it on.
- \`ufw allow 22\`: Let SSH traffic in.
- \`ufw deny 80\`: Block web traffic.
- \`ufw status\`: See what's blocked.`,
      codeExample: `$ sudo ufw status
$ sudo ufw allow 443`,
      exercises: {
        beginner: { prompt: "Check the status of your firewall.", starterCode: "", expectedOutput: "sudo ufw status" },
        intermediate: { prompt: "Allow traffic on port 80 (HTTP).", starterCode: "", expectedOutput: "sudo ufw allow 80" },
        advanced: { prompt: "Enable the firewall completely.", starterCode: "", expectedOutput: "sudo ufw enable" },
      },
    },
    {
      id: "linux-24-storage",
      title: "24. Storage & LVM",
      description: "Mounting and Partitions",
      content: `## Disks as Files

In Linux, disks are located in \`/dev/\`. To use a disk, you must **Mount** it to a folder.

- \`lsblk\`: List block devices (Disks).
- \`mount\`: Connect a disk to a folder.
- \`LVM\`: Logical Volume Management -lets you grow disks like they are virtual.`,
      codeExample: `$ lsblk
$ sudo mount /dev/sdb1 /mnt/data`,
      exercises: {
        beginner: { prompt: "List all disks and partitions.", starterCode: "", expectedOutput: "lsblk" },
        intermediate: { prompt: "Mount /dev/sdb1 to /mnt.", starterCode: "", expectedOutput: "sudo mount /dev/sdb1 /mnt" },
        advanced: { prompt: "Unmount the device from /mnt.", starterCode: "", expectedOutput: "sudo umount /mnt" },
      },
    },
    {
      id: "linux-25-webserver",
      title: "25. Web Server Setup",
      description: "Basic Production Deployment",
      content: `## Hosting the Pipeline

A necessary skill for DevOps is setting up a web server to host applications.

### The Workflow
1. Install Nginx.
2. Allow port 80 in Firewall.
3. Enable the service.
4. Check the logs.`,
      codeExample: `$ sudo apt install nginx
$ sudo ufw allow 80
$ sudo systemctl status nginx`,
      exercises: {
        beginner: { prompt: "Install the nginx web server.", starterCode: "", expectedOutput: "sudo apt install nginx" },
        intermediate: { prompt: "Enable nginx to start on boot.", starterCode: "", expectedOutput: "sudo systemctl enable nginx" },
        advanced: { prompt: "Allow web traffic (HTTP) through the firewall.", starterCode: "", expectedOutput: "sudo ufw allow 80" },
      },
    },
    {
      id: "linux-26-hacker-intro",
      title: "26. Intro to Ethical Hacking",
      description: "White-hat methodology & Kali tools",
      content: `## The Hacker Mindset

To defend a system, you must understand how adversaries attack it. Linux is the operating system of choice for both attackers and defenders (e.g. Kali Linux, ParrotOS).

### Offensive Operations
As an ethical hacker (White-Hat), your goal is to find vulnerabilities *before* malicious attackers (Black-Hats) do, under strict authorization.

We will focus on basic reconnaissance and bug-finding using standard Linux tools.`,
      codeExample: `$ whois example.com
$ apt search nmap`,
      exercises: {
        beginner: { prompt: "Search for the 'nmap' package in apt.", starterCode: "", expectedOutput: "apt search nmap" },
        intermediate: { prompt: "Find information about the domain google.com", starterCode: "", expectedOutput: "whois google.com" },
        advanced: { prompt: "Check the status of the 'apache2' vulnerability service", starterCode: "", expectedOutput: "systemctl status apache2" },
      },
    },
    {
      id: "linux-27-recon",
      title: "27. Network Reconnaissance",
      description: "Nmap scanning and Service detection",
      content: `## Seeing the Invicible

Reconnaissance is the first phase of any security audit. You need to know what devices exist on a network and what doors (ports) are open.

### The Nmap Tool
\`nmap\` (Network Mapper) is the industry standard for network scanning.

- \`nmap <ip>\`: Basic port scan.
- \`nmap -sV <ip>\`: Version detection (finds out *what* is running on the port).
- \`ping -c 4 <ip>\`: Check if a host is alive before scanning.`,
      codeExample: `$ ping -c 1 192.168.1.1
$ nmap -sV 10.0.0.5`,
      exercises: {
        beginner: { prompt: "Ping google.com exactly 4 times.", starterCode: "", expectedOutput: "ping -c 4 google.com" },
        intermediate: { prompt: "Run a basic nmap scan against 10.10.10.1", starterCode: "", expectedOutput: "nmap 10.10.10.1" },
        advanced: { prompt: "Run a version-detection scan against localhost.", starterCode: "", expectedOutput: "nmap -sV localhost" },
      },
    },
    {
      id: "linux-28-netcat",
      title: "28. The Swiss Army Knife (Netcat)",
      description: "Raw sockets and Reverse shells",
      content: `## Raw Network Control

Netcat (\`nc\`) allows you to arbitrarily read and write data across network connections. It is a fundamental tool for debugging networks and executing specialized attacks.

### Use Cases
1. **Banner Grabbing**: Connect to an open port to see how it responds.
2. **Listeners**: Open a port to catch incoming connections.
3. **Reverse Shells**: (Ethical only) Connecting a victim's terminal back to the attacker machine.`,
      codeExample: `# Catching an incoming connection
$ nc -l -p 8080

# Connecting to a service
$ nc -v example.com 80`,
      exercises: {
        beginner: { prompt: "Connect verbosely to 192.168.1.1 on port 22.", starterCode: "", expectedOutput: "nc -v 192.168.1.1 22" },
        intermediate: { prompt: "Set up a netcat listener on port 4444.", starterCode: "", expectedOutput: "nc -l -p 4444" },
        advanced: { prompt: "Use grep on the netcat binary to look for strings.", starterCode: "", expectedOutput: "strings /usr/bin/nc | grep shell" },
      },
    },
    {
      id: "linux-29-bug-finding",
      title: "29. Bug Finding & Secrets",
      description: "Hunting for exposed API keys and passwords",
      content: `## The Grep Bounty

A huge portion of Bug Bounty rewards come from discovering developers accidentally leaving secrets (API keys, passwords, private SSH keys) in code repositories or log files.

Linux makes hunting for these extremely efficient.

### The Hunter's Toolkit
- \`grep -r "password" .\`: Search recursively inside all files for 'password'.
- \`find . -name "*.env"\`: Look for hidden environment files that hold secrets.
- \`strings <binary>\`: Extract readable text from compiled binaries.`,
      codeExample: `$ grep -rE "API_KEY|PASSWORD" /var/www/
$ find / -type f -name ".env" 2>/dev/null`,
      exercises: {
        beginner: { prompt: "Find all files named '.env' in the current directory.", starterCode: "", expectedOutput: "find . -name \".env\"" },
        intermediate: { prompt: "Recursively search the current folder for 'SECRET_KEY'.", starterCode: "", expectedOutput: "grep -r \"SECRET_KEY\" ." },
        advanced: { prompt: "Extract readable strings from a binary named 'app_agent'.", starterCode: "", expectedOutput: "strings app_agent" },
      },
    },
    {
      id: "linux-30-web-probing",
      title: "30. Web App Probing",
      description: "Inspecting HTTP exchanges like a scanner",
      content: `## Talking HTTP

When finding bugs in web applications, browsers hide the raw data. Hackers use \`curl\` to manually interact with APIs and find flaws like IDOR or Injection.

### Advanced Curl
- \`curl -I\`: Fetch only the headers (banner grabbing).
- \`curl -X POST -d "param=1"\`: Send data to test an endpoint.
- \`curl -H "X-Forwarded-For: 127.0.0.1"\`: Spoof HTTP headers to bypass restrictions.`,
      codeExample: `$ curl -I https://pymaster.com
$ curl -X OPTIONS http://10.10.10.5`,
      exercises: {
        beginner: { prompt: "Fetch only the headers from http://sandbox.local.", starterCode: "", expectedOutput: "curl -I http://sandbox.local" },
        intermediate: { prompt: "Send an OPTIONS request to that same URL.", starterCode: "", expectedOutput: "curl -X OPTIONS http://sandbox.local" },
        advanced: { prompt: "Send a POST request with the data 'admin=true'.", starterCode: "", expectedOutput: "curl -X POST -d \"admin=true\" http://sandbox.local" },
      },
    },
    {
      id: "linux-31-blue-team",
      title: "31. Blue Team Ops (Defense)",
      description: "Log analysis and Intrusion detection",
      content: `## Finding the Attacker

Blue Teams defend networks. To stop a hacker, you must find their tracks. In Linux, tracks are left in \`/var/log/\`.

### Log Analysis
Attackers often try to brute-force SSH. You can detect this by counting the failed login attempts.

- \`cat /var/log/auth.log | grep "Failed"\`: See failed logins.
- \`awk '{print $11}'\`: Extract the IP addresses from those logs.
- \`sort | uniq -c\`: Count how many times each IP failed.`,
      codeExample: `$ grep "Failed password" /var/log/auth.log | wc -l
$ tail -n 50 /var/log/syslog`,
      exercises: {
        beginner: { prompt: "View the last 20 lines of the authentication log.", starterCode: "", expectedOutput: "tail -n 20 /var/log/auth.log" },
        intermediate: { prompt: "Count how many times 'Failed' appears in auth.log.", starterCode: "", expectedOutput: "grep \"Failed\" /var/log/auth.log | wc -l" },
        advanced: { prompt: "Search both auth.log and syslog for the IP '192.168.1.5'.", starterCode: "", expectedOutput: "grep \"192.168.1.5\" /var/log/auth.log /var/log/syslog" },
      },
    },
    {
      id: "linux-32-hardening",
      title: "32. System Hardening",
      description: "Permissions and Securing SSH",
      content: `## Locking the Castle

Hardening is the process of eliminating vulnerabilities.

### Essential Hardening
1. **Never allow Root Login**: Edit \`/etc/ssh/sshd_config\` and set \`PermitRootLogin no\`.
2. **Protect SSH Keys**: Your private key must never be readable by others.
3. **Least Privilege**: Only give users the permissions they absolutely need.`,
      codeExample: `$ chmod 600 ~/.ssh/id_rsa
$ sudo systemctl restart ssh`,
      exercises: {
        beginner: { prompt: "Set the permissions of your private key to 600.", starterCode: "", expectedOutput: "chmod 600 ~/.ssh/id_rsa" },
        intermediate: { prompt: "Check the contents of the ssh daemon config file.", starterCode: "", expectedOutput: "cat /etc/ssh/sshd_config" },
        advanced: { prompt: "Restart the ssh service to apply new configurations.", starterCode: "", expectedOutput: "sudo systemctl restart ssh" },
      },
    },
    {
      id: "linux-33-cyber-final",
      title: "33. Ultimate Cyber Final",
      description: "Find the intrusion and secure the system",
      content: `## Operation: Blackout

A malicious actor has infiltrated your simulated environment. You must use everything you've learned to locate the backdoor and secure the system.

### Your Objectives
1. **Recon**: Find the active process named 'backdoor_script.sh', running on the system.
2. **Blue Team**: Kill the malicious process.
3. **Hardening**: Set up the firewall (UFW) to block incoming connections on port 4444.
4. **Bug Bounty**: Find the hidden \`.env\` file holding the stolen API key in the \`/tmp\` directory.

The Linux Kernel is now entirely yours. Good luck, Master.`,
      codeExample: `$ ps aux | grep backdoor
$ kill -9 <PID>
$ sudo ufw deny 4444
$ find /tmp -name ".env"`,
      exercises: {
        beginner: { prompt: "Search for a running process named 'backdoor'.", starterCode: "", expectedOutput: "ps aux | grep backdoor" },
        intermediate: { prompt: "Deny traffic on port 4444 using UFW.", starterCode: "", expectedOutput: "sudo ufw deny 4444" },
        advanced: { prompt: "Find the stolen .env file hidden in the /tmp directory.", starterCode: "", expectedOutput: "find /tmp -name \".env\"" },
      },
    },
  ];
}
function cloudMlops(): CareerLesson[] {
  return [
    {
      id: "cloud-best-practices",
      title: "0. Best Practices & Classic Mistakes",
      description: "Dos, Don'ts, and what to avoid in Cloud & MLOps",
      category: "Foundations",
      content:
        "## The Golden Rules of the Cloud ☁️\n\nBefore provisioning servers, you must learn the rules of scale and cost management.\n\n### DOs (What you should use)\n- **DO** set up Billing Alerts on day one so you don't wake up to a $10,000 bill.\n- **DO** use Infrastructure as Code (like Terraform) instead of clicking around the AWS Console manually.\n- **DO** containerize your ML models using Docker to avoid the 'It works on my machine' problem.\n\n### DON'Ts (Classic Mistakes)\n- **DON'T** ever commit your AWS/GCP Access Keys to GitHub. Bots will find them in seconds.\n- **DON'T** leave expensive GPU instances running over the weekend if you aren't training.\n- **DON'T** rely on local state; always use object storage (like S3) for models and data.",
      codeExample:
        "# DO: Read credentials from environment\n# import os; key = os.environ.get('AWS_ACCESS_KEY')\n\n# DON'T: Hardcode cloud keys in your ML scripts\n# key = 'AKIAIOSFODNN7EXAMPLE'",
      exercises: {
        beginner: { type: "quiz", prompt: "What is the very first thing you should do when creating a new AWS/GCP account?", options: ["Launch a GPU", "Set up Billing Alerts", "Install Docker"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "Print 'Use Infrastructure as Code'", starterCode: "print('___')", expectedOutput: "Use Infrastructure as Code" },
        advanced: { type: "code", prompt: "Print 'Never commit keys'", starterCode: "print('___')", expectedOutput: "Never commit keys" },
      },
    },
    {
      id: "cloud-intro", title: "Introduction to Cloud Computing", description: "Learn about AWS, GCP, and the serverless revolution",
      content: "## Cloud Basics\n\nThe cloud is just someone else's computer, but with specialized tools for scaling and reliability.\n\n### Major Providers\n- **AWS** — The industry leader\n- **Google Cloud (GCP)** — Best for ML and data\n- **Azure** — Enterprise standard\n\n### Core Services\n- **Compute** — EC2, Lambda, Cloud Run\n- **Storage** — S3, Cloud storage\n- **Networking** — VPCs, Load Balancers",
      codeExample: "# Check if running in a cloud environment\nimport os\n\ndef check_cloud():\n    if os.environ.get(\"AWS_EXECUTION_ENV\"):\n        return \"AWS Lambda\"\n    if os.environ.get(\"K_SERVICE\"):\n        return \"Google Cloud Run\"\n    return \"Local Environment\"\n\nprint(\"Environment:\", check_cloud())",
      translations: {
        tamil: { title: "Cloud Computing அறிமுகம்", description: "AWS, GCP மற்றும் serverless முறையை கற்றுக்கொள்ளுங்கள்" },
        kannada: { title: "Cloud Computing ಪರಿಚಯ", description: "AWS, GCP ಮತ್ತು serverless ಕ್ರಾಂತಿಯ ಪರಿಚಯ" },
        telugu: { title: "Cloud Computing పరిచయం", description: "AWS, GCP మరియు serverless విప్లవం గురించి నేర్చుకోండి" },
        hindi: { title: "Cloud Computing परिचय", description: "AWS, GCP और serverless क्रांति के बारे में सीखें" },
      },
      exercises: {
        beginner: { prompt: "Print `'Cloud'` if `env_exists=True` else `'Local'`. Also print `type(env_exists).__name__`.", starterCode: "env_exists = True\n\n# Print Cloud/Local and type name\n", expectedOutput: "Cloud\nbool" },
        intermediate: { prompt: "Calculate cost: `$0.05/hour` for `24` hours. Print cost and formatted as `'$1.20'`.", starterCode: "hours = 24\nrate = 0.05\n\n# Print cost and formatted string\n", expectedOutput: "1.2\n$1.20" },
        advanced: { prompt: "Filter regions starting with `'us-'` from a list. Print the filtered list and count.", starterCode: "regions = ['us-east-1', 'eu-west-1', 'us-west-2', 'ap-south-1']\n\n# Filter US regions, print list and count\n", expectedOutput: "['us-east-1', 'us-west-2']\n2" },
      },
    },
    {
      id: "cloud-linux", title: "Linux for Cloud", description: "Masters the terminal for server administration",
      content: "## The Server OS\n\nMost cloud servers run Linux. You must be comfortable with the command line to manage them.\n\n### Key Skills\n- **SSH** — Secure Shell for remote access\n- **Permissions** — chmod and chown\n- **Processes** — top, ps, and kill\n- **Logs** — journalctl and tail -f",
      codeExample: "# Simulating a shell command in Python\ndef list_files(path):\n    import os\n    return os.listdir(path)\n\nprint(\"Directory contents:\", list_files(\".\")[:3])",
      exercises: {
        beginner: { prompt: "Print the command `'ls -la'` and its `len()`.", starterCode: "cmd = 'ls -la'\n\n# Print command and its length\n", expectedOutput: "ls -la\n5" },
        intermediate: { prompt: "Check if path `'/var/log'` exists using `os.path.exists()`. Print result.", starterCode: "import os\npath = '/var/log'\n\n# Check and print\n", expectedOutput: "True" },
        advanced: { prompt: "Convert `2048` bytes to KB and MB. Print both as formatted strings.", starterCode: "b = 2048\n\n# Print KB and MB\n", expectedOutput: "2 KB\n0.002 MB" },
      },
    },
    {
      id: "cloud-venv", title: "Virtual Environments", description: "Isolate dependencies for different projects",
      content: "## Dependency Isolation\n\nAvoid global package conflicts by using virtual environments.\n\n### Tools\n- **venv** — Built-in Python library\n- **pip** — The package manager\n- **requirements.txt** — Listing your needs",
      codeExample: "# Building a requirements string\nlibs = [\"flask==2.0\", \"requests>=2.25\", \"pandas\"]\nreq_text = \"\\n\".join(libs)\nprint(req_text)",
      exercises: {
        beginner: { prompt: "Print `'python -m venv venv'` and `len('venv')`.", starterCode: "# Print venv command and len of 'venv'\n", expectedOutput: "python -m venv venv\n4" },
        intermediate: { prompt: "Filter libs with `'=='` from `['flask==2.0', 'numpy', 'scipy==1.6']`. Print filtered list and count.", starterCode: "libs = ['flask==2.0', 'numpy', 'scipy==1.6']\n\n# Filter pinned, print list and count\n", expectedOutput: "['flask==2.0', 'scipy==1.6']\n2" },
        advanced: { prompt: "Parse `'requests>=2.25'` to extract package name. Print name and version.", starterCode: "lib = 'requests>=2.25'\n\n# Extract name and version, print both\n", expectedOutput: "requests\n2.25" },
      },
    },
    {
      id: "cloud-docker", title: "Docker & Containerization", description: "Package your Python apps to run anywhere",
      content: "## Why Containers?\n\n\"It works on my machine\" is a nightmare in production. Docker solves this by packaging the code, OS, and dependencies together.\n\n### Key Terms\n- **Dockerfile** — The recipe for your image\n- **Image** — The packaged executable\n- **Container** — A running instance of an image\n- **Registry** — Where you store images (Docker Hub, ECR)",
      codeExample: "# Example Dockerfile-like concept\nconfig = {\n    \"FROM\": \"python:3.9-slim\",\n    \"WORKDIR\": \"/app\",\n    \"COPY\": \". .\",\n    \"RUN\": \"pip install -r requirements.txt\",\n    \"CMD\": [\"python\", \"app.py\"]\n}\n\nfor key, val in config.items():\n    print(f\"{key}: {val}\")",
      exercises: {
        beginner: { prompt: "Print `'python:3.9-slim'` and split by `':'`. Print the list.", starterCode: "image = 'python:3.9-slim'\n\n# Print image and split result\n", expectedOutput: "python:3.9-slim\n['python', '3.9-slim']" },
        intermediate: { prompt: "Extract tag from `'python:3.9'`. Print the tag and the image name.", starterCode: "image = 'python:3.9'\n\n# Extract name and tag, print both\n", expectedOutput: "python\n3.9" },
        advanced: { prompt: "Build a docker run command with port mapping. Given `port=80, image='myapp'`. Print the command.", starterCode: "port = 80\nimage = 'myapp'\n\n# Build and print command\n", expectedOutput: "docker run -p 80:80 myapp" },
      },
    },
    {
      id: "cloud-cicd", title: "CI/CD for Python", description: "Automate testing and deployment",
      content: "## Continuous Everything\n\n- **CI (Continuous Integration)**: Auto-test code on every push.\n- **CD (Continuous Deployment)**: Auto-deploy to production.\n\n### Tools\n- **GitHub Actions** — Native to GitHub\n- **GitLab CI** — Built-in to GitLab\n- **Jenkins** — The self-hosted veteran",
      codeExample: "# Simulating a YAML workflow check\ndef check_workflow(yaml_dict):\n    return \"jobs\" in yaml_dict and \"steps\" in yaml_dict[\"jobs\"]\n\nworkflow = {\"jobs\": {\"steps\": [\"test\", \"deploy\"]}}\nprint(\"Valid Workflow:\", check_workflow(workflow))",
      exercises: {
        beginner: { prompt: "Check if `'deploy'` is in `['test','build','deploy']`. Print result and list length.", starterCode: "stages = ['test', 'build', 'deploy']\n\n# Check and print result + length\n", expectedOutput: "True\n3" },
        intermediate: { prompt: "Filter failed builds from a list of dicts. Print the failed IDs list.", starterCode: "builds = [{'id': 1, 'status': 'success'}, {'id': 2, 'status': 'failed'}]\n\n# Filter failed, print IDs\n", expectedOutput: "[2]" },
        advanced: { prompt: "Join `['lint','unit','e2e']` with `' && '`. Print the result and `len()` of original list.", starterCode: "commands = ['lint', 'unit', 'e2e']\n\n# Join and print result + count\n", expectedOutput: "lint && unit && e2e\n3" },
      },
    },
    {
      id: "cloud-monitoring", title: "Monitoring & Observability", description: "Keep an eye on your production systems",
      content: "## Is it Up?\n\nMonitoring tells you if your app is running; Observability tells you *why* it's failing.\n\n### The 3 Pillars\n1. **Metrics** — Latency, Error rates, CPU usage\n2. **Logs** — Application events\n3. **Traces** — Request lifecycle across services",
      codeExample: "# Simple health check logic\ndef health_check(status_code):\n    if status_code == 200: return \"HEALTHY\"\n    if status_code >= 500: return \"CRITICAL\"\n    return \"WARNING\"\n\nprint(\"Status:\", health_check(503))",
      exercises: {
        beginner: { prompt: "If `cpu > 80`, print `'Alert'` else `'OK'`. Test with `90`. Also print the cpu value.", starterCode: "cpu = 90\n\n# Check and print alert + value\n", expectedOutput: "Alert\n90" },
        intermediate: { prompt: "Calculate average response time: `total=1500ms`, `count=50`. Print result and whether it exceeds `25ms`.", starterCode: "total = 1500\ncount = 50\n\n# Print avg and threshold check\n", expectedOutput: "30.0\nTrue" },
        advanced: { prompt: "Filter timestamps within last 10 units (`now=100`). Print count and the filtered list.", starterCode: "now = 100\ntimes = [50, 95, 98]\n\n# Filter recent, print count and list\n", expectedOutput: "2\n[95, 98]" },
      },
    },
    {
      id: "cloud-k8s", title: "Kubernetes Orchestration", description: "Manage thousands of containers at scale",
      content: "## The OS of the Cloud\n\nKubernetes (K8s) automates deployment, scaling, and management of containerized apps.\n\n### Concepts\n- **Pod** — Smallest unit (holds containers)\n- **Service** — Network endpoint\n- **Deployment** — Defines the desired state\n- **Namespace** — Virtual clusters",
      codeExample: "# Replica scaling logic\ndef calculate_replicas(load):\n    import math\n    return math.ceil(load / 100) # 1 replica per 100 users\n\nprint(\"Required Replicas for 450 users:\", calculate_replicas(450))",
      exercises: {
        beginner: { prompt: "Print `'kubectl'`. Also print its `len()`.", starterCode: "# Print kubectl and its length\n", expectedOutput: "kubectl\n7" },
        intermediate: { prompt: "Check pod `status='Pending'` against `'Running'`. Print the comparison result and the status.", starterCode: "status = 'Pending'\n\n# Compare and print result + status\n", expectedOutput: "False\nPending" },
        advanced: { prompt: "Given `nodes=[True, True, False]`. Calculate health %. Print the percentage and unhealthy count.", starterCode: "nodes = [True, True, False]\n\n# Print health % and unhealthy count\n", expectedOutput: "66.7\n1" },
      },
    },
    {
      id: "cloud-serverless", title: "Serverless Scaling", description: "Run code without managing servers",
      content: "## Function as a Service (FaaS)\n\nServerless lets you run code in response to events (HTTP, file uploads) without managing any infrastructure.\n\n### Benefits\n- **Auto-scaling** — Zero to thousands in seconds\n- **Pay-per-use** — Only pay for execution time\n- **Reduced Ops** — No patching servers",
      codeExample: "# Cold start vs Warm start simulation\ndef lambda_handler(event, context):\n    return f\"Hello from Serverless! Event: {event}\"\n\nprint(lambda_handler(\"signup\", {}))",
      exercises: {
        beginner: { prompt: "Print `'Lambda'` and `'Cloud Functions'` on separate lines.", starterCode: "# Print both serverless names\n", expectedOutput: "Lambda\nCloud Functions" },
        intermediate: { prompt: "Calculate cost: `1,000,000` requests at `$0.20/million`. Print cost and `type(cost).__name__`.", starterCode: "reqs = 1000000\nrate = 0.20\n\n# Calculate, print cost and type\n", expectedOutput: "0.2\nfloat" },
        advanced: { prompt: "Filter cold starts (`time > 100`) from logs. Print filtered list and count.", starterCode: "logs = [{'id': 1, 'time': 50}, {'id': 2, 'time': 450}]\n\n# Filter cold starts, print list and count\n", expectedOutput: "[{'id': 2, 'time': 450}]\n1" },
      },
    },
    {
      id: "cloud-security", title: "FinOps & Security", description: "Manage costs and harden your cloud infrastructure",
      content: "## Harden the Cloud\n\nSecurity and Costs are the biggest risks in the cloud.\n\n### Best Practices\n- **IAM** — Identity and Access Management (Least Privilege)\n- **Encryption** — At rest and in transit\n- **Budget Alerts** — Stop runaway costs\n- **VPC Peering** — Secure network boundaries",
      codeExample: "# Budget alert logic\nbudget = 100\nspent = 85\ndef check_budget(b, s):\n    return \"WARN\" if s > b * 0.8 else \"OK\"\n\nprint(\"Budget status:\", check_budget(budget, spent))",
      exercises: {
        beginner: { prompt: "Print `'POLP'` (Principle of Least Privilege) and what it stands for.", starterCode: "# Print acronym and meaning\n", expectedOutput: "POLP\nPrinciple of Least Privilege" },
        intermediate: { prompt: "Check if `spent=120` exceeds `budget=100`. Print result and the overage amount.", starterCode: "spent = 120\nbudget = 100\n\n# Print exceeded check and overage\n", expectedOutput: "True\n20" },
        advanced: { prompt: "Filter unencrypted buckets. Print the risky IDs list and total bucket count.", starterCode: "buckets = [{'id': 'b1', 'enc': True}, {'id': 'b2', 'enc': False}]\n\n# Filter unencrypted, print IDs and total count\n", expectedOutput: "['b2']\n2" },
      },
    },
  ];
}

function gameDev(): CareerLesson[] {
  return [
    {
      id: "gamedev-best-practices",
      title: "0. Best Practices & Classic Mistakes",
      description: "Dos, Don'ts, and what to avoid in Game Development",
      category: "Foundations",
      content:
        "## The Golden Rules of Game Dev 🎮\n\nBefore building complex games, learn the rules of performance and architecture.\n\n### DOs (What you should use)\n- **DO** separate your game logic (updates) from your rendering logic (drawing).\n- **DO** use 'Delta Time' so your game speed is consistent regardless of the player's frame rate.\n- **DO** optimize assets (compress images and audio) before loading them.\n\n### DON'Ts (Classic Mistakes)\n- **DON'T** load images, sounds, or heavy assets inside your main game loop. Load them once at the start.\n- **DON'T** tie physics updates directly to frames per second.\n- **DON'T** optimize too early. Focus on getting a fun, working prototype first.",
      codeExample:
        "# DO: Multiply movement by delta_time\n# player.x += speed * delta_time\n\n# DON'T: Tie movement to frame rate\n# player.x += speed # Runs 2x faster at 120fps than 60fps!",
      exercises: {
        beginner: { type: "quiz", prompt: "Why do we use Delta Time in game development?", options: ["To make the game look prettier", "To decouple game speed from frame rate", "To load assets faster"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "Print 'Load assets before the loop'", starterCode: "print('___')", expectedOutput: "Load assets before the loop" },
        advanced: { type: "code", prompt: "Print 'Use Delta Time'", starterCode: "print('___')", expectedOutput: "Use Delta Time" },
      },
    },
    {
      id: "game-loop", title: "The Game Loop", description: "Understand how games update and render in real-time",
      content: "## The Heart of Every Game\n\nA game is just a loop that runs 60 times per second.\n\n### 3 Steps per Frame\n1. **Process Input** — Did the player press 'Space'?\n2. **Update** — Move the player, check for gravity\n3. **Render** — Draw everything to the screen\n\n### Frame Rate (FPS)\nIf your loop takes too long, your game lags. The goal is ~16ms per frame.",
      codeExample: "# A simplified game loop concept\nimport time\n\nrunning = True\nframe = 0\n\ndef update():\n    global frame\n    frame += 1\n\n# Run for 3 'frames'\nfor _ in range(3):\n    update()\n    print(f\"Frame {frame}: Updated state\")\n    time.sleep(0.01) # Simulate logic time",
      translations: {
        tamil: { title: "Game Loop", description: "game real-time இல் update மற்றும் render ஆகும் முறையை புரிந்து கொள்ளுங்கள்" },
        kannada: { title: "Game Loop", description: "game real-time ನಲ್ಲಿ update/render ಆಗುವ ವಿಧಾನ ತಿಳಿದುಕೊಳ್ಳಿ" },
        telugu: { title: "Game Loop", description: "gameలు real-time లో ఎలా update/render అవుతాయో అర్థం చేసుకోండి" },
        hindi: { title: "Game Loop", description: "गेम real-time में कैसे update और render होता है समझें" },
      },
      exercises: {
        beginner: { prompt: "Calculate ms per frame for 60 FPS: `1000/60`. Print rounded to 1 decimal.", starterCode: "fps = 60\n\n# Calculate ms/frame, print\n", expectedOutput: "16.7" },
        intermediate: { prompt: "Simulate movement: `pos=0, vel=5`, update 10 times. Print final `pos` and `vel`.", starterCode: "pos = 0\nvel = 5\n\n# Update 10 times, print pos and vel\n", expectedOutput: "50\n5" },
        advanced: { prompt: "Calculate distance from `(0,0)` to `(10,24)` using `math.sqrt`. Print the distance and the sum of squares.", starterCode: "import math\nx, y = 10, 24\n\n# Print distance and sum of squares\n", expectedOutput: "26.0\n676" },
      },
    },
    {
      id: "game-input", title: "Input & Movement", description: "Control sprites with your keyboard and mouse",
      content: "## Moving the Player\n\nInputs are handled by polling events.\n\n### Common Controls\n- **WASD** / Arrow Keys for movement\n- **Space** for jump / primary action\n- **Mouse Pos** for aiming\n\n### Vector Movement\nUse X and Y coordinates to represent position. `pos.x += speed * direction`",
      codeExample: "# Simple movement logic\npos = {\"x\": 100, \"y\": 100}\nspeed = 5\n\ndef move(direction):\n    if direction == \"LEFT\": pos[\"x\"] -= speed\n    if direction == \"RIGHT\": pos[\"x\"] += speed\n\nmove(\"RIGHT\")\nprint(\"New Pos:\", pos)",
      exercises: {
        beginner: { prompt: "If `key='KEY_UP'`, decrease `y=50` by 10. Print new `y` and `key`.", starterCode: "y = 50\nkey = 'KEY_UP'\n\n# Handle input, print y and key\n", expectedOutput: "40\nKEY_UP" },
        intermediate: { prompt: "Clamp `val=150` between 0 and 100. Print the clamped value and whether it was clamped (`True`/`False`).", starterCode: "val = 150\n\n# Clamp, print result and whether clamped\n", expectedOutput: "100\nTrue" },
        advanced: { prompt: "Calculate rotation angle in degrees for vector `(1,1)` using `math.atan2`. Print angle and the vector tuple.", starterCode: "import math\nx, y = 1, 1\n\n# Print angle and vector\n", expectedOutput: "45.0\n(1, 1)" },
      },
    },
    {
      id: "game-sprites", title: "Sprites & Animations", description: "Loading and animating game assets",
      content: "## Visualizing the Game\n\nSprites are 2D images representing characters or objects.\n\n### Animations\nAnimations are achieved by switching between a sequence of images (frames) over time.\n\n### Sprite Sheets\nA single large image containing multiple frames. You 'clip' the parts you need.",
      codeExample: "# Animating a sprite index\ndef next_frame(current, total):\n    return (current + 1) % total\n\nframe = 0\nfor _ in range(5):\n    frame = next_frame(frame, 4)\n    print(\"Drawing frame:\", frame)",
      exercises: {
        beginner: { prompt: "Next frame index (0-7) if `current=7`. Print the result and `current`.", starterCode: "current = 7\n\n# Wrap-around frame, print next and current\n", expectedOutput: "0\n7" },
        intermediate: { prompt: "Scale sprite: `width=32`, `scale=2.5`. Print new width and original width.", starterCode: "w = 32\ns = 2.5\n\n# Print scaled and original\n", expectedOutput: "80.0\n32" },
        advanced: { prompt: "Calculate UV offset for frame 3 in a 4-frame sheet. Print offset and total frames.", starterCode: "f = 3\ntotal = 4\n\n# Print UV offset and total\n", expectedOutput: "0.75\n4" },
      },
    },
    {
      id: "game-collision", title: "Collision Detection", description: "Making objects react to each other",
      content: "## Physical Logic\n\nCollision detection determines if two objects are overlapping.\n\n### AABB (Axis-Aligned Bounding Box)\nThe simplest collision: checking if two rectangles intersect.\n\n### Circle Collision\nChecking if the distance between two centers is less than the sum of their radii.",
      codeExample: "# AABB collision check\ndef check_collision(rect1, rect2):\n    return (rect1['x'] < rect2['x'] + rect2['w'] and\n            rect1['x'] + rect1['w'] > rect2['x'] and\n            rect1['y'] < rect2['y'] + rect2['h'] and\n            rect1['y'] + rect1['h'] > rect2['y'])\n\nr1 = {'x': 0, 'y': 0, 'w': 10, 'h': 10}\nr2 = {'x': 5, 'y': 5, 'w': 10, 'h': 10}\nprint(\"Collision:\", check_collision(r1, r2))",
      exercises: {
        beginner: { prompt: "If `dist=5` and `radii_sum=10`, is there a collision? Print result and the gap distance.", starterCode: "dist = 5\nradii = 10\n\n# Print collision check and gap\n", expectedOutput: "True\n5" },
        intermediate: { prompt: "Check if point `(5,5)` is inside rect `(0,0,10,10)`. Print result and the point as tuple.", starterCode: "px, py = 5, 5\nrx, ry, rw, rh = 0, 0, 10, 10\n\n# Check containment, print result and point\n", expectedOutput: "True\n(5, 5)" },
        advanced: { prompt: "Reflect velocity `v=-5` on impact (flip sign). Print new velocity and `abs()` value.", starterCode: "v = -5\n\n# Reflect, print new and absolute\n", expectedOutput: "5\n5" },
      },
    },
    {
      id: "game-states", title: "Game State Management", description: "Menu, Play, Pause, and Game Over logic",
      content: "## The Flow of the Game\n\nStates control what logic and visuals are active.\n\n### Common States\n- **MENU**: Logo and Start button\n- **PLAYING**: The actual game loop\n- **PAUSED**: Static screen with 'Resume'\n- **GAMEOVER**: Final score and 'Retry'",
      codeExample: "# Simple state machine\nstate = \"MENU\"\n\ndef change_state(new_state):\n    global state\n    state = new_state\n    print(f\"Switching to {state} state\")\n\nchange_state(\"PLAYING\")\nchange_state(\"GAMEOVER\")",
      exercises: {
        beginner: { prompt: "If `score=150 > 100`, set `state='WON'`. Print the state and score.", starterCode: "score = 150\nstate = 'PLAY'\n\n# Update state if score > 100, print state and score\n", expectedOutput: "WON\n150" },
        intermediate: { prompt: "Toggle `active=True` using `not`. Print new value and its type name.", starterCode: "active = True\n\n# Toggle, print value and type\n", expectedOutput: "False\nbool" },
        advanced: { prompt: "Filter high scores `> 500` from `[100, 550, 400, 900]`. Print count and the list.", starterCode: "scores = [100, 550, 400, 900]\n\n# Filter, print count and list\n", expectedOutput: "2\n[550, 900]" },
      },
    },
    {
      id: "game-audio", title: "Sound & Animations", description: "Bringing the game to life with audio",
      content: "## Audio Feedback\n\nSound effects (SFX) and background music (BGM) provide emotional feedback.\n\n### Important Concepts\n- **Channels**: Playing multiple sounds at once\n- **Volume**: 0.0 to 1.0\n- **Pan**: Left/Right balance (Stereo)",
      codeExample: "# Simulated audio mixer\ndef play_sound(name, volume=1.0):\n    print(f\"Playing {name} at volume {volume}\")\n\nplay_sound(\"laser_shot\", 0.5)\nplay_sound(\"explosion\", 0.8)",
      exercises: {
        beginner: { prompt: "Scale `vol=1.0` by `0.5` if `mute=False`. Print result and the mute flag.", starterCode: "vol = 1.0\nmute = False\n\n# Scale vol, print result and mute\n", expectedOutput: "0.5\nFalse" },
        intermediate: { prompt: "Clamp `vol=1.5` between 0.0 and 1.0. Print clamped value and whether it was clamped.", starterCode: "vol = 1.5\n\n# Clamp, print value and was_clamped\n", expectedOutput: "1.0\nTrue" },
        advanced: { prompt: "Sound at `sx=100`, listener at `lx=0`. Print `'RIGHT'`/`'LEFT'` and distance.", starterCode: "sx = 100\nlx = 0\n\n# Determine pan direction and distance, print both\n", expectedOutput: "RIGHT\n100" },
      },
    },
    {
      id: "game-ai", title: "AI Pathfinding", description: "Making enemies smart",
      content: "## Basic AI Logic\n\nHow do enemies know where to go?\n\n### Chasing\nMove towards the player's (x, y) coordinates.\n\n### Waypoints\nFollowing a predefined list of points.\n\n### A* Pathfinding\nCalculating the most efficient path around obstacles (Advanced).",
      codeExample: "# Simple chase logic\ndef chase(enemy_pos, player_pos, speed):\n    if enemy_pos < player_pos: return enemy_pos + speed\n    return enemy_pos - speed\n\nnew_x = chase(10, 100, 5)\nprint(\"Enemy moved to:\", new_x)",
      exercises: {
        beginner: { prompt: "If `ey=100 > py=50`, move enemy up (`ey -= 5`). Print new `ey` and `py`.", starterCode: "ey, py = 100, 50\n\n# Move enemy if above player, print both\n", expectedOutput: "95\n50" },
        intermediate: { prompt: "Calculate angle to target `(10,10)` from `(0,0)` in degrees using `math.atan2`. Print angle.", starterCode: "import math\nx, y = 10, 10\n\n# Calculate and print angle\n", expectedOutput: "45.0" },
        advanced: { prompt: "Check if `dist=8` is within detection range `10`. Print result and remaining range.", starterCode: "dist = 8\ndetect_range = 10\n\n# Print in-range check and remaining\n", expectedOutput: "True\n2" },
      },
    },
    {
      id: "game-shaders", title: "Shaders in Ursina", description: "Mastering visual effects and lighting",
      content: "## The Visual Engine\n\nShaders are small programs that run on the GPU to calculate light, shadow, and color.\n\n### Ursina Shaders\nUrsina (a 3D engine for Python) uses GLSL-style shaders for post-processing and materials.\n\n- **Vertex Shaders**: Move the points (geometry)\n- **Fragment Shaders**: Color the pixels",
      codeExample: "# Pseudo-shader configuration\ndef apply_shader(entity, shader_type):\n    print(f\"Applying {shader_type} to {entity.name}\")\n\n# Simulating a light intensity calculation\ndef calc_light(distance, intensity):\n    return intensity / (distance ** 2)\n\nprint(\"Light at 10 units:\", calc_light(10, 100))",
      exercises: {
        beginner: { prompt: "Calculate light intensity at `dist=2`, `intensity=8`. Print result and the formula name.", starterCode: "d, i = 2, 8\n\n# Print intensity and formula name\n", expectedOutput: "2.0\ninverse square" },
        intermediate: { prompt: "Scale RGB `(255, 0, 0)` by `0.5`. Print the dark color tuple and original.", starterCode: "c = (255, 0, 0)\n\n# Scale, print dark and original\n", expectedOutput: "(127, 0, 0)\n(255, 0, 0)" },
        advanced: { prompt: "Calculate dot product of `(1,0)` and `(0,1)`. Print result and whether vectors are perpendicular.", starterCode: "v1 = (1, 0)\nv2 = (0, 1)\n\n# Print dot product and perpendicular check\n", expectedOutput: "0\nTrue" },
      },
    },
    {
      id: "game-network", title: "Multiplayer Engine", description: "Connecting players over the internet",
      content: "## Online Worlds\n\nSyncing position and state between multiple clients.\n\n### Architecture\n- **Server**: The authority on state\n- **Client**: Sends input, receives state\n- **Latency (Ping)**: The delay between players\n\n### Optimization\n**Prediction**: Guessing where a player will be to hide lag.",
      codeExample: "# Simulating a packet sync\ndef send_packet(player_id, pos):\n    import json\n    return json.dumps({\"id\": player_id, \"x\": pos[0], \"y\": pos[1]})\n\nprint(\"Sync Packet:\", send_packet(\"PRO_Gamer\", (250, 420)))",
      exercises: {
        beginner: { prompt: "Filter packets for `player_id=1`. Print the matching packet and total packet count.", starterCode: "packets = [{'id': 1, 'x': 10}, {'id': 2, 'x': 50}]\n\n# Filter, print match and total count\n", expectedOutput: "{'id': 1, 'x': 10}\n2" },
        intermediate: { prompt: "Calculate latency: `send=100ms`, `recv=250ms`. Print latency and `type(latency).__name__`.", starterCode: "s, r = 100, 250\n\n# Calculate and print latency and type\n", expectedOutput: "150\nint" },
        advanced: { prompt: "Generate ping ID string `'PING_101'` from `id=101`. Print it and `len()` of the string.", starterCode: "id = 101\n\n# Build ping string, print it and length\n", expectedOutput: "PING_101\n8" },
      },
    },
  ];
}

function iotRobotics(): CareerLesson[] {
  return [
    {
      id: "iot-best-practices",
      title: "0. Best Practices & Classic Mistakes",
      description: "Dos, Don'ts, and what to avoid in IoT & Robotics",
      category: "Foundations",
      content:
        "## The Golden Rules of Hardware 🤖\n\nBefore controlling motors and sensors, you must learn the rules of the physical world.\n\n### DOs (What you should use)\n- **DO** use `try/except` blocks to handle hardware failures gracefully. Sensors will disconnect!\n- **DO** keep your main loop lightweight and non-blocking.\n- **DO** always double-check your wiring before supplying power.\n\n### DON'Ts (Classic Mistakes)\n- **DON'T** use blocking `time.sleep()` calls if you need to read multiple sensors simultaneously. Use asynchronous programming or event loops.\n- **DON'T** draw power for heavy motors directly from a Raspberry Pi or Arduino pin (you will fry the board).\n- **DON'T** assume network connectivity is always stable in IoT deployments.",
      codeExample:
        "# DO: Graceful fallback on hardware failure\n# try:\n#     temp = sensor.read()\n# except IOError:\n#     temp = None # Handle it!\n\n# DON'T: Crash the whole system on one failed read\n# temp = sensor.read()",
      exercises: {
        beginner: { type: "quiz", prompt: "Why should you avoid long `time.sleep()` calls in an IoT main loop?", options: ["It wastes battery", "It blocks the program from reading other sensors", "It overheats the CPU"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "Print 'Handle hardware failures'", starterCode: "print('___')", expectedOutput: "Handle hardware failures" },
        advanced: { type: "code", prompt: "Print 'Avoid blocking sleep calls'", starterCode: "print('___')", expectedOutput: "Avoid blocking sleep calls" },
      },
    },
    {
      id: "iot-intro", title: "Hardware Basics", description: "Pixels to Pins: Introduction to MicroPython",
      content: "## Coding the Physical World\n\nWith Python, you can control LEDs, read temperature sensors, and move robotic arms.\n\n### MicroPython & CircuitPython\nThese are lightweight versions of Python designed to run on tiny computers (microcontrollers) like the ESP32 or Raspberry Pi Pico.\n\n### GPIO (General Purpose Input/Output)\nThese pins on the board are your connection to the world.\n- **Output**: Sending power to an LED\n- **Input**: Reading if a button is pushed",
      codeExample: "# Pseudo-code micro-controller logic\n# import machine\n# led = machine.Pin(2, machine.Pin.OUT)\n\ndef set_led(state):\n    print(\"LED is now\", \"ON\" if state else \"OFF\")\n\nset_led(True)\nset_led(False)",
      translations: {
        tamil: { title: "Hardware அடிப்படைகள்", description: "Pixels முதல் Pins வரை: MicroPython அறிமுகம்" },
        kannada: { title: "Hardware ಮೂಲಭಾಗಗಳು", description: "Pixels to Pins: MicroPython ಪರಿಚಯ" },
        telugu: { title: "Hardware బేసిక్స్", description: "Pixels నుండి Pins వరకు: MicroPython పరిచయం" },
        hindi: { title: "Hardware Basics", description: "Pixels to Pins: MicroPython का परिचय" },
      },
      exercises: {
        beginner: { prompt: "Print `'HIGH'` if `val=1` else `'LOW'`. Also print the val.", starterCode: "val = 1\n\n# Print HIGH/LOW and val\n", expectedOutput: "HIGH\n1" },
        intermediate: { prompt: "Convert `1023` (10-bit max) to percentage. Print the percentage and raw value.", starterCode: "val = 1023\n\n# Convert and print percentage and raw\n", expectedOutput: "100.0\n1023" },
        advanced: { prompt: "Calculate ohms: `R = V/I`. Given `V=3.3, I=0.02`. Print R and the unit `'ohms'`.", starterCode: "v = 3.3\ni = 0.02\n\n# Calculate R, print value and unit\n", expectedOutput: "165.0\nohms" },
      },
    },
    {
      id: "iot-setup", title: "MicroPython Intro", description: "Flashing firmware and the REPL",
      content: "## The MicroPython REPL\n\nREPL stands for **Read-Eval-Print Loop**. It allows you to run Python code live on your hardware via a serial connection.\n\n### Workflow\n1. Flash the MicroPython firmware (.bin file)\n2. Connect via USB\n3. Write `main.py` - this runs automatically on boot",
      codeExample: "# Typical boot sequence\ndef boot():\n    print(\"System Initializing...\")\n    import gc\n    gc.collect()\n    print(\"Memory Free:\", gc.mem_free())\n\nboot()",
      exercises: {
        beginner: { prompt: "Print `'main.py'` and `len('main.py')`.", starterCode: "# Print boot file name and its length\n", expectedOutput: "main.py\n7" },
        intermediate: { prompt: "Calculate `2**10` and print the result. Also print `type(result).__name__`.", starterCode: "# Calculate, print value and type\n", expectedOutput: "1024\nint" },
        advanced: { prompt: "If `free=6000 > 5000` print `'OK'` else `'LOW'`. Print result and the free value.", starterCode: "free = 6000\n\n# Check, print result and free\n", expectedOutput: "OK\n6000" },
      },
    },
    {
      id: "iot-gpio", title: "LED / Switch Logic", description: "Controlling digital Input and Output",
      content: "## Digital Logic\n\n- **Digital Output**: High (3.3V) or Low (0V). Perfect for LEDs.\n- **Digital Input**: Reading a button. Use **Pull-up** or **Pull-down** resistors to avoid 'floating' values.",
      codeExample: "# Simulating a button press toggle\nled_state = False\ndef on_button_press():\n    global led_state\n    led_state = not led_state\n    print(\"LED is now\", \"ON\" if led_state else \"OFF\")\n\non_button_press()\non_button_press()",
      exercises: {
        beginner: { prompt: "Toggle `bit=0` to 1. Print new bit and `type(bit).__name__`.", starterCode: "bit = 0\n\n# Toggle, print value and type\n", expectedOutput: "1\nint" },
        intermediate: { prompt: "If `btn=1` AND `door=1`, print `'ALARM'`. Also print `btn AND door` result.", starterCode: "btn, door = 1, 1\n\n# Check alarm, print msg and AND result\n", expectedOutput: "ALARM\n1" },
        advanced: { prompt: "Calculate debounce delay: `total=50ms, samples=5`. Print average and total.", starterCode: "t, s = 50, 5\n\n# Print average and total\n", expectedOutput: "10.0\n50" },
      },
    },
    {
      id: "iot-sensors", title: "Sensor Readings", description: "Reading analog signals (ADC)",
      content: "## Analog to Digital\n\nSensors like LDRs (light) or Potentiometers provide a continuous voltage. The **ADC** (Analog-to-Digital Converter) converts this voltage into a number (usually 0 to 1023 or 4095).",
      codeExample: "# Map 0-1023 to 0-100%\ndef map_sensor(val):\n    return round((val / 1023) * 100, 1)\n\nprint(\"Light Level:\", map_sensor(512), \"%\")",
      exercises: {
        beginner: { prompt: "If `v=900 > 800` print `'BRIGHT'`, elif `v==0` print `'DARK'`. Also print `v`.", starterCode: "v = 900\n\n# Check brightness, print label and value\n", expectedOutput: "BRIGHT\n900" },
        intermediate: { prompt: "Convert `C=25` to Fahrenheit. Print the result and the formula used.", starterCode: "c = 25\n\n# Convert, print result and formula\n", expectedOutput: "77.0\n(C * 9/5) + 32" },
        advanced: { prompt: "Rolling average of `[100, 105, 95]`. Print average and `len()` of input.", starterCode: "vals = [100, 105, 95]\n\n# Print average and length\n", expectedOutput: "100.0\n3" },
      },
    },
    {
      id: "iot-comms", title: "Serial Communication", description: "Masters I2C and SPI protocols",
      content: "## Talking to Chips\n\nMost advanced sensors use protocols like **I2C** or **SPI** to send complex data (like GPS coordinates or 3D acceleration).\n\n- **I2C**: Uses only 2 wires (SDA, SCL). Great for simple sensors.\n- **SPI**: Uses 4 wires. Much faster, used for screens and SD cards.",
      codeExample: "# Simulating an I2C scan\ndef scan_i2c():\n    devices = [0x27, 0x3C, 0x68]\n    return [hex(d) for d in devices]\n\nprint(\"Found I2C devices:\", scan_i2c())",
      exercises: {
        beginner: { prompt: "Convert decimal `60` to hex. Print the result and `type(60).__name__`.", starterCode: "# Print hex and type\n", expectedOutput: "0x3c\nint" },
        intermediate: { prompt: "Check if `0x27` is in `[0x20, 0x27, 0x30]`. Print result and `len()` of list.", starterCode: "addrs = [0x20, 0x27, 0x30]\n\n# Check and print result + length\n", expectedOutput: "True\n3" },
        advanced: { prompt: "I2C bitrate: `100kHz = 100 * 1000`. Print the value and `'bits/sec'`.", starterCode: "# Calculate, print value and unit\n", expectedOutput: "100000\nbits/sec" },
      },
    },
    {
      id: "iot-display", title: "OLED Displays", description: "Drawing text and shapes on tiny screens",
      content: "## Visual Output\n\nSmall 0.96\" OLED screens are common in IoT projects. They usually use the SSD1306 driver.\n\n### Drawing Steps\n1. Clear the buffer\n2. Draw text or pixels\n3. Call `show()` to push the buffer to the screen hardware.",
      codeExample: "# Pseudo-code for OLED\ndef draw_text(oled, x, y, text):\n    print(f\"Drawing '{text}' at ({x}, {y})\")\n\ndraw_text(None, 0, 0, \"PyMaster IoT\")\ndraw_text(None, 0, 16, \"Temp: 24C\")",
      exercises: {
        beginner: { prompt: "Calculate pixels in `128x64` display. Print count and display dimensions.", starterCode: "w, h = 128, 64\n\n# Print pixel count and dimensions\n", expectedOutput: "8192\n128x64" },
        intermediate: { prompt: "Center text: `screen=128`, `text_w=40`. Print starting x and remaining space.", starterCode: "sw, tw = 128, 40\n\n# Print start x and remaining\n", expectedOutput: "44\n88" },
        advanced: { prompt: "Generate coordinates for diagonal line from `(0,0)` to `(2,2)`. Print the list and its length.", starterCode: "# Generate diagonal coords, print list and length\n", expectedOutput: "[(0, 0), (1, 1), (2, 2)]\n3" },
      },
    },
    {
      id: "iot-robotics", title: "Robotic Arm Control", description: "Servos and PWM (Pulse Width Modulation)",
      content: "## Motion Control\n\nServos are controlled using **PWM**. By changing the 'Duty Cycle' (the percentage of time the signal is ON), you can set the exact angle of the motor.\n\n- **0% Duty**: 0 degrees\n- **100% Duty**: 180 degrees (usually)",
      codeExample: "# Mapping angle (0-180) to Duty (0-1023)\ndef angle_to_duty(angle):\n    return int((angle / 180) * 1023)\n\nprint(\"Duty for 90 degrees:\", angle_to_duty(90))",
      exercises: {
        beginner: { prompt: "Cap `angle=200` at `180`. Print capped value and original.", starterCode: "a = 200\n\n# Cap, print capped and original\n", expectedOutput: "180\n200" },
        intermediate: { prompt: "Calculate angle for `duty=511` (max 1023, range 180°). Print angle and the formula.", starterCode: "d = 511\n\n# Print angle and formula description\n", expectedOutput: "89\n(duty/1023)*180" },
        advanced: { prompt: "Generate steps from 0 to 90 by 30. Print the list and `len()` of it.", starterCode: "# Print movement steps and count\n", expectedOutput: "[0, 30, 60, 90]\n4" },
      },
    },
    {
      id: "iot-optimize", title: "Firmware Optimization", description: "Writing efficient code for 32KB of RAM",
      content: "## Every Byte Counts\n\nMicrocontrollers are powerful but have very little memory.\n\n### Optimization Tips\n- **Avoid large imports**: Only import what you need.\n- **Use frozen modules**: Pre-compiled Python scripts.\n- **Manual Garbage Collection**: Run `gc.collect()` after heavy tasks.",
      codeExample: "# Measuring memory before/after\nimport gc\ndef check_mem():\n    gc.collect()\n    return gc.mem_free()\n\nprint(\"Free RAM:\", check_mem(), \"bytes\")",
      exercises: {
        beginner: { prompt: "Calculate KB from `32768` bytes. Print KB and raw bytes.", starterCode: "b = 32768\n\n# Print KB and bytes\n", expectedOutput: "32.0\n32768" },
        intermediate: { prompt: "Check `len(b'hello')` and compare to `len('hello')`. Print both.", starterCode: "# Print len of bytes and string\n", expectedOutput: "5\n5" },
        advanced: { prompt: "Calculate `%` free if `total=32000`, `free=8000`. Print percentage and used amount.", starterCode: "t, f = 32000, 8000\n\n# Print percentage and used\n", expectedOutput: "25.0\n24000" },
      },
    },
    {
      id: "iot-cloud", title: "Remote Monitoring", description: "Connecting your device to the Cloud (MQTT)",
      content: "## The Internet of Things\n\n**MQTT** is the standard protocol for IoT. It's lightweight and works by 'Publishing' data to a 'Topic' and 'Subscribing' to receive commands.\n\n### Workflow\n1. Device connects to Wi-Fi\n2. Device connects to an MQTT Broker\n3. Device publishes sensor data every 10 seconds",
      codeExample: "# Pseudo-code MQTT Publish\ndef mqtt_pub(topic, msg):\n    print(f\"MQTT -> [{topic}]: {msg}\")\n\nmqtt_pub(\"home/livingroom/temp\", \"24.5\")",
      exercises: {
        beginner: { prompt: "Check if `'temp'` is in topic `'livingroom/temp'`. Print result and `len()` of topic.", starterCode: "t = 'livingroom/temp'\n\n# Check and print result + length\n", expectedOutput: "True\n15" },
        intermediate: { prompt: "Join `['iot','sensor','1']` with `'/'`. Print the topic and part count.", starterCode: "parts = ['iot', 'sensor', '1']\n\n# Join, print topic and count\n", expectedOutput: "iot/sensor/1\n3" },
        advanced: { prompt: "Filter packets where `topic='cmd'`. Print matching count and total.", starterCode: "ps = [{'t': 'data'}, {'t': 'cmd'}]\n\n# Filter, print cmd count and total\n", expectedOutput: "1\n2" },
      },
    },
  ];
}



function dsa(): CareerLesson[] {
  return [
    {
      id: "dsa-best-practices",
      title: "0. Best Practices & Classic Mistakes",
      description: "Dos, Don'ts, and what to avoid in DSA",
      category: "Foundations",
      content:
        "## The Golden Rules of Algorithms 🧩\n\nBefore solving complex problems, you must understand the rules for writing clean, optimal code.\n\n### DOs (What you should use)\n- **DO** clarify the problem and constraints before writing code.\n- **DO** write out test cases (including edge cases like empty arrays).\n- **DO** start with a Brute Force solution, then optimize.\n\n### DON'Ts (Classic Mistakes)\n- **DON'T** mutate (modify) a list or array while iterating over it.\n- **DON'T** use `O(N^2)` algorithms for datasets larger than 10,000 items.\n- **DON'T** forget to check for `null`, `None`, or out-of-bounds indices.",
      codeExample:
        "# DO: Iterate over a copy if modifying\n# for item in my_list[:]:\n#     if condition: my_list.remove(item)\n\n# DON'T: Mutate while iterating\n# for item in my_list:\n#     if condition: my_list.remove(item) # Skips items!",
      exercises: {
        beginner: { type: "quiz", prompt: "What should you do before writing any code in an interview?", options: ["Start typing immediately", "Clarify constraints and examples", "Ask for the solution"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "Print 'Check Edge Cases'", starterCode: "print('___')", expectedOutput: "Check Edge Cases" },
        advanced: { type: "code", prompt: "Print 'Brute Force'", starterCode: "print('___')", expectedOutput: "Brute Force" },
      },
    },
    {
      id: "dsa-basics", title: "1. Basics & Foundations", description: "Complexity Analysis and Recursion",
      content: "## Foundations of DSA\n\n### Complexity Analysis\n- **Time Complexity**: Measuring how execution time grows with input size (Big O, Big Ω, Big Θ).\n- **Space Complexity**: Measuring memory usage relative to input.\n\n### Recursion\n- **Direct**: Function calls itself.\n- **Indirect**: Function A calls B, B calls A.\n- **Tail Recursion**: The recursive call is the last action in the function (more efficient).",
      codeExample: "def countdown(n):\n    if n <= 0: return\n    print(n)\n    countdown(n-1) # Tail recursion\n\ncountdown(3)",
      translations: {
        tamil: { title: "1. அடிப்படைகள் மற்றும் அடித்தளங்கள்", description: "சிக்கலான பகுப்பாய்வு மற்றும் மறுநிகழ்வு" },
        kannada: { title: "1. ಮೂಲಭೂತ ಮತ್ತು ಅಡಿಪಾಯಗಳು", description: "ಸಂಕೀರ್ಣತೆಯ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಪುನರಾವರ್ತನೆ" },
        telugu: { title: "1. బేసిక్స్ & ఫౌండేషన్స్", description: "కాంప్లెక్సిటీ అనాలిసిస్ మరియు రికర్షన్" },
        hindi: { title: "1. बुनियादी बातें और नींव", description: "जटिलता विश्लेषण और रिकर्सन" },
      },
      exercises: {
        beginner: { prompt: "Notation for worst-case time complexity? Print word.", starterCode: "", expectedOutput: "Big O" },
        intermediate: { prompt: "Is recursion always more space-efficient than iteration? Print 'No'.", starterCode: "", expectedOutput: "No" },
        advanced: { prompt: "Function A calls B, B calls A. Type of recursion? Print words.", starterCode: "", expectedOutput: "Indirect recursion" },
      },
    },
    {
      id: "dsa-arrays-strings", title: "2. Arrays & Strings", description: "Data Manipulation and Pattern Matching",
      content: "## Linear Data Structures\n\n### Arrays\nContinuous memory allocation for same-type elements. Operations include Insertion, Deletion, and Traversal.\n\n### Strings\nSequence of characters. Key algorithms include:\n- **Naive**: Simple sliding window.\n- **KMP**: Uses prefix-suffix matching.\n- **Rabin-Karp**: Uses hashing for faster searching.\n\n### Multidimensional Arrays\nMatrices (2D arrays) used in image processing and grid-based problems.",
      codeExample: "arr = [1, 2, 3, 4, 5]\n# Traversal\nfor x in arr: print(x, end=' ')",
      translations: {
        tamil: { title: "2. வரிசைகள் & சரங்கள்", description: "தரவு கையாளுதல் மற்றும் பேட்டர்ன் மேட்சிங்" },
        kannada: { title: "2. ಅರೇಗಳು ಮತ್ತು ಸ್ಟ್ರಿಂಗ್‌ಗಳು", description: "ಡೇಟಾ ಕುಶಲತೆ ಮತ್ತು ಮಾದರಿ ಹೊಂದಾಣಿಕೆ" },
        telugu: { title: "2. శ్రేణులు & స్ట్రింగ్స్", description: "డేటా మానిప్యులేషన్ మరియు ప్యాటర్న్ మ్యాచింగ్" },
        hindi: { title: "2. सरणियाँ और स्ट्रिंग्स", description: "डेटा हेरफेर और पैटर्न मिलान" },
      },
      exercises: {
        beginner: { prompt: "Searching an unsorted array takes $O(?)$. Print the symbol.", starterCode: "", expectedOutput: "n" },
        intermediate: { prompt: "Pattern matching algorithm starting with 'K'? Print acronym.", starterCode: "", expectedOutput: "KMP" },
        advanced: { prompt: "Reverse the string 'dsa'. Print result.", starterCode: "s = 'dsa'\n# Reverse and print\n", expectedOutput: "asd" },
      },
    },
    {
      id: "dsa-linked-lists", title: "3. Linked Lists", description: "Singly, Doubly, and Circular Linked Lists",
      content: "## Dynamic Linear Structures\n\n### Singly Linked List\nEach node points to the next. Great for dynamic memory as elements aren't contiguous.\n\n### Doubly Linked List\nNodes point to both next and previous elements. Allows bidirectional traversal.\n\n### Circular Linked List\nThe last node points back to the first node. Used in round-robin scheduling.",
      codeExample: "class Node:\n    def __init__(self, val):\n        self.val = val\n        self.next = None",
      translations: {
        tamil: { title: "3. இணைக்கப்பட்ட பட்டியல்கள்", description: "ஒற்றை, இரட்டை மற்றும் வட்ட இணைக்கப்பட்ட பட்டியல்கள்" },
        kannada: { title: "3. ಲಿಂಕ್ಡ್ ಲಿಸ್ಟ್‌ಗಳು", description: "ಸಿಂಗ್ಲಿ, ಡಬ್ಲಿ ಮತ್ತು ಸರ್ಕ್ಯುಲರ್ ಲಿಂಕ್ಡ್ ಲಿಸ್ಟ್‌ಗಳು" },
        telugu: { title: "3. లింక్డ్ లిస్టులు", description: "సింగ్లీ, డబ్లీ మరియు సర్క్యులర్ లింక్డ్ లిస్టులు" },
        hindi: { title: "3. लिंक्ड सूचियां", description: "सिंगली, डबली और सर्कुलर लिंक्ड सूचियां" },
      },
      exercises: {
        beginner: { prompt: "Does a linked list require contiguous memory? Print 'No'.", starterCode: "", expectedOutput: "No" },
        intermediate: { prompt: "List with 'next' and 'prev' pointers? Print word.", starterCode: "", expectedOutput: "Doubly" },
        advanced: { prompt: "Accessing index $i$ in a linked list takes $O(?)$. Print symbol.", starterCode: "", expectedOutput: "n" },
      },
    },
    {
      id: "dsa-stacks-queues", title: "4. Stacks & Queues", description: "LIFO and FIFO Data Structures",
      content: "## Specialized Data Collections\n\n### Stack (LIFO - Last In First Out)\nOperations: `push`, `pop`, `peek`. Used in expression evaluation and backtracking.\n\n### Queue (FIFO - First In First Out)\nOperations: `enqueue`, `dequeue`. Types include **Circular Queue**, **Deque**, and **Priority Queue**.\n\n### Applications\n- Stacks: Function calls, Undo mechanism.\n- Queues: Task scheduling, BFS traversal.",
      codeExample: "stack = []\nstack.append(1) # push\nprint(stack.pop()) # pop",
      translations: {
        tamil: { title: "4. ஸ்டாக்குகள் & வரிசைகள்", description: "LIFO மற்றும் FIFO தரவு கட்டமைப்புகள்" },
        kannada: { title: "4. ಸ್ಟಾಕ್‌ಗಳು ಮತ್ತು ಕ್ಯೂಗಳು", description: "LIFO ಮತ್ತು FIFO ಡೇಟಾ ರಚನೆಗಳು" },
        telugu: { title: "4. స్టాక్‌లు & క్యూలు", description: "LIFO మరియు FIFO డేటా స్ట్రక్చర్లు" },
        hindi: { title: "4. स्टैक और कतारें", description: "LIFO और FIFO डेटा संरचनाएं" },
      },
      exercises: {
        beginner: { prompt: "Queue principle? Print acronym.", starterCode: "", expectedOutput: "FIFO" },
        intermediate: { prompt: "Stack operation to view top? Print word.", starterCode: "", expectedOutput: "peek" },
        advanced: { prompt: "Double-ended queue name? Print word.", starterCode: "", expectedOutput: "Deque" },
      },
    },
    {
      id: "dsa-trees", title: "5. Trees & Heaps", description: "Binary Trees, BST, AVL, and Heaps",
      content: "## Hierarchical Data Structures\n\n### Binary Tree\nEach node has at most two children. Traversals: **Inorder**, **Preorder**, **Postorder**.\n\n### BST (Binary Search Tree)\nLeft child < Parent < Right child. Efficient searching in $O(\\log n)$.\n\n### AVL & Heaps\n- **AVL**: Self-balancing BST.\n- **Heaps**: Min-heap or Max-heap used for priority handling.",
      codeExample: "print('BST Inorder gives sorted elements')",
      translations: {
        tamil: { title: "5. மரங்கள் & ஹீப்ஸ்", description: "பைனரி மரங்கள், BST, AVL மற்றும் ஹீப்ஸ்" },
        kannada: { title: "5. ಮರಗಳು ಮತ್ತು ರಾಶಿಗಳು (Heaps)", description: "ಬೈನರಿ ಮರಗಳು, BST, AVL ಮತ್ತು ಹೀಪ್ಸ್" },
        telugu: { title: "5. చెట్లు & హీప్స్", description: "బైనరీ చెట్లు, BST, AVL మరియు హీప్స్" },
        hindi: { title: "5. पेड़ और हीप्स", description: "बाइनरी ट्री, BST, AVL और हीप्स" },
      },
      exercises: {
        beginner: { prompt: "Tree with max 2 children? Print words.", starterCode: "", expectedOutput: "Binary Tree" },
        intermediate: { prompt: "Search time in balanced BST? Print notation.", starterCode: "", expectedOutput: "O(log n)" },
        advanced: { prompt: "Prefix tree common name? Print word.", starterCode: "", expectedOutput: "Trie" },
      },
    },
    {
      id: "dsa-graphs", title: "6. Graphs", description: "Representations and Traversal Algorithms",
      content: "## Network Data Structures\n\n### Representation\n- **Adjacency Matrix**: 2D array representation.\n- **Adjacency List**: Array of lists.\n\n### Traversal\n- **DFS (Depth First Search)**: Goes deep before wide (uses Stack/Recursion).\n- **BFS (Breadth First Search)**: Goes level by level (uses Queue).\n\n### Essential Algorithms\n- **Dijkstra**: Shortest path in weighted graphs.\n- **Prim/Kruskal**: Minimum Spanning Tree (MST).",
      codeExample: "graph = {0: [1, 2], 1: [2], 2: [0, 3], 3: [3]}\nprint('Graph structure defined')",
      translations: {
        tamil: { title: "6. வரைபடங்கள் (Graphs)", description: "பிரதிநிதித்துவங்கள் மற்றும் டிராவர்சல் அல்காரிதம்கள்" },
        kannada: { title: "6. ಗ್ರಾಫ್‌ಗಳು", description: "ಪ್ರಾತಿನಿಧ್ಯಗಳು ಮತ್ತು ಟ್ರಾವರ್ಸಲ್ ಅಲ್ಗಾರಿದಮ್‌ಗಳು" },
        telugu: { title: "6. గ్రాఫ్‌లు", description: "ప్రాతినిధ్యాలు మరియు ట్రావర్సల్ అల్గారిథమ్స్" },
        hindi: { title: "6. ग्राफ", description: "प्रतिनिधित्व और ट्रैवर्सल एल्गोरिदम" },
      },
      exercises: {
        beginner: { prompt: "Algorithm for level-order traversal? Print acronym.", starterCode: "", expectedOutput: "BFS" },
        intermediate: { prompt: "Shortest path in weighted graph? Print word.", starterCode: "", expectedOutput: "Dijkstra" },
        advanced: { prompt: "Representation using 2D array? Print words.", starterCode: "", expectedOutput: "Adjacency Matrix" },
      },
    },
    {
      id: "dsa-hashing", title: "7. Hashing", description: "Fast Lookups and Collision Handling",
      content: "## Constant Time Data Retrieval\n\n### Hash Table\nMaps keys to values using a **Hash Function**. Provides $O(1)$ average time for search, insert, and delete.\n\n### Collision Handling\n- **Chaining**: Using linked lists at each index.\n- **Open Addressing**: Finding another open slot (Linear/Quadratic Probing).\n\n### Applications\nFast lookups, caches (LRU), and database indexing.",
      codeExample: "hash_map = {'name': 'DSA', 'version': 1.0}\nprint(hash_map['name'])",
      translations: {
        tamil: { title: "7. ஹாஷிங்", description: "வேகமான தேடல் மற்றும் மோதல் கையாளுதல்" },
        kannada: { title: "7. ಹ್ಯಾಶಿಂಗ್", description: "ವೇಗದ ಲುಕಪ್‌ಗಳು ಮತ್ತು ಘರ್ಷಣೆ ನಿರ್ವಹಣೆ" },
        telugu: { title: "7. హ్యాషింగ్", description: "వేగవంతమైన లుకప్‌లు మరియు కొలిజన్ హ్యాండ్లింగ్" },
        hindi: { title: "7. हैशिंग", description: "फास्ट लुकअप और कोलिजन हैंडलिंग" },
      },
      exercises: {
        beginner: { prompt: "Average search time in hash table? Print notation.", starterCode: "", expectedOutput: "O(1)" },
        intermediate: { prompt: "Collision method using lists? Print word.", starterCode: "", expectedOutput: "Chaining" },
        advanced: { prompt: "Handling same hash for two keys? Print word.", starterCode: "", expectedOutput: "Collision" },
      },
    },
    {
      id: "dsa-searching-sorting", title: "8. Searching & Sorting", description: "Organizing and Finding Data Efficiently",
      content: "## Organizing Data\n\n### Searching\n- **Linear Search**: $O(n)$.\n- **Binary Search**: $O(\\log n)$ — Requires sorted data.\n\n### Sorting Algorithms\n- **Slow ($O(n^2)$)**: Bubble, Selection, Insertion Sort.\n- **Fast ($O(n \\log n)$)**: Merge, Quick, Heap Sort.\n- **Linear ($O(n)$)**: Counting, Radix Sort (requires specific data types).",
      codeExample: "def binary_search(arr, x):\n    l, r = 0, len(arr)-1\n    while l <= r:\n        m = (l + r) // 2\n        if arr[m] == x: return m\n        elif arr[m] < x: l = m + 1\n        else: r = m - 1\n    return -1",
      translations: {
        tamil: { title: "8. தேடுதல் & வரிசைப்படுத்துதல்", description: "தரவை திறமையாக ஒழுங்கமைத்தல் மற்றும் தேடுதல்" },
        kannada: { title: "8. ಹುಡುಕಾಟ ಮತ್ತು ವಿಂಗಡಣೆ", description: "ಡೇಟಾವನ್ನು ಪರಿಣಾಮಕಾರಿಯಾಗಿ ಸಂಘಟಿಸುವುದು ಮತ್ತು ಕಂಡುಹಿಡಿಯುವುದು" },
        telugu: { title: "8. సెర్చింగ్ & సార్టింగ్", description: "డేటాను సమర్ధవంతంగా నిర్వహించడం మరియు కనుగొనడం" },
        hindi: { title: "8. सर्चिंग और सॉर्टिंग", description: "डेटा को कुशलतापूर्वक व्यवस्थित करना और खोजना" },
      },
      exercises: {
        beginner: { prompt: "Search required for Binary Search? Print word.", starterCode: "", expectedOutput: "Sorted" },
        intermediate: { prompt: "Complexity of Merge Sort? Print notation.", starterCode: "", expectedOutput: "O(n log n)" },
        advanced: { prompt: "Sort using 'pivot' element? Print word.", starterCode: "", expectedOutput: "Quicksort" },
      },
    },
    {
      id: "dsa-adv-structures", title: "9. Advanced Data Structures", description: "Segment Trees, Fenwick Trees, and Union-Find",
      content: "## Handling Complex Queries\n\n### Range Queries\n- **Segment Tree**: $O(\\log n)$ range queries and updates.\n- **Fenwick Tree (BIT)**: More space-efficient range sum queries.\n\n### Disjoint Set (Union-Find)\nUsed for dynamic connectivity problems and Kruskal's algorithm.\n\n### String Processing\n**Suffix Array & Suffix Tree** for complex substring searches.",
      codeExample: "print('Segment Tree built for Range Sum Queries')",
      translations: {
        tamil: { title: "9. மேம்பட்ட தரவு கட்டமைப்புகள்", description: "செக்மென்ட் மரங்கள், ஃபென்விக் மரங்கள் மற்றும் யூனியன்-ஃபைண்ட்" },
        kannada: { title: "9. ಸುಧಾರಿತ ಡೇಟಾ ರಚನೆಗಳು", description: "ಸೆಗ್ಮೆಂಟ್ ಟ್ರೀಸ್, ಫೆನ್ವಿಕ್ ಟ್ರೀಸ್ ಮತ್ತು ಯೂನಿಯನ್-ಫೈಂಡ್" },
        telugu: { title: "9. అడ్వాన్స్‌డ్ డేటా స్ట్రక్చర్లు", description: "సెగ్మెంట్ ట్రీలు, ఫెన్‌విక్ ట్రీలు మరియు యూనియన్-ఫైండ్" },
        hindi: { title: "9. उन्नत डेटा संरचनाएं", description: "सेगमेंट ट्री, फेनविक ट्री और यूनियन-फाइंड" },
      },
      exercises: {
        beginner: { prompt: "Acronym for Binary Indexed Tree? Print acronym.", starterCode: "", expectedOutput: "BIT" },
        intermediate: { prompt: "Structure for range updates/queries? Print words.", starterCode: "", expectedOutput: "Segment Tree" },
        advanced: { prompt: "Algorithm for finding connected components? Print words.", starterCode: "", expectedOutput: "Union-Find" },
      },
    },
    {
      id: "dsa-algorithms", title: "10. Algorithms & Paradigms", description: "DP, Greedy, Backtracking, and Advanced Graph Algos",
      content: "## Mastering Algorithm Design\n\n### Paradigms\n- **Greedy**: Making locally optimal choices.\n- **Dynamic Programming (DP)**: Memoization and Tabulation.\n- **Divide & Conquer**: Breaking problems into smaller ones.\n- **Backtracking**: Trying all possibilities (N-Queens).\n\n### Advanced Graph Topics\n- **Topological Sort**: Ordering tasks with dependencies.\n- **Strongly Connected Components**: Kosaraju and Tarjan algorithms.",
      codeExample: "memo = {}\ndef fib(n):\n    if n in memo: return memo[n]\n    if n <= 1: return n\n    memo[n] = fib(n-1) + fib(n-2)\n    return memo[n]",
      translations: {
        tamil: { title: "10. அல்காரிதம்கள் & முன்னுதாரணங்கள்", description: "DP, Greedy, Backtracking மற்றும் மேம்பட்ட வரைபடங்கள்" },
        kannada: { title: "10. ಅಲ್ಗಾರಿದಮ್‌ಗಳು ಮತ್ತು ಮಾದರಿಗಳು", description: "DP, ಗ್ರೀಡಿ, ಬ್ಯಾಕ್‌ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು ಸುಧಾರಿತ ಗ್ರಾಫ್ ಅಲ್ಗಾರಿದಮ್‌ಗಳು" },
        telugu: { title: "10. అల్గారిథమ్స్ & పారాడైమ్స్", description: "DP, గ్రీడీ, బ్యాక్‌ట్రాకింగ్ మరియు అడ్వాన్స్‌డ్ గ్రాఫ్ అల్గారిథమ్స్" },
        hindi: { title: "10. एल्गोरिदम और प्रतिमान", description: "DP, ग्रीडी, बैकट्रैकिंग और उन्नत ग्राफ एल्गोरिदम" },
      },
      exercises: {
        beginner: { prompt: "Optimal choice at each step? Print word.", starterCode: "", expectedOutput: "Greedy" },
        intermediate: { prompt: "Storing subproblem results (Memoization) is part of? Print acronym.", starterCode: "", expectedOutput: "DP" },
        advanced: { prompt: "Ordering vertices with dependencies? Print words.", starterCode: "", expectedOutput: "Topological Sort" },
      },
    },
  ];
}


const rawTracks: CareerTrack[] = [
  {
    id: "dsa",
    title: "DSA Mastery",
    description: "Master problem solving and core computer science concepts",
    color: "expert-purple",
    language: "python",
    get lessons() { return dsa(); },
  },
  {
    id: "sql",
    title: "SQL & Databases",
    description: "Learn SQL with structured lessons and a built-in practice database",
    color: "primary",
    language: "sql",
    get lessons() { return sqlLessons(); },
  },
  { id: "data-analysis", title: "Data Analysis", description: "Master data analysis with Python", color: "primary", get lessons() { return da(); } },
  { id: "web-development", title: "Web Development", description: "Build web apps and APIs", color: "streak-green", get lessons() { return wd(); } },
  { id: "ai-ml", title: "AI & Machine Learning", description: "Build intelligent systems", color: "expert-purple", get lessons() { return aiml(); } },
  { id: "automation", title: "Automation & Scripting", description: "Automate tasks with Python", color: "python-yellow", get lessons() { return auto(); } },
  { id: "data-engineering", title: "Data Engineering", description: "Build data pipelines", color: "reward-gold", get lessons() { return de(); } },
  { id: "cybersecurity", title: "Cybersecurity", description: "Security with Python", color: "destructive", get lessons() { return cs(); } },
  { id: "git", title: "GitHub Mastery (Start to Master)", description: "Master Git and GitHub for teams", color: "expert-purple", language: "bash", get lessons() { return githubMastery(); } },
  { id: "linux", title: "Linux Mastery (Install to Master)", description: "Master Linux from installation to professional system administration", color: "streak-green", language: "bash", get lessons() { return linuxMastery(); } },
  { id: "cloud-mlops", title: "Cloud & MLOps", description: "Deploy and scale Python in the cloud", color: "primary", get lessons() { return cloudMlops(); } },
  { id: "game-dev", title: "Game Development", description: "Build 2D and 3D games with Python", color: "destructive", get lessons() { return gameDev(); } },
  { id: "iot-robotics", title: "IoT & Robotics", description: "Hardware and embedded Python", color: "reward-gold", get lessons() { return iotRobotics(); } },
  { id: "agentic-ai", title: "Agentic AI Engineering", description: "Master Prompt Engineering, RAG, and MCP", color: "expert-purple", get lessons() { return agenticAi(); } },
  { id: "english-mastery", title: "English Mastery", description: "Master Grammar, Vocabulary, and Professional Communication", color: "primary", get lessons() { return englishMastery(); } },
  { id: "system-design", title: "System Design & Architecture", description: "Design scalable and distributed backend systems", color: "expert-purple", get lessons() { return systemDesign(); } },
  { id: "software-testing", title: "Software Testing & QA", description: "Master PyTest, Selenium, and Test-Driven Development", color: "streak-green", get lessons() { return softwareTesting(); } },
];


function englishMastery(): CareerLesson[] {
  return [
    {
      id: "eng-best-practices",
      title: "0. Best Practices & Classic Mistakes",
      description: "Dos, Don'ts, and what to avoid in Professional English",
      category: "Foundations",
      content:
        "## The Golden Rules of Communication 🗣️\n\nBefore mastering complex grammar, you must learn the basics of clear, professional communication.\n\n### DOs (What you should use)\n- **DO** use active voice instead of passive voice ('We fixed the bug' vs 'The bug was fixed by us').\n- **DO** keep sentences concise. One thought per sentence.\n- **DO** proofread for spelling and tone before sending emails.\n\n### DON'Ts (Classic Mistakes)\n- **DON'T** use overly complex jargon just to sound smart.\n- **DON'T** use filler words ('like', 'um', 'basically') in professional writing.\n- **DON'T** translate literally from your native language; idioms often don't map 1-to-1.",
      codeExample:
        "// DO: Active Voice\n// The team completed the project.\n\n// DON'T: Passive Voice\n// The project was completed by the team.",
      exercises: {
        beginner: { type: "quiz", prompt: "Which is better for professional communication?", options: ["Active voice ('I wrote the code')", "Passive voice ('The code was written by me')", "Neither"], correctOption: 0, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "Print 'Use active voice'", starterCode: "print('___')", expectedOutput: "Use active voice" },
        advanced: { type: "code", prompt: "Print 'Keep it concise'", starterCode: "print('___')", expectedOutput: "Keep it concise" },
      },
    },
    {
      id: "eng-1-grammar",
      title: "Level 1: Present Simple Tense 🧩",
      description: "Master the basics of how we talk about habits and facts.",
      content: "## Welcome to Level 1! 🎉\n\nThe **Present Simple** is your most important tool in English. We use it to talk about things that happen every day, general facts, and regular habits. As a developer, you will use this constantly to describe what your code *does*.\n\n### The Golden Rule\n- **I / You / We / They**: Use the base verb. (e.g., *I write code every day.*)\n- **He / She / It**: Add an **-s** or **-es** to the verb. (e.g., *The script runs automatically.*)\n\n### Developer Context\nWhen explaining a bug or a feature, the Present Simple is your best friend:\n- \"The server **crashes** when the payload is too large.\"\n- \"Our API **returns** a JSON object.\"\n- \"We **deploy** new updates every Friday.\"\n\n### Common Pitfalls ⚠️\nDon't forget the **-s** for third-person singular (He/She/It). Saying \"The function *return* a string\" is incorrect. It must be \"The function *returns* a string.\"",
      codeExample: "Sentence: The server crashes when the payload is too large.\n\nPhonetics: /ðə ˈsɜrvər ˈkræʃɪz wɛn ðə ˈpeɪˌloʊd ɪz tu lɑrʤ/\n\nFocus: Emphasize the '-es' in 'crashes'.",
      translations: {
        tamil: { title: "நிலை 1: நிகழ்காலம் 🧩", description: "பழக்கவழக்கங்கள் மற்றும் உண்மைகளைப் பற்றி பேசுவது எப்படி என்று கற்றுக்கொள்ளுங்கள்." },
        hindi: { title: "स्तर 1: वर्तमान काल 🧩", description: "सीखें कि हम आदतों और तथ्यों के बारे में कैसे बात करते हैं।" }
      },
      exercises: {
        beginner: { 
          type: "quiz",
          prompt: "Mini-Game: Pick the correct word!",
          options: ["He go to work.", "He goes to work.", "He going to work."],
          correctOption: 1,
          starterCode: "",
          expectedOutput: ""
        },
        intermediate: { 
          type: "speaking",
          prompt: "Challenge: Speak this sentence aloud! 🎤",
          starterCode: "The script runs automatically.",
          expectedOutput: ""
        },
        advanced: { 
          type: "code",
          prompt: "Quiz: Write code to print 'She loves coding.'",
          starterCode: "print('___')",
          expectedOutput: "She loves coding."
        }
      }
    },
    {
      id: "eng-2-vocab",
      title: "Level 2: Essential Vocabulary 🎒",
      description: "Learn the words you need for your daily developer life.",
      content: "## Level 2 Unlocked! 🎒\n\nVocabulary is like your developer toolbox. The more precise your words are, the better your team will understand you. Let's master the core terms of web development.\n\n### Key Tech Terminology\n- **Framework**: A structured set of tools to build software (e.g., React, Django).\n  *Usage*: \"We are using a modern JavaScript *framework*.\"\n- **Database**: A structured set of data held in a computer.\n  *Usage*: \"The user data is safely stored in the *database*.\"\n- **Frontend vs Backend**: Frontend is what the user sees (UI/UX). Backend is the server logic and databases.\n  *Usage*: \"Our *frontend* is built with React, and the *backend* uses Python.\"\n\n### Developer Context\nWhen communicating in daily stand-ups, using the right vocabulary shows professionalism. Instead of saying \"I made the screen look good,\" say \"I improved the frontend UI.\"\n\n### Common Pitfalls ⚠️\nBe careful not to confuse 'Library' (a collection of code you call) with 'Framework' (a structure that calls your code).",
      codeExample: "Sentence: Our frontend is built with React, and the backend uses Python.\n\nPhonetics: /aʊər ˈfrʌnˌtɛnd ɪz bɪlt wɪθ riˈækt, ænd ðə ˈbækˌɛnd ˈjuzɪz ˈpaɪθɑn/\n\nFocus: Stress 'frontend' and 'backend'.",
      exercises: {
        beginner: { 
          type: "quiz",
          prompt: "What is a 'Database' used for?",
          options: ["Eating food", "Storing information", "Playing music"],
          correctOption: 1,
          starterCode: "",
          expectedOutput: ""
        },
        intermediate: { 
          type: "speaking",
          prompt: "Challenge: Practice saying this: 🎤",
          starterCode: "I am a Full Stack Developer.",
          expectedOutput: ""
        },
        advanced: { 
          type: "code",
          prompt: "Print the word for 'What the user sees'.",
          starterCode: "print('___')",
          expectedOutput: "Frontend"
        }
      }
    },
    {
      id: "eng-3-listening",
      title: "Level 3: Active Listening 🎧",
      description: "Learn to catch every word in a technical meeting.",
      content: "## Level 3: Ears Open! 🎧\n\nIn natural spoken English, especially in fast-paced tech meetings, native speakers rarely pronounce every single letter clearly. They use **Connected Speech**.\n\n### Connected Speech Rules\nWords often merge together to create a smoother, faster flow:\n- **Going to** becomes **Gonna** (*\"I'm gonna push the code.\"*)\n- **Want to** becomes **Wanna** (*\"Do you wanna pair program?\"*)\n- **Have to** becomes **Hafta** (*\"We hafta fix this bug today.\"*)\n- **Got to** becomes **Gotta** (*\"I gotta go to a meeting.\"*)\n\n### Developer Context\nDuring a daily stand-up, a colleague might say: *\"I'm gonna review your PR after lunch, but we gotta make sure the tests pass first.\"*\n\n### Common Pitfalls ⚠️\nWhile it is crucial to *understand* connected speech when listening, you do not always have to speak this way yourself. However, using these forms in casual conversation will make you sound much more natural.",
      codeExample: "Sentence: I am going to master this language.\n\nSpoken as: I'm gonna master this language.\n\nFocus: Combine 'going to' into 'gonna' for a natural flow.",
      exercises: {
        beginner: { 
          type: "quiz",
          prompt: "What does 'Gonna' mean?",
          options: ["Going to", "Gone to", "Got to"],
          correctOption: 0,
          starterCode: "",
          expectedOutput: ""
        },
        intermediate: { 
          type: "speaking",
          prompt: "Challenge: Say it like a native! 🎤",
          starterCode: "I'm gonna master this language.",
          expectedOutput: ""
        },
        advanced: { 
          type: "code",
          prompt: "Convert 'Got to' to its spoken form.",
          starterCode: "print('Got to'.replace('ot to', '___'))",
          expectedOutput: "Gotta"
        }
      }
    },
    {
      id: "eng-4-speaking",
      title: "Level 4: Fluency & Flow 🌊",
      description: "Stop thinking about grammar and start talking!",
      content: "## Level 4: The Flow State 🌊\n\nFluency isn't about having perfect grammar; it's about speaking without long, awkward pauses. When you need a second to think about what to say next, use **Filler Words** instead of staying silent.\n\n### Professional Fillers\nInstead of saying \"Umm\" or \"Uhh\", use these words to buy yourself time:\n- **Well...**: Use this at the beginning of a sentence. (*\"Well, I think we should use Python for this.\"*)\n- **Actually...**: Use this to correct something or add surprising information. (*\"Actually, the bug is in the database.\"*)\n- **To be honest...**: Use this when giving a direct or slightly negative opinion. (*\"To be honest, the current architecture won't scale.\"*)\n- **Basically...**: Use this to summarize a complex idea. (*\"Basically, the API acts as a bridge.\"*)\n\n### Developer Context\nIf someone asks you a tough question during a code review, don't freeze! Start with: *\"Well, to be honest, I haven't thought of that edge case yet.\"*\n\n### Common Pitfalls ⚠️\nDon't overuse fillers! Saying \"actually\" five times in one minute will distract your listeners.",
      codeExample: "Sentence: To be honest, actually, I need more practice.\n\nFocus: Use 'To be honest' and 'actually' as filler words to pause without stopping the flow.",
      exercises: {
        beginner: { 
          type: "quiz",
          prompt: "Which word helps you summarize a complex idea?",
          options: ["Basically", "Run", "Print"],
          correctOption: 0,
          starterCode: "",
          expectedOutput: ""
        },
        intermediate: { 
          type: "speaking",
          prompt: "Challenge: Use a filler and speak! 🎤",
          starterCode: "Well, to be honest, I love Python.",
          expectedOutput: ""
        },
        advanced: { 
          type: "code",
          prompt: "Print 'To be honest, I am learning.'",
          starterCode: "",
          expectedOutput: "To be honest, I am learning."
        }
      }
    },
    {
      id: "eng-5-writing",
      title: "Level 5: Email Mastery 📧",
      description: "Write professional emails that get results.",
      content: "## Level 5: Professional Pro 📧\n\nWriting emails in a corporate environment requires a balance of politeness and clarity. Your emails should be concise and easy to read.\n\n### The Email Structure\n1. **Salutation**: *\"Hi Team,\"* or *\"Dear Sarah,\"*\n2. **The Hook**: State the purpose immediately. *\"I'm writing to update you on the project.\"*\n3. **The Body**: Keep it brief. Use bullet points for multiple items.\n4. **The Call to Action (CTA)**: What do you need from them? *\"Could you please review the attached document by Friday?\"*\n5. **The Sign-off**: End professionally.\n\n### Sign-offs Explained\n- **Formal**: *Sincerely* (Use for external clients you don't know well)\n- **Semi-formal**: *Best regards*, *Kind regards* (Safe for almost any corporate email)\n- **Informal**: *Thanks*, *Best*, *Cheers* (Use for close colleagues)\n\n### Developer Context\nWhen sending a status update: *\"Hi Team, I have resolved the database latency issue. Please see the attached PR for review. Best regards, [Your Name]\"*",
      codeExample: "Sentence: I look forward to hearing from you soon.\n\nPhonetics: /aɪ lʊk ˈfɔrwərd tu ˈhɪrɪŋ frʌm ju sun/\n\nFocus: This is a polite and professional way to end an email.",
      exercises: {
        beginner: { 
          type: "quiz",
          prompt: "Which sign-off is the most universally safe for corporate emails?",
          options: ["Cheers", "Best regards", "Bye"],
          correctOption: 1,
          starterCode: "",
          expectedOutput: ""
        },
        intermediate: { 
          type: "speaking",
          prompt: "Challenge: Read your sign-off! 🎤",
          starterCode: "I look forward to hearing from you. Best regards.",
          expectedOutput: ""
        },
        advanced: { 
          type: "code",
          prompt: "Complete the closing: 'Best ____'.",
          starterCode: "print('Best ___')",
          expectedOutput: "Best regards"
        }
      }
    },
    {
      id: "eng-6-fluency",
      title: "Level 6: Idioms & Mastery 🏆",
      description: "The secret language of native speakers.",
      content: "## Level 6: Idioms 🏆\n\nIdioms are phrases where the meaning of the phrase is entirely different from the literal meaning of the individual words. Native speakers use them constantly in the workplace.\n\n### Common Corporate Idioms\n- **Break the ice**: To start a conversation or relieve tension in a meeting.\n  *Usage*: \"Let's break the ice by introducing ourselves.\"\n- **Piece of cake**: Something that is very easy to do.\n  *Usage*: \"Migrating that server was a piece of cake.\"\n- **Hit the nail on the head**: To be exactly right about something.\n  *Usage*: \"You hit the nail on the head with that bug diagnosis.\"\n- **Get the ball rolling**: To start a project or process.\n  *Usage*: \"Let's get the ball rolling on the new feature.\"\n- **On the same page**: To have a shared understanding.\n  *Usage*: \"Before we code, let's make sure we are on the same page.\"\n\n### Common Pitfalls ⚠️\nDon't translate idioms directly into your native language; they usually won't make sense! Memorize them as complete phrases.",
      codeExample: "Sentence: You really hit the nail on the head with that bug fix.\n\nPhonetics: /ju ˈrɪli hɪt ðə neɪl ɑn ðə hɛd/\n\nFocus: This idiom means you did something perfectly.",
      exercises: {
        beginner: { 
          type: "quiz",
          prompt: "What does 'On the same page' mean?",
          options: ["Reading a book", "Having a shared understanding", "Writing documentation"],
          correctOption: 1,
          starterCode: "",
          expectedOutput: ""
        },
        intermediate: { 
          type: "speaking",
          prompt: "Challenge: Practice your idiom! 🎤",
          starterCode: "Let's get the ball rolling on this project.",
          expectedOutput: ""
        },
        advanced: { 
          type: "code",
          prompt: "Print the idiom for 'exactly right'.",
          starterCode: "print('___')",
          expectedOutput: "hit the nail on the head"
        }
      }
    },
    {
      id: "eng-7-interviews",
      title: "Level 7: Tech Interviews 💼",
      description: "Ace your next technical interview in English.",
      content: "## Level 7: Interview Ready 💼\n\nTechnical interviews in English test both your coding skills and your communication skills. The most effective way to answer behavioral questions is using the **STAR Method**.\n\n### The STAR Method\n- **S - Situation**: Describe the context. (*\"In my last role, we had a major memory leak.\"*)\n- **T - Task**: What was your specific responsibility? (*\"I was tasked with finding and fixing the leak before the weekend.\"*)\n- **A - Action**: What steps did you take? (*\"I used a profiler to track the memory usage, identified the rogue array, and refactored the garbage collection logic.\"*)\n- **R - Result**: What was the outcome? Use numbers if possible! (*\"The memory leak was resolved, and our server uptime improved by 99%.\"*)\n\n### Powerful Verbs\nInstead of saying *\"I made\"* or *\"I did\"*, use strong action verbs:\n- **Architected** (I architected the database)\n- **Optimized** (I optimized the loading speed)\n- **Spearheaded** (I spearheaded the migration)\n\n### Common Pitfalls ⚠️\nDon't say \"We\" too much when describing a success. Interviewers want to know what *YOU* did. Say \"I\" when describing your specific actions.",
      codeExample: "Sentence: I optimized the database and improved the speed by fifty percent.\n\nPhonetics: /aɪ ˈɑptəˌmaɪzd ðə ˈdeɪtəˌbeɪs ænd ɪmˈpruvd ðə spid baɪ ˈfɪfti pərˈsɛnt/\n\nFocus: Speak clearly and emphasize the results (fifty percent).",
      exercises: {
        beginner: { 
          type: "quiz",
          prompt: "What does the 'R' in the STAR method stand for?",
          options: ["Run", "Result", "React"],
          correctOption: 1,
          starterCode: "",
          expectedOutput: ""
        },
        intermediate: { 
          type: "speaking",
          prompt: "Challenge: Practice your interview answer! 🎤",
          starterCode: "I optimized the database and improved the speed.",
          expectedOutput: ""
        },
        advanced: { 
          type: "code",
          prompt: "Print the word 'Result'",
          starterCode: "print('___')",
          expectedOutput: "Result"
        }
      }
    },
    {
      id: "eng-8-presentations",
      title: "Final Level: Tech Talks 🎤",
      description: "Deliver powerful presentations and demos.",
      content: "## Final Level: The Stage is Yours! 🎤\n\nWhether you are presenting a new architecture to your team or giving a talk at a conference, your ability to guide the audience is critical. This requires smooth **Transitions**.\n\n### Structuring Your Presentation\n1. **The Hook**: Grab their attention. (*\"Have you ever wondered why our API is so slow? Today, I'll show you how to fix it.\"*)\n2. **The Agenda**: Tell them what to expect. (*\"First, we'll look at the problem. Then, I'll demonstrate the new code.\"*)\n3. **Transitions**: Move smoothly between topics.\n   - *\"Moving on to the next point...\"*\n   - *\"As you can see in this diagram...\"*\n   - *\"Now, let's dive into the live demo...\"*\n4. **The Conclusion**: Summarize and take questions. (*\"To wrap up, this new architecture saves us money. Are there any questions?\"*)\n\n### Handling Questions\nIf you don't know the answer, don't panic! Use this professional phrase:\n*\"That's a great question. I don't have the exact data in front of me right now, but I can look into it and get back to you.\"*\n\n### Common Pitfalls ⚠️\nDon't read directly from your slides. Your slides should contain summaries, and you should provide the detail verbally.",
      codeExample: "Sentence: As you can see in this demo, the application is highly scalable.\n\nPhonetics: /æz ju kæn si ɪn ðɪs ˈdɛmoʊ, ði ˌæpləˈkeɪʃən ɪz ˈhaɪli ˈskeɪləbəl/\n\nFocus: Pause slightly after 'demo' to let the audience digest.",
      exercises: {
        beginner: { 
          type: "quiz",
          prompt: "Which phrase is a good transition?",
          options: ["Moving on to...", "I don't know...", "What's this..."],
          correctOption: 0,
          starterCode: "",
          expectedOutput: ""
        },
        intermediate: { 
          type: "speaking",
          prompt: "Challenge: Introduce your demo! 🎤",
          starterCode: "Let's dive into the live demo.",
          expectedOutput: ""
        },
        advanced: { 
          type: "code",
          prompt: "Print the word 'demo'.",
          starterCode: "print('___')",
          expectedOutput: "demo"
        }
      }
    }
  ];
}


function agenticAi(): CareerLesson[] {
  return [
    {
      id: "agentic-best-practices",
      title: "0. Best Practices & Classic Mistakes",
      description: "Dos, Don'ts, and what to avoid in Agentic AI",
      category: "Foundations",
      content:
        "## The Golden Rules of AI Agents 🤖\n\nBefore giving LLMs access to tools and APIs, you must learn the rules of prompt engineering and safety.\n\n### DOs (What you should use)\n- **DO** provide tools with extremely clear, unambiguous instructions.\n- **DO** use Structured Outputs (like JSON schemas) to ensure the AI returns data your code can actually parse.\n- **DO** include a 'Human-in-the-loop' for any destructive action (like deleting files or sending emails).\n\n### DON'Ts (Classic Mistakes)\n- **DON'T** write vague prompts ('do the thing'). Be explicit about the role, context, and desired output.\n- **DON'T** trust the LLM blindly. Always validate inputs and outputs.\n- **DON'T** pass massive contexts into every prompt if it's not needed (it's slow and expensive).",
      codeExample:
        "# DO: Clear tool instructions\n# def get_weather(location):\n#     \"\"\"Gets current weather for a specific city. Required arg: location.\"\"\"\n\n# DON'T: Vague instructions\n# def weather(loc):\n#     \"\"\"gets weather\"\"\"",
      exercises: {
        beginner: { type: "quiz", prompt: "What should you ALWAYS do before letting an AI execute a destructive action (like dropping a database)?", options: ["Tell it to be careful", "Require Human-in-the-loop approval", "Ask it twice"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "Print 'Human in the loop'", starterCode: "print('___')", expectedOutput: "Human in the loop" },
        advanced: { type: "code", prompt: "Print 'Clear instructions'", starterCode: "print('___')", expectedOutput: "Clear instructions" },
      },
    },
    {
      id: "agentic-1-foundations",
      title: "1. AI Foundations",
      description: "Concepts, Deep Learning, Mathematics, and Applications",
      content: "## AI Foundations\n\n### Concepts\n- **Supervised, unsupervised, reinforcement learning**\n\n### Deep Learning\n- Neural networks, CNNs, RNNs, transformers\n\n### Mathematics\n- Linear algebra, probability, statistics, calculus basics\n\n### Applications\n- NLP, computer vision, recommendation systems, predictive analytics",
      codeExample: "print('Use ChatGPT or Copilot for simple text summarization, Python coding, and analysis tasks')",
      translations: {
        tamil: { title: "1. AI அடிப்படைகள்", description: "கருத்துகள், ஆழமான கற்றல், கணிதம் மற்றும் பயன்பாடுகள்" },
        kannada: { title: "1. AI ಅಡಿಪಾಯಗಳು", description: "ಪರಿಕಲ್ಪನೆಗಳು, ಆಳವಾದ ಕಲಿಕೆ, ಗಣಿತ ಮತ್ತು ಅನ್ವಯಗಳು" },
        telugu: { title: "1. AI పునాదులు", description: "భావనలు, డీప్ లెర్నింగ్, గణితం మరియు అప్లికేషన్స్" },
        hindi: { title: "1. AI की नींव", description: "अवधारणाएं, गहन शिक्षा, गणित और अनुप्रयोग" }
      },
      exercises: {
        beginner: { prompt: "Type the name of the learning where the model is rewarded for good actions.", starterCode: "", expectedOutput: "reinforcement learning" },
        intermediate: { prompt: "Which network architecture revolutionized NLP?", starterCode: "", expectedOutput: "transformers" },
        advanced: { prompt: "Print 'Ready for AI'", starterCode: "", expectedOutput: "Ready for AI" }
      }
    },
    {
      id: "agentic-2-prompt-engineering",
      title: "2. Prompt Engineering",
      description: "Techniques, Advanced Prompting, and Output Control",
      content: "## Prompt Engineering\n\n### Basics\n- What is a prompt, structure (context + task + constraints + format)\n\n### Techniques\n- Role assignment, step-by-step prompting, few-shot prompting, chain-of-thought reasoning\n\n### Advanced\n- Iterative refinement, context injection, output control, multi-turn prompting",
      codeExample: "prompt = '''\nRole: Expert Python Developer\nTask: Write a SQL query\nContext: Table users(id, name)\nFormat: Just the query\n'''\nprint(prompt)",
      translations: {
        tamil: { title: "2. ப்ராம்ட் இன்ஜினியரிங்", description: "நுட்பங்கள், மேம்பட்ட தூண்டுதல் மற்றும் வெளியீடு கட்டுப்பாடு" },
        kannada: { title: "2. ಪ್ರಾಂಪ್ಟ್ ಎಂಜಿನಿಯರಿಂಗ್", description: "ತಂತ್ರಗಳು, ಸುಧಾರಿತ ಪ್ರಾಂಪ್ಟಿಂಗ್ ಮತ್ತು ಔಟ್ಪುಟ್ ನಿಯಂತ್ರಣ" },
        telugu: { title: "2. ప్రాంప్ట్ ఇంజనీరింగ్", description: "పద్ధతులు, అధునాతన ప్రాంప్టింగ్ మరియు అవుట్పుట్ నియంత్రణ" },
        hindi: { title: "2. प्रॉम्प्ट इंजीनियरिंग", description: "तकनीक, उन्नत प्रॉम्प्टिंग और आउटपुट नियंत्रण" }
      },
      exercises: {
        beginner: { prompt: "Print the components: 'context + task + constraints + format'", starterCode: "", expectedOutput: "context + task + constraints + format" },
        intermediate: { prompt: "What technique uses examples to guide the AI?", starterCode: "", expectedOutput: "few-shot" },
        advanced: { prompt: "Print the phrase for step-by-step logical reasoning.", starterCode: "", expectedOutput: "chain-of-thought" }
      }
    },
    {
      id: "agentic-3-rag",
      title: "3. Retrieval-Augmented Generation (RAG)",
      description: "Retrieve, Augment, Generate",
      content: "## Retrieval-Augmented Generation (RAG)\n\n### Concepts\n- retrieve → augment → generate workflow\n\n### Retrieval Methods\n- Keyword search, embeddings, vector databases (FAISS, Pinecone, Weaviate)\n\n### Augmentation & Applications\n- Injecting retrieved text into prompts.\n- Document Q&A bots, research assistants, customer support bots",
      codeExample: "query = 'What is RAG?'\ndocs = retrieve_documents(query)\nprompt = f'Context: {docs}\nAnswer the query: {query}'",
      translations: {
        tamil: { title: "3. RAG", description: "மீட்டெடுத்தல், பெருக்குதல், உருவாக்குதல்" },
        kannada: { title: "3. RAG", description: "ಪಡೆಯಿರಿ, ಹೆಚ್ಚಿಸಿ, ರಚಿಸಿ" },
        telugu: { title: "3. RAG", description: "తిరిగి పొందడం, పెంచడం, సృష్టించడం" },
        hindi: { title: "3. RAG", description: "पुनर्प्राप्ति, संवर्धित, जनरेशन" }
      },
      exercises: {
        beginner: { prompt: "What does RAG stand for?", starterCode: "", expectedOutput: "Retrieval-Augmented Generation" },
        intermediate: { prompt: "Name a type of database used for embeddings.", starterCode: "", expectedOutput: "vector" },
        advanced: { prompt: "Print the RAG workflow steps.", starterCode: "", expectedOutput: "retrieve augment generate" }
      }
    },
    {
      id: "agentic-4-mcp",
      title: "4. Model Context Protocol (MCP)",
      description: "Standardized protocol for connecting AI to tools",
      content: "## Model Context Protocol (MCP)\n\n### Concepts\n- Standardized protocol for connecting AI to tools/APIs\n\n### Interfaces & Plugins\n- Structured requests, safe execution, error handling\n- Calendars, CRMs, SQL databases, productivity apps",
      codeExample: "# Example MCP Connection\nprint('Connecting AI to SQL database via MCP')",
      translations: {
        tamil: { title: "4. MCP", description: "AI-ஐ கருவிகளுடன் இணைப்பதற்கான நெறிமுறை" },
        kannada: { title: "4. MCP", description: "AI ಅನ್ನು ಪರಿಕರಗಳೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಲು ಪ್ರೋಟೋಕಾಲ್" },
        telugu: { title: "4. MCP", description: "సాధనాలతో AIని కనెక్ట్ చేయడానికి ప్రోటోకాల్" },
        hindi: { title: "4. MCP", description: "AI को टूल्स से जोड़ने के लिए प्रोटोकॉल" }
      },
      exercises: {
        beginner: { prompt: "What does MCP stand for?", starterCode: "", expectedOutput: "Model Context Protocol" },
        intermediate: { prompt: "What does MCP connect AI to?", starterCode: "", expectedOutput: "tools" },
        advanced: { prompt: "Print 'Safe execution'.", starterCode: "", expectedOutput: "Safe execution" }
      }
    },
    {
      id: "agentic-5-integration",
      title: "5. Integration",
      description: "AI + Prompt Engineering + RAG + MCP",
      content: "## Integration Workflow\n\n1. **Prompt Engineering** → craft clear instructions\n2. **RAG** → retrieve knowledge from external sources\n3. **MCP** → connect AI to tools for execution\n4. **AI Model** → generate grounded, actionable responses",
      codeExample: "print('Data Analyst Assistant initialized: RAG + MCP + Prompts')",
      translations: {
        tamil: { title: "5. ஒருங்கிணைப்பு", description: "AI + Prompt Engineering + RAG + MCP" },
        kannada: { title: "5. ಏಕೀಕರಣ", description: "AI + Prompt Engineering + RAG + MCP" },
        telugu: { title: "5. ఇంటిగ్రేషన్", description: "AI + Prompt Engineering + RAG + MCP" },
        hindi: { title: "5. एकीकरण", description: "AI + Prompt Engineering + RAG + MCP" }
      },
      exercises: {
        beginner: { prompt: "Which component retrieves external knowledge?", starterCode: "", expectedOutput: "RAG" },
        intermediate: { prompt: "Which component executes tool actions?", starterCode: "", expectedOutput: "MCP" },
        advanced: { prompt: "Which component provides clear instructions?", starterCode: "", expectedOutput: "Prompt Engineering" }
      }
    },
    {
      id: "agentic-6-advanced",
      title: "6. Advanced Applications",
      description: "Business AI, Developer Workflow, and Research",
      content: "## Advanced Applications\n\n### Business AI\n- Policy retrieval (RAG) + scheduling (MCP) + reporting (prompts)\n\n### Developer Workflow\n- Code retrieval (RAG) + debugging tools (MCP) + explanations (prompts)\n\n### Research Assistant\n- Paper retrieval (RAG) + reference management (MCP) + summarization (prompts)",
      codeExample: "print('Personal AI Assistant Active')",
      translations: {
        tamil: { title: "6. மேம்பட்ட பயன்பாடுகள்", description: "வணிக AI, டெவலப்பர் பணிப்பாய்வு" },
        kannada: { title: "6. ಸುಧಾರಿತ ಅನ್ವಯಗಳು", description: "ವ್ಯಾಪಾರ AI, ಡೆವಲಪರ್ ಕೆಲಸದ ಹರಿವು" },
        telugu: { title: "6. అధునాతన అప్లికేషన్స్", description: "బిజినెస్ AI, డెవలపర్ వర్క్‌ఫ్లో" },
        hindi: { title: "6. उन्नत अनुप्रयोग", description: "व्यावसायिक AI, डेवलपर वर्कफ़्लो" }
      },
      exercises: {
        beginner: { prompt: "For developers, RAG is used for what?", starterCode: "", expectedOutput: "code retrieval" },
        intermediate: { prompt: "For business, MCP handles what?", starterCode: "", expectedOutput: "scheduling" },
        advanced: { prompt: "Print 'Personal AI Assistant'", starterCode: "", expectedOutput: "Personal AI Assistant" }
      }
    },
    {
      id: "agentic-7-ethics",
      title: "7. Ethics & Responsible AI",
      description: "Fairness, Transparency, and Privacy",
      content: "## Ethics & Responsible AI\n\n### Fairness\n- Bias detection, mitigation strategies\n\n### Transparency\n- Explainable AI (SHAP, LIME)\n\n### Privacy & Impact\n- Differential privacy, federated learning\n- Societal Impact: automation, regulation, job displacement",
      codeExample: "print('Analyzing ethical risks and applying mitigation')",
      translations: {
        tamil: { title: "7. நெறிமுறைகள் & பொறுப்பான AI", description: "நேர்மை, வெளிப்படைத்தன்மை மற்றும் தனியுரிமை" },
        kannada: { title: "7. ನೈತಿಕತೆ ಮತ್ತು ಜವಾಬ್ದಾರಿಯುತ AI", description: "ನ್ಯಾಯ, ಪಾರದರ್ಶಕತೆ ಮತ್ತು ಗೌಪ್ಯತೆ" },
        telugu: { title: "7. ఎథిక్స్ & బాధ్యతాయుతమైన AI", description: "న్యాయం, పారదర్శకత మరియు గోప్యత" },
        hindi: { title: "7. नैतिकता और जिम्मेदार AI", description: "निष्पक्षता, पारदर्शिता और गोपनीयता" }
      },
      exercises: {
        beginner: { prompt: "What does explainable AI provide?", starterCode: "", expectedOutput: "Transparency" },
        intermediate: { prompt: "Name one explainable AI framework (e.g. SHAP).", starterCode: "", expectedOutput: "SHAP" },
        advanced: { prompt: "Print 'Mitigation strategies'", starterCode: "", expectedOutput: "Mitigation strategies" }
      }
    }
  ];
}

function systemDesign(): CareerLesson[] {
  return [
    {
      id: "sysdesign-best-practices",
      title: "0. Best Practices & Classic Mistakes",
      description: "Dos, Don'ts, and what to avoid in System Design",
      category: "Foundations",
      content:
        "## The Golden Rules of Architecture 🏗️\n\nBefore designing complex distributed systems, you must learn to avoid over-engineering.\n\n### DOs (What you should use)\n- **DO** clarify the exact requirements and constraints (Scale, Read/Write ratio) before designing.\n- **DO** start with a simple monolith and scale only when necessary.\n- **DO** design stateless servers so they can scale horizontally behind a load balancer.\n\n### DON'Ts (Classic Mistakes)\n- **DON'T** use microservices for a simple MVP. It adds massive operational overhead.\n- **DON'T** build a distributed NoSQL system if a single Postgres database works perfectly fine for your scale.\n- **DON'T** forget about monitoring and alerting in your design.",
      codeExample:
        "// DO: Stateless server (can be scaled infinitely)\n// app.post('/data', (req, res) => db.insert(req.body));\n\n// DON'T: Stateful server (breaks behind a load balancer)\n// const localState = {}; \n// app.post('/data', (req, res) => localState[req.id] = req.body);",
      exercises: {
        beginner: { type: "quiz", prompt: "Should you always use Microservices for a brand new startup's MVP?", options: ["Yes, to be web-scale", "No, start with a simple monolith", "Only if using Node.js"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { prompt: "Print 'Avoid over-engineering'.", starterCode: "print('___')", expectedOutput: "Avoid over-engineering" },
        advanced: { prompt: "Print 'Design stateless servers'.", starterCode: "print('___')", expectedOutput: "Design stateless servers" },
      },
    },
    {
      id: "sd-1-foundations",
      title: "Module 1: Foundations",
      description: "Core concepts: Scalability, Reliability, and Availability.",
      content: "## Foundations of System Design 🏗️\n\nSystem design is the process of defining the architecture, components, and interfaces for a system to satisfy specific requirements.\n\n### Key Metrics (The 'ilities')\n- **Scalability**: The ability to handle increased load (Horizontal vs Vertical).\n- **Reliability**: The system's ability to remain functional even in the face of component failures.\n- **Availability**: The percentage of time the system is operational.\n- **Maintainability**: How easy it is to evolve and repair the system.\n\n### Client-Server Architecture\nThe basic model where a 'client' (browser/app) requests resources or services from a 'server'.",
      codeExample: "print('Measuring System Availability: 99.9% uptime')",
      exercises: {
        beginner: { type: "quiz", prompt: "Which metric measures the percentage of time a system is functional?", options: ["Scalability", "Availability", "Reliability"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "Define horizontal scaling in one sentence.", starterCode: "", expectedOutput: "Adding more machines to a system." },
        advanced: { type: "code", prompt: "Print 'High Availability'", starterCode: "print('___')", expectedOutput: "High Availability" }
      }
    },
    {
      id: "sd-2-networking",
      title: "Module 2: Networking Basics",
      description: "HTTP, DNS, Load Balancers, and Reverse Proxies.",
      content: "## Networking for Systems 🌐\n\nTo design distributed systems, you must understand how data moves.\n\n### Key Protocols\n- **HTTP/HTTPS**: The foundation of web data exchange.\n- **DNS**: Maps human-readable names (google.com) to IP addresses.\n- **TCP/IP**: Ensures reliable delivery of packets.\n\n### Load Balancers & Proxies\n- **Load Balancer**: Distributes traffic across multiple servers.\n- **Reverse Proxy**: Acts as a gateway, providing security and caching (e.g., Nginx).",
      codeExample: "import requests\nresponse = requests.get('https://dns.google/resolve?name=example.com')\nprint(response.json())",
      exercises: {
        beginner: { type: "quiz", prompt: "What maps domain names to IP addresses?", options: ["HTTP", "DNS", "TCP"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "What tool distributes traffic across servers?", starterCode: "", expectedOutput: "Load Balancer" },
        advanced: { type: "code", prompt: "Print the acronym for Domain Name System", starterCode: "print('___')", expectedOutput: "DNS" }
      }
    },
    {
      id: "sd-3-databases",
      title: "Module 3: Databases",
      description: "SQL vs NoSQL, Sharding, and Consistency.",
      content: "## Data Storage 🗄️\n\nChoosing the right database is one of the most critical decisions in system design.\n\n### SQL vs NoSQL\n- **SQL (Relational)**: Structured, ACID compliant, good for complex queries (e.g., PostgreSQL).\n- **NoSQL (Non-Relational)**: Flexible schema, horizontal scaling, good for large data (e.g., MongoDB, Cassandra).\n\n### Advanced Concepts\n- **Indexing**: Speeds up read operations.\n- **Sharding**: Splitting data across multiple database instances.\n- **Replication**: Copying data across multiple servers for redundancy.",
      codeExample: "import sqlite3\nconn = sqlite3.connect(':memory:')\nconn.execute('CREATE TABLE users (id INT, name TEXT)')\nprint('SQL Database Ready')",
      exercises: {
        beginner: { type: "quiz", prompt: "Which type of database is typically ACID compliant?", options: ["SQL", "NoSQL", "Neither"], correctOption: 0, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "What is splitting data across database instances called?", starterCode: "", expectedOutput: "Sharding" },
        advanced: { type: "code", prompt: "Print 'ACID'", starterCode: "print('___')", expectedOutput: "ACID" }
      }
    },
    {
      id: "sd-4-storage",
      title: "Module 4: Storage Systems",
      description: "File systems, Object storage, and Partitioning.",
      content: "## Distributed Storage 📦\n\nHow do we store massive amounts of unstructured data (images, videos)?\n\n### Storage Types\n- **File Systems**: Hierarchical (e.g., HDFS).\n- **Object Storage**: Flat structure, highly scalable (e.g., AWS S3).\n- **Block Storage**: High performance (e.g., EBS).\n\n### Data Partitioning\nBreaking a large dataset into smaller, more manageable parts called partitions to improve performance and scalability.",
      codeExample: "print('Simulating S3 Object Upload...')\nprint('Object: profile_pic.jpg, Size: 2MB')",
      exercises: {
        beginner: { type: "quiz", prompt: "Which storage type is best for large scale flat data like images?", options: ["File System", "Object Storage", "Block Storage"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "What is HDFS commonly used for?", starterCode: "", expectedOutput: "Big Data" },
        advanced: { type: "code", prompt: "Print 'Object Storage'", starterCode: "print('___')", expectedOutput: "Object Storage" }
      }
    },
    {
      id: "sd-5-caching",
      title: "Module 5: Caching",
      description: "Redis, Memcached, and Invalidation strategies.",
      content: "## The Speed Layer ⚡\n\nCaching is the most effective way to improve performance by keeping frequent data in RAM.\n\n### Tools\n- **Redis**: Key-value store, supports complex data types.\n- **Memcached**: Simple, high-speed key-value store.\n\n### Invalidation Strategies\n- **TTL (Time To Live)**: Data expires after a certain time.\n- **Write-Through**: Data is updated in cache and DB simultaneously.\n- **Cache Aside**: Application checks cache first, then DB.",
      codeExample: "cache = {'user:123': 'John Doe'}\nprint(f'Fetching from cache: {cache.get(\"user:123\")}')",
      exercises: {
        beginner: { type: "quiz", prompt: "Which tool is a common key-value store for caching?", options: ["PostgreSQL", "Redis", "Kafka"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "What does TTL stand for?", starterCode: "", expectedOutput: "Time To Live" },
        advanced: { type: "code", prompt: "Print 'Cache Hit'", starterCode: "print('___')", expectedOutput: "Cache Hit" }
      }
    },
    {
      id: "sd-6-messaging",
      title: "Module 6: Messaging & Queues",
      description: "Kafka, RabbitMQ, and Event-driven architecture.",
      content: "## Decoupling Systems 📬\n\nMessage queues allow different parts of a system to communicate asynchronously.\n\n### Core Components\n- **Producer**: Sends messages to the queue.\n- **Queue/Broker**: Stores messages (e.g., Kafka, RabbitMQ).\n- **Consumer**: Retrieves and processes messages.\n\n### Benefits\n- **Async Processing**: Tasks like sending emails can be handled later.\n- **Load Leveling**: Handle spikes in traffic without crashing.\n- **Decoupling**: Services don't need to know about each other.",
      codeExample: "print('Producer: Sending order_created event to Kafka...')",
      exercises: {
        beginner: { type: "quiz", prompt: "Which component retrieves and processes messages from a queue?", options: ["Producer", "Consumer", "Broker"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "Name one popular message broker.", starterCode: "", expectedOutput: "Kafka" },
        advanced: { type: "code", prompt: "Print 'Message Queue'", starterCode: "print('___')", expectedOutput: "Message Queue" }
      }
    },
    {
      id: "sd-7-concurrency",
      title: "Module 7: Concurrency & Parallelism",
      description: "Threads, Processes, and Async I/O.",
      content: "## Doing More at Once 🧵\n\nUnderstanding how Python handles multiple tasks is vital for high-performance systems.\n\n### Key Concepts\n- **Threads**: Shared memory, good for I/O bound tasks.\n- **Processes**: Separate memory, good for CPU bound tasks (overcomes the GIL).\n- **Async I/O**: Single-threaded concurrent execution (e.g., `asyncio`).\n\n### Common Issues\n- **Race Conditions**: Two threads accessing the same data simultaneously.\n- **Deadlocks**: Two threads waiting for each other to release a lock.",
      codeExample: "import asyncio\nasync def main():\n    print('Hello')\n    await asyncio.sleep(1)\n    print('World')\nasyncio.run(main())",
      exercises: {
        beginner: { type: "quiz", prompt: "Which Python module is used for single-threaded concurrent execution?", options: ["threading", "multiprocessing", "asyncio"], correctOption: 2, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "What does GIL stand for?", starterCode: "", expectedOutput: "Global Interpreter Lock" },
        advanced: { type: "code", prompt: "Print 'Deadlock'", starterCode: "print('___')", expectedOutput: "Deadlock" }
      }
    },
    {
      id: "sd-8-microservices",
      title: "Module 8: Microservices & APIs",
      description: "REST, GraphQL, gRPC, and Gateways.",
      content: "## Distributed Services 🏗️\n\nBreaking a monolith into smaller, independent services.\n\n### API Technologies\n- **REST**: Standard HTTP verbs, JSON (most common).\n- **GraphQL**: Client requests exactly what data it needs.\n- **gRPC**: High performance, uses Protocol Buffers.\n\n### Service Infrastructure\n- **API Gateway**: Single entry point for all clients.\n- **Service Discovery**: How services find each other's IP addresses.",
      codeExample: "print('Gateway: Routing request to /auth-service...')",
      exercises: {
        beginner: { type: "quiz", prompt: "Which technology allows clients to request exactly the data they need?", options: ["REST", "GraphQL", "gRPC"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "What is a single entry point for all API clients called?", starterCode: "", expectedOutput: "API Gateway" },
        advanced: { type: "code", prompt: "Print 'Microservices'", starterCode: "print('___')", expectedOutput: "Microservices" }
      }
    },
    {
      id: "sd-9-dist-systems",
      title: "Module 9: Distributed Systems",
      description: "CAP theorem, Consensus, and Leader election.",
      content: "## The Distributed Reality 🌍\n\nWhen systems are distributed, failures are inevitable.\n\n### CAP Theorem\nIn a distributed system, you can only have two of the following:\n- **Consistency**: All nodes see the same data at the same time.\n- **Availability**: Every request receives a response.\n- **Partition Tolerance**: The system continues to operate despite network failures.\n\n### Consensus Algorithms\nHow nodes agree on a single value (e.g., Raft, Paxos). Used for leader election.",
      codeExample: "print('Leader Election: Node 3 is now the leader.')",
      exercises: {
        beginner: { type: "quiz", prompt: "According to CAP theorem, if you prioritize Consistency and Availability, what must you sacrifice during a network partition?", options: ["Consistency", "Availability", "Partition Tolerance"], correctOption: 2, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "Name one consensus algorithm.", starterCode: "", expectedOutput: "Raft" },
        advanced: { type: "code", prompt: "Print 'CAP Theorem'", starterCode: "print('___')", expectedOutput: "CAP Theorem" }
      }
    },
    {
      id: "sd-10-security",
      title: "Module 10: Security & Authentication",
      description: "OAuth, JWT, and Rate Limiting.",
      content: "## Protecting the System 🛡️\n\nSecurity must be built in from the start, not added as an afterthought.\n\n### Authentication & Authorization\n- **JWT (JSON Web Tokens)**: Stateless authentication.\n- **OAuth 2.0**: The industry standard for authorization.\n\n### System Protection\n- **Rate Limiting**: Preventing abuse by limiting requests from a single user.\n- **Hashing**: Storing passwords securely using algorithms like Argon2 or bcrypt.",
      codeExample: "import hashlib\npassword = 'secure_pass'\nhash_obj = hashlib.sha256(password.encode())\nprint(f'Password Hash: {hash_obj.hexdigest()}')",
      exercises: {
        beginner: { type: "quiz", prompt: "Which standard is used for stateless authentication in modern web apps?", options: ["JWT", "Session Cookies", "SAML"], correctOption: 0, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "What prevents abuse by limiting user requests?", starterCode: "", expectedOutput: "Rate Limiting" },
        advanced: { type: "code", prompt: "Print 'JWT'", starterCode: "print('___')", expectedOutput: "JWT" }
      }
    },
    {
      id: "sd-11-monitoring",
      title: "Module 11: Monitoring & Logging",
      description: "Observability, Alerting, and SLA/SLO.",
      content: "## System Health 🩺\n\nYou can't fix what you can't see. Monitoring is essential for maintaining a healthy system.\n\n### The Pillars of Observability\n- **Metrics**: Quantitative data (CPU usage, request count).\n- **Logging**: Detailed records of events (Errors, info messages).\n- **Tracing**: Tracking a request's path through multiple services.\n\n### Reliability Targets\n- **SLA (Service Level Agreement)**: A contract with users about uptime.\n- **SLO (Service Level Objective)**: Internal target for reliability.\n- **SLI (Service Level Indicator)**: Current measurement of reliability.",
      codeExample: "print('Monitoring: API Latency is 120ms (Within SLO)')",
      exercises: {
        beginner: { type: "quiz", prompt: "Which pillar of observability tracks a request's path through services?", options: ["Metrics", "Logging", "Tracing"], correctOption: 2, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "What does SLA stand for?", starterCode: "", expectedOutput: "Service Level Agreement" },
        advanced: { type: "code", prompt: "Print 'Observability'", starterCode: "print('___')", expectedOutput: "Observability" }
      }
    },
    {
      id: "sd-12-scalability",
      title: "Module 12: Scalability Patterns",
      description: "Sharding, Replication, and Statelessness.",
      content: "## Growth Strategies 📈\n\nHow do we scale a system to support millions of users?\n\n### Scaling the Database\n- **Replication**: Master-Slave (Master for writes, Slaves for reads) or Multi-Master.\n- **Sharding**: Partitioning data by a key (e.g., User ID).\n\n### Scaling the Application\n- **Stateless Services**: Storing session data in a database/cache instead of the server's memory. This allows any server to handle any request.",
      codeExample: "print('Routing request to instance_4 (Stateless Layer)')",
      exercises: {
        beginner: { type: "quiz", prompt: "In a Master-Slave replication setup, which node typically handles write operations?", options: ["Master", "Slave", "Both"], correctOption: 0, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "What is splitting data across multiple DBs called?", starterCode: "", expectedOutput: "Sharding" },
        advanced: { type: "code", prompt: "Print 'Stateless'", starterCode: "print('___')", expectedOutput: "Stateless" }
      }
    },
    {
      id: "sd-13-high-availability",
      title: "Module 13: High Availability & Fault Tolerance",
      description: "Failover, Redundancy, and Disaster Recovery.",
      content: "## Never Going Down 🛡️\n\nHigh Availability (HA) ensures a system is available as much as possible.\n\n### Key Techniques\n- **Redundancy**: Having multiple copies of everything (servers, databases, power supplies).\n- **Failover**: Automatically switching to a backup instance when the primary fails.\n- **Health Checks**: Constantly monitoring if a service is 'alive' and 'healthy'.",
      codeExample: "print('Failover Triggered: Primary server down, switching to Secondary...')",
      exercises: {
        beginner: { type: "quiz", prompt: "What is the process of automatically switching to a backup server called?", options: ["Redundancy", "Failover", "Sharding"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "What does HA stand for?", starterCode: "", expectedOutput: "High Availability" },
        advanced: { type: "code", prompt: "Print 'Redundancy'", starterCode: "print('___')", expectedOutput: "Redundancy" }
      }
    },
    {
      id: "sd-14-cloud",
      title: "Module 14: Cloud & Deployment",
      description: "Docker, Kubernetes, and CI/CD.",
      content: "## Modern Infrastructure ☁️\n\nThe cloud has changed how we deploy and manage systems.\n\n### Containerization\n- **Docker**: Packaging an application and its dependencies into a single container.\n- **Kubernetes (K8s)**: Orchestrating and managing thousands of containers.\n\n### CI/CD\n- **Continuous Integration**: Automatically building and testing code.\n- **Continuous Deployment**: Automatically deploying tested code to production.",
      codeExample: "print('Deploying to Kubernetes Cluster: v2.1.0 Ready')",
      exercises: {
        beginner: { type: "quiz", prompt: "Which tool is commonly used for container orchestration?", options: ["Docker", "Kubernetes", "Nginx"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "What does CI stand for?", starterCode: "", expectedOutput: "Continuous Integration" },
        advanced: { type: "code", prompt: "Print 'Kubernetes'", starterCode: "print('___')", expectedOutput: "Kubernetes" }
      }
    },
    {
      id: "sd-15-case-studies",
      title: "Module 15: Case Studies & Projects",
      description: "Designing Twitter, Uber, and YouTube.",
      content: "## Real-world Design 🌍\n\nLet's apply everything we've learned to design massive systems.\n\n### Project: Design a Twitter Feed\n- **Requirements**: Fast reads, eventual consistency.\n- **Architecture**: Fan-out on write (pushing tweets to followers' timelines).\n\n### Project: Design YouTube\n- **Requirements**: Handle massive video uploads, global delivery.\n- **Architecture**: CDN for video delivery, transcoding workers, blob storage.",
      codeExample: "print('Case Study: Designing a high-throughput feed system...')",
      exercises: {
        beginner: { type: "quiz", prompt: "For a high-traffic video site like YouTube, what is essential for fast global delivery?", options: ["A single big DB", "A CDN", "Synchronous processing"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "What is pushing a tweet to all followers called?", starterCode: "", expectedOutput: "Fan-out" },
        advanced: { type: "code", prompt: "Print 'Case Study'", starterCode: "print('___')", expectedOutput: "Case Study" }
      }
    },
  ];
}

function softwareTesting(): CareerLesson[] {
  return [
    {
      id: "qa-best-practices",
      title: "0. Best Practices & Classic Mistakes",
      description: "Dos, Don'ts, and what to avoid in Software Testing",
      category: "Foundations",
      content:
        "## The Golden Rules of QA 🧪\n\nBefore writing test suites, you must learn what makes a test useful versus what makes it annoying.\n\n### DOs (What you should use)\n- **DO** write tests that verify *behavior*, not internal implementation details.\n- **DO** test both the 'Happy Path' (when everything works) and Edge Cases (errors, empty inputs).\n- **DO** ensure tests are deterministic (they either always pass or always fail on the same code).\n\n### DON'Ts (Classic Mistakes)\n- **DON'T** write flaky tests that depend on an active internet connection or slow 3rd party APIs (mock them!).\n- **DON'T** assert on exact string error messages if they change frequently (assert on status codes or error types instead).\n- **DON'T** try to achieve 100% code coverage at the expense of writing meaningful tests.",
      codeExample:
        "# DO: Test behavior\n# def test_addition(): assert add(2, 2) == 4\n\n# DON'T: Test implementation (too brittle)\n# def test_addition(): assert add.__code__.co_varnames == ('a', 'b')",
      exercises: {
        beginner: { type: "quiz", prompt: "What should you do if your test relies on a slow external weather API?", options: ["Add time.sleep(10)", "Mock the API response", "Skip the test entirely"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "Print 'Mock external APIs'", starterCode: "print('___')", expectedOutput: "Mock external APIs" },
        advanced: { type: "code", prompt: "Print 'Test behavior not implementation'", starterCode: "print('___')", expectedOutput: "Test behavior not implementation" },
      },
    },
    {
      id: "qa-1-intro",
      title: "Module 1: Introduction to Testing",
      description: "Why testing matters, QA vs QC, and SDLC/STLC.",
      content: "## The Importance of Quality 🛡️\n\nSoftware testing is the process of evaluating and verifying that a software product or application does what it is supposed to do.\n\n### Core Concepts\n- **QA (Quality Assurance)**: Process-oriented. Focuses on preventing defects.\n- **QC (Quality Control)**: Product-oriented. Focuses on identifying defects.\n- **Testing**: The actual execution of finding bugs.\n\n### Life Cycles\n- **SDLC**: Software Development Life Cycle.\n- **STLC**: Software Testing Life Cycle (Requirement Analysis -> Test Planning -> Test Case Development -> Environment Setup -> Test Execution -> Test Closure).",
      codeExample: "def calculate_total(price, tax):\n    return price + tax\n\n# A simple test to ensure logic is correct\nassert calculate_total(100, 10) == 110\nprint('Logic Verified!')",
      exercises: {
        beginner: { type: "quiz", prompt: "Which of these is process-oriented and focuses on preventing defects?", options: ["QA", "QC", "Testing"], correctOption: 0, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "What does STLC stand for?", starterCode: "", expectedOutput: "Software Testing Life Cycle" },
        advanced: { type: "code", prompt: "Write an assert statement that checks if 5 + 5 is 10.", starterCode: "___ 5 + 5 == 10", expectedOutput: "assert" }
      }
    },
    {
      id: "qa-2-fundamentals",
      title: "Module 2: Testing Fundamentals",
      description: "Manual vs Auto, Levels of testing, and Box models.",
      content: "## Testing Strategies 🔍\n\nHow we test depends on the level and the access we have to the code.\n\n### Manual vs Automated\n- **Manual**: Human execution of test cases without tools.\n- **Automated**: Using tools (like pytest or Selenium) to execute tests automatically.\n\n### Levels of Testing\n1. **Unit**: Smallest components (functions).\n2. **Integration**: Modules working together.\n3. **System**: Complete integrated system.\n4. **Acceptance**: Validating against user requirements (UAT).\n\n### Box Models\n- **Black-box**: Testing without knowing internal code structure.\n- **White-box**: Testing with full knowledge of internal code.",
      codeExample: "import unittest\n\nclass TestSum(unittest.TestCase):\n    def test_list_int(self):\n        self.assertEqual(sum([1, 2, 3]), 6)\n\nprint('Running Unit Tests...')",
      exercises: {
        beginner: { type: "quiz", prompt: "Testing without knowing the internal code structure is called...", options: ["White-box", "Grey-box", "Black-box"], correctOption: 2, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "What level of testing checks the smallest components?", starterCode: "", expectedOutput: "Unit Testing" },
        advanced: { type: "code", prompt: "Print 'Unit Testing'", starterCode: "print('___')", expectedOutput: "Unit Testing" }
      }
    },
    {
      id: "qa-3-documentation",
      title: "Module 3: Test Planning & Documentation",
      description: "Test plans, strategies, and traceability.",
      content: "## Organizing the Search 📝\n\nGood testing requires rigorous documentation to ensure nothing is missed.\n\n### Key Documents\n- **Test Plan**: High-level document outlining the strategy, resources, and schedule.\n- **Test Case**: Specific conditions or variables to determine if a feature works.\n- **Traceability Matrix (RTM)**: A map that links requirements to the test cases that verify them.\n\n### Test Scenario vs Case\n- **Scenario**: 'Check Login functionality' (High level).\n- **Case**: 'Enter valid email and wrong password' (Detailed steps).",
      codeExample: "# Test Case ID: TC001\n# Scenario: Login Validation\n# Input: email='test@dev.com', pass='123'\n# Expected: Error Message shown",
      exercises: {
        beginner: { type: "quiz", prompt: "Which document links requirements to test cases?", options: ["Test Plan", "RTM", "Checklist"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "What does RTM stand for?", starterCode: "", expectedOutput: "Requirement Traceability Matrix" },
        advanced: { type: "code", prompt: "Print 'Test Case'", starterCode: "print('___')", expectedOutput: "Test Case" }
      }
    },
    {
      id: "qa-4-functional",
      title: "Module 4: Functional Testing",
      description: "Smoke, Sanity, Regression, and Exploratory.",
      content: "## Ensuring it Works ⚙️\n\nFunctional testing verifies that the software performs as expected.\n\n### Key Types\n- **Smoke Testing**: Quick check to see if the main features work (Initial build).\n- **Sanity Testing**: Deep check of specific new features or bug fixes.\n- **Regression Testing**: Re-testing everything to ensure new changes didn't break old features.\n- **Exploratory Testing**: Informal, manual testing where testers 'explore' the app for bugs.",
      codeExample: "print('Executing Smoke Test...')\nprint('Step 1: App Launch - OK')\nprint('Step 2: Login - OK')\nprint('Smoke Test Passed!')",
      exercises: {
        beginner: { type: "quiz", prompt: "Which test ensures that new changes didn't break existing functionality?", options: ["Smoke", "Regression", "Sanity"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "What is informal, creative testing called?", starterCode: "", expectedOutput: "Exploratory Testing" },
        advanced: { type: "code", prompt: "Print 'Regression Test'", starterCode: "print('___')", expectedOutput: "Regression Test" }
      }
    },
    {
      id: "qa-5-non-functional",
      title: "Module 5: Non-Functional Testing",
      description: "Performance, Security, and Accessibility.",
      content: "## Beyond Functionality 🚀\n\nNon-functional testing checks the quality of the system, not just what it does.\n\n### Key Areas\n- **Performance Testing**: Checks speed, scalability, and stability under load (Stress vs Load testing).\n- **Security Testing**: Finds vulnerabilities and ensures data protection.\n- **Usability Testing**: Evaluates how user-friendly the application is.\n- **Accessibility (a11y)**: Ensures the app is usable by people with disabilities.",
      codeExample: "print('Running Load Test: Simulating 10,000 concurrent users...')\nprint('Average Response Time: 150ms')",
      exercises: {
        beginner: { type: "quiz", prompt: "Which type of testing checks the system under extreme load to see when it fails?", options: ["Load Testing", "Stress Testing", "Usability Testing"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "What is the common abbreviation for Accessibility?", starterCode: "", expectedOutput: "a11y" },
        advanced: { type: "code", prompt: "Print 'Performance Testing'", starterCode: "print('___')", expectedOutput: "Performance Testing" }
      }
    },
    {
      id: "qa-6-automation",
      title: "Module 6: Automation Testing",
      description: "Frameworks, Selenium, and Playwright.",
      content: "## The Power of Scripting 🤖\n\nAutomation saves time and reduces human error in repetitive testing tasks.\n\n### Popular Frameworks\n- **Selenium**: The industry standard for web browser automation.\n- **Playwright/Cypress**: Modern, faster alternatives with better developer experience.\n- **Appium**: For mobile application automation.\n\n### Why Automate?\n- Faster execution of regression suites.\n- Ability to run tests on multiple browsers/OS simultaneously.",
      codeExample: "from selenium import webdriver\n\ndriver = webdriver.Chrome()\ndriver.get('https://www.google.com')\nprint(f'Title: {driver.title}')\ndriver.quit()",
      exercises: {
        beginner: { type: "quiz", prompt: "Which tool is the long-standing industry standard for web browser automation?", options: ["Postman", "Selenium", "JIRA"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "Name one modern alternative to Selenium.", starterCode: "", expectedOutput: "Playwright" },
        advanced: { type: "code", prompt: "Print 'Automation'", starterCode: "print('___')", expectedOutput: "Automation" }
      }
    },
    {
      id: "qa-7-api-backend",
      title: "Module 7: API & Backend Testing",
      description: "REST, GraphQL, and Postman.",
      content: "## Testing the Engine ⚙️\n\nAPI testing focuses on the business logic layer without the UI.\n\n### Tools & Techniques\n- **Postman**: A powerful GUI tool for testing APIs.\n- **Newman**: Command-line runner for Postman collections.\n- **Response Validation**: Checking status codes (200, 404), headers, and JSON payloads.\n\n### Key Status Codes\n- **2xx**: Success.\n- **4xx**: Client Error (e.g., 401 Unauthorized).\n- **5xx**: Server Error.",
      codeExample: "import requests\n\nresponse = requests.get('https://api.github.com/zen')\nprint(f'Status: {response.status_code}')\nassert response.status_code == 200",
      exercises: {
        beginner: { type: "quiz", prompt: "What HTTP status code indicates a successful request?", options: ["200", "404", "500"], correctOption: 0, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "Which library is commonly used in Python for API testing?", starterCode: "", expectedOutput: "requests" },
        advanced: { type: "code", prompt: "Print 'API Testing'", starterCode: "print('___')", expectedOutput: "API Testing" }
      }
    },
    {
      id: "qa-8-devops",
      title: "Module 8: Continuous Testing & DevOps",
      description: "CI/CD, Pipelines, and Shift-left.",
      content: "## Testing at the Speed of Code ⚡\n\nIn modern DevOps, testing is integrated directly into the deployment pipeline.\n\n### Concepts\n- **CI/CD**: Continuous Integration and Continuous Deployment.\n- **Pipelines**: Automated workflows (GitHub Actions, Jenkins) that run tests on every commit.\n- **Shift-left Testing**: Moving testing earlier in the development process to catch bugs sooner.",
      codeExample: "print('CI Pipeline: Running Unit Tests...')\nprint('CI Pipeline: Running Linting...')\nprint('Build Successful!')",
      exercises: {
        beginner: { type: "quiz", prompt: "What is the practice of moving testing earlier in the development process called?", options: ["Shift-right", "Shift-left", "Waterfall"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "What does CI stand for?", starterCode: "", expectedOutput: "Continuous Integration" },
        advanced: { type: "code", prompt: "Print 'Pipeline'", starterCode: "print('___')", expectedOutput: "Pipeline" }
      }
    },
    {
      id: "qa-9-bug-tracking",
      title: "Module 9: Bug Tracking & Reporting",
      description: "Defect lifecycle, JIRA, and Bug reports.",
      content: "## Managing Defects 🐞\n\nA bug is only useful if it's reported clearly and tracked until it's fixed.\n\n### Defect Lifecycle\nNew -> Assigned -> Open -> Fixed -> Pending Retest -> Verified -> Closed.\n\n### Writing a Great Bug Report\n- **Summary**: Concise description.\n- **Steps to Reproduce**: Detailed list of actions.\n- **Expected vs Actual Result**: What happened vs what should have happened.\n- **Severity/Priority**: How bad is it? How soon does it need a fix?",
      codeExample: "# Bug ID: BUG-402\n# Title: App crashes on empty login\n# Severity: Critical\n# Steps: 1. Clear fields, 2. Click Login\n# Actual: Crash",
      exercises: {
        beginner: { type: "quiz", prompt: "What is the correct final state of a successfully fixed and verified bug?", options: ["Fixed", "Closed", "Verified"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "Name one popular bug tracking tool.", starterCode: "", expectedOutput: "JIRA" },
        advanced: { type: "code", prompt: "Print 'Bug Report'", starterCode: "print('___')", expectedOutput: "Bug Report" }
      }
    },
    {
      id: "qa-10-advanced",
      title: "Module 10: Advanced Topics",
      description: "Mocking, Stubbing, and Virtualization.",
      content: "## Mastering the Environment 🧪\n\nAdvanced testing involves simulating external systems to ensure isolated tests.\n\n### Key Techniques\n- **Mocking**: Creating objects that simulate the behavior of real objects (e.g., `unittest.mock`).\n- **Stubbing**: Providing pre-defined data to a function during testing.\n- **Virtualization**: Simulating complex environments (Service Virtualization) so you don't need the real system to be online.",
      codeExample: "from unittest.mock import MagicMock\n\n# Mocking a database call\ndb = MagicMock()\ndb.get_user.return_value = {'name': 'Mock User'}\nprint(db.get_user(123))",
      exercises: {
        beginner: { type: "quiz", prompt: "What technique involves creating objects that simulate the behavior of real dependencies?", options: ["Mocking", "Tracing", "Profiling"], correctOption: 0, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "What Python module is used for mocking?", starterCode: "", expectedOutput: "unittest.mock" },
        advanced: { type: "code", prompt: "Print 'Mock Object'", starterCode: "print('___')", expectedOutput: "Mock Object" }
      }
    },
    {
      id: "qa-11-metrics",
      title: "Module 11: QA Metrics & Quality Gates",
      description: "Code coverage and Release readiness.",
      content: "## Measuring Quality 📊\n\nMetrics help teams decide if a product is ready for release.\n\n### Key Metrics\n- **Code Coverage**: The percentage of code executed by tests.\n- **Defect Density**: Number of bugs per size of the module.\n- **Pass/Fail Rate**: Percentage of test cases that passed.\n\n### Quality Gates\nA set of criteria that must be met (e.g., >80% coverage, 0 critical bugs) before the code can move to the next stage.",
      codeExample: "print('Quality Gate Check...')\nprint('Code Coverage: 85% (PASS)')\nprint('Critical Bugs: 0 (PASS)')\nprint('Ready for Release!')",
      exercises: {
        beginner: { type: "quiz", prompt: "What metric measures the percentage of code executed by your test suite?", options: ["Defect Density", "Code Coverage", "SLA"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "What are criteria for moving code forward called?", starterCode: "", expectedOutput: "Quality Gates" },
        advanced: { type: "code", prompt: "Print 'Quality Gate'", starterCode: "print('___')", expectedOutput: "Quality Gate" }
      }
    },
    {
      id: "qa-12-case-studies",
      title: "Module 12: Case Studies & Projects",
      description: "E2E Web testing and API regression.",
      content: "## Real-world QA 🌎\n\nApplying your skills to build a complete quality strategy.\n\n### Project: Web App E2E\n- **Task**: Automate the checkout flow of an e-commerce site using Playwright.\n- **Focus**: Handling dynamic elements, assertions, and reporting.\n\n### Project: API Regression Suite\n- **Task**: Create a collection of Postman tests for a REST API.\n- **Focus**: Validating JSON schemas and chaining requests.",
      codeExample: "print('Running Final Project: E2E Regression Suite...')\nprint('Total Tests: 50, Passed: 50')",
      exercises: {
        beginner: { type: "quiz", prompt: "Which tool is great for automating web app checkout flows?", options: ["Postman", "Playwright", "JIRA"], correctOption: 1, starterCode: "", expectedOutput: "" },
        intermediate: { type: "code", prompt: "What does E2E stand for?", starterCode: "", expectedOutput: "End-to-End" },
        advanced: { type: "code", prompt: "Print 'Final Project'", starterCode: "print('___')", expectedOutput: "Final Project" }
      }
    },
  ];
}

export const careerTracks: CareerTrack[] = rawTracks;
