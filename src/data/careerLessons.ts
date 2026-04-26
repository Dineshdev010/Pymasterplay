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
      id: "da-intro", title: "Introduction to Data Analysis", description: "What is data analysis and why Python is the best tool for it",
      content: "## What is Data Analysis?\n\nData analysis is the process of inspecting, cleaning, transforming, and modeling data to discover useful information.\n\n### Why Python for Data Analysis?\n- **Rich ecosystem** — Pandas, NumPy, Matplotlib, Seaborn\n- **Easy syntax** — Focus on logic, not boilerplate\n- **Community** — Millions of tutorials and StackOverflow answers\n- **Industry standard** — Used at Google, Netflix, NASA\n\n### The Data Analysis Workflow\n1. **Collect** data from files, APIs, or databases\n2. **Clean** — handle missing values, fix types\n3. **Explore** — summary statistics, distributions\n4. **Visualize** — charts, graphs, dashboards\n5. **Interpret** — draw conclusions, tell the story",
      codeExample: "# A taste of data analysis in Python\nimport pandas as pd\n\ndata = {\n    \"Name\": [\"Alice\", \"Bob\", \"Charlie\"],\n    \"Age\": [25, 30, 35],\n    \"Salary\": [50000, 60000, 70000]\n}\n\ndf = pd.DataFrame(data)\nprint(df)\nprint(\"Average salary:\", df['Salary'].mean())",
      translations: {
        tamil: {
          title: "Data Analysis அறிமுகம்",
          description: "Data analysis என்றால் என்ன, ஏன் Python சிறந்த கருவி என்பதை அறியுங்கள்",
          content: "## Data Analysis என்றால் என்ன?\n\nData analysis என்பது தரவை ஆய்வு செய்து, சுத்தம் செய்து, மாற்றி, பயனுள்ள தகவலை கண்டுபிடிக்கும் செயல்முறை.\n\n### ஏன் Data Analysis க்கு Python?\n- **பெரிய ecosystem** — Pandas, NumPy, Matplotlib, Seaborn\n- **எளிய syntax** — boilerplate விட logic மீது கவனம்\n- **சமூக ஆதரவு** — ஆயிரக்கணக்கான tutorials மற்றும் உதவிகள்\n- **Industry standard** — முன்னணி நிறுவனங்களில் பயன்படுத்தப்படுகிறது\n\n### Data Analysis Workflow\n1. **Collect** — files, APIs, databases-ல் இருந்து data சேகரிக்கவும்\n2. **Clean** — missing values மற்றும் types சரி செய்யவும்\n3. **Explore** — summary stats மற்றும் patterns பார்க்கவும்\n4. **Visualize** — charts, graphs உருவாக்கவும்\n5. **Interpret** — முடிவுகளை எடுத்துரைக்கவும்",
        },
        kannada: {
          title: "Data Analysis ಪರಿಚಯ",
          description: "Data analysis ಎಂದರೇನು ಮತ್ತು ಅದಕ್ಕೆ Python ಯಾಕೆ ಉತ್ತಮ ಎಂಬುದನ್ನು ಕಲಿಯಿರಿ",
          content: "## Data Analysis ಎಂದರೇನು?\n\nData analysis ಎಂದರೆ ಡೇಟಾವನ್ನು ಪರಿಶೀಲಿಸಿ, ಸ್ವಚ್ಛಗೊಳಿಸಿ, ಪರಿವರ್ತಿಸಿ, ಉಪಯುಕ್ತ ತಿಳಿವಳಿಕೆಯನ್ನು ಕಂಡುಹಿಡಿಯುವ ಪ್ರಕ್ರಿಯೆ.\n\n### Data Analysis ಗೆ Python ಯಾಕೆ?\n- **ದೊಡ್ಡ ecosystem** — Pandas, NumPy, Matplotlib, Seaborn\n- **ಸರಳ syntax** — boilerplate ಕ್ಕಿಂತ logic ಮೇಲೆ ಹೆಚ್ಚು ಗಮನ\n- **ಸಮುದಾಯ** — ಅನೇಕ tutorials ಮತ್ತು support\n- **Industry standard** — ದೊಡ್ಡ ಕಂಪನಿಗಳಲ್ಲಿ ವ್ಯಾಪಕ ಬಳಕೆ\n\n### Data Analysis Workflow\n1. **Collect** — files, APIs, databases ಇಂದ data ಸಂಗ್ರಹಿಸಿ\n2. **Clean** — missing values ಮತ್ತು types ಸರಿಪಡಿಸಿ\n3. **Explore** — summary statistics ಮತ್ತು patterns ನೋಡಿ\n4. **Visualize** — charts ಮತ್ತು graphs ಮಾಡಿ\n5. **Interpret** — ಸ್ಪಷ್ಟವಾದ ನಿರ್ಣಯಕ್ಕೆ ಬನ್ನಿ",
        },
        telugu: {
          title: "Data Analysis పరిచయం",
          description: "Data analysis అంటే ఏమిటి, దానికి Python ఎందుకు ఉత్తమమో తెలుసుకోండి",
          content: "## Data Analysis అంటే ఏమిటి?\n\nData analysis అనేది డేటాను పరిశీలించడం, శుభ్రపరచడం, మార్చడం, ఉపయోగకరమైన సమాచారాన్ని కనుగొనడం అనే ప్రక్రియ.\n\n### Data Analysis కి Python ఎందుకు?\n- **Rich ecosystem** — Pandas, NumPy, Matplotlib, Seaborn\n- **Simple syntax** — boilerplate కంటే logic పై ఫోకస్\n- **Community support** — ఎన్నో tutorials మరియు సహాయం\n- **Industry standard** — ప్రముఖ సంస్థల్లో విస్తృతంగా ఉపయోగిస్తారు\n\n### Data Analysis Workflow\n1. **Collect** — files, APIs, databases నుండి data సేకరించండి\n2. **Clean** — missing values మరియు types సరిచేయండి\n3. **Explore** — summary statistics మరియు patterns చూడండి\n4. **Visualize** — charts, graphs రూపొందించండి\n5. **Interpret** — స్పష్టమైన నిర్ణయాలు తీసుకోండి",
        },
        hindi: {
          title: "Data Analysis परिचय",
          description: "Data analysis क्या है और इसके लिए Python क्यों सबसे अच्छा है",
          content: "## Data Analysis क्या है?\n\nData analysis वह प्रक्रिया है जिसमें डेटा को जांचा, साफ किया, बदला और उपयोगी जानकारी निकाली जाती है।\n\n### Data Analysis के लिए Python क्यों?\n- **मजबूत ecosystem** — Pandas, NumPy, Matplotlib, Seaborn\n- **आसान syntax** — boilerplate से ज्यादा logic पर ध्यान\n- **बड़ी community** — बहुत सारे tutorials और support\n- **Industry standard** — बड़ी कंपनियों में व्यापक उपयोग\n\n### Data Analysis Workflow\n1. **Collect** — files, APIs, databases से data इकट्ठा करें\n2. **Clean** — missing values और types ठीक करें\n3. **Explore** — summary statistics और patterns देखें\n4. **Visualize** — charts और graphs बनाएं\n5. **Interpret** — स्पष्ट निष्कर्ष निकालें",
        },
      },
      exercises: {
        beginner: { prompt: "Create `nums = [10, 20, 30, 40, 50]`. Print the `sum()`, then `len()`, then the average (`sum/len`).", starterCode: "nums = [10, 20, 30, 40, 50]\n\n# Print sum, len, and average\n", expectedOutput: "150\n5\n30.0" },
        intermediate: { prompt: "Given `scores = {'Alice': 85, 'Bob': 92, 'Charlie': 78}`. Print `max()` of `.values()`, then print the key with that max score.", starterCode: "scores = {'Alice': 85, 'Bob': 92, 'Charlie': 78}\n\n# Print max score and top student name\n", expectedOutput: "92\nBob" },
        advanced: { prompt: "Given products list of dicts with `price` and `quantity`. Calculate each product's revenue (`price*qty`). Print total revenue, then the product name with highest revenue.", starterCode: "products = [\n    {'name': 'Widget', 'price': 10, 'quantity': 5},\n    {'name': 'Gadget', 'price': 25, 'quantity': 3},\n    {'name': 'Doohickey', 'price': 15, 'quantity': 8}\n]\n\n# Print total revenue and best product name\n", expectedOutput: "245\nDoohickey" },
      },
    },
    {
      id: "da-lists-data", title: "Working with Data in Lists", description: "Use Python lists as your first data structure for analysis",
      content: "## Lists as Data Containers\n\nBefore learning Pandas, master Python's built-in list for data manipulation.\n\n### Key Operations\n- **Filtering** — Select items that match a condition\n- **Mapping** — Transform every item\n- **Aggregating** — Reduce to a single value (sum, avg, max)\n- **Sorting** — Order data by a criterion\n\n### List Comprehensions\nThe Pythonic way to filter and transform data in one line.",
      codeExample: "sales = [120, 340, 250, 410, 180, 520, 300]\nhigh_sales = [s for s in sales if s > 300]\nprint(\"High sales:\", high_sales)\nprint(\"Total:\", sum(sales))\nprint(\"Average:\", round(sum(sales)/len(sales), 1))",
      translations: {
        tamil: {
          title: "Lists-ல் Data கையாளுதல்",
          description: "Data analysis க்கு Python lists-ஐ முதற்கட்ட data structure ஆக பயன்படுத்துங்கள்",
          content:
            "## Lists as Data Containers\n\nPandas கற்றுக்கொள்ளும் முன், Python list மூலம் data-ஐ filter / transform செய்வது எப்படி என்று புரிந்துகொள்ளுங்கள்.\n\n### முக்கிய செயல்கள்\n- **Filtering** — condition match ஆன items-ஐ தேர்வு செய்ய\n- **Mapping** — ஒவ்வொரு item-ஐ மாற்ற\n- **Aggregating** — sum/avg/max போல் ஒரே value-ஆக குறைக்க\n- **Sorting** — ஒரு criteria மூலம் வரிசைப்படுத்த\n\n### List Comprehensions\nஒரே line-ல் filter + transform செய்ய Pythonic வழி.",
        },
        kannada: {
          title: "Lists ನಲ್ಲಿ Data ಜೊತೆ ಕೆಲಸ",
          description: "Data analysis ಗೆ Python lists ಅನ್ನು ಮೊದಲ data structure ಆಗಿ ಬಳಸಿ",
          content:
            "## Lists as Data Containers\n\nPandas ಕಲಿಯುವ ಮೊದಲು, Python list ಬಳಸಿ data ಅನ್ನು filter / transform ಮಾಡುವುದು ಕಲಿಯಿರಿ.\n\n### Key Operations\n- **Filtering** — condition ಗೆ ಹೊಂದುವ items ಆಯ್ಕೆ\n- **Mapping** — ಪ್ರತಿಯೊಂದು item ಅನ್ನು transform\n- **Aggregating** — sum/avg/max ಮೂಲಕ ಒಂದೇ value ಗೆ reduce\n- **Sorting** — criteria ಮೂಲಕ order\n\n### List Comprehensions\nಒಂದೇ line ನಲ್ಲಿ filter + transform ಮಾಡಲು Pythonic ವಿಧಾನ.",
        },
        telugu: {
          title: "Lists లో Data తో పని చేయడం",
          description: "Data analysis కోసం Python lists ను మొదటి data structure గా ఉపయోగించండి",
          content:
            "## Lists as Data Containers\n\nPandas నేర్చుకునే ముందు, Python list తో data ని filter / transform చేయడం నేర్చుకోండి.\n\n### Key Operations\n- **Filtering** — condition కి match అయ్యే items ఎంచుకోండి\n- **Mapping** — ప్రతి item ని transform చేయండి\n- **Aggregating** — sum/avg/max లా ఒకే value కి reduce చేయండి\n- **Sorting** — criteria ఆధారంగా order చేయండి\n\n### List Comprehensions\nఒకే line లో filter + transform చేసే Pythonic విధానం.",
        },
        hindi: {
          title: "Lists में Data के साथ काम",
          description: "Data analysis के लिए Python lists को पहला data structure बनाएं",
          content:
            "## Lists as Data Containers\n\nPandas सीखने से पहले, Python list से data को filter / transform करना सीखें.\n\n### Key Operations\n- **Filtering** — condition match करने वाले items चुनें\n- **Mapping** — हर item को transform करें\n- **Aggregating** — sum/avg/max से एक value में reduce\n- **Sorting** — criteria के हिसाब से order\n\n### List Comprehensions\nएक line में filter + transform करने का Pythonic तरीका.",
        },
      },
      exercises: {
        beginner: { prompt: "Given `temps = [72, 68, 75, 80, 65]`. Print `max()`, `min()`, and `sorted(temps)` on separate lines.", starterCode: "temps = [72, 68, 75, 80, 65]\n\n# Print max, min, and sorted list\n", expectedOutput: "80\n65\n[65, 68, 72, 75, 80]" },
        intermediate: { prompt: "Use a list comprehension to filter evens from `[1,2,3,4,5,6]`. Then use another to square them. Print both lists.", starterCode: "nums = [1, 2, 3, 4, 5, 6]\n\n# Filter evens, square them, print both\n", expectedOutput: "[2, 4, 6]\n[4, 16, 36]" },
        advanced: { prompt: "Given `sales = [200, 150, 350]`. Print `sum(sales)`, then the percentage of the max sale rounded to 1 decimal with a `%` sign.", starterCode: "sales = [200, 150, 350]\n\n# Print total and max percentage\n", expectedOutput: "700\n50.0%" },
      },
    },
    {
      id: "da-dictionaries", title: "Dictionaries for Structured Data", description: "Use dictionaries to represent records and datasets",
      content: "## Dictionaries = Mini Databases\n\nDictionaries store structured data as key-value pairs — like a row in a spreadsheet.\n\n### Why Dictionaries?\n- Named access: record[\"name\"] instead of record[0]\n- Self-documenting: keys describe the data\n- Flexible: different records can have different keys\n\n### Common Patterns\n- **List of dicts** = a table (each dict is a row)\n- **Dict of lists** = columnar data\n- **Nested dicts** = hierarchical data",
      codeExample: "employees = [\n    {\"name\": \"Alice\", \"dept\": \"Engineering\", \"salary\": 95000},\n    {\"name\": \"Bob\", \"dept\": \"Marketing\", \"salary\": 72000},\n    {\"name\": \"Charlie\", \"dept\": \"Engineering\", \"salary\": 88000},\n]\neng = [e for e in employees if e[\"dept\"] == \"Engineering\"]\nprint(\"Engineering team:\", len(eng), \"people\")\navg = sum(e[\"salary\"] for e in employees) / len(employees)\nprint(\"Average salary:\", int(avg))",
      translations: {
        tamil: {
          title: "Structured Data க்கு Dictionaries",
          description: "Records மற்றும் datasets-ஐ dictionaries மூலம் பிரதிநிதித்துவப்படுத்துங்கள்",
          content:
            "## Dictionaries = Mini Databases\n\nDictionary என்பது key-value pairs ஆக structured data-ஐ சேமிக்கும் — spreadsheet-ல் ஒரு row போல.\n\n### ஏன் Dictionaries?\n- பெயரால் access: `record[\"name\"]`\n- self-documenting: keys data-ஐ விளக்கும்\n- flexible: ஒவ்வொரு record-க்கும் வேறு keys இருக்கலாம்\n\n### பொதுவான patterns\n- **List of dicts** = table (ஒவ்வொரு dict ஒரு row)\n- **Dict of lists** = column-wise data\n- **Nested dicts** = hierarchy data",
        },
        kannada: {
          title: "Structured Data ಗೆ Dictionaries",
          description: "records ಮತ್ತು datasets ಅನ್ನು dictionaries ಮೂಲಕ ಪ್ರತಿನಿಧಿಸಿ",
          content:
            "## Dictionaries = Mini Databases\n\nDictionary key-value pairs ಮೂಲಕ structured data store ಮಾಡುತ್ತದೆ — spreadsheet row ಹಾಗೆ.\n\n### Dictionaries ಯಾಕೆ?\n- named access: `record[\"name\"]`\n- self-documenting: keys data ಅರ್ಥ ಹೇಳುತ್ತವೆ\n- flexible: records ಗೆ ಬೇರೆ keys ಇರಬಹುದು\n\n### Common patterns\n- **List of dicts** = table (ಪ್ರತಿ dict ಒಂದು row)\n- **Dict of lists** = columnar data\n- **Nested dicts** = hierarchical data",
        },
        telugu: {
          title: "Structured Data కోసం Dictionaries",
          description: "records మరియు datasets ను dictionaries తో represent చేయండి",
          content:
            "## Dictionaries = Mini Databases\n\nDictionary key-value pairs గా structured data ని store చేస్తుంది — spreadsheet row లా.\n\n### ఎందుకు Dictionaries?\n- named access: `record[\"name\"]`\n- self-documenting: keys data అర్థం చెబుతాయి\n- flexible: records కి వేర్వేరు keys ఉండొచ్చు\n\n### Common patterns\n- **List of dicts** = table (ప్రతి dict ఒక row)\n- **Dict of lists** = columnar data\n- **Nested dicts** = hierarchical data",
        },
        hindi: {
          title: "Structured Data के लिए Dictionaries",
          description: "records और datasets को dictionaries से represent करें",
          content:
            "## Dictionaries = Mini Databases\n\nDictionary key-value pairs में structured data store करता है — spreadsheet row की तरह.\n\n### Dictionaries क्यों?\n- named access: `record[\"name\"]`\n- self-documenting: keys data समझाती हैं\n- flexible: अलग-अलग records में अलग keys हो सकते हैं\n\n### Common patterns\n- **List of dicts** = table (हर dict एक row)\n- **Dict of lists** = columnar data\n- **Nested dicts** = hierarchical data",
        },
      },
      exercises: {
        beginner: { prompt: "Create `d = {'name': 'Alice', 'age': 25}`. Use `.get('city', 'N/A')`. Print the name, then the `.get()` result.", starterCode: "d = {'name': 'Alice', 'age': 25}\n\n# Print name and .get() with default\n", expectedOutput: "Alice\nN/A" },
        intermediate: { prompt: "Given a list of product dicts, use `max()` with `key=` to find the most expensive. Print its `name` and `price`.", starterCode: "products = [\n    {'name': 'Laptop', 'price': 999},\n    {'name': 'Phone', 'price': 699}\n]\n\n# Find most expensive, print name and price\n", expectedOutput: "Laptop\n999" },
        advanced: { prompt: "Group employees by `dept`. Use a dict to count per dept. Print `list(counts.items())`.", starterCode: "employees = [\n    {'name': 'A', 'dept': 'Eng'},\n    {'name': 'B', 'dept': 'Sales'},\n    {'name': 'C', 'dept': 'Eng'}\n]\n\n# Count by dept, print items\n", expectedOutput: "[('Eng', 2), ('Sales', 1)]" },
      },
    },
    {
      id: "da-statistics", title: "Basic Statistics with Python", description: "Calculate mean, median, mode, and standard deviation",
      content: "## Statistics in Python\n\nStatistics helps understand data distribution and central tendencies.\n\n### Key Measures\n- **Mean** — Average value: sum/count\n- **Median** — Middle value when sorted\n- **Mode** — Most frequent value\n- **Range** — Max minus min\n- **Standard Deviation** — How spread out values are",
      codeExample: "scores = [85, 92, 78, 95, 88, 72, 90, 85, 88, 95]\nmean = sum(scores) / len(scores)\nsorted_s = sorted(scores)\nn = len(sorted_s)\nmedian = (sorted_s[n//2-1] + sorted_s[n//2]) / 2 if n % 2 == 0 else sorted_s[n//2]\nprint(\"Mean:\", mean)\nprint(\"Median:\", median)",
      translations: {
        tamil: {
          title: "Basic Statistics (Python)",
          description: "mean, median, mode, standard deviation கணக்கிடுங்கள்",
          content:
            "## Statistics in Python\n\nStatistics data distribution மற்றும் central tendency-ஐ புரிந்துகொள்ள உதவும்.\n\n### முக்கிய அளவுகள்\n- **Mean** — average: sum/count\n- **Median** — sorted ஆன பிறகு நடுப்பகுதி value\n- **Mode** — அதிகம் வரும் value\n- **Range** — max - min\n- **Standard Deviation** — values எவ்வளவு spread ஆகிறது",
        },
        kannada: {
          title: "Basic Statistics (Python)",
          description: "mean, median, mode, standard deviation ಲೆಕ್ಕಿಸಿ",
          content:
            "## Statistics in Python\n\nStatistics data distribution ಮತ್ತು central tendency ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.\n\n### Key Measures\n- **Mean** — average: sum/count\n- **Median** — sort ಮಾಡಿದ ನಂತರ middle value\n- **Mode** — ಹೆಚ್ಚು ಬಾರಿ ಬರುವ value\n- **Range** — max - min\n- **Standard Deviation** — values ಎಷ್ಟು spread ಆಗಿವೆ",
        },
        telugu: {
          title: "Basic Statistics (Python)",
          description: "mean, median, mode, standard deviation లెక్కించండి",
          content:
            "## Statistics in Python\n\nStatistics data distribution మరియు central tendency అర్థం చేసుకోవడానికి సహాయపడుతుంది.\n\n### Key Measures\n- **Mean** — average: sum/count\n- **Median** — sort చేసిన తర్వాత middle value\n- **Mode** — ఎక్కువసార్లు వచ్చే value\n- **Range** — max - min\n- **Standard Deviation** — values ఎంత spread అయ్యాయి",
        },
        hindi: {
          title: "Basic Statistics (Python)",
          description: "mean, median, mode, standard deviation निकालें",
          content:
            "## Statistics in Python\n\nStatistics data distribution और central tendency समझने में मदद करता है.\n\n### Key Measures\n- **Mean** — average: sum/count\n- **Median** — sort के बाद middle value\n- **Mode** — सबसे ज्यादा बार आने वाली value\n- **Range** — max - min\n- **Standard Deviation** — values कितनी spread हैं",
        },
      },
      exercises: {
        beginner: { prompt: "Given `scores = [85, 90, 78, 92, 88]`. Calculate `mean = sum/len`. Print it. Then print `max(scores) - min(scores)` (range).", starterCode: "scores = [85, 90, 78, 92, 88]\n\n# Print mean and range\n", expectedOutput: "86.6\n14" },
        intermediate: { prompt: "Find the median of `nums = [3, 1, 5, 2]`. Sort first, then average the two middle values. Print the sorted list, then the median.", starterCode: "nums = [3, 1, 5, 2]\n\n# Sort, find median of even-length list, print both\n", expectedOutput: "[1, 2, 3, 5]\n2.5" },
        advanced: { prompt: "Given `data = [2, 4, 4, 4, 5, 5, 7, 9]`. Print the mean, then the mode (most frequent value).", starterCode: "data = [2, 4, 4, 4, 5, 5, 7, 9]\n\n# Print mean and mode\n", expectedOutput: "5.0\n4" },
      },
    },
    {
      id: "da-visualization", title: "Data Visualization Concepts", description: "Learn chart types and when to use them",
      content: "## Visualizing Data\n\nCharts transform numbers into visual stories.\n\n### Common Chart Types\n- **Bar Chart** — Compare categories\n- **Line Chart** — Show trends over time\n- **Scatter Plot** — Show relationships\n- **Histogram** — Show distribution\n- **Pie Chart** — Show proportions",
      codeExample: "categories = [\"Python\", \"JavaScript\", \"Java\", \"C++\"]\npopularity = [35, 30, 20, 15]\ntop_idx = popularity.index(max(popularity))\nprint(\"Most popular:\", categories[top_idx])\nprint(\"Share:\", str(popularity[top_idx]) + \"%\")",
      translations: {
        tamil: {
          title: "Data Visualization Concepts",
          description: "chart வகைகள் மற்றும் எப்போது பயன்படுத்த வேண்டும்",
          content:
            "## Visualizing Data\n\nCharts எண்களை visual stories ஆக மாற்றும்.\n\n### பொதுவான chart வகைகள்\n- **Bar Chart** — categories ஒப்பிட\n- **Line Chart** — time trends\n- **Scatter Plot** — relationship\n- **Histogram** — distribution\n- **Pie Chart** — proportions",
        },
        kannada: {
          title: "Data Visualization Concepts",
          description: "chart types ಮತ್ತು ಯಾವಾಗ ಬಳಸಬೇಕು",
          content:
            "## Visualizing Data\n\nCharts ಸಂಖ್ಯೆಗಳನ್ನು visual stories ಆಗಿ ಮಾಡುತ್ತವೆ.\n\n### Common chart types\n- **Bar Chart** — categories compare\n- **Line Chart** — time trends\n- **Scatter Plot** — relationships\n- **Histogram** — distribution\n- **Pie Chart** — proportions",
        },
        telugu: {
          title: "Data Visualization Concepts",
          description: "chart types మరియు ఎప్పుడు వాడాలి",
          content:
            "## Visualizing Data\n\nCharts సంఖ్యలను visual stories గా మార్చుతాయి.\n\n### Common chart types\n- **Bar Chart** — categories compare\n- **Line Chart** — time trends\n- **Scatter Plot** — relationships\n- **Histogram** — distribution\n- **Pie Chart** — proportions",
        },
        hindi: {
          title: "Data Visualization Concepts",
          description: "chart types और कब उपयोग करें",
          content:
            "## Visualizing Data\n\nCharts numbers को visual stories में बदलते हैं.\n\n### Common chart types\n- **Bar Chart** — categories compare\n- **Line Chart** — time trends\n- **Scatter Plot** — relationships\n- **Histogram** — distribution\n- **Pie Chart** — proportions",
        },
      },
      exercises: {
        beginner: { prompt: "Given `cats = ['A', 'B', 'C']` and `vals = [25, 40, 15]`. Use `zip()` to pair them. Print the category with the highest value.", starterCode: "cats = ['A', 'B', 'C']\nvals = [25, 40, 15]\n\n# Use zip, find max, print category\n", expectedOutput: "B" },
        intermediate: { prompt: "Given `users = [350, 300, 150]`. Calculate each as a percentage of total. Print the list of percentages rounded to 1 decimal each.", starterCode: "users = [350, 300, 150]\n\n# Calculate percentages, print list\n", expectedOutput: "[43.8, 37.5, 18.8]" },
        advanced: { prompt: "Given `revenue = [100, 120, 110, 150]`. Calculate month-over-month growth rates as percentages. Print the list rounded to 1 decimal.", starterCode: "revenue = [100, 120, 110, 150]\n\n# Calculate growth rates, print list\n", expectedOutput: "[20.0, -8.3, 36.4]" },
      },
    },
    {
      id: "da-pandas-intro", title: "Introduction to Pandas", description: "DataFrames, Series, and basic operations",
      content: "## Pandas: The Data Analysis Powerhouse\n\nPandas provides two main data structures:\n- **Series** — A single column of data\n- **DataFrame** — A table (like a spreadsheet)\n\n### Key Operations\n- df.head() — First 5 rows\n- df.describe() — Summary statistics\n- df.shape — (rows, columns)\n- df[\"column\"] — Select a column",
      codeExample: "cities = {\"City\": [\"NYC\", \"LA\", \"Chicago\"], \"Pop\": [8336817, 3979576, 2693976]}\nprint(\"Rows:\", len(cities[\"City\"]))\nprint(\"Columns:\", len(cities))\nmax_idx = cities[\"Pop\"].index(max(cities[\"Pop\"]))\nprint(\"Largest:\", cities[\"City\"][max_idx])",
      translations: {
        tamil: {
          title: "Pandas அறிமுகம்",
          description: "DataFrames, Series, மற்றும் அடிப்படை operations",
          content:
            "## Pandas: Data Analysis Powerhouse\n\nPandas இரண்டு முக்கிய data structures தருகிறது:\n- **Series** — ஒரே column\n- **DataFrame** — table (spreadsheet போல)\n\n### Key operations\n- `df.head()` — முதல் 5 rows\n- `df.describe()` — summary statistics\n- `df.shape` — (rows, columns)\n- `df[\"column\"]` — column select",
        },
        kannada: {
          title: "Pandas ಪರಿಚಯ",
          description: "DataFrames, Series, ಮತ್ತು basic operations",
          content:
            "## Pandas: Data Analysis Powerhouse\n\nPandas ಎರಡು ಮುಖ್ಯ data structures ಕೊಡುತ್ತದೆ:\n- **Series** — ಒಂದು column\n- **DataFrame** — table (spreadsheet ಹಾಗೆ)\n\n### Key operations\n- `df.head()` — ಮೊದಲ 5 rows\n- `df.describe()` — summary statistics\n- `df.shape` — (rows, columns)\n- `df[\"column\"]` — column select",
        },
        telugu: {
          title: "Pandas పరిచయం",
          description: "DataFrames, Series, మరియు basic operations",
          content:
            "## Pandas: Data Analysis Powerhouse\n\nPandas రెండు ప్రధాన data structures ఇస్తుంది:\n- **Series** — ఒక column\n- **DataFrame** — table (spreadsheet లా)\n\n### Key operations\n- `df.head()` — మొదటి 5 rows\n- `df.describe()` — summary statistics\n- `df.shape` — (rows, columns)\n- `df[\"column\"]` — column select",
        },
        hindi: {
          title: "Pandas परिचय",
          description: "DataFrames, Series और basic operations",
          content:
            "## Pandas: Data Analysis Powerhouse\n\nPandas दो main data structures देता है:\n- **Series** — एक column\n- **DataFrame** — table (spreadsheet जैसा)\n\n### Key operations\n- `df.head()` — पहली 5 rows\n- `df.describe()` — summary statistics\n- `df.shape` — (rows, columns)\n- `df[\"column\"]` — column select",
        },
      },
      exercises: {
        beginner: { prompt: "Create a dict-of-lists `data = {'City': ['NYC', 'LA'], 'Pop': [8336817, 3979576]}`. Print `len(data['City'])` (row count) and `len(data)` (column count).", starterCode: "data = {'City': ['NYC', 'LA'], 'Pop': [8336817, 3979576]}\n\n# Print row count and column count\n", expectedOutput: "2\n2" },
        intermediate: { prompt: "Given `cities = {'NYC': 8336817, 'LA': 3979576}`. Use `max()` with `key=` to find the largest. Print the city name.", starterCode: "cities = {'NYC': 8336817, 'LA': 3979576}\n\n# Find and print city with max population\n", expectedOutput: "NYC" },
        advanced: { prompt: "Zip `names = ['A', 'B', 'C']` and `vals = [30, 10, 20]`. Sort by value descending. Print the first name and the full sorted list of tuples.", starterCode: "names = ['A', 'B', 'C']\nvals = [30, 10, 20]\n\n# Zip, sort desc, print first name and list\n", expectedOutput: "A\n[('A', 30), ('C', 20), ('B', 10)]" },
      },
    },
    {
      id: "da-file-io", title: "Reading & Writing Data Files", description: "Work with CSV and text data",
      content: "## File I/O for Data Analysis\n\nReal data lives in files — CSV, JSON, TXT.\n\n### CSV Files\nCSV (Comma-Separated Values) is the most common data format.\n\n### Key Concepts\n- open() — opens a file\n- with statement — automatically closes the file\n- csv.reader — reads rows as lists",
      codeExample: "csv_data = \"Name,Age,City\\nAlice,25,NYC\\nBob,30,LA\\nCharlie,35,Chicago\"\nlines = csv_data.split(\"\\n\")\nheader = lines[0].split(\",\")\nrows = [line.split(\",\") for line in lines[1:]]\nfor row in rows:\n    print(row[0], \"is\", row[1], \"from\", row[2])",
      translations: {
        tamil: {
          title: "Data Files வாசித்தல் & எழுதுதல்",
          description: "CSV மற்றும் text data உடன் வேலை செய்யுங்கள்",
          content:
            "## File I/O for Data Analysis\n\nReal data பெரும்பாலும் files-ல் இருக்கும் — CSV, JSON, TXT.\n\n### CSV\nCSV என்பது பொதுவான data format.\n\n### Key concepts\n- `open()` — file திறக்க\n- `with` — auto close\n- `csv.reader` — rows-ஐ list ஆக வாசிக்க",
        },
        kannada: {
          title: "Data Files ಓದು & ಬರೆಯುವುದು",
          description: "CSV ಮತ್ತು text data ಜೊತೆ ಕೆಲಸ",
          content:
            "## File I/O for Data Analysis\n\nReal data ಸಾಮಾನ್ಯವಾಗಿ files ನಲ್ಲಿ ಇರುತ್ತದೆ — CSV, JSON, TXT.\n\n### CSV\nCSV ಬಹಳ ಸಾಮಾನ್ಯ format.\n\n### Key concepts\n- `open()` — file ತೆರೆಯಲು\n- `with` — auto close\n- `csv.reader` — rows ಅನ್ನು list ಆಗಿ ಓದಲು",
        },
        telugu: {
          title: "Data Files చదవడం & రాయడం",
          description: "CSV మరియు text data తో పని చేయండి",
          content:
            "## File I/O for Data Analysis\n\nReal data సాధారణంగా files లో ఉంటుంది — CSV, JSON, TXT.\n\n### CSV\nCSV చాలా common format.\n\n### Key concepts\n- `open()` — file open\n- `with` — auto close\n- `csv.reader` — rows ని list గా చదవడం",
        },
        hindi: {
          title: "Data Files पढ़ना & लिखना",
          description: "CSV और text data के साथ काम करें",
          content:
            "## File I/O for Data Analysis\n\nReal data अक्सर files में होता है — CSV, JSON, TXT.\n\n### CSV\nCSV सबसे common data format है.\n\n### Key concepts\n- `open()` — file खोलना\n- `with` — auto close\n- `csv.reader` — rows को list के रूप में पढ़ना",
        },
      },
      exercises: {
        beginner: { prompt: "Split `'A,B\\nC,D'` by `\\n`, then split each line by `,`. Print the number of rows.", starterCode: "data = 'A,B\\nC,D'\n\n# Split into lines, print row count\n", expectedOutput: "2" },
        intermediate: { prompt: "Parse CSV string `'Name,Age\\nAlice,25\\nBob,30'`. Extract the header as a list. Sum the Age column. Print both.", starterCode: "data = 'Name,Age\\nAlice,25\\nBob,30'\n\n# Parse header and sum ages, print both\n", expectedOutput: "['Name', 'Age']\n55" },
        advanced: { prompt: "Parse CSV `'Name,Age\\nA,20\\nB,30\\nC,25'`. Filter rows where `Age > 22`. Print the count and the list of names that passed.", starterCode: "data = 'Name,Age\\nA,20\\nB,30\\nC,25'\n\n# Filter Age > 22, print count and names\n", expectedOutput: "2\n['B', 'C']" },
      },
    },
    {
      id: "da-pandas-mastery", title: "Pandas Mastery Patterns", description: "GroupBy, merge, pivot, and performance habits",
      content: "## Pandas Mastery\n\nOnce you know the basics, these patterns make you *fast* in real jobs.\n\n### Core patterns\n- **groupby + agg** — summarize by category\n- **merge / join** — combine datasets\n- **pivot_table** — reshape for reporting\n- **missing values** — fill, drop, flag\n- **types** — convert early (int, float, datetime)\n\n### Performance habits\n- Avoid row-by-row loops when possible\n- Prefer vectorized ops and boolean masks\n- Use `value_counts()` / `groupby()` for summaries\n\nYou do not need to memorize everything; you need to know the *patterns* and where to look.",
      codeExample: "# Pandas-like operations (conceptual, using Python)\nrows = [\n    {\"dept\": \"Eng\", \"salary\": 100},\n    {\"dept\": \"Eng\", \"salary\": 120},\n    {\"dept\": \"Sales\", \"salary\": 90},\n]\n\n# groupby dept -> avg salary\nsums = {}\ncounts = {}\nfor r in rows:\n    d = r[\"dept\"]\n    sums[d] = sums.get(d, 0) + r[\"salary\"]\n    counts[d] = counts.get(d, 0) + 1\n\navgs = {d: round(sums[d] / counts[d], 1) for d in sums}\nprint(avgs)\n",
      translations: {
        tamil: {
          title: "Pandas Mastery Patterns",
          description: "GroupBy, merge, pivot மற்றும் performance habits",
          content:
            "## Pandas Mastery\n\nBasics தெரிந்த பிறகு, இந்த patterns real job-ல் வேகமாக வேலை செய்ய உதவும்.\n\n### Core patterns\n- **groupby + agg** — summarize\n- **merge / join** — datasets இணைக்க\n- **pivot_table** — reshape\n- **missing values** — fill/drop/flag\n- **types** — early convert\n\n### Performance habits\n- row-by-row loops தவிர்க்க\n- vectorized ops + boolean masks பயன்படுத்த\n- `value_counts()` / `groupby()` மூலம் summaries\n\nஎல்லாம் மனப்பாடம் வேண்டாம்; patterns மற்றும் எங்கு பார்க்க வேண்டும் என்பதே முக்கியம்.",
        },
        kannada: {
          title: "Pandas Mastery Patterns",
          description: "GroupBy, merge, pivot ಮತ್ತು performance habits",
          content:
            "## Pandas Mastery\n\nBasics ಆದ ನಂತರ, ಈ patterns real job ನಲ್ಲಿ ನಿಮಗೆ ವೇಗ ಕೊಡುತ್ತವೆ.\n\n### Core patterns\n- **groupby + agg** — summarize\n- **merge / join** — datasets combine\n- **pivot_table** — reshape\n- **missing values** — fill/drop/flag\n- **types** — early convert\n\n### Performance habits\n- row-by-row loops ತಪ್ಪಿಸಿ\n- vectorized ops + boolean masks ಬಳಸಿ\n- `value_counts()` / `groupby()` summaries\n\nಎಲ್ಲವನ್ನೂ ನೆನಪಿಸಿಕೊಳ್ಳಬೇಕಿಲ್ಲ; patterns ಮತ್ತು ಎಲ್ಲಿ ನೋಡಬೇಕು ಎಂಬುದು ಮುಖ್ಯ.",
        },
        telugu: {
          title: "Pandas Mastery Patterns",
          description: "GroupBy, merge, pivot మరియు performance habits",
          content:
            "## Pandas Mastery\n\nBasics వచ్చిన తర్వాత, ఈ patterns real jobs లో వేగంగా పని చేయడానికి సహాయపడతాయి.\n\n### Core patterns\n- **groupby + agg** — summarize\n- **merge / join** — datasets కలపడం\n- **pivot_table** — reshape\n- **missing values** — fill/drop/flag\n- **types** — early convert\n\n### Performance habits\n- row-by-row loops తగ్గించండి\n- vectorized ops + boolean masks వాడండి\n- `value_counts()` / `groupby()` summaries\n\nఅన్నీ memorize అవసరం లేదు; patterns తెలుసుకుని ఎక్కడ చూడాలో తెలిసి ఉండాలి.",
        },
        hindi: {
          title: "Pandas Mastery Patterns",
          description: "GroupBy, merge, pivot और performance habits",
          content:
            "## Pandas Mastery\n\nBasics के बाद ये patterns real jobs में आपको तेज़ बनाते हैं.\n\n### Core patterns\n- **groupby + agg** — summarize\n- **merge / join** — datasets combine\n- **pivot_table** — reshape\n- **missing values** — fill/drop/flag\n- **types** — early convert\n\n### Performance habits\n- row-by-row loops से बचें\n- vectorized ops + boolean masks इस्तेमाल करें\n- `value_counts()` / `groupby()` summaries\n\nसब memorize नहीं करना; patterns और कहाँ देखना है यही ज़रूरी है.",
        },
      },
      exercises: {
        beginner: { prompt: "Group `data = [('A',10),('B',5),('A',7)]` by category using `.get()`. Print the totals dict.", starterCode: "data = [('A', 10), ('B', 5), ('A', 7)]\n\n# Group and sum by category, print dict\n", expectedOutput: "{'A': 17, 'B': 5}" },
        intermediate: { prompt: "Merge two dicts: `a = {'x': 1}` and `b = {'y': 2}` using `{**a, **b}`. Print the merged dict.", starterCode: "a = {'x': 1}\nb = {'y': 2}\n\n# Merge and print\n", expectedOutput: "{'x': 1, 'y': 2}" },
        advanced: { prompt: "Given `rows = [{'dept':'Eng'},{'dept':'Sales'},{'dept':'Eng'}]`. Count by dept using `.get()`. Print `sorted(counts.items())`.", starterCode: "rows = [{'dept': 'Eng'}, {'dept': 'Sales'}, {'dept': 'Eng'}]\n\n# Count by dept, print sorted items\n", expectedOutput: "[('Eng', 2), ('Sales', 1)]" },
      },
    },
    {
      id: "da-case-study", title: "Case Study: From Raw Data to Insights", description: "A portfolio-style mini project workflow",
      content: "## Case Study Workflow\n\nRecruiters love seeing end-to-end thinking.\n\n### A strong case study includes\n1. **Problem statement** — what you are trying to answer\n2. **Data cleaning** — handle missing and bad values\n3. **Exploration** — summary statistics and patterns\n4. **Insights** — 3 to 5 clear findings\n5. **Recommendation** — what to do next\n6. **Limitations** — what the data cannot prove\n\n### Output idea\n- A single clean notebook or markdown report\n- A few charts (even simple ones)\n- A short conclusion section\n\nYou are practicing *storytelling*, not just code.",
      codeExample: "# Mini case study: find top product by revenue\nsales = [\n    {\"product\": \"A\", \"price\": 10, \"qty\": 3},\n    {\"product\": \"B\", \"price\": 7, \"qty\": 6},\n    {\"product\": \"A\", \"price\": 10, \"qty\": 1},\n]\n\nrevenue = {}\nfor s in sales:\n    revenue[s[\"product\"]] = revenue.get(s[\"product\"], 0) + s[\"price\"] * s[\"qty\"]\n\ntop = max(revenue, key=revenue.get)\nprint(top, revenue[top])\n",
      translations: {
        tamil: {
          title: "Case Study: Raw Data → Insights",
          description: "Portfolio மாதிரி mini project workflow",
          content:
            "## Case Study Workflow\n\nRecruiters end-to-end thinking பார்க்க விரும்புவார்கள்.\n\n### ஒரு நல்ல case study-ல் இருக்க வேண்டியது\n1. **Problem statement** — நீங்கள் பதிலளிக்க வேண்டிய கேள்வி\n2. **Data cleaning** — missing/bad values சரி செய்ய\n3. **Exploration** — summary stats + patterns\n4. **Insights** — 3 முதல் 5 தெளிவான findings\n5. **Recommendation** — அடுத்தடுத்த செயல்\n6. **Limitations** — data என்ன prove செய்ய முடியாது\n\n### Output idea\n- ஒரு clean notebook அல்லது markdown report\n- சில charts\n- short conclusion\n\nநீங்கள் code மட்டும் அல்ல; *storytelling* பயிற்சி செய்கிறீர்கள்.",
        },
        kannada: {
          title: "Case Study: Raw Data → Insights",
          description: "Portfolio ರೀತಿಯ mini project workflow",
          content:
            "## Case Study Workflow\n\nRecruiters end-to-end thinking ನೋಡಲು ಇಷ್ಟಪಡುತ್ತಾರೆ.\n\n### ಒಳ್ಳೆಯ case study ನಲ್ಲಿ ಇರಬೇಕಾದವು\n1. **Problem statement** — ಉತ್ತರಿಸಬೇಕಾದ ಪ್ರಶ್ನೆ\n2. **Data cleaning** — missing/bad values ಸರಿಪಡಿಸಿ\n3. **Exploration** — summary stats + patterns\n4. **Insights** — 3 ರಿಂದ 5 ಸ್ಪಷ್ಟ findings\n5. **Recommendation** — ಮುಂದಿನ ಹೆಜ್ಜೆ\n6. **Limitations** — data ಏನು prove ಮಾಡಲ್ಲ\n\n### Output idea\n- clean notebook ಅಥವಾ markdown report\n- ಕೆಲವು charts\n- short conclusion\n\nಇದು code ಮಾತ್ರವಲ್ಲ; *storytelling* ಅಭ್ಯಾಸ.",
        },
        telugu: {
          title: "Case Study: Raw Data → Insights",
          description: "Portfolio లాంటి mini project workflow",
          content:
            "## Case Study Workflow\n\nRecruiters end-to-end thinking చూడాలని కోరుకుంటారు.\n\n### ఒక strong case study లో ఉండాల్సింది\n1. **Problem statement** — మీరు సమాధానం ఇవ్వాలనుకునే ప్రశ్న\n2. **Data cleaning** — missing/bad values హ్యాండిల్ చేయడం\n3. **Exploration** — summary stats + patterns\n4. **Insights** — 3 నుంచి 5 clear findings\n5. **Recommendation** — next steps\n6. **Limitations** — data ఏం prove చేయలేదో\n\n### Output idea\n- clean notebook లేదా markdown report\n- కొన్ని charts\n- short conclusion\n\nఇది code మాత్రమే కాదు; *storytelling* ప్రాక్టీస్.",
        },
        hindi: {
          title: "Case Study: Raw Data → Insights",
          description: "Portfolio जैसा mini project workflow",
          content:
            "## Case Study Workflow\n\nRecruiters end-to-end thinking देखना पसंद करते हैं.\n\n### एक strong case study में क्या हो\n1. **Problem statement** — आप क्या answer करना चाहते हैं\n2. **Data cleaning** — missing/bad values handle करें\n3. **Exploration** — summary stats + patterns\n4. **Insights** — 3 से 5 clear findings\n5. **Recommendation** — next steps\n6. **Limitations** — data क्या prove नहीं कर सकता\n\n### Output idea\n- clean notebook या markdown report\n- कुछ charts\n- short conclusion\n\nआप सिर्फ code नहीं; *storytelling* practice कर रहे हैं.",
        },
      },
      exercises: {
        beginner: { prompt: "Given `price = 12, qty = 4`. Print revenue (`price * qty`), then print whether revenue exceeds 40 (`True`/`False`).", starterCode: "price = 12\nqty = 4\n\n# Print revenue and whether it exceeds 40\n", expectedOutput: "48\nTrue" },
        intermediate: { prompt: "Given `rev = {'A': 40, 'B': 42, 'C': 10}`. Use `max()` with `key=rev.get` to find top key. Print the key and its value.", starterCode: "rev = {'A': 40, 'B': 42, 'C': 10}\n\n# Find top key and print key + value\n", expectedOutput: "B\n42" },
        advanced: { prompt: "Given `nums = [10, None, 30, None, 5]`. Replace `None` with `0` using a comprehension. Print the cleaned list, then `sum()`.", starterCode: "nums = [10, None, 30, None, 5]\n\n# Clean Nones, print list and sum\n", expectedOutput: "[10, 0, 30, 0, 5]\n45" },
      },
    },
  ];
}

