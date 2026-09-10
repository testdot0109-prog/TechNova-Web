// Mock Data for TechNova Prototype
// This represents realistic government workforce data for demo purposes

export const userProfile = {
  id: "EMP001",
  name: "Ananya Sharma",
  email: "ananya.sharma@stats.gov.in",
  designation: "Statistical Officer",
  department: "National Statistical Department",
  experience: 5,
  targetRole: "Senior Statistical Analyst",
  roleReadiness: 67,
  joinDate: "2021-03-15"
};

export const competencies = {
  statistical: {
    name: "Statistical",
    score: 82,
    skills: [
      { name: "Survey Design", current: 85, required: 80 },
      { name: "Sampling", current: 88, required: 85 },
      { name: "National Accounts", current: 78, required: 75 },
      { name: "Price Statistics", current: 80, required: 75 },
      { name: "Labour Statistics", current: 82, required: 80 },
      { name: "Agricultural Statistics", current: 75, required: 70 },
      { name: "Industrial Statistics", current: 79, required: 75 },
      { name: "SDG Indicators", current: 84, required: 80 },
      { name: "Metadata Standards", current: 86, required: 85 },
      { name: "Data Quality Frameworks", current: 55, required: 70 }
    ]
  },
  technical: {
    name: "Technical",
    score: 51,
    skills: [
      { name: "Python", current: 35, required: 70 },
      { name: "R", current: 45, required: 65 },
      { name: "SQL", current: 48, required: 70 },
      { name: "Stata", current: 52, required: 60 },
      { name: "SPSS", current: 58, required: 65 },
      { name: "SAS", current: 40, required: 55 },
      { name: "GIS", current: 25, required: 60 },
      { name: "Data Visualization", current: 62, required: 70 },
      { name: "AI/ML", current: 30, required: 65 },
      { name: "Cloud Computing", current: 28, required: 50 },
      { name: "APIs", current: 35, required: 55 },
      { name: "Open Data", current: 55, required: 60 }
    ]
  },
  digitalGovernance: {
    name: "Digital Governance",
    score: 64,
    skills: [
      { name: "Cybersecurity", current: 58, required: 70 },
      { name: "Data Privacy", current: 65, required: 75 },
      { name: "Digital Signatures", current: 70, required: 65 },
      { name: "Government Cloud", current: 55, required: 65 },
      { name: "Digital Public Infrastructure", current: 68, required: 70 }
    ]
  },
  managerial: {
    name: "Managerial",
    score: 76,
    skills: [
      { name: "Leadership", current: 78, required: 75 },
      { name: "Communication", current: 82, required: 80 },
      { name: "Project Management", current: 75, required: 75 },
      { name: "Ethics", current: 85, required: 80 },
      { name: "Decision Making", current: 74, required: 75 },
      { name: "Change Management", current: 70, required: 70 }
    ]
  }
};

export const skillGaps = [
  { skill: "Python", current: 35, required: 70, gap: 35, priority: "High", category: "Technical" },
  { skill: "GIS", current: 25, required: 60, gap: 35, priority: "High", category: "Technical" },
  { skill: "SQL", current: 48, required: 70, gap: 22, priority: "High", category: "Technical" },
  { skill: "Data Quality", current: 55, required: 70, gap: 15, priority: "Medium", category: "Statistical" },
  { skill: "AI/ML", current: 30, required: 65, gap: 35, priority: "High", category: "Technical" },
  { skill: "Cloud Computing", current: 28, required: 50, gap: 22, priority: "Medium", category: "Technical" },
  { skill: "Cybersecurity", current: 58, required: 70, gap: 12, priority: "Medium", category: "Digital Governance" },
  { skill: "R", current: 45, required: 65, gap: 20, priority: "Medium", category: "Technical" }
];

export const recommendedCourses = [
  {
    id: 1,
    title: "Python for Data Analysis",
    provider: "iGOT Karmayogi — Demo Catalogue",
    duration: "12 hours",
    aiMatch: 94,
    reason: "Recommended because Python is your highest technical skill gap (35 points). Critical for Senior Statistical Analyst role.",
    skills: ["Python", "Data Analysis"],
    level: "Intermediate"
  },
  {
    id: 2,
    title: "GIS Fundamentals for Government Analytics",
    provider: "iGOT Karmayogi — Demo Catalogue",
    duration: "8 hours",
    aiMatch: 89,
    reason: "GIS is essential for spatial statistical analysis. Your current level (25) needs significant improvement.",
    skills: ["GIS", "Spatial Analysis"],
    level: "Beginner"
  },
  {
    id: 3,
    title: "Advanced Statistical Methods",
    provider: "NSSTA / TPAC — Demo Catalogue",
    duration: "16 hours",
    aiMatch: 87,
    reason: "Builds on your strong statistical foundation (82%) to prepare for senior-level analysis.",
    skills: ["Statistical Methods", "Advanced Analytics"],
    level: "Advanced"
  },
  {
    id: 4,
    title: "SQL for Government Data Analytics",
    provider: "iGOT Karmayogi — Demo Catalogue",
    duration: "10 hours",
    aiMatch: 84,
    reason: "SQL proficiency (currently 48) is crucial for accessing and analyzing large government datasets.",
    skills: ["SQL", "Database Management"],
    level: "Intermediate"
  },
  {
    id: 5,
    title: "Data Quality Frameworks in Official Statistics",
    provider: "NSSTA / TPAC — Demo Catalogue",
    duration: "6 hours",
    aiMatch: 82,
    reason: "Addresses your Data Quality gap (55 → 70). Essential for ensuring statistical output reliability.",
    skills: ["Data Quality", "Quality Assurance"],
    level: "Intermediate"
  },
  {
    id: 6,
    title: "AI/ML Fundamentals for Statistical Officers",
    provider: "iGOT Karmayogi — Demo Catalogue",
    duration: "14 hours",
    aiMatch: 80,
    reason: "Emerging competency area. AI/ML skills will future-proof your statistical analysis capabilities.",
    skills: ["AI/ML", "Machine Learning"],
    level: "Beginner"
  }
];

