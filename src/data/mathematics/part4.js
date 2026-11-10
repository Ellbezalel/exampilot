const part4 = [
  {
    id: 61,
    topic: "Bearings",
    difficulty: "Medium",
    question: "A ship sails from Port A on a bearing of 045°. This bearing is equivalent to:",
    answers: [
      "North 45° West",
      "North 45° East",
      "South 45° East",
      "South 45° West"
    ],
    correct: "North 45° East",
    explanation: "A bearing of 045° means 45° east of north."
  },

  {
    id: 62,
    topic: "Bearings",
    difficulty: "Hard",
    question: "A town B is 20 km due East of town A. What is the bearing of B from A?",
    answers: ["000°", "090°", "180°", "270°"],
    correct: "090°",
    explanation: "Due East corresponds to a bearing of 090°."
  },

  {
    id: 63,
    topic: "Elevation and Depression",
    difficulty: "Hard",
    question: "From a point on level ground, the angle of elevation of the top of a tower is 30°. If the distance to the foot of the tower is 20 m, find the height.",
    answers: [
      "10√3 m",
      "20/√3 m",
      "20√3/3 m",
      "15 m"
    ],
    correct: "20/√3 m",
    explanation: "tan 30° = h/20, therefore h = 20/√3."
  },

  {
    id: 64,
    topic: "Elevation and Depression",
    difficulty: "Very Hard",
    question: "The angle of depression of a boat from the top of a 50 m cliff is 45°. How far is the boat from the foot of the cliff?",
    answers: ["25 m", "50 m", "75 m", "100 m"],
    correct: "50 m",
    explanation: "tan 45° = 50/x = 1, therefore x = 50 m."
  },

  {
    id: 65,
    topic: "Geometry",
    difficulty: "Medium",
    question: "The angles of a triangle are in the ratio 2:3:4. Find the largest angle.",
    answers: ["60°", "70°", "80°", "90°"],
    correct: "80°",
    explanation: "Largest angle = (4/9) × 180° = 80°."
  },

  {
    id: 66,
    topic: "Geometry",
    difficulty: "Hard",
    question: "Two angles are supplementary. One angle is 68°. Find the other.",
    answers: ["102°", "112°", "122°", "132°"],
    correct: "112°",
    explanation: "Supplementary angles sum to 180°. 180° − 68° = 112°."
  },

  {
    id: 67,
    topic: "Polygons",
    difficulty: "Hard",
    question: "Find the sum of the interior angles of a decagon.",
    answers: ["1260°", "1440°", "1620°", "1800°"],
    correct: "1440°",
    explanation: "(10 − 2) × 180° = 1440°."
  },

  {
    id: 68,
    topic: "Polygons",
    difficulty: "Very Hard",
    question: "Each interior angle of a regular polygon is 150°. How many sides does the polygon have?",
    answers: ["10", "11", "12", "15"],
    correct: "12",
    explanation: "Solving ((n−2)180)/n = 150 gives n = 12."
  },

  {
    id: 69,
    topic: "Circle Theorems",
    difficulty: "Very Hard",
    question: "A circle has a diameter AB and point C lies on the circumference. What is angle ACB?",
    answers: ["45°", "60°", "90°", "180°"],
    correct: "90°",
    explanation: "The angle in a semicircle is always 90°."
  },

  {
    id: 70,
    topic: "Construction",
    difficulty: "Hard",
    question: "Which instrument is NOT required for constructing the perpendicular bisector of a line segment?",
    answers: ["Compass", "Ruler", "Protractor", "Pencil"],
    correct: "Protractor",
    explanation: "A perpendicular bisector requires a compass, ruler, and pencil."
  },

  {
    id: 71,
    topic: "Mensuration",
    difficulty: "Medium",
    question: "A rectangular field measures 24 m by 18 m. Find its area.",
    answers: ["324 m²", "432 m²", "442 m²", "452 m²"],
    correct: "432 m²",
    explanation: "Area = length × breadth = 24 × 18 = 432 m²."
  },

  {
    id: 72,
    topic: "Mensuration",
    difficulty: "Hard",
    question: "The circumference of a circle is 44 cm. Find its radius. (π = 22/7)",
    answers: ["6 cm", "7 cm", "8 cm", "9 cm"],
    correct: "7 cm",
    explanation: "44 = 2πr = 2 × 22/7 × r, therefore r = 7 cm."
  },

  {
    id: 73,
    topic: "Mensuration",
    difficulty: "Hard",
    question: "Find the area of a circle of radius 14 cm.",
    answers: ["528 cm²", "606 cm²", "616 cm²", "636 cm²"],
    correct: "616 cm²",
    explanation: "Area = πr² = (22/7) × 14 × 14 = 616 cm²."
  },

  {
    id: 74,
    topic: "Mensuration",
    difficulty: "Medium",
    question: "Find the total surface area of a cube of edge 5 cm.",
    answers: ["100 cm²", "125 cm²", "150 cm²", "200 cm²"],
    correct: "150 cm²",
    explanation: "TSA = 6a² = 6 × 25 = 150 cm²."
  },

  {
    id: 75,
    topic: "Mensuration",
    difficulty: "Hard",
    question: "A closed cylinder has radius 7 cm and height 10 cm. Find its total surface area. (π = 22/7)",
    answers: ["748 cm²", "754 cm²", "760 cm²", "770 cm²"],
    correct: "748 cm²",
    explanation: "TSA = 2πr(r+h) = 748 cm²."
  },

  {
    id: 76,
    topic: "Mensuration",
    difficulty: "Very Hard",
    question: "A sphere has radius 6 cm. Find its surface area.",
    answers: ["144π", "72π", "36π", "216π"],
    correct: "144π",
    explanation: "Surface Area = 4πr² = 4π × 36 = 144π."
  },

  {
    id: 77,
    topic: "Mensuration",
    difficulty: "Medium",
    question: "Find the volume of a cube whose edge is 4 cm.",
    answers: ["16 cm³", "32 cm³", "64 cm³", "128 cm³"],
    correct: "64 cm³",
    explanation: "Volume = a³ = 4³ = 64 cm³."
  },

  {
    id: 78,
    topic: "Mensuration",
    difficulty: "Hard",
    question: "A cuboid measures 8 cm by 5 cm by 4 cm. Find its volume.",
    answers: ["120 cm³", "140 cm³", "160 cm³", "180 cm³"],
    correct: "160 cm³",
    explanation: "Volume = l × b × h = 8 × 5 × 4 = 160 cm³."
  },

  {
    id: 79,
    topic: "Mensuration",
    difficulty: "Very Hard",
    question: "Find the volume of a cylinder of radius 7 cm and height 12 cm. (π = 22/7)",
    answers: ["1,768 cm³", "1,848 cm³", "1,928 cm³", "2,016 cm³"],
    correct: "1,848 cm³",
    explanation: "Volume = πr²h = (22/7) × 7 × 7 × 12 = 1,848 cm³."
  },

  {
    id: 80,
    topic: "Mixed Mensuration",
    difficulty: "Very Hard",
    question: "A cone has radius 3 cm and height 4 cm. Find its volume.",
    answers: ["12π cm³", "16π cm³", "18π cm³", "24π cm³"],
    correct: "12π cm³",
    explanation: "Volume = (1/3)πr²h = (1/3)π(3²)(4) = 12π cm³."
  }
];

export default part4;