function wd(): CareerLesson[] {
  return [
    {
      id: "wd-intro", title: "Web Development with Python", description: "Overview of Python web frameworks",
      content: "## Python for the Web\n\nPython powers Instagram, Pinterest, Spotify.\n\n### Popular Frameworks\n- **Django** — Full-featured, batteries-included\n- **Flask** — Lightweight, flexible\n- **FastAPI** — Modern, async-first\n\n### How the Web Works\n1. Browser sends HTTP request\n2. Server processes it\n3. Server sends HTTP response\n4. Browser renders result",
      codeExample: "def handle_route(path):\n    routes = {\"/\": \"Home Page\", \"/about\": \"About Page\"}\n    return routes.get(path, \"404 Not Found\")\n\nprint(handle_route(\"/\"))\nprint(handle_route(\"/about\"))\nprint(handle_route(\"/xyz\"))",
      translations: {
        tamil: {
          title: "Python மூலம் Web Development",
          description: "Python web frameworks பற்றிய அறிமுகம்",
        },
        kannada: {
          title: "Python ಬಳಸಿ Web Development",
          description: "Python web frameworks ಪರಿಚಯ",
        },
        telugu: {
          title: "Python తో Web Development",
          description: "Python web frameworks అవలోకనం",
        },
        hindi: {
          title: "Python के साथ Web Development",
          description: "Python web frameworks का परिचय",
        },
      },
      exercises: {
        beginner: { prompt: "Create a dict `resp = {'status': 200, 'body': 'OK'}`. Print `resp['status']`, then `resp['body']`.", starterCode: "resp = {'status': 200, 'body': 'OK'}\n\n# Print status and body\n", expectedOutput: "200\nOK" },
        intermediate: { prompt: "Write `route(path)` using a dict of routes. Return `'Home'` for `'/'`, `'About'` for `'/about'`, `'404'` otherwise. Print results for `'/'` and `'/xyz'`.", starterCode: "# Define route function with dict lookup\n\n# Test with '/' and '/xyz'\n", expectedOutput: "Home\n404" },
        advanced: { prompt: "Parse query string `'name=Alice&age=25'`. Split by `&`, then by `=` into a dict. Print the dict, then print `params['name']`.", starterCode: "query = 'name=Alice&age=25'\n\n# Parse into dict, print dict and name\n", expectedOutput: "{'name': 'Alice', 'age': '25'}\nAlice" },
      },
    },
    {
      id: "wd-http", title: "HTTP & Request Handling", description: "HTTP methods and status codes",
      content: "## HTTP Fundamentals\n\n### HTTP Methods\n- **GET** — Retrieve data\n- **POST** — Create data\n- **PUT** — Update data\n- **DELETE** — Remove data\n\n### Status Codes\n- **200** — OK\n- **201** — Created\n- **404** — Not Found\n- **500** — Server Error",
      codeExample: "codes = {200: \"OK\", 201: \"Created\", 404: \"Not Found\", 500: \"Server Error\"}\nfor code, msg in codes.items():\n    print(code, \"-\", msg)",
      exercises: {
        beginner: { prompt: "Create `codes = {200: 'OK', 404: 'Not Found', 500: 'Error'}`. Print `codes[404]` and `len(codes)`.", starterCode: "codes = {200: 'OK', 404: 'Not Found', 500: 'Error'}\n\n# Print meaning of 404 and count of codes\n", expectedOutput: "Not Found\n3" },
        intermediate: { prompt: "Write `is_success(code)` returning `True` if `200 <= code <= 299`. Test with `201` and `404`, print both results.", starterCode: "# Define is_success, test with 201 and 404\n", expectedOutput: "True\nFalse" },
        advanced: { prompt: "Create a routes dict mapping `(method, path)` tuples to handler names. Look up `('GET', '/users')` and `('POST', '/users')`. Print both.", starterCode: "# Define routes dict with tuple keys, look up two routes\n", expectedOutput: "list_users\ncreate_user" },
      },
    },
    {
      id: "wd-rest", title: "REST API Design", description: "Build clean RESTful APIs",
      content: "## REST APIs\n\nREST is the standard for building web APIs.\n\n### Principles\n- **Resources** — Everything is a resource\n- **URLs** — Each resource has a unique URL\n- **Methods** — CRUD maps to HTTP methods\n- **JSON** — Standard data format",
      codeExample: "import json\nusers = [{\"id\": 1, \"name\": \"Alice\"}, {\"id\": 2, \"name\": \"Bob\"}]\ndef get_user(uid):\n    for u in users:\n        if u[\"id\"] == uid:\n            return json.dumps(u)\n    return json.dumps({\"error\": \"Not found\"})\nprint(get_user(1))",
      exercises: {
        beginner: { prompt: "Given `users = [{'id': 1, 'name': 'Alice'}, {'id': 2, 'name': 'Bob'}]`. Print the first user's name and `len(users)`.", starterCode: "users = [{'id': 1, 'name': 'Alice'}, {'id': 2, 'name': 'Bob'}]\n\n# Print first name and count\n", expectedOutput: "Alice\n2" },
        intermediate: { prompt: "Write `find_user(users, uid)` that loops and returns matching dict. Test with `id=2`. Print the user's name.", starterCode: "users = [{'id': 1, 'name': 'Alice'}, {'id': 2, 'name': 'Bob'}]\n\n# Define find_user, test with id=2\n", expectedOutput: "Bob" },
        advanced: { prompt: "Write `add_user(users, name)` that auto-increments `id` using `max()`. Add `'Charlie'`. Print `len(users)` and the new user's `id`.", starterCode: "users = [{'id': 1, 'name': 'Alice'}, {'id': 2, 'name': 'Bob'}]\n\n# Define add_user, add Charlie, print count and new id\n", expectedOutput: "3\n3" },
      },
    },
    {
      id: "wd-templates", title: "Templates & Rendering", description: "Dynamic HTML generation",
      content: "## Templates\n\nTemplates generate dynamic HTML by inserting Python variables.\n\n### Jinja2 Template Engine\n- Variables: {{ name }}\n- Logic: {% if condition %}\n- Loops: {% for item in list %}\n\n### Why Templates?\n- Separate logic from presentation\n- Reuse layouts\n- Dynamic content",
      codeExample: "def render(template, **kwargs):\n    result = template\n    for key, value in kwargs.items():\n        result = result.replace(\"{{ \" + key + \" }}\", str(value))\n    return result\n\nhtml = \"<h1>Hello, {{ name }}!</h1>\"\nprint(render(html, name=\"Alice\"))",
      exercises: {
        beginner: { prompt: "Use an f-string: `name='Alice'`. Print `f'Hello, {name}!'`.", starterCode: "name = 'Alice'\n\n# Print greeting using f-string\n", expectedOutput: "Hello, Alice!" },
        intermediate: { prompt: "Write `render(template, data)` replacing `{key}` with values from data dict. Test: `render('Hi {name}', {'name': 'World'})`. Print result.", starterCode: "# Define render, test it\n", expectedOutput: "Hi World" },
        advanced: { prompt: "Given `items = ['A', 'B', 'C']`, build an HTML unordered list using `join()`. Print `'<ul><li>A</li><li>B</li><li>C</li></ul>'`.", starterCode: "items = ['A', 'B', 'C']\n\n# Build HTML list string and print\n", expectedOutput: "<ul><li>A</li><li>B</li><li>C</li></ul>" },
      },
    },
    {
      id: "wd-database", title: "Database Integration", description: "Connect Python to databases",
      content: "## Databases with Python\n\n### SQLite — Built into Python\n- No setup required\n- File-based database\n- Perfect for learning\n\n### SQL Basics\n- CREATE TABLE — Define structure\n- INSERT — Add data\n- SELECT — Query data\n- UPDATE — Modify data\n- DELETE — Remove data",
      codeExample: "table = [\n    {\"id\": 1, \"name\": \"Alice\", \"email\": \"alice@email.com\"},\n    {\"id\": 2, \"name\": \"Bob\", \"email\": \"bob@email.com\"},\n]\nresult = [r for r in table if r[\"id\"] == 1]\nprint(result[0][\"name\"])",
      exercises: {
        beginner: { prompt: "Create a list of tuples `[(1, 'Alice'), (2, 'Bob')]`. Print the second tuple and its length.", starterCode: "rows = [(1, 'Alice'), (2, 'Bob')]\n\n# Print second tuple and its length\n", expectedOutput: "(2, 'Bob')\n2" },
        intermediate: { prompt: "Filter a list of tuples `[(1, 'A'), (2, 'B'), (3, 'C')]` where `id > 1`. Print the filtered list.", starterCode: "rows = [(1, 'A'), (2, 'B'), (3, 'C')]\n\n# Filter id > 1, print result\n", expectedOutput: "[(2, 'B'), (3, 'C')]" },
        advanced: { prompt: "Given records as list of dicts, filter where `age > 25`. Print the count and the list of names.", starterCode: "table = [\n    {'name': 'Alice', 'age': 25},\n    {'name': 'Bob', 'age': 30},\n    {'name': 'Charlie', 'age': 22}\n]\n\n# Filter, print count and names\n", expectedOutput: "1\n['Bob']" },
      },
    },
    {
      id: "wd-auth", title: "Authentication & Sessions", description: "User login, tokens, and session management",
      content: "## Authentication\n\nAuthentication verifies who a user is.\n\n### Methods\n- **Session-based** — Server stores session data\n- **Token-based (JWT)** — Client stores a signed token\n- **OAuth** — Login with Google, GitHub, etc.\n\n### Password Hashing\nNever store passwords in plain text! Use hashing.\n\n### JWT (JSON Web Token)\n- Header — Algorithm info\n- Payload — User data\n- Signature — Verifies integrity",
      codeExample: "import hashlib\nimport json\nimport base64\n\n# Simple password hashing\ndef hash_password(pwd):\n    return hashlib.sha256(pwd.encode()).hexdigest()\n\n# JWT-like token concept\ndef create_token(user_id, secret):\n    payload = json.dumps({\"user_id\": user_id})\n    encoded = base64.b64encode(payload.encode()).decode()\n    return encoded\n\ntoken = create_token(42, \"secret\")\nprint(\"Token:\", token)\nprint(\"Hash:\", hash_password(\"mypassword\")[:16] + \"...\")",
      exercises: {
        beginner: { prompt: "Hash `'password123'` using `hashlib.sha256`. Print the first 10 characters of the hex digest.", starterCode: "import hashlib\n\n# Hash and print first 10 chars\n", expectedOutput: "ef92b778ba" },
        intermediate: { prompt: "Encode `{'user': 'Alice'}` as JSON, then `base64` encode it. Print the base64 string.", starterCode: "import json, base64\n\n# JSON encode, base64 encode, print\n", expectedOutput: "eyJ1c2VyIjogIkFsaWNlIn0=" },
        advanced: { prompt: "Write `verify(pwd, stored)` comparing SHA256 hashes. Hash `'secret'`, then verify with `'secret'` and `'wrong'`. Print both results.", starterCode: "import hashlib\n\n# Define verify, hash 'secret', test both\n", expectedOutput: "True\nFalse" },
      },
    },
    {
      id: "wd-middleware", title: "Middleware & Error Handling", description: "Request processing pipelines and error management",
      content: "## Middleware\n\nMiddleware processes requests before they reach your routes.\n\n### Common Middleware\n- **Logging** — Log every request\n- **CORS** — Cross-origin resource sharing\n- **Rate Limiting** — Prevent abuse\n- **Authentication** — Verify tokens\n\n### Error Handling\n- Try/except for graceful failures\n- Custom error responses\n- Error logging and monitoring",
      codeExample: "# Middleware chain concept\ndef logging_middleware(request):\n    print(f\"LOG: {request['method']} {request['path']}\")\n    return request\n\ndef auth_middleware(request):\n    if 'token' not in request:\n        return {\"error\": \"Unauthorized\", \"status\": 401}\n    return request\n\nreq = {\"method\": \"GET\", \"path\": \"/api/data\", \"token\": \"abc123\"}\nreq = logging_middleware(req)\nresult = auth_middleware(req)\nprint(\"Status:\", result.get(\"status\", 200))",
      exercises: {
        beginner: { prompt: "Write `log_req(method, path)` that prints them as `'GET /home'`. Call it.", starterCode: "# Define log_req, call with 'GET', '/home'\n", expectedOutput: "GET /home" },
        intermediate: { prompt: "Write `rate_limit(count, max_r)` returning `True` if under limit. Test `5 < 10` and `15 < 10`. Print both.", starterCode: "# Define rate_limit, test both cases\n", expectedOutput: "True\nFalse" },
        advanced: { prompt: "Write two middleware functions: `add_ts(req)` adds `'ts'` key, `validate(req)` adds `'valid': True` if `'path'` exists. Chain them on `{'path': '/api'}`. Print `req['valid']` and `req['ts']`.", starterCode: "# Define add_ts and validate, chain on req dict\n", expectedOutput: "True\n2024" },
      },
    },
    {
      id: "wd-deploy", title: "Deployment & DevOps", description: "Deploy Python web apps to production",
      content: "## Deploying Python Apps\n\n### Platforms\n- **Heroku** — Simple PaaS\n- **Railway / Render** — Modern alternatives\n- **AWS / GCP** — Full cloud\n- **Docker** — Containerization\n\n### Key Concepts\n- Environment variables for secrets\n- WSGI/ASGI servers (Gunicorn, Uvicorn)\n- Reverse proxy (Nginx)\n- CI/CD pipelines",
      codeExample: "import os\n\n# Environment variables pattern\ndef get_config():\n    return {\n        \"debug\": os.environ.get(\"DEBUG\", \"False\") == \"True\",\n        \"port\": int(os.environ.get(\"PORT\", 8000)),\n        \"db_url\": os.environ.get(\"DATABASE_URL\", \"sqlite:///local.db\"),\n    }\n\nconfig = get_config()\nprint(\"Port:\", config[\"port\"])\nprint(\"Debug:\", config[\"debug\"])",
      exercises: {
        beginner: { prompt: "Use `os.environ.get('PORT', '8000')` to get a value with a default. Print the result and its `type().__name__`.", starterCode: "import os\n\n# Get PORT with default, print value and type name\n", expectedOutput: "8000\nstr" },
        intermediate: { prompt: "Create a config dict from env vars: `host` (default `'localhost'`) and `db` (default `'myapp'`). Print `config['host']` and `config['db']`.", starterCode: "import os\n\n# Build config dict, print host and db\n", expectedOutput: "localhost\nmyapp" },
        advanced: { prompt: "Parse connection string `'postgres://user:pass@myhost:5432/db'`. Extract and print the host (`myhost`) and port (`5432`).", starterCode: "url = 'postgres://user:pass@myhost:5432/db'\n\n# Parse host and port, print both\n", expectedOutput: "myhost\n5432" },
      },
    },
    {
      id: "wd-auth-security", title: "Authentication & Security Basics", description: "Passwords, sessions, JWT concepts, and common mistakes",
      content: "## Auth & Security (Web)\n\n### Authentication vs Authorization\n- **Authentication**: who you are\n- **Authorization**: what you can access\n\n### Password storage (must)\n- Never store plaintext passwords\n- Store a *salted hash* (e.g., PBKDF2/bcrypt/argon2)\n\n### Sessions vs JWT\n- **Sessions**: server stores session, browser stores cookie\n- **JWT**: server signs a token, browser stores token\n\n### Common pitfalls\n- Missing input validation\n- Insecure secrets in code\n- No rate limiting on login\n- Broken access control",
      codeExample: "import hashlib\n\n# Hash password (demo only; use proper password hash libs in real apps)\ndef hash_password(pwd, salt=\"mysalt\"):\n    return hashlib.sha256((salt + pwd).encode()).hexdigest()\n\nstored = hash_password(\"Pass123\")\nprint(stored[:12])\nprint(hash_password(\"Pass123\") == stored)\n",
      exercises: {
        beginner: { prompt: "Check if `'/admin'` starts with `'/'`. Also check if `'user'` is alphanumeric. Print both.", starterCode: "path = '/admin'\nuser = 'user'\n\n# Print startswith and isalnum checks\n", expectedOutput: "True\nTrue" },
        intermediate: { prompt: "Validate username `'ab'`: must be `>= 3` chars and `.isalnum()`. Print result. Then validate `'abc'` and print.", starterCode: "# Validate 'ab' and 'abc', print both results\n", expectedOutput: "False\nTrue" },
        advanced: { prompt: "Given `tries = 4, max_tries = 3`. Print `'Blocked'` if over limit else `'OK'`. Then reset `tries = 0` and print `'OK'`.", starterCode: "tries = 4\nmax_tries = 3\n\n# Check and print, then reset and print again\n", expectedOutput: "Blocked\nOK" },
      },
    },
    {
      id: "wd-testing", title: "Testing & Debugging Like a Pro", description: "Unit tests, integration tests, and predictable debugging",
      content: "## Testing\n\n### Why tests matter\n- Prevent regressions\n- Make refactors safe\n- Improve confidence before deploy\n\n### What to test\n- Pure functions: easiest\n- API routes: status code + JSON shape\n- Database logic: constraints and edge cases\n\n### Debugging checklist\n- Reproduce the bug\n- Reduce to a minimal case\n- Add logs for inputs/outputs\n- Write a test that fails, then fix",
      codeExample: "import unittest\n\ndef add(a, b):\n    return a + b\n\nclass TestAdd(unittest.TestCase):\n    def test_add(self):\n        self.assertEqual(add(2, 3), 5)\n\nif __name__ == \"__main__\":\n    suite = unittest.defaultTestLoader.loadTestsFromTestCase(TestAdd)\n    result = unittest.TextTestRunner(verbosity=0).run(suite)\n    print(\"OK\" if result.wasSuccessful() else \"FAIL\")\n",
      exercises: {
        beginner: { prompt: "Write `status_label(code)` returning `'OK'` if 200 else `'ERR'`. Test with `200` and `500`. Print both.", starterCode: "# Define status_label, test with 200 and 500\n", expectedOutput: "OK\nERR" },
        intermediate: { prompt: "Given `items = [1, 2, 3]`. Assert `len(items) == 3`. If True print `'pass'`. Also check if `sum(items) == 6`, print that too.", starterCode: "items = [1, 2, 3]\n\n# Check len and sum, print pass/fail\n", expectedOutput: "pass\npass" },
        advanced: { prompt: "Safely access nested dict `resp = {'user': {'id': 1}}`. Check if `'user'` key exists AND `'id'` exists inside. Print `True`. Then try `.get('missing', {}).get('id')` and print result.", starterCode: "resp = {'user': {'id': 1}}\n\n# Check nested keys, print True. Try missing key, print None\n", expectedOutput: "True\nNone" },
      },
    },
  ];
}