export const quizQuestions = [
  {
    id: 1,
    question: "What is the primary advantage of stratified sampling over simple random sampling?",
    options: [
      "It is easier to implement",
      "It ensures representation from all subgroups of the population",
      "It requires a smaller sample size",
      "It eliminates sampling error completely"
    ],
    correctAnswer: 1,
    explanation: "Stratified sampling divides the population into homogeneous subgroups (strata) and samples from each, ensuring all important subgroups are represented in the sample. This reduces sampling error for subgroup estimates.",
    source: "Sampling_Methodology.pdf — Page 12",
    topic: "Sampling"
  },
  {
    id: 2,
    question: "Which of the following is NOT a common source of non-sampling error in surveys?",
    options: [
      "Measurement error",
      "Non-response bias",
      "Sampling variability",
      "Processing error"
    ],
    correctAnswer: 2,
    explanation: "Sampling variability is a sampling error, not a non-sampling error. Non-sampling errors include measurement error, non-response bias, processing errors, and coverage errors.",
    source: "Sampling_Methodology.pdf — Page 18",
    topic: "Data Quality"
  },
  {
    id: 3,
    question: "What does the term 'sampling frame' refer to?",
    options: [
      "The time period during which sampling is conducted",
      "The list or database from which sample units are selected",
      "The statistical method used for sampling",
      "The final sample size achieved"
    ],
    correctAnswer: 1,
    explanation: "A sampling frame is the actual source of information (list, map, database) from which the sample is drawn. It should ideally include all members of the target population.",
    source: "Sampling_Methodology.pdf — Page 8",
    topic: "Survey Design"
  },
  {
    id: 4,
    question: "In cluster sampling, what is the primary trade-off?",
    options: [
      "Higher precision but higher cost",
      "Lower cost but potentially higher sampling error",
      "Faster data collection but lower response rates",
      "Simpler analysis but more complex design"
    ],
    correctAnswer: 1,
    explanation: "Cluster sampling reduces data collection costs by grouping units geographically or administratively, but units within clusters tend to be similar, which can increase sampling error compared to simple random sampling of the same size.",
    source: "Sampling_Methodology.pdf — Page 22",
    topic: "Sampling"
  },
  {
    id: 5,
    question: "Which data quality dimension refers to the closeness of estimates to the true values?",
    options: [
      "Timeliness",
      "Consistency",
      "Accuracy",
      "Accessibility"
    ],
    correctAnswer: 2,
    explanation: "Accuracy refers to how close survey estimates are to the true population values. It is affected by both sampling and non-sampling errors.",
    source: "Sampling_Methodology.pdf — Page 25",
    topic: "Data Quality"
  }
];

export const adminAnalytics = {
  totalOfficials: 2450,
  averageCompetency: 68,
  criticalSkillGaps: 8,
  trainingCompletion: 74,
  topSkillGaps: [
    { skill: "Python", gap: 38, category: "Technical" },
    { skill: "AI/ML", gap: 31, category: "Technical" },
    { skill: "GIS", gap: 27, category: "Technical" },
    { skill: "Cybersecurity", gap: 21, category: "Digital Governance" },
    { skill: "Cloud Computing", gap: 18, category: "Technical" },
    { skill: "SQL", gap: 16, category: "Technical" }
  ],
  departmentReadiness: [
    { department: "National Accounts", readiness: 75 },
    { department: "Social Statistics", readiness: 71 },
    { department: "Economic Statistics", readiness: 69 },
    { department: "Agricultural Statistics", readiness: 66 },
    { department: "Industrial Statistics", readiness: 64 }
  ],
  emergingSkills: [
    { skill: "AI/ML", demand: 85, supply: 32 },
    { skill: "Cloud Computing", demand: 78, supply: 35 },
    { skill: "Advanced Analytics", demand: 82, supply: 45 },
    { skill: "Data Privacy", demand: 75, supply: 52 }
  ]
};

export const integrations = {
  iGOT: {
    name: "iGOT Karmayogi",
    status: "Connected — Prototype API",
    capabilities: [
      "Course Catalogue",
      "Course Recommendations",
      "Learning History",
      "Completion Status"
    ],
    lastSync: "2026-09-09 10:30 AM"
  },
  NSSTA: {
    name: "NSSTA / TPAC",
    status: "Recommendation Service Active — Prototype",
    capabilities: [
      "Training Programme Catalogue",
      "Competency Framework",
      "Assessment Tools"
    ],
    lastSync: "2026-09-09 10:25 AM"
  }
};
