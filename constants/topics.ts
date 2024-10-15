export const topics = [
  "Measurements and Uncertainties",
  "Mechanics",
  "Thermal Physics",
  "Waves",
  "Electricity and Magnetism",
  "Circular Motion and Gravitation",
  "Atomic, Nuclear and Particle Physics",
  "Energy Production",
];

export type typeMockQuestionCount =  {
  "Measurements and Uncertainties": number;
  "Mechanics": number;
  "Thermal Physics" : number;
  "Waves":number;
  "Electricity and Magnetism":number;
  "Circular Motion and Gravitation":number;
  "Atomic, Nuclear and Particle Physics":number;
  "Energy Production":number; 
}

export type Topic =
  | "Measurements and Uncertainties"
  | "Mechanics"
  | "Thermal Physics"
  | "Waves"
  | "Electricity and Magnetism"
  | "Circular Motion and Gravitation"
  | "Atomic, Nuclear and Particle Physics"
  | "Energy Production";

export const mockQuestionCount: typeMockQuestionCount = {
  "Measurements and Uncertainties": 2,
  "Mechanics": 5,
  "Thermal Physics": 3,
  "Waves": 5,
  "Electricity and Magnetism": 5,
  "Circular Motion and Gravitation": 2,
  "Atomic, Nuclear and Particle Physics": 4,
  "Energy Production": 2,
}