function aiml(): CareerLesson[] {
  return [
    {
      id: "ml-intro", title: "What is Machine Learning?", description: "Core concepts and types of ML",
      content: "## Machine Learning Overview\n\nML teaches computers to learn from data without explicit programming.\n\n### Types of ML\n- **Supervised** — Learn from labeled data\n- **Unsupervised** — Find patterns in unlabeled data\n- **Reinforcement** — Learn by trial and error\n\n### The ML Workflow\n1. Collect & prepare data\n2. Choose a model\n3. Train the model\n4. Evaluate performance\n5. Deploy & monitor",
      codeExample: "features = [[1500, 3], [2000, 4], [1200, 2]]\nprices = [300000, 450000, 200000]\ntotal_sqft = sum(f[0] for f in features)\navg_price_per_sqft = sum(prices) / total_sqft\nnew_house = 1800\nprint(\"Predicted:\", int(new_house * avg_price_per_sqft))",
      translations: {
        tamil: { title: "Machine Learning என்றால் என்ன?", description: "ML இன் அடிப்படை கருத்துகள் மற்றும் வகைகள்" },
        kannada: { title: "Machine Learning ಎಂದರೇನು?", description: "ML ಮೂಲಭೂತ ಕಲ್ಪನೆಗಳು ಮತ್ತು ವಿಧಗಳು" },
        telugu: { title: "Machine Learning అంటే ఏమిటి?", description: "ML యొక్క ప్రాథమిక కాన్సెప్ట్‌లు మరియు రకాలు" },
        hindi: { title: "Machine Learning क्या है?", description: "ML के मुख्य concepts और प्रकार" },
      },
      exercises: {
        beginner: { prompt: "Given `features = [1500, 2000, 1200]`. Print `sum()`, `len()`, and mean rounded to 1 decimal.", starterCode: "features = [1500, 2000, 1200]\n\n# Print sum, len, mean\n", expectedOutput: "4700\n3\n1566.7" },
        intermediate: { prompt: "Calculate MAE between `pred=[300,450,200]` and `actual=[310,440,210]`. Print it.", starterCode: "pred = [300, 450, 200]\nactual = [310, 440, 210]\n\n# Calculate and print MAE\n", expectedOutput: "10.0" },
        advanced: { prompt: "Linear model `y = mx + b`. Given `m=2, b=1`, predict for `x=[1,2,3]`. Print the predictions list and the `max()`.", starterCode: "m = 2\nb = 1\nx_values = [1, 2, 3]\n\n# Predict, print list and max\n", expectedOutput: "[3, 5, 7]\n7" },
      },
    },
    {
      id: "ml-numpy", title: "NumPy Concepts for ML", description: "Array operations for machine learning",
      content: "## NumPy: Foundation of ML\n\nNumPy provides fast array operations.\n\n### Why NumPy?\n- 10-100x faster than Python lists\n- Vectorization — operate on entire arrays\n- Broadcasting — automatic shape alignment\n- Linear algebra built-in",
      codeExample: "a = [1, 2, 3]\nb = [4, 5, 6]\nresult = [x + y for x, y in zip(a, b)]\nprint(\"Add:\", result)\ndot = sum(x * y for x, y in zip(a, b))\nprint(\"Dot:\", dot)\nscaled = [x * 2 for x in a]\nprint(\"Scale:\", scaled)",
      exercises: {
        beginner: { prompt: "Add `[1,2,3]` and `[4,5,6]` element-wise using `zip()`. Print the result list.", starterCode: "a = [1, 2, 3]\nb = [4, 5, 6]\n\n# Element-wise add, print\n", expectedOutput: "[5, 7, 9]" },
        intermediate: { prompt: "Calculate dot product of `[1,2,3]` and `[4,5,6]` using `zip()` and `sum()`. Print it.", starterCode: "a = [1, 2, 3]\nb = [4, 5, 6]\n\n# Dot product, print\n", expectedOutput: "32" },
        advanced: { prompt: "Scale `[2, 4, 6]` by `0.5` (multiply each). Print the list. Then calculate magnitude of `[3,4]` using `math.sqrt`. Print it.", starterCode: "import math\n\n# Scale list, print. Magnitude of [3,4], print.\n", expectedOutput: "[1.0, 2.0, 3.0]\n5.0" },
      },
    },
    {
      id: "ml-classification", title: "Classification Basics", description: "Predict categories from data",
      content: "## Classification\n\nPredicts which category a data point belongs to.\n\n### Examples\n- Email: Spam or Not Spam\n- Image: Cat or Dog\n- Transaction: Fraud or Legit\n\n### K-Nearest Neighbors (KNN)\n1. Calculate distance to all training points\n2. Find K nearest\n3. Majority vote = prediction",
      codeExample: "import math\ndata = [\n    [1, 2, \"A\"], [2, 3, \"A\"], [3, 1, \"A\"],\n    [6, 5, \"B\"], [7, 7, \"B\"], [8, 6, \"B\"],\n]\ndef distance(p1, p2):\n    return math.sqrt((p1[0]-p2[0])**2 + (p1[1]-p2[1])**2)\nnew_point = [5, 5]\ndists = [(distance(new_point, d[:2]), d[2]) for d in data]\ndists.sort()\nprint(\"Nearest 3:\", [d[1] for d in dists[:3]])",
      exercises: {
        beginner: { prompt: "Calculate Euclidean distance between `(0,0)` and `(3,4)` using `math.sqrt`. Print it.", starterCode: "import math\n\n# Calculate and print distance\n", expectedOutput: "5.0" },
        intermediate: { prompt: "Find majority vote from `['A','A','B','A','B']`. Count with a dict, then use `max()` with `key=`. Print the winner and its count.", starterCode: "labels = ['A', 'A', 'B', 'A', 'B']\n\n# Count, find max, print winner and count\n", expectedOutput: "A\n3" },
        advanced: { prompt: "Calculate accuracy: `pred=['A','B','A','A']` vs `actual=['A','B','B','A']`. Print correct count and accuracy as percentage.", starterCode: "pred = ['A', 'B', 'A', 'A']\nactual = ['A', 'B', 'B', 'A']\n\n# Count correct, print count and accuracy %\n", expectedOutput: "3\n75.0" },
      },
    },
    {
      id: "ml-regression", title: "Linear Regression", description: "Predict continuous values with regression",
      content: "## Linear Regression\n\nPredict a continuous value from input features.\n\n### The Math\n- y = mx + b (slope-intercept)\n- m = slope (rate of change)\n- b = y-intercept\n\n### Training\n- Find m and b that minimize error\n- Cost function: Mean Squared Error\n- Gradient descent optimization\n\n### Applications\n- House price prediction\n- Stock forecasting\n- Sales estimation",
      codeExample: "# Simple linear regression from scratch\nX = [1, 2, 3, 4, 5]\ny = [2, 4, 5, 4, 5]\n\nn = len(X)\nmean_x = sum(X) / n\nmean_y = sum(y) / n\n\nnumerator = sum((X[i] - mean_x) * (y[i] - mean_y) for i in range(n))\ndenominator = sum((X[i] - mean_x) ** 2 for i in range(n))\n\nm = numerator / denominator\nb = mean_y - m * mean_x\n\nprint(\"Slope:\", round(m, 2))\nprint(\"Intercept:\", round(b, 2))\nprint(\"Predict x=6:\", round(m * 6 + b, 2))",
      exercises: {
        beginner: { prompt: "Given `y = 2x + 1`, predict for `x=5`. Print it.", starterCode: "m = 2\nb = 1\nx = 5\n\n# Calculate y and print\n", expectedOutput: "11" },
        intermediate: { prompt: "Calculate MSE for `pred=[2,4,6]` vs `actual=[2.5,3.5,6]`. Print rounded to 2 decimals.", starterCode: "pred = [2, 4, 6]\nactual = [2.5, 3.5, 6]\n\n# Calculate MSE, print rounded\n", expectedOutput: "0.17" },
        advanced: { prompt: "Calculate R² for `actual=[3,5,7,9]` and `pred=[2.8,5.2,6.8,9.1]`. Print rounded to 2 decimals.", starterCode: "actual = [3, 5, 7, 9]\npred = [2.8, 5.2, 6.8, 9.1]\n\n# Calculate R-squared, print\n", expectedOutput: "0.99" },
      },
    },
    {
      id: "ml-neural-nets", title: "Neural Networks Basics", description: "Understand how neural networks work",
      content: "## Neural Networks\n\nInspired by the brain — layers of connected neurons.\n\n### Architecture\n- **Input Layer** — Receives features\n- **Hidden Layers** — Learn patterns\n- **Output Layer** — Makes predictions\n\n### Activation Functions\n- **ReLU** — max(0, x)\n- **Sigmoid** — 1/(1+e^-x) → outputs 0-1\n- **Softmax** — Multi-class probabilities\n\n### Training: Backpropagation\n1. Forward pass — compute output\n2. Calculate loss\n3. Backward pass — compute gradients\n4. Update weights",
      codeExample: "import math\n\n# Activation functions\ndef relu(x):\n    return max(0, x)\n\ndef sigmoid(x):\n    return 1 / (1 + math.exp(-x))\n\n# Simple neuron\ndef neuron(inputs, weights, bias):\n    total = sum(i * w for i, w in zip(inputs, weights)) + bias\n    return sigmoid(total)\n\nresult = neuron([1.0, 0.5], [0.8, 0.2], -0.1)\nprint(\"Output:\", round(result, 4))",
      exercises: {
        beginner: { prompt: "Implement `relu(x)` returning `max(0, x)`. Test with `-3` and `5`. Print both.", starterCode: "# Define relu, test with -3 and 5\n", expectedOutput: "0\n5" },
        intermediate: { prompt: "Implement `sigmoid(x)` using `math.exp`. Print `sigmoid(0)` rounded to 1 decimal.", starterCode: "import math\n\n# Define sigmoid, print sigmoid(0) rounded\n", expectedOutput: "0.5" },
        advanced: { prompt: "Compute weighted sum: `inputs=[1,2,3]`, `weights=[0.5,0.3,0.2]`, `bias=0.1`. Use `zip()`. Print rounded to 1 decimal.", starterCode: "inputs = [1, 2, 3]\nweights = [0.5, 0.3, 0.2]\nbias = 0.1\n\n# Weighted sum + bias, print\n", expectedOutput: "1.8" },
      },
    },
    {
      id: "ml-nlp", title: "Natural Language Processing", description: "Process and understand text with Python",
      content: "## NLP — Teaching Computers to Read\n\n### Text Processing Pipeline\n1. **Tokenization** — Split text into words\n2. **Lowercasing** — Normalize case\n3. **Stop words** — Remove common words (the, is, a)\n4. **Stemming** — Reduce to root (running → run)\n5. **Vectorization** — Convert text to numbers\n\n### Applications\n- Chatbots & virtual assistants\n- Sentiment analysis\n- Translation\n- Text summarization",
      codeExample: "# Simple NLP pipeline\ntext = \"The quick brown fox jumps over the lazy dog\"\n\n# Tokenize\ntokens = text.lower().split()\nprint(\"Tokens:\", len(tokens))\n\n# Remove stop words\nstop_words = {\"the\", \"over\", \"a\", \"is\", \"and\"}\nfiltered = [w for w in tokens if w not in stop_words]\nprint(\"Filtered:\", filtered)\n\n# Word frequency\nfreq = {}\nfor w in filtered:\n    freq[w] = freq.get(w, 0) + 1\nprint(\"Frequencies:\", freq)",
      exercises: {
        beginner: { prompt: "Tokenize `'Hello World Python'` using `.split()`. Print the list and `len()` of tokens.", starterCode: "text = 'Hello World Python'\n\n# Split and print tokens and count\n", expectedOutput: "['Hello', 'World', 'Python']\n3" },
        intermediate: { prompt: "Count word frequency in `'the cat sat on the mat'` using a dict. Print freq of `'the'` and total unique words.", starterCode: "text = 'the cat sat on the mat'\n\n# Count freq, print 'the' count and unique count\n", expectedOutput: "2\n5" },
        advanced: { prompt: "Simple sentiment: count positive words `{'great','amazing'}` in `'great amazing but terrible'`. Print positive count and total word count.", starterCode: "text = 'great amazing but terrible'\npositive = {'great', 'amazing'}\n\n# Count positive and total, print both\n", expectedOutput: "2\n4" },
      },
    },
    {
      id: "ml-cv", title: "Computer Vision Concepts", description: "Image processing and recognition basics",
      content: "## Computer Vision\n\nTeach computers to see and understand images.\n\n### Key Concepts\n- **Pixels** — Image = grid of numbers\n- **Channels** — RGB (Red, Green, Blue)\n- **Filters/Kernels** — Detect edges, blur, sharpen\n- **CNNs** — Convolutional Neural Networks\n\n### Applications\n- Face recognition\n- Object detection\n- Self-driving cars\n- Medical imaging",
      codeExample: "# Image as a matrix concept\nimage = [\n    [0, 0, 255, 0, 0],\n    [0, 255, 255, 255, 0],\n    [255, 255, 255, 255, 255],\n    [0, 255, 255, 255, 0],\n    [0, 0, 255, 0, 0],\n]\n\n# Count bright pixels (> 128)\nbright = sum(1 for row in image for pixel in row if pixel > 128)\ntotal = sum(len(row) for row in image)\nprint(f\"Bright pixels: {bright}/{total}\")\nprint(f\"Brightness: {round(bright/total*100)}%\")",
      exercises: {
        beginner: { prompt: "Create a 3x3 grid of zeros using nested lists. Print each row.", starterCode: "# Create 3x3 grid, print each row\n", expectedOutput: "[0, 0, 0]\n[0, 0, 0]\n[0, 0, 0]" },
        intermediate: { prompt: "Flatten `[[1,2,3],[4,5,6]]` to a 1D list. Print the flat list and its `len()`.", starterCode: "matrix = [[1, 2, 3], [4, 5, 6]]\n\n# Flatten and print list and length\n", expectedOutput: "[1, 2, 3, 4, 5, 6]\n6" },
        advanced: { prompt: "Calculate average pixel value of `image=[[100,200],[150,50]]`. Print total, count, and average.", starterCode: "image = [[100, 200], [150, 50]]\n\n# Calculate total, count, average and print all\n", expectedOutput: "500\n4\n125.0" },
      },
    },
    {
      id: "ml-feature-engineering", title: "Feature Engineering", description: "Turn raw data into model-ready signals",
      content: "## Feature Engineering\n\nModels learn from *features*.\n\n### Common transformations\n- **Scaling**: min-max, standardization\n- **Encoding**: one-hot for categories\n- **Text**: bag-of-words, TF-IDF (concept)\n- **Datetime**: day-of-week, month, hour\n\n### Rule of thumb\nIf a human can explain why a signal matters, it is often a good candidate feature.",
      codeExample: "# Simple scaling (min-max)\nx = [10, 20, 15, 30]\nmn, mx = min(x), max(x)\nscaled = [round((v - mn) / (mx - mn), 2) for v in x]\nprint(scaled)\n",
      exercises: {
        beginner: { prompt: "Min-max scale `v=5` with `min=0, max=10`. Print the result.", starterCode: "v = 5\nmn = 0\nmx = 10\n\n# Scale and print\n", expectedOutput: "0.5" },
        intermediate: { prompt: "One-hot encode `'B'` from `categories=['A','B','C']`. Print the vector.", starterCode: "categories = ['A', 'B', 'C']\nvalue = 'B'\n\n# One-hot encode and print\n", expectedOutput: "[0, 1, 0]" },
        advanced: { prompt: "Extract day-of-week from `'2024-01-07'` using `strptime` and `strftime('%a')`. Print the short name.", starterCode: "from datetime import datetime\ns = '2024-01-07'\n\n# Parse and print day abbreviation\n", expectedOutput: "Sun" },
      },
    },
    {
      id: "ml-evaluation", title: "Model Evaluation & Metrics", description: "Accuracy, precision, recall, and confusion matrices",
      content: "## Evaluation\n\n### Why accuracy can be misleading\nIf 95% of transactions are not fraud, a model that always predicts \"not fraud\" is 95% accurate but useless.\n\n### Confusion matrix\n- TP: true positives\n- FP: false positives\n- TN: true negatives\n- FN: false negatives\n\n### Metrics\n- **Precision** = TP / (TP + FP)\n- **Recall** = TP / (TP + FN)\n- **F1** = harmonic mean of precision and recall",
      codeExample: "# Compute precision/recall from predictions\nactual = [1, 0, 1, 1, 0]\npred =   [1, 0, 0, 1, 1]\n\nTP = sum(1 for a, p in zip(actual, pred) if a == 1 and p == 1)\nFP = sum(1 for a, p in zip(actual, pred) if a == 0 and p == 1)\nFN = sum(1 for a, p in zip(actual, pred) if a == 1 and p == 0)\n\nprecision = TP / (TP + FP) if TP + FP else 0\nrecall = TP / (TP + FN) if TP + FN else 0\nprint(round(precision, 2), round(recall, 2))\n",
      exercises: {
        beginner: { prompt: "Given `TP=3, FP=1`. Compute precision (`TP/(TP+FP)`). Print it.", starterCode: "TP = 3\nFP = 1\n\n# Compute and print precision\n", expectedOutput: "0.75" },
        intermediate: { prompt: "Given `TP=2, FN=1`. Compute recall. Print it rounded to 4 decimals.", starterCode: "TP = 2\nFN = 1\n\n# Compute and print recall\n", expectedOutput: "0.6667" },
        advanced: { prompt: "Compute accuracy for `actual=[1,0,1,0]` vs `pred=[1,1,1,0]`. Print correct count and accuracy.", starterCode: "actual = [1, 0, 1, 0]\npred = [1, 1, 1, 0]\n\n# Count correct, print count and accuracy\n", expectedOutput: "3\n0.75" },
      },
    },
  ];
}

