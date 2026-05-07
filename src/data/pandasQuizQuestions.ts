export interface QuizQuestion {
  id: number;
  topic: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

function rotateOptions(options: string[], shift: number) {
  const uniqueSet = new Set<string>();
  options.forEach(opt => uniqueSet.add(opt));
  let offset = 1;
  while (uniqueSet.size < 4) {
    const baseVal = parseFloat(options[0]);
    if (!isNaN(baseVal)) {
      const candidate = String(baseVal + offset);
      if (!uniqueSet.has(candidate)) uniqueSet.add(candidate);
    } else {
      const candidate = `${options[0]}_${offset}`;
      if (!uniqueSet.has(candidate)) uniqueSet.add(candidate);
    }
    offset++;
  }
  const uniqueOptions = Array.from(uniqueSet);
  const normalized = shift % 4;
  return [...uniqueOptions.slice(normalized), ...uniqueOptions.slice(0, normalized)];
}

export function createPandasQuestion(id: number): QuizQuestion {
  const block = Math.floor((id - 1) / 10) + 1;
  const type = (id - 1) % 10;

  if (type === 0) {
    return {
      id,
      topic: "DataFrames",
      question: "Which function is used to load a CSV file in Pandas?",
      options: rotateOptions(["read_csv()", "load_csv()", "get_csv()", "open_csv()"], block),
      answer: "read_csv()",
      explanation: "The read_csv() function is the standard way to load CSV data into a DataFrame.",
    };
  }

  if (type === 1) {
    return {
      id,
      topic: "Basics",
      question: "What is the primary data structure in Pandas for 1D data?",
      options: rotateOptions(["Series", "DataFrame", "Panel", "Array"], block),
      answer: "Series",
      explanation: "A Series is a one-dimensional labeled array capable of holding any data type.",
    };
  }

  if (type === 2) {
    return {
      id,
      topic: "Inspection",
      question: "Which method is used to see the first few rows of a DataFrame?",
      options: rotateOptions(["head()", "top()", "first()", "show()"], block),
      answer: "head()",
      explanation: "The head() method returns the first n rows (default 5) of the DataFrame.",
    };
  }

  if (type === 3) {
    return {
      id,
      topic: "Selection",
      question: "Which attribute is used for label-based selection?",
      options: rotateOptions([".loc", ".iloc", ".at", ".iat"], block),
      answer: ".loc",
      explanation: ".loc is primarily label-based, while .iloc is integer-based.",
    };
  }

  if (type === 4) {
    return {
      id,
      topic: "Data Cleaning",
      question: "How do you drop missing values from a DataFrame?",
      options: rotateOptions(["dropna()", "remove_na()", "clear_na()", "del_na()"], block),
      answer: "dropna()",
      explanation: "dropna() removes rows or columns with null values.",
    };
  }

  if (type === 5) {
    return {
      id,
      topic: "Aggregation",
      question: "Which method is used to compute the average of a column?",
      options: rotateOptions(["mean()", "avg()", "average()", "median()"], block),
      answer: "mean()",
      explanation: "The mean() method returns the average of the values in the requested axis.",
    };
  }

  if (type === 6) {
    return {
      id,
      topic: "Grouping",
      question: "Which method is used for grouping data?",
      options: rotateOptions(["groupby()", "cluster()", "set_group()", "arrange()"], block),
      answer: "groupby()",
      explanation: "groupby() is used to split the data into groups based on some criteria.",
    };
  }

  if (type === 7) {
    return {
      id,
      topic: "Reshaping",
      question: "Which function is used to merge two DataFrames?",
      options: rotateOptions(["merge()", "join()", "combine()", "concat()"], block),
      answer: "merge()",
      explanation: "merge() connects rows in DataFrames based on one or more keys.",
    };
  }

  if (type === 8) {
    return {
      id,
      topic: "Statistics",
      question: "Which method provides a summary of the statistics for numerical columns?",
      options: rotateOptions(["describe()", "summary()", "info()", "stats()"], block),
      answer: "describe()",
      explanation: "describe() generates descriptive statistics like count, mean, std, etc.",
    };
  }

  return {
    id,
    topic: "Sorting",
    question: "How do you sort a DataFrame by a specific column?",
    options: rotateOptions(["sort_values()", "order_by()", "arrange()", "sort_by()"], block),
    answer: "sort_values()",
    explanation: "sort_values() sorts the DataFrame by the values of one or more columns.",
  };
}

export const pandasQuizQuestions: QuizQuestion[] = Array.from({ length: 500 }, (_, i) => createPandasQuestion(i + 1));
