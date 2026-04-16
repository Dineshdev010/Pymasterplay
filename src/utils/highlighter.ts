/**
 * Syntax highlighter utility for code snippets
 */

const LANGUAGE_KEYWORDS: Record<string, string[]> = {
  python: [
    'def', 'class', 'if', 'elif', 'else', 'for', 'while', 'import', 'from', 'as', 'return', 
    'try', 'except', 'finally', 'with', 'in', 'and', 'or', 'not', 'is', 'lambda', 'global', 
    'nonlocal', 'pass', 'break', 'continue', 'yield', 'None', 'True', 'False'
  ],
  sql: [
    'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'ON', 'GROUP', 'BY', 
    'HAVING', 'ORDER', 'LIMIT', 'OFFSET', 'UNION', 'ALL', 'DISTINCT', 'AS', 'AND', 
    'OR', 'NOT', 'NULL', 'IS', 'IN', 'BETWEEN', 'LIKE', 'EXISTS', 'ANY', 'ALL', 
    'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'COALESCE', 'WITH', 'RANK', 'PARTITION', 
    'OVER', 'LAG', 'LEAD', 'DATE_TRUNC', 'INTERVAL', 'NOW', 'CREATE', 'TABLE', 
    'PRIMARY', 'KEY', 'UNIQUE', 'DEFAULT', 'SERIAL', 'INDEX', 'ALTER', 'ADD', 'COLUMN'
  ],
  pandas: [
    'read_csv', 'read_excel', 'to_csv', 'to_excel', 'head', 'info', 'describe', 
    'columns', 'loc', 'iloc', 'isin', 'query', 'fillna', 'dropna', 'isna', 
    'drop_duplicates', 'rename', 'astype', 'groupby', 'agg', 'mean', 'sum', 
    'value_counts', 'rolling', 'pivot_table', 'merge', 'concat', 'apply', 'melt', 'unstack'
  ],
  linux: [
    'ls', 'cd', 'pwd', 'cat', 'tail', 'head', 'less', 'cp', 'mv', 'mkdir', 'touch', 
    'find', 'tar', 'grep', 'sed', 'awk', 'sort', 'uniq', 'chmod', 'chown', 'sudo', 
    'whoami', 'groups', 'id', 'ps', 'top', 'htop', 'kill', 'df', 'du', 'free', 
    'curl', 'wget', 'ping', 'traceroute', 'netstat', 'ssh', 'scp', 'echo', 'alias', 'history'
  ],
  git: [
    'add', 'commit', 'status', 'diff', 'push', 'pull', 'log', 'checkout', 'branch', 
    'merge', 'fetch', 'remote', 'stash', 'rebase', 'cherry-pick', 'reset', 'revert', 
    'reflog', 'config', 'blame'
  ]
};

const escapeHtml = (text: string) => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

/**
 * Highlights a code snippet based on the language
 */
export const highlightSnippet = (snippet: string, tech: string): string => {
  const words = snippet.split(/(\s+|[(),.:;=[\]{}<>!+\-*/])/);
  const keywords = LANGUAGE_KEYWORDS[tech] || [];
  
  return words.map(word => {
    if (keywords.includes(word)) {
      // Different colors for different techs for variety if needed, 
      // but primarily using a consistent primary highlight
      let colorClass = 'text-primary font-semibold';
      if (tech === 'linux') colorClass = 'text-amber-400 font-bold';
      if (tech === 'sql') colorClass = 'text-sky-400 font-bold';
      
      return `<span class="${colorClass}">${escapeHtml(word)}</span>`;
    }
    
    // Highlight numbers
    if (/^\d+(\.\d+)?$/.test(word)) {
      return `<span class="text-indigo-400 font-medium">${escapeHtml(word)}</span>`;
    }
    
    // Highlight strings
    if (word.startsWith("'") || word.startsWith('"')) {
      return `<span class="text-emerald-400 italic">${escapeHtml(word)}</span>`;
    }
    
    // Highlight comments (basic)
    if (word.startsWith('#') || word.startsWith('--')) {
      return `<span class="text-slate-500 italic">${escapeHtml(word)}</span>`;
    }
    
    return escapeHtml(word);
  }).join('');
};
