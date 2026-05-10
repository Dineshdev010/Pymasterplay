import { problems, type Problem } from "./problems";

export interface DSATopic {
  id: string;
  title: string;
  emoji: string;
  category: "fundamentals" | "patterns" | "advanced";
  difficulty: "Easy" | "Medium" | "Hard";
  whatIsIt: string;
  whyUseIt: string;
  whenToUse: string[];
  patternDetection: string[];
  timeComplexity: string;
  spaceComplexity: string;
  codeExample: string;
  realWorldUse: string;
  visualExplanation: string;
  translations?: Partial<
    Record<
      "tamil" | "kannada" | "telugu" | "hindi",
      Partial<
        Pick<
          DSATopic,
          | "title"
          | "whatIsIt"
          | "whyUseIt"
          | "whenToUse"
          | "patternDetection"
          | "timeComplexity"
          | "spaceComplexity"
          | "realWorldUse"
          | "visualExplanation"
        >
      >
    >
  >;
}

export type LearnLanguage = "english" | "tamil" | "kannada" | "telugu" | "hindi";

export interface Category {
  id: "fundamentals" | "patterns" | "advanced";
  title: Record<string, string>;
  desc: Record<string, string>;
}

export const categories: Category[] = [
  {
    id: "fundamentals",
    title: {
      english: "Beginner",
      tamil: "தொடக்கநிலை",
      kannada: "ಆರಂಭಿಕ",
      telugu: "ప్రారంభ స్థాయి",
      hindi: "शुरुआती",
    },
    desc: {
      english: "Start here: build intuition with core structures and simple patterns",
      tamil: "இங்கே தொடங்குங்கள்: அடிப்படை structures மற்றும் எளிய patterns மூலம் புரிதலை கட்டுங்கள்",
      kannada: "ಇಲ್ಲಿ ಆರಂಭಿಸಿ: core structures ಮತ್ತು simple patterns ಮೂಲಕ intuition ಕಟ್ಟಿರಿ",
      telugu: "ఇక్కడ ప్రారంభించండి: core structures + simple patterns తో intuition పెంచండి",
      hindi: "यहीं से शुरू करें: core structures और simple patterns से intuition बनाएं",
    },
  },
  {
    id: "patterns",
    title: {
      english: "Intermediate",
      tamil: "இடைக்கட்ட",
      kannada: "ಮಧ್ಯಮ",
      telugu: "మధ్యస్థ",
      hindi: "मध्यम",
    },
    desc: {
      english: "Learn repeatable solving patterns that work across many problems",
      tamil: "பல பிரச்சினைகளுக்கும் வேலை செய்யும் மீண்டும் பயன்படுத்தக்கூடிய solving patterns கற்றுக்கொள்ளுங்கள்",
      kannada: "ಅನೇಕರ ಸಮಸ್ಯೆಗಳಿಗೆ ಕೆಲಸ ಮಾಡುವ repeatable solving patterns கಲಿಯಿರಿ",
      telugu: "చాలా problems కి పని చేసే repeatable solving patterns నేర్చుకోండి",
      hindi: "कई problems में काम आने वाले repeatable solving patterns सीखें",
    },
  },
  {
    id: "advanced",
    title: {
      english: "Advanced",
      tamil: "மேம்பட்ட",
      kannada: "ಅಡ್ವಾನ್ಸ್ಡ್",
      telugu: "అధునాతన",
      hindi: "उन्नत",
    },
    desc: {
      english: "Prepare for harder interviews: DP, graphs, and complex reasoning",
      tamil: "கடினமான interviews-க்கு தயார்: DP, graphs, மற்றும் ஆழமான reasoning",
      kannada: "ಕಠಿಣ interviews ಗೆ ತಯಾರಿ: DP, graphs, ಮತ್ತು complex reasoning",
      telugu: "కఠినమైన interviews కోసం: DP, graphs, complex reasoning",
      hindi: "कठिन interviews के लिए: DP, graphs और complex reasoning",
    },
  },
];

export function getLocalizedDSATopic(topic: DSATopic | undefined, language: LearnLanguage) {
  if (!topic) return undefined;
  if (language === "english") return topic;
  const localized = topic.translations?.[language];
  if (!localized) return topic;
  return {
    ...topic,
    ...localized,
    whenToUse: localized.whenToUse ?? topic.whenToUse,
    patternDetection: localized.patternDetection ?? topic.patternDetection,
  };
}

export function tCategory(
  value: Category["title"] | string,
  language: LearnLanguage,
): string {
  if (typeof value === "string") return value;
  return (value as any)[language] ?? (value as any).english;
}

