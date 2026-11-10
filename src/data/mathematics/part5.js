const part5 = [
  {
    id: 81,
    topic: "Probability",
    difficulty: "Medium",
    question: "A bag contains 5 red balls, 3 blue balls, and 2 green balls. One ball is selected at random. What is the probability that it is blue?",
    answers: ["1/10", "3/10", "1/3", "3/5"],
    correct: "3/10",
    explanation: "Total balls = 10. Blue balls = 3. Probability = 3/10."
  },

  {
    id: 82,
    topic: "Probability",
    difficulty: "Hard",
    question: "Two fair dice are thrown simultaneously. Find the probability that the sum is 8.",
    answers: ["5/36", "4/36", "6/36", "8/36"],
    correct: "5/36",
    explanation: "Possible outcomes are (2,6), (3,5), (4,4), (5,3), and (6,2). Therefore 5/36."
  },

  {
    id: 83,
    topic: "Probability",
    difficulty: "Very Hard",
    question: "A card is selected from a standard deck of 52 cards. Find the probability of drawing a king or a queen.",
    answers: ["1/13", "2/13", "4/13", "8/13"],
    correct: "2/13",
    explanation: "There are 4 kings and 4 queens, making 8 favorable outcomes. 8/52 = 2/13."
  },

  {
    id: 84,
    topic: "Permutations and Combinations",
    difficulty: "Medium",
    question: "Find the value of 5!.",
    answers: ["20", "60", "120", "240"],
    correct: "120",
    explanation: "5! = 5 × 4 × 3 × 2 × 1 = 120."
  },

  {
    id: 85,
    topic: "Permutations and Combinations",
    difficulty: "Hard",
    question: "How many different ways can 4 students be arranged in a row?",
    answers: ["12", "16", "24", "48"],
    correct: "24",
    explanation: "Number of arrangements = 4! = 24."
  },

  {
    id: 86,
    topic: "Permutations",
    difficulty: "Very Hard",
    question: "Evaluate 7P3.",
    answers: ["35", "105", "210", "840"],
    correct: "210",
    explanation: "7P3 = 7! / 4! = 7 × 6 × 5 = 210."
  },

  {
    id: 87,
    topic: "Combinations",
    difficulty: "Medium",
    question: "Evaluate 5C2.",
    answers: ["5", "10", "15", "20"],
    correct: "10",
    explanation: "5C2 = 5!/(2!3!) = 10."
  },

  {
    id: 88,
    topic: "Combinations",
    difficulty: "Hard",
    question: "A committee of 3 is to be selected from 8 people. How many committees are possible?",
    answers: ["24", "36", "56", "64"],
    correct: "56",
    explanation: "8C3 = 56."
  },

  {
    id: 89,
    topic: "Permutations",
    difficulty: "Very Hard",
    question: "In how many ways can a chairman and secretary be chosen from 10 students?",
    answers: ["45", "90", "100", "120"],
    correct: "90",
    explanation: "The positions are different, so 10P2 = 10 × 9 = 90."
  },

  {
    id: 90,
    topic: "Combinations",
    difficulty: "Very Hard",
    question: "From a group of 6 men and 4 women, a team of 3 men and 2 women is to be formed. How many different teams are possible?",
    answers: ["60", "100", "120", "200"],
    correct: "120",
    explanation: "6C3 × 4C2 = 20 × 6 = 120."
  },

  {
    id: 91,
    topic: "Statistics",
    difficulty: "Medium",
    question: "Find the mean of 4, 6, 8, 10, 12.",
    answers: ["6", "7", "8", "9"],
    correct: "8",
    explanation: "Mean = (4 + 6 + 8 + 10 + 12)/5 = 8."
  },

  {
    id: 92,
    topic: "Measures of Central Tendency",
    difficulty: "Hard",
    question: "Find the median of 2, 5, 7, 9, 11, 15, 18.",
    answers: ["7", "8", "9", "11"],
    correct: "9",
    explanation: "There are 7 observations. The middle value is the 4th term, which is 9."
  },

  {
    id: 93,
    topic: "Dispersion",
    difficulty: "Very Hard",
    question: "Find the range of 12, 18, 25, 31, 40.",
    answers: ["18", "22", "28", "32"],
    correct: "28",
    explanation: "Range = Highest − Lowest = 40 − 12 = 28."
  },

  {
    id: 94,
    topic: "Differentiation",
    difficulty: "Medium",
    question: "Differentiate y = 7x³.",
    answers: ["7x²", "14x²", "21x²", "28x²"],
    correct: "21x²",
    explanation: "dy/dx = 7(3x²) = 21x²."
  },

  {
    id: 95,
    topic: "Differentiation",
    difficulty: "Hard",
    question: "Differentiate y = 4x² − 3x + 7.",
    answers: ["8x − 3", "8x + 3", "4x − 3", "8x + 7"],
    correct: "8x − 3",
    explanation: "The derivative of 4x² − 3x + 7 is 8x − 3."
  },

  {
    id: 96,
    topic: "Integration",
    difficulty: "Hard",
    question: "Evaluate ∫6x dx.",
    answers: ["3x² + C", "6x + C", "x² + C", "12x + C"],
    correct: "3x² + C",
    explanation: "∫6x dx = 6(x²/2) + C = 3x² + C."
  },

  {
    id: 97,
    topic: "Financial Mathematics",
    difficulty: "Very Hard",
    question: "Calculate the simple interest on ₦25,000 for 4 years at 8% per annum.",
    answers: ["₦6,000", "₦7,000", "₦8,000", "₦9,000"],
    correct: "₦8,000",
    explanation: "SI = (PRT)/100 = (25,000 × 8 × 4)/100 = ₦8,000."
  },

  {
    id: 98,
    topic: "Vectors",
    difficulty: "Very Hard",
    question: "Given a = (2,3) and b = (4,-1), find a + b.",
    answers: ["(6,2)", "(6,4)", "(2,2)", "(8,2)"],
    correct: "(6,2)",
    explanation: "(2,3) + (4,-1) = (6,2)."
  },

  {
    id: 99,
    topic: "Transformations",
    difficulty: "Hard",
    question: "A point (3,5) is translated by the vector (2,-1). Find its image.",
    answers: ["(5,4)", "(1,4)", "(5,6)", "(2,4)"],
    correct: "(5,4)",
    explanation: "Add the vector components: (3+2, 5-1) = (5,4)."
  },

  {
    id: 100,
    topic: "Financial Mathematics",
    difficulty: "Very Hard",
    question: "An amount of ₦10,000 is invested at 10% simple interest per annum for 3 years. Find the total amount at the end of the period.",
    answers: ["₦11,000", "₦12,000", "₦13,000", "₦14,000"],
    correct: "₦13,000",
    explanation: "SI = ₦3,000. Total Amount = ₦10,000 + ₦3,000 = ₦13,000."
  }
];

export default part5;