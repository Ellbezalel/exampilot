const part2 = [
  {
    id: 21,
    topic: "Quadratic Equations",
    difficulty: "Easy",
    question: "Solve x² − 9 = 0.",
    answers: ["x = 9", "x = ±3", "x = ±9", "x = 3"],
    correct: "x = ±3",
    explanation: "x² = 9, therefore x = ±3."
  },

  {
    id: 22,
    topic: "Quadratic Equations",
    difficulty: "Easy",
    question: "Solve x² − 7x + 12 = 0.",
    answers: ["2 and 5", "3 and 4", "1 and 12", "2 and 6"],
    correct: "3 and 4",
    explanation: "(x − 3)(x − 4) = 0."
  },

  {
    id: 23,
    topic: "Quadratic Equations",
    difficulty: "Medium",
    question: "Find the roots of x² + x − 6 = 0.",
    answers: ["2 and 3", "-2 and 3", "-3 and 2", "B and C"],
    correct: "B and C",
    explanation: "(x + 3)(x − 2) = 0, so the roots are -3 and 2."
  },

  {
    id: 24,
    topic: "Quadratic Equations",
    difficulty: "Hard",
    question: "Find the value of k if x = 2 is a root of x² − kx + 6 = 0.",
    answers: ["3", "4", "5", "6"],
    correct: "5",
    explanation: "Substituting x = 2 gives 10 − 2k = 0, therefore k = 5."
  },

  {
    id: 25,
    topic: "Indices",
    difficulty: "Easy",
    question: "Simplify 2³ × 2⁴.",
    answers: ["2⁷", "2¹²", "4⁷", "8⁴"],
    correct: "2⁷",
    explanation: "Add the exponents: 2³ × 2⁴ = 2⁷."
  },

  {
    id: 26,
    topic: "Indices",
    difficulty: "Easy",
    question: "Evaluate 5⁰.",
    answers: ["0", "1", "5", "25"],
    correct: "1",
    explanation: "Any non-zero number raised to the power zero equals 1."
  },

  {
    id: 27,
    topic: "Indices",
    difficulty: "Medium",
    question: "Simplify 3⁵ ÷ 3².",
    answers: ["3³", "3⁷", "9³", "3²"],
    correct: "3³",
    explanation: "Subtract the exponents: 3⁵ ÷ 3² = 3³."
  },

  {
    id: 28,
    topic: "Logarithms",
    difficulty: "Easy",
    question: "Evaluate log₁₀(100).",
    answers: ["1", "2", "10", "100"],
    correct: "2",
    explanation: "10² = 100, therefore log₁₀(100) = 2."
  },

  {
    id: 29,
    topic: "Logarithms",
    difficulty: "Medium",
    question: "Evaluate log₂(8).",
    answers: ["2", "3", "4", "8"],
    correct: "3",
    explanation: "2³ = 8."
  },

  {
    id: 30,
    topic: "Logarithms",
    difficulty: "Hard",
    question: "Simplify log 50 + log 2.",
    answers: ["log 52", "log 48", "log 100", "log 25"],
    correct: "log 100",
    explanation: "log a + log b = log(ab), therefore log 50 + log 2 = log 100."
  },

  {
    id: 31,
    topic: "Variation",
    difficulty: "Easy",
    question: "If y varies directly as x and y = 12 when x = 3, find y when x = 5.",
    answers: ["15", "18", "20", "24"],
    correct: "20",
    explanation: "y = kx, k = 4, therefore y = 4 × 5 = 20."
  },

  {
    id: 32,
    topic: "Variation",
    difficulty: "Medium",
    question: "If y varies inversely as x and y = 8 when x = 2, find y when x = 4.",
    answers: ["2", "4", "8", "16"],
    correct: "4",
    explanation: "yx = constant = 16. Therefore y = 16/4 = 4."
  },

  {
    id: 33,
    topic: "Variation",
    difficulty: "Hard",
    question: "P varies directly as Q². If P = 45 when Q = 3, find P when Q = 5.",
    answers: ["75", "100", "125", "150"],
    correct: "125",
    explanation: "P = kQ², k = 5. Therefore P = 5 × 25 = 125."
  },

  {
    id: 34,
    topic: "Sequences and Series",
    difficulty: "Easy",
    question: "Find the next term: 2, 5, 8, 11, ___.",
    answers: ["12", "13", "14", "15"],
    correct: "14",
    explanation: "Common difference = 3."
  },

  {
    id: 35,
    topic: "Sequences and Series",
    difficulty: "Medium",
    question: "Find the 10th term of the arithmetic progression 3, 7, 11, 15, ...",
    answers: ["35", "37", "39", "41"],
    correct: "39",
    explanation: "T₁₀ = 3 + 9(4) = 39."
  },

  {
    id: 36,
    topic: "Sequences and Series",
    difficulty: "Medium",
    question: "Find the sum of the first 10 natural numbers.",
    answers: ["45", "50", "55", "60"],
    correct: "55",
    explanation: "S = n(n + 1)/2 = 55."
  },

  {
    id: 37,
    topic: "Binomial Expansion",
    difficulty: "Easy",
    question: "Expand (x + 2)².",
    answers: [
      "x² + 2x + 4",
      "x² + 4x + 4",
      "x² + 4",
      "x² + 2"
    ],
    correct: "x² + 4x + 4",
    explanation: "(x + 2)² = x² + 4x + 4."
  },

  {
    id: 38,
    topic: "Binomial Expansion",
    difficulty: "Medium",
    question: "Expand (x + 3)(x + 4).",
    answers: [
      "x² + 7x + 12",
      "x² + 12x + 7",
      "x² + 4x + 3",
      "x² + 12"
    ],
    correct: "x² + 7x + 12",
    explanation: "Multiply the brackets and collect like terms."
  },

  {
    id: 39,
    topic: "Binomial Expansion",
    difficulty: "Hard",
    question: "Find the coefficient of x in (2 + x)².",
    answers: ["2", "4", "6", "8"],
    correct: "4",
    explanation: "(2 + x)² = 4 + 4x + x²."
  },

  {
    id: 40,
    topic: "Series",
    difficulty: "Hard",
    question: "Find the sum 2 + 4 + 8 + 16 + 32.",
    answers: ["60", "62", "64", "68"],
    correct: "62",
    explanation: "2 + 4 + 8 + 16 + 32 = 62."
  }
];

export default part2;