export const dsaTopics: DSATopic[] = [
  // FUNDAMENTALS
  {
    id: "arrays", title: "Arrays & Lists", emoji: "📦", category: "fundamentals", difficulty: "Easy",
    whatIsIt: "An array is a contiguous block of memory that stores elements of the same type. In Python, we use lists which are dynamic arrays — they can grow and shrink automatically.",
    whyUseIt: "Arrays give you O(1) random access by index. When you need to store a collection of items and access them by position, arrays are your go-to.",
    whenToUse: ["When you need fast access by index (O(1))", "When order of elements matters", "When you need to iterate through all elements", "When working with fixed-size or growing collections"],
    patternDetection: ["🔍 'Find all elements that...' → Linear scan O(n)", "🔍 'Sort and then...' → Sort first, then process", "🔍 'Find pair/triplet that sums to...' → Two pointers after sorting", "🔍 'Subarray with max/min...' → Sliding window or Kadane's"],
    timeComplexity: "Access: O(1) | Search: O(n) | Insert: O(n) | Append: O(1)",
    spaceComplexity: "O(n)",
    codeExample: `# Array/List operations in Python
nums = [3, 1, 4, 1, 5, 9]
print(nums[2])  # 4 - O(1) access
nums.append(2)  # O(1) amortized
squares = [x**2 for x in range(10)]
evens = [x for x in nums if x % 2 == 0]

# Two pointer pattern
def two_sum_sorted(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        s = nums[left] + nums[right]
        if s == target: return [left, right]
        elif s < target: left += 1
        else: right -= 1`,
    realWorldUse: "Database records, pixel arrays in images, sensor data streams, playlist ordering",
    visualExplanation: "Think of an array like a row of numbered lockers 🗄️. Each locker (index) holds one item. You can instantly go to locker #5, but inserting a new locker in the middle means moving everything after it.",
    translations: {
      tamil: {
        title: "Arrays & Lists",
        whatIsIt:
          "Array என்பது memory-ல் தொடர்ச்சியாக (contiguous) இருக்கும் பகுதியில் elements-ஐ சேமிக்கும் அமைப்பு. Python-ல் list என்பது dynamic array — அது தானாக வளரவும் குறையவும் முடியும்.",
        whyUseIt:
          "Index மூலம் O(1) random access கிடைக்கும். Position மூலம் items-ஐ அணுக வேண்டும் என்றால் arrays/lists சிறந்த தேர்வு.",
        whenToUse: [
          "Index மூலம் விரைவான access (O(1)) வேண்டும்",
          "Order முக்கியம்",
          "அனைத்து elements-ஐ iterate செய்ய வேண்டும்",
          "Fixed-size அல்லது growing collections",
        ],
        visualExplanation:
          "Array-ஐ எண்ணப்பட்ட lockers வரிசை 🗄️ போல நினையுங்கள். Locker #5-க்கு உடனே செல்லலாம்; ஆனால் நடுவில் புதிய locker சேர்க்க எல்லாவற்றையும் நகர்த்த வேண்டும்.",
      },
      kannada: {
        title: "Arrays & Lists",
        whatIsIt:
          "Array ಅಂದರೆ memory ನಲ್ಲಿ contiguous ಆಗಿ elements ಅನ್ನು ಸಂಗ್ರಹಿಸುವ ರಚನೆ. Python ನಲ್ಲಿ list ಒಂದು dynamic array — ಅದು ಸ್ವಯಂಚಾಲಿತವಾಗಿ grow/shrink ಆಗುತ್ತದೆ.",
        whyUseIt:
          "Index ಮೂಲಕ O(1) random access. Position ಆಧಾರಿತ access ಬೇಕಾದರೆ arrays/lists ಉತ್ತಮ.",
        whenToUse: ["Index ಮೂಲಕ fast access (O(1))", "Order ಮುಖ್ಯ", "ಎಲ್ಲ elements iterate", "Fixed ಅಥವಾ growing collections"],
        visualExplanation:
          "Array ಅನ್ನು ಸಂಖ್ಯೆ ಹಾಕಿದ lockers ಸಾಲು 🗄️ ಎಂದು ಕಲ್ಪಿಸಿ. Locker #5 ಗೆ ತಕ್ಷಣ ಹೋಗಬಹುದು, ಆದರೆ ಮಧ್ಯದಲ್ಲಿ ಹೊಸ locker ಸೇರಿಸಲು ನಂತರದ ಎಲ್ಲವನ್ನು shift ಮಾಡಬೇಕು.",
      },
      telugu: {
        title: "Arrays & Lists",
        whatIsIt:
          "Array అనేది memory లో contiguous గా elements ను store చేసే structure. Python లో list అనేది dynamic array — అది auto గా grow/shrink అవుతుంది.",
        whyUseIt:
          "Index ద్వారా O(1) random access. Position ఆధారంగా items ని access చేయాలంటే arrays/lists best.",
        whenToUse: ["Index తో fast access (O(1))", "Order ముఖ్యము", "All elements iterate", "Fixed లేదా growing collections"],
        visualExplanation:
          "Array ని numbered lockers వరుస 🗄️ లా ఊహించండి. Locker #5 కి వెంటనే వెళ్లొచ్చు, కానీ మధ్యలో కొత్త locker పెడితే తరువాతివన్నీ shift చేయాలి.",
      },
      hindi: {
        title: "Arrays & Lists",
        whatIsIt:
          "Array memory में contiguous block में elements store करता है। Python में list dynamic array है — यह अपने आप grow/shrink हो सकती है।",
        whyUseIt:
          "Index से O(1) random access मिलता है। Position से items access करने हों तो arrays/lists best हैं।",
        whenToUse: ["Index से fast access (O(1))", "Order important", "All elements iterate", "Fixed या growing collections"],
        visualExplanation:
          "Array को numbered lockers की row 🗄️ समझो। Locker #5 पर तुरंत जा सकते हो, लेकिन बीच में नया locker जोड़ने पर बाद वाले सब shift करने पड़ते हैं।",
      },
    },
  },
  {
    id: "hash-maps", title: "Hash Maps (Dictionaries)", emoji: "🗺️", category: "fundamentals", difficulty: "Easy",
    whatIsIt: "A hash map maps keys to values using a hash function. Python's dict is a hash map — it converts your key into an array index internally for O(1) access.",
    whyUseIt: "When you need to look up, insert, or delete by a key in O(1) average time. The most versatile data structure for counting, caching, and mapping relationships.",
    whenToUse: ["When you need fast lookup by key — O(1)", "Counting occurrences of elements", "Mapping relationships (name → phone)", "Caching/memoization results"],
    patternDetection: ["🔍 'Count frequency of...' → Use Counter or dict", "🔍 'Find if complement exists...' → Store seen values in dict", "🔍 'Group elements by...' → defaultdict(list)", "🔍 'Check if already visited...' → Use set (hash set)"],
    timeComplexity: "Get/Set/Delete: O(1) avg | Worst: O(n)",
    spaceComplexity: "O(n)",
    codeExample: `from collections import Counter, defaultdict

freq = Counter("hello world".split())
print(freq)

def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i

def group_by_length(words):
    groups = defaultdict(list)
    for w in words:
        groups[len(w)].append(w)
    return dict(groups)`,
    realWorldUse: "Caches, database indexes, symbol tables in compilers, configuration settings",
    visualExplanation: "Imagine a library catalog 📚. Instead of searching every shelf, you look up a book by its call number (key) and go directly to its location (value). That's hashing!",
    translations: {
      tamil: {
        title: "Hash Maps (Dictionaries)",
        whatIsIt:
          "Hash map என்பது key → value mapping. Python `dict` ஒரு hash map; key-ஐ hash செய்து O(1) average access க்காக உள்ளே index-ஆக மாற்றுகிறது.",
        whyUseIt:
          "Key மூலம் lookup/insert/delete O(1) average. Counting, caching, mapping relationships போன்றவற்றுக்கு மிக பயனுள்ளது.",
      },
      kannada: {
        title: "Hash Maps (Dictionaries)",
        whatIsIt:
          "Hash map ಎಂದರೆ key → value mapping. Python `dict` ಒಂದು hash map; key ಅನ್ನು hash ಮಾಡಿ O(1) avg access ಗಾಗಿ internal index ಗೆ ಮ್ಯಾಪ್ ಮಾಡುತ್ತದೆ.",
        whyUseIt:
          "Key ಮೂಲಕ lookup/insert/delete O(1) avg. Counting, caching, relationships mapping ಗೆ ಅತ್ಯಂತ ಉಪಯುಕ್ತ.",
      },
      telugu: {
        title: "Hash Maps (Dictionaries)",
        whatIsIt:
          "Hash map అనేది key → value mapping. Python `dict` hash map; key ని hash చేసి O(1) avg access కోసం internal index గా map చేస్తుంది.",
        whyUseIt:
          "Key తో lookup/insert/delete O(1) avg. Counting, caching, relationships mapping కి చాలా ఉపయోగం.",
      },
      hindi: {
        title: "Hash Maps (Dictionaries)",
        whatIsIt:
          "Hash map key → value mapping है। Python `dict` hash map है; key को hash करके O(1) avg access के लिए internal index में map करता है।",
        whyUseIt:
          "Key से lookup/insert/delete O(1) avg। Counting, caching, relationships mapping के लिए बहुत उपयोगी।",
      },
    },
  },
  {
    id: "stacks-queues", title: "Stacks & Queues", emoji: "📚", category: "fundamentals", difficulty: "Easy",
    whatIsIt: "Stack = LIFO (Last In, First Out). Queue = FIFO (First In, First Out). Both restrict how you access elements for specific processing patterns.",
    whyUseIt: "When the order of processing matters. Stacks for undo operations, parsing, DFS. Queues for BFS, task scheduling, message processing.",
    whenToUse: ["Stack: matching brackets, undo/redo, DFS, expression evaluation", "Queue: BFS, task scheduling, buffer management", "When you only need to access the most recently or first added element"],
    patternDetection: ["🔍 'Valid parentheses/brackets...' → Stack", "🔍 'Process in order received...' → Queue", "🔍 'Level-by-level traversal...' → Queue (BFS)", "🔍 'Next greater/smaller element...' → Monotonic stack"],
    timeComplexity: "Push/Pop/Enqueue/Dequeue: O(1) | Peek: O(1)",
    spaceComplexity: "O(n)",
    codeExample: `from collections import deque

stack = []
stack.append(1)
stack.append(2)
top = stack.pop()  # 2

def is_valid(s):
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in '({[':
            stack.append(char)
        elif not stack or stack.pop() != pairs[char]:
            return False
    return len(stack) == 0

queue = deque()
queue.append(1)
first = queue.popleft()  # 1`,
    realWorldUse: "Browser back/forward (stack), print job queue, call stack in programming, BFS in social networks",
    visualExplanation: "Stack 📚: Like a stack of books — you can only take from the top. Queue 🎫: Like a ticket line — first person in line gets served first.",
    translations: {
      tamil: {
        title: "Stacks & Queues",
        whatIsIt: "Stack = LIFO. Queue = FIFO. இரண்டும் elements-ஐ access செய்யும் முறையை கட்டுப்படுத்தும்.",
        visualExplanation:
          "Stack 📚: புத்தகக் குவியல் போல — மேலே இருப்பதையே எடுக்க முடியும். Queue 🎫: வரிசை போல — முதலில் வந்தவர் முதலில் சேவை பெறுவர்.",
      },
      kannada: {
        title: "Stacks & Queues",
        whatIsIt: "Stack = LIFO. Queue = FIFO. ಎರಡೂ access ಕ್ರಮವನ್ನು ನಿಯಂತ್ರಿಸುತ್ತವೆ.",
        visualExplanation:
          "Stack 📚: ಪುಸ್ತಕಗಳ ಕಟ್ಟು — ಮೇಲಿಂದಲೇ ತೆಗೆದುಕೊಳ್ಳಬಹುದು. Queue 🎫: ಸಾಲು — ಮೊದಲಿಗೆ ಬಂದವನು ಮೊದಲಿಗೆ ಸೇವೆ.",
      },
      telugu: {
        title: "Stacks & Queues",
        whatIsIt: "Stack = LIFO. Queue = FIFO. రెండూ access ఆర్డర్ ను నియంత్రిస్తాయి.",
        visualExplanation:
          "Stack 📚: పుస్తకాల కట్ట లా — పై నుండి మాత్రమే తీస్తాం. Queue 🎫: క్యూలైన్ లా — ముందుగా వచ్చినవాడు ముందుగా.",
      },
      hindi: {
        title: "Stacks & Queues",
        whatIsIt: "Stack = LIFO. Queue = FIFO. दोनों access order को restrict करते हैं।",
        visualExplanation:
          "Stack 📚: किताबों की stack — ऊपर से ही निकालते हैं। Queue 🎫: लाइन — जो पहले आया, वो पहले।",
      },
    },
  },
  {
    id: "linked-lists", title: "Linked Lists", emoji: "🔗", category: "fundamentals", difficulty: "Medium",
    whatIsIt: "A linked list is a chain of nodes, where each node stores data and a pointer to the next node. Unlike arrays, elements aren't stored contiguously in memory.",
    whyUseIt: "O(1) insertion/deletion at known positions (no shifting needed). Useful when you don't know the size ahead of time or need frequent insertions.",
    whenToUse: ["Frequent insertions/deletions at known positions", "When you don't need random access by index", "Implementing stacks, queues, or LRU caches", "When memory is fragmented"],
    patternDetection: ["🔍 'Detect cycle in...' → Fast/slow pointer (Floyd's)", "🔍 'Find middle element...' → Fast/slow pointer", "🔍 'Reverse a linked list...' → Three pointers: prev, curr, next", "🔍 'Merge two sorted lists...' → Dummy head + comparison"],
    timeComplexity: "Access: O(n) | Insert/Delete: O(1) at known position | Search: O(n)",
    spaceComplexity: "O(n)",
    codeExample: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    prev = None
    curr = head
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    return prev

def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
    realWorldUse: "Browser history, music playlists, memory allocation, polynomial representation",
    visualExplanation: "Like a treasure hunt 🗺️ — each clue (node) tells you where to find the next clue, but you can't jump ahead. You must follow the chain!",
    translations: {
      tamil: {
        title: "Linked Lists",
        whatIsIt:
          "Linked list என்பது nodes சங்கிலி. ஒவ்வொரு node-ம் data + next pointer வைத்திருக்கும். Array போல contiguous memory அல்ல.",
        whyUseIt:
          "Known position-ல் insertion/deletion O(1) (shift செய்ய வேண்டாம்). Size முன்கூட்டியே தெரியாததும் frequent insertions தேவைப்படும் போதும் பயன்.",
        whenToUse: ["Known positions-ல் frequent insert/delete", "Index random access தேவையில்லை", "Stacks/queues/LRU cache implement செய்ய", "Memory fragmented ஆகும் சூழல்"],
        patternDetection: [
          "🔍 'Cycle detect...' → Fast/slow pointer (Floyd)",
          "🔍 'Middle node...' → Fast/slow pointer",
          "🔍 'Reverse...' → prev/curr/next pointers",
          "🔍 'Merge sorted lists...' → Dummy head + compare",
        ],
        visualExplanation:
          "Treasure hunt 🗺️ போல நினையுங்கள் — ஒவ்வொரு node-மும் next clue எங்கே என்பதை சொல்கிறது; நீங்கள் chain-ஐ பின்பற்றியே செல்ல வேண்டும்.",
      },
      kannada: {
        title: "Linked Lists",
        whatIsIt:
          "Linked list nodes ಸರಪಳಿ. ಪ್ರತಿಯೊಂದು node ನಲ್ಲಿ data + next pointer. Array ನಂತೆ contiguous memory ಅಲ್ಲ.",
        whyUseIt:
          "Known position ನಲ್ಲಿ insertion/deletion O(1) (shift ಬೇಡ). Size ಮುಂಚಿತವಾಗಿ ತಿಳಿಯದಾಗ ಅಥವಾ frequent insertions ಬೇಕಾದಾಗ ಉಪಯುಕ್ತ.",
        whenToUse: ["Known positions ನಲ್ಲಿ frequent insert/delete", "Index random access ಬೇಡ", "Stacks/queues/LRU cache implement", "Memory fragmented ಆಗಿರುವಾಗ"],
        patternDetection: [
          "🔍 'Cycle detect...' → Fast/slow pointer (Floyd)",
          "🔍 'Middle node...' → Fast/slow pointer",
          "🔍 'Reverse...' → prev/curr/next pointers",
          "🔍 'Merge sorted lists...' → Dummy head + compare",
        ],
        visualExplanation:
          "Treasure hunt 🗺️ ಹೀಗೇ — ಪ್ರತಿಯೊಂದು node next clue ಎಲ್ಲಿದೆ ಎಂದು ಹೇಳುತ್ತದೆ; ನೀವು chain ಅನ್ನು ಅನುಸರಿಸಬೇಕು.",
      },
      telugu: {
        title: "Linked Lists",
        whatIsIt:
          "Linked list అనేది nodes chain. ప్రతి node లో data + next pointer ఉంటుంది. Array లా contiguous memory కాదు.",
        whyUseIt:
          "Known position లో insertion/deletion O(1) (shift అవసరం లేదు). Size ముందుగా తెలియనప్పుడు లేదా frequent insertions అవసరమైనప్పుడు ఉపయోగం.",
        whenToUse: ["Known positions లో frequent insert/delete", "Index random access అవసరం లేదు", "Stacks/queues/LRU cache implement", "Memory fragmented అయినప్పుడు"],
        patternDetection: [
          "🔍 'Cycle detect...' → Fast/slow pointer (Floyd)",
          "🔍 'Middle node...' → Fast/slow pointer",
          "🔍 'Reverse...' → prev/curr/next pointers",
          "🔍 'Merge sorted lists...' → Dummy head + compare",
        ],
        visualExplanation:
          "Treasure hunt 🗺️ లా — ప్రతి node next clue ఎక్కడుందో చెబుతుంది; మీరు chain ని follow అవ్వాలి.",
      },
      hindi: {
        title: "Linked Lists",
        whatIsIt:
          "Linked list nodes की chain है। हर node में data + next pointer होता है। Array की तरह contiguous memory नहीं।",
        whyUseIt:
          "Known position पर insertion/deletion O(1) (shift नहीं करना पड़ता)। Size पहले से न पता हो या frequent insertions हों तो useful।",
        whenToUse: ["Known positions पर frequent insert/delete", "Index random access नहीं चाहिए", "Stacks/queues/LRU cache implement", "Fragmented memory cases"],
        patternDetection: [
          "🔍 'Cycle detect...' → Fast/slow pointer (Floyd)",
          "🔍 'Middle node...' → Fast/slow pointer",
          "🔍 'Reverse...' → prev/curr/next pointers",
          "🔍 'Merge sorted lists...' → Dummy head + compare",
        ],
        visualExplanation:
          "Treasure hunt 🗺️ जैसा — हर node बताता है next clue कहाँ है; आपको chain follow करनी होती है।",
      },
    },
  },
  {
    id: "strings", title: "String Manipulation", emoji: "📝", category: "fundamentals", difficulty: "Easy",
    whatIsIt: "Strings are immutable sequences of characters. Python strings support slicing, searching, formatting, and regex — powerful tools for text processing.",
    whyUseIt: "Text processing is everywhere: parsing input, validating data, pattern matching, serialization. Mastering strings is essential for any developer.",
    whenToUse: ["Text parsing and validation", "Pattern matching and searching", "Data serialization (JSON, CSV)", "URL/path manipulation"],
    patternDetection: ["🔍 'Anagram/permutation check...' → Sort or frequency count", "🔍 'Palindrome check...' → Two pointers from both ends", "🔍 'Substring search...' → Sliding window or KMP", "🔍 'String transformation...' → Build character by character"],
    timeComplexity: "Access: O(1) | Search: O(n) | Concatenation: O(n) | Slice: O(k)",
    spaceComplexity: "O(n) — strings are immutable, new string = new memory",
    codeExample: `# Essential string operations
s = "Hello, Python World!"

# Slicing
print(s[7:13])   # "Python"
print(s[::-1])   # Reverse

# Useful methods
print(s.lower())
print(s.split(", "))
print("-".join(["a", "b", "c"]))

# Check anagram
def is_anagram(s1, s2):
    return sorted(s1.lower()) == sorted(s2.lower())

# Check palindrome  
def is_palindrome(s):
    clean = ''.join(c.lower() for c in s if c.isalnum())
    return clean == clean[::-1]`,
    realWorldUse: "Search engines, text editors, compilers, data validation, natural language processing",
    visualExplanation: "A string is like a necklace of beads 📿 — each bead is a character. You can look at any bead by position, but to change one, you have to make a whole new necklace.",
    translations: {
      tamil: {
        title: "String Manipulation",
        whatIsIt:
          "String என்பது immutable characters sequence. Python-ல் slicing, search, formatting, regex போன்ற சக்திவாய்ந்த tools உள்ளன.",
        whyUseIt:
          "Text processing எங்கும் உள்ளது: input parse, data validate, pattern match, JSON/CSV போன்ற serialization. Strings-ஐ நன்றாக அறிதல் அவசியம்.",
        whenToUse: ["Text parsing/validation", "Pattern matching/search", "Serialization (JSON/CSV)", "URL/path manipulation"],
        patternDetection: [
          "🔍 'Anagram...' → sort அல்லது frequency count",
          "🔍 'Palindrome...' → two pointers",
          "🔍 'Substring search...' → sliding window / KMP",
          "🔍 'Transform...' → char-by-char build",
        ],
        visualExplanation:
          "String-ஐ மணிகளின் மாலை 📿 போல நினையுங்கள். ஒரு character மாற்ற வேண்டுமெனில் புதிய string உருவாக்க வேண்டும்.",
      },
      kannada: {
        title: "String Manipulation",
        whatIsIt:
          "String ಒಂದು immutable characters sequence. Python slicing/search/formatting/regex tools ಕೊಡುತ್ತದೆ.",
        whyUseIt:
          "Text processing ಎಲ್ಲೆಡೆ: input parse, data validate, pattern match, JSON/CSV serialization. Strings mastery ಅಗತ್ಯ.",
        whenToUse: ["Text parsing/validation", "Pattern matching/search", "Serialization (JSON/CSV)", "URL/path manipulation"],
        patternDetection: [
          "🔍 'Anagram...' → sort ಅಥವಾ frequency count",
          "🔍 'Palindrome...' → two pointers",
          "🔍 'Substring search...' → sliding window / KMP",
          "🔍 'Transform...' → char-by-char build",
        ],
        visualExplanation:
          "String ಅನ್ನು ಮುತ್ತಿನ ಹಾರ 📿 ಎಂದು ಕಲ್ಪಿಸಿ. ಒಂದು character ಬದಲಾಯಿಸಲು ಹೊಸ string ಬೇಕು (immutable).",
      },
      telugu: {
        title: "String Manipulation",
        whatIsIt:
          "String అనేది immutable characters sequence. Python లో slicing/search/formatting/regex tools ఉన్నాయి.",
        whyUseIt:
          "Text processing everywhere: input parse, data validate, pattern match, JSON/CSV serialization. Strings mastery అవసరం.",
        whenToUse: ["Text parsing/validation", "Pattern matching/search", "Serialization (JSON/CSV)", "URL/path manipulation"],
        patternDetection: [
          "🔍 'Anagram...' → sort లేదా frequency count",
          "🔍 'Palindrome...' → two pointers",
          "🔍 'Substring search...' → sliding window / KMP",
          "🔍 'Transform...' → char-by-char build",
        ],
        visualExplanation:
          "String ని ముత్యాల హారం 📿 లా ఊహించండి. ఒక character మార్చాలంటే కొత్త string తయారు చేయాలి (immutable).",
      },
      hindi: {
        title: "String Manipulation",
        whatIsIt:
          "String immutable characters sequence है। Python में slicing/search/formatting/regex tools हैं।",
        whyUseIt:
          "Text processing हर जगह: input parse, data validate, pattern match, JSON/CSV serialization. Strings mastery जरूरी।",
        whenToUse: ["Text parsing/validation", "Pattern matching/search", "Serialization (JSON/CSV)", "URL/path manipulation"],
        patternDetection: [
          "🔍 'Anagram...' → sort या frequency count",
          "🔍 'Palindrome...' → दो pointers",
          "🔍 'Substring search...' → sliding window / KMP",
          "🔍 'Transform...' → char-by-char build",
        ],
        visualExplanation:
          "String को beads की necklace 📿 समझो। एक character बदलना हो तो नई string बनानी पड़ती है (immutable).",
      },
    },
  },
  {
    id: "heaps", title: "Heaps & Priority Queues", emoji: "⛰️", category: "fundamentals", difficulty: "Medium",
    whatIsIt: "A heap is a tree-based structure where the parent is always smaller (min-heap) or larger (max-heap) than its children. Python's heapq module implements a min-heap.",
    whyUseIt: "Get the minimum/maximum element in O(1), insert/remove in O(log n). Perfect for 'top K', streaming data, and scheduling problems.",
    whenToUse: ["Find k largest/smallest elements", "Merge k sorted lists", "Median in a data stream", "Task scheduling by priority"],
    patternDetection: ["🔍 'K largest/smallest...' → Min/max heap of size K", "🔍 'Merge K sorted...' → Min heap with one element per list", "🔍 'Running median...' → Two heaps (max-heap + min-heap)", "🔍 'Schedule by priority...' → Priority queue"],
    timeComplexity: "Insert: O(log n) | Extract min: O(log n) | Peek: O(1)",
    spaceComplexity: "O(n)",
    codeExample: `import heapq

# Min heap
nums = [5, 3, 8, 1, 9, 2]
heapq.heapify(nums)  # O(n)
print(heapq.heappop(nums))  # 1 (smallest)

# K largest elements
def k_largest(nums, k):
    return heapq.nlargest(k, nums)

print(k_largest([3, 1, 4, 1, 5, 9], 3))  # [9, 5, 4]

# Merge K sorted lists
def merge_k_sorted(lists):
    heap = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst[0], i, 0))
    result = []
    while heap:
        val, list_idx, elem_idx = heapq.heappop(heap)
        result.append(val)
        if elem_idx + 1 < len(lists[list_idx]):
            heapq.heappush(heap, (lists[list_idx][elem_idx + 1], list_idx, elem_idx + 1))
    return result`,
    realWorldUse: "OS task schedulers, Dijkstra's shortest path, event-driven simulation, bandwidth management",
    visualExplanation: "Imagine a tournament bracket 🏆 — the winner (smallest/largest) is always at the top. When you remove the champion, a new one quickly rises up through the bracket.",
    translations: {
      tamil: {
        title: "Heaps & Priority Queues",
        whatIsIt:
          "Heap என்பது tree-based structure. Min-heap-ல் parent எப்போதும் children-ஐ விட சிறியது. Python `heapq` min-heap implement செய்கிறது.",
        whyUseIt:
          "Min/Max O(1) peek, insert/remove O(log n). Top-K, streaming median, scheduling போன்றவற்றில் சிறப்பு.",
        whenToUse: ["k largest/smallest", "Merge k sorted lists", "Median in stream", "Priority scheduling"],
        patternDetection: [
          "🔍 'Top K...' → size K heap",
          "🔍 'Merge K sorted...' → heap with 1 elem per list",
          "🔍 'Running median...' → two heaps",
          "🔍 'Schedule by priority...' → priority queue",
        ],
        visualExplanation:
          "Tournament bracket 🏆 போல — champion மேலே. Champion-ஐ நீக்கினால் புதிய champion வேகமாக மேலே வரும்.",
      },
      kannada: {
        title: "Heaps & Priority Queues",
        whatIsIt:
          "Heap ಒಂದು tree-based structure. Min-heap ನಲ್ಲಿ parent ಯಾವಾಗಲೂ children ಗಿಂತ ಚಿಕ್ಕದು. Python `heapq` min-heap.",
        whyUseIt:
          "Min/Max peek O(1), insert/remove O(log n). Top-K, streaming median, scheduling ಗೆ ಸೂಕ್ತ.",
        whenToUse: ["k largest/smallest", "Merge k sorted lists", "Median in stream", "Priority scheduling"],
        patternDetection: [
          "🔍 'Top K...' → size K heap",
          "🔍 'Merge K sorted...' → heap with 1 elem per list",
          "🔍 'Running median...' → two heaps",
          "🔍 'Schedule by priority...' → priority queue",
        ],
        visualExplanation:
          "Tournament bracket 🏆 — champion ಮೇಲ್ನೋಟದಲ್ಲಿ. Champion ತೆಗೆದರೆ ಹೊಸ champion ಬೇಗ ಮೇಲಕ್ಕೆ ಬರುತ್ತಾನೆ.",
      },
      telugu: {
        title: "Heaps & Priority Queues",
        whatIsIt:
          "Heap అనేది tree-based structure. Min-heap లో parent ఎప్పుడూ children కంటే చిన్నది. Python `heapq` min-heap.",
        whyUseIt:
          "Min/Max peek O(1), insert/remove O(log n). Top-K, streaming median, scheduling కి బాగా సరిపోతుంది.",
        whenToUse: ["k largest/smallest", "Merge k sorted lists", "Median in stream", "Priority scheduling"],
        patternDetection: [
          "🔍 'Top K...' → size K heap",
          "🔍 'Merge K sorted...' → heap with 1 elem per list",
          "🔍 'Running median...' → two heaps",
          "🔍 'Schedule by priority...' → priority queue",
        ],
        visualExplanation:
          "Tournament bracket 🏆 లా — champion పైభాగంలో. Champion తీసేస్తే కొత్త champion త్వరగా పైకి వస్తాడు.",
      },
      hindi: {
        title: "Heaps & Priority Queues",
        whatIsIt:
          "Heap tree-based structure है। Min-heap में parent हमेशा children से छोटा होता है। Python `heapq` min-heap implement करता है।",
        whyUseIt:
          "Min/Max peek O(1), insert/remove O(log n). Top-K, streaming median, scheduling के लिए best।",
        whenToUse: ["k largest/smallest", "Merge k sorted lists", "Median in stream", "Priority scheduling"],
        patternDetection: [
          "🔍 'Top K...' → size K heap",
          "🔍 'Merge K sorted...' → heap with 1 elem per list",
          "🔍 'Running median...' → two heaps",
          "🔍 'Schedule by priority...' → priority queue",
        ],
        visualExplanation:
          "Tournament bracket 🏆 जैसा — champion सबसे ऊपर। Champion हटाओ तो नया champion जल्दी ऊपर आ जाता है।",
      },
    },
  },
  // PATTERNS
  {
    id: "two-pointers", title: "Two Pointers Pattern", emoji: "👆👆", category: "patterns", difficulty: "Medium",
    whatIsIt: "A technique using two references (pointers) that traverse the data structure in a coordinated way — often from opposite ends or at different speeds.",
    whyUseIt: "Reduces O(n²) brute force to O(n). Works brilliantly on sorted arrays and linked lists for finding pairs, removing duplicates, or partitioning.",
    whenToUse: ["Sorted arrays: find pairs with target sum", "Remove duplicates from sorted array", "Container with most water / trapping rain water", "Palindrome checking"],
    patternDetection: ["🔍 'Find pair in sorted array...' → Start from both ends", "🔍 'Remove in-place...' → Read/write pointers", "🔍 'Is palindrome...' → Compare from both ends", "🔍 'Three sum / four sum...' → Fix one, two-pointer on rest"],
    timeComplexity: "Usually O(n) or O(n log n) if sorting needed",
    spaceComplexity: "O(1) — no extra space!",
    codeExample: `def two_sum_sorted(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        current = nums[left] + nums[right]
        if current == target: return [left, right]
        elif current < target: left += 1
        else: right -= 1

def remove_duplicates(nums):
    if not nums: return 0
    write = 1
    for read in range(1, len(nums)):
        if nums[read] != nums[read - 1]:
            nums[write] = nums[read]
            write += 1
    return write

def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]: return False
        left += 1; right -= 1
    return True`,
    realWorldUse: "Database merge operations, collision detection, DNA sequence matching",
    visualExplanation: "Imagine two people walking toward each other on a bridge 🌉. They start at opposite ends and meet in the middle, checking conditions as they go.",
    translations: {
      tamil: {
        title: "Two Pointers Pattern",
        whatIsIt:
          "இரண்டு pointers மூலம் data structure-ஐ ஒருங்கிணைந்து traverse செய்வது (எதிர் முனைகளில் இருந்து அல்லது வேகங்கள் வேறாக).",
        whyUseIt:
          "Brute force O(n²) ஐ O(n) ஆக குறைக்க முடியும். Sorted arrays மற்றும் linked lists-ல் சிறப்பு.",
        whenToUse: ["Sorted array pair sum", "In-place duplicates remove", "Water container / rain water", "Palindrome check"],
        patternDetection: [
          "🔍 'Sorted pair...' → both ends",
          "🔍 'In-place remove...' → read/write pointers",
          "🔍 'Palindrome...' → compare ends",
          "🔍 '3-sum/4-sum...' → fix one + two pointers",
        ],
        visualExplanation:
          "Bridge 🌉-ல் இரண்டு பேர் எதிர் முனைகளில் இருந்து நடந்து நடுவில் சந்திப்பது போல — pointers move செய்து condition check செய்க.",
      },
      kannada: {
        title: "Two Pointers Pattern",
        whatIsIt:
          "ಎರಡು pointers ಬಳಸಿ coordinated traversal (ಎದುರು ದಿಕ್ಕಿನಿಂದ ಅಥವಾ ಬೇರೆ ವೇಗದಲ್ಲಿ).",
        whyUseIt:
          "O(n²) brute force ಅನ್ನು O(n) ಗೆ ಇಳಿಸುತ್ತದೆ. Sorted arrays/linked lists ನಲ್ಲಿ ಉತ್ತಮ.",
        whenToUse: ["Sorted pair sum", "In-place duplicates remove", "Water container", "Palindrome check"],
        patternDetection: [
          "🔍 'Sorted pair...' → both ends",
          "🔍 'In-place remove...' → read/write pointers",
          "🔍 'Palindrome...' → compare ends",
          "🔍 '3-sum/4-sum...' → fix one + two pointers",
        ],
        visualExplanation:
          "Bridge 🌉 ನಲ್ಲಿ ಎರಡು ಜನ ಎದುರು ತುದಿಗಳಿಂದ ನಡೆದು ಮಧ್ಯದಲ್ಲಿ ಸೇರುವಂತೆ — pointers move ಮಾಡಿ check ಮಾಡಿ.",
      },
      telugu: {
        title: "Two Pointers Pattern",
        whatIsIt:
          "రెండు pointers తో coordinated traversal (opposite ends లేదా different speeds).",
        whyUseIt:
          "O(n²) brute force ని O(n) గా తగ్గిస్తుంది. Sorted arrays/linked lists లో అద్భుతం.",
        whenToUse: ["Sorted pair sum", "In-place duplicates remove", "Water container", "Palindrome check"],
        patternDetection: [
          "🔍 'Sorted pair...' → both ends",
          "🔍 'In-place remove...' → read/write pointers",
          "🔍 'Palindrome...' → compare ends",
          "🔍 '3-sum/4-sum...' → fix one + two pointers",
        ],
        visualExplanation:
          "Bridge 🌉 పై రెండు మంది opposite ends నుండి నడుస్తూ మధ్యలో కలిసేలా — pointers move చేసి condition చెక్ చేయండి.",
      },
      hindi: {
        title: "Two Pointers Pattern",
        whatIsIt:
          "दो pointers से coordinated traversal (opposite ends से या अलग speed).",
        whyUseIt:
          "O(n²) brute force को O(n) में बदल देता है। Sorted arrays/linked lists में बहुत काम आता है।",
        whenToUse: ["Sorted pair sum", "In-place duplicates remove", "Water container", "Palindrome check"],
        patternDetection: [
          "🔍 'Sorted pair...' → both ends",
          "🔍 'In-place remove...' → read/write pointers",
          "🔍 'Palindrome...' → compare ends",
          "🔍 '3-sum/4-sum...' → fix one + two pointers",
        ],
        visualExplanation:
          "Bridge 🌉 पर दो लोग दोनों ends से चलते हुए बीच में मिलते हैं — वैसे pointers move करके check करते जाएँ।",
      },
    },
  },
  {
    id: "sliding-window", title: "Sliding Window Pattern", emoji: "🪟", category: "patterns", difficulty: "Medium",
    whatIsIt: "A technique that maintains a 'window' (subarray/substring) that slides across the data. The window can be fixed-size or dynamic, expanding and shrinking as needed.",
    whyUseIt: "Turns O(n²) or O(n³) substring/subarray problems into O(n). Instead of recalculating from scratch, update by adding/removing elements at the window edges.",
    whenToUse: ["Longest/shortest substring with condition", "Maximum sum subarray of size k", "String permutation / anagram matching", "Minimum window containing all characters"],
    patternDetection: ["🔍 'Maximum/minimum sum of k consecutive...' → Fixed window", "🔍 'Longest substring with at most...' → Dynamic window", "🔍 'Find anagram in string...' → Fixed window + freq count", "🔍 'Minimum window containing...' → Dynamic window + hash map"],
    timeComplexity: "O(n) — each element is added and removed at most once",
    spaceComplexity: "O(k) where k is window size or O(1) for fixed window",
    codeExample: `def max_sum_k(nums, k):
    window_sum = sum(nums[:k])
    max_sum = window_sum
    for i in range(k, len(nums)):
        window_sum += nums[i] - nums[i - k]
        max_sum = max(max_sum, window_sum)
    return max_sum

def longest_unique_substring(s):
    char_set = set()
    left = result = 0
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        result = max(result, right - left + 1)
    return result`,
    realWorldUse: "Network packet analysis, real-time analytics dashboards, stock price analysis, text pattern matching",
    visualExplanation: "Like looking through a train window 🚂 as it moves — you see a portion of the landscape at a time. As the train moves forward, new scenery enters and old scenery leaves your view.",
    translations: {
      tamil: {
        title: "Sliding Window Pattern",
        whatIsIt:
          "ஒரு window (subarray/substring) வைத்து data-ல் slide செய்வது. Fixed-size அல்லது dynamic (expand/shrink) ஆக இருக்கலாம்.",
        whyUseIt:
          "Substring/subarray brute force O(n²)/O(n³) ஐ O(n) ஆக மாற்றும். Edge-ல் add/remove செய்து update செய்யலாம்.",
        whenToUse: ["Longest/shortest substring", "Max sum subarray size k", "Anagram/permutation match", "Minimum window substring"],
        patternDetection: [
          "🔍 'Sum of k consecutive...' → fixed window",
          "🔍 'Longest with at most...' → dynamic window",
          "🔍 'Find anagram...' → fixed + freq count",
          "🔍 'Minimum window...' → dynamic + hashmap",
        ],
        visualExplanation:
          "Train window 🚂 போல — ஒரு பகுதியை மட்டும் பார்க்கிறோம்; train முன்னேறும்போது புதியது வரும், பழையது வெளியேறும்.",
      },
      kannada: {
        title: "Sliding Window Pattern",
        whatIsIt:
          "Window (subarray/substring) ಅನ್ನು maintain ಮಾಡಿ data ಮೇಲೆ slide ಮಾಡುವುದು. Fixed-size ಅಥವಾ dynamic (expand/shrink).",
        whyUseIt:
          "O(n²)/O(n³) brute force ಅನ್ನು O(n) ಗೆ ಇಳಿಸುತ್ತದೆ. Edges ನಲ್ಲಿ add/remove ಮಾಡಿ update.",
        whenToUse: ["Longest/shortest substring", "Max sum size k", "Anagram/permutation match", "Minimum window substring"],
        patternDetection: [
          "🔍 'Sum of k consecutive...' → fixed window",
          "🔍 'Longest with at most...' → dynamic window",
          "🔍 'Find anagram...' → fixed + freq count",
          "🔍 'Minimum window...' → dynamic + hashmap",
        ],
        visualExplanation:
          "Train window 🚂 ಹೀಗೇ — ಒಂದು ಭಾಗ ಮಾತ್ರ ಕಾಣುತ್ತದೆ; train ಮುಂದುವರಿದಂತೆ ಹೊಸದು ಬರುತ್ತದೆ, ಹಳೆಯದು ಹೋಗುತ್ತದೆ.",
      },
      telugu: {
        title: "Sliding Window Pattern",
        whatIsIt:
          "Window (subarray/substring) ని maintain చేసి data పై slide చేయడం. Fixed-size లేదా dynamic (expand/shrink).",
        whyUseIt:
          "O(n²)/O(n³) brute force ని O(n) కి తగ్గిస్తుంది. Edges వద్ద add/remove చేసి update.",
        whenToUse: ["Longest/shortest substring", "Max sum size k", "Anagram/permutation match", "Minimum window substring"],
        patternDetection: [
          "🔍 'Sum of k consecutive...' → fixed window",
          "🔍 'Longest with at most...' → dynamic window",
          "🔍 'Find anagram...' → fixed + freq count",
          "🔍 'Minimum window...' → dynamic + hashmap",
        ],
        visualExplanation:
          "Train window 🚂 లా — ఒక్క భాగమే కనిపిస్తుంది; train ముందుకు పోతే కొత్తది వస్తుంది, పాతది వెళ్తుంది.",
      },
      hindi: {
        title: "Sliding Window Pattern",
        whatIsIt:
          "Window (subarray/substring) maintain करके data पर slide करना। Fixed-size या dynamic (expand/shrink) हो सकता है।",
        whyUseIt:
          "O(n²)/O(n³) brute force को O(n) बनाता है। Edges पर add/remove करके update करते हैं।",
        whenToUse: ["Longest/shortest substring", "Max sum size k", "Anagram/permutation match", "Minimum window substring"],
        patternDetection: [
          "🔍 'Sum of k consecutive...' → fixed window",
          "🔍 'Longest with at most...' → dynamic window",
          "🔍 'Find anagram...' → fixed + freq count",
          "🔍 'Minimum window...' → dynamic + hashmap",
        ],
        visualExplanation:
          "Train window 🚂 जैसा — एक time पर landscape का छोटा हिस्सा दिखता है; आगे बढ़ते ही नया आता है, पुराना चला जाता है।",
      },
    },
  },
  {
    id: "binary-search-pattern", title: "Binary Search Pattern", emoji: "🔍", category: "patterns", difficulty: "Medium",
    whatIsIt: "A divide-and-conquer technique that halves the search space each step. Works on sorted data or any monotonic function. Incredibly powerful — O(log n).",
    whyUseIt: "Searching through 1 billion sorted elements takes only ~30 steps instead of 1 billion. The most efficient search algorithm for sorted data.",
    whenToUse: ["Searching in sorted arrays", "Finding boundaries (first/last occurrence)", "Minimizing/maximizing with monotonic function", "Square root, peak finding"],
    patternDetection: ["🔍 'Find target in sorted...' → Classic binary search", "🔍 'First/last position of...' → Binary search with boundary", "🔍 'Minimum speed/capacity to...' → Binary search on answer", "🔍 'Peak element in...' → Modified binary search"],
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1) iterative | O(log n) recursive",
    codeExample: `def binary_search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target: return mid
        elif nums[mid] < target: left = mid + 1
        else: right = mid - 1
    return -1

def find_first(nums, target):
    left, right = 0, len(nums) - 1
    result = -1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            result = mid
            right = mid - 1
        elif nums[mid] < target: left = mid + 1
        else: right = mid - 1
    return result`,
    realWorldUse: "Database indexes, searching sorted files, version control bisect, game AI decision trees",
    visualExplanation: "Like the guessing game 🎯 — 'I'm thinking of a number 1-100'. If you guess 50 and I say 'higher', you've eliminated half the possibilities in one step!",
    translations: {
      tamil: {
        title: "Binary Search Pattern",
        whatIsIt: "Search space-ஐ ஒவ்வொரு step-லும் பாதியாக குறைக்கும் divide-and-conquer technique. Sorted data அல்லது monotonic function-க்கு பயன்படும்.",
        whyUseIt: "1 billion sorted elements-ல் ~30 steps போதும். Sorted data-க்கு மிக திறமையான search (O(log n)).",
        whenToUse: ["Sorted arrays search", "Boundaries (first/last occurrence)", "Binary search on answer (monotonic)", "Sqrt/peak finding"],
        patternDetection: [
          "🔍 'Target in sorted...' → classic binary search",
          "🔍 'First/last position...' → boundary binary search",
          "🔍 'Minimum capacity/speed...' → binary search on answer",
          "🔍 'Peak element...' → modified binary search",
        ],
        visualExplanation:
          "Guessing game 🎯 போல — 1-100 எண்ணில் 50 என்று guess செய்தால் பாதி possibilities உடனே நீங்கும்.",
      },
      kannada: {
        title: "Binary Search Pattern",
        whatIsIt: "ಪ್ರತಿ step ನಲ್ಲಿ search space ಅನ್ನು ಅರ್ಧ ಮಾಡಿ ಕಡಿಮೆ ಮಾಡುವ divide-and-conquer technique. Sorted data ಅಥವಾ monotonic function ಗೆ ಸೂಕ್ತ.",
        whyUseIt: "1 billion sorted elements ನಲ್ಲಿ ~30 steps ಸಾಕು. O(log n) ಪರಿಣಾಮಕಾರಿ search.",
        whenToUse: ["Sorted arrays search", "Boundaries (first/last)", "Binary search on answer", "Sqrt/peak finding"],
        patternDetection: [
          "🔍 'Target in sorted...' → classic binary search",
          "🔍 'First/last position...' → boundary binary search",
          "🔍 'Minimum capacity/speed...' → answer binary search",
          "🔍 'Peak element...' → modified binary search",
        ],
        visualExplanation:
          "Guessing game 🎯 — 1-100 ನಲ್ಲಿ 50 ಊಹಿಸಿದರೆ ಅರ್ಧ possibilities ಒಂದೇ ಬಾರಿ ಕಡಿಮೆಯಾಗುತ್ತವೆ.",
      },
      telugu: {
        title: "Binary Search Pattern",
        whatIsIt: "ప్రతి step లో search space ని half చేసే divide-and-conquer technique. Sorted data లేదా monotonic function కి ఉపయోగపడుతుంది.",
        whyUseIt: "1 billion sorted elements లో ~30 steps చాలు. O(log n) efficient search.",
        whenToUse: ["Sorted arrays search", "Boundaries (first/last)", "Binary search on answer", "Sqrt/peak finding"],
        patternDetection: [
          "🔍 'Target in sorted...' → classic binary search",
          "🔍 'First/last position...' → boundary binary search",
          "🔍 'Minimum capacity/speed...' → answer binary search",
          "🔍 'Peak element...' → modified binary search",
        ],
        visualExplanation:
          "Guessing game 🎯 లా — 1-100 లో 50 guess చేస్తే half possibilities తొలగిపోతాయి.",
      },
      hindi: {
        title: "Binary Search Pattern",
        whatIsIt: "Divide-and-conquer technique जो हर step में search space आधा कर देता है। Sorted data या monotonic function पर काम करता है।",
        whyUseIt: "1 billion sorted elements में ~30 steps। O(log n) सबसे efficient search।",
        whenToUse: ["Sorted arrays search", "Boundaries (first/last)", "Binary search on answer", "Sqrt/peak finding"],
        patternDetection: [
          "🔍 'Target in sorted...' → classic binary search",
          "🔍 'First/last position...' → boundary binary search",
          "🔍 'Minimum capacity/speed...' → answer binary search",
          "🔍 'Peak element...' → modified binary search",
        ],
        visualExplanation:
          "Guessing game 🎯 जैसा — 1-100 में 50 guess करो, तो आधी possibilities एक step में खत्म।",
      },
    },
  },
  {
    id: "greedy", title: "Greedy Algorithms", emoji: "🤑", category: "patterns", difficulty: "Medium",
    whatIsIt: "A greedy algorithm makes the locally optimal choice at each step, hoping it leads to a globally optimal solution. It never reconsiders choices once made.",
    whyUseIt: "Simple, fast, and effective when the problem has the greedy-choice property. Often O(n log n) due to sorting, with O(1) extra space.",
    whenToUse: ["Activity/interval scheduling", "Minimum coins for change (specific denominations)", "Huffman coding", "Fractional knapsack"],
    patternDetection: ["🔍 'Maximum number of non-overlapping...' → Sort by end time, greedy pick", "🔍 'Minimum platforms/rooms...' → Sort events, track overlaps", "🔍 'Assign tasks to minimize...' → Sort and pair optimally", "🔍 'Jump game / reach end...' → Track farthest reachable"],
    timeComplexity: "O(n log n) typically (due to sorting) | O(n) for traversal",
    spaceComplexity: "O(1) to O(n)",
    codeExample: `# Activity Selection
def max_activities(starts, ends):
    activities = sorted(zip(starts, ends), key=lambda x: x[1])
    count = 1
    last_end = activities[0][1]
    for start, end in activities[1:]:
        if start >= last_end:
            count += 1
            last_end = end
    return count

# Jump Game
def can_jump(nums):
    farthest = 0
    for i, jump in enumerate(nums):
        if i > farthest: return False
        farthest = max(farthest, i + jump)
    return True`,
    realWorldUse: "Job scheduling, network routing, file compression (Huffman), coin vending machines",
    visualExplanation: "Like eating at a buffet 🍽️ — at each station, take the best-looking dish. You don't go back and swap. Sometimes this gets you the best meal, sometimes not!",
    translations: {
      tamil: {
        title: "Greedy Algorithms",
        whatIsIt:
          "ஒவ்வொரு step-லும் locally best choice எடுத்து globally best கிடைக்கும் என்று நம்பும் algorithm. முடிவு செய்த பிறகு திரும்ப மாற்றாது.",
        whyUseIt:
          "சரளமானது, வேகமானது. Greedy-choice property உள்ள problems-ல் சிறப்பாக வேலை செய்கிறது. பெரும்பாலும் sort காரணமாக O(n log n).",
        whenToUse: ["Interval scheduling", "Coin change (specific denominations)", "Huffman coding", "Fractional knapsack"],
        patternDetection: [
          "🔍 'Max non-overlapping...' → end time sort + greedy pick",
          "🔍 'Min rooms/platforms...' → sort events + track overlaps",
          "🔍 'Assign tasks...' → sort + pair",
          "🔍 'Jump game...' → farthest reachable track",
        ],
        visualExplanation:
          "Buffet 🍽️ போல — ஒவ்வொரு நிலையிலும் best dish எடுப்போம்; திரும்ப போய் swap செய்ய மாட்டோம்.",
      },
      kannada: {
        title: "Greedy Algorithms",
        whatIsIt:
          "ಪ್ರತಿ step ನಲ್ಲಿ locally best ಆಯ್ಕೆ ಮಾಡಿ global optimum ಸಿಗುತ್ತದೆ ಎಂದು ಭಾವಿಸುವ algorithm. ಆಯ್ಕೆಯನ್ನು ಮರುಪರಿಶೀಲಿಸದು.",
        whyUseIt:
          "ಸರಳ ಮತ್ತು ವೇಗವಾದುದು. Greedy-choice property ಇದ್ದರೆ ಪರಿಣಾಮಕಾರಿ. ಬಹುಸಾ sorting ಕಾರಣ O(n log n).",
        whenToUse: ["Interval scheduling", "Coin change", "Huffman coding", "Fractional knapsack"],
        patternDetection: [
          "🔍 'Max non-overlapping...' → end time sort + greedy pick",
          "🔍 'Min rooms/platforms...' → sort events + overlaps",
          "🔍 'Assign tasks...' → sort + pair",
          "🔍 'Jump game...' → farthest reachable",
        ],
        visualExplanation:
          "Buffet 🍽️ — ಪ್ರತಿ station ನಲ್ಲಿ best dish ತೆಗೆದು, ಹಿಂದಿರುಗಿ swap ಮಾಡುವುದಿಲ್ಲ.",
      },
      telugu: {
        title: "Greedy Algorithms",
        whatIsIt:
          "ప్రతి step లో locally best choice తీసుకుని global best వస్తుందని ఆశించే algorithm. ఒకసారి నిర్ణయం తీసుకున్నాక మార్చదు.",
        whyUseIt:
          "సింపుల్, ఫాస్ట్. Greedy-choice property ఉన్న problems లో బాగా పనిచేస్తుంది. సాధారణంగా sorting వల్ల O(n log n).",
        whenToUse: ["Interval scheduling", "Coin change", "Huffman coding", "Fractional knapsack"],
        patternDetection: [
          "🔍 'Max non-overlapping...' → end time sort + greedy pick",
          "🔍 'Min rooms/platforms...' → sort events + overlaps",
          "🔍 'Assign tasks...' → sort + pair",
          "🔍 'Jump game...' → farthest reachable",
        ],
        visualExplanation:
          "Buffet 🍽️ లా — ప్రతి station లో best dish తీసుకుంటారు; తిరిగి swap చేయరు.",
      },
      hindi: {
        title: "Greedy Algorithms",
        whatIsIt:
          "हर step पर locally best choice लेकर global optimum पाने की कोशिश करने वाला algorithm। एक बार choice हो गई तो वापस नहीं बदलता।",
        whyUseIt:
          "Simple और fast। Greedy-choice property वाले problems में effective। अक्सर sorting के कारण O(n log n)।",
        whenToUse: ["Interval scheduling", "Coin change", "Huffman coding", "Fractional knapsack"],
        patternDetection: [
          "🔍 'Max non-overlapping...' → end time sort + greedy pick",
          "🔍 'Min rooms/platforms...' → sort events + overlaps",
          "🔍 'Assign tasks...' → sort + pair",
          "🔍 'Jump game...' → farthest reachable",
        ],
        visualExplanation:
          "Buffet 🍽️ जैसा — हर station पर best dish ले लो; वापस जाकर swap नहीं करते।",
      },
    },
  },
  {
    id: "prefix-sum", title: "Prefix Sum Pattern", emoji: "📊", category: "patterns", difficulty: "Easy",
    whatIsIt: "Pre-compute cumulative sums so any range sum query becomes O(1). Build a prefix array where prefix[i] = sum of elements from index 0 to i.",
    whyUseIt: "Transforms O(n) range sum queries into O(1) after O(n) preprocessing. Essential for subarray sum problems.",
    whenToUse: ["Range sum queries", "Subarray sum equals K", "Count subarrays with given sum", "2D matrix region sums"],
    patternDetection: ["🔍 'Sum of subarray from i to j...' → Prefix sum difference", "🔍 'Number of subarrays with sum K...' → Prefix sum + hash map", "🔍 'Equilibrium index...' → Prefix sum from both sides", "🔍 'Running average...' → Cumulative sum / count"],
    timeComplexity: "Build: O(n) | Query: O(1)",
    spaceComplexity: "O(n)",
    codeExample: `# Build prefix sum
def build_prefix(nums):
    prefix = [0] * (len(nums) + 1)
    for i in range(len(nums)):
        prefix[i + 1] = prefix[i] + nums[i]
    return prefix

# Range sum query
def range_sum(prefix, left, right):
    return prefix[right + 1] - prefix[left]

# Subarray sum equals K
def subarray_sum_k(nums, k):
    count = 0
    prefix_sum = 0
    seen = {0: 1}
    for num in nums:
        prefix_sum += num
        if prefix_sum - k in seen:
            count += seen[prefix_sum - k]
        seen[prefix_sum] = seen.get(prefix_sum, 0) + 1
    return count`,
    realWorldUse: "Financial running totals, image processing (integral images), database aggregations",
    visualExplanation: "Like a running total on a receipt 🧾 — instead of re-adding items each time, you just look at the subtotal at any point and subtract where you started.",
    translations: {
      tamil: {
        title: "Prefix Sum Pattern",
        whatIsIt:
          "Cumulative sums முன்னதாக கணக்கிட்டு வைத்தால் range sum query O(1) ஆகும். `prefix[i] = sum(0..i)` போல.",
        whyUseIt:
          "O(n) range sum queries-ஐ O(1) ஆக மாற்றும் (O(n) preprocessing பிறகு). Subarray sum problems-க்கு முக்கியம்.",
        whenToUse: ["Range sum queries", "Subarray sum = K", "Count subarrays with sum", "2D region sums"],
        patternDetection: [
          "🔍 'Sum i..j...' → prefix difference",
          "🔍 'Count subarrays sum K...' → prefix + hashmap",
          "🔍 'Equilibrium index...' → prefix both sides",
          "🔍 'Running average...' → cumulative/ count",
        ],
        visualExplanation:
          "Receipt 🧾-ல் running total போல — மீண்டும் மீண்டும் சேர்க்காமல் subtotal-ஐ பார்த்து கழித்தால் போதும்.",
      },
      kannada: {
        title: "Prefix Sum Pattern",
        whatIsIt:
          "Cumulative sums ಮೊದಲು compute ಮಾಡಿದರೆ range sum query O(1). `prefix[i]=sum(0..i)`.",
        whyUseIt:
          "O(n) range sum queries ಅನ್ನು O(1) ಮಾಡುತ್ತದೆ (O(n) preprocessing ನಂತರ). Subarray sum problems ಗೆ ಮುಖ್ಯ.",
        whenToUse: ["Range sum queries", "Subarray sum = K", "Count subarrays", "2D region sums"],
        patternDetection: [
          "🔍 'Sum i..j...' → prefix difference",
          "🔍 'Count subarrays sum K...' → prefix + hashmap",
          "🔍 'Equilibrium index...' → prefix both sides",
          "🔍 'Running average...' → cumulative/count",
        ],
        visualExplanation:
          "Receipt 🧾 ನಲ್ಲಿ running total — ಮತ್ತೆ ಸೇರಿಸದೆ subtotal ನೋಡಿ subtract ಮಾಡಬಹುದು.",
      },
      telugu: {
        title: "Prefix Sum Pattern",
        whatIsIt:
          "Cumulative sums ముందే compute చేస్తే range sum query O(1). `prefix[i]=sum(0..i)`.",
        whyUseIt:
          "O(n) range sum queries ని O(1) చేస్తుంది (O(n) preprocessing తర్వాత). Subarray sum problems కు కీలకం.",
        whenToUse: ["Range sum queries", "Subarray sum = K", "Count subarrays", "2D region sums"],
        patternDetection: [
          "🔍 'Sum i..j...' → prefix difference",
          "🔍 'Count subarrays sum K...' → prefix + hashmap",
          "🔍 'Equilibrium index...' → prefix both sides",
          "🔍 'Running average...' → cumulative/count",
        ],
        visualExplanation:
          "Receipt 🧾 లో running total లా — మళ్లీ మళ్లీ add చేయకుండా subtotal చూసి subtract చేస్తారు.",
      },
      hindi: {
        title: "Prefix Sum Pattern",
        whatIsIt:
          "Cumulative sums पहले compute कर लो तो range sum query O(1) हो जाती है। `prefix[i]=sum(0..i)`।",
        whyUseIt:
          "O(n) range sum queries को O(1) बनाता है (O(n) preprocessing के बाद)। Subarray sum problems के लिए जरूरी।",
        whenToUse: ["Range sum queries", "Subarray sum = K", "Count subarrays", "2D region sums"],
        patternDetection: [
          "🔍 'Sum i..j...' → prefix difference",
          "🔍 'Count subarrays sum K...' → prefix + hashmap",
          "🔍 'Equilibrium index...' → prefix both sides",
          "🔍 'Running average...' → cumulative/count",
        ],
        visualExplanation:
          "Receipt 🧾 के running total जैसा — बार-बार जोड़ने की जगह subtotal देखकर subtract कर लो।",
      },
    },
  },
  // ADVANCED
  {
    id: "recursion-backtracking", title: "Recursion & Backtracking", emoji: "🔄", category: "advanced", difficulty: "Hard",
    whatIsIt: "Recursion is a function calling itself with a smaller problem. Backtracking is recursion + undo — explore a choice, and if it doesn't work, undo and try another.",
    whyUseIt: "Essential for problems with multiple choices at each step: permutations, combinations, puzzles, constraint satisfaction.",
    whenToUse: ["Generate all permutations/combinations", "Solve puzzles (Sudoku, N-Queens)", "Tree/graph traversal (DFS)", "All paths / all solutions problems"],
    patternDetection: ["🔍 'Generate all possible...' → Backtracking", "🔍 'Find all paths...' → DFS with backtracking", "🔍 'Can you partition into...' → Backtracking with pruning", "🔍 'Solve this puzzle...' → Constraint-based backtracking"],
    timeComplexity: "Varies — often O(n!) or O(2^n) for combinatorial",
    spaceComplexity: "O(n) recursion stack depth",
    codeExample: `def subsets(nums):
    result = []
    def backtrack(start, current):
        result.append(current[:])
        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()  # UNDO ← key step!
    backtrack(0, [])
    return result

def solve_n_queens(n):
    solutions = []
    def backtrack(row, cols, diag1, diag2, board):
        if row == n:
            solutions.append(["".join(r) for r in board])
            return
        for col in range(n):
            if col in cols or (row-col) in diag1 or (row+col) in diag2:
                continue
            board[row][col] = 'Q'
            backtrack(row+1, cols|{col}, diag1|{row-col}, diag2|{row+col}, board)
            board[row][col] = '.'
    backtrack(0, set(), set(), set(), [['.']*n for _ in range(n)])
    return solutions`,
    realWorldUse: "AI game solving, compiler parsing, route planning, scheduling algorithms",
    visualExplanation: "Like exploring a maze 🏰 — at each fork, pick a path. If you hit a dead end, backtrack to the last fork and try a different path.",
    translations: {
      tamil: {
        title: "Recursion & Backtracking",
        whatIsIt:
          "Recursion என்பது function தன்னைத் தான் அழைப்பது. Backtracking என்பது recursion + undo — ஒரு தேர்வை முயன்று, வேலை செய்யவில்லை என்றால் திரும்பி வேறு தேர்வு முயலுவது.",
        whyUseIt:
          "Multiple choices உள்ள problems-க்கு அவசியம்: permutations, combinations, puzzles, constraint satisfaction.",
        whenToUse: ["Permutations/combinations generate", "Sudoku/N-Queens போன்ற puzzles", "Tree/graph DFS traversal", "All paths / all solutions"],
        patternDetection: [
          "🔍 'Generate all possible...' → backtracking",
          "🔍 'Find all paths...' → DFS + backtracking",
          "🔍 'Partition...' → backtracking + pruning",
          "🔍 'Solve puzzle...' → constraint backtracking",
        ],
        visualExplanation:
          "Maze 🏰 explore செய்வது போல — fork-ல் ஒரு பாதை தேர்வு; dead end என்றால் கடைசி fork-க்கு திரும்பி வேறு பாதை.",
      },
      kannada: {
        title: "Recursion & Backtracking",
        whatIsIt:
          "Recursion ಎಂದರೆ function ತನ್ನನ್ನೇ ಕರೆಯುವುದು. Backtracking ಎಂದರೆ recursion + undo — ಆಯ್ಕೆ ಮಾಡಿ, ಕೆಲಸ ಆಗದಿದ್ದರೆ undo ಮಾಡಿ ಮತ್ತೊಂದು ಆಯ್ಕೆ.",
        whyUseIt:
          "Multiple choices ಇರುವ problems ಗೆ ಅಗತ್ಯ: permutations, combinations, puzzles, constraints.",
        whenToUse: ["Permutations/combinations", "Sudoku/N-Queens", "Tree/graph DFS", "All paths / all solutions"],
        patternDetection: [
          "🔍 'Generate all possible...' → backtracking",
          "🔍 'Find all paths...' → DFS + backtracking",
          "🔍 'Partition...' → backtracking + pruning",
          "🔍 'Solve puzzle...' → constraint backtracking",
        ],
        visualExplanation:
          "Maze 🏰 ನಲ್ಲಿ ನಡೆಯುವಂತೆ — fork ನಲ್ಲಿ ಒಂದು ದಾರಿ; dead end ಆದರೆ ಹಿಂದಿರುಗಿ ಇನ್ನೊಂದು ದಾರಿ.",
      },
      telugu: {
        title: "Recursion & Backtracking",
        whatIsIt:
          "Recursion అంటే function తనను తానే call చేసుకోవడం. Backtracking అంటే recursion + undo — ఒక choice try చేసి, పని కాకపోతే undo చేసి ఇంకొక choice try చేయడం.",
        whyUseIt:
          "Multiple choices ఉన్న problems కి అవసరం: permutations, combinations, puzzles, constraints.",
        whenToUse: ["Permutations/combinations", "Sudoku/N-Queens", "Tree/graph DFS", "All paths / all solutions"],
        patternDetection: [
          "🔍 'Generate all possible...' → backtracking",
          "🔍 'Find all paths...' → DFS + backtracking",
          "🔍 'Partition...' → backtracking + pruning",
          "🔍 'Solve puzzle...' → constraint backtracking",
        ],
        visualExplanation:
          "Maze 🏰 లో explore చేసేలా — fork వద్ద ఒక దారి; dead end అయితే తిరిగి వచ్చి ఇంకో దారి.",
      },
      hindi: {
        title: "Recursion & Backtracking",
        whatIsIt:
          "Recursion में function खुद को call करता है। Backtracking = recursion + undo — एक choice try करो, नहीं चले तो undo करके दूसरा try करो।",
        whyUseIt:
          "Multiple choices वाले problems के लिए जरूरी: permutations, combinations, puzzles, constraints.",
        whenToUse: ["Permutations/combinations", "Sudoku/N-Queens", "Tree/graph DFS", "All paths / all solutions"],
        patternDetection: [
          "🔍 'Generate all possible...' → backtracking",
          "🔍 'Find all paths...' → DFS + backtracking",
          "🔍 'Partition...' → backtracking + pruning",
          "🔍 'Solve puzzle...' → constraint backtracking",
        ],
        visualExplanation:
          "Maze 🏰 explore करने जैसा — fork पर एक path, dead end हो तो वापस और दूसरा path।",
      },
    },
  },
  {
    id: "dynamic-programming", title: "Dynamic Programming", emoji: "🧮", category: "advanced", difficulty: "Hard",
    whatIsIt: "DP is solving complex problems by breaking them into overlapping subproblems and storing results to avoid recalculating. It's recursion + memoization optimized into iteration.",
    whyUseIt: "Transforms exponential time complexity (O(2^n)) into polynomial (O(n²) or O(n)). The most powerful technique for optimization problems.",
    whenToUse: ["Optimal substructure: solution depends on optimal sub-solutions", "Overlapping subproblems: same subproblems solved repeatedly", "Counting problems: 'how many ways to...'", "Min/max problems: 'minimum cost to...'"],
    patternDetection: ["🔍 'Minimum/maximum cost to...' → DP with state transitions", "🔍 'How many ways to...' → Counting DP", "🔍 'Longest increasing/common...' → Sequence DP", "🔍 'Can you reach/achieve...' → Boolean DP"],
    timeComplexity: "Usually O(n²) or O(n × m) — depends on state space",
    spaceComplexity: "O(n) to O(n × m) — can often optimize to O(n)",
    codeExample: `def fib(n):
    if n <= 1: return n
    dp = [0, 1]
    for i in range(2, n + 1):
        dp.append(dp[-1] + dp[-2])
    return dp[n]

def climb_stairs(n):
    if n <= 2: return n
    prev2, prev1 = 1, 2
    for _ in range(3, n + 1):
        prev2, prev1 = prev1, prev2 + prev1
    return prev1

def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            dp[i][w] = dp[i-1][w]
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w], dp[i-1][w-weights[i-1]] + values[i-1])
    return dp[n][capacity]`,
    realWorldUse: "Route optimization (GPS), resource allocation, text diffing (git), speech recognition",
    visualExplanation: "Like building with LEGO blocks 🧱 — you solve tiny problems first, save the results, then combine them to solve bigger problems. Each block is built exactly once!",
    translations: {
      tamil: {
        title: "Dynamic Programming (DP)",
        whatIsIt:
          "DP என்பது overlapping subproblems-ஆக பிரித்து, results-ஐ சேமித்து மீண்டும் கணக்கிடாமல் தீர்ப்பது. Recursion + memoization-ஐ iteration-ஆக optimize செய்தது.",
        whyUseIt:
          "Exponential (O(2^n)) ஐ polynomial (O(n²)/O(n)) ஆக மாற்ற முடியும். Optimization problems-க்கு சக்திவாய்ந்த technique.",
        whenToUse: ["Optimal substructure", "Overlapping subproblems", "Counting: 'how many ways'", "Min/Max: 'minimum cost'"],
        patternDetection: [
          "🔍 'Minimum/maximum cost...' → DP state transitions",
          "🔍 'How many ways...' → counting DP",
          "🔍 'Longest increasing/common...' → sequence DP",
          "🔍 'Can you reach/achieve...' → boolean DP",
        ],
        visualExplanation:
          "LEGO 🧱 போல — சிறிய blocks முதலில்; முடிவுகளை சேமித்து பெரிய problem-க்கு இணைக்கவும். ஒவ்வொரு block ஒரே முறை கட்டப்படும்.",
      },
      kannada: {
        title: "Dynamic Programming (DP)",
        whatIsIt:
          "DP ಎಂದರೆ overlapping subproblems ಗೆ ವಿಭಜಿಸಿ, results store ಮಾಡಿ ಮರು ಲೆಕ್ಕ ಹಾಕದಂತೆ ಪರಿಹರಿಸುವುದು. Recursion+memo → iteration optimization.",
        whyUseIt:
          "Exponential (O(2^n)) ಅನ್ನು polynomial (O(n²)/O(n)) ಗೆ ಇಳಿಸುತ್ತದೆ. Optimization problems ಗೆ ಶಕ್ತಿಶಾಲಿ.",
        whenToUse: ["Optimal substructure", "Overlapping subproblems", "Counting problems", "Min/Max cost problems"],
        patternDetection: [
          "🔍 'Minimum/maximum cost...' → DP transitions",
          "🔍 'How many ways...' → counting DP",
          "🔍 'Longest increasing/common...' → sequence DP",
          "🔍 'Can you reach/achieve...' → boolean DP",
        ],
        visualExplanation:
          "LEGO 🧱 — ಸಣ್ಣ blocks ಮೊದಲು, results ಉಳಿಸಿ, ದೊಡ್ಡ problem ಗೆ ಸೇರಿಸಿ. ಪ್ರತಿ block ಒಂದೇ ಬಾರಿ.",
      },
      telugu: {
        title: "Dynamic Programming (DP)",
        whatIsIt:
          "DP అంటే overlapping subproblems గా విడదీసి, results నిల్వ చేసి మళ్లీ లెక్కించకుండా solve చేయడం. Recursion+memo ని iteration గా optimize చేయడం.",
        whyUseIt:
          "Exponential (O(2^n)) ని polynomial (O(n²)/O(n)) కి మార్చగలదు. Optimization problems కి powerful.",
        whenToUse: ["Optimal substructure", "Overlapping subproblems", "Counting problems", "Min/Max cost problems"],
        patternDetection: [
          "🔍 'Minimum/maximum cost...' → DP transitions",
          "🔍 'How many ways...' → counting DP",
          "🔍 'Longest increasing/common...' → sequence DP",
          "🔍 'Can you reach/achieve...' → boolean DP",
        ],
        visualExplanation:
          "LEGO 🧱 లా — చిన్న problems ముందుగా, results save చేసి పెద్ద problem కి కలపండి. ప్రతి block ఒక్కసారి.",
      },
      hindi: {
        title: "Dynamic Programming (DP)",
        whatIsIt:
          "DP में problem को overlapping subproblems में तोड़कर results store करते हैं ताकि बार-बार calculate न करना पड़े। Recursion+memo को iteration में optimize किया जाता है।",
        whyUseIt:
          "Exponential (O(2^n)) को polynomial (O(n²)/O(n)) बना देता है। Optimization problems के लिए बहुत powerful।",
        whenToUse: ["Optimal substructure", "Overlapping subproblems", "Counting problems", "Min/Max cost problems"],
        patternDetection: [
          "🔍 'Minimum/maximum cost...' → DP transitions",
          "🔍 'How many ways...' → counting DP",
          "🔍 'Longest increasing/common...' → sequence DP",
          "🔍 'Can you reach/achieve...' → boolean DP",
        ],
        visualExplanation:
          "LEGO 🧱 जैसा — पहले छोटे blocks, results save करो, फिर बड़े problem में जोड़ो। हर block सिर्फ एक बार बनता है।",
      },
    },
  },
  {
    id: "trees-graphs", title: "Trees & Graphs", emoji: "🌳", category: "advanced", difficulty: "Hard",
    whatIsIt: "Trees are hierarchical structures with a root and children (no cycles). Graphs are networks of nodes connected by edges (can have cycles).",
    whyUseIt: "Model real-world relationships: file systems (tree), social networks (graph), road maps (graph), HTML DOM (tree).",
    whenToUse: ["Hierarchical data: file systems, org charts", "Network problems: shortest path, connectivity", "Search and traversal: BFS, DFS", "Decision trees, parsing expressions"],
    patternDetection: ["🔍 'Shortest path in unweighted...' → BFS", "🔍 'Explore all paths...' → DFS", "🔍 'Level-order traversal...' → BFS with queue", "🔍 'Lowest common ancestor...' → DFS on tree"],
    timeComplexity: "BFS/DFS: O(V + E) | V = vertices, E = edges",
    spaceComplexity: "O(V) for visited set + queue/stack",
    codeExample: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def bfs(root):
    if not root: return []
    result, queue = [], deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result

def shortest_path(graph, start, end):
    queue = deque([(start, [start])])
    visited = {start}
    while queue:
        node, path = queue.popleft()
        if node == end: return path
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))`,
    realWorldUse: "Google Maps (shortest path), social media (friend suggestions), file systems, AI decision trees",
    visualExplanation: "A tree 🌳 is like a family tree — one ancestor at top, branching down. A graph 🕸️ is like a social network — everyone can connect to anyone.",
    translations: {
      tamil: {
        title: "Trees & Graphs",
        whatIsIt:
          "Tree என்பது hierarchy structure (root + children, cycles இல்லை). Graph என்பது nodes + edges network (cycles இருக்கலாம்).",
        whyUseIt:
          "Real-world relationships model செய்ய: file system (tree), social network (graph), road map (graph), DOM (tree).",
        whenToUse: ["Hierarchy data", "Shortest path/connectivity", "BFS/DFS traversal", "Decision trees/parsing"],
        patternDetection: [
          "🔍 'Shortest path unweighted...' → BFS",
          "🔍 'Explore all paths...' → DFS",
          "🔍 'Level-order...' → BFS queue",
          "🔍 'LCA...' → DFS on tree",
        ],
        visualExplanation:
          "Tree 🌳 குடும்ப மரம் போல; Graph 🕸️ சமூக வலை போல — யார் வேண்டுமானாலும் connect ஆகலாம்.",
      },
      kannada: {
        title: "Trees & Graphs",
        whatIsIt:
          "Tree hierarchy structure (root + children, cycles ಇಲ್ಲ). Graph nodes+edges network (cycles ಇರಬಹುದು).",
        whyUseIt:
          "Real-world relationships model: file system (tree), social network (graph), road map (graph), DOM (tree).",
        whenToUse: ["Hierarchy data", "Shortest path/connectivity", "BFS/DFS traversal", "Decision trees/parsing"],
        patternDetection: [
          "🔍 'Shortest path unweighted...' → BFS",
          "🔍 'Explore all paths...' → DFS",
          "🔍 'Level-order...' → BFS queue",
          "🔍 'LCA...' → DFS on tree",
        ],
        visualExplanation:
          "Tree 🌳 ಕುಟುಂಬ ಮರದಂತೆ; Graph 🕸️ ಸಾಮಾಜಿಕ ಜಾಲದಂತೆ — ಎಲ್ಲರೂ ಎಲ್ಲರಿಗೂ connect ಆಗಬಹುದು.",
      },
      telugu: {
        title: "Trees & Graphs",
        whatIsIt:
          "Tree అనేది hierarchy structure (root + children, cycles లేవు). Graph అనేది nodes+edges network (cycles ఉండొచ్చు).",
        whyUseIt:
          "Real-world relationships model: file system (tree), social network (graph), road map (graph), DOM (tree).",
        whenToUse: ["Hierarchy data", "Shortest path/connectivity", "BFS/DFS traversal", "Decision trees/parsing"],
        patternDetection: [
          "🔍 'Shortest path unweighted...' → BFS",
          "🔍 'Explore all paths...' → DFS",
          "🔍 'Level-order...' → BFS queue",
          "🔍 'LCA...' → DFS on tree",
        ],
        visualExplanation:
          "Tree 🌳 కుటుంబ వృక్షం లా; Graph 🕸️ social network లా — ఎవరైనా ఎవరితోనైనా connect కావచ్చు.",
      },
      hindi: {
        title: "Trees & Graphs",
        whatIsIt:
          "Tree hierarchy structure है (root + children, cycles नहीं)। Graph nodes+edges का network है (cycles हो सकते हैं)।",
        whyUseIt:
          "Real-world relationships model करने के लिए: file system (tree), social network (graph), road map (graph), DOM (tree).",
        whenToUse: ["Hierarchy data", "Shortest path/connectivity", "BFS/DFS traversal", "Decision trees/parsing"],
        patternDetection: [
          "🔍 'Shortest path unweighted...' → BFS",
          "🔍 'Explore all paths...' → DFS",
          "🔍 'Level-order...' → BFS queue",
          "🔍 'LCA...' → DFS on tree",
        ],
        visualExplanation:
          "Tree 🌳 family tree जैसा; Graph 🕸️ social network जैसा — कोई भी किसी से connect हो सकता है।",
      },
    },
  },
  {
    id: "trie", title: "Trie (Prefix Tree)", emoji: "🌲", category: "advanced", difficulty: "Medium",
    whatIsIt: "A specialized tree used to store strings. Each node represents a single character.",
    whyUseIt: "Extremely fast O(L) time for prefix searches and autocomplete, where L is the length of the word.",
    whenToUse: ["Autocomplete systems", "Spell checkers", "Word search games", "IP routing"],
    patternDetection: ["🔍 'Find all words starting with...' → Trie", "🔍 'Maximum XOR of two numbers...' → Bitwise Trie", "🔍 'Word search board...' → Trie + DFS"],
    timeComplexity: "Insert/Search: O(L) where L is word length",
    spaceComplexity: "O(N * M) where N is number of words, M is max length",
    codeExample: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_word = True

    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_word`,
    realWorldUse: "Search engine autocomplete, router IP prefix matching, spell checkers, phone book contacts",
    visualExplanation: "Imagine a filing cabinet sorted by the first letter, then folders by the second letter, then files by the third. You only open what exactly matches your prefix!",
    translations: {
      tamil: {
        title: "Trie (Prefix Tree)",
        whatIsIt: "Strings சேமிக்க சிறப்பு tree. ஒவ்வொரு node ஒரு character-ஐ குறிக்கும்.",
        whyUseIt: "Prefix search/autocomplete O(L) — word length L. மிகவும் வேகம்.",
        whenToUse: ["Autocomplete", "Spell check", "Word search games", "IP routing"],
        patternDetection: [
          "🔍 'Words starting with prefix...' → Trie",
          "🔍 'Maximum XOR...' → bitwise Trie",
          "🔍 'Word search board...' → Trie + DFS",
        ],
        visualExplanation:
          "Filing cabinet போல — முதல் எழுத்து, இரண்டாம் எழுத்து... என அடுக்கி வைத்தால் prefix match ஆனவற்றை மட்டும் திறப்போம்.",
      },
      kannada: {
        title: "Trie (Prefix Tree)",
        whatIsIt: "Strings store ಮಾಡಲು ವಿಶೇಷ tree. ಪ್ರತಿ node ಒಂದು character.",
        whyUseIt: "Prefix search/autocomplete O(L) (L = word length). ಬಹಳ ವೇಗ.",
        whenToUse: ["Autocomplete", "Spell check", "Word search games", "IP routing"],
        patternDetection: [
          "🔍 'Words starting with prefix...' → Trie",
          "🔍 'Maximum XOR...' → bitwise Trie",
          "🔍 'Word search board...' → Trie + DFS",
        ],
        visualExplanation:
          "Filing cabinet — ಮೊದಲ ಅಕ್ಷರ, ನಂತರ ಎರಡನೇ... prefix match ಆದ್ದನ್ನು ಮಾತ್ರ ತೆಗೆಯಿರಿ.",
      },
      telugu: {
        title: "Trie (Prefix Tree)",
        whatIsIt: "Strings నిల్వ చేయడానికి ప్రత్యేక tree. ప్రతి node ఒక character ని represent చేస్తుంది.",
        whyUseIt: "Prefix search/autocomplete O(L) (L = word length). చాలా ఫాస్ట్.",
        whenToUse: ["Autocomplete", "Spell check", "Word search games", "IP routing"],
        patternDetection: [
          "🔍 'Words starting with prefix...' → Trie",
          "🔍 'Maximum XOR...' → bitwise Trie",
          "🔍 'Word search board...' → Trie + DFS",
        ],
        visualExplanation:
          "Filing cabinet లా — మొదటి letter, తర్వాత రెండో... prefix match అయ్యేవి మాత్రమే ఓపెన్ చేయండి.",
      },
      hindi: {
        title: "Trie (Prefix Tree)",
        whatIsIt: "Strings store करने के लिए special tree। हर node एक character represent करता है।",
        whyUseIt: "Prefix search/autocomplete O(L) (L = word length) — बहुत तेज़।",
        whenToUse: ["Autocomplete", "Spell check", "Word search games", "IP routing"],
        patternDetection: [
          "🔍 'Words starting with prefix...' → Trie",
          "🔍 'Maximum XOR...' → bitwise Trie",
          "🔍 'Word search board...' → Trie + DFS",
        ],
        visualExplanation:
          "Filing cabinet जैसा — first letter, फिर second... आप सिर्फ वही खोलते हैं जो आपके prefix से match करता है।",
      },
    },
  },
  {
    id: "union-find", title: "Union Find (Disjoint Set)", emoji: "🖇️", category: "advanced", difficulty: "Hard",
    whatIsIt: "A data structure that keeps track of elements partitioned into disjoint (non-overlapping) sets. It supports two operations: Find and Union.",
    whyUseIt: "Near O(1) time complexity for finding if two elements are connected, or connecting two elements. Essential for finding connected components.",
    whenToUse: ["Kruskal's Minimum Spanning Tree", "Finding connected components in a graph", "Detecting cycles in an undirected graph", "Dynamic connectivity queries"],
    patternDetection: ["🔍 'Are these two nodes connected?' → Union Find", "🔍 'Number of isolated islands...' → Union Find or DFS", "🔍 'Redundant connection...' → Union Find to detect cycle"],
    timeComplexity: "Union/Find: Amortized O(α(N)) ≈ O(1)",
    spaceComplexity: "O(N) for parent and rank arrays",
    codeExample: `class UnionFind:
    def __init__(self, size):
        self.parent = list(range(size))
        self.rank = [1] * size

    def find(self, p):
        if self.parent[p] != p:
            self.parent[p] = self.find(self.parent[p])  # Path compression
        return self.parent[p]

    def union(self, p, q):
        rootP = self.find(p)
        rootQ = self.find(q)
        if rootP != rootQ:
            # Union by rank
            if self.rank[rootP] > self.rank[rootQ]:
                self.parent[rootQ] = rootP
            elif self.rank[rootP] < self.rank[rootQ]:
                self.parent[rootP] = rootQ
            else:
                self.parent[rootQ] = rootP
                self.rank[rootP] += 1
            return True
        return False`,
    realWorldUse: "Network connectivity in social platforms, image segmentation, clustering algorithms",
    visualExplanation: "Think of merging companies. Finding the parent company (Find) takes you to the ultimate CEO. Merging two companies (Union) means making one CEO report to the other.",
    translations: {
      tamil: {
        title: "Union Find (Disjoint Set)",
        whatIsIt:
          "Disjoint sets-ஆக பிரிக்கப்பட்ட elements-ஐ track செய்யும் structure. இரண்டு operations: Find மற்றும் Union.",
        whyUseIt:
          "இரண்டு elements connected-ஆ என்பதை near O(1) (amortized) நேரத்தில் check/connect செய்ய முடியும். Components கண்டறிய பயன்படும்.",
        whenToUse: ["Kruskal MST", "Connected components", "Undirected cycle detect", "Dynamic connectivity"],
        patternDetection: [
          "🔍 'Connected?' → Union Find",
          "🔍 'Number of islands/components...' → Union Find / DFS",
          "🔍 'Redundant edge...' → Union Find cycle detect",
        ],
        visualExplanation:
          "Companies merge போல. Find = ultimate CEO-வை கண்டுபிடி. Union = ஒரு CEO மற்றொன்றிற்கு report ஆக இணை.",
      },
      kannada: {
        title: "Union Find (Disjoint Set)",
        whatIsIt: "Disjoint sets ಆಗಿ ವಿಭಜಿಸಲಾದ elements track ಮಾಡುವ structure. Find ಮತ್ತು Union operations.",
        whyUseIt: "Connected? check/connect near O(1) amortized. Components ಕಂಡುಹಿಡಿಯಲು ಉಪಯುಕ್ತ.",
        whenToUse: ["Kruskal MST", "Connected components", "Undirected cycle detect", "Dynamic connectivity"],
        patternDetection: [
          "🔍 'Connected?' → Union Find",
          "🔍 'Islands/components count...' → Union Find / DFS",
          "🔍 'Redundant edge...' → Union Find cycle detect",
        ],
        visualExplanation:
          "Companies merge — Find = ultimate CEO. Union = ಒಬ್ಬ CEO ಇನ್ನೊಬ್ಬರಿಗೆ report ಆಗುವಂತೆ ಸೇರಿಸಿ.",
      },
      telugu: {
        title: "Union Find (Disjoint Set)",
        whatIsIt: "Disjoint sets గా partition అయిన elements ని track చేసే structure. Find, Union operations.",
        whyUseIt: "Connected? check/connect near O(1) amortized. Components కోసం essential.",
        whenToUse: ["Kruskal MST", "Connected components", "Undirected cycle detect", "Dynamic connectivity"],
        patternDetection: [
          "🔍 'Connected?' → Union Find",
          "🔍 'Islands/components count...' → Union Find / DFS",
          "🔍 'Redundant edge...' → Union Find cycle detect",
        ],
        visualExplanation:
          "Companies merge లా. Find = ultimate CEO. Union = ఒక CEO మరో CEO కి report అయ్యేలా కలపడం.",
      },
      hindi: {
        title: "Union Find (Disjoint Set)",
        whatIsIt: "Elements को disjoint sets में track करने वाला structure। दो operations: Find और Union।",
        whyUseIt: "दो elements connected हैं या नहीं near O(1) amortized में check/connect। Components के लिए essential।",
        whenToUse: ["Kruskal MST", "Connected components", "Undirected cycle detect", "Dynamic connectivity"],
        patternDetection: [
          "🔍 'Connected?' → Union Find",
          "🔍 'Islands/components count...' → Union Find / DFS",
          "🔍 'Redundant edge...' → Union Find cycle detect",
        ],
        visualExplanation:
          "Companies merge जैसा। Find = ultimate CEO। Union = एक CEO को दूसरे को report कराने जैसा जोड़ना।",
      },
    },
  },
  {
    id: "bit-manipulation", title: "Bit Manipulation", emoji: "🔢", category: "advanced", difficulty: "Hard",
    whatIsIt: "Operating directly on binary representations of numbers using AND, OR, XOR, NOT, and shift operators. The fastest operations a CPU can perform.",
    whyUseIt: "O(1) space for certain set operations, extremely fast. Essential for optimization, cryptography, and low-level programming.",
    whenToUse: ["Check if number is power of 2", "Count set bits", "Find single number in array of pairs", "Subset generation"],
    patternDetection: ["🔍 'Single number among duplicates...' → XOR all elements", "🔍 'Power of 2...' → n & (n-1) == 0", "🔍 'All subsets...' → Bitmask 0 to 2^n", "🔍 'Toggle/flip bits...' → XOR with mask"],
    timeComplexity: "O(1) per operation | O(n) for array scan",
    spaceComplexity: "O(1)",
    codeExample: `# Single number (all others appear twice)
def single_number(nums):
    result = 0
    for num in nums:
        result ^= num  # XOR cancels pairs
    return result

# Check power of 2
def is_power_of_two(n):
    return n > 0 and (n & (n - 1)) == 0

# Count set bits
def count_bits(n):
    count = 0
    while n:
        count += n & 1
        n >>= 1
    return count

# Generate all subsets using bitmask
def subsets_bitmask(nums):
    n = len(nums)
    result = []
    for mask in range(1 << n):
        subset = [nums[i] for i in range(n) if mask & (1 << i)]
        result.append(subset)
    return result`,
    realWorldUse: "Cryptography, compression algorithms, network subnet masks, game state encoding, hardware drivers",
    visualExplanation: "Think of bits as light switches 💡 — each switch is ON (1) or OFF (0). Bit operations flip, check, or combine these switches at lightning speed.",
    translations: {
      tamil: {
        title: "Bit Manipulation",
        whatIsIt:
          "எண்களின் binary representation-ல் AND/OR/XOR/NOT மற்றும் shifts மூலம் நேரடியாக வேலை செய்வது.",
        whyUseIt:
          "மிக வேகமான CPU operations. சில set/subset operations-க்கு O(1) extra space. Optimization/crypto/low-level coding-ல் முக்கியம்.",
        whenToUse: ["Power of 2 check", "Set bits count", "Single number via XOR", "Subset generation (bitmask)"],
        patternDetection: [
          "🔍 'Single number...' → XOR all",
          "🔍 'Power of 2...' → n & (n-1) == 0",
          "🔍 'All subsets...' → bitmask 0..2^n",
          "🔍 'Toggle bits...' → XOR with mask",
        ],
        visualExplanation:
          "Bits-ஐ switches 💡 போல — ON(1)/OFF(0). Bit ops lightning speed-ல் flip/check/combine செய்கின்றன.",
      },
      kannada: {
        title: "Bit Manipulation",
        whatIsIt: "ಸಂಖ್ಯೆಗಳ binary representation ಮೇಲೆ AND/OR/XOR/NOT ಮತ್ತು shifts ಮೂಲಕ ನೇರವಾಗಿ ಕೆಲಸ ಮಾಡುವುದು.",
        whyUseIt: "CPU ಯ ಅತ್ಯಂತ ವೇಗದ operations. ಕೆಲವು operations ಗೆ O(1) extra space. Optimization/crypto/low-level ನಲ್ಲಿ ಮುಖ್ಯ.",
        whenToUse: ["Power of 2 check", "Set bits count", "Single number XOR", "Subset generation bitmask"],
        patternDetection: [
          "🔍 'Single number...' → XOR all",
          "🔍 'Power of 2...' → n & (n-1) == 0",
          "🔍 'All subsets...' → bitmask 0..2^n",
          "🔍 'Toggle bits...' → XOR with mask",
        ],
        visualExplanation:
          "Bits ಅನ್ನು switches 💡 ಎಂದು ಕಲ್ಪಿಸಿ — ON(1)/OFF(0). Bit ops lightning speed ನಲ್ಲಿ flip/check/combine.",
      },
      telugu: {
        title: "Bit Manipulation",
        whatIsIt: "నంబర్ల binary representation పై AND/OR/XOR/NOT మరియు shifts తో నేరుగా పని చేయడం.",
        whyUseIt: "CPU లో అత్యంత వేగమైన operations. కొన్ని operations కి O(1) extra space. Optimization/crypto/low-level లో కీలకం.",
        whenToUse: ["Power of 2 check", "Set bits count", "Single number XOR", "Subset generation bitmask"],
        patternDetection: [
          "🔍 'Single number...' → XOR all",
          "🔍 'Power of 2...' → n & (n-1) == 0",
          "🔍 'All subsets...' → bitmask 0..2^n",
          "🔍 'Toggle bits...' → XOR with mask",
        ],
        visualExplanation:
          "Bits ని switches 💡 లా ఊహించండి — ON(1)/OFF(0). Bit ops lightning speed లో flip/check/combine చేస్తాయి.",
      },
      hindi: {
        title: "Bit Manipulation",
        whatIsIt: "Numbers के binary representation पर AND/OR/XOR/NOT और shifts से directly काम करना।",
        whyUseIt: "CPU की सबसे fast operations। कुछ operations में O(1) extra space। Optimization/crypto/low-level programming में जरूरी।",
        whenToUse: ["Power of 2 check", "Set bits count", "Single number XOR", "Subset generation bitmask"],
        patternDetection: [
          "🔍 'Single number...' → XOR all",
          "🔍 'Power of 2...' → n & (n-1) == 0",
          "🔍 'All subsets...' → bitmask 0..2^n",
          "🔍 'Toggle bits...' → XOR with mask",
        ],
        visualExplanation:
          "Bits को switches 💡 समझो — ON(1)/OFF(0)। Bit ops lightning speed पर flip/check/combine करते हैं।",
      },
    },
  },
  {
    id: "range-queries", title: "Segment & Fenwick Trees", emoji: "🌲📈", category: "advanced", difficulty: "Hard",
    whatIsIt: "Advanced structures for efficient range queries (sum, min, max) and updates. Segment Trees are versatile, while Fenwick Trees (BIT) are more space-efficient for sum queries.",
    whyUseIt: "When you have frequent updates and range queries. Both operations take O(log n), compared to O(n) for naive updates/queries.",
    whenToUse: ["Range sum/min/max queries with updates", "Counting inversions in an array", "Dynamic frequency tables"],
    patternDetection: ["🔍 'Range sum with point updates...' → Fenwick Tree", "🔍 'Range min/max with range updates...' → Segment Tree with Lazy Propagation"],
    timeComplexity: "Query: O(log n) | Update: O(log n)",
    spaceComplexity: "Segment Tree: O(4n) | Fenwick Tree: O(n)",
    codeExample: `# Fenwick Tree (BIT) for Range Sum
class FenwickTree:
    def __init__(self, n):
        self.tree = [0] * (n + 1)
    def update(self, i, delta):
        i += 1
        while i < len(self.tree):
            self.tree[i] += delta
            i += i & (-i)
    def query(self, i):
        i += 1
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & (-i)
        return s`,
    realWorldUse: "Database query optimization, computational geometry, competitive programming",
    visualExplanation: "Segment Tree 🧱: A tree where each node stores the result for a specific range. BIT 📉: A compact representation using bit manipulation to jump over ranges efficiently.",
    translations: {
      tamil: { title: "Segment & Fenwick Trees", whatIsIt: "Range queries (sum, min, max) மற்றும் updates-ஐ திறமையாக செய்ய உதவும் மேம்பட்ட அமைப்புகள்." },
      kannada: { title: "Segment & Fenwick Trees", whatIsIt: "Range queries ಮತ್ತು updates ಅನ್ನು ಪರಿಣಾಮಕಾರಿಯಾಗಿ ಮಾಡಲು ಸುಧಾರಿತ ರಚನೆಗಳು." },
      telugu: { title: "Segment & Fenwick Trees", whatIsIt: "Range queries మరియు updates ని సమర్ధవంతంగా చేయడానికి అడ్వాన్స్‌డ్ స్ట్రక్చర్లు." },
      hindi: { title: "Segment & Fenwick Trees", whatIsIt: "Range queries और updates को कुशलतापूर्वक करने के लिए संरचनाएं।" },
    }
  },
  {
    id: "adv-graphs", title: "Advanced Graph Algos", emoji: "🕸️⚡", category: "advanced", difficulty: "Hard",
    whatIsIt: "Algorithms for complex graph properties: Topological Sort for dependencies, and Kosaraju/Tarjan for finding Strongly Connected Components (SCC).",
    whyUseIt: "When you need to order tasks with dependencies or identify groups of nodes where everyone can reach everyone else.",
    whenToUse: ["Task scheduling (Topological Sort)", "Detecting cycles in directed graphs", "Identifying clusters (SCC)"],
    patternDetection: ["🔍 'Order tasks by dependencies...' → Topological Sort (Kahn's or DFS)", "🔍 'Find groups that can all reach each other...' → SCC (Kosaraju/Tarjan)"],
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    codeExample: `# Topological Sort (Kahn's Algorithm)
from collections import deque
def topo_sort(v, adj):
    indegree = [0] * v
    for i in range(v):
        for neighbor in adj[i]:
            indegree[neighbor] += 1
    queue = deque([i for i in range(v) if indegree[i] == 0])
    topo = []
    while queue:
        u = queue.popleft()
        topo.append(u)
        for neighbor in adj[u]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)
    return topo if len(topo) == v else []`,
    realWorldUse: "Build systems (Makefile), package managers (pip/npm), circuit analysis, web crawlers",
    visualExplanation: "Topological Sort 🏗️: Arranging nodes in a line so all arrows point forward. SCC 🌀: Finding 'islands' in a directed graph where you can travel between any two points.",
    translations: {
      tamil: { title: "மேம்பட்ட வரைபடங்கள்", whatIsIt: "Topological Sort மற்றும் SCC (Kosaraju, Tarjan) போன்ற சிக்கலான வரைபட பண்புகளுக்கான அல்காரிதம்கள்." },
      kannada: { title: "ಸುಧಾರಿತ ಗ್ರಾಫ್‌ಗಳು", whatIsIt: "Topological Sort ಮತ್ತು SCC (Kosaraju, Tarjan) ನಂತಹ ಸಂಕೀರ್ಣ ಗ್ರಾಫ್ அல்காரிதಮ்கள்." },
      telugu: { title: "అడ్వాన్స్‌డ్ గ్రాఫ్స్", whatIsIt: "Topological Sort మరియు SCC (Kosaraju, Tarjan) వంటి సంక్లిష్ట గ్రాఫ్ అల్గారిథమ్స్." },
      hindi: { title: "उन्नत ग्राफ", whatIsIt: "Topological Sort और SCC (Kosaraju, Tarjan) जैसे जटिल ग्राफ एल्गोरिदम।" },
    }
  },
];

