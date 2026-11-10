const part1 = [
  {
    id: 1,
    topic: "Number Bases",
    difficulty: "Medium",
    question: "Convert 11101₂ to base ten.",
    answers: ["27", "28", "29", "30"],
    correct: "29",
    explanation: "16 + 8 + 4 + 1 = 29"
  },

  {
    id: 2,
    topic: "Fractions and Decimals",
    difficulty: "Easy",
    question: "Express 0.625 as a fraction in its simplest form.",
    answers: ["5/8", "3/5", "2/3", "4/5"],
    correct: "5/8",
    explanation: "0.625 = 625/1000 = 5/8"
  },

  {
    id: 3,
    topic: "Sets",
    difficulty: "Easy",
    question: "If U = {1,2,3,4,5,6,7,8} and A = {2,4,6,8}, find A'.",
    answers: [
      "{1,3,5,7}",
      "{2,4,6,8}",
      "{1,2,3,5,7}",
      "{3,5,7}"
    ],
    correct: "{1,3,5,7}",
    explanation: "The complement contains elements in U that are not in A."
  },

  {
    id: 4,
    topic: "Algebraic Processes",
    difficulty: "Easy",
    question: "Simplify 3x + 5x − 2x.",
    answers: ["6x", "8x", "10x", "12x"],
    correct: "6x",
    explanation: "3x + 5x − 2x = 6x."
  },

  {
    id: 5,
    topic: "Quadratic Equations",
    difficulty: "Medium",
    question: "Solve x² − 5x + 6 = 0.",
    answers: ["1 and 6", "2 and 3", "3 and 5", "1 and 5"],
    correct: "2 and 3",
    explanation: "(x − 2)(x − 3) = 0, therefore x = 2 or x = 3."
  },

  {
    id: 6,
    topic: "Logarithms",
    difficulty: "Easy",
    question: "Evaluate log₁₀(1000).",
    answers: ["1", "2", "3", "4"],
    correct: "3",
    explanation: "10³ = 1000, therefore log₁₀(1000) = 3."
  },

  {
    id: 7,
    topic: "Trigonometric Ratios",
    difficulty: "Easy",
    question: "Find sin 30°.",
    answers: ["0", "1/2", "√2/2", "1"],
    correct: "1/2",
    explanation: "sin 30° = 1/2."
  },

  {
    id: 8,
    topic: "Probability",
    difficulty: "Easy",
    question: "A die is tossed once. Find the probability of obtaining an even number.",
    answers: ["1/6", "1/3", "1/2", "2/3"],
    correct: "1/2",
    explanation: "Even numbers are 2, 4, and 6. Therefore 3/6 = 1/2."
  },

  {
    id: 9,
    topic: "Differentiation",
    difficulty: "Medium",
    question: "Differentiate y = 5x².",
    answers: ["10x", "5x", "2x", "10x²"],
    correct: "10x",
    explanation: "dy/dx = 5(2x) = 10x."
  },

  {
    id: 10,
    topic: "Financial Mathematics",
    difficulty: "Easy",
    question: "Find the simple interest on ₦5,000 for 2 years at 10% per annum.",
    answers: ["₦500", "₦1,000", "₦1,500", "₦2,000"],
    correct: "₦1,000",
    explanation: "SI = PRT/100 = (5000 × 10 × 2)/100 = ₦1,000."
  },

  {
    id: 11,
    topic: "Sets and Venn Diagrams",
    difficulty: "Easy",
    question: "In a class of 40 students, 25 study Mathematics and 18 study Physics. If 10 study both subjects, how many study Mathematics only?",
    answers: ["10", "15", "25", "30"],
    correct: "15",
    explanation: "Mathematics only = 25 − 10 = 15."
  },

  {
    id: 12,
    topic: "Sets and Venn Diagrams",
    difficulty: "Medium",
    question: "Given A = {1,2,3,4,5} and B = {3,4,5,6,7}, find A ∩ B.",
    answers: [
      "{1,2}",
      "{3,4,5}",
      "{6,7}",
      "{1,2,6,7}"
    ],
    correct: "{3,4,5}",
    explanation: "Intersection contains common elements."
  },

  {
    id: 13,
    topic: "Sets and Venn Diagrams",
    difficulty: "Medium",
    question: "Given A = {2,4,6,8}, find n(A).",
    answers: ["2", "3", "4", "5"],
    correct: "4",
    explanation: "There are 4 elements in the set."
  },

  {
    id: 14,
    topic: "Sets and Venn Diagrams",
    difficulty: "Hard",
    question: "In a survey of 60 students, 35 like Football, 30 like Basketball and 12 like neither game. How many like both games?",
    answers: ["5", "10", "17", "23"],
    correct: "17",
    explanation: "48 = 35 + 30 − x; therefore x = 17."
  },

  {
    id: 15,
    topic: "Sets and Venn Diagrams",
    difficulty: "Easy",
    question: "If A = {2,4,6,8} and B = {1,3,5,7}, find A ∪ B.",
    answers: [
      "{2,4,6,8}",
      "{1,3,5,7}",
      "{1,2,3,4,5,6,7,8}",
      "{1,2}"
    ],
    correct: "{1,2,3,4,5,6,7,8}",
    explanation: "Union contains all elements in both sets."
  },

  {
    id: 16,
    topic: "Sets and Venn Diagrams",
    difficulty: "Medium",
    question: "If n(A)=20, n(B)=15 and n(A∩B)=7, find n(A∪B).",
    answers: ["28", "35", "42", "13"],
    correct: "28",
    explanation: "n(A∪B) = 20 + 15 − 7 = 28."
  },

  {
    id: 17,
    topic: "Algebra",
    difficulty: "Easy",
    question: "Simplify 5x + 3x − 2x.",
    answers: ["4x", "6x", "8x", "10x"],
    correct: "6x",
    explanation: "5x + 3x − 2x = 6x."
  },

  {
    id: 18,
    topic: "Algebra",
    difficulty: "Medium",
    question: "Factorize x² + 7x + 12.",
    answers: [
      "(x+2)(x+6)",
      "(x+3)(x+4)",
      "(x−3)(x−4)",
      "(x+1)(x+12)"
    ],
    correct: "(x+3)(x+4)",
    explanation: "3 and 4 multiply to 12 and add to 7."
  },

  {
    id: 19,
    topic: "Change of Subject",
    difficulty: "Medium",
    question: "Make x the subject of y = 3x + 5.",
    answers: [
      "x = y + 5",
      "x = (y−5)/3",
      "x = 3y − 5",
      "x = 5 − y"
    ],
    correct: "x = (y−5)/3",
    explanation: "Subtract 5 and divide by 3."
  },

  {
    id: 20,
    topic: "Simultaneous Equations",
    difficulty: "Hard",
    question: "Solve simultaneously: x + y = 10 and x − y = 2.",
    answers: [
      "x=6, y=4",
      "x=4, y=6",
      "x=8, y=2",
      "x=5, y=5"
    ],
    correct: "x=6, y=4",
    explanation: "Adding gives 2x = 12, hence x = 6 and y = 4."
  }
];

export default part1;