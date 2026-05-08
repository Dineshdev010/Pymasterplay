export interface SQLProblem {
  id: string;
  title: string;
  difficulty: "basic" | "junior" | "intermediate" | "advanced" | "expert";
  companies?: string[];
  description: string;
  schema: string;
  initialData: string;
  expectedQuery: string;
  explanation: string;
  starterCode: string;
  testCases: any[];
}

export const sqlProblems: SQLProblem[] = [
  // --- BASIC (10 Problems) ---
  {
    id: "sql-select-all",
    title: "Select All Employees",
    difficulty: "basic",
    companies: ["TCS", "Infosys"],
    description: "Write a query to retrieve all columns from the `employees` table.",
    schema: "CREATE TABLE employees (id INT, name TEXT, salary INT);",
    initialData: "INSERT INTO employees VALUES (1, 'Alice', 5000), (2, 'Bob', 6000);",
    expectedQuery: "SELECT * FROM employees;",
    explanation: "The SELECT * statement is used to select all columns from a table.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-select-columns",
    title: "Specific Columns",
    difficulty: "basic",
    companies: ["Wipro", "HCL"],
    description: "Retrieve only the `name` and `salary` columns from the `employees` table.",
    schema: "CREATE TABLE employees (id INT, name TEXT, salary INT);",
    initialData: "INSERT INTO employees VALUES (1, 'Alice', 5000), (2, 'Bob', 6000);",
    expectedQuery: "SELECT name, salary FROM employees;",
    explanation: "Specify column names separated by commas to select specific data.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-distinct",
    title: "Unique Values",
    difficulty: "basic",
    companies: ["Cognizant"],
    description: "Find all unique cities where employees live from the `employees` table.",
    schema: "CREATE TABLE employees (id INT, name TEXT, city TEXT);",
    initialData: "INSERT INTO employees VALUES (1, 'Alice', 'New York'), (2, 'Bob', 'London'), (3, 'Charlie', 'New York');",
    expectedQuery: "SELECT DISTINCT city FROM employees;",
    explanation: "The SELECT DISTINCT statement is used to return only distinct (different) values.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-filter-salary",
    title: "Filtering Data",
    difficulty: "basic",
    companies: ["Accenture"],
    description: "Retrieve names of employees whose salary is greater than 5500.",
    schema: "CREATE TABLE employees (id INT, name TEXT, salary INT);",
    initialData: "INSERT INTO employees VALUES (1, 'Alice', 5000), (2, 'Bob', 6000);",
    expectedQuery: "SELECT name FROM employees WHERE salary > 5500;",
    explanation: "Use the WHERE clause to filter rows based on a condition.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-like-operator",
    title: "Pattern Matching",
    difficulty: "basic",
    companies: ["Infosys"],
    description: "Find all employees whose name starts with 'A'.",
    schema: "CREATE TABLE employees (id INT, name TEXT);",
    initialData: "INSERT INTO employees VALUES (1, 'Alice'), (2, 'Bob'), (3, 'Amanda');",
    expectedQuery: "SELECT * FROM employees WHERE name LIKE 'A%';",
    explanation: "The LIKE operator is used in a WHERE clause to search for a specified pattern in a column.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-insert-basic",
    title: "Insert Data",
    difficulty: "basic",
    companies: ["TCS"],
    description: "Insert a new employee 'David' with id 3 and salary 4500 into the `employees` table. Then select all rows to verify.",
    schema: "CREATE TABLE employees (id INT, name TEXT, salary INT);",
    initialData: "INSERT INTO employees VALUES (1, 'Alice', 5000);",
    expectedQuery: "INSERT INTO employees VALUES (3, 'David', 4500); SELECT * FROM employees;",
    explanation: "Use INSERT INTO to add new rows. We verify by selecting all rows.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-update-basic",
    title: "Update Data",
    difficulty: "basic",
    companies: ["Wipro"],
    description: "Update the salary of employee 'Alice' to 7000. Then select all rows to verify.",
    schema: "CREATE TABLE employees (id INT, name TEXT, salary INT);",
    initialData: "INSERT INTO employees VALUES (1, 'Alice', 5000);",
    expectedQuery: "UPDATE employees SET salary = 7000 WHERE name = 'Alice'; SELECT * FROM employees;",
    explanation: "Use UPDATE SET WHERE to modify existing rows.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-delete-basic",
    title: "Delete Data",
    difficulty: "basic",
    companies: ["HCL"],
    description: "Delete employee with id 1 from the `employees` table. Then select all rows to verify.",
    schema: "CREATE TABLE employees (id INT, name TEXT, salary INT);",
    initialData: "INSERT INTO employees VALUES (1, 'Alice', 5000), (2, 'Bob', 6000);",
    expectedQuery: "DELETE FROM employees WHERE id = 1; SELECT * FROM employees;",
    explanation: "Use DELETE FROM WHERE to remove rows.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-create-table",
    title: "Create Table",
    difficulty: "basic",
    companies: ["Tech Mahindra"],
    description: "Create a table named `students` with two columns: `id` (INT) and `name` (TEXT). Then verify by querying sqlite_master.",
    schema: "",
    initialData: "",
    expectedQuery: "CREATE TABLE students (id INT, name TEXT); SELECT name FROM sqlite_master WHERE type='table' AND name='students';",
    explanation: "CREATE TABLE defines a new table and its columns.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-null-check",
    title: "Null Check",
    difficulty: "basic",
    companies: ["Cognizant"],
    description: "Find employees who don't have a department (dept_id is NULL).",
    schema: "CREATE TABLE employees (id INT, name TEXT, dept_id INT);",
    initialData: "INSERT INTO employees VALUES (1, 'Alice', 101), (2, 'Bob', NULL);",
    expectedQuery: "SELECT * FROM employees WHERE dept_id IS NULL;",
    explanation: "IS NULL is used to check for empty values.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },

  // --- JUNIOR (10 Problems) ---
  {
    id: "sql-order-by",
    title: "Sorting Results",
    difficulty: "junior",
    companies: ["Cognizant"],
    description: "Retrieve all employees and sort them by `salary` in descending order.",
    schema: "CREATE TABLE employees (id INT, name TEXT, salary INT);",
    initialData: "INSERT INTO employees VALUES (1, 'Alice', 5000), (2, 'Bob', 6000), (3, 'Charlie', 5500);",
    expectedQuery: "SELECT * FROM employees ORDER BY salary DESC;",
    explanation: "ORDER BY is used to sort the result-set in ascending or descending order.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-between",
    title: "Range Filter",
    difficulty: "junior",
    companies: ["Capgemini"],
    description: "Find employees with salary between 5000 and 6000 (inclusive).",
    schema: "CREATE TABLE employees (id INT, name TEXT, salary INT);",
    initialData: "INSERT INTO employees VALUES (1, 'Alice', 4500), (2, 'Bob', 5500), (3, 'Charlie', 6500);",
    expectedQuery: "SELECT * FROM employees WHERE salary BETWEEN 5000 AND 6000;",
    explanation: "BETWEEN selects values within a given range.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-in-operator",
    title: "List Matching",
    difficulty: "junior",
    companies: ["LTI"],
    description: "Find employees who live in either 'New York' or 'London'.",
    schema: "CREATE TABLE employees (id INT, name TEXT, city TEXT);",
    initialData: "INSERT INTO employees VALUES (1, 'Alice', 'New York'), (2, 'Bob', 'Paris'), (3, 'Charlie', 'London');",
    expectedQuery: "SELECT * FROM employees WHERE city IN ('New York', 'London');",
    explanation: "IN allows you to specify multiple values in a WHERE clause.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-alias",
    title: "Column Aliasing",
    difficulty: "junior",
    companies: ["Mindtree"],
    description: "Select employee name but display the column as `EmployeeName`.",
    schema: "CREATE TABLE employees (id INT, name TEXT);",
    initialData: "INSERT INTO employees VALUES (1, 'Alice');",
    expectedQuery: "SELECT name AS EmployeeName FROM employees;",
    explanation: "AS is used to give a table or a column a temporary name.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-aggregate-count",
    title: "Row Count",
    difficulty: "junior",
    companies: ["TCS"],
    description: "Count the total number of employees in the table.",
    schema: "CREATE TABLE employees (id INT, name TEXT);",
    initialData: "INSERT INTO employees VALUES (1, 'Alice'), (2, 'Bob'), (3, 'Charlie');",
    expectedQuery: "SELECT COUNT(*) FROM employees;",
    explanation: "COUNT() returns the number of rows that matches a specified criterion.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-alter-table-add",
    title: "Alter Table: Add Column",
    difficulty: "junior",
    companies: ["Wipro"],
    description: "Add a new column `email` (TEXT) to the `employees` table. Verify by checking table info.",
    schema: "CREATE TABLE employees (id INT, name TEXT);",
    initialData: "",
    expectedQuery: "ALTER TABLE employees ADD COLUMN email TEXT; PRAGMA table_info(employees);",
    explanation: "ALTER TABLE is used to add, delete, or modify columns in an existing table.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-limit-results",
    title: "Limit Records",
    difficulty: "junior",
    companies: ["Infosys"],
    description: "Select only the first 2 rows from the `employees` table.",
    schema: "CREATE TABLE employees (id INT, name TEXT);",
    initialData: "INSERT INTO employees VALUES (1, 'Alice'), (2, 'Bob'), (3, 'Charlie');",
    expectedQuery: "SELECT * FROM employees LIMIT 2;",
    explanation: "LIMIT specifies the number of records to return.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-concat-strings",
    title: "String Concatenation",
    difficulty: "junior",
    companies: ["Zensar"],
    description: "Combine `first_name` and `last_name` with a space in between, alias as `FullName`.",
    schema: "CREATE TABLE users (first_name TEXT, last_name TEXT);",
    initialData: "INSERT INTO users VALUES ('John', 'Doe');",
    expectedQuery: "SELECT first_name || ' ' || last_name AS FullName FROM users;",
    explanation: "In SQLite, || is used for concatenation.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-math-ops",
    title: "Math Operations",
    difficulty: "junior",
    companies: ["Persistent"],
    description: "Calculate the annual salary of each employee (salary * 12). Display `name` and `AnnualSalary`.",
    schema: "CREATE TABLE employees (name TEXT, salary INT);",
    initialData: "INSERT INTO employees VALUES ('Alice', 5000);",
    expectedQuery: "SELECT name, salary * 12 AS AnnualSalary FROM employees;",
    explanation: "You can perform arithmetic operations directly in SELECT.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-schema-query",
    title: "Explore Schema",
    difficulty: "junior",
    companies: ["Oracle"],
    description: "List all table names present in the database.",
    schema: "CREATE TABLE table1 (id INT); CREATE TABLE table2 (id INT);",
    initialData: "",
    expectedQuery: "SELECT name FROM sqlite_master WHERE type='table';",
    explanation: "sqlite_master is a system table containing the database schema.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },

  // --- INTERMEDIATE (10 Problems) ---
  {
    id: "sql-group-by",
    title: "Counting Groups",
    difficulty: "intermediate",
    companies: ["Amazon"],
    description: "Count how many employees are in each department. Output: `dept_name` and `emp_count`.",
    schema: "CREATE TABLE employees (id INT, name TEXT, dept_name TEXT);",
    initialData: "INSERT INTO employees VALUES (1, 'Alice', 'IT'), (2, 'Bob', 'HR'), (3, 'Charlie', 'IT');",
    expectedQuery: "SELECT dept_name, COUNT(*) as emp_count FROM employees GROUP BY dept_name;",
    explanation: "GROUP BY groups rows that have the same values into summary rows.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-join-departments",
    title: "Basic JOIN",
    difficulty: "intermediate",
    companies: ["Amazon", "Google"],
    description: "Join `employees` and `departments` to show employee names and their department names.",
    schema: "CREATE TABLE employees (id INT, name TEXT, dept_id INT); CREATE TABLE departments (id INT, dept_name TEXT);",
    initialData: "INSERT INTO employees VALUES (1, 'Alice', 101); INSERT INTO departments VALUES (101, 'Engineering');",
    expectedQuery: "SELECT e.name, d.dept_name FROM employees e JOIN departments d ON e.dept_id = d.id;",
    explanation: "A JOIN clause is used to combine rows from two or more tables.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-having-clause",
    title: "Group Filtering",
    difficulty: "intermediate",
    companies: ["Flipkart"],
    description: "List departments that have more than 1 employee.",
    schema: "CREATE TABLE employees (id INT, dept_name TEXT);",
    initialData: "INSERT INTO employees VALUES (1, 'IT'), (2, 'HR'), (3, 'IT');",
    expectedQuery: "SELECT dept_name FROM employees GROUP BY dept_name HAVING COUNT(*) > 1;",
    explanation: "HAVING is used to filter groups created by GROUP BY.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-inner-join-multi",
    title: "Multi-Table Join",
    difficulty: "intermediate",
    companies: ["Uber"],
    description: "Show employee names, their department names, and their office locations.",
    schema: "CREATE TABLE employees (id INT, name TEXT, dept_id INT); CREATE TABLE departments (id INT, dept_name TEXT, loc_id INT); CREATE TABLE locations (id INT, city TEXT);",
    initialData: "INSERT INTO employees VALUES (1, 'Alice', 101); INSERT INTO departments VALUES (101, 'Sales', 501); INSERT INTO locations VALUES (501, 'Bangalore');",
    expectedQuery: "SELECT e.name, d.dept_name, l.city FROM employees e JOIN departments d ON e.dept_id = d.id JOIN locations l ON d.loc_id = l.id;",
    explanation: "You can chain multiple JOIN clauses to link multiple tables.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-left-join",
    title: "Left Join",
    difficulty: "intermediate",
    companies: ["Paytm"],
    description: "List all employees and their department names, including those with no department.",
    schema: "CREATE TABLE employees (id INT, name TEXT, dept_id INT); CREATE TABLE departments (id INT, dept_name TEXT);",
    initialData: "INSERT INTO employees VALUES (1, 'Alice', 101), (2, 'Bob', NULL); INSERT INTO departments VALUES (101, 'HR');",
    expectedQuery: "SELECT e.name, d.dept_name FROM employees e LEFT JOIN departments d ON e.dept_id = d.id;",
    explanation: "LEFT JOIN returns all records from the left table, and matched records from the right.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-case-statement",
    title: "Conditional Logic",
    difficulty: "intermediate",
    companies: ["Walmart"],
    description: "Label employees as 'Senior' if salary > 5000, else 'Junior'. Display `name` and `Level`.",
    schema: "CREATE TABLE employees (name TEXT, salary INT);",
    initialData: "INSERT INTO employees VALUES ('Alice', 6000), ('Bob', 4000);",
    expectedQuery: "SELECT name, CASE WHEN salary > 5000 THEN 'Senior' ELSE 'Junior' END AS Level FROM employees;",
    explanation: "CASE is like if-then-else logic in SQL.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-self-join",
    title: "Self Join",
    difficulty: "intermediate",
    companies: ["LinkedIn"],
    description: "Find names of employees and their managers (who are also employees).",
    schema: "CREATE TABLE employees (id INT, name TEXT, manager_id INT);",
    initialData: "INSERT INTO employees VALUES (1, 'Alice', NULL), (2, 'Bob', 1);",
    expectedQuery: "SELECT e.name AS Employee, m.name AS Manager FROM employees e JOIN employees m ON e.manager_id = m.id;",
    explanation: "A self join is a regular join, but the table is joined with itself.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-aggregate-sum-avg",
    title: "Financial Aggregates",
    difficulty: "intermediate",
    companies: ["Goldman Sachs"],
    description: "Calculate total and average salary for the 'Engineering' department.",
    schema: "CREATE TABLE employees (dept TEXT, salary INT);",
    initialData: "INSERT INTO employees VALUES ('Engineering', 5000), ('Engineering', 7000), ('Sales', 4000);",
    expectedQuery: "SELECT SUM(salary), AVG(salary) FROM employees WHERE dept = 'Engineering';",
    explanation: "SUM and AVG provide mathematical summaries for groups of rows.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-update-complex",
    title: "Bulk Update",
    difficulty: "intermediate",
    companies: ["Adobe"],
    description: "Give a 10% raise to all employees in the 'Sales' department. Verify by selecting all.",
    schema: "CREATE TABLE employees (name TEXT, dept TEXT, salary INT);",
    initialData: "INSERT INTO employees VALUES ('Alice', 'Sales', 5000), ('Bob', 'IT', 6000);",
    expectedQuery: "UPDATE employees SET salary = salary * 1.1 WHERE dept = 'Sales'; SELECT * FROM employees;",
    explanation: "UPDATE can target multiple rows based on conditions.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-coalesce",
    title: "Handle Missing Data",
    difficulty: "intermediate",
    companies: ["Microsoft"],
    description: "Display employee name and their phone number. If phone is NULL, show 'N/A'. Alias as `ContactNumber`.",
    schema: "CREATE TABLE employees (name TEXT, phone TEXT);",
    initialData: "INSERT INTO employees VALUES ('Alice', '123-456'), ('Bob', NULL);",
    expectedQuery: "SELECT name, COALESCE(phone, 'N/A') AS ContactNumber FROM employees;",
    explanation: "COALESCE returns the first non-null value in the list.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },

  // --- ADVANCED (5 Problems) ---
  {
    id: "sql-subquery",
    title: "Inner Subquery",
    difficulty: "advanced",
    companies: ["Microsoft", "Meta"],
    description: "Find names of employees whose salary is above the average salary of all employees.",
    schema: "CREATE TABLE employees (id INT, name TEXT, salary INT);",
    initialData: "INSERT INTO employees VALUES (1, 'Alice', 5000), (2, 'Bob', 7000), (3, 'Charlie', 6000);",
    expectedQuery: "SELECT name FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);",
    explanation: "A subquery is a query within another query. Here we find the average first, then filter.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-correlated-subquery",
    title: "Correlated Subquery",
    difficulty: "advanced",
    companies: ["Amazon"],
    description: "Find employees who earn more than the average salary of *their own* department.",
    schema: "CREATE TABLE employees (id INT, name TEXT, salary INT, dept_id INT);",
    initialData: "INSERT INTO employees VALUES (1, 'Alice', 5000, 10), (2, 'Bob', 3000, 10), (3, 'Charlie', 7000, 20), (4, 'David', 4000, 20);",
    expectedQuery: "SELECT e1.name FROM employees e1 WHERE e1.salary > (SELECT AVG(e2.salary) FROM employees e2 WHERE e1.dept_id = e2.dept_id);",
    explanation: "A correlated subquery refers to columns from the outer query.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-union-all",
    title: "Combining Datasets",
    difficulty: "advanced",
    companies: ["Cisco"],
    description: "Combine names of all users and all customers into a single list.",
    schema: "CREATE TABLE users (name TEXT); CREATE TABLE customers (name TEXT);",
    initialData: "INSERT INTO users VALUES ('Alice'); INSERT INTO customers VALUES ('Bob');",
    expectedQuery: "SELECT name FROM users UNION SELECT name FROM customers;",
    explanation: "UNION combines the result-set of two or more SELECT statements.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-exists-clause",
    title: "Existence Check",
    difficulty: "advanced",
    companies: ["Google"],
    description: "Find customers who have placed at least one order.",
    schema: "CREATE TABLE customers (id INT, name TEXT); CREATE TABLE orders (id INT, cust_id INT);",
    initialData: "INSERT INTO customers VALUES (1, 'Alice'), (2, 'Bob'); INSERT INTO orders VALUES (101, 1);",
    expectedQuery: "SELECT name FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.cust_id = c.id);",
    explanation: "EXISTS checks for the presence of rows in a subquery.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-multiple-joins-aggregates",
    title: "Complex Reporting",
    difficulty: "advanced",
    companies: ["Apple"],
    description: "Find the total revenue generated by each customer. Output: `name` and `TotalRevenue`.",
    schema: "CREATE TABLE customers (id INT, name TEXT); CREATE TABLE orders (id INT, cust_id INT, amount INT);",
    initialData: "INSERT INTO customers VALUES (1, 'Alice'), (2, 'Bob'); INSERT INTO orders VALUES (101, 1, 500), (102, 1, 300), (103, 2, 1000);",
    expectedQuery: "SELECT c.name, SUM(o.amount) AS TotalRevenue FROM customers c JOIN orders o ON c.id = o.cust_id GROUP BY c.name;",
    explanation: "Combining JOIN and SUM/GROUP BY allows for complex reporting.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },

  // --- EXPERT (5 Problems) ---
  {
    id: "sql-window-rank",
    title: "Ranking Data",
    difficulty: "expert",
    companies: ["Goldman Sachs", "JPMorgan"],
    description: "Rank employees by salary within each department using `RANK()`. Output: `name`, `dept`, `salary`, and `salary_rank`.",
    schema: "CREATE TABLE employees (id INT, name TEXT, dept TEXT, salary INT);",
    initialData: "INSERT INTO employees VALUES (1, 'Alice', 'IT', 5000), (2, 'Bob', 'IT', 6000), (3, 'Charlie', 'HR', 5500), (4, 'Dave', 'HR', 4000);",
    expectedQuery: "SELECT name, dept, salary, RANK() OVER (PARTITION BY dept ORDER BY salary DESC) as salary_rank FROM employees;",
    explanation: "Window functions perform a calculation across a set of table rows that are somehow related to the current row.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-cte-complex",
    title: "Monthly Revenue CTE",
    difficulty: "expert",
    companies: ["Netflix", "Airbnb"],
    description: "Use a CTE named `MonthlyRevenue` to calculate total amount per month from `orders`, then select months where revenue > 1000.",
    schema: "CREATE TABLE orders (id INT, amount DECIMAL, order_date DATE);",
    initialData: "INSERT INTO orders VALUES (1, 1200, '2023-01-15'), (2, 500, '2023-01-20'), (3, 800, '2023-02-10');",
    expectedQuery: "WITH MonthlyRevenue AS (SELECT strftime('%m', order_date) as month, SUM(amount) as revenue FROM orders GROUP BY month) SELECT * FROM MonthlyRevenue WHERE revenue > 1000;",
    explanation: "CTEs provide a way to write complex queries in a more readable way by breaking them into named temporary result sets.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-recursive-cte",
    title: "Hierarchy Traversal",
    difficulty: "expert",
    companies: ["Zillow"],
    description: "Generate a sequence of numbers from 1 to 5 using a recursive CTE. Alias the column as `n`.",
    schema: "",
    initialData: "",
    expectedQuery: "WITH RECURSIVE cnt(n) AS (SELECT 1 UNION ALL SELECT n+1 FROM cnt WHERE n < 5) SELECT n FROM cnt;",
    explanation: "Recursive CTEs can refer to themselves to handle hierarchical or sequential data.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-moving-average",
    title: "Running Totals",
    difficulty: "expert",
    companies: ["Spotify"],
    description: "Calculate the running total of `amount` for each customer, ordered by `order_date`. Output: `cust_id`, `order_date`, `amount`, and `running_total`.",
    schema: "CREATE TABLE orders (id INT, cust_id INT, amount INT, order_date DATE);",
    initialData: "INSERT INTO orders VALUES (1, 10, 100, '2023-01-01'), (2, 10, 50, '2023-01-02'), (3, 20, 300, '2023-01-01');",
    expectedQuery: "SELECT cust_id, order_date, amount, SUM(amount) OVER (PARTITION BY cust_id ORDER BY order_date) AS running_total FROM orders;",
    explanation: "SUM() OVER allows for cumulative calculations without grouping rows.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  },
  {
    id: "sql-nth-value",
    title: "Value Lagging",
    difficulty: "expert",
    companies: ["Uber"],
    description: "For each order, show its amount and the amount of the *previous* order from the same customer (use `LAG()`). Output: `cust_id`, `amount`, and `prev_amount`.",
    schema: "CREATE TABLE orders (id INT, cust_id INT, amount INT, order_date DATE);",
    initialData: "INSERT INTO orders VALUES (1, 10, 100, '2023-01-01'), (2, 10, 150, '2023-01-02');",
    expectedQuery: "SELECT cust_id, amount, LAG(amount) OVER (PARTITION BY cust_id ORDER BY order_date) AS prev_amount FROM orders;",
    explanation: "LAG() provides access to a row at a given physical offset that comes before the current row.",
    starterCode: "-- Write your SQL here\n",
    testCases: []
  }
];

// Procedural expansion for 100+ unique problems
export function generateSqlExpansion(): SQLProblem[] {
  const extra: SQLProblem[] = [];
  const industries = [
    {
      name: "E-commerce",
      tables: ["orders", "products", "customers"],
      schema: "CREATE TABLE orders (id INT, customer_id INT, amount DECIMAL); CREATE TABLE products (id INT, name TEXT, price DECIMAL);",
      data: "INSERT INTO products VALUES (1, 'Laptop', 1200), (2, 'Mouse', 25); INSERT INTO orders VALUES (10, 1, 1200);",
      challenges: [
        { title: "Find Expensive Products", query: "SELECT * FROM products WHERE price > 100;", diff: "junior" },
        { title: "Total Order Value", query: "SELECT SUM(amount) FROM orders;", diff: "intermediate" },
        { title: "Customer Order Count", query: "SELECT customer_id, COUNT(*) FROM orders GROUP BY customer_id;", diff: "intermediate" }
      ]
    },
    {
      name: "Social Media",
      tables: ["users", "posts", "likes"],
      schema: "CREATE TABLE users (id INT, username TEXT, joined_at DATE); CREATE TABLE posts (id INT, user_id INT, content TEXT);",
      data: "INSERT INTO users VALUES (1, 'dev_pro', '2023-01-01'); INSERT INTO posts VALUES (101, 1, 'Hello SQL!');",
      challenges: [
        { title: "Latest Users", query: "SELECT * FROM users ORDER BY joined_at DESC;", diff: "junior" },
        { title: "Post Counts", query: "SELECT user_id, COUNT(*) FROM posts GROUP BY user_id;", diff: "intermediate" },
        { title: "User Activity Rank", query: "SELECT user_id, RANK() OVER (ORDER BY COUNT(*) DESC) as rank FROM posts GROUP BY user_id;", diff: "expert" }
      ]
    },
    {
      name: "Healthcare",
      tables: ["patients", "appointments", "doctors"],
      schema: "CREATE TABLE patients (id INT, name TEXT, age INT); CREATE TABLE appointments (id INT, patient_id INT, doctor_id INT, status TEXT);",
      data: "INSERT INTO patients VALUES (1, 'John Doe', 45); INSERT INTO appointments VALUES (10, 1, 101, 'Completed'), (11, 1, 101, 'Completed'), (12, 1, 102, 'Completed');",
      challenges: [
        { title: "Patient Demographics", query: "SELECT age, COUNT(*) FROM patients GROUP BY age;", diff: "intermediate" },
        { title: "Missed Appointments", query: "SELECT * FROM appointments WHERE status = 'Missed';", diff: "junior" },
        { title: "Top Doctors by Appointments", query: "SELECT doctor_id, COUNT(*) FROM appointments GROUP BY doctor_id HAVING COUNT(*) > 10;", diff: "advanced" }
      ]
    },
    {
      name: "Fintech",
      tables: ["transactions", "accounts", "users"],
      schema: "CREATE TABLE transactions (id INT, account_id INT, amount DECIMAL, type TEXT);",
      data: "INSERT INTO transactions VALUES (1, 101, 500, 'credit'), (2, 101, 200, 'debit');",
      challenges: [
        { title: "Balance Calculation", query: "SELECT SUM(CASE WHEN type='credit' THEN amount ELSE -amount END) FROM transactions;", diff: "advanced" },
        { title: "Large Transactions", query: "SELECT * FROM transactions WHERE ABS(amount) > 10000;", diff: "junior" }
      ]
    }
  ];

  for (let i = 1; i <= 100; i++) {
    const industry = industries[i % industries.length];
    const challenge = industry.challenges[i % industry.challenges.length];
    
    extra.push({
      id: `sql-exp-${i}`,
      title: `${industry.name}: ${challenge.title} #${i}`,
      difficulty: challenge.diff as any,
      companies: ["Amazon", "Uber", "Airbnb", "Spotify", "Netflix", "Google", "Apple"].slice(0, (i % 7) + 1),
      description: `[${industry.name} Industry] Your task is: ${challenge.title}. Work with tables like ${industry.tables.join(", ")}.`,
      schema: industry.schema,
      initialData: industry.data,
      expectedQuery: challenge.query,
      explanation: `Learn how to handle ${challenge.title} in a real-world ${industry.name} system.`,
      starterCode: "-- Write your SQL here\n",
      testCases: []
    });
  }
  return extra;
}

export const allSqlProblems = [...sqlProblems, ...generateSqlExpansion()];
