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

export function createSqlQuestion(id: number): QuizQuestion {
  const block = Math.floor((id - 1) / 10) + 1;
  const type = (id - 1) % 10;

  if (type === 0) {
    return {
      id,
      topic: "Basics",
      question: "Which keyword is used to return only unique values?",
      options: rotateOptions(["DISTINCT", "UNIQUE", "DIFFERENT", "SINGLE"], block),
      answer: "DISTINCT",
      explanation: "The DISTINCT keyword is used to return only distinct (different) values.",
    };
  }

  if (type === 1) {
    const table = block % 2 === 0 ? "Users" : "Employees";
    return {
      id,
      topic: "Filtering",
      question: `Which operator is used to search for a specified pattern in a column?\n\n\`SELECT * FROM ${table} WHERE name ____ 'a%'\``,
      options: rotateOptions(["LIKE", "MATCH", "CONTAINS", "FIND"], block),
      answer: "LIKE",
      explanation: "The LIKE operator is used in a WHERE clause to search for a specified pattern in a column.",
    };
  }

  if (type === 2) {
    return {
      id,
      topic: "Joins",
      question: "Which JOIN returns all records when there is a match in either left or right table?",
      options: rotateOptions(["FULL OUTER JOIN", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN"], block),
      answer: "FULL OUTER JOIN",
      explanation: "FULL OUTER JOIN returns all records when there is a match in left or right table records.",
    };
  }

  if (type === 3) {
    return {
      id,
      topic: "Aggregation",
      question: "Which function is used to count the number of rows?",
      options: rotateOptions(["COUNT()", "SUM()", "TOTAL()", "ROWS()"], block),
      answer: "COUNT()",
      explanation: "The COUNT() function returns the number of rows that matches a specified criterion.",
    };
  }

  if (type === 4) {
    return {
      id,
      topic: "Ordering",
      question: "To sort the result-set in descending order, use which keyword?",
      options: rotateOptions(["DESC", "ASC", "DOWN", "REVERSE"], block),
      answer: "DESC",
      explanation: "The DESC keyword is used to sort the records in descending order.",
    };
  }

  if (type === 5) {
    return {
      id,
      topic: "Basics",
      question: "Which SQL statement is used to update data in a database?",
      options: rotateOptions(["UPDATE", "SAVE", "MODIFY", "CHANGE"], block),
      answer: "UPDATE",
      explanation: "The UPDATE statement is used to modify the existing records in a table.",
    };
  }

  if (type === 6) {
    return {
      id,
      topic: "Joins",
      question: "Which JOIN returns all records from the left table, and the matched records from the right table?",
      options: rotateOptions(["LEFT JOIN", "INNER JOIN", "RIGHT JOIN", "OUTER JOIN"], block),
      answer: "LEFT JOIN",
      explanation: "The LEFT JOIN keyword returns all records from the left table (table1), and the matching records from the right table (table2).",
    };
  }

  if (type === 7) {
    return {
      id,
      topic: "Nulls",
      question: "How do you select all records from a table where the 'FirstName' is NULL?",
      options: rotateOptions(["WHERE FirstName IS NULL", "WHERE FirstName = NULL", "WHERE FirstName IS EMPTY", "WHERE FirstName NULL"], block),
      answer: "WHERE FirstName IS NULL",
      explanation: "To check for NULL values, you must use the IS NULL operator, not the = operator.",
    };
  }

  if (type === 8) {
    return {
      id,
      topic: "Constraints",
      question: "Which constraint uniquely identifies each record in a table?",
      options: rotateOptions(["PRIMARY KEY", "UNIQUE", "FOREIGN KEY", "CHECK"], block),
      answer: "PRIMARY KEY",
      explanation: "The PRIMARY KEY constraint uniquely identifies each record in a table.",
    };
  }

  return {
    id,
    topic: "Grouping",
    question: "Which statement is often used with aggregate functions to group the result-set by one or more columns?",
    options: rotateOptions(["GROUP BY", "ORDER BY", "SORT BY", "COLLECT BY"], block),
    answer: "GROUP BY",
    explanation: "The GROUP BY statement groups rows that have the same values into summary rows.",
  };
}

export const sqlQuizQuestions: QuizQuestion[] = Array.from({ length: 500 }, (_, i) => createSqlQuestion(i + 1));