export const topicKeywords: Record<string, string[]> = {
  arrays: ["array", "list", "subarray", "prefix", "kadane"],
  "hash-maps": ["hash", "dictionary", "frequency", "anagram", "two sum"],
  "stacks-queues": ["stack", "queue", "parentheses", "deque", "monotonic"],
  "linked-lists": ["linked list", "listnode", "cycle", "remove nth", "reverse list", "random pointer"],
  strings: ["string", "palindrome", "substring", "anagram", "word"],
  heaps: ["heap", "priority queue", "kth", "top k", "merge k"],
  "two-pointers": ["two pointer", "sorted", "pair", "sum", "palindrome"],
  "sliding-window": ["window", "substring", "consecutive", "anagram"],
  "binary-search-pattern": ["binary search", "sorted", "peak", "boundary"],
  greedy: ["greedy", "interval", "jump", "minimum", "maximum"],
  "dynamic-programming": ["dp", "dynamic programming", "memo", "knapsack", "subsequence"],
  backtracking: ["backtracking", "permutation", "combination", "n-queens", "word search"],
  trees: ["tree", "binary tree", "bst", "traversal", "serialize"],
  graphs: ["graph", "bfs", "dfs", "shortest path", "topological"],
  trie: ["trie", "prefix", "word dictionary", "autocomplete"],
  "union-find": ["union find", "disjoint", "connected", "redundant", "islands"],
  "bit-manipulation": ["bit", "xor", "mask", "power of two"],
};

