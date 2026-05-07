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

export function createLinuxQuestion(id: number): QuizQuestion {
  const block = Math.floor((id - 1) / 10) + 1;
  const type = (id - 1) % 10;

  if (type === 0) {
    return {
      id,
      topic: "File System",
      question: "Which command is used to list files in a directory?",
      options: rotateOptions(["ls", "list", "dir", "show"], block),
      answer: "ls",
      explanation: "The ls command is used to list files and subdirectories.",
    };
  }

  if (type === 1) {
    return {
      id,
      topic: "Navigation",
      question: "Which command is used to change the current directory?",
      options: rotateOptions(["cd", "move", "goto", "chdir"], block),
      answer: "cd",
      explanation: "cd (change directory) is used to navigate through the file system.",
    };
  }

  if (type === 2) {
    return {
      id,
      topic: "Permissions",
      question: "Which command is used to change file permissions?",
      options: rotateOptions(["chmod", "chown", "perm", "setfacl"], block),
      answer: "chmod",
      explanation: "chmod (change mode) modifies the read, write, and execute permissions of a file.",
    };
  }

  if (type === 3) {
    return {
      id,
      topic: "Process",
      question: "Which command displays the running processes in real-time?",
      options: rotateOptions(["top", "ps", "tasklist", "monitor"], block),
      answer: "top",
      explanation: "top provides a dynamic real-time view of a running system.",
    };
  }

  if (type === 4) {
    return {
      id,
      topic: "Networking",
      question: "Which command is used to check network connectivity?",
      options: rotateOptions(["ping", "check", "netstat", "ipconfig"], block),
      answer: "ping",
      explanation: "ping sends ICMP ECHO_REQUEST packets to network hosts.",
    };
  }

  if (type === 5) {
    return {
      id,
      topic: "Text Processing",
      question: "Which command is used to search for a pattern in a file?",
      options: rotateOptions(["grep", "find", "search", "lookup"], block),
      answer: "grep",
      explanation: "grep searches for a string of characters in a specified file.",
    };
  }

  if (type === 6) {
    return {
      id,
      topic: "File Management",
      question: "How do you create a new empty file?",
      options: rotateOptions(["touch", "new", "create", "make"], block),
      answer: "touch",
      explanation: "The touch command is primarily used to update file timestamps but also creates empty files.",
    };
  }

  if (type === 7) {
    return {
      id,
      topic: "System Info",
      question: "Which command displays the current working directory?",
      options: rotateOptions(["pwd", "path", "cwd", "whereami"], block),
      answer: "pwd",
      explanation: "pwd (print working directory) shows the full path of the current directory.",
    };
  }

  if (type === 8) {
    return {
      id,
      topic: "Help",
      question: "Which command is used to view the manual of another command?",
      options: rotateOptions(["man", "help", "info", "guide"], block),
      answer: "man",
      explanation: "man (manual) provides documentation for commands and utilities.",
    };
  }

  return {
    id,
    topic: "Storage",
    question: "Which command displays the available disk space?",
    options: rotateOptions(["df", "du", "disk", "free"], block),
    answer: "df",
    explanation: "df (disk free) displays the amount of disk space available on file systems.",
  };
}

export const linuxQuizQuestions: QuizQuestion[] = Array.from({ length: 500 }, (_, i) => createLinuxQuestion(i + 1));
