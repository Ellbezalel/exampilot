import englishQuestions from "./english/index";
import mathematicsQuestions from "./mathematics/index";
import physicsQuestions from "./physics/index";
import chemistryQuestions from "./chemistry/index";
import biologyQuestions from "./biology/index";
import economicsQuestions from "./economics/index";
import crsQuestions from "./CRS/index";
import irsQuestions from "./IRS/index";
import geographyQuestions from "./geography/index";
import governmentQuestions from "./government/index";

export const QUESTIONS = {
  English: englishQuestions,
  Mathematics: mathematicsQuestions,
  Physics: physicsQuestions,
  Chemistry: chemistryQuestions,
  Biology: biologyQuestions,
  Economics: economicsQuestions,
  CRS: crsQuestions,
  IRS: irsQuestions,
  Geography: geographyQuestions,
  Government: governmentQuestions,
};

export const ALL_SUBJECTS = Object.keys(QUESTIONS);