export const masteredTopicsStorageKey = "pymaster_dsa_mastered";

export const topicPlaybook: Record<string, {
  complexityNotes: string[];
  pitfalls: string[];
  edgeCases: string[];
  dryRunSteps: string[];
  interviewVariants: string[];
  practicePath: string[];
}> = {
  arrays: {
    complexityNotes: ["If input is unsorted but pattern needs order, sort once and accept O(n log n).", "Favor in-place updates for O(1) extra memory when mutation is allowed."],
    pitfalls: ["Forgetting off-by-one bounds in loops and slices.", "Using nested loops before checking if two-pointers can reduce complexity."],
    edgeCases: ["Empty list", "Single element", "All equal values", "Negative values mixed with positive values"],
    dryRunSteps: ["Write indexes under each element.", "Track left/right or read/write pointer movement.", "Verify final index/length returned matches expected output."],
    interviewVariants: ["Rotate array in-place", "Product of array except self", "Best time to buy/sell stock", "Maximum subarray"],
    practicePath: ["Solve one easy array traversal problem.", "Solve one two-pointer array problem.", "Solve one optimization (Kadane/prefix) problem."],
  },
  "hash-maps": {
    complexityNotes: ["Lookup is O(1) average, but can degrade if hash collisions are high.", "Space is O(n) to store keys and values."],
    pitfalls: ["Modifying a dictionary while iterating over it.", "Assuming insertion order is maintained in all Python versions (it is since 3.7+)."],
    edgeCases: ["Key not found (use .get() or defaultdict)", "Empty dictionary", "Using mutable objects like lists as keys (not allowed)"],
    dryRunSteps: ["Track (key, value) pairs as you iterate.", "Update counts or indices in the map.", "Check if complement/required key exists before processing."],
    interviewVariants: ["Two sum (unsorted)", "Group anagrams", "Subarray sum equals K", "LRU Cache"],
    practicePath: ["Solve frequency counting problems.", "Use map to store 'seen' values for O(1) lookup.", "Move to complex mapping problems like LRU Cache."],
  },
  "stacks-queues": {
    complexityNotes: ["All operations (push/pop/enqueue/dequeue) are O(1).", "Space is O(n) to store elements."],
    pitfalls: ["Popping from an empty stack/queue without checking.", "Using a list as a queue (O(n) pop(0)) instead of collections.deque (O(1) popleft())."],
    edgeCases: ["Empty stack/queue", "Single element", "Very long sequences causing stack overflow in recursion"],
    dryRunSteps: ["Visualize the stack/queue on paper.", "Trace each push/pop operation.", "Verify final state or returned value."],
    interviewVariants: ["Valid Parentheses", "Min Stack", "Evaluate Reverse Polish Notation", "Number of Islands (BFS)"],
    practicePath: ["Solve bracket matching problems.", "Implement BFS for level-order traversal.", "Try monotonic stack problems for 'Next Greater Element'."],
  },
  "linked-lists": {
    complexityNotes: ["No random access (O(n)).", "Insertion/Deletion is O(1) if you have the pointer to the node."],
    pitfalls: ["Losing the head reference after reversing or modifying.", "AttributeError: 'NoneType' object has no attribute 'next'."],
    edgeCases: ["Empty list (head is None)", "Single node list", "List with cycle", "Even vs Odd number of nodes"],
    dryRunSteps: ["Draw the nodes and pointers.", "Track prev, curr, and next pointers step-by-step.", "Update head if necessary."],
    interviewVariants: ["Reverse Linked List", "Linked List Cycle", "Merge Two Sorted Lists", "Remove Nth Node From End"],
    practicePath: ["Start with basic traversal and search.", "Move to reversing and re-linking nodes.", "End with fast/slow pointer techniques for cycle/middle detection."],
  },
  "sliding-window": {
    complexityNotes: ["Dynamic windows are O(n) because each index enters/exits at most once.", "Prefer hash map counts over repeated substring scans."],
    pitfalls: ["Shrinking window too late and violating constraints.", "Not updating best answer after each valid window expansion."],
    edgeCases: ["k larger than input length", "Repeated identical characters", "No valid window exists", "Unicode or mixed-case text"],
    dryRunSteps: ["Mark left and right pointers.", "Update frequency map as right expands.", "Shrink while invalid, then record candidate answer."],
    interviewVariants: ["Minimum window substring", "Longest repeating replacement", "Permutation in string", "Maximum sum subarray of size k"],
    practicePath: ["Start with fixed-size window.", "Move to longest/shortest dynamic window.", "End with min-window hard variant."],
  },
  "binary-search-pattern": {
    complexityNotes: ["Always O(log n) time.", "Space is O(1) for iterative, O(log n) for recursive."],
    pitfalls: ["Infinite loop if left/right are not updated correctly (e.g., mid instead of mid+1).", "Integer overflow (l+r)//2 in other languages (not an issue in Python)."],
    edgeCases: ["Target not in list", "List with one element", "List with all same elements", "Target is first/last element"],
    dryRunSteps: ["Write down left, right, and mid for each iteration.", "Check if target is found or which half is eliminated.", "Verify termination condition (left > right)."],
    interviewVariants: ["Search in Rotated Sorted Array", "Find First and Last Position", "Search a 2D Matrix", "Peak Index in a Mountain Array"],
    practicePath: ["Master the basic binary search template.", "Learn to handle duplicates and boundaries.", "Apply binary search on answer ranges (advanced)."],
  },
  "dynamic-programming": {
    complexityNotes: ["Define state clearly first: dp[i] or dp[i][j].", "Space optimize only after transitions are correct."],
    pitfalls: ["Wrong base cases cause all downstream states to fail.", "Mixing index meaning (0-based vs 1-based) in recurrence."],
    edgeCases: ["n = 0 or empty string", "Unreachable states", "Large constraints requiring modulo arithmetic", "Duplicate values affecting transitions"],
    dryRunSteps: ["Write the smallest subproblem answer manually.", "Build next 2-3 states using transition formula.", "Confirm table fill order respects dependencies."],
    interviewVariants: ["House robber with circular street", "Longest increasing subsequence", "Coin change (min coins / count ways)", "0/1 knapsack"],
    practicePath: ["Recursion + memo first.", "Convert to bottom-up table.", "Optimize memory and explain tradeoff."],
  },
  trees: {
    complexityNotes: ["DFS/BFS take O(n) time.", "Space is O(h) for recursion stack, where h is height."],
    pitfalls: ["Forgetting to check if a node is None before accessing .left or .right.", "Mixing up pre-order, in-order, and post-order traversal logic."],
    edgeCases: ["Empty tree (root is None)", "Skewed tree (acts like a linked list)", "Tree with only one node", "Perfectly balanced tree"],
    dryRunSteps: ["Draw the tree and trace the traversal order.", "Track the recursive calls or queue state.", "Verify base cases and return values."],
    interviewVariants: ["Maximum Depth of Binary Tree", "Validate Binary Search Tree", "Lowest Common Ancestor", "Binary Tree Level Order Traversal"],
    practicePath: ["Master recursive traversals first.", "Learn iterative traversals using stacks.", "Move to complex problems like tree construction and path finding."],
  },
  graphs: {
    complexityNotes: ["BFS/DFS take O(V+E) time.", "Space is O(V) to store visited nodes and recursion stack/queue."],
    pitfalls: ["Infinite loop if cycles are present and 'visited' set is missing.", "Confusing adjacency list vs adjacency matrix representations."],
    edgeCases: ["Disconnected graph", "Graph with self-loops", "Graph with no edges", "Empty graph"],
    dryRunSteps: ["List all nodes and their neighbors.", "Trace the BFS queue or DFS recursion stack.", "Mark nodes as visited to avoid cycles."],
    interviewVariants: ["Number of Islands", "Clone Graph", "Course Schedule (Topological Sort)", "Word Ladder"],
    practicePath: ["Master BFS for shortest path and DFS for connectivity.", "Learn topological sort for dependency problems.", "Try advanced algorithms like Dijkstra's or Union-Find."],
  },
  strings: {
    complexityNotes: ["String concatenation is often O(n) in Python, creating a new string.", "Use list appending and ''.join() for O(n) building instead of +=."],
    pitfalls: ["Ignoring case sensitivity or whitespace/punctuation.", "Forgetting that strings are immutable."],
    edgeCases: ["Empty string", "Single character", "Strings with spaces only", "Very long strings (memory limits)"],
    dryRunSteps: ["Keep track of indices clearly.", "Check substring formation.", "Track ascii/unicode conversions if applicable."],
    interviewVariants: ["Valid Palindrome", "Longest Substring Without Repeating Characters", "Valid Anagram", "Longest Palindromic Substring"],
    practicePath: ["Solve a string reversal/palindrome check.", "Solve an anagram frequency check.", "Solve a string parsing problem."],
  },
  heaps: {
    complexityNotes: ["Insertion/Deletion is O(log k) where k is heap size.", "Finding min/max is O(1). Building a heap from an array is O(n)."],
    pitfalls: ["Using a full sort O(n log n) when a heap can do O(n log k).", "Forgetting that Python's heapq is a Min-Heap (negate values for Max-Heap)."],
    edgeCases: ["k = 0 or k > len(array)", "All identical elements", "Empty heap pop"],
    dryRunSteps: ["List the heap's internal array after each push/pop.", "Track the min/max element at index 0.", "Verify heap size remains k if tracking Top K."],
    interviewVariants: ["Kth Largest Element in an Array", "Top K Frequent Elements", "Merge K Sorted Lists", "Find Median from Data Stream"],
    practicePath: ["Solve a Top K elements problem using a min-heap.", "Solve a Kth smallest/largest problem.", "Solve a streaming data problem (e.g. median)."],
  },
  "two-pointers": {
    complexityNotes: ["Usually brings time complexity down from O(n^2) to O(n) or O(n log n) with sorting.", "Space is typically O(1)."],
    pitfalls: ["Moving the wrong pointer based on the condition.", "Off-by-one errors in while conditions (e.g. left < right vs left <= right)."],
    edgeCases: ["Array with even/odd length", "All elements the same", "Target not found"],
    dryRunSteps: ["Write elements and indices.", "Move left or right pointer based on condition.", "Update max/min or output array."],
    interviewVariants: ["Two Sum II (sorted array)", "3Sum", "Container With Most Water", "Trapping Rain Water"],
    practicePath: ["Solve a collision two-pointer (left/right).", "Solve a slow/fast pointer problem.", "Solve a sliding window/two-pointer hybrid."],
  },
  greedy: {
    complexityNotes: ["Usually requires sorting first, making time complexity O(n log n).", "Space is O(1) or O(n) depending on sort implementation."],
    pitfalls: ["Assuming greedy works when Dynamic Programming is required.", "Failing to prove the greedy choice is always optimal."],
    edgeCases: ["All intervals overlap", "No intervals overlap", "Negative values"],
    dryRunSteps: ["Sort the data mentally or on paper.", "Track the running max/min or current interval end.", "Check condition for merging/jumping."],
    interviewVariants: ["Jump Game", "Merge Intervals", "Gas Station", "Task Scheduler"],
    practicePath: ["Solve an interval merging problem.", "Solve an array jump/reachability problem.", "Solve a greedy scheduling problem."],
  },
  "prefix-sum": {
    complexityNotes: ["Preprocessing takes O(n) time and O(n) space.", "Range queries take O(1) time."],
    pitfalls: ["Forgetting the initial 0 in the prefix sum array.", "Index alignment errors (prefix[j] - prefix[i-1])."],
    edgeCases: ["Empty array", "Querying the entire array", "Negative numbers in the array"],
    dryRunSteps: ["Write out the original array.", "Calculate and write the prefix sum array.", "Trace a sample range query using prefix sums."],
    interviewVariants: ["Range Sum Query - Immutable", "Subarray Sum Equals K", "Continuous Subarray Sum", "Product of Array Except Self"],
    practicePath: ["Solve a basic range sum query.", "Solve a subarray sum using prefix sum + hash map.", "Solve a 2D prefix sum problem."],
  },
  "recursion-backtracking": {
    complexityNotes: ["Time complexity is often O(2^n) or O(n!).", "Space is O(n) for the recursion stack."],
    pitfalls: ["Forgetting to 'undo' the choice (backtrack) after exploring.", "Missing the base case, leading to stack overflow.", "Passing mutable objects (like lists) without copying."],
    edgeCases: ["n=0 or empty input", "Duplicate elements in input", "No valid solutions"],
    dryRunSteps: ["Draw the recursion tree.", "Track the current path/state at each node.", "Note when the base case is hit and backtracking occurs."],
    interviewVariants: ["Permutations", "Subsets", "Combination Sum", "N-Queens", "Word Search"],
    practicePath: ["Solve a basic combinations problem.", "Solve a permutations problem.", "Solve a grid-based backtracking problem (e.g. Word Search)."],
  },
  trie: {
    complexityNotes: ["Insertion and search take O(L) time where L is word length.", "Space complexity can be high due to numerous nodes."],
    pitfalls: ["Forgetting the 'is_end_of_word' boolean flag.", "Allocating arrays instead of hash maps for children when character set is large."],
    edgeCases: ["Empty string", "Words with common prefixes", "Searching for a prefix vs full word"],
    dryRunSteps: ["Draw the tree structure.", "Trace character by character for insertion/search.", "Verify the 'is_end' flag at the final character."],
    interviewVariants: ["Implement Trie (Prefix Tree)", "Design Add and Search Words Data Structure", "Word Search II"],
    practicePath: ["Implement a basic Trie class.", "Solve a prefix matching problem.", "Combine Trie with DFS for advanced search."],
  },
  "union-find": {
    complexityNotes: ["Find and Union are near O(1) with path compression and union by rank.", "Space is O(n) for parent and rank arrays."],
    pitfalls: ["Forgetting path compression in the `find` function.", "Not using union by rank/size, leading to O(n) trees."],
    edgeCases: ["Disconnected components", "Graph is already fully connected", "Self-loops"],
    dryRunSteps: ["Draw the parent array.", "Trace the root of two nodes being unioned.", "Update the rank/size and attach the smaller root to the larger."],
    interviewVariants: ["Number of Connected Components in an Undirected Graph", "Redundant Connection", "Accounts Merge"],
    practicePath: ["Implement a basic Disjoint Set class.", "Solve a cycle detection problem using Union-Find.", "Solve a connected components problem."],
  },
  "bit-manipulation": {
    complexityNotes: ["Operations are O(1) time.", "Space is O(1)."],
    pitfalls: ["Confusing logical operators (and, or) with bitwise operators (&, |).", "Sign extension issues in languages other than Python."],
    edgeCases: ["Negative numbers (2's complement)", "Zero", "Numbers exceeding 32-bit limits"],
    dryRunSteps: ["Write numbers in binary.", "Trace the bitwise operation bit-by-bit.", "Verify the decimal value of the result."],
    interviewVariants: ["Single Number", "Number of 1 Bits", "Counting Bits", "Reverse Bits", "Missing Number"],
    practicePath: ["Solve a basic XOR problem.", "Solve a bit counting/shifting problem.", "Solve a masking/subset problem using bits."],
  }
};

