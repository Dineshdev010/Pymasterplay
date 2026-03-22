/**
 * ============================================================
 * DATABASE SEEDING SCRIPT
 * Usage: node seedProblems.js
 * 
 * Instructions:
 * 1. Gather a large JSON array of your 500 problems.
 * 2. Put your Supabase URL and SERVICE_ROLE KEY here.
 * 3. Run this script once to instantly upload 500 problems to your Supabase problems table!
 * ============================================================
 */

// const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_SERVICE_KEY = 'YOUR_SUPER_SECRET_SERVICE_ROLE_KEY';

// const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Example of the massive array you would load:
const problemsBatch = [
  {
    id: "two-sum-advanced",
    title: "Two Sum Advanced",
    difficulty: "basic",
    description: "Given an array of integers... (expand)",
    constraints: ["1 <= n <= 10^4"],
    starter_code: "def twoSum(nums, target):\n    pass",
    solution: "def twoSum(nums, target):\n    ...",
    solution_explanation: "Use a hashmap",
    examples: [{ input: "nums=[2,7], target=9", output: "[0,1]" }],
    test_cases: [{ input: "nums=[2,7], target=9", expected: "[0,1]" }]
  }
  // ... 499 more problems ...
];

async function seedDatabase() {
  console.log("Preparing to upload " + problemsBatch.length + " problems...");
  
  // UNCOMMENT when ready:
  /*
  const { data, error } = await supabase
    .from('problems')
    .upsert(problemsBatch);

  if (error) {
    console.error("Error inserting problems:", error);
  } else {
    console.log("Successfully seeded database!");
  }
  */
}

seedDatabase();
