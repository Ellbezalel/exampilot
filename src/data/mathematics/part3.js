const part3 = [
  {
    id: 41,
    topic: "Functions",
    difficulty: "Medium",
    question: "Given f(x) = 3x² − 2x + 1, find f(3).",
    answers: ["20", "22", "24", "28"],
    correct: "22",
    explanation: "f(3) = 3(3²) − 2(3) + 1 = 27 − 6 + 1 = 22."
  },

  {
    id: 42,
    topic: "Functions",
    difficulty: "Hard",
    question: "If f(x) = 2x + 3 and g(x) = x², find (g∘f)(2).",
    answers: ["25", "36", "49", "64"],
    correct: "49",
    explanation: "f(2) = 7, therefore g(7) = 7² = 49."
  },

  {
    id: 43,
    topic: "Functions",
    difficulty: "Hard",
    question: "Find the inverse of f(x) = 4x − 5.",
    answers: [
      "(x + 5)/4",
      "(x − 5)/4",
      "(5 − x)/4",
      "4x + 5"
    ],
    correct: "(x + 5)/4",
    explanation: "Let y = 4x − 5. Then x = (y + 5)/4. Therefore f⁻¹(x) = (x + 5)/4."
  },

  {
    id: 44,
    topic: "Relations",
    difficulty: "Medium",
    question: "Given A={1,2,3}, B={2,4,6} and R={(1,2),(2,4),(3,6)}, the relation is:",
    answers: ["One-to-one", "Many-to-one", "One-to-many", "Many-to-many"],
    correct: "One-to-one",
    explanation: "Each element in A corresponds to exactly one distinct element in B."
  },

  {
    id: 45,
    topic: "Functions",
    difficulty: "Hard",
    question: "Given f(x)=x²−5x+6, find f(-2).",
    answers: ["12", "16", "20", "24"],
    correct: "20",
    explanation: "f(-2)=(-2)²−5(-2)+6=4+10+6=20."
  },

  {
    id: 46,
    topic: "Matrices",
    difficulty: "Medium",
    question: "Given A = [[2,3],[1,4]], find the trace of A.",
    answers: ["4", "5", "6", "7"],
    correct: "6",
    explanation: "Trace = sum of principal diagonal elements = 2 + 4 = 6."
  },

  {
    id: 47,
    topic: "Matrices",
    difficulty: "Hard",
    question: "If A=[[3,2],[1,5]] and B=[[2,1],[4,3]], find A+B.",
    answers: [
      "[[5,3],[5,8]]",
      "[[6,2],[4,8]]",
      "[[5,1],[5,8]]",
      "[[1,1],[3,2]]"
    ],
    correct: "[[5,3],[5,8]]",
    explanation: "Add corresponding entries of the matrices."
  },

  {
    id: 48,
    topic: "Matrices",
    difficulty: "Hard",
    question: "Given A=[[1,2],[3,4]], find 2A.",
    answers: [
      "[[1,4],[3,8]]",
      "[[2,4],[6,8]]",
      "[[2,2],[6,4]]",
      "[[4,8],[12,16]]"
    ],
    correct: "[[2,4],[6,8]]",
    explanation: "Multiply every element of the matrix by 2."
  },

  {
    id: 49,
    topic: "Determinants",
    difficulty: "Hard",
    question: "Find the determinant of [[5,2],[3,1]].",
    answers: ["-1", "1", "5", "11"],
    correct: "-1",
    explanation: "det(A) = ad − bc = (5×1) − (2×3) = -1."
  },

  {
    id: 50,
    topic: "Determinants",
    difficulty: "Very Hard",
    question: "If |x 2; 3 4| = 10, find x.",
    answers: ["3", "4", "5", "6"],
    correct: "4",
    explanation: "4x − 6 = 10, therefore 4x = 16 and x = 4."
  },

  {
    id: 51,
    topic: "Linear Inequalities",
    difficulty: "Medium",
    question: "Solve 3x − 5 > 10.",
    answers: ["x > 3", "x > 5", "x < 5", "x < 3"],
    correct: "x > 5",
    explanation: "3x > 15, therefore x > 5."
  },

  {
    id: 52,
    topic: "Linear Inequalities",
    difficulty: "Hard",
    question: "Solve 2x + 3 ≤ 11.",
    answers: ["x ≤ 4", "x ≥ 4", "x < 4", "x > 4"],
    correct: "x ≤ 4",
    explanation: "2x ≤ 8, therefore x ≤ 4."
  },

  {
    id: 53,
    topic: "Linear Inequalities",
    difficulty: "Very Hard",
    question: "Solve -4x + 8 > 0.",
    answers: ["x < 2", "x > 2", "x ≤ 2", "x ≥ 2"],
    correct: "x < 2",
    explanation: "When dividing by -4, reverse the inequality sign."
  },

  {
    id: 54,
    topic: "Coordinate Geometry",
    difficulty: "Medium",
    question: "Find the distance between (2,3) and (6,6).",
    answers: ["4", "5", "6", "7"],
    correct: "5",
    explanation: "√[(6−2)² + (6−3)²] = √(16+9) = √25 = 5."
  },

  {
    id: 55,
    topic: "Coordinate Geometry",
    difficulty: "Hard",
    question: "Find the midpoint of the line joining (2,1) and (8,7).",
    answers: ["(5,4)", "(4,5)", "(6,4)", "(5,3)"],
    correct: "(5,4)",
    explanation: "Midpoint = ((2+8)/2, (1+7)/2) = (5,4)."
  },

  {
    id: 56,
    topic: "Coordinate Geometry",
    difficulty: "Very Hard",
    question: "Find the gradient of the line joining (2,3) and (8,15).",
    answers: ["1", "2", "3", "4"],
    correct: "2",
    explanation: "m = (15−3)/(8−2) = 12/6 = 2."
  },

  {
    id: 57,
    topic: "Trigonometry",
    difficulty: "Medium",
    question: "Evaluate sin 45°.",
    answers: ["1/2", "√3/2", "√2/2", "1"],
    correct: "√2/2",
    explanation: "sin 45° = √2/2."
  },

  {
    id: 58,
    topic: "Trigonometry",
    difficulty: "Hard",
    question: "A ladder 10m long leans against a wall. If the foot of the ladder is 6m from the wall, how high does it reach?",
    answers: ["6m", "8m", "10m", "12m"],
    correct: "8m",
    explanation: "Using Pythagoras: h² + 6² = 10², therefore h = 8m."
  },

  {
    id: 59,
    topic: "Trigonometry",
    difficulty: "Very Hard",
    question: "In a triangle, side a = 10 cm is opposite 30° and side b is opposite 60°. Find b.",
    answers: ["10√3", "5√3", "15", "20"],
    correct: "10√3",
    explanation: "Using the Sine Rule gives b = 10√3."
  },

  {
    id: 60,
    topic: "Trigonometry",
    difficulty: "Very Hard",
    question: "Two sides of a triangle are 5 cm and 7 cm with an included angle of 60°. Find the third side.",
    answers: ["√39", "√49", "√74", "√60"],
    correct: "√39",
    explanation: "Using the Cosine Rule: c² = 25 + 49 − 70(1/2) = 39, so c = √39."
  }
];

export default part3;