export function getLevelLabel(category: DSATopic["category"]) {
  if (category === "fundamentals") return "Beginner";
  if (category === "patterns") return "Intermediate";
  return "Advanced";
}

export function buildYouTubeSearchUrl(problemTitle: string) {
  const query = encodeURIComponent(`${problemTitle} python dsa explanation`);
  return `https://www.youtube.com/results?search_query=${query}`;
}

export function getRelatedProblems(topicId: string) {
  const keywords = topicKeywords[topicId] || [];
  return problems
    .map((problem) => {
      const hay = `${problem.title} ${problem.description} ${problem.solutionExplanation}`.toLowerCase();
      const score = keywords.reduce((count, key) => (hay.includes(key) ? count + 1 : count), 0);
      return { problem, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((entry) => entry.problem);
}

export function parseNodesFromCode(rawCode: string) {
  const values: number[] = [];
  const regex = /ListNode\s*\(\s*(-?\d+)/g;
  let match = regex.exec(rawCode);
  while (match) {
    values.push(Number(match[1]));
    match = regex.exec(rawCode);
  }
  return values;
}

export function parseNumberList(raw: string) {
  return raw
    .split(",")
    .map((item) => Number(item.trim()))
    .filter((value) => Number.isFinite(value));
}

export function parseTokenList(raw: string) {
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function inferVisualizationType(topicId: string, problem?: Problem) {
  const text = `${topicId} ${problem?.title ?? ""} ${problem?.description ?? ""}`.toLowerCase();
  if (text.includes("linked list") || text.includes("listnode")) return "linked-list" as const;
  if (text.includes("tree") || text.includes("bst")) return "tree" as const;
  if (text.includes("graph")) return "graph" as const;
  if (text.includes("string") || text.includes("palindrome") || text.includes("substring")) return "string" as const;
  if (text.includes("window") || text.includes("subarray")) return "sliding-window" as const;
  return "array" as const;
}

export function extractSeedInput(problem?: Problem) {
  if (!problem?.examples?.length) return "1,2,3,4,5";
  const raw = problem.examples[0].input || "";
  const bracketMatch = raw.match(/\[([^\]]+)\]/);
  if (bracketMatch?.[1]) return bracketMatch[1];
  const tokenMatch = raw.match(/([A-Za-z]-[A-Za-z](?:,\s*[A-Za-z]-[A-Za-z])*)/);
  if (tokenMatch?.[1]) return tokenMatch[1];
  return raw.includes(",") ? raw.replace(/[^\w,\-\s]/g, "") : "1,2,3,4,5";
}

export function buildTreeLevels(values: number[]) {
  const levels: number[][] = [];
  let level = 0;
  let index = 0;
  while (index < values.length && level < 5) {
    const count = 2 ** level;
    levels.push(values.slice(index, index + count));
    index += count;
    level += 1;
  }
  return levels;
}

export function getTopicPlaybook(topic: DSATopic) {
  const baseByCategory: Record<DSATopic["category"], typeof topicPlaybook["arrays"]> = {
    fundamentals: {
      complexityNotes: ["State brute-force complexity first, then target improvement.", "Prefer readable O(n) approaches over clever but brittle shortcuts."],
      pitfalls: ["Skipping input validation assumptions.", "Not testing with smallest valid input."],
      edgeCases: ["Empty input", "Single element/value", "Duplicate values"],
      dryRunSteps: ["Read constraints and expected output type.", "Walk through one normal case.", "Walk through one boundary case."],
      interviewVariants: ["Return indices vs values", "In-place vs extra-space version", "Streaming input version"],
      practicePath: ["Easy implementation", "Medium pattern variant", "Timed recap problem"],
    },
    patterns: {
      complexityNotes: ["Pattern choice should reduce one dimension of search.", "Explain why this pattern dominates brute force for constraints."],
      pitfalls: ["Applying a pattern without verifying prerequisites (sorted/monotonic/etc).", "Overfitting one pattern to all subarray problems."],
      edgeCases: ["Already sorted input", "All same values", "No valid answer"],
      dryRunSteps: ["List pattern prerequisites.", "Track pointer/window/heap states each step.", "Validate termination condition."],
      interviewVariants: ["Optimize memory", "Return all valid answers", "Support online/streaming updates"],
      practicePath: ["1 canonical pattern problem", "1 noisy wording problem", "1 mixed-pattern problem"],
    },
    advanced: {
      complexityNotes: ["Define state/graph model before coding.", "State both time and memory big-O and acceptable limits."],
      pitfalls: ["Starting code before invariant or recurrence is clear.", "Missing pruning/visited checks causes TLE or loops."],
      edgeCases: ["Disconnected components", "Cycles or impossible states", "Large input limits"],
      dryRunSteps: ["Model graph/state on paper.", "Simulate first transitions.", "Verify stop condition and correctness argument."],
      interviewVariants: ["Output one solution and count all solutions", "Iterative rewrite of recursive approach", "Constraint-tight optimization follow-up"],
      practicePath: ["Medium prep variant", "Hard core problem", "Explain aloud with complexity defense"],
    },
  };
  return topicPlaybook[topic.id] || baseByCategory[topic.category];
}