function auto(): CareerLesson[] {
  return [
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
    {
      id: "sql-intro",
      title: "SQL Foundations (DQL)",
      description: "SELECT, FROM, ORDER BY, LIMIT — your first queries",
      category: "DQL (SELECT)",
      content:
        "## SQL Foundations\n\nSQL is the language used to **query and analyze** data in relational databases.\n\n### What you will practice here\n- `SELECT` columns\n- `FROM` tables\n- `ORDER BY` for stable output\n- `LIMIT` to reduce rows\n\n### Practice database (built-in)\nYou will query a small practice dataset with tables like `customers`, `orders`, `order_items`, and `products`.",
      codeExample:
        "-- Explore customers\nSELECT id, name, city\nFROM customers\nORDER BY id\nLIMIT 5;",
      translations: {
        tamil: { title: "SQL அடித்தளம் (DQL)", description: "SELECT, FROM, ORDER BY, LIMIT — உங்கள் முதல் queries", category: "DQL (SELECT)" },
        kannada: { title: "SQL Foundations (DQL)", description: "SELECT, FROM, ORDER BY, LIMIT — ನಿಮ್ಮ ಮೊದಲ queries", category: "DQL (SELECT)" },
        telugu: { title: "SQL Foundations (DQL)", description: "SELECT, FROM, ORDER BY, LIMIT — మీ మొదటి queries", category: "DQL (SELECT)" },
        hindi: { title: "SQL Foundations (DQL)", description: "SELECT, FROM, ORDER BY, LIMIT — आपकी पहली queries", category: "DQL (SELECT)" },
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
          expectedOutput: "name,price\nDell 24\" Monitor,12000\nSony Headphones,4500\nMechanical Keyboard,2500\nLogitech Mouse,800",
          solution: "SELECT name, price FROM products WHERE category = 'Electronics' ORDER BY price DESC;",
        },
        advanced: {
          prompt: "Show the top 3 most expensive products (name, price).",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "name,price\nDell 24\" Monitor,12000\nSony Headphones,4500\nMechanical Keyboard,2500",
          solution: "SELECT name, price FROM products ORDER BY price DESC LIMIT 3;",
        },
      },
    },
    {
      id: "sql-filtering",
      title: "Filtering & Sorting",
      description: "WHERE, AND/OR, LIKE, BETWEEN, IN, ORDER BY",
      category: "Filtering & Sorting",
      content:
        "## Filtering & Sorting\n\n### Core clauses\n- `WHERE` filters rows\n- `AND` / `OR` combine conditions\n- `IN` checks membership\n- `BETWEEN` checks ranges\n- `LIKE` pattern matching (`%` wildcard)\n\nTip: Always add an `ORDER BY` when you care about the exact row order (especially for exercises).",
      codeExample:
        "-- Customers in Mumbai\nSELECT name, city\nFROM customers\nWHERE city = 'Mumbai'\nORDER BY name;",
      translations: {
        tamil: {
          title: "Filtering & Sorting",
          description: "WHERE, AND/OR, LIKE, BETWEEN, IN, ORDER BY",
          category: "Filtering & Sorting",
          content:
            "## Filtering & Sorting\n\n### முக்கிய clauses\n- `WHERE` rows-ஐ filter செய்கிறது\n- `AND` / `OR` conditions-ஐ இணைக்கிறது\n- `IN` membership சரிபார்க்கிறது\n- `BETWEEN` range சரிபார்க்கிறது\n- `LIKE` pattern matching (`%` wildcard)\n\nTip: output order முக்கியமானால் எப்போதும் `ORDER BY` சேர்க்கவும் (exercises-க்கு இது மிக முக்கியம்).",
        },
        kannada: {
          title: "Filtering & Sorting",
          description: "WHERE, AND/OR, LIKE, BETWEEN, IN, ORDER BY",
          category: "Filtering & Sorting",
          content:
            "## Filtering & Sorting\n\n### ಮುಖ್ಯ clauses\n- `WHERE` rows ಅನ್ನು filter ಮಾಡುತ್ತದೆ\n- `AND` / `OR` conditions ಅನ್ನು ಸೇರಿಸುತ್ತದೆ\n- `IN` membership ಪರಿಶೀಲಿಸುತ್ತದೆ\n- `BETWEEN` range ಪರಿಶೀಲಿಸುತ್ತದೆ\n- `LIKE` pattern matching (`%` wildcard)\n\nTip: output order ಮುಖ್ಯವಾದರೆ ಯಾವಾಗಲೂ `ORDER BY` ಸೇರಿಸಿ (exercises ಗೆ ವಿಶೇಷವಾಗಿ).",
        },
        telugu: {
          title: "Filtering & Sorting",
          description: "WHERE, AND/OR, LIKE, BETWEEN, IN, ORDER BY",
          category: "Filtering & Sorting",
          content:
            "## Filtering & Sorting\n\n### ముఖ్య clauses\n- `WHERE` rows ని filter చేస్తుంది\n- `AND` / `OR` conditions ని కలుపుతుంది\n- `IN` membership చెక్ చేస్తుంది\n- `BETWEEN` range చెక్ చేస్తుంది\n- `LIKE` pattern matching (`%` wildcard)\n\nTip: output order ముఖ్యమైతే ఎప్పుడూ `ORDER BY` వాడండి (exercises కి చాలా ముఖ్యం).",
        },
        hindi: {
          title: "Filtering & Sorting",
          description: "WHERE, AND/OR, LIKE, BETWEEN, IN, ORDER BY",
          category: "Filtering & Sorting",
          content:
            "## Filtering & Sorting\n\n### मुख्य clauses\n- `WHERE` rows को filter करता है\n- `AND` / `OR` conditions को जोड़ता है\n- `IN` membership check करता है\n- `BETWEEN` range check करता है\n- `LIKE` pattern matching (`%` wildcard)\n\nTip: output order ज़रूरी हो तो हमेशा `ORDER BY` लगाएँ (खासकर exercises में).",
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
          prompt: "List products priced between 100 and 2000 (name, price) ordered by price.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "name,price\nOrganic Tea,250\nCushion Cover,300\nNescafe Coffee,350\nAlgorithmic Socks,400\nResistance Band,400\nSteelo Water Bottle,450\nParker Pen,500\nData Science Cap,600\nLogitech Mouse,800\nPython Book,800\nYoga Mat,900\nTable Lamp,1100\nMoleskine Diary,1200\nSQL Masterclass,1200\nDumbbell 5kg,1500",
          solution: "SELECT name, price FROM products WHERE price BETWEEN 100 AND 2000 ORDER BY price;",
        },
      },
    },
    {
      id: "sql-aggregations",
      title: "Aggregations & GROUP BY",
      description: "COUNT, SUM, AVG, GROUP BY, HAVING",
      category: "Aggregations",
      content:
        "## Aggregations\n\n### Common functions\n- `COUNT(*)`\n- `SUM(x)`\n- `AVG(x)`\n- `MIN(x)`, `MAX(x)`\n\n### GROUP BY\nGroups rows so aggregates are calculated per group.\n\n### HAVING\nFilters *groups* (after aggregation).",
      codeExample:
        "-- Orders per status\nSELECT status, COUNT(*) AS count\nFROM orders\nGROUP BY status\nORDER BY status;",
      translations: {
        tamil: {
          title: "Aggregations & GROUP BY",
          description: "COUNT, SUM, AVG, GROUP BY, HAVING",
          category: "Aggregations",
          content:
            "## Aggregations\n\n### பொதுவான functions\n- `COUNT(*)`\n- `SUM(x)`\n- `AVG(x)`\n- `MIN(x)`, `MAX(x)`\n\n### GROUP BY\nrows-ஐ குழுவாக்கி, ஒவ்வொரு group-க்கும் aggregate கணக்கிடுகிறது.\n\n### HAVING\naggregation பிறகு *groups*-ஐ filter செய்கிறது.",
        },
        kannada: {
          title: "Aggregations & GROUP BY",
          description: "COUNT, SUM, AVG, GROUP BY, HAVING",
          category: "Aggregations",
          content:
            "## Aggregations\n\n### ಸಾಮಾನ್ಯ functions\n- `COUNT(*)`\n- `SUM(x)`\n- `AVG(x)`\n- `MIN(x)`, `MAX(x)`\n\n### GROUP BY\nrows ಗಳನ್ನು group ಮಾಡಿ, ಪ್ರತಿ group ಗೆ aggregate ಲೆಕ್ಕ ಹಾಕುತ್ತದೆ.\n\n### HAVING\naggregation ನಂತರ *groups* ಅನ್ನು filter ಮಾಡುತ್ತದೆ.",
        },
        telugu: {
          title: "Aggregations & GROUP BY",
          description: "COUNT, SUM, AVG, GROUP BY, HAVING",
          category: "Aggregations",
          content:
            "## Aggregations\n\n### సాధారణ functions\n- `COUNT(*)`\n- `SUM(x)`\n- `AVG(x)`\n- `MIN(x)`, `MAX(x)`\n\n### GROUP BY\nrows ని group చేసి, ప్రతి group కి aggregates లెక్కిస్తుంది.\n\n### HAVING\naggregation తర్వాత *groups* ని filter చేస్తుంది.",
        },
        hindi: {
          title: "Aggregations & GROUP BY",
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
          solution: "SELECT p.name, SUM(oi.qty) AS total_qty FROM order_items oi JOIN orders o ON oi.order_id = o.id JOIN products p ON oi.product_id = p.id WHERE o.status = 'completed' GROUP BY p.name ORDER BY total_qty DESC, p.name;",
        },
        advanced: {
          prompt: "Compute revenue per completed order (order_id, revenue) ordered by order_id.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "order_id,revenue\n1,2000\n2,7000\n4,2000\n5,1150\n7,3400\n9,6700\n10,550\n12,3900\n14,2800\n16,7000\n17,2400\n18,2900\n20,400",
          solution: "SELECT o.id AS order_id, SUM(p.price * oi.qty) AS revenue FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id WHERE o.status = 'completed' GROUP BY o.id ORDER BY o.id;",
        },
      },
    },
    {
      id: "sql-joins",
      title: "JOINs",
      description: "INNER JOIN, LEFT JOIN, joining multiple tables",
      category: "Joins",
      content:
        "## JOINs\n\n### The big idea\nA JOIN combines rows from tables using a matching key.\n\n### Most used JOINs\n- `INNER JOIN`: only matching rows\n- `LEFT JOIN`: keep all left rows (even if no match)\n\nTip: When totals can be missing, use `COALESCE(x, 0)` to turn NULL into 0.",
      codeExample:
        "-- Orders with customer names\nSELECT o.id AS order_id, c.name, o.status\nFROM orders o\nJOIN customers c ON c.id = o.customer_id\nORDER BY o.id;",
      translations: {
        tamil: {
          title: "JOINs",
          description: "INNER JOIN, LEFT JOIN, multiple tables join",
          category: "Joins",
          content:
            "## JOINs\n\n### முக்கிய idea\nmatching key மூலம் பல tables-லிருந்த rows-ஐ JOIN இணைக்கிறது.\n\n### அதிகம் பயன்படுத்தப்படும் JOINs\n- `INNER JOIN`: match ஆன rows மட்டும்\n- `LEFT JOIN`: left table-ன் rows அனைத்தும் (match இல்லையெனிலும்)\n\nTip: totals இல்லாமல் NULL வரலாம்; `COALESCE(x, 0)` மூலம் NULL → 0 ஆக மாற்றலாம்.",
        },
        kannada: {
          title: "JOINs",
          description: "INNER JOIN, LEFT JOIN, multiple tables join",
          category: "Joins",
          content:
            "## JOINs\n\n### ಮುಖ್ಯ idea\nmatching key ಬಳಸಿ tables ಗಳ rows ಅನ್ನು JOIN ಸೇರಿಸುತ್ತದೆ.\n\n### ಹೆಚ್ಚು ಬಳಸುವ JOINs\n- `INNER JOIN`: match ಆದ rows ಮಾತ್ರ\n- `LEFT JOIN`: left table ನ ಎಲ್ಲಾ rows (match ಇಲ್ಲದಿದ್ದರೂ)\n\nTip: totals ನಲ್ಲಿ NULL ಬರಬಹುದು; `COALESCE(x, 0)` ಬಳಸಿ NULL → 0 ಮಾಡಿ.",
        },
        telugu: {
          title: "JOINs",
          description: "INNER JOIN, LEFT JOIN, multiple tables join",
          category: "Joins",
          content:
            "## JOINs\n\n### ముఖ్య idea\nmatching key ద్వారా tables లోని rows ని JOIN కలుపుతుంది.\n\n### ఎక్కువగా వాడే JOINs\n- `INNER JOIN`: match అయ్యే rows మాత్రమే\n- `LEFT JOIN`: left table లోని అన్ని rows (match లేకపోయినా)\n\nTip: totals లో NULL రావచ్చు; `COALESCE(x, 0)` తో NULL → 0 చేయండి.",
        },
        hindi: {
          title: "JOINs",
          description: "INNER JOIN, LEFT JOIN, joining multiple tables",
          category: "Joins",
          content:
            "## JOINs\n\n### मुख्य idea\nmatching key की मदद से JOIN अलग-अलग tables के rows को जोड़ता है.\n\n### सबसे ज़्यादा उपयोग होने वाले JOINs\n- `INNER JOIN`: सिर्फ matching rows\n- `LEFT JOIN`: left table के सभी rows (match न हो तब भी)\n\nTip: totals में NULL आ सकता है; `COALESCE(x, 0)` से NULL → 0 करें.",
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
          solution: "SELECT oi.order_id, p.name AS product, oi.qty AS quantity FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = 1 ORDER BY p.name;",
        },
        advanced: {
          prompt: "Total spent per customer on completed orders (include customers with 0). Output (name, total_spent) ordered by total_spent DESC.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "name,total_spent\nBob Sharma,9400\nAlice Johnson,9000\nHannah Abbott,6700\nKevin Hart,3900\nFiona Apple,3800\nOscar Wilde,2900\nMike Ross,2800\nCharlie Dave,2000\nDiana Prince,1150\nIan Wright,550\nEthan Hunt,0\nGeorge Miller,0\nJulia Roberts,0\nLaura Palmer,0\nNina Simone,0",
          solution: "SELECT c.name, COALESCE(SUM(p.price * oi.qty), 0) AS total_spent FROM customers c LEFT JOIN orders o ON c.id = o.customer_id AND o.status = 'completed' LEFT JOIN order_items oi ON o.id = oi.order_id LEFT JOIN products p ON oi.product_id = p.id GROUP BY c.name ORDER BY total_spent DESC;",
        },
      },
    },
    {
      id: "sql-subqueries",
      title: "Subqueries",
      description: "IN, EXISTS, scalar subqueries, derived tables",
      category: "Subqueries",
      content:
        "## Subqueries\n\nSubqueries let you use one query inside another.\n\n### Common patterns\n- `WHERE x IN (SELECT ...)`\n- `WHERE EXISTS (SELECT ...)`\n- Subquery in `FROM` (derived table)\n\nTip: Prefer `EXISTS` when you only need to check presence (not values).",
      codeExample:
        "-- Customers with any cancelled order\nSELECT name\nFROM customers\nWHERE id IN (\n  SELECT customer_id FROM orders WHERE status = 'cancelled'\n)\nORDER BY name;",
      translations: {
        tamil: {
          title: "Subqueries",
          description: "IN, EXISTS, scalar subqueries, derived tables",
          category: "Subqueries",
          content:
            "## Subqueries\n\nஒரு query-க்குள் இன்னொரு query-ஐ பயன்படுத்த subquery உதவுகிறது.\n\n### பொதுவான patterns\n- `WHERE x IN (SELECT ...)`\n- `WHERE EXISTS (SELECT ...)`\n- `FROM`-ல் subquery (derived table)\n\nTip: values வேண்டாம், presence மட்டும் வேண்டும் என்றால் `EXISTS` நல்லது.",
        },
        kannada: {
          title: "Subqueries",
          description: "IN, EXISTS, scalar subqueries, derived tables",
          category: "Subqueries",
          content:
            "## Subqueries\n\nಒಂದು query ಒಳಗೆ ಇನ್ನೊಂದು query ಬಳಸಲು subquery ಸಹಾಯ ಮಾಡುತ್ತದೆ.\n\n### ಸಾಮಾನ್ಯ patterns\n- `WHERE x IN (SELECT ...)`\n- `WHERE EXISTS (SELECT ...)`\n- `FROM` ನಲ್ಲಿ subquery (derived table)\n\nTip: values ಬೇಕಿಲ್ಲ, presence ಮಾತ್ರ ಬೇಕಾದರೆ `EXISTS` ಉತ್ತಮ.",
        },
        telugu: {
          title: "Subqueries",
          description: "IN, EXISTS, scalar subqueries, derived tables",
          category: "Subqueries",
          content:
            "## Subqueries\n\nఒక query లో మరో query ని ఉపయోగించడానికి subquery సహాయపడుతుంది.\n\n### సాధారణ patterns\n- `WHERE x IN (SELECT ...)`\n- `WHERE EXISTS (SELECT ...)`\n- `FROM` లో subquery (derived table)\n\nTip: values అవసరం లేకుండా presence మాత్రమే చెక్ చేయాలంటే `EXISTS` బెటర్.",
        },
        hindi: {
          title: "Subqueries",
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
          expectedOutput: "name,total_spent\nDiana,3050\nCharlie,2860",
          solution: "WITH customer_spend AS (\n  SELECT c.name, COALESCE(SUM(p.price * oi.qty), 0) AS total_spent\n  FROM customers c\n  LEFT JOIN orders o ON c.id = o.customer_id AND o.status = 'completed'\n  LEFT JOIN order_items oi ON o.id = oi.order_id\n  LEFT JOIN products p ON oi.product_id = p.id\n  GROUP BY c.name\n)\nSELECT name, total_spent \nFROM customer_spend \nWHERE total_spent > (SELECT AVG(total_spent) FROM customer_spend)\nORDER BY total_spent DESC;",
        },
      },
    },
    {
      id: "sql-ctes",
      title: "CTEs (WITH)",
      description: "Readable multi-step queries with WITH",
      category: "CTEs",
      content:
        "## Common Table Expressions (CTEs)\n\nCTEs make complex queries easier to read by giving names to intermediate results.\n\n### Benefits\n- Break logic into steps\n- Reuse computed sets\n- Safer than repeating subqueries",
      codeExample:
        "-- Monthly revenue for completed orders\nWITH order_revenue AS (\n  SELECT o.id, substr(o.order_date, 1, 7) AS month, SUM(p.price * oi.quantity) AS revenue\n  FROM orders o\n  JOIN order_items oi ON oi.order_id = o.id\n  JOIN products p ON p.id = oi.product_id\n  WHERE o.status = 'completed'\n  GROUP BY o.id, month\n)\nSELECT month, SUM(revenue) AS revenue\nFROM order_revenue\nGROUP BY month\nORDER BY month;",
      translations: {
        tamil: {
          title: "CTEs (WITH)",
          description: "WITH மூலம் readable multi-step queries",
          category: "CTEs",
          content:
            "## Common Table Expressions (CTEs)\n\nintermediate results-க்கு பெயர் கொடுத்து complex queries-ஐ வாசிக்க எளிதாக்குகிறது.\n\n### பயன்கள்\n- logic-ஐ steps ஆக பிரிக்கலாம்\n- computed set-ஐ மீண்டும் பயன்படுத்தலாம்\n- repeated subqueries-ஐ விட பாதுகாப்பானது",
        },
        kannada: {
          title: "CTEs (WITH)",
          description: "WITH ಬಳಸಿ readable multi-step queries",
          category: "CTEs",
          content:
            "## Common Table Expressions (CTEs)\n\nintermediate results ಗೆ ಹೆಸರು ಕೊಟ್ಟು complex queries ಓದಲು ಸುಲಭವಾಗುತ್ತದೆ.\n\n### ಲಾಭಗಳು\n- logic ಅನ್ನು steps ಆಗಿ ವಿಭಜಿಸಿ\n- computed set ಅನ್ನು ಮರುಬಳಕೆ ಮಾಡಿ\n- subqueries ಪುನರಾವರ್ತನೆಗಿಂತ ಸುರಕ್ಷಿತ",
        },
        telugu: {
          title: "CTEs (WITH)",
          description: "WITH తో readable multi-step queries",
          category: "CTEs",
          content:
            "## Common Table Expressions (CTEs)\n\nintermediate results కు పేర్లు ఇవ్వడం ద్వారా complex queries చదవడానికి సులభం అవుతాయి.\n\n### ప్రయోజనాలు\n- logic ను steps గా విడగొట్టండి\n- computed set ను మళ్లీ ఉపయోగించండి\n- repeated subqueries కంటే safer",
        },
        hindi: {
          title: "CTEs (WITH)",
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
          solution: "WITH order_rev AS (\n  SELECT oi.order_id, SUM(p.price * oi.qty) AS revenue\n  FROM order_items oi\n  JOIN products p ON oi.product_id = p.id\n  GROUP BY oi.order_id\n)\nSELECT o.id AS order_id, r.revenue\nFROM orders o\nJOIN order_rev r ON o.id = r.order_id\nWHERE o.status = 'completed'\nORDER BY o.id;",
        },
        intermediate: {
          prompt: "Compute monthly completed revenue (month, revenue) ordered by month.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "month,revenue\n2026-01,9000\n2026-03,13250\n2026-04,19950",
          solution: "WITH monthly_rev AS (\n  SELECT substr(o.order_date, 1, 7) AS month, p.price * oi.qty AS line_revenue\n  FROM orders o\n  JOIN order_items oi ON o.id = oi.order_id\n  JOIN products p ON oi.product_id = p.id\n  WHERE o.status = 'completed'\n)\nSELECT month, SUM(line_revenue) AS revenue\nFROM monthly_rev\nGROUP BY month\nORDER BY month;",
        },
        advanced: {
          prompt: "Find the top customer by completed total_spent (name, total_spent).",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "name,total_spent\nBob Sharma,9400",
          solution: "WITH spend AS (\n  SELECT c.name, SUM(p.price * oi.qty) AS total_spent\n  FROM customers c\n  JOIN orders o ON c.id = o.customer_id\n  JOIN order_items oi ON o.id = oi.order_id\n  JOIN products p ON p.id = oi.product_id\n  WHERE o.status = 'completed'\n  GROUP BY c.name\n)\nSELECT name, total_spent \nFROM spend \nORDER BY total_spent DESC \nLIMIT 1;",
        },
      },
    },
    {
      id: "sql-windows",
      title: "Window Functions",
      description: "RANK, DENSE_RANK, OVER(), running totals",
      category: "Window Functions",
      content:
        "## Window Functions\n\nWindow functions compute values across a set of rows **without collapsing** them like GROUP BY.\n\n### Examples\n- Ranking within a category\n- Running totals\n- Moving averages\n\nSyntax pattern:\n`func(...) OVER (PARTITION BY ... ORDER BY ...)`",
      codeExample:
        "-- Rank products by price within category\nSELECT category, name, price,\n       RANK() OVER (PARTITION BY category ORDER BY price DESC) AS price_rank\nFROM products\nORDER BY category, name;",
      translations: {
        tamil: {
          title: "Window Functions",
          description: "RANK, DENSE_RANK, OVER(), running totals",
          category: "Window Functions",
          content:
            "## Window Functions\n\nGROUP BY போல rows-ஐ collapse செய்யாமல், rows set முழுவதிலும் values கணக்கிட உதவும்.\n\n### உதாரணங்கள்\n- category-க்குள் ranking\n- running totals\n- moving averages\n\nSyntax:\n`func(...) OVER (PARTITION BY ... ORDER BY ...)`",
        },
        kannada: {
          title: "Window Functions",
          description: "RANK, DENSE_RANK, OVER(), running totals",
          category: "Window Functions",
          content:
            "## Window Functions\n\nGROUP BY ಹಾಗೆ rows ಅನ್ನು collapse ಮಾಡದೆ, rows set ಮೇಲೆ values ಲೆಕ್ಕ ಹಾಕುತ್ತದೆ.\n\n### ಉದಾಹರಣೆಗಳು\n- category ಒಳಗೆ ranking\n- running totals\n- moving averages\n\nSyntax:\n`func(...) OVER (PARTITION BY ... ORDER BY ...)`",
        },
        telugu: {
          title: "Window Functions",
          description: "RANK, DENSE_RANK, OVER(), running totals",
          category: "Window Functions",
          content:
            "## Window Functions\n\nGROUP BY లా rows ని collapse చేయకుండా, rows set పై values లెక్కిస్తుంది.\n\n### Examples\n- category లో ranking\n- running totals\n- moving averages\n\nSyntax:\n`func(...) OVER (PARTITION BY ... ORDER BY ...)`",
        },
        hindi: {
          title: "Window Functions",
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
          expectedOutput: "category,name,price,price_rank\nApparel,Algorithmic Socks,400,3\nApparel,Data Science Cap,600,2\nApparel,PyMaster Hoodie,2200,1\nBooks,Python Book,800,2\nBooks,SQL Masterclass,1200,1\nElectronics,Dell 24\" Monitor,12000,1\nElectronics,Logitech Mouse,800,4\nElectronics,Mechanical Keyboard,2500,3\nElectronics,Sony Headphones,4500,2\nFitness,Dumbbell 5kg,1500,1\nFitness,Resistance Band,400,3\nFitness,Yoga Mat,900,2\nGrocery,Lays Chips,20,3\nGrocery,Nescafe Coffee,350,1\nGrocery,Organic Tea,250,2\nHome,Cushion Cover,300,3\nHome,Steelo Water Bottle,450,2\nHome,Table Lamp,1100,1\nStationery,Moleskine Diary,1200,1\nStationery,Parker Pen,500,2",
          solution: "SELECT category, name, price, RANK() OVER (PARTITION BY category ORDER BY price DESC) AS price_rank FROM products ORDER BY category, name;",
        },
        intermediate: {
          prompt: "Show completed daily revenue and running_total (order_date, revenue, running_total) ordered by order_date.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "order_date,revenue,running_total\n2026-01-05,2000,2000\n2026-01-06,7000,9000\n2026-03-12,2000,11000\n2026-03-15,1150,12150\n2026-03-20,3400,15550\n2026-03-28,6700,22250\n2026-04-01,550,22800\n2026-04-05,3900,26700\n2026-04-10,2800,29500\n2026-04-15,7000,36500\n2026-04-18,2400,38900\n2026-04-20,2900,41800\n2026-04-25,400,42200",
          solution: "WITH daily_rev AS (\n  SELECT o.order_date, SUM(p.price * oi.qty) AS revenue\n  FROM orders o\n  JOIN order_items oi ON o.id = oi.order_id\n  JOIN products p ON oi.product_id = p.id\n  WHERE o.status = 'completed'\n  GROUP BY o.order_date\n)\nSELECT order_date, revenue, SUM(revenue) OVER (ORDER BY order_date) AS running_total\nFROM daily_rev\nORDER BY order_date;",
        },
        advanced: {
          prompt: "Top 2 customers by completed total_spent with rank (name, total_spent, spend_rank) ordered by spend_rank.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "name,total_spent,spend_rank\nBob Sharma,9400,1\nAlice Johnson,9000,2",
          solution: "WITH spend AS (\n  SELECT c.name, SUM(p.price * oi.qty) AS total_spent\n  FROM customers c\n  JOIN orders o ON c.id = o.customer_id\n  JOIN order_items oi ON o.id = oi.order_id\n  JOIN products p ON p.id = oi.product_id\n  WHERE o.status = 'completed'\n  GROUP BY c.name\n)\nSELECT name, total_spent, RANK() OVER (ORDER BY total_spent DESC) AS spend_rank\nFROM spend\nORDER BY spend_rank\nLIMIT 2;",
        },
      },
    },
    {
      id: "sql-ddl",
      title: "DDL (CREATE / ALTER / DROP)",
      description: "Define tables, constraints, and schema",
      category: "DDL",
      content:
        "## DDL (Data Definition Language)\n\nDDL changes the database structure.\n\n### Common commands\n- `CREATE TABLE`\n- `ALTER TABLE`\n- `DROP TABLE`\n\nIn the practice editor, you can run multiple statements in one execution (separated by `;`).",
      codeExample:
        "CREATE TABLE temp_notes(\n  id INTEGER,\n  note TEXT\n);\n\nSELECT name\nFROM sqlite_master\nWHERE type='table' AND name='temp_notes';",
      translations: {
        tamil: {
          title: "DDL (CREATE / ALTER / DROP)",
          description: "Tables, constraints, schema வரையறுக்க",
          category: "DDL",
          content:
            "## DDL (Data Definition Language)\n\nDDL database structure-ஐ மாற்றுகிறது.\n\n### பொதுவான commands\n- `CREATE TABLE`\n- `ALTER TABLE`\n- `DROP TABLE`\n\nPractice editor-ல் `;` மூலம் பிரித்து பல statements ஒன்றாக run செய்யலாம்.",
        },
        kannada: {
          title: "DDL (CREATE / ALTER / DROP)",
          description: "Tables, constraints, schema ನಿರ್ವಚನೆ",
          category: "DDL",
          content:
            "## DDL (Data Definition Language)\n\nDDL database structure ಅನ್ನು ಬದಲಾಯಿಸುತ್ತದೆ.\n\n### ಸಾಮಾನ್ಯ commands\n- `CREATE TABLE`\n- `ALTER TABLE`\n- `DROP TABLE`\n\nPractice editor ನಲ್ಲಿ `;` ಮೂಲಕ ಬೇರ್ಪಡಿಸಿ ಹಲವು statements ಒಂದೇ run ನಲ್ಲಿ ಚಾಲನೆ ಮಾಡಬಹುದು.",
        },
        telugu: {
          title: "DDL (CREATE / ALTER / DROP)",
          description: "Tables, constraints, schema నిర్వచించండి",
          category: "DDL",
          content:
            "## DDL (Data Definition Language)\n\nDDL database structure ని మార్చుతుంది.\n\n### Common commands\n- `CREATE TABLE`\n- `ALTER TABLE`\n- `DROP TABLE`\n\nPractice editor లో `;` తో వేరు చేసి multiple statements ను ఒకే run లో నడపవచ్చు.",
        },
        hindi: {
          title: "DDL (CREATE / ALTER / DROP)",
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
      title: "DML (INSERT / UPDATE / DELETE)",
      description: "Modify rows safely with conditions",
      category: "DML",
      content:
        "## DML (Data Manipulation Language)\n\nDML changes row data.\n\n### Commands\n- `INSERT` add rows\n- `UPDATE` change rows (always use a WHERE unless you intend to update all)\n- `DELETE` remove rows\n\nTip: For practice, you can run changes and immediately verify with a SELECT.",
      codeExample:
        "-- Insert a new customer and verify\nINSERT INTO customers(id, name, city, signup_date)\nVALUES (6, 'Farah', 'Delhi', '2026-04-01');\n\nSELECT name, city\nFROM customers\nWHERE id = 6;",
      translations: {
        tamil: {
          title: "DML (INSERT / UPDATE / DELETE)",
          description: "conditions உடன் rows-ஐ பாதுகாப்பாக மாற்ற",
          category: "DML",
          content:
            "## DML (Data Manipulation Language)\n\nDML row data-ஐ மாற்றுகிறது.\n\n### Commands\n- `INSERT` புதிய rows சேர்க்க\n- `UPDATE` rows மாற்ற (அனைத்தையும் update செய்ய நினைக்கவில்லை என்றால் `WHERE` அவசியம்)\n- `DELETE` rows நீக்க\n\nTip: மாற்றம் செய்த பிறகு உடனே `SELECT` மூலம் verify செய்யலாம்.",
        },
        kannada: {
          title: "DML (INSERT / UPDATE / DELETE)",
          description: "conditions ಜೊತೆಗೆ rows ಅನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಬದಲಿಸಿ",
          category: "DML",
          content:
            "## DML (Data Manipulation Language)\n\nDML row data ಅನ್ನು ಬದಲಾಯಿಸುತ್ತದೆ.\n\n### Commands\n- `INSERT` ಹೊಸ rows ಸೇರಿಸಿ\n- `UPDATE` rows ಬದಲಿಸಿ (ಎಲ್ಲವನ್ನೂ update ಮಾಡಲು ಉದ್ದೇಶಿಸದಿದ್ದರೆ `WHERE` ಬಳಸಿ)\n- `DELETE` rows ಅಳಿಸಿ\n\nTip: ಬದಲಾವಣೆಗಳ ನಂತರ ತಕ್ಷಣ `SELECT` ಮೂಲಕ ಪರಿಶೀಲಿಸಿ.",
        },
        telugu: {
          title: "DML (INSERT / UPDATE / DELETE)",
          description: "conditions తో rows ని safe గా మార్చండి",
          category: "DML",
          content:
            "## DML (Data Manipulation Language)\n\nDML row data ని మార్చుతుంది.\n\n### Commands\n- `INSERT` కొత్త rows జోడించండి\n- `UPDATE` rows మార్చండి (అన్ని update చేయాలనుకోకపోతే తప్పకుండా `WHERE` వాడండి)\n- `DELETE` rows తొలగించండి\n\nTip: changes చేసిన వెంటనే `SELECT` తో verify చేయండి.",
        },
        hindi: {
          title: "DML (INSERT / UPDATE / DELETE)",
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
          solution: "INSERT INTO customers(id, name, city, signup_date) VALUES (101, 'Farah', 'Delhi', '2026-04-26');\nSELECT name, city FROM customers WHERE id = 101;",
        },
        intermediate: {
          prompt: "Update order 3 from cancelled to completed, then count completed orders (count).",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "count\n5",
          solution: "UPDATE orders SET status = 'completed' WHERE id = 3;\nSELECT COUNT(*) AS count FROM orders WHERE status = 'completed';",
        },
        advanced: {
          prompt: "Delete order_items for order_id=3, then show total_qty for order 3 as 0 (use COALESCE).",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "total_qty\n0",
          solution: "DELETE FROM order_items WHERE order_id = 3;\nSELECT COALESCE(SUM(qty), 0) AS total_qty FROM order_items WHERE order_id = 3;",
        },
      },
    },
    {
      id: "sql-transactions",
      title: "Transactions (TCL)",
      description: "BEGIN, COMMIT, ROLLBACK for safe changes",
      category: "Transactions (TCL)",
      content:
        "## Transactions\n\nTransactions let you group changes so they either all happen or none happen.\n\n### Commands\n- `BEGIN` / `BEGIN TRANSACTION`\n- `COMMIT` save changes\n- `ROLLBACK` undo changes\n\nThis is essential for correctness in real systems (payments, inventory, etc.).",
      codeExample:
        "BEGIN;\nUPDATE products SET price = 15 WHERE name = 'Pen';\nCOMMIT;\nSELECT price FROM products WHERE name = 'Pen';",
      translations: {
        tamil: {
          title: "Transactions (TCL)",
          description: "BEGIN, COMMIT, ROLLBACK மூலம் safe changes",
          category: "Transactions (TCL)",
          content:
            "## Transactions\n\nபல changes-ஐ ஒரே group ஆக நடத்த transactions உதவும் — அனைத்தும் நடக்கும் அல்லது ஒன்றும் நடக்காது.\n\n### Commands\n- `BEGIN` / `BEGIN TRANSACTION`\n- `COMMIT` changes சேமிக்க\n- `ROLLBACK` changes திரும்பப்பெற\n\nPayments, inventory போன்ற real systems-ல் correctness-க்கு இது மிக அவசியம்.",
        },
        kannada: {
          title: "Transactions (TCL)",
          description: "BEGIN, COMMIT, ROLLBACK ಬಳಸಿ safe changes",
          category: "Transactions (TCL)",
          content:
            "## Transactions\n\nಬಹು changes ಅನ್ನು ಒಂದೇ group ಆಗಿ ಮಾಡಬಹುದು — ಎಲ್ಲವೂ ಆಗಬೇಕು ಅಥವಾ ಯಾವುದೂ ಆಗಬಾರದು.\n\n### Commands\n- `BEGIN` / `BEGIN TRANSACTION`\n- `COMMIT` changes ಉಳಿಸಿ\n- `ROLLBACK` changes ಹಿಂತೆಗೆದು\n\nPayments, inventory ಮುಂತಾದ real systems ನಲ್ಲಿ correctness ಗೆ ಇದು ಅಗತ್ಯ.",
        },
        telugu: {
          title: "Transactions (TCL)",
          description: "BEGIN, COMMIT, ROLLBACK తో safe changes",
          category: "Transactions (TCL)",
          content:
            "## Transactions\n\nచేంజెస్ ని ఒక గ్రూప్‌గా చేసి — అన్నీ జరగాలి లేదా ఏదీ జరగకూడదు అనేలా transactions సహాయపడతాయి.\n\n### Commands\n- `BEGIN` / `BEGIN TRANSACTION`\n- `COMMIT` changes save చేయండి\n- `ROLLBACK` changes undo చేయండి\n\nPayments, inventory వంటి real systems లో correctness కి ఇది చాలా అవసరం.",
        },
        hindi: {
          title: "Transactions (TCL)",
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
          solution: "BEGIN;\nINSERT INTO customers(id, name, city) VALUES (101, 'Farah', 'Delhi');\nROLLBACK;\nSELECT COUNT(*) AS count FROM customers;",
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
    {
      id: "sql-indexes",
      title: "Indexes & Performance Basics",
      description: "What indexes do and when to use them",
      category: "Indexes",
      content:
        "## Indexes\n\nIndexes speed up lookups by creating an additional data structure.\n\n### Key idea\nIndexes can improve read performance but may slow down writes.\n\nIn SQLite, you can inspect indexes via `sqlite_master`.",
      codeExample:
        "CREATE INDEX idx_orders_customer ON orders(customer_id);\n\nSELECT name\nFROM sqlite_master\nWHERE type='index' AND tbl_name='orders'\nORDER BY name;",
      translations: {
        tamil: {
          title: "Indexes & Performance Basics",
          description: "indexes என்ன செய்கிறது, எப்போது பயன்படுத்த வேண்டும்",
          category: "Indexes",
          content:
            "## Indexes\n\nIndexes ஒரு கூடுதல் data structure உருவாக்கி lookups-ஐ வேகப்படுத்தும்.\n\n### முக்கிய idea\nReads வேகமாகும்; ஆனால் writes சில நேரம் மெதுவாகலாம்.\n\nSQLite-ல் `sqlite_master` மூலம் indexes-ஐ பார்க்கலாம்.",
        },
        kannada: {
          title: "Indexes & Performance Basics",
          description: "indexes ಏನು ಮಾಡುತ್ತವೆ ಮತ್ತು ಯಾವಾಗ ಬಳಸಿ",
          category: "Indexes",
          content:
            "## Indexes\n\nIndexes ಹೆಚ್ಚುವರಿ data structure ರಚಿಸಿ lookups ಅನ್ನು ವೇಗಗೊಳಿಸುತ್ತವೆ.\n\n### ಮುಖ್ಯ idea\nReads ವೇಗವಾಗುತ್ತವೆ; writes ಸ್ವಲ್ಪ ನಿಧಾನವಾಗಬಹುದು.\n\nSQLite ನಲ್ಲಿ `sqlite_master` ಮೂಲಕ indexes ನೋಡಬಹುದು.",
        },
        telugu: {
          title: "Indexes & Performance Basics",
          description: "indexes ఏమి చేస్తాయి, ఎప్పుడు వాడాలి",
          category: "Indexes",
          content:
            "## Indexes\n\nIndexes అదనపు data structure సృష్టించి lookups ని వేగంగా చేస్తాయి.\n\n### Key idea\nReads వేగంగా; కానీ writes కొద్దిగా నెమ్మదిగా కావచ్చు.\n\nSQLite లో `sqlite_master` తో indexes చూడచ్చు.",
        },
        hindi: {
          title: "Indexes & Performance Basics",
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
          solution: "CREATE INDEX idx_orders_customer ON orders(customer_id);\nSELECT name FROM sqlite_master WHERE type='index' AND tbl_name='orders';",
        },
        intermediate: {
          prompt: "Create two indexes on orders: idx_orders_customer and idx_orders_status, then list them ordered by name.",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "name\nidx_orders_customer\nidx_orders_status",
          solution: "CREATE INDEX idx_orders_customer ON orders(customer_id);\nCREATE INDEX idx_orders_status ON orders(status);\nSELECT name FROM sqlite_master WHERE type='index' AND tbl_name='orders' ORDER BY name;",
        },
        advanced: {
          prompt: "After creating the two indexes, count how many indexes exist on orders (count).",
          starterCode: "-- Write your SQL here\n",
          expectedOutput: "count\n2",
          solution: "CREATE INDEX idx_orders_customer ON orders(customer_id);\nCREATE INDEX idx_orders_status ON orders(status);\nSELECT COUNT(*) AS count FROM sqlite_master WHERE type='index' AND tbl_name='orders';",
        },
      },
    },
    {
      id: "sql-views",
      title: "Views",
      description: "Saved queries for reuse and simplicity",
      category: "Views",
      content:
        "## Views\n\nA view is a saved query that acts like a virtual table.\n\n### Why views?\n- Reuse common joins\n- Simplify reporting queries\n- Keep application queries cleaner",
      codeExample:
        "CREATE VIEW v_completed_orders AS\nSELECT o.id AS order_id, c.name, o.order_date\nFROM orders o\nJOIN customers c ON c.id = o.customer_id\nWHERE o.status = 'completed';\n\nSELECT order_id, name\nFROM v_completed_orders\nORDER BY order_id\nLIMIT 2;",
      translations: {
        tamil: {
          title: "Views",
          description: "மீண்டும் பயன்படுத்த saved queries",
          category: "Views",
          content:
            "## Views\n\nView என்பது saved query — இது virtual table போல செயல்படும்.\n\n### ஏன் views?\n- பொதுவான joins-ஐ மீண்டும் பயன்படுத்த\n- reporting queries-ஐ எளிமைப்படுத்த\n- application queries-ஐ சுத்தமாக வைத்திருக்க",
        },
        kannada: {
          title: "Views",
          description: "ಮರುಬಳಕೆಗೆ saved queries",
          category: "Views",
          content:
            "## Views\n\nView ಒಂದು saved query — ಇದು virtual table처럼 ವರ್ತಿಸುತ್ತದೆ.\n\n### Views ಯಾಕೆ?\n- ಸಾಮಾನ್ಯ joins ಅನ್ನು ಮರುಬಳಕೆ ಮಾಡಿ\n- reporting queries ಸರಳಗೊಳಿಸಿ\n- application queries ಕ್ಲೀನ್ ಆಗಿರಲಿ",
        },
        telugu: {
          title: "Views",
          description: "reuse కోసం saved queries",
          category: "Views",
          content:
            "## Views\n\nView అనేది saved query — ఇది virtual table లా పనిచేస్తుంది.\n\n### Views ఎందుకు?\n- common joins ని reuse చేయండి\n- reporting queries ని సింపుల్ చేయండి\n- application queries ని clean గా ఉంచండి",
        },
        hindi: {
          title: "Views",
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
          solution: "CREATE VIEW v_customer_spend AS\nSELECT c.name, SUM(p.price * oi.qty) AS total_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nJOIN order_items oi ON o.id = oi.order_id\nJOIN products p ON oi.product_id = p.id\nWHERE o.status = 'completed'\nGROUP BY c.name;\n\nSELECT name, total_spent FROM v_customer_spend WHERE total_spent > 2000 ORDER BY total_spent DESC;",
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


const rawTracks: CareerTrack[] = [
  {
    id: "sql",
    title: "SQL & Databases",
    description: "Learn SQL with structured lessons and a built-in practice database",
    color: "primary",
    language: "sql",
    lessons: sqlLessons(),
  },
  { id: "data-analysis", title: "Data Analysis", description: "Master data analysis with Python", color: "primary", lessons: da() },
  { id: "web-development", title: "Web Development", description: "Build web apps and APIs", color: "streak-green", lessons: wd() },
  { id: "ai-ml", title: "AI & Machine Learning", description: "Build intelligent systems", color: "expert-purple", lessons: aiml() },
  { id: "automation", title: "Automation & Scripting", description: "Automate tasks with Python", color: "python-yellow", lessons: auto() },
  { id: "data-engineering", title: "Data Engineering", description: "Build data pipelines", color: "reward-gold", lessons: de() },
  { id: "cybersecurity", title: "Cybersecurity", description: "Security with Python", color: "destructive", lessons: cs() },
  { id: "git", title: "GitHub Mastery (Start to Master)", description: "Master Git and GitHub for teams", color: "expert-purple", language: "bash", lessons: githubMastery() },
  { id: "linux", title: "Linux Mastery (Install to Master)", description: "Master Linux from installation to professional system administration", color: "streak-green", language: "bash", lessons: linuxMastery() },
  { id: "cloud-mlops", title: "Cloud & MLOps", description: "Deploy and scale Python in the cloud", color: "primary", lessons: cloudMlops() },
  { id: "game-dev", title: "Game Development", description: "Build 2D and 3D games with Python", color: "destructive", lessons: gameDev() },
  { id: "iot-robotics", title: "IoT & Robotics", description: "Hardware and embedded Python", color: "reward-gold", lessons: iotRobotics() },
];

export const careerTracks: CareerTrack[] = rawTracks;
